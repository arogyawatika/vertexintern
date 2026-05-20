import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                {/* Google Fonts Preconnect and Stylesheet */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
            </Head>

            {/* Global Header */}
            <Header />

            {/* Main Page Content */}
            <main>
                <Component {...pageProps} />
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Styles for the entire app */}
            <style jsx global>{`
                /* Basic CSS Reset */
                html, body {
                    padding: 0;
                    margin: 0;
                    background-color: #ffffff;
                    font-family: "Ubuntu", sans-serif; /* Sets Ubuntu as the default font globally */
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                * {
                    box-sizing: border-box;
                }

                /* Custom Text Selection Color */
                ::selection {
                    background: #934761;
                    color: #ffffff; /* White text looks crisp against the yellow/orange selection */
                }
                ::-moz-selection {
                    background: #934761;
                    color: #ffffff;
                }

                /* --- Ubuntu Font Utility Classes --- */
                .ubuntu-light {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 300;
                    font-style: normal;
                }

                .ubuntu-regular {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 400;
                    font-style: normal;
                }

                .ubuntu-medium {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 500;
                    font-style: normal;
                }

                .ubuntu-bold {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 700;
                    font-style: normal;
                }

                .ubuntu-light-italic {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 300;
                    font-style: italic;
                }

                .ubuntu-regular-italic {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 400;
                    font-style: italic;
                }

                .ubuntu-medium-italic {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 500;
                    font-style: italic;
                }

                .ubuntu-bold-italic {
                    font-family: "Ubuntu", sans-serif;
                    font-weight: 700;
                    font-style: italic;
                }
            `}</style>
        </>
    );
}