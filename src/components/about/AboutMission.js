import React from 'react';
import { IoRocketOutline, IoBriefcaseOutline } from 'react-icons/io5';

export default function AboutMission() {
    return (
        <section className="mission-section">
            <div className="container">
                <div className="mission-grid">
                    
                    {/* Left: Image Area */}
                    <div className="image-wrapper">
                        <div className="bg-shape-solid"></div>
                        <div className="bg-shape-dots"></div>
                        <img src="/images/about.png" alt="Elevate Interns Mission" className="main-img" />
                        
                        {/* Floating Experience Badge */}
                        <div className="experience-badge">
                            <span className="years">6+</span>
                            <span className="text">Years of<br/>Excellence</span>
                        </div>
                    </div>

                    {/* Right: Content Area */}
                    <div className="content-area">
                        <span className="subtitle">OUR MISSION</span>
                        <h2>Empowering Students for<br/> the <span className="highlight">Modern Industry</span></h2>
                        <div className="brush-stroke"></div>
                        
                        <p className="desc">
                            Elevate Interns is dedicated to providing better industrial training to students as per the requirements of modern industries. Our mission is to provide remarkable, industry-oriented training so that upon completion, our students are fully equipped to secure jobs in reputed companies.
                        </p>
                        
                        <div className="icon-points">
                            <div className="point-item">
                                <div className="icon-box"><IoBriefcaseOutline /></div>
                                <div>
                                    <h4>Career Readiness</h4>
                                    <p>Bridging the gap between academic theory and practical industry demands.</p>
                                </div>
                            </div>
                            <div className="point-item">
                                <div className="icon-box"><IoRocketOutline /></div>
                                <div>
                                    <h4>Entrepreneurial Growth</h4>
                                    <p>Developing technical and professional skills to help students start their own successful businesses.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .mission-section { padding: 6rem 1.5rem; background-color: #ffffff; font-family: 'Ubuntu', sans-serif; overflow: hidden; }
                .container { max-width: 1200px; margin: 0 auto; }
                
                /* Layout: Image Left, Content Right */
                .mission-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 5rem; align-items: center; }

                /* Image Styling */
                .image-wrapper { position: relative; padding: 2rem 2rem 2rem 0; }
                .bg-shape-solid { position: absolute; bottom: 0; left: -2rem; width: 80%; height: 80%; background-color: #f4f6f9; border-radius: 12px; z-index: 0; }
                .bg-shape-dots { position: absolute; top: 0; right: 0; width: 140px; height: 140px; background-image: radial-gradient(#72BAA9 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.4; z-index: 0; } /* Brand Teal */
                .main-img { width: 100%; border-radius: 12px; position: relative; z-index: 1; box-shadow: 0 15px 30px rgba(0,0,0,0.08); object-fit: cover; aspect-ratio: 4/5; background-color: #e2e8f0; }

                .experience-badge { position: absolute; bottom: 2rem; right: -2rem; background: #934761; color: white; padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 15px; box-shadow: 0 10px 25px rgba(147, 71, 97, 0.3); z-index: 2; border: 4px solid white; } /* Brand Plum */
                .experience-badge .years { font-size: 2.5rem; font-weight: 700; color: #D5E7B5; line-height: 1; } /* Brand Light Green */
                .experience-badge .text { font-size: 0.95rem; font-weight: 600; line-height: 1.3; }

                /* Content Styling */
                .subtitle { font-size: 0.85rem; font-weight: 700; color: #AD5C71; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; display: block; } /* Brand Rose */
                .content-area h2 { font-size: 2.8rem; color: #1e293b; font-weight: 700; line-height: 1.2; margin: 0 0 10px 0; }
                .highlight { color: #72BAA9; } /* Brand Teal */
                .brush-stroke { width: 90px; height: 5px; background-color: #934761; border-radius: 10px; margin-bottom: 1.5rem; } /* Brand Plum */
                .desc { color: #64748b; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2.5rem; }

                .icon-points { display: flex; flex-direction: column; gap: 1.5rem; }
                .point-item { display: flex; gap: 20px; align-items: flex-start; }
                .icon-box { width: 60px; height: 60px; min-width: 60px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #72BAA9; transition: all 0.3s ease; } /* Brand Teal */
                .point-item:hover .icon-box { background: #72BAA9; color: white; border-color: #72BAA9; transform: translateY(-3px); } /* Brand Teal */
                .point-item h4 { font-size: 1.2rem; color: #1e293b; font-weight: 700; margin: 0 0 5px 0; }
                .point-item p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0; }

                @media (max-width: 992px) {
                    .mission-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .image-wrapper { max-width: 500px; margin: 0 auto; padding-right: 2rem; }
                    .experience-badge { right: 0; }
                }
                @media (max-width: 768px) {
                    .mission-section { padding: 4rem 1rem; }
                    .content-area h2 { font-size: 2.2rem; }
                    .experience-badge { padding: 1rem; right: -10px; }
                    .experience-badge .years { font-size: 2rem; }
                }
            `}</style>
        </section>
    );
}