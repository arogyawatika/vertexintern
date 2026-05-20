import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

export default function AboutWhyChooseUs() {
    return (
        <section className="why-choose-section">
            <div className="container">
                <div className="choose-grid">
                    
                    {/* Left: Content Area */}
                    <div className="content-area">
                        <span className="subtitle">WHY CHOOSE US</span>
                        <h2>The Best <span className="highlight">Beneficial</span> Side of Elevate Interns</h2>
                        <div className="brush-stroke"></div>
                        
                        <p className="desc">
                            We work continuously to study new technologies used in the industry day by day, ensuring that our training is highly effective, relevant, and prepares you perfectly for the workforce.
                        </p>
                        
                        <ul className="benefit-list">
                            <li>
                                <IoCheckmarkCircle className="check-icon" />
                                <div>
                                    <h4>High Quality Courses</h4>
                                    <p>Comprehensive curriculum designed by top industry experts.</p>
                                </div>
                            </li>
                            <li>
                                <IoCheckmarkCircle className="check-icon" />
                                <div>
                                    <h4>Lifetime Access</h4>
                                    <p>Learn at your own pace with unlimited access to resources.</p>
                                </div>
                            </li>
                            <li>
                                <IoCheckmarkCircle className="check-icon" />
                                <div>
                                    <h4>Expert Instructors</h4>
                                    <p>Get guided by professionals with years of real-world experience.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Image Area */}
                    <div className="image-wrapper">
                        <div className="bg-shape-solid"></div>
                        <div className="bg-shape-dots"></div>
                        <img src="/images/about.png" alt="Why Choose Elevate Interns" className="main-img" />
                    </div>

                </div>
            </div>

            <style jsx>{`
                .why-choose-section { padding: 6rem 1.5rem; background-color: #fcfcfc; font-family: 'Ubuntu', sans-serif; overflow: hidden; }
                .container { max-width: 1200px; margin: 0 auto; }
                
                /* Layout: Content Left, Image Right */
                .choose-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; align-items: center; }

                /* Content Styling */
                .subtitle { font-size: 0.85rem; font-weight: 700; color: #AD5C71; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem; display: block; } /* Brand Rose */
                .content-area h2 { font-size: 2.8rem; color: #1e293b; font-weight: 700; line-height: 1.2; margin: 0 0 10px 0; }
                .highlight { color: #72BAA9; } /* Brand Teal */
                .brush-stroke { width: 90px; height: 5px; background-color: #934761; border-radius: 10px; margin-bottom: 1.5rem; } /* Brand Plum */
                .desc { color: #64748b; font-size: 1.1rem; line-height: 1.7; margin-bottom: 2.5rem; }

                /* List Styling */
                .benefit-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.5rem; }
                .benefit-list li { display: flex; align-items: flex-start; gap: 15px; }
                
                :global(.check-icon) { font-size: 1.8rem; color: #72BAA9; min-width: 1.8rem; margin-top: 3px; } /* Brand Teal */
                
                .benefit-list h4 { font-size: 1.2rem; color: #1e293b; font-weight: 700; margin: 0 0 5px 0; }
                .benefit-list p { color: #64748b; font-size: 0.95rem; line-height: 1.5; margin: 0; }

                /* Image Styling */
                .image-wrapper { position: relative; padding: 2rem 0 2rem 2rem; }
                .bg-shape-solid { position: absolute; top: 0; right: -2rem; width: 80%; height: 80%; background-color: #934761; border-radius: 12px; z-index: 0; opacity: 0.08; } /* Brand Plum tinted */
                .bg-shape-dots { position: absolute; bottom: 0; left: 0; width: 140px; height: 140px; background-image: radial-gradient(#72BAA9 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.4; z-index: 0; } /* Brand Teal */
                .main-img { width: 100%; border-radius: 12px; position: relative; z-index: 1; box-shadow: 0 15px 30px rgba(0,0,0,0.05); object-fit: cover; aspect-ratio: 4/5; background-color: #e2e8f0; }

                /* Responsive */
                @media (max-width: 992px) {
                    /* On mobile/tablet, the Content always stacks above the Image natively via DOM order */
                    .choose-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .image-wrapper { max-width: 500px; margin: 0 auto; padding-left: 2rem; }
                }
                @media (max-width: 768px) {
                    .why-choose-section { padding: 4rem 1rem; }
                    .content-area h2 { font-size: 2.2rem; }
                }
            `}</style>
        </section>
    );
}