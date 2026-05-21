import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { IoTimeOutline, IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

export default function AllNotices() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        async function fetchNotices() {
            setLoading(true);
            
            // Calculate range for Supabase pagination
            const from = (currentPage - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            // Fetch data and the exact total count
            const { data, count, error } = await supabase
                .from('notices')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(from, to);

            if (!error && data) {
                setNotices(data);
                setTotalPages(Math.ceil((count || 0) / itemsPerPage));
            }
            setLoading(false);
        }
        
        fetchNotices();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="all-notices-wrapper">
            <Head>
                <title>All Notices | Elevate Interns</title>
            </Head>
            
            <div className="page-header">
                <h1>All Announcements</h1>
                <p>Stay updated with our latest official notices and schedules.</p>
            </div>
            
            {loading ? (
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Loading announcements...</p>
                </div>
            ) : notices.length === 0 ? (
                <p className="empty-state">No announcements available at the moment.</p>
            ) : (
                <>
                    <ul className="notice-list">
                        {notices.map(notice => {
                            const payload = notice.notice_data;
                            const date = new Date(notice.created_at).toLocaleDateString(undefined, {
                                year: 'numeric', month: 'long', day: 'numeric'
                            });
                            
                            return (
                                <li key={notice.id} className="notice-item">
                                    <Link href={`/notice/${payload.slug}`} legacyBehavior passHref>
                                        <a className="notice-title">
                                            {payload.title}
                                        </a>
                                    </Link>
                                    <div className="notice-meta">
                                        <IoTimeOutline className="meta-icon" /> 
                                        Published on {date}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination-controls">
                            <button 
                                onClick={handlePrevPage} 
                                disabled={currentPage === 1}
                                className="btn-paginate"
                            >
                                <IoChevronBackOutline /> Previous
                            </button>
                            
                            <span className="page-indicator">
                                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                            </span>
                            
                            <button 
                                onClick={handleNextPage} 
                                disabled={currentPage === totalPages}
                                className="btn-paginate"
                            >
                                Next <IoChevronForwardOutline />
                            </button>
                        </div>
                    )}
                </>
            )}

            <style jsx>{`
                .all-notices-wrapper {
                    max-width: 800px;
                    margin: 4rem auto;
                    padding: 0 1.5rem;
                    font-family: 'Ubuntu', sans-serif;
                    min-height: 70vh;
                }

                .page-header {
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 1.5rem;
                    margin-bottom: 2rem;
                }

                .page-header h1 {
                    color: #1e293b;
                    font-size: 2.2rem;
                    font-weight: 700;
                    margin: 0 0 0.5rem 0;
                }

                .page-header p {
                    color: #64748b;
                    margin: 0;
                    font-size: 1.05rem;
                }

                .notice-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .notice-item {
                    padding: 1.5rem 0;
                    border-bottom: 1px solid #f1f5f9;
                    transition: background-color 0.2s;
                }

                .notice-title {
                    text-decoration: none;
                    color: #dc2626; /* Red text */
                    font-size: 1.3rem;
                    font-weight: 700;
                    display: inline-block;
                    margin-bottom: 0.5rem;
                    transition: color 0.2s ease;
                    line-height: 1.4;
                }

                .notice-title:hover {
                    color: #991b1b; /* Darker red on hover */
                    text-decoration: underline;
                }

                .notice-meta {
                    color: #64748b;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .meta-icon {
                    font-size: 1.1rem;
                }

                /* Pagination Styles */
                .pagination-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 3rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e2e8f0;
                }

                .btn-paginate {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: #1e293b;
                    color: #ffffff;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    font-family: inherit;
                    cursor: pointer;
                    transition: background 0.2s, opacity 0.2s;
                }

                .btn-paginate:hover:not(:disabled) {
                    background: #334155;
                }

                .btn-paginate:disabled {
                    background: #cbd5e1;
                    cursor: not-allowed;
                    color: #f1f5f9;
                }

                .page-indicator {
                    color: #475569;
                    font-size: 0.95rem;
                }

                /* Loading and Empty States */
                .loading-state, .empty-state {
                    text-align: center;
                    padding: 4rem 0;
                    color: #64748b;
                }

                .loader {
                    width: 36px;
                    height: 36px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #1e293b;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem auto;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 600px) {
                    .pagination-controls {
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    .page-indicator {
                        order: -1; /* Puts the page number on top on mobile */
                    }
                    .btn-paginate {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    );
}