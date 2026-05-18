import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-content">
                    <h1>Get <span className="highlight">2500+</span> Best Online Courses From <span className="highlight">Vertex Intern</span></h1>
                    <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.</p>

                    {/* If using Next.js 12 or older, change this to: <Link href="#" passHref><a className="btn-hero">Find courses →</a></Link> */}
                    {/* Use legacyBehavior and a direct <a> tag to ensure styled-jsx targets it correctly */}
                    <Link href="/courses" legacyBehavior passHref>
                        <a className="btn-hero">Find courses &rarr;</a>
                    </Link>
                </div>
                <div className="hero-image">
                    <img src="/images/hero.png" alt="Vertex Intern Student" />
                </div>
            </div>

            <style jsx>{`
                .hero-section { 
                    background: #f4f6f9; 
                    padding: 6rem 1.5rem 0; /* Increased top padding */
                    min-height: 85vh; /* Forces a taller hero section on desktop */
                    display: flex;
                    align-items: center;
                    font-family: sans-serif; 
                    overflow: hidden; 
                }
                
                .container { 
                    max-width: 1200px; 
                    width: 100%;
                    margin: 0 auto; 
                    display: flex; 
                    align-items: center; 
                    gap: 2rem; 
                }
                
                .hero-content { 
                    flex: 1; 
                    padding-bottom: 2rem; 
                }
                
                .hero-content h1 { 
                    font-size: 3.5rem; 
                    font-weight: 700; 
                    color: #1f2937; 
                    line-height: 1.2; 
                    margin-bottom: 1.5rem; 
                }
                
                .highlight { 
                    color: #fcab17; 
                }
                
                .hero-content p { 
                    font-size: 1.1rem; 
                    color: #4b5563; 
                    line-height: 1.6; 
                    margin-bottom: 2.5rem; 
                    max-width: 90%; 
                }
                
                /* --- FIXED BUTTON STYLES --- */
                .btn-hero, 
                /* --- FIXED BUTTON STYLES --- */
a.btn-hero { 
    background-color: #145da0 !important; /* Force Brand Blue */
    color: #ffffff !important; /* Force White Text */
    padding: 14px 32px; 
    border-radius: 6px; 
    text-decoration: none !important; 
    font-weight: 700; 
    display: inline-flex; 
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease; 
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(20, 93, 160, 0.2); /* Optional: adds a slight pop */
}

a.btn-hero:hover { 
    background-color: #0f4a82 !important; /* Darker blue on hover */
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
                }

                /* Tablet / Small Desktop */
                @media (max-width: 992px) {
                    .hero-section {
                        min-height: auto;
                        padding-top: 5rem;
                    }
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
                        padding: 3rem 2rem 0; 
                    }
                    .hero-content h1 { 
                        font-size: 2.2rem; 
                        font-weight: 700; 
                    }
                    .hero-content p { 
                        font-size: 0.95rem; 
                        font-weight: 400; 
                        margin-bottom: 2rem;
                    }
                    .btn-hero, 
                    a.btn-hero { 
                        padding: 12px 28px; 
                        font-size: 0.95rem; 
                    }
                    .hero-image img { 
                        max-width: 90%; 
                    }
                }
            `}</style>
        </section>
    );
}