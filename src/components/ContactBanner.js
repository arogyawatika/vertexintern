import React from 'react';

export default function ContactBanner() {
    return (
        <section className="contact-banner-section">
            <div className="container">
                <div className="banner-inner">
                    
                    {/* Left Side: Email */}
                    <div className="contact-block left-block">
                        <span className="label">Get In Touch:</span>
                        <a href="mailto:info@vertexinternship.com" className="value">info@vertexinternship.com</a>
                    </div>

                    {/* Center: OR Circle */}
                    <div className="divider-block">
                        <div className="or-circle">or</div>
                    </div>

                    {/* Right Side: Phone */}
                    <div className="contact-block right-block">
                        <span className="label">Call Us Via:</span>
                        <a href="tel:+011235641231" className="value">+01 123 5641 231</a>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .contact-banner-section {
                    padding: 4rem 1.5rem;
                    font-family: 'Ubuntu', sans-serif;
                    background-color: #ffffff; /* Page background */
                }

                .container {
                    max-width: 1000px; /* Slightly narrower than standard container for better proportions */
                    margin: 0 auto;
                }

                .banner-inner {
                    /* Teal gradient matching your screenshot */
                    background: linear-gradient(135deg, #1bba93 0%, #23c197 50%, #20b086 100%);
                    
                    /* If you want to use your Brand Blue instead, uncomment the line below and delete the teal one above: */
                    /* background: linear-gradient(135deg, #145da0 0%, #0b3964 100%); */

                    border-radius: 12px;
                    padding: 3.5rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                }

                /* Optional: Placeholder for topographic background image */
                .banner-inner::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    /* Add your subtle topographic line image here if you have it */
                    /* background-image: url('/images/topo-pattern.png'); */
                    background-size: cover;
                    opacity: 0.15;
                    pointer-events: none;
                }

                .contact-block {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    z-index: 2; /* Keeps text above the background pattern */
                }

                .left-block {
                    text-align: right;
                    padding-right: 2rem;
                }

                .right-block {
                    text-align: left;
                    padding-left: 2rem;
                }

                .label {
                    color: #ffffff;
                    font-size: 1.1rem;
                    font-weight: 400;
                    margin-bottom: 0.25rem;
                }

                .value {
                    color: #ffffff;
                    font-size: 1.8rem;
                    font-weight: 700; /* Max weight 700 */
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }

                .value:hover {
                    opacity: 0.8;
                }

                .divider-block {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }

                .or-circle {
                    background-color: #ffffff;
                    color: #1bba93; /* Matches the teal background */
                    width: 65px;
                    height: 65px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    font-weight: 700;
                    /* This creates the translucent outer ring seen in your screenshot */
                    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.3); 
                }

                /* --- Tablet Responsive --- */
                @media (max-width: 992px) {
                    .value {
                        font-size: 1.4rem;
                    }
                    .left-block { padding-right: 1.5rem; }
                    .right-block { padding-left: 1.5rem; }
                }

                /* --- Mobile Responsive (Matches the vertical layout screenshot) --- */
                @media (max-width: 768px) {
                    .contact-banner-section {
                        padding: 2rem 1rem;
                    }

                    .banner-inner {
                        flex-direction: column;
                        padding: 3rem 1.5rem;
                        gap: 2rem;
                    }

                    .left-block, .right-block {
                        text-align: center;
                        padding: 0;
                    }

                    .value {
                        font-size: 1.5rem;
                    }

                    .or-circle {
                        width: 55px;
                        height: 55px;
                        font-size: 1.1rem;
                        box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.3);
                    }
                }
            `}</style>
        </section>
    );
}