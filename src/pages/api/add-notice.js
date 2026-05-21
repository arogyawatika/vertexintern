import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { masterKey, noticeData } = req.body;

    // Validate Master Key (matches your environment variable)
    if (masterKey !== process.env.ADMIN_MASTER_KEY) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Master Key' });
    }

    try {
        // Insert the new notice into the JSONB column
        const { data, error } = await supabase
            .from('notices')
            .insert([{ notice_data: noticeData }]);

        if (error) throw error;

        return res.status(200).json({ message: 'Notice added successfully', data });
    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ message: 'Database error', error: error.message });
    }
}