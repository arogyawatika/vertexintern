import React from 'react';
import { IoSchoolOutline, IoKeyOutline, IoPersonOutline } from 'react-icons/io5';

export default function AboutFeatures() {
    return (
        <section className="features-section">
            <div className="bg-circle-right"></div>
            <div className="bg-dots-left"></div>

            <div className="container">
                <div className="section-header">
                    <span className="subtitle">WHY CHOOSE VERTEX INTERNSHIP</span>
                    <h2>The Best <span className="highlight">Beneficial</span> Side<br/> of Vertex Internship</h2>
                    <div className="brush-stroke"></div>
                </div>

                <div className="features-grid">
                    {/* Card 1 */}
                    <div className="feature-card">
                        <div className="icon-wrapper icon-teal">
                            <IoSchoolOutline />
                        </div>
                        <h3>High Quality Courses</h3>
                        <p>Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="feature-card">
                        <div className="icon-wrapper icon-red">
                            <IoKeyOutline />
                        </div>
                        <h3>Life Time Access</h3>
                        <p>Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="feature-card">
                        <div className="icon-wrapper icon-blue">
                            <IoPersonOutline />
                        </div>
                        <h3>Expert Instructors</h3>
                        <p>Lorem ipsum dolor sit amet conset ur elit sed eiusmod ex tempor inc labore dolore magna.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .features-section { padding: 6rem 1.5rem; background-color: #f8fafc; font-family: 'Ubuntu', sans-serif; position: relative; overflow: hidden; }
                .container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
                
                /* Background Decor */
                .bg-circle-right { position: absolute; right: -10%; top: -10%; width: 500px; height: 500px; border: 1px solid #e2e8f0; border-radius: 50%; z-index: 1; }
                .bg-dots-left { position: absolute; left: 2%; top: 5%; width: 120px; height: 120px; background-image: radial-gradient(#1bba93 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.3; z-index: 1; }

                /* Header */
                .section-header { text-align: center; margin-bottom: 4rem; }
                .subtitle { font-size: 0.85rem; font-weight: 700; color: #64748b; letter-spacing: 2px; text-transform: uppercase; }
                .section-header h2 { font-size: 2.8rem; color: #1e293b; font-weight: 700; line-height: 1.3; margin: 10px 0; }
                .highlight { color: #ef4444; }
                .brush-stroke { width: 80px; height: 5px; background-color: #1bba93; border-radius: 10px; margin: 0 auto; }

                /* Cards Grid */
                .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }

                .feature-card { background: #ffffff; padding: 3rem 2rem; border-radius: 12px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: transform 0.3s, box-shadow 0.3s; }
                .feature-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

                .icon-wrapper { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; }
                .icon-teal { background: #e0f8f3; color: #1bba93; }
                .icon-red { background: #fee2e2; color: #ef4444; }
                .icon-blue { background: #e0e7ff; color: #3b82f6; }

                .feature-card h3 { font-size: 1.4rem; color: #1e293b; font-weight: 700; margin-bottom: 1rem; }
                .feature-card p { color: #64748b; font-size: 1rem; line-height: 1.6; margin: 0; }

                @media (max-width: 992px) {
                    .features-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 768px) {
                    .features-section { padding: 4rem 1rem; }
                    .section-header h2 { font-size: 2rem; }
                    .features-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    );
}