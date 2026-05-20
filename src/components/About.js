import React from 'react';
import { IoCheckmarkOutline, IoRibbonOutline } from 'react-icons/io5';

export default function About() {
    return (
        <section className="about-section">
            <div className="container">

                {/* Left Side: Image & Floating Card */}
                <div className="about-image-wrapper">
                    <img
                        src="/images/about.png"
                        alt="Student learning online"
                        className="main-image"
                    />

                    {/* Floating Award Card */}
                    <div className="award-card">
                        <div className="award-icon">
                            <IoRibbonOutline />
                        </div>
                        <div className="award-text">
                            <h3>6+</h3>
                            <p>Years of Excellence</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="about-content">
                    <span className="subtitle">ABOUT ELEVATE INTERNS</span>
                    <h2>Bridging the Gap Between <span className="highlight">Academia</span> & Industry</h2>
                    <p>Elevate Interns is dedicated to providing industry-oriented training that equips students with the practical skills needed for the modern workforce. We focus on transforming learners into confident professionals, skilled workers, and successful entrepreneurs through expert-led programs.</p>

                    <ul className="feature-list">
                        <li>
                            <div className="check-circle"><IoCheckmarkOutline /></div>
                            Industry-Oriented Curriculum
                        </li>
                        <li>
                            <div className="check-circle"><IoCheckmarkOutline /></div>
                            Expert Mentorship & Guidance
                        </li>
                        <li>
                            <div className="check-circle"><IoCheckmarkOutline /></div>
                            Practical Skill Development
                        </li>
                    </ul>
                </div>

            </div>

            <style jsx>{`
                .about-section {
                    padding: 6rem 1.5rem;
                    font-family: 'Ubuntu', sans-serif;
                    background-color: #ffffff;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    gap: 5rem;
                }

                /* --- Image & Floating Card Styles --- */
                .about-image-wrapper {
                    flex: 1;
                    position: relative;
                    /* Padding ensures the floating card doesn't get cut off */
                    padding-bottom: 2rem; 
                    padding-right: 2rem;
                }

                .main-image {
                    width: 100%;
                    max-width: 500px;
                    border-radius: 12px;
                    display: block;
                    object-fit: cover;
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
                }

                .award-card {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    background: #ffffff;
                    padding: 1.25rem 1.5rem;
                    border-radius: 10px;
                    box-shadow: 0 15px 35px rgba(147, 71, 97, 0.15); /* Tinted shadow matching primary plum */
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    z-index: 2;
                }

                .award-icon {
                    background: #D5E7B5; /* Brand Light Green */
                    color: #934761; /* Brand Plum */
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .award-text h3 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #934761; /* Brand Plum */
                }

                .award-text p {
                    margin: 0;
                    font-size: 0.85rem;
                    color: #AD5C71; /* Brand Rose */
                    font-weight: 600;
                }

                /* --- Text Content Styles --- */
                .about-content {
                    flex: 1.2;
                }

                .subtitle {
                    color: #AD5C71; /* Brand Rose */
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    font-size: 0.85rem;
                    display: block;
                    margin-bottom: 0.75rem;
                }

                .about-content h2 {
                    font-size: 2.8rem;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1.2;
                    margin: 0 0 1.5rem 0;
                }

                .highlight {
                    color: #72BAA9; /* Brand Teal Highlight */
                }

                .about-content p {
                    color: #475569;
                    font-size: 1.1rem;
                    line-height: 1.7;
                    margin-bottom: 2rem;
                }

                .feature-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .feature-list li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-weight: 600;
                    color: #1e293b;
                    font-size: 1.05rem;
                }

                .check-circle {
                    color: #72BAA9; /* Brand Teal */
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* --- Tablet Responsive --- */
                @media (max-width: 992px) {
                    .container {
                        gap: 3rem;
                    }
                    .about-content h2 {
                        font-size: 2.2rem;
                    }
                }

                /* --- Mobile Responsive (Strict Single Column) --- */
                @media (max-width: 768px) {
                    .about-section {
                        padding: 4rem 1rem;
                    }
                    .container {
                        flex-direction: column;
                        gap: 2.5rem;
                    }
                    
                    .about-image-wrapper {
                        padding-right: 0;
                        padding-bottom: 1.5rem;
                        display: flex;
                        justify-content: center;
                        width: 100%;
                    }
                    
                    .main-image {
                        max-width: 100%;
                    }

                    /* Adjust floating card for mobile so it stays inside bounds */
                    .award-card {
                        right: 10px;
                        bottom: 0;
                        padding: 1rem 1.25rem;
                    }
                    .award-text h3 {
                        font-size: 1.3rem;
                    }
                    .award-text p {
                        font-size: 0.75rem;
                    }

                    .about-content h2 {
                        font-size: 1.8rem;
                        font-weight: 700;
                    }
                    .about-content p {
                        font-size: 0.95rem;
                    }
                    .feature-list li {
                        font-size: 0.95rem;
                    }
                }
            `}</style>
        </section>
    );
}