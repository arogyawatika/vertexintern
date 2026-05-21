import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero-section">
            {/* --- MAXIMUM LEARNING ELEMENTS (Animated Cliparts) --- */}
            {/* Graduation Cap */}
            <div className="edu-icon icon-1 floating">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L1 7.5L12 13L23 7.5L12 2Z" />
                    <path d="M23 7.5V14C23 14 23 14.1 22.9 14.1C22.8 14.2 22.7 14.2 22.6 14.3L12 19.5L1.4 14.3C1.3 14.2 1.2 14.2 1.1 14.1C1 14.1 1 14 1 14V7.5L12 13L23 7.5Z" fillOpacity="0.7"/>
                    <path d="M5 11.5V18.5C5 18.5 5 18.6 4.9 18.7L2 22V13L5 11.5Z" />
                </svg>
            </div>
            
            {/* Open Book */}
            <div className="edu-icon icon-2 bobbing-slow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            </div>

            {/* Science Atom */}
            <div className="edu-icon icon-3 floating-reverse">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse>
                </svg>
            </div>

            {/* Lightbulb */}
            <div className="edu-icon icon-4 bobbing">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C7.58 2 4 5.58 4 10C4 12.82 5.53 15.31 7.84 16.63L7.17 18.15C6.96 18.63 7.31 19.16 7.83 19.16H16.17C16.69 19.16 17.04 18.63 16.83 18.15L16.16 16.63C18.47 15.31 20 12.82 20 10C20 5.58 16.42 2 12 2ZM12 17.5C11.17 17.5 10.5 16.83 10.5 16C10.5 15.17 11.17 14.5 12 14.5C12.83 14.5 13.5 15.17 13.5 16C13.5 16.83 12.83 17.5 12 17.5Z" fillOpacity="0.8"/>
                    <path d="M10 21V23H14V21H10Z" />
                </svg>
            </div>

            {/* Diploma Scroll */}
            <div className="edu-icon icon-5 floating">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="M10.5 10.5L14 14"></path>
                    <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18l-4-2-4 2-4-2-4 2z"></path>
                </svg>
            </div>

            {/* Pencil */}
            <div className="edu-icon icon-6 bobbing-medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
            </div>

            <div className="container">
                <div className="hero-content">
                    <h1>Get <span className="highlight">2500+</span> Best Online Courses From <span className="highlight">Elevate Intern</span></h1>
                    <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>

                    <Link href="/courses" legacyBehavior passHref>
                        <a className="btn-hero">Find courses &rarr;</a>
                    </Link>
                </div>
                <div className="hero-image">
                    <img src="/images/hero.png" alt="Elevate Intern Student" />
                </div>
            </div>

            <style jsx>{`
                /* Animations */
                @keyframes bob {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(8px, -10px) rotate(5deg); }
                    66% { transform: translate(-8px, 8px) rotate(-5deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                @keyframes floatRev {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(-10px, 8px) rotate(-5deg); }
                    66% { transform: translate(10px, -8px) rotate(5deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }

                .bobbing { animation: bob 4s ease-in-out infinite; }
                .bobbing-medium { animation: bob 5.5s ease-in-out infinite; }
                .bobbing-slow { animation: bob 7s ease-in-out infinite; }
                .floating { animation: float 8s ease-in-out infinite; }
                .floating-reverse { animation: floatRev 9s ease-in-out infinite; }

                .hero-section { 
                    /* Applied the exact #D5E7B5 light green as a glowing center gradient fading to white */
                    background: radial-gradient(circle at 45% 50%, rgba(213, 231, 181, 0.45) 0%, #ffffff 70%); 
                    padding: 6rem 1.5rem 0; 
                    min-height: 85vh; 
                    display: flex;
                    align-items: center;
                    font-family: 'Ubuntu', sans-serif; 
                    position: relative;
                    overflow: hidden; 
                }

                /* --- Icon Placements & Colors --- */
                .edu-icon {
                    position: absolute;
                    opacity: 0.18; /* Keeps them subtle so they don't clutter the view */
                    pointer-events: none;
                    z-index: 0;
                }
                
                /* Using the exact 4-color palette provided */
                .icon-1 { color: #934761; top: 18%; left: 8%; width: 60px; height: 60px; }
                .icon-2 { color: #72BAA9; top: 12%; right: 40%; width: 45px; height: 45px; opacity: 0.25; }
                .icon-3 { color: #AD5C71; top: 60%; left: 5%; width: 70px; height: 70px; opacity: 0.15; }
                .icon-4 { color: #72BAA9; bottom: 15%; left: 45%; width: 45px; height: 45px; opacity: 0.25; }
                .icon-5 { color: #934761; top: 25%; right: 8%; width: 55px; height: 55px; }
                .icon-6 { color: #AD5C71; bottom: 35%; right: 5%; width: 40px; height: 40px; opacity: 0.25; }

                .container { 
                    max-width: 1200px; 
                    width: 100%;
                    margin: 0 auto; 
                    display: flex; 
                    align-items: center; 
                    gap: 2rem; 
                    position: relative;
                    z-index: 1; /* Elevates content above icons */
                }
                
                .hero-content { 
                    flex: 1; 
                    padding-bottom: 2rem; 
                }
                
                .hero-content h1 { 
                    font-size: 3.5rem; 
                    font-weight: 700; 
                    color: #934761; /* Applied Primary Palette Color */
                    line-height: 1.2; 
                    margin-bottom: 1.5rem; 
                }
                
                .highlight { 
                    color: #72BAA9; /* Applied Highlight Palette Color */
                }
                
                .hero-content p { 
                    font-size: 1.1rem; 
                    color: #AD5C71; /* Applied Secondary Palette Color */
                    line-height: 1.6; 
                    margin-bottom: 2.5rem; 
                    max-width: 90%; 
                    font-weight: 500;
                }
                
                /* --- FIXED BUTTON STYLES --- */
                .btn-hero, 
                a.btn-hero { 
                    background-color: #72BAA9 !important; /* Base Teal */
                    color: #ffffff !important; 
                    padding: 14px 32px; 
                    border-radius: 6px; 
                    text-decoration: none !important; 
                    font-weight: 700; 
                    display: inline-flex; 
                    align-items: center;
                    justify-content: center;
                    transition: all 0s ease; 
                    border: none;
                    cursor: pointer;
                }

                a.btn-hero:hover { 
                    background-color: #934761 !important; /* Reverses to primary plum color on hover */
                }

                .hero-image { 
                    flex: 1; 
                    display: flex; 
                    justify-content: center; 
                    align-items: flex-end; 
                    position: relative; 
                    height: 100%;
                }
                
                .hero-image img { 
                    width: 100%; 
                    max-width: 550px; 
                    height: auto; 
                    display: block; 
                    object-fit: contain; 
                    z-index: 1;
                }

                /* Tablet / Small Desktop */
                @media (max-width: 992px) {
                    .hero-section {
                        min-height: auto;
                        padding-top: 5rem;
                    }
                    
                    /* Adjust icon positions for smaller screens */
                    .icon-1 { top: 8%; left: 5%; width: 45px; height: 45px; }
                    .icon-2 { top: 5%; right: 10%; }
                    .icon-3 { top: 40%; left: 2%; width: 50px; height: 50px; }
                    .icon-4 { bottom: 5%; left: 15%; }
                    .icon-5 { top: 20%; right: 5%; width: 40px; height: 40px; }
                    .icon-6 { bottom: 30%; right: 2%; }

                    .container { 
                        flex-direction: column; 
                        text-align: center; 
                        gap: 3rem; 
                    }
                    .hero-content { 
                        padding-bottom: 0; 
                        display: flex; 
                        flex-direction: column; 
                        align-items: center; 
                    }
                    .hero-content p { 
                        max-width: 100%; 
                    }
                }

                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .hero-section { 
                        padding: 3rem 0 0; /* Removed side padding so image can stretch full width */
                    }
                    
                    .hero-content {
                        padding: 0 2rem; /* Add padding back to content only */
                    }

                    .edu-icon { opacity: 0.1; } /* Make icons fainter on mobile */
                    
                    .hero-content h1 { 
                        font-size: 2.2rem; 
                        font-weight: 700; 
                    }
                    .hero-content p { 
                        font-size: 0.95rem; 
                        font-weight: 500; 
                        margin-bottom: 2rem;
                    }
                    .btn-hero, 
                    a.btn-hero { 
                        padding: 12px 28px; 
                        font-size: 0.95rem; 
                    }
                    
                    /* Image stretches strictly to screen width */
                    .hero-image {
                        width: 100%;
                    }
                    .hero-image img { 
                        max-width: 100%;
                        width: 100%; 
                    }
                }
            `}</style>
        </section>
    );
}