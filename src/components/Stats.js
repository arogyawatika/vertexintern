import React, { useState, useEffect, useRef } from 'react';

export default function Stats() {
    const [isVisible, setIsVisible] = useState(false);
    const statsRef = useRef(null);

    // Intersection Observer to trigger animation when scrolled into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats-section" ref={statsRef}>
            
            {/* --- Decorative Background Elements using Brand Colors --- */}
            <div className="decor-dots-top"></div>
            <div className="decor-circle-top"></div>
            <div className="decor-blob-bottom"></div>
            <div className="decor-dots-bottom"></div>

            <div className="container">
                <div className={`stats-card ${isVisible ? 'animate-in' : ''}`}>
                    
                    {/* Stat 1: Top Left */}
                    <div className="stat-item border-bottom border-right">
                        <h3 className="color-teal">15K+</h3>
                        <p>Students Elevated</p>
                    </div>

                    {/* Stat 2: Top Right */}
                    <div className="stat-item border-bottom">
                        <h3 className="color-rose">50+</h3>
                        <p>Industry Programs</p>
                    </div>

                    {/* Stat 3: Bottom Left */}
                    <div className="stat-item border-right">
                        <h3 className="color-plum">100+</h3>
                        <p>Expert Mentors</p>
                    </div>

                    {/* Stat 4: Bottom Right */}
                    <div className="stat-item">
                        {/* Using Teal again here for balanced cross-color harmony */}
                        <h3 className="color-teal-alt">95%</h3>
                        <p>Career Success Rate</p>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .stats-section { 
                    /* Creates the 50/50 split background effect seen in your image */
                    background: linear-gradient(to bottom, #f4f6f9 50%, #ffffff 50%);
                    padding: 8rem 1.5rem; 
                    font-family: 'Ubuntu', sans-serif;
                    position: relative;
                    overflow: hidden;
                }

                .container { 
                    max-width: 900px; /* Constrained width for the single card look */
                    margin: 0 auto; 
                    position: relative;
                    z-index: 10;
                }

                /* --- Main Central Card --- */
                .stats-card {
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .stats-card.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* --- Individual Stat Cells --- */
                .stat-item {
                    padding: 4rem 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    transition: background 0.3s ease;
                }

                .stat-item:hover {
                    background: #fdfdfd;
                }

                /* Thin borders separating the 2x2 grid */
                .border-bottom {
                    border-bottom: 1px solid #e2e8f0;
                }
                .border-right {
                    border-right: 1px solid #e2e8f0;
                }

                /* Text Styling */
                .stat-item h3 {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin: 0 0 0.5rem 0;
                    line-height: 1;
                    letter-spacing: -1px;
                }

                .stat-item p {
                    color: #475569;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin: 0;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }

                /* --- Brand Colors Applied to Text --- */
                .color-teal { color: #72BAA9; }
                .color-rose { color: #AD5C71; }
                .color-plum { color: #934761; }
                .color-teal-alt { color: #72BAA9; }

                /* --- Background Decorative Elements (Matches your image exactly) --- */
                .decor-dots-top {
                    position: absolute;
                    top: 15%;
                    left: 15%;
                    width: 140px;
                    height: 140px;
                    background-image: radial-gradient(#72BAA9 2px, transparent 2px);
                    background-size: 16px 16px;
                    opacity: 0.6;
                    z-index: 1;
                }

                .decor-circle-top {
                    position: absolute;
                    top: 10%;
                    left: 22%;
                    width: 120px;
                    height: 120px;
                    border: 6px dashed #AD5C71;
                    border-radius: 50%;
                    z-index: 2;
                    animation: spin 30s linear infinite;
                }

                .decor-blob-bottom {
                    position: absolute;
                    bottom: 10%;
                    right: 15%;
                    width: 200px;
                    height: 200px;
                    background-color: #D5E7B5; /* Brand Light Green */
                    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                    z-index: 1;
                    animation: morph 8s ease-in-out infinite alternate;
                }

                .decor-dots-bottom {
                    position: absolute;
                    bottom: 12%;
                    right: 25%;
                    width: 120px;
                    height: 120px;
                    background-image: radial-gradient(#934761 2px, transparent 2px);
                    background-size: 16px 16px;
                    opacity: 0.4;
                    z-index: 2;
                }

                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes morph {
                    0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
                    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                }

                /* --- Tablet Responsive --- */
                @media (max-width: 992px) {
                    .stats-section { padding: 6rem 1.5rem; }
                    .stat-item { padding: 3rem 1.5rem; }
                    .stat-item h3 { font-size: 3rem; }
                    .decor-dots-top, .decor-circle-top, .decor-blob-bottom, .decor-dots-bottom { display: none; } /* Hide decor on smaller screens to keep it clean */
                }

                /* --- Mobile Responsive (Strict 2x2 Grid) --- */
                @media (max-width: 768px) {
                    .stats-section { 
                        padding: 4rem 1rem; 
                        /* Keep the split background but adjust proportion for mobile */
                        background: linear-gradient(to bottom, #f4f6f9 30%, #ffffff 30%);
                    }
                    .stats-card {
                        /* Ensures it stays 2 columns exactly like your mobile screenshot */
                        grid-template-columns: 1fr 1fr;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                    }
                    .stat-item {
                        padding: 2.5rem 1rem;
                    }
                    .stat-item h3 {
                        font-size: 2.2rem;
                        margin-bottom: 0.25rem;
                    }
                    .stat-item p {
                        font-size: 0.7rem;
                        letter-spacing: 0.5px;
                    }
                }

                /* Extra small phones */
                @media (max-width: 480px) {
                    .stat-item { padding: 2rem 0.5rem; }
                    .stat-item h3 { font-size: 1.8rem; }
                    .stat-item p { font-size: 0.65rem; }
                }
            `}</style>
        </section>
    );
}