import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { IoHomeOutline, IoHelpBuoyOutline } from 'react-icons/io5';

export default function Custom404() {
    return (
        <div className="error-page-wrapper">
            <Head>
                <title>Page Not Found | Elevate Interns</title>
            </Head>

            {/* Background Decorative Shapes */}
            <div className="shape-dots"></div>
            <div className="shape-zigzag"></div>
            <div className="shape-red-dots"></div>
            <div className="shape-arc"></div>

            <div className="container">
                <div className="error-content">
                    {/* Floating 404 Text */}
                    <div className="error-code-container">
                        <h1 className="error-code">404</h1>
                        <div className="error-shadow"></div>
                    </div>

                    <div className="text-content">
                        <h2>Oops! Page Not Found</h2>
                        <p>
                            We can't seem to find the page you're looking for. It might have been removed, renamed, or is temporarily unavailable.
                        </p>
                    </div>

                    <div className="action-buttons">
                        <Link href="/" legacyBehavior passHref>
                            <a className="btn-primary">
                                <IoHomeOutline className="btn-icon" /> Back to Home
                            </a>
                        </Link>
                        <Link href="/contact" legacyBehavior passHref>
                            <a className="btn-secondary">
                                <IoHelpBuoyOutline className="btn-icon" /> Contact Support
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .error-page-wrapper {
                    min-height: 100vh;
                    background-color: #ffffff;
                    font-family: 'Ubuntu', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    padding: 2rem 1.5rem;
                }

                .container {
                    max-width: 800px;
                    width: 100%;
                    position: relative;
                    z-index: 10;
                }

                .error-content {
                    background: #ffffff;
                    padding: 5rem 3rem;
                    border-radius: 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-top: 0px solid #72BAA9; /* Brand Teal */
                }

                /* 404 Floating Animation */
                .error-code-container {
                    position: relative;
                    margin-bottom: 2rem;
                }

                .error-code {
                    font-size: 8rem;
                    font-weight: 800;
                    margin: 0;
                    background: linear-gradient(135deg, #934761 0%, #AD5C71 100%); /* Plum to Rose */
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1;
                    animation: float 4s ease-in-out infinite;
                }

                .error-shadow {
                    width: 120px;
                    height: 15px;
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    margin: 1rem auto 0;
                    animation: shrink 4s ease-in-out infinite;
                }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }

                @keyframes shrink {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(0.8); opacity: 0.2; }
                    100% { transform: scale(1); opacity: 0.5; }
                }

                /* Typography */
                .text-content h2 {
                    font-size: 2.2rem;
                    color: #1e293b;
                    font-weight: 700;
                    margin: 0 0 1rem 0;
                }

                .text-content p {
                    font-size: 1.1rem;
                    color: #64748b;
                    line-height: 1.6;
                    max-width: 500px;
                    margin: 0 auto 3rem auto;
                }

                /* Buttons */
                .action-buttons {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .btn-primary {
                    background-color: #72BAA9; /* Brand Teal */
                    color: #ffffff;
                    text-decoration: none;
                    padding: 14px 28px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 1.05rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    border: 2px solid #72BAA9;
                }

                .btn-primary:hover {
                    background-color: #934761; /* Brand Plum */
                    border-color: #934761;
                    transform: translateY(-2px);
                }

                .btn-secondary {
                    background-color: transparent;
                    color: #934761; /* Brand Plum */
                    text-decoration: none;
                    padding: 14px 28px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 1.05rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                    border: 2px solid #934761;
                }

                .btn-secondary:hover {
                    background-color: #AD5C71; /* Brand Rose */
                    color: #ffffff;
                    border-color: #AD5C71;
                    transform: translateY(-2px);
                }

                :global(.btn-icon) {
                    font-size: 1.3rem;
                }

                /* Decorative Brand Shapes */
                .shape-dots { position: absolute; left: 5%; top: 20%; width: 140px; height: 140px; background-image: radial-gradient(#72BAA9 2.5px, transparent 2.5px); background-size: 20px 20px; border-radius: 50%; opacity: 0.3; } /* Teal */
                .shape-red-dots { position: absolute; right: 5%; bottom: 15%; width: 100px; height: 100px; background-image: radial-gradient(#AD5C71 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.4; } /* Rose */
                .shape-arc { position: absolute; right: -5%; top: -10%; width: 400px; height: 400px; border: 2px solid #e2e8f0; border-radius: 50%; z-index: 0; }
                .shape-zigzag { position: absolute; left: 15%; bottom: 25%; width: 50px; height: 25px; background-image: url("data:image/svg+xml,%3Csvg width='50' height='25' viewBox='0 0 50 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23D5E7B5' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 14l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 22l10-4 10 4 10-4 10 4'/%3E%3C/g%3E%3C/svg%3E"); background-repeat: no-repeat; opacity: 0.8; } /* Light Green */

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .error-content {
                        padding: 3rem 1.5rem;
                    }
                    .error-code {
                        font-size: 6rem;
                    }
                    .text-content h2 {
                        font-size: 1.8rem;
                    }
                    .text-content p {
                        font-size: 1rem;
                        margin-bottom: 2rem;
                    }
                    .action-buttons {
                        flex-direction: column;
                        width: 100%;
                        gap: 1rem;
                    }
                    .btn-primary, .btn-secondary {
                        width: 100%;
                        justify-content: center;
                    }
                    .shape-dots, .shape-red-dots, .shape-arc, .shape-zigzag {
                        display: none; /* Hide decorations on mobile for cleaner look */
                    }
                }
            `}</style>
        </div>
    );
}