import React from 'react';
import { IoEyeOutline, IoTrendingUpOutline } from 'react-icons/io5';

export default function AboutVision() {
    return (
        <section className="vision-section">
            <div className="container">
                <div className="vision-grid">
                    
                    {/* Left: Image Area */}
                    <div className="image-wrapper">
                        <div className="bg-shape-solid"></div>
                        <div className="bg-shape-dots"></div>
                        <img src="/images/about.png" alt="Elevate Interns Vision" className="main-img" />
                    </div>

                    {/* Right: Content Area */}
                    <div className="content-area">
                        <span className="subtitle">OUR VISION</span>
                        <h2>Generating Better <span className="highlight">Entrepreneurs</span> & Leaders</h2>
                        <div className="brush-stroke"></div>
                        
                        <p className="desc">
                            If we provide remarkable, industry-oriented training to students, they will secure jobs in reputed companies. But, if we provide this training with <strong>motivation</strong>, they definitely become entrepreneurs. Therefore, we are working to generate better entrepreneurs, workers, and managers for our society.
                        </p>
                        
                        <div className="icon-points">
                            <div className="point-item">
                                <div className="icon-box"><IoEyeOutline /></div>
                                <div>
                                    <h4>Forward-Thinking Focus</h4>
                                    <p>Anticipating industry shifts to prepare students for the roles of tomorrow, not just today.</p>
                                </div>
                            </div>
                            <div className="point-item">
                                <div className="icon-box"><IoTrendingUpOutline /></div>
                                <div>
                                    <h4>Societal Impact</h4>
                                    <p>Empowering individuals to create jobs and drive economic growth through innovation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .vision-section { padding: 6rem 1.5rem; background-color: #f8fafc; font-family: 'Ubuntu', sans-serif; overflow: hidden; }
                .container { max-width: 1200px; margin: 0 auto; }
                
                /* Layout: Image Left, Content Right */
                .vision-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 5rem; align-items: center; }

                /* Image Styling */
                .image-wrapper { position: relative; padding: 2rem 2rem 2rem 0; }
                .bg-shape-solid { position: absolute; top: 0; left: -2rem; width: 80%; height: 80%; background-color: #ffffff; border-radius: 12px; z-index: 0; box-shadow: inset 0 0 20px rgba(0,0,0,0.02); }
                .bg-shape-dots { position: absolute; bottom: 0; right: 0; width: 140px; height: 140px; background-image: radial-gradient(#145da0 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.2; z-index: 0; }
                .main-img { width: 100%; border-radius: 12px; position: relative; z-index: 1; box-shadow: 0 15px 30px rgba(0,0,0,0.08); object-fit: cover; aspect-ratio: 4/5; background-color: #e2e8f0; }

                /* Content Styling */
                .subtitle { font-size: 0.85rem; font-weight: 700; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
                .content-area h2 { font-size: 2.8rem; color: #1e293b; font-weight: 700; line-height: 1.2; margin: 0 0 10px 0; }
                .highlight { color: #fcab17; } /* Yellow highlight */
                .brush-stroke { width: 90px; height: 5px; background-color: #145da0; border-radius: 10px; margin-bottom: 1.5rem; }
                .desc { color: #64748b; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2.5rem; }
                .desc strong { color: #1e293b; }

                .icon-points { display: flex; flex-direction: column; gap: 1.5rem; }
                .point-item { display: flex; gap: 20px; align-items: flex-start; }
                .icon-box { width: 60px; height: 60px; min-width: 60px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #fcab17; box-shadow: 0 4px 6px rgba(0,0,0,0.02); transition: all 0.3s ease; }
                .point-item:hover .icon-box { background: #fcab17; color: white; border-color: #fcab17; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(252, 171, 23, 0.2); }
                .point-item h4 { font-size: 1.2rem; color: #1e293b; font-weight: 700; margin: 0 0 5px 0; }
                .point-item p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0; }

                /* Responsive */
                @media (max-width: 992px) {
                    /* Stacks Text on top of Image for Mobile/Tablet */
                    .vision-grid { display: flex; flex-direction: column-reverse; gap: 4rem; }
                    .image-wrapper { max-width: 500px; margin: 0 auto; padding-right: 2rem; padding-left: 0; width: 100%; }
                }
                @media (max-width: 768px) {
                    .vision-section { padding: 4rem 1rem; }
                    .content-area h2 { font-size: 2.2rem; }
                }
            `}</style>
        </section>
    );
}