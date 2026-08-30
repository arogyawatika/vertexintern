import React from 'react';

export default function AboutOffers() {
    return (
        <section className="offers-section">
            <div className="offers-container">
                <img src="/images/offer1.jpeg" alt="30 Din Maha Offer" className="offer-image" />
                <img src="/images/offer2.jpeg" alt="Level Up Your Bio-Data Offer" className="offer-image" />
            </div>

            <style jsx>{`
                .offers-section {
                    background-color: #f8fafc;
                    padding: 4rem 1.5rem;
                    border-top: 1px solid #e2e8f0;
                    border-bottom: 1px solid #e2e8f0;
                }
                .offers-container {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start; /* Ensures images keep their own height ratio */
                    justify-content: center;
                    gap: 2.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .offer-image {
                    width: calc(50% - 1.25rem);
                    height: auto;
                    border-radius: 12px;
                    transition: transform 0.3s ease;
                }
                .offer-image:hover {
                }

                /* Mobile View: Vertical & Full Width */
                @media (max-width: 768px) {
                    .offers-section {
                        padding: 2rem 1rem;
                    }
                    .offers-container {
                        flex-direction: column;
                        gap: 2rem;
                    }
                    .offer-image {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
}