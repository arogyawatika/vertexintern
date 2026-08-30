import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export default function OfferPopup() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Check how the page was accessed using the browser's Performance API
        const navEntries = window.performance.getEntriesByType('navigation');
        const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

        // If the page was NOT refreshed, show the popup
        if (!isReload) {
            // Slight delay makes it feel smoother when the page first loads
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, []);

    // Prevent background scrolling when popup is open
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [showPopup]);

    if (!showPopup) return null;

    return (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
            {/* e.stopPropagation() prevents clicking inside the image from closing the popup */}
            <div className="popup-content scale-in" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setShowPopup(false)} aria-label="Close Offer">
                    <IoCloseOutline />
                </button>
                <img src="/images/offer1.jpeg" alt="Limited Time Offer" className="popup-image" />
            </div>

            <style jsx>{`
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(15, 23, 42, 0.75); /* Dark overlay with blur */
                    backdrop-filter: blur(5px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    padding: 1rem;
                }
                .popup-content {
                    position: relative;
                    background: transparent;
                    max-width: 500px; /* Adjust based on your image ratio */
                    width: 100%;
                    border-radius: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .popup-image {
                    width: 100%;
                    height: auto;
                    border-radius: 12px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .close-btn {
                    position: absolute;
                    top: -15px;
                    right: -15px;
                    background: #ffffff;
                    color: #0f172a;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0s ease;
                    z-index: 10000;
                }
                .close-btn:hover {
                    background: #934761; /* Red on hover */
                    color: #ffffff;
                    transform: scale(1);
                }
                
                /* Smooth Entrance Animation */
                .scale-in {
                    animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }

                @media (max-width: 768px) {
                    .close-btn {
                        top: -10px;
                        right: -10px;
                        width: 35px;
                        height: 35px;
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
}