import React, { useState } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import { IoSearchOutline, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';

export default function Verify() {
    const [searchNumber, setSearchNumber] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!searchNumber.trim()) return;
        
        setLoading(true);
        setSearched(true);
        setResult(null);

        // Query Supabase JSONB column safely using the public Anon Key
        const { data, error } = await supabase
            .from('certificates')
            .select('cert_data, created_at')
            .eq('cert_data->>certificateNumber', searchNumber.trim().toUpperCase())
            .single();

        if (data) {
            setResult(data.cert_data);
        } else {
            setResult(false); // False means not found
        }
        
        setLoading(false);
    };

    return (
        <div className="verify-wrapper">
            <Head>
                <title>Verify Certificate | Elevate Interns</title>
                <meta name="description" content="Verify the authenticity of an Elevate Interns certificate." />
            </Head>

            <div className="verify-container">
                <div className="verify-header">
                    <h1>Certificate <span className="highlight">Verification</span></h1>
                    <p>Enter the certificate number to verify its authenticity and details.</p>
                </div>

                <form className="search-bar" onSubmit={handleVerify}>
                    <input 
                        type="text" 
                        placeholder="Enter Certificate No. (e.g. ELV-2026-001)" 
                        value={searchNumber}
                        onChange={(e) => setSearchNumber(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Searching...' : <><IoSearchOutline /> Verify</>}
                    </button>
                </form>

                {searched && !loading && (
                    <div className="result-area">
                        {result === false ? (
                            <div className="result-card error">
                                <IoCloseCircle className="result-icon" />
                                <h3>Certificate Not Found</h3>
                                <p>We could not find any records matching <strong>{searchNumber.toUpperCase()}</strong>. Please check the number and try again.</p>
                            </div>
                        ) : (
                            <div className="result-card success">
                                <div className="success-header">
                                    <IoCheckmarkCircle className="result-icon" />
                                    <h3>Certificate Verified</h3>
                                </div>
                                <div className="cert-details">
                                    <div className="detail-row">
                                        <span className="label">Certificate No:</span>
                                        <span className="value">{result.certificateNumber}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Student Name:</span>
                                        <span className="value name">{result.studentName}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Course/Program:</span>
                                        <span className="value">{result.courseName}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Issue Date:</span>
                                        <span className="value">{new Date(result.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                .verify-wrapper { 
                    min-height: 70vh; 
                    background: #f4f6f9; 
                    padding: 5rem 1.5rem; 
                    font-family: 'Ubuntu', sans-serif; 
                }
                
                .verify-container { 
                    max-width: 700px; 
                    margin: 0 auto; 
                }
                
                .verify-header { 
                    text-align: center; 
                    margin-bottom: 3rem; 
                }
                .verify-header h1 { 
                    font-size: 2.8rem; 
                    color: #934761; /* Brand Plum */
                    font-weight: 700; 
                    margin: 0 0 1rem 0; 
                }
                .highlight { color: #72BAA9; } /* Brand Teal */
                .verify-header p { 
                    color: #AD5C71; /* Brand Rose */
                    font-size: 1.1rem; 
                }

                .search-bar { 
                    display: flex; 
                    gap: 10px; 
                    background: #ffffff; 
                    padding: 10px; 
                    border-radius: 8px; 
                    box-shadow: 0 10px 25px rgba(0,0,0,0.05); 
                }
                .search-bar input { 
                    flex: 1; 
                    padding: 15px 20px; 
                    border: 1px solid transparent; 
                    background: #f8fafc; 
                    border-radius: 6px; 
                    font-family: inherit; 
                    font-size: 1.1rem; 
                    outline: none; 
                    font-weight: 500;
                    transition: border 0.3s; 
                }
                .search-bar input:focus { border: 1px solid #72BAA9; } /* Brand Teal Focus */
                
                .search-bar button { 
                    background: #72BAA9; /* Brand Teal */
                    color: white; 
                    border: none; 
                    padding: 0 30px; 
                    border-radius: 6px; 
                    font-weight: 700; 
                    font-size: 1.1rem; 
                    cursor: pointer; 
                    transition: background 0.3s; 
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .search-bar button:hover { background: #934761; } /* Brand Plum Hover */
                .search-bar button:disabled { background: #cbd5e1; cursor: not-allowed; }

                .result-area { margin-top: 3rem; animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .result-card { 
                    background: #ffffff; 
                    padding: 2.5rem; 
                    border-radius: 12px; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
                    text-align: center;
                }
                
                /* Keeping Error/Success Card styling identical as requested */
                .result-card.error { border-top: 0px solid #ef4444; }
                .result-card.error .result-icon { color: #ef4444; font-size: 4rem; margin-bottom: 1rem; }
                .result-card.error h3 { color: #1e293b; font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0; }
                .result-card.error p { color: #64748b; margin: 0; line-height: 1.5; }

                .result-card.success {  text-align: left; }
                .success-header { display: flex; align-items: center; gap: 12px; margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; }
                .success-header .result-icon { color:  #10b981; font-size: 2.5rem; }
                .success-header h3 { color: #1e293b; font-size: 1.6rem; font-weight: 700; margin: 0; }

                .cert-details { display: flex; flex-direction: column; gap: 1rem; }
                .detail-row { display: flex; flex-direction: column; gap: 4px; }
                .detail-row .label { color: #64748b; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
                .detail-row .value { color: #1e293b; font-size: 1.2rem; font-weight: 500; }
                .detail-row .value.name { font-weight: 700; color: #934761; font-size: 1.4rem; } /* Updated Success Name text to Brand Plum */

                @media (max-width: 768px) {
                    .verify-header h1 { font-size: 2rem; }
                    .search-bar { flex-direction: column; background: transparent; box-shadow: none; padding: 0; }
                    .search-bar input, .search-bar button { width: 100%; padding: 16px; justify-content: center; }
                    .result-card { padding: 1.5rem; }
                    .success-header h3 { font-size: 1.4rem; }
                }
            `}</style>
        </div>
    );
}