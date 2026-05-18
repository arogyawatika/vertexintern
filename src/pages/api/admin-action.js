import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { masterKey, action, table, id, payload } = req.body;

    // 1. Authenticate Master Key
    if (masterKey !== process.env.ADMIN_MASTER_KEY) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Master Key' });
    }

    // 2. Initialize Service Role Supabase (Bypasses RLS for Admin operations)
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    try {
        // FETCH RECORDS
        if (action === 'fetch') {
            const { data, error } = await supabaseAdmin
                .from(table)
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            return res.status(200).json({ data });
        }
        
        // DELETE RECORD
        if (action === 'delete') {
            const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
            if (error) throw error;
            return res.status(200).json({ message: 'Deleted successfully' });
        }
        
        // UPDATE RECORD
        if (action === 'update') {
            // Determine which JSONB column to update based on the table
            const updateField = table === 'notices' ? { notice_data: payload } : { cert_data: payload };
            
            const { error } = await supabaseAdmin.from(table).update(updateField).eq('id', id);
            if (error) throw error;
            return res.status(200).json({ message: 'Updated successfully' });
        }

        return res.status(400).json({ message: 'Invalid action requested' });

    } catch (error) {
        console.error("Admin Action Error:", error);
        return res.status(500).json({ message: error.message });
    }
}