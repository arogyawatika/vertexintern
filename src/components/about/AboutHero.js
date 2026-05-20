import React from 'react';
import { IoCheckmarkOutline, IoRibbonOutline } from 'react-icons/io5';

export default function AboutHero() {
    return (
        <section className="about-hero-section">
            <div className="container">
                <div className="hero-grid">
                    
                    {/* Left Side: Professional Content */}
                    <div className="hero-content">
                        <div className="section-subtitle">
                            <IoRibbonOutline className="subtitle-icon" /> Recognized & Certified
                        </div>
                        <h2>We Are An <span className="highlight">ISO Certified</span> Leading Training Hub.</h2>
                        <div className="brush-stroke"></div>
                        
                        <p className="desc">
                            Elevate Interns (A venture of Antigravity Technologies) is dedicated to bridging the gap between academia and industry. Our certifications are recognized by government bodies, ensuring your skills carry global weight and professional value.
                        </p>
                        
                        <ul className="feature-list">
                            <li><span className="check-icon"><IoCheckmarkOutline /></span> MSME Registered Organization</li>
                            <li><span className="check-icon"><IoCheckmarkOutline /></span> ISO 9001:2015 Quality Standards</li>
                            <li><span className="check-icon"><IoCheckmarkOutline /></span> Industry Oriented Curriculum</li>
                        </ul>
                    </div>

                    {/* Right Side: Rectangular Logo Cards */}
                    <div className="hero-logos-area">
                        {/* Decorative Background Shapes */}
                        <div className="bg-dots-top"></div>
                        <div className="bg-arc"></div>

                        <div className="logo-stack">
                            {/* MSME Logo Box */}
                            <div className="logo-card">
                                <img src="/images/msme.jpg" alt="MSME Certified" className="logo-img" />
                                <div className="logo-label">MSME Recognized</div>
                            </div>

                            {/* AICTE/Education Logo Box */}
                            <div className="logo-card">
                                <img src="/images/nip.png" alt="AICTE Compliant" className="logo-img" />
                                <div className="logo-label">National Internship Portal</div>
                            </div>

                            {/* ISO Logo Box */}
                            <div className="logo-card">
                                <img src="/images/iso.jpg" alt="ISO 9001:2015" className="logo-img" />
                                <div className="logo-label">ISO 9001:2015 Certified</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .about-hero-section { padding: 6rem 1.5rem; font-family: 'Ubuntu', sans-serif; overflow: hidden; }
                .container { max-width: 1200px; margin: 0 auto; }
                
                .hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 5rem; align-items: center; }

                /* --- LEFT CONTENT --- */
                .hero-content { position: relative; }
                
                .section-subtitle { 
                    display: flex; align-items: center; gap: 8px;
                    font-size: 0.9rem; font-weight: 700; color: #145da0; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1rem; 
                }
                :global(.subtitle-icon) { font-size: 1.2rem; }

                .hero-content h2 { font-size: 3.2rem; color: #1e293b; font-weight: 700; line-height: 1.2; margin: 0; }
                .highlight { color: #fcab17; }
                
                .brush-stroke { width: 100px; height: 5px; background-color: #1bba93; border-radius: 10px; margin-top: 12px; margin-bottom: 1.5rem; }

                .desc { color: #64748b; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; }

                .feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
                .feature-list li { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #334155; font-size: 1.05rem; }
                .check-icon { color: #1bba93; font-size: 1.4rem; display: flex; align-items: center; }

                /* --- RIGHT LOGO AREA --- */
                .hero-logos-area { position: relative; display: flex; justify-content: center; }
                
                .logo-stack { 
                    display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 400px; 
                    position: relative; z-index: 2;
                }

                .logo-card { 
                    background: #ffffff; 
                    padding: 0.5rem; 
                    border-radius: 12px; 
                    border: 1px solid #e2e8f0;
                    display: flex; 
                    align-items: center; 
                    gap: 1.5rem;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.03);
                    transition: transform 0.3s ease, border-color 0.3s;
                }


                .logo-img { width: 100px; height: 100px; object-fit: contain; }
                
                .logo-label { font-size: 1rem; font-weight: 700; color: #1e293b; }

                /* Decorations */
                .bg-dots-top { position: absolute; right: -5%; top: -10%; width: 150px; height: 150px; background-image: radial-gradient(#cbd5e1 2.5px, transparent 2.5px); background-size: 18px 18px; z-index: 1; }
                .bg-arc { position: absolute; left: -10%; bottom: -10%; width: 120px; height: 120px; border: 3px solid #fcab17; border-radius: 50%; clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%); z-index: 1; }

                /* --- RESPONSIVE --- */
                @media (max-width: 992px) {
                    .hero-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .hero-content { text-align: center; }
                    .section-subtitle, .feature-list li { justify-content: center; }
                    .brush-stroke { margin-left: auto; margin-right: auto; }
                    .logo-stack { max-width: 500px; }
                }

                @media (max-width: 768px) {
                    .about-hero-section { padding: 4rem 1rem; }
                    .hero-content h2 { font-size: 2.2rem; }
                    .logo-card { padding: 0.5rem; gap: 1rem; }
                    .logo-img { width: 100px; height: 100px; }
                    .logo-label { font-size: 0.9rem; }
                }
            `}</style>
        </section>
    );
}