import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import ContactBanner from '../components/ContactBanner';
import CallToAction from '../components/CallToAction';
import NoticeBoard from '../components/NoticeBoard';


export default function Home() {
  return (
    <div className="main-wrapper">
      <Head>
        <title>Elevate Intern | Internship & Training Certifications</title>
        <meta name="description" content="Best remote training and internship courses." />
      </Head>



      <main>
        <Hero />
        <NoticeBoard />
        <Stats />
        <About />
        <CallToAction />

        {/* You can drop in your VideoGallery component here later! */}

        <ContactBanner />
      </main>



      <style jsx global>{`
                /* Global resets just in case your Next app doesn't have them yet */
                html, body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                    background-color: #ffffff;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
    </div>
  );
}