import React, { useState, useEffect, useRef } from 'react';

export default function Stats() {
    const [isVisible, setIsVisible] = useState(false);
    const statsRef = useRef(null);

    const statsData = [
        { number: '15K+', label: 'Students Elevated' },
        { number: '50+', label: 'Industry Programs' },
        { number: '100+', label: 'Expert Mentors' },
        { number: '95%', label: 'Career Success Rate' }
    ];

    // Intersection Observer to trigger animation when scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once animated
                }
            },
            { threshold: 0.2 } // Triggers when 20% of the section is visible
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats-section" ref={statsRef}>
            <div className="container">
                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <div 
                            key={index} 
                            className={`stat-card ${isVisible ? 'animate-in' : ''}`}
                            style={{ transitionDelay: `${index * 0.15}s` }} 
                        >
                            <div className="stat-inner">
                                <h3 className="text-3d">{stat.number}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .stats-section { 
                    /* Premium Light Gradient Background (Soft diagonal transitioning to a very pale teal/grey) */
                    background: linear-gradient(135deg, #ffffff 0%, #f0f5f4 100%); 
                    padding: 6rem 1.5rem; 
                    font-family: 'Ubuntu', sans-serif;
                    position: relative;
                    overflow: hidden;
                    border-top: 1px solid rgba(114, 186, 169, 0.2);
                }

                /* Subtle background glow using Rose for a touch of warmth */
                .stats-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -10%;
                    width: 50%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(173, 92, 113, 0.08) 0%, transparent 60%);
                    pointer-events: none;
                }

                .container { 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    position: relative;
                    z-index: 1;
                }

                .stats-grid { 
                    display: grid; 
                    grid-template-columns: repeat(4, 1fr); 
                    gap: 2rem; 
                }
                
                .stat-card {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .stat-card.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Premium Card Style */
                .stat-inner {
                    background: #ffffff;
                    border: 1px solid transparent;
                    border-radius: 16px;
                    padding: 3rem 1.5rem;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
                    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                }

                .stat-inner:hover {
                    border-color: #72BAA9; /* Clear teal border */
                    box-shadow: 0 15px 40px rgba(114, 186, 169, 0.15); /* Prominent teal shadow */
                }

                /* --- 3D Text CSS Magic --- */
                .text-3d { 
                    color: #72BAA9; /* Teal Accent */
                    font-size: 3rem; 
                    font-weight: 700; 
                    margin: 0 0 0.75rem 0; 
                    letter-spacing: 1px;
                    text-shadow: 
                        1px 1px 0 #5b9b8b,
                        2px 2px 0 #468071,
                        3px 3px 0 #33675a,
                        4px 4px 0 #214f43,
                        6px 6px 15px rgba(0, 0, 0, 0.15);
                }

                .stat-inner p { 
                    color: #934761; /* Primary Plum Color */
                    font-size: 1.1rem; 
                    font-weight: 600; 
                    margin: 0; 
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                /* --- Tablet Responsive --- */
                @media (max-width: 992px) {
                    .stats-grid { 
                        grid-template-columns: repeat(2, 1fr); 
                        gap: 2rem; 
                    }
                    .text-3d {
                        font-size: 2.8rem;
                    }
                }

                /* --- Mobile Responsive (Strict 2x2 Grid) --- */
                @media (max-width: 768px) {
                    .stats-section { 
                        padding: 4rem 1rem; 
                    }
                    .stats-grid { 
                        /* Forces exactly 2 columns */
                        grid-template-columns: repeat(2, 1fr); 
                        gap: 1rem; 
                    }
                    .stat-inner {
                        padding: 2rem 1rem;
                        border-radius: 12px;
                    }
                    .text-3d { 
                        font-size: 2rem; 
                        text-shadow: 
                            1px 1px 0 #5b9b8b,
                            2px 2px 0 #468071,
                            3px 3px 0 #33675a,
                            4px 4px 10px rgba(0, 0, 0, 0.15);
                    }
                    .stat-inner p { 
                        font-size: 0.85rem; 
                        letter-spacing: 1px;
                    }
                }

                /* Extra small phones - Keeps the 2x2 layout but shrinks text to fit seamlessly */
                @media (max-width: 480px) {
                    .stats-grid { 
                        /* Strictly maintains the 2 column layout */
                        grid-template-columns: repeat(2, 1fr); 
                        gap: 0.75rem; 
                    }
                    .stat-inner {
                        padding: 1.5rem 0.5rem;
                    }
                    .text-3d {
                        font-size: 1.6rem; /* Scaled down to fit side-by-side */
                    }
                    .stat-inner p {
                        font-size: 0.7rem; /* Scaled down to prevent text wrapping awkwardly */
                        letter-spacing: 0.5px;
                    }
                }
            `}</style>
        </section>
    );
}