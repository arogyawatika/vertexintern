import React from 'react';
import Link from 'next/link';
import { 
    IoLogoFacebook, 
    IoLogoLinkedin, 
    IoLogoInstagram, 
    IoLogoTwitter, 
    IoLogoYoutube, 
    IoArrowUpOutline 
} from 'react-icons/io5';

export default function Footer() {
    
    // Smooth scroll to top function for the bottom right button
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-grid">
                    
                    {/* Column 1: Brand & Contact Info */}
                    <div className="footer-widget brand-widget">
                        <Link href="/" legacyBehavior passHref>
                            <a className="footer-logo-link">
                                <img src="/logo.png" alt="Vertex Internship Logo" className="footer-logo" />
                            </a>
                        </Link>
                        <p className="desc">
                            Lorem ipsum dolor amet consecto adi pisicing elit sed eiusm tempor incidid unt labore dolore.
                        </p>
                        <ul className="contact-info">
                            <li><strong>Add:</strong> 70-80 Upper St Norwich NR2</li>
                            <li><strong>Call:</strong> +01 123 5641 231</li>
                            <li><strong>Email:</strong> info@vertexinternship.com</li>
                        </ul>
                    </div>

                    {/* Column 2: Online Platform Links */}
                    <div className="footer-widget">
                        <h4>Online Platform</h4>
                        <ul className="footer-links">
                            <li><Link href="#" legacyBehavior passHref><a>About</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>Courses</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>Instructor</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>Events</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>Instructor Profile</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>Purchase Guide</a></Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="footer-widget">
                        <h4>Links</h4>
                        <ul className="footer-links">
                            <li><Link href="#" legacyBehavior passHref><a>Contact Us</a></Link></li>
                            <li><Link href="/privacy" legacyBehavior passHref><a>Privacy Policy</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>News & Articles</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>FAQ's</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>Sign In/Registration</a></Link></li>
                            <li><Link href="#" legacyBehavior passHref><a>Coming Soon</a></Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Socials */}
                    <div className="footer-widget">
                        <h4>Contacts</h4>
                        <p className="newsletter-text">Enter your email address to register to our newsletter subscription</p>
                        
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Your email" required />
                            <button type="submit" className="btn-subscribe">Subscribe &rarr;</button>
                        </form>
                        
                        <div className="social-links">
                            <a href="#" className="social-icon fb"><IoLogoFacebook /></a>
                            <a href="#" className="social-icon in"><IoLogoLinkedin /></a>
                            <a href="#" className="social-icon ig"><IoLogoInstagram /></a>
                            <a href="#" className="social-icon tw"><IoLogoTwitter /></a>
                            <a href="#" className="social-icon yt"><IoLogoYoutube /></a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="footer-bottom">
                <div className="container bottom-flex">
                    <p>
                        Copyright {new Date().getFullYear()} <span className="brand-text">Vertex Internship</span> Designed By <a href="https://opticoda.vercel.app/" target="_blank" rel="noopener noreferrer" className="developer-link">Opticoda</a>. All Rights Reserved
                    </p>
                    <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
                        <IoArrowUpOutline />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    font-family: sans-serif;
                    background-color: #f4f6f9; /* Light background matching design */
                    color: #475569;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                /* --- Footer Top --- */
                .footer-top {
                    padding: 5rem 0;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
                    gap: 2rem;
                }

                .footer-widget h4 {
                    font-size: 1.25rem;
                    color: #1e293b;
                    font-weight: 700;
                    margin: 0 0 1.5rem 0;
                }

                /* Column 1 Specifics */
                .footer-logo-link {
                    display: inline-block;
                    margin-bottom: 1.5rem;
                }
                .footer-logo {
                    height: 45px;
                    width: auto;
                    display: block;
                }
                .desc {
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                }
                .contact-info {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.8rem;
                    font-size: 0.95rem;
                }
                .contact-info strong {
                    color: #1e293b;
                    font-weight: 700;
                }

                /* Links Columns */
                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                .footer-links a {
                    text-decoration: none;
                    color: #475569;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    font-size: 0.95rem;
                }
                .footer-links a:hover {
                    color: #145da0; /* Brand Blue */
                }

                /* Newsletter & Socials */
                .newsletter-text {
                    font-size: 0.95rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                
                .newsletter-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 2rem;
                }
                
                .newsletter-form input {
                    flex: 1;
                    padding: 12px 15px;
                    border: 1px solid #cbd5e1;
                    border-radius: 6px;
                    font-family: inherit;
                    font-size: 0.9rem;
                    outline: none;
                    transition: border-color 0.3s;
                }
                .newsletter-form input:focus {
                    border-color: #145da0;
                }
                
                .btn-subscribe {
                    background-color: #145da0; /* Brand Blue */
                    color: #ffffff;
                    border: none;
                    padding: 0 20px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .btn-subscribe:hover {
                    background-color: #0f4a82;
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                }
                .social-icon {
                    font-size: 1.25rem;
                    transition: transform 0.3s, color 0.3s;
                }
                .social-icon:hover {
                    transform: translateY(-3px);
                }
                /* Optional: Native brand colors for social icons */
                .fb { color: #1877F2; }
                .in { color: #0A66C2; }
                .ig { color: #E4405F; }
                .tw { color: #1DA1F2; }
                .yt { color: #FF0000; }

                /* --- Footer Bottom --- */
                .footer-bottom {
                    background-color: #e2e8f0; /* Slightly darker than top to separate */
                    padding: 1.5rem 0;
                }
                
                .bottom-flex {
                    display: flex;
                    justify-content: center; /* Center horizontally */
                    align-items: center;
                    position: relative; /* For absolute positioning of the scroll button */
                    text-align: center;
                }

                .footer-bottom p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #475569;
                }

                .brand-text {
                    color: #145da0;
                    font-weight: 700;
                }

                .developer-link {
                    color: #fcab17; /* Brand Accent */
                    text-decoration: none;
                    font-weight: 700;
                    transition: color 0.3s;
                }
                .developer-link:hover {
                    color: #e59a15;
                    text-decoration: underline;
                }

                .scroll-top-btn {
                    position: absolute;
                    right: 1.5rem;
                    background: transparent;
                    border: 2px solid #ef4444; /* Match reference red outline */
                    color: #ef4444;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .scroll-top-btn:hover {
                    background: #ef4444;
                    color: white;
                }

                /* --- Responsive Design --- */
                @media (max-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 3rem;
                    }
                }

                @media (max-width: 768px) {
                    .footer-top {
                        padding: 3rem 0;
                    }
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }
                    
                    .newsletter-form {
                        flex-direction: column;
                    }
                    .btn-subscribe {
                        padding: 14px 20px;
                    }

                    .bottom-flex {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .scroll-top-btn {
                        position: static; /* Move button inline on mobile */
                        margin-top: 1rem;
                    }
                }
            `}</style>
        </footer>
    );
}