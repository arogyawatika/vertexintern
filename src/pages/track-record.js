import React, { useState } from 'react';
import Head from 'next/head';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function TrackRecord() {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [record, setRecord] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg('');
        setRecord(null);

        try {
            const res = await fetch(`/api/track-status?phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`);
            const data = await res.json();

            if (res.ok && data.record) {
                setRecord(data.record);
            } else {
                setStatusMsg('No enrollment found with this Mobile and Email combination.');
            }
        } catch (err) {
            setStatusMsg('Error fetching status. Please try again.');
        }
        setLoading(false);
    };

    const downloadCertificatePDF = async () => {
        setDownloading(true);
        
        const element = document.getElementById(`pdf-template-${record.certificateNumber}`);
        
        if (!element) {
            alert("Error: Certificate template could not be found.");
            setDownloading(false);
            return;
        }

        // Show container off-screen for crisp snapshot capture
        element.style.display = 'block';

        // Force the browser to wait 150ms to paint the HTML/CSS before capturing
        await new Promise(resolve => setTimeout(resolve, 150));

        try {
            const canvas = await html2canvas(element, {
                scale: 3, // 3x scaling for sharp, vector-like print text
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: 1123,  // Exact 96 DPI A4 Landscape width
                height: 794   // Exact 96 DPI A4 Landscape height
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            
            // Exact A4 Landscape dimensions (297mm x 210mm)
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
            
            pdf.save(`${record.certificateNumber}_Certificate.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            // Hide the template again
            element.style.display = 'none';
            setDownloading(false);
        }
    };

    return (
        <div className="admin-wrapper" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Head>
                <title>Track Enrollment Status | Elevate</title>
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,600;1,400&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="form-panel fade-in" style={{ width: '100%', maxWidth: '500px' }}>
                <h3 style={{ color: '#145da0', fontWeight: '700', textAlign: 'center', marginBottom: '1.5rem' }}>Track Your Record</h3>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>Enter your details below to check your certificate status.</p>
                
                <form onSubmit={handleTrack} className="grid-form">
                    <div className="input-group">
                        <label>Registered Mobile Number</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value.trim())} required />
                    </div>
                    <div className="input-group">
                        <label>Registered Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value.trim().toLowerCase())} required />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px', marginTop: '1rem' }}>
                        {loading ? 'Tracking...' : 'Check Status'}
                    </button>
                </form>

                {statusMsg && <p style={{ marginTop: '1rem', color: '#ef4444', textAlign: 'center', fontWeight: 'bold' }}>{statusMsg}</p>}
            </div>

            {record && (
                <div className="form-panel fade-in" style={{ width: '100%', maxWidth: '600px', marginTop: '2rem', textAlign: 'center' }}>
                    <h3 style={{ color: '#1e293b', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>Enrollment Details</h3>
                    <div style={{ marginTop: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <p><strong>Student Name:</strong> {record.studentName}</p>
                        <p><strong>Course:</strong> {record.courseName}</p>
                        <p><strong>Enrollment ID:</strong> {record.certificateNumber}</p>
                        
                        {/* If percentage & issueDate are missing, it's pending admin approval */}
                        {(!record.issueDate || !record.percentage) ? (
                            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', color: '#d97706', padding: '1rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center' }}>
                                <strong>Status: Pending / Under Review</strong><br/>
                                <span style={{ fontSize: '0.9rem' }}>Your enrollment has been received. Your certificate will be generated shortly once training data is verified by the admin.</span>
                            </div>
                        ) : (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', textAlign: 'center' }}>
                                <strong>Status: Certificate Generated!</strong><br/>
                                <p style={{ margin: '10px 0', fontSize: '0.95rem' }}>Your digital certificate is ready. You can download the high-resolution PDF below.</p>
                                
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
                                    <button 
                                        onClick={downloadCertificatePDF} 
                                        disabled={downloading}
                                        style={{ background: '#166534', color: 'white', padding: '12px 24px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: downloading ? 'not-allowed' : 'pointer', fontSize: '1rem' }}
                                    >
                                        {downloading ? 'Generating PDF...' : 'Download Certificate PDF'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- HIGH-QUALITY PURE HTML/CSS A4 LANDSCAPE CERTIFICATE (HIDDEN TEMPLATE) --- */}
            {record && record.issueDate && record.percentage && (
                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', overflow: 'hidden', height: 0, width: 0 }}>
                    <div 
                        id={`pdf-template-${record.certificateNumber}`} 
                        style={{
                            width: '1123px',   
                            height: '794px',   
                            backgroundColor: '#ffffff',
                            padding: '18px',   
                            boxSizing: 'border-box',
                            position: 'relative',
                            fontFamily: "'Times New Roman', Times, serif",
                            color: '#0f172a',
                            display: 'none'
                        }}
                    >
                        <div style={{ width: '100%', height: '100%', border: '16px solid #005a36', padding: '4px', boxSizing: 'border-box' }}>
                            <div style={{ width: '100%', height: '100%', border: '2px solid #005a36', position: 'relative', padding: '30px 40px', boxSizing: 'border-box' }}>
                                
                                <div style={{ position: 'absolute', top: -5, left: -5, width: 40, height: 40, borderTop: '6px solid #8b2641', borderLeft: '6px solid #8b2641' }}></div>
                                <div style={{ position: 'absolute', top: -5, right: -5, width: 40, height: 40, borderTop: '6px solid #8b2641', borderRight: '6px solid #8b2641' }}></div>
                                <div style={{ position: 'absolute', bottom: -5, left: -5, width: 40, height: 40, borderBottom: '6px solid #8b2641', borderLeft: '6px solid #8b2641' }}></div>
                                <div style={{ position: 'absolute', bottom: -5, right: -5, width: 40, height: 40, borderBottom: '6px solid #8b2641', borderRight: '6px solid #8b2641' }}></div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold' }}>
                                    <div style={{ lineHeight: '1.4' }}>
                                        <div>GSTIN : 10MAEPK5708F1ZX</div>
                                        <div>ESTD : 2026</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                        <div style={{ border: '1px solid #000', padding: '2px 4px', display: 'inline-block', background: '#f8fafc' }}>
                                            <span>Sl. No. :</span>
                                            <span style={{ marginLeft: '6px' }}>{record.certificateNumber}</span>
                                        </div>
                                        <div>
                                            Date of Completion <span style={{ marginLeft: '6px' }}>{record.issueDate ? new Date(record.issueDate).toLocaleDateString('en-GB').replace(/\//g, '.') : ''}</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '0px' }}>
                                    <img src="/logo.png" alt="Elevate Interns" style={{ height: '50px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                    <div style={{ fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
                                        Leading Institute to Provide Industrial Training and Vocational Training to All
                                    </div>
                                    <h1 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: '42px', color: '#005a36', margin: '10px 0 15px 0', fontWeight: 'bold' }}>
                                        Certificate of {record.trainingType || 'Internship'}
                                    </h1>
                                </div>

                                <div style={{ padding: '0 10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>This is to certify that</span>
                                        <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>{record.studentName}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>of college / University / Board</span>
                                        <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{record.collegeName || record.universityName || '-'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>of Branches / Course</span>
                                        <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>{record.branch || record.courseName || '-'}</span>
                                        <span style={{ width: '250px', borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '20px' }}>{record.semester || '-'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>Roll / Reg. No.</span>
                                        <span style={{ width: '280px', borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{record.rollNumber || '-'}</span>
                                        <span style={{ fontSize: '20px', fontStyle: 'italic', marginLeft: '15px' }}>has successfully completed {record.trainingType || 'Summer Internship'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>of</span>
                                        <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>{record.topic || '-'}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>in</span>
                                        <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{record.duration || '-'}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px' }}>
                                    {/* QR Code Block */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', width: '150px' }}>
                                        <div style={{ border: '2px solid #000', padding: '4px', display: 'inline-block' }}>
                                            <img 
                                                src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(window.location.origin + "/verify?id=" + record.certificateNumber)} 
                                                alt="QR" 
                                                crossOrigin="anonymous"
                                                style={{ width: '75px', height: '75px', display: 'block' }} 
                                            />
                                        </div>
                                        <div style={{ fontSize: '10px', marginTop: '6px', lineHeight: '1.3', fontWeight: 'bold', textAlign: 'center', color: '#0f172a' }}>
                                            To verify, scan QR or visit<br/>elevateinterns.in/verify
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', paddingRight: '20px' }}>
                                        <div style={{ position: 'relative', width: '320px', height: '28px' }}>
                                            <svg width="320" height="28" viewBox="0 0 320 28" preserveAspectRatio="none">
                                                <polygon points="25,0 320,0 295,28 0,28" fill="#005a36" />
                                                <polygon points="160,2 317,2 295,26 138,26" fill="#ffffff" />
                                            </svg>
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                                                <div style={{ width: '150px', textAlign: 'right', paddingRight: '12px', color: '#ffffff', fontWeight: 'bold' }}>Mode of Training</div>
                                                <div style={{ flex: 1, textAlign: 'center', color: '#000000', paddingRight: '20px', fontWeight: 'bold' }}>{record.modeOfTraining || 'OFFLINE'}</div>
                                            </div>
                                        </div>
                                        <div style={{ position: 'relative', width: '370px', height: '28px' }}>
                                            <svg width="370" height="28" viewBox="0 0 370 28" preserveAspectRatio="none">
                                                <polygon points="25,0 370,0 345,28 0,28" fill="#8b2641" />
                                                <polygon points="220,2 367,2 345,26 198,26" fill="#ffffff" />
                                            </svg>
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                                                <div style={{ width: '210px', textAlign: 'right', paddingRight: '12px', color: '#ffffff', fontWeight: 'bold' }}>Percentage Marks Obtained (%)</div>
                                                <div style={{ flex: 1, textAlign: 'center', color: '#000000', paddingRight: '20px', fontWeight: 'bold' }}>{record.percentage || '-'}</div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '11px', fontStyle: 'italic', textAlign: 'center', width: '320px', marginTop: '2px', fontWeight: 'bold' }}>
                                            During training he / she was very punctual and hardworking.<br/>Wishing "All the Best" for future career!
                                        </div>
                                    </div>
                                </div>

                                <div style={{ position: 'absolute', bottom: '30px', left: '50px', right: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            <img src="/images/msme.jpg" alt="MSME" style={{ height: '60px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                            <img src="/images/nip.png" alt="NIP" style={{ height: '70px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                            <img src="/images/gst.png" alt="GST" style={{ height: '50px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                            <img src="/images/aicte.png" alt="AICTE" style={{ height: '60px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                            <img src="/images/iso.jpg" alt="ISO" style={{ height: '60px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                        </div>
                                    </div>

                                    {/* Authorised Signature & Stamp */}
                                    <div style={{ textAlign: 'center', paddingRight: '20px', position: 'relative' }}>
                                        <div style={{ fontStyle: 'italic', fontSize: '16px', color: '#1e293b', marginBottom: '5px' }}>Authorised Signature</div>
                                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b2641', fontFamily: 'Arial, sans-serif' }}>Elevate Interns</div>
                                        <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>Brij Mohan Thakur Lane, Barari, Bhagalpur Bihar 812003</div>
                                        
                                        <img 
                                            src="/images/ELEVATE_INTERNS_Stamp.png" 
                                            alt="Official Stamp" 
                                            crossOrigin="anonymous"
                                            style={{ 
                                                position: 'absolute', 
                                                top: '-67px', 
                                                left: '50%', 
                                                transform: 'translateX(-50%) rotate(5deg)', 
                                                height: '80px', 
                                                opacity: 0.85, 
                                                pointerEvents: 'none'
                                            }} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .admin-wrapper { min-height: 100vh; background: #f4f6f9; font-family: 'Ubuntu', sans-serif; }
                .form-panel { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                .grid-form { display: flex; flex-direction: column; gap: 1.5rem; }
                .input-group { display: flex; flex-direction: column; gap: 6px; text-align: left; }
                .input-group label { font-size: 0.9rem; font-weight: 700; color: #475569; }
                input { width: 100%; padding: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 1rem; outline: none; }
                input:focus { border-color: #145da0; }
                .btn-primary { background: #145da0; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.3s; }
                .btn-primary:hover { background: #0f4a82; }
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}