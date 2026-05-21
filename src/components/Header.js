import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { IoCartOutline, IoMenuOutline, IoCloseOutline, IoAddOutline } from 'react-icons/io5';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const headerRef = useRef(null);

    // Close mobile menu when clicking outside of the header
    useEffect(() => {
        function handleClickOutside(event) {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Delayed Sticky Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            // When user scrolls past 150px, the header drops down and stays permanently
            if (window.scrollY > 150) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper function to close menu when a link is clicked
    const closeMenu = () => setIsMenuOpen(false);

    return (
        // The wrapper maintains the height so the page doesn't jump when the inner header becomes fixed
        <header className="header-wrapper" ref={headerRef}>
            <div className={`header-inner ${isSticky ? 'sticky-drop' : ''}`}>
                <div className="container">
                    <div className="logo">
                        <Link href="/" legacyBehavior passHref>
                            <a>
                                <img src="/logo.png" alt="EduBlink Logo" className="logo-image" />
                            </a>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="desktop-nav">
                        <ul>
                            <li><Link href="/" legacyBehavior passHref><a>Home <span>▾</span></a></Link></li>
                            <li><Link href="/admin" legacyBehavior passHref><a>Admin <span>▾</span></a></Link></li>
                            <li><Link href="/verify" legacyBehavior passHref><a>Verify Certificate <span>▾</span></a></Link></li>
                            <li><Link href="/courses" legacyBehavior passHref><a>Courses <span>▾</span></a></Link></li>
                            <li><Link href="/about" legacyBehavior passHref><a>About <span>▾</span></a></Link></li>
                            <li><Link href="/contact" legacyBehavior passHref><a>Contact <span>▾</span></a></Link></li>
                        </ul>
                    </nav>

                    {/* Actions */}
                    <div className="header-actions">
                        {/* Download Brochure Button */}
                        <a 
                            href="/company-profile.pdf" 
                            download="Elevate_Interns_Brochure.pdf" 
                            className="btn-brochure"
                        >
                            Brochure
                        </a>
                        
                        {/* Mobile Hamburger Toggle (Hidden on Desktop via CSS) */}
                        <button className="mobile-toggle mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <ul>
                            <li><Link href="/" legacyBehavior passHref><a onClick={closeMenu}>Home <IoAddOutline /></a></Link></li>
                            <li><Link href="/admin" legacyBehavior passHref><a onClick={closeMenu}>Admin <IoAddOutline /></a></Link></li>
                            <li><Link href="/verify" legacyBehavior passHref><a onClick={closeMenu}>Verify Certificate <IoAddOutline /></a></Link></li>
                            <li><Link href="/courses" legacyBehavior passHref><a onClick={closeMenu}>Courses <IoAddOutline /></a></Link></li>
                            <li><Link href="/about" legacyBehavior passHref><a onClick={closeMenu}>About <IoAddOutline /></a></Link></li>
                            <li><Link href="/contact" legacyBehavior passHref><a onClick={closeMenu}>Contact <IoAddOutline /></a></Link></li>
                        </ul>
                    </div>
                )}
            </div>

            <style jsx>{`
                .header-wrapper {
                    /* Approximate height to prevent page layout jumping */
                    min-height: 80px; 
                    position: relative;
                    z-index: 100;
                    font-family: sans-serif; 
                }

                .header-inner { 
                    background: #ffffff; 
                    width: 100%;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05); 
                    transition: all 0.3s ease;
                }

                /* This class gets applied after scrolling past 150px */
                .header-inner.sticky-drop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    animation: slideDown 0.4s ease-out forwards;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08); /* Slightly stronger shadow when floating */
                }

                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }

                .container { 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    padding: 1rem 1.5rem; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                }
                
                .logo a { 
                    display: flex; 
                    align-items: center; 
                    text-decoration: none;
                }
                .logo-image { 
                    height: 55px; 
                    width: auto;
                    display: block;
                }
                
                .desktop-nav ul { 
                    list-style: none; 
                    display: flex; 
                    gap: 2rem; 
                    margin: 0; 
                    padding: 0; 
                }
                .desktop-nav a { 
                    text-decoration: none; 
                    color: #333; 
                    font-weight: 600; 
                    font-size: 1rem; 
                    display: flex; 
                    align-items: center; 
                    gap: 4px; 
                    transition: color 0.3s; 
                }
                .desktop-nav a:hover { 
                    color: #934761; 
                }
                .desktop-nav span { 
                    font-size: 0.8rem; 
                }

                .header-actions { 
                    display: flex; 
                    align-items: center; 
                    gap: 1.5rem; 
                }
                
                .btn-brochure {
                    background-color: #934761; /* Brand Blue */
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-weight: 700;
                    font-size: 0.95rem;
                    transition: all 0s ease;
                    border: 2px solid transparent;
                    white-space: nowrap;
                }
                .btn-brochure:hover {
                    background-color: #72BAA9;
                }
                
                .mobile-only { 
                    display: none; 
                }
                .mobile-toggle {
                    display: none; /* Forces it to hide on desktop */
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #333;
                    align-items: center;
                    padding: 0;
                }

                .mobile-menu { 
                    position: absolute; 
                    top: 100%; 
                    left: 0; 
                    width: 100%; 
                    background: #ffffff; 
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
                    border-top: 1px solid #eee; 
                }
                .mobile-menu ul { 
                    list-style: none; 
                    margin: 0; 
                    padding: 0; 
                }
                .mobile-menu li { 
                    border-bottom: 1px solid #eee; 
                }
                .mobile-menu a { 
                    text-decoration: none; 
                    color: #333; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding: 1rem 1.5rem; 
                    font-weight: 600; 
                    width: 100%; 
                }
                .mobile-menu a:hover {
                    background: #f8fafc;
                    color: #934761;
                }
                    

                @media (max-width: 992px) {
                    .desktop-nav { display: none; }
                    .mobile-only { display: block; font-size: 2rem; }
                    
                    /* ADD THIS TO BRING IT BACK ON MOBILE */
                    .mobile-toggle { display: flex; }
                    
                    .header-wrapper { min-height: 60px; }
                    .container { padding: 0.5rem; }
                    .logo-image { height: 45px; }
                    .header-actions { gap: 1rem; }
                    .btn-brochure { padding: 8px 15px; font-size: 0.85rem; }
                    .mobile-menu a { font-size: 1rem; font-weight: 600; } 
                } 
            `}</style>
        </header>
    );
}