import React from 'react';
import { IoDocumentTextOutline, IoDownloadOutline } from 'react-icons/io5';

export default function AboutDownloadProfile() {
    return (
        <section className="download-section">
            <div className="container">
                <div className="download-card">
                    
                    {/* Background Decorative Glow */}
                    <div className="bg-glow"></div>

                    {/* Left/Top Content */}
                    <div className="content">
                        <div className="icon-wrapper">
                            <IoDocumentTextOutline />
                        </div>
                        <div className="text-content">
                            <h2>Download Our Company Profile</h2>
                            <p>Get detailed insights into our programs, mission, and achievements in one comprehensive PDF.</p>
                        </div>
                    </div>

                    {/* Right/Bottom Button */}
                    {/* Make sure to place your PDF file in the 'public' folder of your Next.js app */}
                    <a 
                        href="/company-profile.pdf" 
                        download="Elevate_Interns_Company_Profile.pdf" 
                        className="btn-download"
                    >
                        <IoDownloadOutline className="dl-icon" /> Download PDF
                    </a>

                </div>
            </div>

            <style jsx>{`
                .download-section {
                    padding: 2rem 1.5rem 6rem; /* Extra bottom padding */
                    background-color: #ffffff;
                    font-family: 'Ubuntu', sans-serif;
                }
                .container {
                    max-width: 1000px; /* Slightly narrower for a sleek CTA feel */
                    margin: 0 auto;
                }
                
                .download-card {
                    background: linear-gradient(135deg, #145da0 0%, #0b3964 100%);
                    border-radius: 12px;
                    padding: 2.5rem 3.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 15px 30px rgba(20, 93, 160, 0.15);
                    position: relative;
                    overflow: hidden;
                }

                .bg-glow {
                    position: absolute;
                    right: -10%;
                    top: -50%;
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(252, 171, 23, 0.15) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                }

                .content {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    z-index: 1;
                }

                .icon-wrapper {
                    font-size: 3.5rem;
                    color: #fcab17;
                    display: flex;
                    align-items: center;
                }

                .text-content h2 {
                    color: #ffffff;
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.5px;
                }
                .text-content p {
                    color: #cbd5e1;
                    font-size: 1.05rem;
                    margin: 0;
                    line-height: 1.5;
                }

                .btn-download {
                    background-color: #fcab17;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 16px 32px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 1;
                    white-space: nowrap;
                    border: 2px solid #fcab17;
                }
                .btn-download:hover {
                    background-color: transparent;
                    color: #fcab17;
                }
                
                :global(.dl-icon) {
                    font-size: 1.4rem;
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .download-section {
                        padding: 2rem 1rem 4rem;
                    }
                    .download-card {
                        flex-direction: column;
                        text-align: center;
                        padding: 2.5rem 1.5rem;
                        gap: 2rem;
                    }
                    .content {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .text-content h2 {
                        font-size: 1.5rem;
                    }
                    .text-content p {
                        font-size: 0.95rem;
                    }
                    .btn-download {
                        width: 100%;
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    );
}