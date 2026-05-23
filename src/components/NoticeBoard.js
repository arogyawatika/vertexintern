import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { IoMegaphoneOutline, IoArrowForwardOutline, IoTimeOutline } from 'react-icons/io5';
import Link from 'next/link';

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotices() {
            const { data, error } = await supabase
                .from('notices')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (!error && data) {
                setNotices(data);
            }
            setLoading(false);
        }
        fetchNotices();
    }, []);

    if (loading) return null;

    // Check if we hit the limit of 5. Only scroll and duplicate array if full.
    const isFullBoard = notices.length === 5;
    const displayNotices = isFullBoard ? [...notices, ...notices] : notices;

    return (
        <section className="notice-section">
            <div className="container">
                <div className="layout-grid">
                    
                    {/* Left Column: Graphic / Image (Desktop Only) */}
                    <div className="graphic-column">
                        <div className="graphic-content">
                            {/* Replace src with your own image or illustration path (e.g., "/images/notice-graphic.png") */}
                            <img 
                                src="https://illustrations.popsy.co/amber/communication.svg" 
                                alt="Announcements Graphic" 
                                className="illustration"
                            />
                            <h3>Stay Informed</h3>
                            <p>Check the board regularly to stay up-to-date with the latest schedules, events, and important announcements.</p>
                        </div>
                    </div>

                    {/* Right Column: Scrolling Notice Board */}
                    <div className="board-column">
                        <div className="board-wrapper">
                            <div className="board-header">
                                <IoMegaphoneOutline className="header-icon" />
                                <h2>Notice Board</h2>
                            </div>

                            <div className="board-body">
                                {notices.length === 0 ? (
                                    <p className="empty-state">No active notices listed at this point.</p>
                                ) : (
                                    <div className={`scroll-container ${isFullBoard ? 'is-scrolling' : ''}`}>
                                        <div className="scroll-content">
                                            {displayNotices.map((notice, index) => {
                                                const payload = notice.notice_data;
                                                const date = new Date(notice.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                });

                                                return (
                                                    <div key={`${notice.id}-${index}`} className="notice-item">
                                                        <Link href={`/notice/${payload.slug}`} legacyBehavior passHref>
                                                            <a className="notice-title-link">
                                                                {payload.title}
                                                            </a>
                                                        </Link>
                                                        <div className="notice-date">
                                                            <IoTimeOutline /> Published on {date}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="board-footer">
                                <Link href="/notice" legacyBehavior passHref>
                                    <a className="btn-all-notices">
                                        View All Notices <IoArrowForwardOutline />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <style jsx>{`
                .notice-section { padding: 5rem 1.5rem; background: #ffffff; font-family: 'Ubuntu', sans-serif; }
                .container { max-width: 1100px; margin: 0 auto; }

                /* Two Column Grid Layout */
                .layout-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                    align-items: center;
                }

                @media (min-width: 860px) {
                    .layout-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 4rem;
                    }
                }

                /* Graphic Left Column */
                .graphic-column {
                    display: none; /* Hide image on mobile */
                }
                @media (min-width: 860px) {
                    .graphic-column {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }

                .graphic-content { text-align: center; max-width: 450px; }
                .illustration { width: 100%; max-width: 320px; height: auto; margin-bottom: 2rem; }
                .graphic-content h3 { font-size: 2.2rem; color: #1e293b; margin: 0 0 1rem 0; font-weight: 700; }
                .graphic-content p { color: #64748b; font-size: 1.1rem; line-height: 1.6; }

                /* Right Column Board wrapper */
                .board-column { display: flex; justify-content: center; }
                
                .board-wrapper {
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    overflow: hidden;

                    width: 100%;
                    max-width: 500px;
                }

                .board-header {
                    background: #934761;
                    color: #ffffff;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .board-header h2 { margin: 0; font-size: 1.4rem; font-weight: 700; }
                .header-icon { font-size: 1.8rem; color: #72BAA9; }

                .board-body {
                    padding: 0;
                    background: #ffffff;
                    height: 380px; /* Taller to accommodate dates */
                    position: relative;
                    overflow: hidden;
                }

                .scroll-container {
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .scroll-content {
                    display: flex;
                    flex-direction: column;
                }

                /* Apply scroll animation ONLY if .is-scrolling is active */
                .scroll-container.is-scrolling .scroll-content {
                    animation: scroll-up 20s linear infinite;
                }

                /* Pause animation on hover */
                .scroll-container.is-scrolling:hover .scroll-content {
                    animation-play-state: paused;
                }

                .notice-item {
                    padding: 1.25rem 1.5rem;
                    border-bottom: 1px solid #f1f5f9;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .notice-title-link {
                    text-decoration: none;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #dc2626; /* Red heading as requested */
                    line-height: 1.4;
                    transition: color 0.2s;
                }

                .notice-title-link:hover {
                    color: #991b1b;
                    text-decoration: underline;
                }

                .notice-date {
                    font-size: 0.85rem;
                    color: #64748b;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .board-footer {
                    background: #f8fafc;
                    padding: 1.2rem 1.5rem;
                    border-top: 1px solid #e2e8f0;
                    text-align: center;
                }

                .btn-all-notices {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background-color: #934761;
                    color: #ffffff;
                    font-weight: 600;
                    padding: 12px 24px;
                    border-radius: 8px;
                    text-decoration: none;
                    transition: background-color 0.2s;
                    width: 100%;
                }

                .btn-all-notices:hover { background-color: #72BAA9; }
                .empty-state { text-align: center; color: #64748b; padding: 3rem 1rem; font-style: italic; }

                @keyframes scroll-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); } 
                }

                /* --- MOBILE COMPACT DESIGN --- */
                @media (max-width: 768px) {
                    .notice-section { 
                        padding: 2.5rem 1rem; 
                    }
                    
                    .layout-grid {
                        gap: 2rem;
                    }

                    .board-wrapper {
                        border-radius: 8px;
                    }

                    .board-header {
                        padding: 1rem 1.2rem;
                    }
                    
                    .board-header h2 {
                        font-size: 1.2rem;
                    }

                    .board-body {
                        height: 300px; /* Shorter on mobile to save space */
                    }

                    .notice-item {
                        padding: 1rem 1.2rem;
                    }

                    .notice-title-link {
                        font-size: 1rem;
                    }

                    .notice-date {
                        font-size: 0.8rem;
                    }

                    .board-footer {
                        padding: 1rem 1.2rem;
                    }

                    .btn-all-notices {
                        padding: 10px 20px;
                        font-size: 0.95rem;
                    }
                }
            `}</style>
        </section>
    );
}