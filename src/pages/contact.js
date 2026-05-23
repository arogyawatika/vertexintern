import React, { useState } from 'react';
import Head from 'next/head';
import { 
    IoLocationOutline, 
    IoMailOutline, 
    IoCallOutline, 
    IoLogoWhatsapp,
    IoLogoFacebook,
    IoLogoLinkedin,
    IoLogoInstagram
} from 'react-icons/io5';

// IMPORTANT: Put your WhatsApp number here (Include country code, no + or spaces)
const WHATSAPP_NUMBER = "917903547970"; 

export default function Contact() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault();
        
        // Construct the message
        const text = `Hello Elevate Internship! \n\n*Name:* ${name} \n*Phone:* ${phone} \n*Message:* ${message}`;
        
        // Encode and redirect
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
        
        // Clear form
        setName('');
        setPhone('');
        setMessage('');
    };

    return (
        <div className="contact-wrapper">
            <Head><title>Contact Us | Elevate Internship</title></Head>

            {/* --- PREMIUM FULL-WIDTH HEADER --- */}
            <div className="premium-page-header">
                <div className="shape-dots"></div>
                <div className="shape-zigzag"></div>
                <div className="shape-red-dots"></div>
                <div className="shape-arc"></div>
                <div className="shape-arc-left"></div>

                <div className="header-content">
                    <h1>Contact Us</h1>
                    <ul className="breadcrumb">
                        <li><a href="/" className="crumb-link">Home</a></li>
                        <li className="separator">&gt;</li>
                        <li>Pages</li>
                        <li className="separator">&gt;</li>
                        <li className="active">Contact Us</li>
                    </ul>
                </div>
            </div>

            {/* --- MAIN CONTACT SECTION --- */}
            <div className="container contact-section">
                <div className="contact-grid">
                    
                    {/* LEFT COLUMN: Info */}
                    <div className="contact-info-column">
                        <h2>We&apos;re Always Eager to Hear From You!</h2>
                        
                        <div className="info-blocks">
                            <div className="info-item">
                                <h3>Address</h3>
                                <p>Brij Mohan Thakur Lane, Barari Road, <br/>Bhagalpur, Bihar, 812003</p>
                            </div>
                            
                            <div className="info-item">
                                <h3>Email</h3>
                                <a href="mailto:info@elevateinterns.in">info@elevateinterns.in</a>
                            </div>
                            
                            <div className="info-item">
                                <h3>Phone</h3>
                                <a href="tel:+917903547970">+91 7903547970</a>
                            </div>
                        </div>

                        {/* Direct Social & WhatsApp Buttons */}
                        <div className="social-actions">
                            <div className="social-icons">
                                <a href="#" className="s-icon"><IoLogoFacebook /></a>
                                <a href="#" className="s-icon"><IoLogoLinkedin /></a>
                                <a href="#" className="s-icon"><IoLogoInstagram /></a>
                            </div>
                            <a 
                                href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-direct-wa"
                            >
                                <IoLogoWhatsapp className="wa-icon"/> Chat on WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Form Card */}
                    <div className="contact-form-column">
                        {/* Decorative Background Elements for the Form */}
                        <div className="form-decor-circle"></div>
                        <div className="form-decor-dots"></div>

                        <div className="form-card">
                            <h3>Get In Touch</h3>
                            <p>Fill out this form to send us a direct message on WhatsApp. We will reply shortly!</p>
                            
                            <form onSubmit={handleWhatsAppSubmit}>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        placeholder="Your name" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="input-group">
                                    <input 
                                        type="tel" 
                                        placeholder="Phone number" 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="input-group">
                                    <textarea 
                                        placeholder="Your message" 
                                        rows="4"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-submit">
                                    Submit Message →
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MAP SECTION (Optional, completes the UI look) --- */}
            <div className="map-section">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23306.163131019!2d86.99171933777644!3d25.261047196773866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0362d54a62a25%3A0xfc1f94b99cc963f5!2sBarari%2C%20Bihar!5e1!3m2!1sen!2sin!4v1779555699167!5m2!1sen!2sin"
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Elevate Internship Location"
                ></iframe>
            </div>

            <style jsx>{`
                .contact-wrapper { 
                    background-color: #ffffff; 
                    font-family: 'Ubuntu', sans-serif; 
                }

                .container { 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    padding: 0 1.5rem; 
                }

                /* --- PREMIUM PAGE HEADER --- */
                .premium-page-header {
                    position: relative;
                    background-color: #f8fafc;
                    padding: 7rem 1.5rem 5rem;
                    text-align: center;
                    margin-bottom: 5rem;
                    overflow: hidden; 
                    border-bottom: 1px solid #e2e8f0;
                    width: 100%;
                }

                .header-content { position: relative; z-index: 10; }
                .premium-page-header h1 { font-size: 3.5rem; color: #934761; font-weight: 700; margin: 0 0 1rem 0; letter-spacing: -0.5px; } /* Brand Plum */
                .breadcrumb { list-style: none; padding: 0; margin: 0; display: flex; justify-content: center; align-items: center; gap: 0.75rem; font-size: 1.15rem; font-weight: 500; color: #0f172a; }
                .crumb-link { color: #0f172a; text-decoration: none; transition: color 0.3s ease; }
                .crumb-link:hover { color: #72BAA9; } /* Brand Teal */
                .separator { color: #cbd5e1; font-weight: 400; font-size: 0.9rem; }
                .active { color: #0f172a; }

                /* Decorative Shapes */
                .shape-dots { position: absolute; left: 12%; top: 50%; transform: translateY(-50%); width: 140px; height: 140px; background-image: radial-gradient(#72BAA9 2.5px, transparent 2.5px); background-size: 20px 20px; border-radius: 50%; opacity: 0.3; } /* Brand Teal */
                .shape-zigzag { position: absolute; right: 15%; top: 45%; width: 50px; height: 25px; background-image: url("data:image/svg+xml,%3Csvg width='50' height='25' viewBox='0 0 50 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23D5E7B5' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 14l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 22l10-4 10 4 10-4 10 4'/%3E%3C/g%3E%3C/svg%3E"); background-repeat: no-repeat; } /* Brand Light Green */
                .shape-red-dots { position: absolute; right: 0; top: 10%; width: 30px; height: 120px; background-image: radial-gradient(#AD5C71 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.7; } /* Brand Rose */
                .shape-arc { position: absolute; right: -10%; bottom: -40%; width: 500px; height: 500px; border: 1px solid #e2e8f0; border-radius: 50%; z-index: 0; }
                .shape-arc-left { position: absolute; left: -5%; top: -20%; width: 300px; height: 300px; border: 1px solid #e2e8f0; border-radius: 50%; z-index: 0; }

                /* --- MAIN CONTACT SECTION --- */
                .contact-section { margin-bottom: 6rem; }
                
                .contact-grid { 
                    display: grid; 
                    grid-template-columns: 1fr 1.2fr; 
                    gap: 4rem; 
                    align-items: center; 
                }

                /* Left Column: Info */
                .contact-info-column h2 { 
                    font-size: 2.5rem; 
                    color: #1e293b; 
                    font-weight: 700; 
                    margin: 0 0 2.5rem 0; 
                    line-height: 1.2; 
                }

                .info-blocks { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2.5rem; }
                
                .info-item h3 { font-size: 1.1rem; color: #934761; font-weight: 700; margin: 0 0 0.5rem 0; } /* Brand Plum */
                .info-item p, .info-item a { color: #64748b; font-size: 1rem; line-height: 1.6; text-decoration: none; transition: color 0.3s; }
                .info-item a:hover { color: #72BAA9; } /* Brand Teal */

                .social-actions { display: flex; flex-direction: column; gap: 1.5rem; border-top: 1px solid #e2e8f0; padding-top: 2rem; }
                .social-icons { display: flex; gap: 15px; }
                .s-icon { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; color: #64748b; font-size: 1.2rem; transition: all 0.3s; text-decoration: none; }
                .s-icon:hover { background-color: #934761; color: #fff; border-color: #934761; transform: translateY(-3px); } /* Brand Plum */

                .btn-direct-wa { 
                    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
                    background-color: #25D366; color: white; padding: 14px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; width: fit-content; transition: background 0.3s; 
                }
                .btn-direct-wa:hover { background-color: #1ebe57; }
                .wa-icon { font-size: 1.4rem; }

                /* Right Column: Form Card */
                .contact-form-column { position: relative; }

                .form-decor-circle { position: absolute; top: -30px; right: -20px; width: 120px; height: 120px; border: 6px dashed #AD5C71; border-radius: 50%; z-index: 0; animation: rotate 20s linear infinite; } /* Brand Rose */
                .form-decor-dots { position: absolute; bottom: -30px; right: -40px; width: 140px; height: 140px; background-image: radial-gradient(#72BAA9 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.3; z-index: 0; } /* Brand Teal */
                
                @keyframes rotate { 100% { transform: rotate(360deg); } }

                .form-card { 
                    background: #ffffff; 
                    padding: 3.5rem 3rem; 
                    border-radius: 12px; 
                    box-shadow: 0 20px 50px rgba(0,0,0,0.08); 
                    position: relative; 
                    z-index: 2; 
                }

                .form-card h3 { font-size: 1.8rem; color: #1e293b; font-weight: 700; margin: 0 0 0.5rem 0; }
                .form-card p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem; }

                form { display: flex; flex-direction: column; gap: 1.5rem; }
                
                .input-group input, .input-group textarea {
                    width: 100%;
                    padding: 16px 0;
                    border: none;
                    border-bottom: 1px solid #cbd5e1;
                    font-family: inherit;
                    font-size: 1rem;
                    color: #1e293b;
                    outline: none;
                    transition: border-color 0.3s;
                    background: transparent;
                }
                .input-group input::placeholder, .input-group textarea::placeholder { color: #94a3b8; }
                .input-group input:focus, .input-group textarea:focus { border-bottom-color: #72BAA9; } /* Brand Teal */
                .input-group textarea { resize: vertical; }

                .btn-submit { 
                    background-color: #934761; /* Brand Plum */
                    color: #ffffff; 
                    border: none; 
                    padding: 16px 32px; 
                    border-radius: 6px; 
                    font-weight: 700; 
                    font-size: 1rem; 
                    cursor: pointer; 
                    transition: background-color 0.3s; 
                    width: fit-content;
                    margin-top: 1rem;
                }
                .btn-submit:hover { background-color: #72BAA9; } /* Brand Teal Hover */

                /* --- MAP SECTION --- */
                .map-section { line-height: 0; } /* Removes gap below iframe */

                /* --- MOBILE RESPONSIVE UI --- */
                @media (max-width: 992px) {
                    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .form-decor-dots { right: 0; }
                }

                @media (max-width: 768px) {
                    .premium-page-header { padding: 5rem 1rem 3rem; border-radius: 0; margin-bottom: 3rem; }
                    .premium-page-header h1 { font-size: 2.5rem; }
                    
                    /* Hide decorative shapes on mobile */
                    .shape-dots, .shape-zigzag, .shape-red-dots, .shape-arc, .shape-arc-left, .form-decor-circle, .form-decor-dots { display: none; }

                    .contact-info-column h2 { font-size: 2rem; }
                    .form-card { padding: 2rem 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
                    .btn-submit { width: 100%; }
                }
            `}</style>
        </div>
    );
}