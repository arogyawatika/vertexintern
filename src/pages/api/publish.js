import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
    api: { bodyParser: false },
};

// --- BULLETPROOF KEY SANITIZER ---
function formatPrivateKey(rawKey) {
    if (!rawKey) return '';
    
    // 1. Strip any lingering quotes (single or double) from the ends
    let key = rawKey.replace(/^["']|["']$/g, '');
    
    // 2. Convert literal '\n' text into actual line breaks
    key = key.replace(/\\n/g, '\n');
    
    // 3. Fix Windows carriage returns
    key = key.replace(/\r\n/g, '\n');
    
    // 4. STRIP ACCIDENTAL SPACES: Split by lines, trim spaces from every line, and stitch back together
    key = key.split('\n').map(line => line.trim()).join('\n');
    
    return key;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = formidable({ keepExtensions: true });
    
    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });

        const masterKey = Array.isArray(fields.masterKey) ? fields.masterKey[0] : fields.masterKey;
        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
        const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

        if (masterKey !== process.env.ADMIN_MASTER_KEY) {
            return res.status(401).json({ message: 'Invalid Master Key' });
        }

        if (!uploadedFile) {
            return res.status(400).json({ message: 'Missing attachment file' });
        }

        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_DRIVE_FOLDER_ID) {
            throw new Error("Missing Google Credentials in .env.local!");
        }

        // Apply the strict sanitizer to the key
        const safePrivateKey = formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY);

        // Authenticate with Google
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: safePrivateKey,
            },
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Setup File Metadata
        const fileMetadata = {
            name: uploadedFile.originalFilename || 'attachment.pdf',
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        };

        const media = {
            mimeType: uploadedFile.mimetype,
            body: fs.createReadStream(uploadedFile.filepath),
        };

        // Execute Upload
        const driveResponse = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webViewLink',
            supportsAllDrives: true, // <--- THE MAGIC FIX
        });

        const googleDriveLink = driveResponse.data.webViewLink;

        // Initialize Supabase
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Save to Database
        const noticeData = {
            title: title,
            fileUrl: googleDriveLink,
            fileName: uploadedFile.originalFilename || 'Download PDF'
        };

        const { error: dbError } = await supabaseAdmin
            .from('notices')
            .insert([{ notice_data: noticeData }]);

        if (dbError) throw dbError;

        return res.status(200).json({ success: true, message: 'Notice published successfully!' });

    } catch (error) {
        console.error("SERVER ERROR:", error);
        return res.status(500).json({ 
            message: `Server Error: ${error.message || 'Unknown processing error'}` 
        });
    }
}