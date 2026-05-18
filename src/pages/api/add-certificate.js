import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { masterKey, certData } = req.body;

    // Verify Admin
    if (masterKey !== process.env.ADMIN_MASTER_KEY) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Master Key' });
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        // Insert JSONB data
        const { data, error } = await supabaseAdmin
            .from('certificates')
            .insert([{ cert_data: certData }]);

        // Code 23505 is PostgreSQL's unique violation error (Duplicate Certificate)
        if (error?.code === '23505') {
            return res.status(400).json({ message: 'Error: This Certificate Number already exists in the database.' });
        }
        
        if (error) throw error;

        return res.status(200).json({ success: true, message: 'Certificate securely added!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
}