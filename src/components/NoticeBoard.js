import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { IoMegaphoneOutline, IoTimeOutline, IoDocumentAttachOutline } from 'react-icons/io5';

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotices() {
            const { data, error } = await supabase
                .from('notices')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(4);

            if (!error && data) {
                setNotices(data);
            }
            setLoading(false);
        }
        fetchNotices();
    }, []);

    if (loading) return null;

    return (
        <section className="notice-section">
            <div className="container">
                <div className="section-header">
                    <h2><span className="highlight">Important</span> Announcement Board</h2>
                    <p>Click details to review or open files stored on the verified public channel directory.</p>
                </div>

                <div className="notice-grid">
                    {notices.map((notice) => {
                        const payload = notice.notice_data;
                        const date = new Date(notice.created_at).toLocaleDateString();

                        return (
                            <div key={notice.id} className="notice-card">
                                <div className="card-header">
                                    <IoMegaphoneOutline className="icon" />
                                    <span className="date"><IoTimeOutline /> {date}</span>
                                </div>
                                <h3>{payload.title}</h3>
                                
                                {payload.fileUrl && (
                                    <a 
                                        href={payload.fileUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn-download"
                                    >
                                        <IoDocumentAttachOutline /> {payload.fileName || 'View Attached Document'}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                    
                    {notices.length === 0 && (
                        <p className="empty-state">No active notices listed at this point.</p>
                    )}
                </div>
            </div>

            <style jsx>{`
                .notice-section { padding: 5rem 1.5rem; background: #ffffff; font-family: 'Ubuntu', sans-serif; }
                .container { max-width: 1200px; margin: 0 auto; }
                
                .section-header { text-align: center; margin-bottom: 3rem; }
                .section-header h2 { font-size: 2.5rem; color: #1e293b; font-weight: 700; margin: 0 0 1rem 0; }
                .highlight { color: #fcab17; }
                .section-header p { color: #64748b; font-size: 1.1rem; }

                .notice-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
                
                .notice-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; border-left: 5px solid #145da0; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; }

                .card-header { display: flex; justify-content: space-between; align-items: center; color: #145da0; }
                .icon { font-size: 1.5rem; }
                .date { font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 4px; color: #64748b; }
                
                .notice-card h3 { font-size: 1.3rem; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.4; }
                
                .btn-download { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 8px; 
                    background: #ffffff; 
                    color: #145da0; 
                    border: 1px solid #145da0; 
                    padding: 10px 16px; 
                    border-radius: 6px; 
                    font-weight: 700; 
                    font-size: 0.9rem; 
                    text-decoration: none; 
                    width: fit-content; 
                    transition: all 0.3s ease; 
                    margin-top: 0.5rem;
                }
                .btn-download:hover { 
                    background: #145da0; 
                    color: #ffffff; 
                }

                .empty-state { grid-column: 1 / -1; text-align: center; color: #64748b; font-style: italic; }

                @media (max-width: 992px) {
                    .notice-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    );
}