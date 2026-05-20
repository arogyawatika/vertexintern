import React from 'react';
import Head from 'next/head';
import AboutHero from '../../components/about/AboutHero'; 
import AboutDownloadProfile from '../../components/about/AboutDownloadProfile';
import AboutMission from '../../components/about/AboutMission';
import AboutWhyChooseUs from '../../components/about/AboutWhyChooseUs';
import AboutTestimonials from '../../components/about/AboutTestimonials';
import AboutVision from '../../components/about/AboutVision';

export default function About() {
    return (
        <div className="about-wrapper">
            <Head>
                <title>About Us | Elevate Interns</title>
            </Head>

            {/* --- PREMIUM FULL-WIDTH HEADER --- */}
            <div className="premium-page-header">
                <div className="shape-dots"></div>
                <div className="shape-zigzag"></div>
                <div className="shape-red-dots"></div>
                <div className="shape-arc"></div>
                <div className="shape-arc-left"></div>

                <div className="header-content">
                    <h1>About Us</h1>
                    <ul className="breadcrumb">
                        <li><a href="/" className="crumb-link">Home</a></li>
                        <li className="separator">&gt;</li>
                        <li>Pages</li>
                        <li className="separator">&gt;</li>
                        <li className="active">About Us</li>
                    </ul>
                </div>
            </div>

            {/* --- ABOUT PAGE COMPONENTS --- */}
            <AboutHero />
            <AboutDownloadProfile />
            
            {/* The Alternate Side-by-Side Sections */}
            <AboutMission /> 
            <AboutWhyChooseUs />
            <AboutVision />
            <AboutTestimonials />

            <style jsx>{`
                .about-wrapper { background-color: #ffffff; font-family: 'Ubuntu', sans-serif; padding-bottom: 4rem; }
                
                .premium-page-header { position: relative; background-color: #f8fafc; padding: 7rem 1.5rem 5rem; text-align: center; margin-bottom: 2rem; overflow: hidden; border-bottom: 1px solid #e2e8f0; width: 100%; }
                .header-content { position: relative; z-index: 10; }
                .premium-page-header h1 { font-size: 3.5rem; color: #1e293b; font-weight: 700; margin: 0 0 1rem 0; letter-spacing: -0.5px; }
                .breadcrumb { list-style: none; padding: 0; margin: 0; display: flex; justify-content: center; align-items: center; gap: 0.75rem; font-size: 1.15rem; font-weight: 500; color: #0f172a; }
                .crumb-link { color: #0f172a; text-decoration: none; transition: color 0.3s ease; }
                .crumb-link:hover { color: #145da0; }
                .separator { color: #cbd5e1; font-weight: 400; font-size: 0.9rem; }
                .active { color: #0f172a; }

                .shape-dots { position: absolute; left: 12%; top: 50%; transform: translateY(-50%); width: 140px; height: 140px; background-image: radial-gradient(#1bba93 2.5px, transparent 2.5px); background-size: 20px 20px; border-radius: 50%; opacity: 0.5; }
                .shape-zigzag { position: absolute; right: 15%; top: 45%; width: 50px; height: 25px; background-image: url("data:image/svg+xml,%3Csvg width='50' height='25' viewBox='0 0 50 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%231bba93' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 14l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 22l10-4 10 4 10-4 10 4'/%3E%3C/g%3E%3C/svg%3E"); background-repeat: no-repeat; }
                .shape-red-dots { position: absolute; right: 0; top: 10%; width: 30px; height: 120px; background-image: radial-gradient(#ef4444 2.5px, transparent 2.5px); background-size: 20px 20px; opacity: 0.5; }
                .shape-arc { position: absolute; right: -10%; bottom: -40%; width: 500px; height: 500px; border: 1px solid #e2e8f0; border-radius: 50%; z-index: 0; }
                .shape-arc-left { position: absolute; left: -5%; top: -20%; width: 300px; height: 300px; border: 1px solid #e2e8f0; border-radius: 50%; z-index: 0; }

                @media (max-width: 768px) {
                    .premium-page-header { padding: 5rem 1rem 3rem; border-radius: 0; margin-bottom: 1rem; }
                    .premium-page-header h1 { font-size: 2.5rem; }
                    .shape-dots, .shape-zigzag, .shape-red-dots, .shape-arc, .shape-arc-left { display: none; }
                }
            `}</style>
        </div>
    );
}