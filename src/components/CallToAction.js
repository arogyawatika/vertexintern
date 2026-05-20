import React from 'react';
import Link from 'next/link';

export default function CallToAction() {
    return (
        <section className="cta-section">
            {/* Background Decorative Elements */}
            <div className="bg-circle bg-circle-left"></div>
            <div className="bg-circle bg-circle-center"></div>

            <div className="container">
                <div className="cta-content">
                    <h2>
                        Get Your Quality Skills <span className="highlight">Certificate</span>
                        <br className="desktop-break" /> Through Elevate Internship
                    </h2>
                    
                    <Link href="/courses" legacyBehavior passHref>
                        <a className="btn-cta">Get started now &rarr;</a>
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .cta-section {
                    background-color: #f4f6f9; /* Light background matching the image */
                    padding: 6rem 1.5rem;
                    font-family: 'Ubuntu', sans-serif;
                    position: relative;
                    overflow: hidden; /* Contains the absolute positioned background circles */
                    text-align: center;
                }

                /* --- Decorative Background Circles --- */
                .bg-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(226, 232, 240, 0.4); /* Very subtle translucent grey/blue */
                    z-index: 0;
                    pointer-events: none;
                }

                .bg-circle-left {
                    width: 400px;
                    height: 400px;
                    top: -100px;
                    left: -150px;
                }

                .bg-circle-center {
                    width: 600px;
                    height: 600px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(226, 232, 240, 0.25);
                }

                /* --- Content Layout --- */
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1; /* Keeps text above background circles */
                }

                .cta-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2.5rem;
                }

                .cta-content h2 {
                    font-size: 3rem;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1.3;
                    margin: 0;
                }

                .highlight {
                    color: #fcab17; /* Brand Accent Color */
                }

                /* --- Button Styles --- */
                a.btn-cta {
                    background-color: #145da0 !important; /* Brand Blue */
                    color: #ffffff !important;
                    padding: 16px 36px;
                    border-radius: 6px;
                    text-decoration: none !important;
                    font-weight: 700;
                    font-size: 1.1rem;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                    border: none;
                    box-shadow: 0 4px 15px rgba(20, 93, 160, 0.2);
                }

                a.btn-cta:hover {
                    background-color: #0f4a82 !important;
                    transform: translateY(-2px);
                }

                /* --- Responsive Adjustments --- */
                @media (max-width: 992px) {
                    .cta-content h2 {
                        font-size: 2.4rem;
                    }
                }

                @media (max-width: 768px) {
                    .cta-section {
                        padding: 4rem 1rem;
                    }
                    .cta-content h2 {
                        font-size: 1.8rem;
                        font-weight: 700;
                    }
                    /* Remove forced line break on smaller screens for natural text wrapping */
                    .desktop-break {
                        display: none;
                    }
                    a.btn-cta {
                        padding: 14px 28px;
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
}