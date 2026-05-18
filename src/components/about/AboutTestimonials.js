import React from 'react';
import { IoStar, IoStarHalf } from 'react-icons/io5';

export default function AboutTestimonials() {
    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="testi-grid">
                    
                    {/* Left Content */}
                    <div className="testi-content">
                        <span className="subtitle">TESTIMONIALS</span>
                        <h2>What Our Students<br/> Have To Say</h2>
                        <div className="brush-stroke"></div>
                        
                        <p className="desc">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed eiusmod tempor incididunt labore dolore magna aliquaenim ad minim.
                        </p>

                        <button className="btn-view-all">View All &rarr;</button>
                    </div>

                    {/* Right Content: Cards Flex Layout */}
                    <div className="testi-cards-container">
                        
                        {/* Faded Background Card (Left) */}
                        <div className="testi-card bg-card fade-left">
                            <div className="user-info-top">
                                <div className="avatar-placeholder bg-gray"></div>
                            </div>
                            <p>Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.</p>
                            <div className="stars"><IoStar/><IoStar/><IoStar/><IoStar/><IoStarHalf/></div>
                            <h4>Amber Page</h4>
                            <span className="role">Developer</span>
                        </div>

                        {/* Main Active Card (Center) */}
                        <div className="testi-card active-card">
                            <div className="card-dots"></div>
                            <div className="user-info-top">
                                <div className="avatar-placeholder bg-blue"></div>
                                <div className="quote-badge">99</div>
                            </div>
                            <p>Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.</p>
                            <div className="stars active-stars"><IoStar/><IoStar/><IoStar/><IoStar/><IoStar/></div>
                            <h4>Robert Tapp</h4>
                            <span className="role">Content Creator</span>
                        </div>

                        {/* Faded Background Card (Right) */}
                        <div className="testi-card bg-card fade-right">
                            <div className="user-info-top">
                                <div className="avatar-placeholder bg-gray"></div>
                            </div>
                            <p>Lorem ipsum dolor amet consec tur elit adicing sed do usmod zx tempor enim minim veniam quis nostrud exer citation.</p>
                            <div className="stars"><IoStar/><IoStar/><IoStar/><IoStar/><IoStarHalf/></div>
                            <h4>Sanchez</h4>
                            <span className="role">Student</span>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
                .testimonials-section { padding: 6rem 1.5rem; background-color: #ffffff; font-family: 'Ubuntu', sans-serif; overflow: hidden; }
                .container { max-width: 1200px; margin: 0 auto; }

                .testi-grid { display: grid; grid-template-columns: 1fr 1.8fr; gap: 3rem; align-items: center; }

                /* --- LEFT CONTENT --- */
                .subtitle { font-size: 0.85rem; font-weight: 700; color: #64748b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
                .testi-content h2 { font-size: 2.8rem; color: #1e293b; font-weight: 700; line-height: 1.2; margin: 0 0 10px 0; }
                .brush-stroke { width: 100px; height: 6px; background-color: #1bba93; border-radius: 10px; margin-bottom: 1.5rem; clip-path: polygon(0 10%, 100% 0, 95% 100%, 5% 90%); }
                .desc { color: #64748b; font-size: 1.05rem; line-height: 1.7; margin-bottom: 2.5rem; }

                .btn-view-all { background-color: #1bba93; color: white; border: none; padding: 14px 28px; border-radius: 6px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.3s; }
                .btn-view-all:hover { background-color: #159c7a; }

                /* --- RIGHT CARDS --- */
                .testi-cards-container { display: flex; align-items: center; position: relative; gap: 1rem; }

                .testi-card { background: white; padding: 2.5rem 2rem; border-radius: 12px; width: 320px; flex-shrink: 0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: all 0.3s ease; position: relative; }
                
                /* Active Center Card Styles */
                .active-card { z-index: 10; transform: scale(1.05); box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
                .card-dots { position: absolute; top: 15px; right: 15px; width: 80px; height: 80px; background-image: radial-gradient(#1bba93 2px, transparent 2px); background-size: 12px 12px; opacity: 0.2; }
                
                /* Background Faded Cards */
                .bg-card { opacity: 0.4; z-index: 1; transform: scale(0.95); }
                .fade-left { margin-right: -40px; mask-image: linear-gradient(to right, transparent, black 80%); -webkit-mask-image: linear-gradient(to right, transparent, black 80%); }
                .fade-right { margin-left: -40px; mask-image: linear-gradient(to left, transparent, black 80%); -webkit-mask-image: linear-gradient(to left, transparent, black 80%); }

                .user-info-top { display: flex; align-items: flex-end; margin-bottom: 1.5rem; position: relative; width: fit-content; }
                .avatar-placeholder { width: 60px; height: 60px; border-radius: 50%; }
                .bg-gray { background: #e2e8f0; }
                .bg-blue { background: #145da0; }
                
                .quote-badge { position: absolute; right: -10px; bottom: -5px; background: #1bba93; color: white; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; border: 2px solid white; }

                .testi-card p { color: #64748b; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem; }
                
                .stars { color: #cbd5e1; display: flex; gap: 2px; margin-bottom: 1rem; }
                .active-stars { color: #fcab17; } /* Yellow stars for active */

                .testi-card h4 { color: #1e293b; font-size: 1.15rem; font-weight: 700; margin: 0 0 4px 0; }
                .role { color: #94a3b8; font-size: 0.85rem; }

                @media (max-width: 1024px) {
                    .testi-grid { grid-template-columns: 1fr; gap: 4rem; text-align: center; }
                    .brush-stroke { margin: 0 auto 1.5rem; }
                    .testi-cards-container { justify-content: center; overflow-x: hidden; padding: 2rem 0; }
                }
                
                @media (max-width: 768px) {
                    .testimonials-section { padding: 4rem 1rem; }
                    .testi-content h2 { font-size: 2.2rem; }
                    
                    /* Make it horizontally scrollable on mobile */
                    .testi-cards-container { 
                        justify-content: flex-start; 
                        overflow-x: auto; 
                        scroll-snap-type: x mandatory; 
                        padding: 1rem;
                        gap: 1.5rem;
                        /* Hide scrollbar */
                        -ms-overflow-style: none; scrollbar-width: none;
                    }
                    .testi-cards-container::-webkit-scrollbar { display: none; }
                    
                    .testi-card { scroll-snap-align: center; opacity: 1; transform: scale(1); margin: 0; mask-image: none; -webkit-mask-image: none; box-shadow: 0 10px 30px rgba(0,0,0,0.08); width: 85vw; max-width: 320px; }
                    .active-card { transform: scale(1); }
                }
            `}</style>
        </section>
    );
}