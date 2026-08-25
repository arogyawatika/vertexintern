import { supabase } from '@/lib/supabaseClient'; // Adjust path to your Supabase instance

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const data = req.body;
    
    // Auto-generate a unique Certificate Number
    const year = new Date().getFullYear();
    const uniqueString = Math.random().toString(36).substring(2, 7).toUpperCase();
    const certificateNumber = `ELV-${year}-${uniqueString}`;

    try {
        // 1. Insert into Enrollments (For Admin "Student Enrollments" tab viewing)
        await supabase.from('enrollments').insert([{
            created_at: new Date().toISOString(),
            enroll_data: {
                courseTitle: data.courseName,
                studentName: data.studentName,
                phone: data.phone,
                email: data.email,
                college: data.collegeName,
                university: data.universityName,
                state: data.stateName,
                paymentId: data.paymentId
            }
        }]);

        // 2. Insert directly into Certificates as a "Pending/Incomplete" Record
        // (So the Admin can click "Edit" on the Certificate Registry tab to add the missing fields)
        const certPayload = {
            cert_data: {
                certificateNumber: certificateNumber,
                studentName: data.studentName,
                courseName: data.courseName,
                phone: data.phone,      // Used for tracking lookup
                email: data.email,      // Used for tracking lookup
                branch: data.branch,
                semester: data.semester,
                rollNumber: data.rollNumber,
                topic: data.topic,
                duration: data.duration,
                modeOfTraining: data.modeOfTraining,
                collegeName: data.collegeName,
                universityName: data.universityName,
                stateName: data.stateName,
                
                // These will be empty/null until admin edits and saves them
                issueDate: null,       
                percentage: null,      
                trainingType: null     
            },
            created_at: new Date().toISOString()
        };

        const { error: certError } = await supabase.from('certificates').insert([certPayload]);
        if (certError) throw certError;

        res.status(200).json({ success: true, certificateNumber });
    } catch (error) {
        console.error("Submission Error:", error);
        res.status(500).json({ message: 'Failed to save enrollment data' });
    }
}