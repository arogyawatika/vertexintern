import React from 'react';

export default function AboutPrograms() {
    return (
        <section className="programs-section">
            <div className="programs-container">
                <img src="/images/nios.jpeg" alt="NIOS Certification" className="program-image" />
                <img src="/images/booking.jpeg" alt="Booking and Admissions" className="program-image" />
            </div>

            <style jsx>{`
                .programs-section {
                    background-color: #ffffff;
                    padding: 4rem 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                }
                .programs-container {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start; /* Keeps natural image height ratios */
                    justify-content: center;
                    gap: 2.5rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .program-image {
                    width: calc(50% - 1.25rem);
                    height: auto;
                    border-radius: 12px;
                    transition: transform 0.3s ease;
                }
                .program-image:hover {
                }

                /* Mobile View: Vertical & Full Width */
                @media (max-width: 768px) {
                    .programs-section {
                        padding: 2rem 1rem;
                    }
                    .programs-container {
                        flex-direction: column;
                        gap: 2rem;
                    }
                    .program-image {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
}