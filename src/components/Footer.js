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
                                <img src="/logo.png" alt="Elevate Interns Logo" className="footer-logo" />
                            </a>
                        </Link>
                    
                        <ul className="contact-info">
                            <li><strong>Add:</strong> Brij Mohan Thakur Lane, Barari Road, Bhagalpur, Bihar, 812003</li>
                            <li><strong>Call:</strong> +91 7903547970</li>
                            <li><strong>Email:</strong> info@elevateinterns.in</li>
                        </ul>
                    </div>

                    {/* Column 2: Quick Links (Updated to your actual pages) */}
                    <div className="footer-widget">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link href="/" legacyBehavior passHref><a>Home</a></Link></li>
                            <li><Link href="/about" legacyBehavior passHref><a>About Us</a></Link></li>
                            <li><Link href="/courses" legacyBehavior passHref><a>Courses</a></Link></li>
                            <li><Link href="/verify" legacyBehavior passHref><a>Verify Certificate</a></Link></li>
                            <li><Link href="/admin" legacyBehavior passHref><a>Admin Login</a></Link></li>
                            <li><Link href="/contact" legacyBehavior passHref><a>Contact Us</a></Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal Links */}
                    <div className="footer-widget">
                        <h4>Legal</h4>
                        <ul className="footer-links">
                            <li><Link href="/privacy" legacyBehavior passHref><a>Privacy Policy</a></Link></li>
                            <li><Link href="/terms" legacyBehavior passHref><a>Terms & Conditions</a></Link></li>
                            <li><Link href="/refund" legacyBehavior passHref><a>Refund Policy</a></Link></li>
                            <li><Link href="/faq" legacyBehavior passHref><a>FAQ's</a></Link></li>
                            <li><Link href="/support" legacyBehavior passHref><a>Help & Support</a></Link></li>
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
                        Copyright {new Date().getFullYear()} <span className="brand-text">Elevate Interns</span> Designed By <a href="https://opticoda.vercel.app/" target="_blank" rel="noopener noreferrer" className="developer-link">Opticoda</a>. All Rights Reserved
                    </p>
                    <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
                        <IoArrowUpOutline />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    font-family: 'Ubuntu', sans-serif;
                    background-color: #f8fafc; /* Light background matching design */
                    color: #475569;
                    border-top: 1px solid #e2e8f0;
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
                    color: #934761; /* Brand Plum */
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
                    color: #f8fafc;
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
                    color: #72BAA9; /* Brand Teal */
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
                    border-color: #72BAA9; /* Brand Teal */
                }
                
                .btn-subscribe {
                    background-color: #72BAA9; /* Brand Teal */
                    color: #ffffff;
                    border: none;
                    padding: 0 20px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .btn-subscribe:hover {
                    background-color: #934761; /* Brand Plum Hover */
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                }
                .social-icon {
                    font-size: 1.25rem;
                    color: #AD5C71; /* Brand Rose */
                    transition: transform 0.3s, color 0.3s;
                }
                .social-icon:hover {
                    transform: translateY(-3px);
                    color: #72BAA9; /* Brand Teal */
                }

                /* --- Footer Bottom --- */
                .footer-bottom {
                    background-color: #f1f5f9; /* Slightly darker than top to separate */
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
                    color: #934761; /* Brand Plum */
                    font-weight: 700;
                }

                .developer-link {
                    color: #72BAA9; /* Brand Teal */
                    text-decoration: none;
                    font-weight: 700;
                    transition: color 0.3s;
                }
                .developer-link:hover {
                    color: #934761; /* Brand Plum Hover */
                    text-decoration: underline;
                }

                .scroll-top-btn {
                    position: absolute;
                    right: 1.5rem;
                    background: transparent;
                    border: 2px solid #72BAA9; /* Brand Teal */
                    color: #72BAA9; /* Brand Teal */
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
                    background: #72BAA9; /* Brand Teal Hover */
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