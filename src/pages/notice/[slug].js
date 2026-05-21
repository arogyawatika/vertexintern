import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabase';
import { IoTimeOutline, IoArrowBackOutline, IoShareSocialOutline } from 'react-icons/io5';
import Link from 'next/link';

export default function NoticeDetails() {
    const router = useRouter();
    const { slug } = router.query;
    
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        async function fetchNotice() {
            const { data, error } = await supabase
                .from('notices')
                .select('*')
                .eq('notice_data->>slug', slug)
                .single();

            if (!error && data) {
                setNotice(data);
            }
            setLoading(false);
        }

        fetchNotice();
    }, [slug]);

    const handleShare = async () => {
        const shareData = {
            title: notice?.notice_data?.title,
            text: `Read this notice: ${notice?.notice_data?.title}`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (loading) {
        return <div className="loading-wrapper"><div className="loader"></div></div>;
    }

    if (!notice) {
        return (
            <div className="not-found-wrapper">
                <h2>Notice Not Found</h2>
                <p>The announcement you are looking for does not exist or has been removed.</p>
                <Link href="/notice" legacyBehavior passHref><a className="btn-back">Go to All Notices</a></Link>
            </div>
        );
    }

    const payload = notice.notice_data;
    const date = new Date(notice.created_at).toLocaleDateString(undefined, { 
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    return (
        <article className="notice-page-wrapper">
            <Head>
                <title>{payload.title} | Elevate Interns</title>
            </Head>

            <div className="article-header">
                <div className="container">
                    <Link href="/" legacyBehavior passHref>
                        <a className="back-link"><IoArrowBackOutline /> Back to Home</a>
                    </Link>
                    
                    <h1 className="article-title">{payload.title}</h1>
                    
                    <div className="article-meta">
                        <div className="meta-left">
                            <IoTimeOutline className="meta-icon"/>
                            <span>Published on {date}</span>
                        </div>
                        <button onClick={handleShare} className="btn-share" aria-label="Share notice">
                            <IoShareSocialOutline className="share-icon" /> Share
                        </button>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="article-body">
                    {/* Render text content with preserved line breaks */}
                    {payload.content.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .notice-page-wrapper {
                    background-color: #ffffff;
                    min-height: 100vh;
                    padding-bottom: 6rem;
                    font-family: 'Inter', 'Ubuntu', sans-serif;
                }
                
                /* Standard reading width for articles is typically around 680px-750px */
                .container { max-width: 720px; margin: 0 auto; padding: 0 1.5rem; }

                .loading-wrapper, .not-found-wrapper { height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
                .loader { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #1e293b; border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

                .not-found-wrapper h2 { color: #1e293b; font-size: 2rem; margin-bottom: 1rem; }
                .btn-back { background: #1e293b; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; }

                /* Editorial Header (No Card) */
                .article-header {
                    padding: 4rem 0 2rem 0;
                    border-bottom: 1px solid #e2e8f0;
                    margin-bottom: 3rem;
                }
                
                .back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #64748b;
                    font-weight: 500;
                    text-decoration: none;
                    margin-bottom: 2rem;
                    transition: color 0.2s;
                }
                .back-link:hover { color: #1e293b; }
                
                .article-title {
                    font-size: 2.5rem;
                    color: #0f172a;
                    font-weight: 800;
                    margin: 0 0 1.5rem 0;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                }
                
                .article-meta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #64748b;
                    font-size: 0.95rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .meta-left { display: flex; align-items: center; gap: 6px; }
                .meta-icon { font-size: 1.2rem; }

                .btn-share {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    padding: 8px 16px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-family: inherit;
                    font-weight: 500;
                    color: #475569;
                    transition: all 0.2s;
                }
                .btn-share:hover {
                    background: #f1f5f9;
                    color: #1e293b;
                    border-color: #cbd5e1;
                }
                .share-icon { font-size: 1.1rem; }

                /* Editorial Body (No Card) */
                .article-body {
                    color: #334155;
                    font-size: 1.15rem;
                    line-height: 1.8;
                }
                .article-body p { margin-bottom: 1.75rem; }
                .article-body p:last-child { margin-bottom: 0; }

                @media (max-width: 768px) {
                    .article-header { padding: 2.5rem 0 1.5rem 0; }
                    .article-title { font-size: 2rem; }
                    .article-body { font-size: 1.05rem; }
                }
            `}</style>
        </article>
    );
}