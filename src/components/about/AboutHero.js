import React from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';

export default function AboutHero() {
    return (
        <section className="about-hero-section">
            <div className="container">
                <div className="hero-grid">
                    
                    {/* Left Side: Content */}
                    <div className="hero-content">
                        <div className="section-subtitle">ABOUT US</div>
                        <h2>We Providing The <span className="highlight">Best Quality</span> Online Courses.</h2>
                        <div className="brush-stroke"></div>
                        
                        <p className="desc">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod ex tempor incididunt labore dolore magna aliquaenim ad minim.
                        </p>
                        
                        <ul className="feature-list">
                            <li><span className="check-icon"><IoCheckmarkOutline /></span> Flexible Classes</li>
                            <li><span className="check-icon"><IoCheckmarkOutline /></span> Offline Class Mode</li>
                            <li><span className="check-icon"><IoCheckmarkOutline /></span> Educator Support</li>
                        </ul>
                    </div>

                    {/* Right Side: Image Collage */}
                    <div className="hero-images">
                        <div className="bg-dots-top"></div>
                        <div className="bg-dots-bottom"></div>
                        <div className="bg-arc"></div>

                        {/* Main Image */}
                        <div className="image-main">
                            {/* Replace src with your actual image path */}
                            <img src="/images/about.png" alt="Students learning" className="img-fluid" />
                        </div>
                        
                        {/* Floating Secondary Image */}
                        <div className="image-float">
                            {/* Replace src with your actual image path */}
                            <img src="/images/about.png" alt="Student thinking" className="img-fluid" />
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .about-hero-section { padding: 6rem 1.5rem; font-family: 'Ubuntu', sans-serif; overflow: hidden; }
                .container { max-width: 1200px; margin: 0 auto; }
                
                .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }

                /* --- LEFT CONTENT --- */
                .hero-content { position: relative; padding-left: 2rem; }
                
                /* Yellow Circle Decor */
                .hero-content::before {
                    content: ''; position: absolute; left: -20px; top: -10px; width: 60px; height: 60px;
                    border: 8px solid #fcab17; border-radius: 50%; z-index: -1;
                }

                .section-subtitle { font-size: 0.9rem; font-weight: 700; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1rem; }
                .hero-content h2 { font-size: 3.2rem; color: #1e293b; font-weight: 700; line-height: 1.2; margin: 0; }
                .highlight { color: #ef4444; /* Match red highlight from image */ }
                
                /* Teal brush stroke imitation */
                .brush-stroke { width: 120px; height: 6px; background-color: #1bba93; border-radius: 10px; margin-top: 10px; margin-bottom: 1.5rem; }

                .desc { color: #64748b; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; max-width: 90%; }

                .feature-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
                .feature-list li { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #334155; font-size: 1.05rem; }
                .check-icon { color: #fcab17; font-size: 1.4rem; display: flex; align-items: center; justify-content: center; }

                /* --- RIGHT IMAGES --- */
                .hero-images { position: relative; width: 100%; height: 500px; }
                
                .image-main { position: absolute; left: 0; bottom: 0; width: 75%; height: 80%; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); z-index: 2; background: #e2e8f0; }
                .image-float { position: absolute; right: 0; top: 0; width: 45%; height: 55%; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.15); z-index: 3; background: #fcab17; border: 8px solid white; }
                .img-fluid { width: 100%; height: 100%; object-fit: cover; }

                /* Image Decorations */
                .bg-dots-top { position: absolute; left: -10%; top: 10%; width: 150px; height: 150px; background-image: radial-gradient(#ef4444 2px, transparent 2px); background-size: 15px 15px; opacity: 0.4; z-index: 1; }
                .bg-dots-bottom { position: absolute; right: -5%; bottom: -5%; width: 150px; height: 150px; background-image: radial-gradient(#1bba93 2px, transparent 2px); background-size: 15px 15px; opacity: 0.5; z-index: 1; }
                .bg-arc { position: absolute; left: 5%; bottom: -10%; width: 120px; height: 120px; border: 4px solid #ef4444; border-radius: 50%; clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%); z-index: 4; }

                @media (max-width: 992px) {
                    .hero-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .hero-images { height: 400px; max-width: 500px; margin: 0 auto; }
                    .hero-content h2 { font-size: 2.5rem; }
                }
                @media (max-width: 768px) {
                    .about-hero-section { padding: 4rem 1rem; }
                    .hero-content h2 { font-size: 2.2rem; }
                    .hero-content::before { left: -10px; width: 40px; height: 40px; }
                    .image-main { width: 85%; }
                    .image-float { width: 50%; height: 50%; }
                }
            `}</style>
        </section>
    );
}