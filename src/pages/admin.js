import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IoTrashOutline, IoPencilOutline, IoAddCircleOutline, IoReloadOutline, IoLogOutOutline, IoQrCodeOutline, IoDocumentTextOutline } from 'react-icons/io5';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function AdminDashboard() {
    const router = useRouter(); // <-- ADD THIS LINE
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [masterKey, setMasterKey] = useState('');
    const [activeTab, setActiveTab] = useState('certificates'); 
    
    // Data States
    const [certificates, setCertificates] = useState([]);
    const [notices, setNotices] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    
    // --- PAGINATION STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;
    
    // Modal & Form States
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [statusMsg, setStatusMsg] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, message: '', onConfirm: null }); // <-- ADD THIS LINE

    // Form Inputs
    const [certNumber, setCertNumber] = useState('');
    const [studentName, setStudentName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [collegeName, setCollegeName] = useState(''); // <-- NEW
    const [universityName, setUniversityName] = useState(''); // <-- NEW
    const [stateName, setStateName] = useState(''); // <-- NEW

    // --- NEW CERTIFICATE FIELDS ---
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [trainingType, setTrainingType] = useState('Summer Internship');
    const [topic, setTopic] = useState('');
    const [duration, setDuration] = useState('');
    const [modeOfTraining, setModeOfTraining] = useState('OFFLINE');
    const [percentage, setPercentage] = useState('');
    // ------------------------------
    
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');

    // <-- ADD THIS ENTIRE useEffect BLOCK -->
    useEffect(() => {
        if (router.isReady) {
            if (router.query.tab) {
                const validTabs = ['certificates', 'notices', 'enrollments'];
                if (validTabs.includes(router.query.tab)) setActiveTab(router.query.tab);
            }
            if (router.query.page) {
                setCurrentPage(Number(router.query.page) || 1);
            } else {
                setCurrentPage(1);
            }
        }
    }, [router.isReady, router.query.tab, router.query.page]);
    // <------------------------------------->

    useEffect(() => {
        const savedKey = sessionStorage.getItem('adminKey');
        if (savedKey) {
            setMasterKey(savedKey);
            setIsLoggedIn(true);
            fetchData('certificates', savedKey);
            fetchData('notices', savedKey);
            fetchData('enrollments', savedKey); // <-- ADD THIS LINE
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        sessionStorage.setItem('adminKey', masterKey);
        setIsLoggedIn(true);
        fetchData('certificates', masterKey);
        fetchData('notices', masterKey);
        fetchData('enrollments', masterKey); // <-- ADD THIS LINE
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminKey');
        window.location.reload();
    };

    const downloadQR = async (cert) => {
        try {
            // Generates the verification URL (e.g., https://yourdomain.com/verify?id=VTX-2026-001)
            const verifyUrl = `${window.location.origin}/verify?id=${cert.cert_data.certificateNumber}`;
            // Uses a free, reliable API to generate the QR Code PNG
            const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(verifyUrl)}`;
            
            const response = await fetch(qrApiUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${cert.cert_data.certificateNumber}_QRCode.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert('Failed to download QR code. Please check your connection.');
        }
    };

    const downloadCertificatePDF = async (cert) => {
        setStatusMsg('Generating High-Resolution PDF...');
        
        // FIXED: Now matches the exact ID from your hidden JSX template
        const element = document.getElementById(`pdf-template-${cert.id}`);
        
        if (!element) {
            console.error("Template not found for ID:", cert.id);
            alert("Error: Certificate template could not be found.");
            setStatusMsg('');
            return;
        }

        // Show container off-screen for crisp snapshot capture
        element.style.display = 'block';

        // CRITICAL FIX: Force the browser to wait 150ms to paint the HTML/CSS before capturing. 
        // Without this, html2canvas might capture a blank white box.
        await new Promise(resolve => setTimeout(resolve, 150));

        try {
            const canvas = await html2canvas(element, {
                scale: 3, // 3x scaling for sharp, vector-like print text
                useCORS: true,
                allowTaint: true,
                logging: false,
                width: 1123,  // Exact 96 DPI A4 Landscape width
                height: 794   // Exact 96 DPI A4 Landscape height
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            
            // Exact A4 Landscape dimensions (297mm x 210mm)
            const pdf = new jsPDF('landscape', 'mm', 'a4');
            pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
            
            pdf.save(`${cert.cert_data.certificateNumber}_Certificate.pdf`);
            setStatusMsg('');
        } catch (error) {
            console.error('PDF Generation Error:', error);
            alert('Failed to generate PDF. Please try again.');
            setStatusMsg('');
        } finally {
            // Hide the template again so it doesn't mess up your table UI
            element.style.display = 'none';
        }
    };

    // --- CRUD OPERATIONS ---

    const fetchData = async (table, key) => {
        setLoadingData(true);
        try {
            const res = await fetch('/api/admin-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ masterKey: key, action: 'fetch', table })
            });
            const result = await res.json();
            if (res.ok) {
                if (table === 'certificates') setCertificates(result.data);
                if (table === 'notices') setNotices(result.data);
                if (table === 'enrollments') setEnrollments(result.data); // <-- ADD THIS LINE
            }
        } catch (err) {
            console.error(err);
        }
        setLoadingData(false);
    };

    const handleDelete = (table, id) => {
        // Trigger the custom premium confirmation modal
        setConfirmDialog({
            isOpen: true,
            message: 'Are you sure you want to delete this record permanently? This action cannot be undone.',
            onConfirm: async () => {
                setConfirmDialog({ isOpen: false, message: '', onConfirm: null }); // Close modal
                
                try {
                    const res = await fetch('/api/admin-action', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ masterKey, action: 'delete', table, id })
                    });
                    if (res.ok) fetchData(table, masterKey);
                } catch (err) {
                    setStatusMsg('Failed to delete item.');
                }
            }
        });
    };

    const submitCertificate = async (e) => {
        e.preventDefault();
        setStatusMsg('Saving Certificate...');

        // Now includes all certificate fields
        const certData = {
            certificateNumber: certNumber.trim().toUpperCase(),
            studentName: studentName.trim(),
            courseName: courseName.trim(),
            issueDate: issueDate,
            collegeName: collegeName.trim(),
            universityName: universityName.trim(),
            stateName: stateName.trim(),
            branch: branch.trim(),
            semester: semester.trim(),
            rollNumber: rollNumber.trim(),
            trainingType: trainingType,
            topic: topic.trim(),
            duration: duration.trim(),
            modeOfTraining: modeOfTraining,
            percentage: percentage.trim()
        };

        try {
            const endpoint = editingId ? '/api/admin-action' : '/api/add-certificate';
            const payload = editingId 
                ? { masterKey, action: 'update', table: 'certificates', id: editingId, payload: certData }
                : { masterKey, certData };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatusMsg('');
                closeForm();
                fetchData('certificates', masterKey);
                
                
                // ---------------------------------------------------------
            } else {
                const err = await res.json();
                setStatusMsg(`Error: ${err.message}`);
            }
        } catch (err) {
            setStatusMsg('Network Error.');
        }
    };

    const submitNotice = async (e) => {
        e.preventDefault();
        setStatusMsg('Saving Notice...');

        // Automatically generate a URL-friendly unique slug from the title
        const baseSlug = noticeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const uniqueSlug = editingId ? notices.find(n => n.id === editingId).notice_data.slug : `${baseSlug}-${Date.now().toString(36)}`;

        const noticeData = {
            title: noticeTitle,
            content: noticeContent,
            slug: uniqueSlug
        };

        try {
            // If editing, use the generic admin-action. If new, use the new add-notice API.
            const endpoint = editingId ? '/api/admin-action' : '/api/add-notice';
            const payload = editingId 
                ? { masterKey, action: 'update', table: 'notices', id: editingId, payload: noticeData }
                : { masterKey, noticeData };

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatusMsg('');
                closeForm();
                fetchData('notices', masterKey);
            } else {
                const err = await res.json();
                setStatusMsg(`Error: ${err.message}`);
            }
        } catch (err) {
            setStatusMsg('Network Error.');
        }
    };

    // --- UI HELPERS ---

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        router.push({ pathname: router.pathname, query: { ...router.query, page: newPage } }, undefined, { shallow: true });
    };

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setCurrentPage(1); // Reset page on tab change
        closeForm();
        router.push({ pathname: router.pathname, query: { tab: tabName, page: 1 } }, undefined, { shallow: true });
    };

    const openEditForm = (item, type) => {
        setEditingId(item.id);
        if (type === 'cert') {
            setCertNumber(item.cert_data.certificateNumber);
            setStudentName(item.cert_data.studentName);
            setCourseName(item.cert_data.courseName);
            setIssueDate(item.cert_data.issueDate);
            setCollegeName(item.cert_data.collegeName || '');
            setUniversityName(item.cert_data.universityName || '');
            setStateName(item.cert_data.stateName || '');
            setBranch(item.cert_data.branch || '');
            setSemester(item.cert_data.semester || '');
            setRollNumber(item.cert_data.rollNumber || '');
            setTrainingType(item.cert_data.trainingType || 'Summer Internship');
            setTopic(item.cert_data.topic || '');
            setDuration(item.cert_data.duration || '');
            setModeOfTraining(item.cert_data.modeOfTraining || 'OFFLINE');
            setPercentage(item.cert_data.percentage || '');
        } else {
            setNoticeTitle(item.notice_data.title);
            setNoticeContent(item.notice_data.content || '');
        }
        setShowForm(true);
        router.push({ pathname: router.pathname, query: { ...router.query, action: 'edit', id: item.id } }, undefined, { shallow: true });
    };

    const openNewForm = () => {
        setEditingId(null);
        
        // --- AUTO-GENERATE UNIQUE CERTIFICATE NUMBER ---
        const year = new Date().getFullYear();
        const uniqueString = Math.random().toString(36).substring(2, 7).toUpperCase();
        setCertNumber(`ELV-${year}-${uniqueString}`);
        // -----------------------------------------------

        setStudentName(''); setCourseName(''); setIssueDate('');
        setCollegeName(''); setUniversityName(''); setStateName('');
        setBranch(''); setSemester(''); setRollNumber('');
        setTrainingType('Summer Internship'); setTopic(''); setDuration('');
        setModeOfTraining('OFFLINE'); setPercentage('');
        setNoticeTitle(''); setNoticeContent('');
        
        setShowForm(true);
        router.push({ pathname: router.pathname, query: { ...router.query, action: 'new' } }, undefined, { shallow: true });
    };

    const closeForm = () => {
        setShowForm(false);
        setStatusMsg('');
        const { action, id, ...restQuery } = router.query;
        router.push({ pathname: router.pathname, query: restQuery }, undefined, { shallow: true });
    };

    // --- PAGINATION CALCULATION ---
    const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);
    const paginatedCertificates = certificates.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    

    return (
        <div className="admin-wrapper">
            <Head>
                <title>Admin Dashboard | Elevate</title>
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@0,600;1,400&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
                </Head>
            
            {!isLoggedIn ? (
                <div className="login-box">
                    <form className="admin-card" onSubmit={handleLogin}>
                        <h2>Admin Portal</h2>
                        <input 
                            type="password" placeholder="Enter System Master Key" 
                            value={masterKey} onChange={(e) => setMasterKey(e.target.value)} required
                        />
                        <button type="submit" className="btn-primary">Authenticate</button>
                    </form>
                </div>
            ) : (
                <div className="dashboard-layout">
                    {/* Responsive Sidebar / Top Nav */}
                    <aside className="sidebar">
                        <div className="sidebar-header">
                            <h2>Elevate Admin</h2>
                            <button className="logout-btn mobile-only" onClick={handleLogout}><IoLogOutOutline /> Logout</button>
                        </div>
                        <nav className="nav-links">
                            <button className={activeTab === 'certificates' ? 'active' : ''} onClick={() => handleTabChange('certificates')}>Manage Certificates</button>
                            <button className={activeTab === 'notices' ? 'active' : ''} onClick={() => handleTabChange('notices')}>Manage Notices</button>
                            <button className={activeTab === 'enrollments' ? 'active' : ''} onClick={() => handleTabChange('enrollments')}>Student Enrollments</button>
                        </nav>
                        <button className="logout-btn desktop-only" onClick={handleLogout}><IoLogOutOutline /> Log Out</button>
                    </aside>

                    {/* Main Content Area */}
                    <main className="main-content">
                        <div className="header-bar">
                            {/* UPDATE THIS H2 */}
                            <h2>{activeTab === 'certificates' ? 'Certificate Registry' : activeTab === 'notices' ? 'Notice Board' : 'Student Enrollments'}</h2>
                            <div className="actions">
                                <button className="btn-icon" onClick={() => fetchData(activeTab, masterKey)} aria-label="Refresh"><IoReloadOutline /></button>
                                <button className="btn-primary add-btn" onClick={openNewForm}><IoAddCircleOutline /> Add New</button>
                            </div>
                        </div>

                        {/* PREMIUM CONFIRMATION MODAL */}
                        {confirmDialog.isOpen && (
                            <div className="custom-modal-overlay">
                                <div className="confirm-modal pop-in">
                                    <div className="confirm-icon-wrapper">
                                        <IoTrashOutline className="warning-icon" />
                                    </div>
                                    <h3>Confirm Deletion</h3>
                                    <p>{confirmDialog.message}</p>
                                    <div className="confirm-actions">
                                        <button className="btn-cancel" onClick={() => setConfirmDialog({ isOpen: false, message: '', onConfirm: null })}>Cancel</button>
                                        <button className="btn-danger" onClick={confirmDialog.onConfirm}>Yes, Delete</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FORM MODAL AREA */}
                        {showForm && (
                            <div className="form-panel fade-in">
                                <h3>{editingId ? 'Edit Record' : 'Create New Record'}</h3>
                                
                                {activeTab === 'certificates' ? (
                                    <form onSubmit={submitCertificate} className="grid-form">
                                        <div className="input-group">
                                            <label>Certificate No. (Auto-Generated)</label>
                                            <input 
                                                type="text" 
                                                value={certNumber} 
                                                readOnly 
                                                required 
                                                style={{ backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed', border: '1px solid #e2e8f0' }} 
                                            />
                                        </div>
                                        <div className="input-group">
                                            <label>Student Name</label>
                                            <input type="text" placeholder="Full Name" value={studentName} onChange={e => setStudentName(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Course Name</label>
                                            <input type="text" placeholder="Course Name" value={courseName} onChange={e => setCourseName(e.target.value)} required />
                                        </div>
                                        {/* --- NEW INPUTS FROM TEMPLATE --- */}
                                        <div className="input-group">
                                            <label>Branch / Course</label>
                                            <input type="text" placeholder="e.g., DIPLOMA IN CIVIL ENGINEERING" value={branch} onChange={e => setBranch(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Semester / Year</label>
                                            <input type="text" placeholder="e.g., 4TH SEMESTER" value={semester} onChange={e => setSemester(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Roll / Reg. No.</label>
                                            <input type="text" placeholder="e.g., 24902030055" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Training Type</label>
                                            <select value={trainingType} onChange={e => setTrainingType(e.target.value)} required style={{ padding: '14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontFamily: 'inherit', fontSize: '1rem', outline: 'none' }}>
                                                <option value="Summer Internship">Summer Internship</option>
                                                <option value="Industrial Training">Industrial Training</option>
                                                <option value="Online Course">Online Course</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label>Topic / Software (of)</label>
                                            <input type="text" placeholder="e.g., AUTOCAD - 2D & 3D DRAFTING" value={topic} onChange={e => setTopic(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Duration & Dates (in)</label>
                                            <input type="text" placeholder="e.g., 6 WEEK Civil Eng. (05.06.26 TO 16.07.26)" value={duration} onChange={e => setDuration(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Mode of Training</label>
                                            <select value={modeOfTraining} onChange={e => setModeOfTraining(e.target.value)} required style={{ padding: '14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontFamily: 'inherit', fontSize: '1rem', outline: 'none' }}>
                                                <option value="OFFLINE">OFFLINE</option>
                                                <option value="ONLINE">ONLINE</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label>Percentage Marks Obtained (%)</label>
                                            <input type="number" placeholder="e.g., 86" value={percentage} onChange={e => setPercentage(e.target.value)} required />
                                        </div>
                                        {/* -------------------------------- */}
                                        <div className="input-group">
                                            <label>College Name</label>
                                            <input type="text" placeholder="e.g., MIT, BIT Sindri" value={collegeName} onChange={e => setCollegeName(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>University Name</label>
                                            <input type="text" placeholder="e.g., AKU, Aryabhatta" value={universityName} onChange={e => setUniversityName(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>State</label>
                                            <input type="text" placeholder="e.g., Bihar" value={stateName} onChange={e => setStateName(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Issue Date</label>
                                            <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} required />
                                        </div>
                                        <div className="form-actions">
                                            <button type="button" onClick={closeForm} className="btn-secondary">Cancel</button>
                                            <button type="submit" className="btn-primary">Save Certificate</button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={submitNotice} className="grid-form">
                                        <div className="input-group">
                                            <label>Notice Title</label>
                                            <input type="text" placeholder="Enter title" value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Notice Content</label>
                                            <textarea 
                                                rows="6" 
                                                placeholder="Write the full notice details here..." 
                                                value={noticeContent} 
                                                onChange={e => setNoticeContent(e.target.value)} 
                                                required 
                                                style={{padding: '14px', border: '1px solid #cbd5e1', borderRadius: '6px', fontFamily: 'inherit', resize: 'vertical'}}
                                            ></textarea>
                                        </div>
                                        <div className="form-actions">
                                            <button type="button" onClick={closeForm} className="btn-secondary">Cancel</button>
                                            <button type="submit" className="btn-primary">Save Notice</button>
                                        </div>
                                    </form>
                                )}
                                {statusMsg && <p className="status-msg">{statusMsg}</p>}
                            </div>
                        )}

                        {/* DATA TABLES (Transforms to Cards on Mobile) */}
                        {!showForm && (
                            <div className="table-container fade-in">
                                {loadingData ? <p className="loading-text">Loading data...</p> : (
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                {activeTab === 'certificates' && (
                                                    <><th>Cert Number</th><th>Student</th><th>Course</th><th>Issue Date</th><th className="th-action">Actions</th></>
                                                )}
                                                {/* FIXED: Replaced the map loop with the correct TH tags */}
                                                {activeTab === 'notices' && (
                                                    <><th>Title</th><th>Content Snippet</th><th>Date Added</th><th className="th-action">Actions</th></>
                                                )}
                                                {/* ADD THIS LINE FOR ENROLLMENTS HEADER */}
                                                {/* ADD THIS LINE FOR ENROLLMENTS HEADER */}
                                                {activeTab === 'enrollments' && (
                                                    <>
                                                        <th>Course</th>
                                                        <th>Student Name</th>
                                                        <th>Phone Number</th>
                                                        <th>College</th>
                                                        <th>University</th>
                                                        <th>State</th>
                                                        <th>Date Submitted</th>
                                                        <th className="th-action">Actions</th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* 1. CERTIFICATES */}
                                            {activeTab === 'certificates' && paginatedCertificates.map(cert => (
                                                <React.Fragment key={cert.id}>
                                                    <tr>
                                                        <td data-label="Cert Number"><strong>{cert.cert_data.certificateNumber}</strong></td>
                                                        <td data-label="Student">{cert.cert_data.studentName}</td>
                                                        <td data-label="Course">{cert.cert_data.courseName}</td>
                                                        <td data-label="Issue Date">{cert.cert_data.issueDate}</td>
                                                        <td data-label="Actions" className="action-cells">
                                                            <button className="btn-icon edit" style={{color: '#3b82f6'}} onClick={() => downloadCertificatePDF(cert)} title="Download PDF Certificate">
                                                                <IoDocumentTextOutline />
                                                            </button>
                                                            
                                                            <button className="btn-icon edit" onClick={() => openEditForm(cert, 'cert')} title="Edit"><IoPencilOutline /></button>
                                                            <button className="btn-icon delete" onClick={() => handleDelete('certificates', cert.id)} title="Delete"><IoTrashOutline /></button>
                                                        </td>
                                                    </tr>
                                                    

                                                    {/* --- HIGH-QUALITY PURE HTML/CSS A4 LANDSCAPE CERTIFICATE --- */}
                                                    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', overflow: 'hidden', height: 0, width: 0 }}>
                                                        <div 
                                                            id={`pdf-template-${cert.id}`} 
                                                            style={{
                                                                width: '1123px',   
                                                                height: '794px',   
                                                                backgroundColor: '#ffffff',
                                                                padding: '18px',   
                                                                boxSizing: 'border-box',
                                                                position: 'relative',
                                                                fontFamily: "'Times New Roman', Times, serif",
                                                                color: '#0f172a',
                                                                display: 'none'
                                                            }}
                                                        >
                                                            <div style={{ width: '100%', height: '100%', border: '16px solid #005a36', padding: '4px', boxSizing: 'border-box' }}>
                                                                <div style={{ width: '100%', height: '100%', border: '2px solid #005a36', position: 'relative', padding: '30px 40px', boxSizing: 'border-box' }}>
                                                                    
                                                                    <div style={{ position: 'absolute', top: -5, left: -5, width: 40, height: 40, borderTop: '6px solid #8b2641', borderLeft: '6px solid #8b2641' }}></div>
                                                                    <div style={{ position: 'absolute', top: -5, right: -5, width: 40, height: 40, borderTop: '6px solid #8b2641', borderRight: '6px solid #8b2641' }}></div>
                                                                    <div style={{ position: 'absolute', bottom: -5, left: -5, width: 40, height: 40, borderBottom: '6px solid #8b2641', borderLeft: '6px solid #8b2641' }}></div>
                                                                    <div style={{ position: 'absolute', bottom: -5, right: -5, width: 40, height: 40, borderBottom: '6px solid #8b2641', borderRight: '6px solid #8b2641' }}></div>

                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold' }}>
                                                                        <div style={{ lineHeight: '1.4' }}>
                                                                            <div>GSTIN : 10MAEPK5708F1ZX</div>
                                                                            <div>ESTD : 2026</div>
                                                                        </div>
                                                                        {/* Flex column forces perfect right-alignment, box width only for the text */}
                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                                                                            <div style={{ border: '1px solid #000', padding: '2px 4px', display: 'inline-block', background: '#f8fafc' }}>
                                                                                <span>Sl. No. :</span>
                                                                                <span style={{ marginLeft: '6px' }}>{cert.cert_data.certificateNumber}</span>
                                                                            </div>
                                                                            <div>
                                                                                Date of Completion <span style={{ marginLeft: '6px' }}>{cert.cert_data.issueDate ? new Date(cert.cert_data.issueDate).toLocaleDateString('en-GB').replace(/\//g, '.') : ''}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div style={{ textAlign: 'center', marginTop: '0px' }}>
                                                                        <img src="/logo.png" alt="Elevate Interns" style={{ height: '50px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                                                        <div style={{ fontSize: '13px', fontWeight: '600', marginTop: '8px' }}>
                                                                            Leading Institute to Provide Industrial Training and Vocational Training to All
                                                                        </div>
                                                                        <h1 style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: '42px', color: '#005a36', margin: '10px 0 15px 0', fontWeight: 'bold' }}>
                                                                            Certificate of {cert.cert_data.trainingType || 'Internship'}
                                                                        </h1>
                                                                    </div>

                                                                    <div style={{ padding: '0 10px' }}>
                                                                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                                                            <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>This is to certify that</span>
                                                                            <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>{cert.cert_data.studentName}</span>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                                                            <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>of college / University / Board</span>
                                                                            <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{cert.cert_data.collegeName || cert.cert_data.universityName || '-'}</span>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                                                            <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>of Branches / Course</span>
                                                                            <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>{cert.cert_data.branch || cert.cert_data.courseName || '-'}</span>
                                                                            <span style={{ width: '250px', borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase', marginLeft: '20px' }}>{cert.cert_data.semester || '-'}</span>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                                                            <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>Roll / Reg. No.</span>
                                                                            <span style={{ width: '280px', borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{cert.cert_data.rollNumber || '-'}</span>
                                                                            <span style={{ fontSize: '20px', fontStyle: 'italic', marginLeft: '15px' }}>has successfully completed {cert.cert_data.trainingType || 'Summer Internship'}</span>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                                                            <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>of</span>
                                                                            <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>{cert.cert_data.topic || '-'}</span>
                                                                        </div>
                                                                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '12px' }}>
                                                                            <span style={{ fontSize: '20px', fontStyle: 'italic', marginRight: '15px' }}>in</span>
                                                                            <span style={{ flex: 1, borderBottom: '2px dotted #000', textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>{cert.cert_data.duration || '-'}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px' }}>
                                                                        
                                                                        {/* QR Code Block */}
                                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', width: '150px' }}>
                                                                            {/* Border strictly around the QR image */}
                                                                            <div style={{ border: '2px solid #000', padding: '4px', display: 'inline-block' }}>
                                                                                <img 
                                                                                    src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(window.location.origin + "/verify?id=" + cert.cert_data.certificateNumber)} 
                                                                                    alt="QR" 
                                                                                    crossOrigin="anonymous"
                                                                                    style={{ width: '75px', height: '75px', display: 'block' }} 
                                                                                />
                                                                            </div>
                                                                            {/* Text strictly outside the border */}
                                                                            <div style={{ fontSize: '10px', marginTop: '6px', lineHeight: '1.3', fontWeight: 'bold', textAlign: 'center', color: '#0f172a' }}>
                                                                                To verify, scan QR or visit<br/>elevateinterns.in/verify
                                                                            </div>
                                                                        </div>

                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', paddingRight: '20px' }}>
                                                                            <div style={{ position: 'relative', width: '320px', height: '28px' }}>
                                                                                <svg width="320" height="28" viewBox="0 0 320 28" preserveAspectRatio="none">
                                                                                    <polygon points="25,0 320,0 295,28 0,28" fill="#005a36" />
                                                                                    <polygon points="160,2 317,2 295,26 138,26" fill="#ffffff" />
                                                                                </svg>
                                                                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                                                                                    <div style={{ width: '150px', textAlign: 'right', paddingRight: '12px', color: '#ffffff', fontWeight: 'bold' }}>Mode of Training</div>
                                                                                    <div style={{ flex: 1, textAlign: 'center', color: '#000000', paddingRight: '20px', fontWeight: 'bold' }}>{cert.cert_data.modeOfTraining || 'OFFLINE'}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ position: 'relative', width: '370px', height: '28px' }}>
                                                                                <svg width="370" height="28" viewBox="0 0 370 28" preserveAspectRatio="none">
                                                                                    <polygon points="25,0 370,0 345,28 0,28" fill="#8b2641" />
                                                                                    <polygon points="220,2 367,2 345,26 198,26" fill="#ffffff" />
                                                                                </svg>
                                                                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                                                                                    <div style={{ width: '210px', textAlign: 'right', paddingRight: '12px', color: '#ffffff', fontWeight: 'bold' }}>Percentage Marks Obtained (%)</div>
                                                                                    <div style={{ flex: 1, textAlign: 'center', color: '#000000', paddingRight: '20px', fontWeight: 'bold' }}>{cert.cert_data.percentage || '-'}</div>
                                                                                </div>
                                                                            </div>
                                                                            <div style={{ fontSize: '11px', fontStyle: 'italic', textAlign: 'center', width: '320px', marginTop: '2px', fontWeight: 'bold' }}>
                                                                                During training he / she was very punctual and hardworking.<br/>Wishing "All the Best" for future career!
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div style={{ position: 'absolute', bottom: '30px', left: '50px', right: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                                                        
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                                                <img src="/images/msme.jpg" alt="MSME" style={{ height: '60px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                                                                <img src="/images/nip.png" alt="NIP" style={{ height: '70px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                                                                <img src="/images/gst.png" alt="GST" style={{ height: '50px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                                                                <img src="/images/aicte.png" alt="AICTE" style={{ height: '60px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                                                                <img src="/images/iso.jpg" alt="ISO" style={{ height: '60px', objectFit: 'contain' }} crossOrigin="anonymous" />
                                                                            </div>
                                                                            
                                                                        </div>

                                                                        {/* Authorised Signature & Stamp */}
                                                                        <div style={{ textAlign: 'center', paddingRight: '20px', position: 'relative' }}>
                                                                            
                                                                            <div style={{ fontStyle: 'italic', fontSize: '16px', color: '#1e293b', marginBottom: '5px' }}>Authorised Signature</div>
                                                                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b2641', fontFamily: 'Arial, sans-serif' }}>Elevate Interns</div>
                                                                            <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>Brij Mohan Thakur Lane, Barari, Bhagalpur Bihar 812003</div>
                                                                            
                                                                            {/* INDUSTRY STANDARD STAMP OVERLAY */}
                                                                            <img 
                                                                                src="/images/ELEVATE_INTERNS_Stamp.png" 
                                                                                alt="Official Stamp" 
                                                                                crossOrigin="anonymous"
                                                                                style={{ 
                                                                                    position: 'absolute', 
                                                                                    top: '-67px', /* Pushed up into the free space */
                                                                                    left: '50%', 
                                                                                    transform: 'translateX(-50%) rotate(5deg)', 
                                                                                    height: '80px', 
                                                                                    opacity: 0.85, 
                                                                                    pointerEvents: 'none'
                                                                                }} 
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))}

                                            {/* 2. NOTICES */}
                                            {activeTab === 'notices' && notices.map(notice => (
                                                <tr key={notice.id}>
                                                    <td data-label="Title"><strong>{notice.notice_data.title}</strong></td>
                                                    <td data-label="Content Snippet">
                                                        {notice.notice_data.content ? notice.notice_data.content.substring(0, 45) + '...' : 'No content'}
                                                    </td>
                                                    <td data-label="Date Added">{new Date(notice.created_at).toLocaleDateString()}</td>
                                                    <td data-label="Actions" className="action-cells">
                                                        <button className="btn-icon edit" onClick={() => openEditForm(notice, 'notice')}><IoPencilOutline /></button>
                                                        <button className="btn-icon delete" onClick={() => handleDelete('notices', notice.id)}><IoTrashOutline /></button>
                                                    </td>
                                                </tr>
                                            ))}

                                            {/* 3. ENROLLMENTS */}
                                            {activeTab === 'enrollments' && enrollments.map(enroll => (
                                                <tr key={enroll.id}>
                                                    <td data-label="Course"><strong>{enroll.enroll_data.courseTitle}</strong></td>
                                                    <td data-label="Student">{enroll.enroll_data.studentName}</td>
                                                    <td data-label="Phone Number">
                                                        <a href={`tel:${enroll.enroll_data.phone}`} style={{color: '#145da0', fontWeight: '700', textDecoration: 'none'}}>
                                                            {enroll.enroll_data.phone}
                                                        </a>
                                                    </td>
                                                    {/* --- NEWLY FETCHED DATA --- */}
                                                    <td data-label="College">{enroll.enroll_data.college || '-'}</td>
                                                    <td data-label="University">{enroll.enroll_data.university || '-'}</td>
                                                    <td data-label="State">{enroll.enroll_data.state || '-'}</td>
                                                    {/* -------------------------- */}
                                                    <td data-label="Date Submitted">{new Date(enroll.created_at).toLocaleDateString()}</td>
                                                    <td data-label="Actions" className="action-cells">
                                                        <button className="btn-icon delete" onClick={() => handleDelete('enrollments', enroll.id)} title="Delete"><IoTrashOutline /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {/* --- PAGINATION UI --- */}
                                {activeTab === 'certificates' && totalPages > 1 && !loadingData && (
                                    <div className="pagination-bar">
                                        <button 
                                            disabled={currentPage === 1} 
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className="btn-page"
                                        >
                                            Previous
                                        </button>
                                        <span className="page-info">Page {currentPage} of {totalPages}</span>
                                        <button 
                                            disabled={currentPage === totalPages} 
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className="btn-page"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            
                            </div>
                        )}
                    </main>
                </div>
            )}

            <style jsx>{`
                /* Global Admin Styles */
                .admin-wrapper { min-height: 100vh; background: #f4f6f9; font-family: 'Ubuntu', sans-serif; color: #1e293b; }
                .login-box { display: flex; align-items: center; justify-content: center; height: 100vh; padding: 1rem; }
                .admin-card { background: white; padding: 3rem 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem; text-align: center; }
                .admin-card h2 { color: #145da0; font-weight: 700; margin: 0; font-size: 1.8rem; }
                
                input { width: 100%; padding: 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 1rem; outline: none; transition: border 0.3s; }
                input:focus { border-color: #145da0; }
                .input-group { display: flex; flex-direction: column; gap: 6px; text-align: left; }
                .input-group label { font-size: 0.9rem; font-weight: 700; color: #475569; }

                /* Dashboard Layout - Desktop */
                .dashboard-layout { display: flex; min-height: 100vh; }
                
                .sidebar { width: 260px; background: #0b3964; color: white; display: flex; flex-direction: column; padding: 2rem 1.5rem; }
                .sidebar-header { margin-bottom: 2rem; }
                .sidebar-header h2 { color: #fcab17; font-weight: 700; margin: 0; font-size: 1.5rem; }
                .nav-links { display: flex; flex-direction: column; gap: 8px; flex: 1; }
                .nav-links button { background: transparent; color: #cbd5e1; border: none; text-align: left; padding: 14px 16px; border-radius: 8px; font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
                .nav-links button:hover, .nav-links button.active { background: #145da0; color: white; }
                
                .logout-btn { background: transparent; border: none; color: #ef4444; font-weight: 700; cursor: pointer; padding: 14px 16px; text-align: left; display: flex; align-items: center; gap: 8px; transition: background 0.3s; border-radius: 8px; margin-top: auto; }
                .logout-btn:hover { background: rgba(239, 68, 68, 0.1); }
                .mobile-only { display: none; }

                /* Main Content Area */
                .main-content { flex: 1; padding: 2.5rem; overflow-y: auto; width: 100%; }
                
                .header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; }
                .header-bar h2 { color: #1e293b; font-weight: 700; font-size: 1.8rem; margin: 0; }
                .actions { display: flex; gap: 1rem; align-items: center; }

                .btn-primary { background: #145da0; color: white; border: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 1rem; }
                .btn-primary:hover { background: #0f4a82; }
                .btn-secondary { background: #e2e8f0; color: #475569; border: none; padding: 14px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.3s; font-size: 1rem; }
                .btn-secondary:hover { background: #cbd5e1; }

                /* Form Panel */
                .form-panel { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto; }
                .form-panel h3 { color: #145da0; font-weight: 700; margin: 0 0 2rem 0; font-size: 1.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; }
                .grid-form { display: flex; flex-direction: column; gap: 1.5rem; }
                .file-input-group input { padding: 10px 0; border: none; }
                .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
                .form-actions button { flex: 1; }
                
                .status-msg { margin-top: 1rem; font-weight: 700; color: #fcab17; text-align: center; }
                .help-text { font-size: 0.85rem; color: #ef4444; margin: 0; font-weight: 500; }

                /* Desktop Table Styles */
                .table-container { background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); overflow: hidden; }
                .data-table { width: 100%; border-collapse: collapse; text-align: left; }
                .data-table th { background: #f8fafc; color: #64748b; padding: 16px 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
                .data-table td { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; color: #334155; font-size: 0.95rem; }
                .data-table tr:hover { background: #f8fafc; }
                
                .action-cells { display: flex; gap: 10px; }
                .th-action { width: 100px; }
                .btn-icon { background: #f1f5f9; border: none; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem; color: #64748b; transition: all 0.2s; }
                .btn-icon:hover { background: #e2e8f0; color: #1e293b; }
                .btn-icon.edit:hover { color: #145da0; background: #e0f2fe; }
                .btn-icon.delete:hover { color: #ef4444; background: #fee2e2; }

                .loading-text { padding: 2rem; text-align: center; color: #64748b; font-weight: 600; }
                .fade-in { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* Pagination Styles */
                .pagination-bar { 
                    display: flex; justify-content: space-between; align-items: center; 
                    padding: 1.5rem 20px; border-top: 1px solid #e2e8f0; background: #f8fafc; 
                }
                .btn-page { 
                    background: #ffffff; border: 1px solid #cbd5e1; color: #1e293b; 
                    padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; 
                }
                .btn-page:hover:not(:disabled) { border-color: #145da0; color: #145da0; }
                .btn-page:disabled { opacity: 0.5; cursor: not-allowed; background: #f1f5f9; }
                .page-info { font-weight: 700; color: #475569; font-size: 0.9rem; }
                /* --- INDUSTRY STANDARD MOBILE RESPONSIVE UI --- */
                @media (max-width: 992px) {
                    .dashboard-layout { flex-direction: column; }
                    
                    /* Sticky Top Nav for Mobile */
                    .sidebar { 
                        width: 100%; 
                        padding: 1rem; 
                        position: sticky; 
                        top: 0; 
                        z-index: 50; 
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
                    }
                    .sidebar-header { 
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center; 
                        margin-bottom: 1rem; 
                    }
                    .desktop-only { display: none; }
                    .mobile-only { display: flex; padding: 8px 12px; margin: 0; font-size: 0.9rem; }
                    
                    .nav-links { 
                        flex-direction: row; 
                        overflow-x: auto; 
                        padding-bottom: 4px;
                        /* Hide scrollbar for clean look */
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .nav-links::-webkit-scrollbar { display: none; }
                    .nav-links button { white-space: nowrap; padding: 10px 16px; }

                    .main-content { padding: 1.5rem 1rem; }
                    
                    .header-bar { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .header-bar h2 { font-size: 1.5rem; }
                    .actions { width: 100%; justify-content: space-between; }
                    
                    .form-panel { padding: 1.5rem; border-radius: 10px; }
                    .form-actions { flex-direction: column; }
                    .form-actions button { width: 100%; }

                    /* TRANSFORM TABLE INTO CARDS FOR MOBILE */
                    .data-table thead { display: none; /* Hide table headers */ }
                    .data-table, .data-table tbody, .data-table tr, .data-table td { display: block; width: 100%; }
                    
                    .table-container { background: transparent; box-shadow: none; }
                    
                    .data-table tr { 
                        margin-bottom: 1rem; 
                        background: #ffffff; 
                        border: 1px solid #e2e8f0; 
                        border-radius: 10px; 
                        padding: 1rem; 
                        box-shadow: 0 4px 6px rgba(0,0,0,0.02);
                    }
                    
                    .data-table td { 
                        text-align: right; 
                        padding: 0.75rem 0; 
                        border-bottom: 1px solid #f1f5f9; 
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center; 
                    }
                    .data-table td:last-child { border-bottom: none; padding-bottom: 0; }
                    
                    /* Use the data-label attribute to create pseudo-headers */
                    .data-table td::before { 
                        content: attr(data-label); 
                        font-weight: 700; 
                        color: #64748b; 
                        text-transform: uppercase; 
                        font-size: 0.75rem; 
                    }
                    
                    .action-cells { justify-content: flex-end; }
                }
                    /* --- PREMIUM CONFIRMATION MODAL --- */
                .custom-modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(15, 23, 42, 0.6);
                    backdrop-filter: blur(4px);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 1000; padding: 1rem;
                }
                .confirm-modal {
                    background: #ffffff;
                    padding: 2.5rem;
                    border-radius: 16px;
                    width: 100%; max-width: 400px;
                    text-align: center;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
                .pop-in {
                    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                .confirm-icon-wrapper {
                    width: 70px; height: 70px;
                    background: #fee2e2; /* Light red */
                    border-radius: 50%;
                    display: flex; justify-content: center; align-items: center;
                    margin: 0 auto 1.5rem auto;
                }
                .warning-icon {
                    font-size: 2rem; color: #ef4444; /* Bright red */
                }
                .confirm-modal h3 {
                    color: #1e293b; font-size: 1.5rem; font-weight: 700; margin: 0 0 0.75rem 0;
                }
                .confirm-modal p {
                    color: #64748b; font-size: 1rem; line-height: 1.5; margin: 0 0 2rem 0;
                }
                .confirm-actions {
                    display: flex; gap: 1rem;
                }
                .confirm-actions button {
                    flex: 1; padding: 12px; border-radius: 8px; font-weight: 700; font-size: 1rem;
                    cursor: pointer; transition: all 0.2s ease; border: none;
                }
                .btn-cancel {
                    background: #f1f5f9; color: #475569;
                }
                .btn-cancel:hover {
                    background: #e2e8f0; color: #1e293b;
                }
                .btn-danger {
                    background: #ef4444; color: white;
                }
                .btn-danger:hover {
                    background: #dc2626; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                }
            `}</style>
        </div>
    );
}