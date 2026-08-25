import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).end();
    
    // 1. Sanitize the inputs to ensure exact matching (trim spaces, lowercase email)
    const searchPhone = String(req.query.phone || '').trim();
    const searchEmail = String(req.query.email || '').trim().toLowerCase();

    try {
        // 2. Fetch from ENROLLMENTS table first (Safest source for phone/email)
        const { data: enrollData, error: enrollError } = await supabase.from('enrollments').select('*');
        if (enrollError) throw enrollError;

        // Find the exact enrollment record
        const enrollmentRecord = enrollData.find(item => {
            // Handle cases where Supabase returns JSON as a string
            const enData = typeof item.enroll_data === 'string' ? JSON.parse(item.enroll_data) : item.enroll_data;
            if (!enData) return false;
            
            const recPhone = String(enData.phone || '').trim();
            const recEmail = String(enData.email || '').trim().toLowerCase();
            
            return recPhone === searchPhone && recEmail === searchEmail;
        });

        if (!enrollmentRecord) {
            // Fallback: If not in enrollments, check certificates just in case
            const { data: certFallbackData } = await supabase.from('certificates').select('*');
            const fallbackRecord = certFallbackData?.find(item => {
                const cData = typeof item.cert_data === 'string' ? JSON.parse(item.cert_data) : item.cert_data;
                if (!cData) return false;
                
                return String(cData.phone || '').trim() === searchPhone && 
                       String(cData.email || '').trim().toLowerCase() === searchEmail;
            });

            if (fallbackRecord) {
                const finalFallbackData = typeof fallbackRecord.cert_data === 'string' ? JSON.parse(fallbackRecord.cert_data) : fallbackRecord.cert_data;
                return res.status(200).json({ record: finalFallbackData });
            }

            return res.status(404).json({ message: 'Record not found' });
        }

        // 3. Enrollment found! Extract student name to find their generated certificate
        const enData = typeof enrollmentRecord.enroll_data === 'string' ? JSON.parse(enrollmentRecord.enroll_data) : enrollmentRecord.enroll_data;
        const targetStudentName = String(enData.studentName || '').trim().toLowerCase();

        // 4. Fetch the Certificates table
        const { data: certData, error: certError } = await supabase.from('certificates').select('*');
        if (certError) throw certError;

        // Link the enrollment to the certificate via Student Name
        const matchingCert = certData.find(item => {
            const cData = typeof item.cert_data === 'string' ? JSON.parse(item.cert_data) : item.cert_data;
            if (!cData) return false;
            
            return String(cData.studentName || '').trim().toLowerCase() === targetStudentName;
        });

        if (matchingCert) {
            // Certificate exists (Admin has updated it)
            const finalCertData = typeof matchingCert.cert_data === 'string' ? JSON.parse(matchingCert.cert_data) : matchingCert.cert_data;
            
            // Merge both data sets so the frontend has everything it needs to generate the PDF
            return res.status(200).json({ 
                record: { ...enData, ...finalCertData } 
            });
        } else {
            // Certificate does not exist yet (Still Pending)
            return res.status(200).json({ 
                record: { 
                    ...enData, 
                    courseName: enData.courseTitle, // Map key for frontend compatibility
                    issueDate: null, 
                    percentage: null 
                } 
            });
        }

    } catch (error) {
        console.error("Tracking Error:", error);
        res.status(500).json({ message: 'Server error tracking status' });
    }
}