import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // --- UPDATED: Extract the new fields from req.body ---
    const { courseTitle, name, phone, college, university, state } = req.body;

    if (!name || !phone || !courseTitle) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // We use the Service Role Key here to bypass RLS and insert the data securely
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        // --- UPDATED: Add the new fields to the payload saved to the database ---
        const enrollData = {
            courseTitle: courseTitle,
            studentName: name,
            phone: phone,
            college: college || '-',       // Added
            university: university || '-', // Added
            state: state || '-',           // Added
            status: 'Pending Contact' // Default status for the admin dashboard
        };

        const { error } = await supabaseAdmin
            .from('enrollments')
            .insert([{ enroll_data: enrollData }]);

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Enrollment Error:", error);
        return res.status(500).json({ message: 'Failed to save enrollment.' });
    }
}