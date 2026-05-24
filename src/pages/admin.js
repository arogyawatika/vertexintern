import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IoTrashOutline, IoPencilOutline, IoAddCircleOutline, IoReloadOutline, IoLogOutOutline, IoQrCodeOutline } from 'react-icons/io5';

export default function AdminDashboard() {
    const router = useRouter(); // <-- ADD THIS LINE
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [masterKey, setMasterKey] = useState('');
    const [activeTab, setActiveTab] = useState('certificates'); 
    
    // Data States
    const [certificates, setCertificates] = useState([]);
    const [notices, setNotices] = useState([]);
    const [enrollments, setEnrollments] = useState([]); // <-- ADD THIS LINE
    const [loadingData, setLoadingData] = useState(false);
    
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
    
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');

    // <-- ADD THIS ENTIRE useEffect BLOCK -->
    useEffect(() => {
        if (router.isReady && router.query.tab) {
            const validTabs = ['certificates', 'notices', 'enrollments'];
            if (validTabs.includes(router.query.tab)) {
                setActiveTab(router.query.tab);
            }
        }
    }, [router.isReady, router.query.tab]);
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

        // Now includes the 3 new fields
        const certData = {
            certificateNumber: certNumber.trim().toUpperCase(),
            studentName: studentName.trim(),
            courseName: courseName.trim(),
            issueDate: issueDate,
            collegeName: collegeName.trim(),
            universityName: universityName.trim(),
            stateName: stateName.trim()
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

    // <-- ADD THIS FUNCTION -->
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        closeForm();
        router.push({ pathname: router.pathname, query: { tab: tabName } }, undefined, { shallow: true });
    };
    // <----------------------->

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
        } else {
            setNoticeTitle(item.notice_data.title);
            setNoticeContent(item.notice_data.content || '');
        }
        setShowForm(true);
    };

    const openNewForm = () => {
        setEditingId(null);
        setCertNumber(''); setStudentName(''); setCourseName(''); setIssueDate('');
        setCollegeName(''); setUniversityName(''); setStateName('');
        setNoticeTitle(''); setNoticeContent('');
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setStatusMsg('');
    };

    return (
        <div className="admin-wrapper">
            <Head><title>Admin Dashboard | Elevate</title></Head>
            
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
                                            <label>Certificate No.</label>
                                            <input type="text" placeholder="VTX-2026-001" value={certNumber} onChange={e => setCertNumber(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Student Name</label>
                                            <input type="text" placeholder="Full Name" value={studentName} onChange={e => setStudentName(e.target.value)} required />
                                        </div>
                                        <div className="input-group">
                                            <label>Course Name</label>
                                            <input type="text" placeholder="Course Name" value={courseName} onChange={e => setCourseName(e.target.value)} required />
                                        </div>
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
                                            {activeTab === 'certificates' && certificates.map(cert => (
                                                <tr key={cert.id}>
                                                    <td data-label="Cert Number"><strong>{cert.cert_data.certificateNumber}</strong></td>
                                                    <td data-label="Student">{cert.cert_data.studentName}</td>
                                                    <td data-label="Course">{cert.cert_data.courseName}</td>
                                                    <td data-label="Issue Date">{cert.cert_data.issueDate}</td>
                                                    <td data-label="Actions" className="action-cells">
                                                        {/* NEW QR CODE BUTTON */}
                                                        <button className="btn-icon edit" style={{color: '#1bba93'}} onClick={() => downloadQR(cert)} title="Download QR">
                                                            <IoQrCodeOutline />
                                                        </button>
                                                        <button className="btn-icon edit" onClick={() => openEditForm(cert, 'cert')} title="Edit"><IoPencilOutline /></button>
                                                        <button className="btn-icon delete" onClick={() => handleDelete('certificates', cert.id)} title="Delete"><IoTrashOutline /></button>
                                                    </td>
                                                </tr>
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