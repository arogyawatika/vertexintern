import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicy() {
    return (
        <div className="privacy-wrapper">
            <Head>
                <title>Privacy Policy | Elevate Interns</title>
            </Head>

            {/* --- PREMIUM FULL-WIDTH HEADER --- */}
            <div className="premium-page-header">
                <div className="shape-dots"></div>
                <div className="shape-zigzag"></div>
                <div className="shape-red-dots"></div>
                <div className="shape-arc"></div>
                <div className="shape-arc-left"></div>

                <div className="header-content">
                    <h1>Privacy Policy</h1>
                    <ul className="breadcrumb">
                        <li><a href="/" className="crumb-link">Home</a></li>
                        <li className="separator">&gt;</li>
                        <li>Pages</li>
                        <li className="separator">&gt;</li>
                        <li className="active">Privacy Policy</li>
                    </ul>
                </div>
            </div>

            {/* --- POLICY CONTENT SECTION --- */}
            <div className="container">
                <div className="policy-card">
                    <p className="intro-text">
                        This Privacy Policy outlines how we collect, use, and protect your personal information. By using our website, you agree to the terms outlined in this policy.
                    </p>

                    <div className="policy-section">
                        <h2>1. Information We Collect</h2>
                        
                        <h3>1.1 Personal Information:</h3>
                        <p>When you register for an account, apply for courses or internships, or engage with our website, we may collect personal information such as your name, email address, contact information, and other details necessary for the services we provide.</p>
                        
                        <h3>1.2 Automatically Collected Information:</h3>
                        <p>We may collect certain information automatically when you visit our website, including your IP address, browser type, device information, and browsing behavior. This information helps us improve our website and user experience.</p>
                    </div>

                    <div className="policy-section">
                        <h2>2. How We Use Your Information</h2>
                        
                        <h3>2.1 Providing Services:</h3>
                        <p>We use the information collected to deliver our services, process applications, and facilitate communication between students and industry partners.</p>
                        
                        <h3>2.2 Communication:</h3>
                        <p>We may use your contact information to send you updates, newsletters, and information about our services. You can opt-out of these communications at any time.</p>
                        
                        <h3>2.3 Analytics and Improvements:</h3>
                        <p>We analyze user behavior to improve our website, tailor content to user preferences, and enhance the overall user experience.</p>
                    </div>

                    <div className="policy-section">
                        <h2>3. Information Sharing</h2>
                        
                        <h3>3.1 Third-Party Partners:</h3>
                        <p>We may share your information with trusted third-party partners, such as industry collaborators and internship providers, to facilitate the connection between students and the industry.</p>
                        
                        <h3>3.2 Legal Requirements:</h3>
                        <p>We may disclose your information if required by law or in response to a legal request.</p>
                    </div>

                    <div className="policy-section">
                        <h2>4. Data Security</h2>
                        <p>We implement security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is entirely secure.</p>
                    </div>

                    <div className="policy-section">
                        <h2>5. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your personal information. If you wish to exercise these rights or have any questions about your data, please contact us at <a href="mailto:info@elevateinterns.in" className="email-link">info@elevateinterns.in</a>.</p>
                    </div>

                    <div className="policy-section">
                        <h2>6. Cookies and Tracking Technologies</h2>
                        <p>Our website may use cookies and similar technologies to enhance your experience. You can set your browser to refuse cookies, but this may limit some functionalities.</p>
                    </div>

                    <div className="policy-section">
                        <h2>7. Changes to the Privacy Policy</h2>
                        <p>We reserve the right to update this Privacy Policy at any time. We will notify you of any significant changes through the email address associated with your account.</p>
                    </div>

                    <div className="policy-section">
                        <h2>8. Contact Information</h2>
                        <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at <a href="mailto:info@elevateinterns.in" className="email-link">info@elevateinterns.in</a>.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .privacy-wrapper { 
                    background-color: #fcfcfc; 
                    font-family: 'Ubuntu', sans-serif; 
                    padding-bottom: 6rem;
                }

                .container { 
                    max-width: 1000px; 
                    margin: 0 auto; 
                    padding: 0 1.5rem; 
                }

                /* --- PREMIUM PAGE HEADER --- */
                .premium-page-header {
                    position: relative;
                    background-color: #f8fafc;
                    padding: 7rem 1.5rem 5rem;
                    text-align: center;
                    margin-bottom: 3rem;
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

                /* Decorative Shapes using Brand Colors */
                .shape-dots { position: absolute; left: 12%; top: 50%; transform: translateY(-50%); width: 140px; height: 140px; background-image: radial-gradient(#72BAA9 2.5px, transparent 2.5px); background-size: 20px 20px; border-radius: 50%; opacity: 0.3; }
                .shape-zigzag { position: absolute; right: 15%; top: 45%; width: 50px; height: 25px; background-image: url("data:image/svg+xml,%3Csvg width='50' height='25' viewBox='0 0 50 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23D5E7B5' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 14l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 22l10-4 10 4 10-4 10 4'/%3E%3C/g%3E%3C/svg%3E"); background-repeat: no-repeat; }
                .shape-red-dots { position: absolute; right: 0; top: 10%; width: 30px; height: 120px; background-image: radial-gradient(#AD5C71 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.5; }
                .shape-arc { position: absolute; right: -10%; bottom: -40%; width: 500px; height: 500px; border: 1px solid #e2e8f0; border-radius: 50%; z-index: 0; }
                .shape-arc-left { position: absolute; left: -5%; top: -20%; width: 300px; height: 300px; border: 1px solid #e2e8f0; border-radius: 50%; z-index: 0; }

                /* --- POLICY CONTENT --- */
                .policy-card { background: #ffffff; padding: 4rem; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
                .intro-text { font-size: 1.15rem; color: #475569; line-height: 1.8; margin-bottom: 3rem; font-weight: 500; border-left: 4px solid #72BAA9; padding-left: 1.5rem; } /* Brand Teal */

                .policy-section { margin-bottom: 2.5rem; }
                .policy-section h2 { font-size: 1.7rem; color: #934761; font-weight: 700; margin: 0 0 1.2rem 0; padding-bottom: 0.5rem; border-bottom: 1px solid #f1f5f9; } /* Brand Plum */
                .policy-section h3 { font-size: 1.2rem; color: #1e293b; font-weight: 700; margin: 1.5rem 0 0.5rem 0; }
                .policy-section p { font-size: 1.05rem; color: #64748b; line-height: 1.8; margin: 0 0 1rem 0; }

                .email-link { color: #934761; font-weight: 600; text-decoration: none; transition: color 0.2s; } /* Brand Plum */
                .email-link:hover { color: #72BAA9; text-decoration: underline; } /* Brand Teal */

                @media (max-width: 768px) {
                    .privacy-wrapper { padding-bottom: 4rem; }
                    .premium-page-header { padding: 5rem 1rem 3rem; margin-bottom: 2rem; border-radius: 0; }
                    .premium-page-header h1 { font-size: 2.2rem; }
                    .shape-dots, .shape-zigzag, .shape-red-dots, .shape-arc, .shape-arc-left { display: none; }
                    .policy-card { padding: 2rem 1.5rem; }
                    .policy-section p { font-size: 0.9rem; }
                }
            `}</style>
        </div>
    );
}