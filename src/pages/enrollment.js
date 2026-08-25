import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function EnrollmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    // Form States
    const [studentName, setStudentName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [courseName, setCourseName] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [topic, setTopic] = useState('');
    const [duration, setDuration] = useState('');
    const [modeOfTraining, setModeOfTraining] = useState('OFFLINE');
    const [collegeName, setCollegeName] = useState('');
    const [universityName, setUniversityName] = useState('');
    const [stateName, setStateName] = useState('');

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handlePaymentAndEnroll = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatusMsg('Initiating Payment...');

        try {
            // 1. Create Razorpay Order (1000 INR)
            const orderRes = await fetch('/api/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1000 }) 
            });
            const orderData = await orderRes.json();

            if (!orderRes.ok) throw new Error('Failed to create order');

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Elevate Interns',
                description: 'Enrollment Fee for Training / Internship',
                order_id: orderData.id,
                handler: async function (response) {
                    setStatusMsg('Payment Successful! Saving your enrollment...');
                    
                    // 3. Save Data to Database upon success
                    const enrollmentData = {
                        studentName, phone, email, courseName, branch, semester, 
                        rollNumber, topic, duration, modeOfTraining, 
                        collegeName, universityName, stateName,
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature
                    };

                    const saveRes = await fetch('/api/submit-enrollment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(enrollmentData)
                    });

                    if (saveRes.ok) {
                        setStatusMsg('Enrollment Submitted Successfully! You can now track your status.');
                        setTimeout(() => router.push('/track-record'), 3000);
                    } else {
                        setStatusMsg('Payment received, but error saving data. Please contact support.');
                    }
                },
                prefill: {
                    name: studentName,
                    email: email,
                    contact: phone
                },
                theme: {
                    color: '#145da0'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                setStatusMsg('Payment Failed. Please try again.');
                setLoading(false);
            });
            rzp.open();

        } catch (err) {
            console.error(err);
            setStatusMsg('Something went wrong initializing payment.');
            setLoading(false);
        }
    };

    return (
        <div className="admin-wrapper" style={{ padding: '2rem 1rem' }}>
            <Head>
                <title>Student Enrollment | Elevate</title>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="form-panel fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h3 style={{ color: '#145da0', fontWeight: '700', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    Student Enrollment Form
                </h3>
                
                <form onSubmit={handlePaymentAndEnroll} className="grid-form">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>Mobile Number</label>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Course Name</label>
                        <input type="text" value={courseName} onChange={e => setCourseName(e.target.value)} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>Branch / Course</label>
                            <input type="text" placeholder="e.g., CIVIL ENGINEERING" value={branch} onChange={e => setBranch(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>Semester / Year</label>
                            <input type="text" placeholder="e.g., 4TH SEMESTER" value={semester} onChange={e => setSemester(e.target.value)} required />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Roll / Reg. No.</label>
                        <input type="text" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Topic / Software (of)</label>
                        <input type="text" placeholder="e.g., AUTOCAD - 2D & 3D DRAFTING" value={topic} onChange={e => setTopic(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Duration & Dates (in)</label>
                        <input type="text" placeholder="e.g., 6 WEEK (05.06.26 TO 16.07.26)" value={duration} onChange={e => setDuration(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Mode of Training</label>
                        <select value={modeOfTraining} onChange={e => setModeOfTraining(e.target.value)} required style={{ padding: '14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontFamily: 'inherit' }}>
                            <option value="OFFLINE">OFFLINE</option>
                            <option value="ONLINE">ONLINE</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>College Name</label>
                        <input type="text" value={collegeName} onChange={e => setCollegeName(e.target.value)} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>University Name</label>
                            <input type="text" value={universityName} onChange={e => setUniversityName(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label>State</label>
                            <input type="text" value={stateName} onChange={e => setStateName(e.target.value)} required />
                        </div>
                    </div>

                    <div className="form-actions" style={{ marginTop: '2rem' }}>
                        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '16px' }}>
                            {loading ? 'Processing...' : 'Pay ₹1000 & Enroll'}
                        </button>
                    </div>
                    {statusMsg && <p className="status-msg" style={{ textAlign: 'center', marginTop: '1rem', color: '#145da0', fontWeight: 'bold' }}>{statusMsg}</p>}
                </form>
            </div>
            
            {/* Inject minimal styles needed for layout consistency with Admin */}
            <style jsx>{`
                .admin-wrapper { min-height: 100vh; background: #f4f6f9; font-family: 'Ubuntu', sans-serif; color: #1e293b; }
                .form-panel { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                .grid-form { display: flex; flex-direction: column; gap: 1.5rem; }
                .input-group { display: flex; flex-direction: column; gap: 6px; text-align: left; }
                .input-group label { font-size: 0.9rem; font-weight: 700; color: #475569; }
                input, select { width: 100%; padding: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 1rem; outline: none; }
                input:focus, select:focus { border-color: #145da0; }
                .btn-primary { background: #145da0; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.3s; }
                .btn-primary:hover { background: #0f4a82; }
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}