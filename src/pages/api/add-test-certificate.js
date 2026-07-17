import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { masterKey, certData } = req.body;

    if (masterKey !== process.env.ADMIN_MASTER_KEY) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Master Key' });
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        const { data, error } = await supabaseAdmin
            .from('test_certificates') // Isolated Test Table
            .insert([{ cert_data: certData }]);

        if (error?.code === '23505') return res.status(400).json({ message: 'Error: Duplicate Certificate.' });
        if (error) throw error;

        return res.status(200).json({ success: true, message: 'Test Certificate securely added!' });
    } catch (error) {
        return res.status(500).json({ message: 'Database error: ' + error.message });
    }
}