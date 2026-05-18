import React, { useState, useEffect, useRef } from 'react';

export default function Stats() {
    const [isVisible, setIsVisible] = useState(false);
    const statsRef = useRef(null);

    const statsData = [
        { number: '15K+', label: 'Students Enrolled' },
        { number: '50+', label: 'Live Courses' },
        { number: '100+', label: 'Expert Mentors' },
        { number: '95%', label: 'Placement Rate' }
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
                            style={{ transitionDelay: `${index * 0.15}s` }} // Staggered delay for each card
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
                    /* Premium rich gradient using brand blue */
                    background: linear-gradient(135deg, #0b3964 0%, #145da0 100%); 
                    padding: 5rem 1.5rem; 
                    font-family: 'Ubuntu', sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                /* Optional subtle background glow */
                .stats-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -10%;
                    width: 50%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(252, 171, 23, 0.1) 0%, transparent 60%);
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
                    /* Initial hidden state for animation */
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* Animate in state */
                .stat-card.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Premium Glassmorphism Card Style */
                .stat-inner {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 2.5rem 1.5rem;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    transition: transform 0.3s ease, background 0.3s ease;
                }

                .stat-inner:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.08);
                }

                /* --- 3D Text CSS Magic --- */
                .text-3d { 
                    color: #fcab17; /* Brand Accent */
                    font-size: 3rem; 
                    font-weight: 700; 
                    margin: 0 0 0.5rem 0; 
                    letter-spacing: 1px;
                    /* Layered text-shadows create the 3D extrusion effect */
                    text-shadow: 
                        1px 1px 0 #d48a06,
                        2px 2px 0 #b37404,
                        3px 3px 0 #945f03,
                        4px 4px 0 #754b02,
                        6px 6px 15px rgba(0, 0, 0, 0.4);
                }

                .stat-inner p { 
                    color: #e2e8f0; 
                    font-size: 1.1rem; 
                    font-weight: 500; 
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

                /* --- Mobile Responsive --- */
                @media (max-width: 768px) {
                    .stats-section { 
                        padding: 4rem 1rem; 
                    }
                    .stats-grid { 
                        grid-template-columns: repeat(2, 1fr); 
                        gap: 1rem; 
                    }
                    .stat-inner {
                        padding: 1.5rem 1rem;
                        border-radius: 12px;
                    }
                    .text-3d { 
                        font-size: 2rem; 
                        /* Slightly reduced 3D effect for smaller screens to keep it clean */
                        text-shadow: 
                            1px 1px 0 #d48a06,
                            2px 2px 0 #b37404,
                            3px 3px 0 #945f03,
                            4px 4px 10px rgba(0, 0, 0, 0.4);
                    }
                    .stat-inner p { 
                        font-size: 0.85rem; 
                        letter-spacing: 1px;
                    }
                }

                /* Extra small phones (Single Column Fallback) */
                @media (max-width: 480px) {
                    .stats-grid { 
                        grid-template-columns: 1fr; 
                    }
                }
            `}</style>
        </section>
    );
}