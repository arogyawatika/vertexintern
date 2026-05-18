import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IoCloseOutline, IoBookOutline } from 'react-icons/io5';

// Hardcoded course data with unique image paths for every course
const allCourses = [
    // Vocational
    { id: 1, image: '/images/courses/1.jpg', title: 'CCCA (Certificate Course in Computer Application)', category: 'Computer Basics', desc: "Basic operation knowledge about computer and it's applications." },
    { id: 2, image: '/images/courses/2.jpg', title: 'BCCCA (Beginners Certificate in Computer)', category: 'Computer Basics', desc: "Basic operation knowledge for school students below 10th class." },
    { id: 3, image: '/images/courses/3.jpg', title: 'DCA (Diploma in Computer Application)', category: 'Computer Basics', desc: "Basic operational knowledge about computer and its applications with internet." },
    { id: 4, image: '/images/courses/4.jpg', title: 'ADCA (Advance Diploma in Computer Application)', category: 'Advance Basics', desc: "Advance knowledge about the computer and its applications, internet and web." },
    { id: 5, image: '/images/courses/5.jpg', title: 'DTP (Desktop Publishing)', category: 'Design', desc: "Advance knowledge of all design works using PageMaker, Photoshop and CorelDraw." },
    { id: 6, image: '/images/courses/6.jpg', title: 'TALLY', category: 'Finance', desc: "Complete knowledge of working on tally with accountancy." },
    { id: 7, image: '/images/courses/7.jpg', title: 'Typing (English)', category: 'Skill Development', desc: "English typing training for better typing experience." },
    { id: 8, image: '/images/courses/8.jpg', title: 'CSPD (Communication Skill & Personality)', category: 'Skill Development', desc: "Spoken English for professional communication and personality development." },
    { id: 9, image: '/images/courses/9.jpg', title: 'ACCOUNTANCY (DFA)', category: 'Finance', desc: "Complete knowledge of working in account section of any organization." },
    { id: 10, image: '/images/courses/10.jpg', title: 'Typing (Hindi)', category: 'Skill Development', desc: "Hindi typing training for better typing experience." },
    { id: 11, image: '/images/courses/11.jpg', title: 'COMPUTER PROFICIENCY', category: 'Computer Basics', desc: "Advance knowledge about computer applications, internet and web technologies." },
    
    // Engineering Design & Internship
    { id: 12, image: '/images/courses/12.jpg', title: 'Civil Engineering Design & Site Visit', category: 'Civil', desc: "For civil engineering or architect students." },
    { id: 13, image: '/images/courses/13.jpg', title: 'Mechanical Engineering Design & Workshop', category: 'Mechanical', desc: "For mechanical or automobile engineering students." },
    { id: 14, image: '/images/courses/14.jpg', title: 'AUTO CAD (CIVIL)', category: 'Civil Design', desc: "Civil engineering design in Auto CAD." },
    { id: 15, image: '/images/courses/15.jpg', title: 'AUTO CAD (MECHANICAL)', category: 'Mech Design', desc: "Mechanical engineering design in Auto CAD." },
    { id: 16, image: '/images/courses/16.jpg', title: 'AUTO CAD (ELECTRICAL)', category: 'Electrical', desc: "Electrical engineering design in Auto CAD." },
    { id: 17, image: '/images/courses/17.jpg', title: 'CATIA', category: 'Mech Design', desc: "Mechanical Engineering Design using CATIA." },
    { id: 18, image: '/images/courses/18.jpg', title: 'STAAD PRO', category: 'Civil Design', desc: "Civil Engineering Design using STAAD PRO." },
    { id: 19, image: '/images/courses/19.jpg', title: '3D MODELLING/WORKS (CE)', category: 'Civil Design', desc: "Civil Engineering 3D Modelling Design." },
    { id: 20, image: '/images/courses/20.jpg', title: '3D MODELLING/WORKS (ME)', category: 'Mech Design', desc: "Mechanical Engineering 3D Modelling Design." },
    { id: 21, image: '/images/courses/21.jpg', title: '3D MAX', category: 'Civil Design', desc: "Civil Engineering Design (Interior/Exterior)." },
    { id: 22, image: '/images/courses/22.jpg', title: 'REVIT DESIGN', category: 'Mech Design', desc: "Mechanical Engineering Design." },
    { id: 23, image: '/images/courses/23.jpg', title: 'STEEL STRUCTURE DESIGN', category: 'Civil Design', desc: "Steel Structure Design in buildings and Apartments." },
    
    // Management & Automation
    { id: 24, image: '/images/courses/24.jpg', title: 'BUILDING CONSTRUCTION MANAGEMENT', category: 'Management', desc: "Buildings and apartments construction management." },
    { id: 25, image: '/images/courses/25.jpg', title: 'TOWNSHIP DEVELOPMENT MANAGEMENT', category: 'Management', desc: "Township Development management training." },
    { id: 26, image: '/images/courses/26.jpg', title: 'MANUFACTURING PROCESS MANAGEMENT', category: 'Management', desc: "Mechanical Engineering Manufacturing or Production." },
    { id: 27, image: '/images/courses/27.jpg', title: 'AUTOMOBILE PROJECT MANAGEMENT', category: 'Management', desc: "Automotive Project Management training." },
    { id: 28, image: '/images/courses/28.jpg', title: 'PLC PROGRAMMING', category: 'Automation', desc: "Study about PLC Programming." },
    { id: 29, image: '/images/courses/29.jpg', title: 'INDUTRIAL AUTOMATION USING PLC & SCADA', category: 'Automation', desc: "Industrial Automation using PLC & SCADA." },
    { id: 30, image: '/images/courses/30.jpg', title: 'EMBEDDED SYSTEM', category: 'Electronics', desc: "Study about Embedded Systems." },
    { id: 31, image: '/images/courses/31.jpg', title: 'ROBOTICS', category: 'Robotics', desc: "Study about Robot and Robotics projects." },
    
    // Electrical/Electronics
    { id: 32, image: '/images/courses/32.jpg', title: 'ELECTRICAL MEASUREMENT & INSTRUMENTATION', category: 'Electrical', desc: "Study about Electrical measurement and instrumentation." },
    { id: 33, image: '/images/courses/33.jpg', title: 'ELECTRONICS MEASUREMENT & INSTRUMENTATION', category: 'Electronics', desc: "Study about Electronics measurement and instrumentation." },
    { id: 34, image: '/images/courses/34.jpg', title: 'ELECTRICAL WIRING AND CONTROL', category: 'Electrical', desc: "Wiring and control in multi-storied buildings." },
    { id: 35, image: '/images/courses/35.jpg', title: 'ELECTRICAL MAINTENANCE', category: 'Electrical', desc: "Electrical maintenance works." },
    { id: 36, image: '/images/courses/36.jpg', title: 'SOLAR SYSTEM INSTALLATION', category: 'Electrical', desc: "Study about solar system installation." },
    { id: 37, image: '/images/courses/37.jpg', title: 'COMMUNICATION SYSTEM', category: 'Electronics', desc: "Study about communication systems." },
    
    // Software & Web Development
    { id: 38, image: '/images/courses/38.jpg', title: 'WEB DESIGN USING HTML, CSS & JAVA SCRIPT', category: 'Web Dev', desc: "Web design using HTML, CSS and Java Script." },
    { id: 39, image: '/images/courses/39.jpg', title: 'WEB DEVELOPMENT USING PHP & MYSQL', category: 'Web Dev', desc: "Web development in PHP." },
    { id: 40, image: '/images/courses/40.jpg', title: 'SOFTWARE DEVELOPMENT IN DOTNET', category: 'Software Dev', desc: "Software development in DotNet." },
    { id: 41, image: '/images/courses/41.jpg', title: 'WEB DEVELOPMENT IN DOTNET', category: 'Web Dev', desc: "Web development in DotNet (ASP.Net)." },
    { id: 42, image: '/images/courses/42.jpg', title: 'SOFTWARE DEVELOPMENT IN JAVA', category: 'Software Dev', desc: "Software development in JAVA." },
    { id: 43, image: '/images/courses/43.jpg', title: 'WEB DEVELOPMENT IN JAVA', category: 'Web Dev', desc: "Web development in JAVA (JSP)." },
    { id: 44, image: '/images/courses/44.jpg', title: 'ANDROID APP DEVELOPMENT', category: 'Mobile Dev', desc: "Android app development training." },
    { id: 45, image: '/images/courses/45.jpg', title: 'PYTHON PROGRAMMING', category: 'Programming', desc: "Study about Python Programming." },
    { id: 46, image: '/images/courses/46.jpg', title: 'DIGITAL MARKETING', category: 'Marketing', desc: "Study about Digital Marketing techniques." },
    { id: 47, image: '/images/courses/47.jpg', title: 'SYSTEM ANALYTICS', category: 'Analytics', desc: "Study about System Analytics." },
    { id: 48, image: '/images/courses/48.jpg', title: 'C-PROGRAMMING', category: 'Programming', desc: "Study about C-Programming." },
    { id: 49, image: '/images/courses/49.jpg', title: 'C++ PROGRAMMING', category: 'Programming', desc: "Study about C++ Programming." },
    { id: 50, image: '/images/courses/50.jpg', title: 'JAVA PROGRAMMING', category: 'Programming', desc: "Study about JAVA Programming." },
    { id: 51, image: '/images/courses/51.jpg', title: 'FULL STACK WEB DEVELOPMENT', category: 'Web Dev', desc: "Study about Full Stack Web Development." },
    { id: 52, image: '/images/courses/52.jpg', title: 'FULL STACK SOFTWARE DEVELOPMENT', category: 'Software Dev', desc: "Study about Full Stack Software Development." },
    { id: 53, image: '/images/courses/53.jpg', title: 'MATLAB', category: 'Engineering Tools', desc: "Study about Matlab." },
    { id: 54, image: '/images/courses/54.jpg', title: 'INTERNET OF THINGS (IOT)', category: 'Emerging Tech', desc: "Study about Internet of Things (IOT)." },
    { id: 55, image: '/images/courses/55.jpg', title: 'ARTIFICIAL INTELLIGENCE', category: 'Emerging Tech', desc: "Study about Artificial Intelligence (AI)." },
    { id: 56, image: '/images/courses/56.jpg', title: 'J2EE (Advance JAVA)', category: 'Programming', desc: "Study about J2EE (Advance Java)." }
];

const ITEMS_PER_PAGE = 9;
const WHATSAPP_NUMBER = "916205782002"; 

export default function Courses() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    
    // Track broken images by course ID
    const [imageErrors, setImageErrors] = useState({});
    
    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [enrollName, setEnrollName] = useState('');
    const [enrollPhone, setEnrollPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const pageParam = parseInt(router.query.page);
            if (pageParam && pageParam > 0) setCurrentPage(pageParam);
            else setCurrentPage(1);
        }
    }, [router.isReady, router.query.page]);

    const totalPages = Math.ceil(allCourses.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCourses = allCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            router.push(`/courses?page=${page}`, undefined, { shallow: true });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // --- Image Error Handler ---
    const handleImageError = (courseId) => {
        setImageErrors(prev => ({ ...prev, [courseId]: true }));
    };

    // --- Enrollment Logic ---
    const openModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEnrollName('');
        setEnrollPhone('');
    };

    const handleEnrollSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch('/api/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseTitle: selectedCourse.title,
                    name: enrollName,
                    phone: enrollPhone
                })
            });

            const text = `Hello Vertex Internship, I am interested in enrolling for the course: *${selectedCourse.title}*. My name is ${enrollName} and my contact number is ${enrollPhone}.`;
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

            window.open(waUrl, '_blank');
            closeModal();
        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="courses-wrapper">
            <Head><title>All Courses & Internships | Vertex</title></Head>

            {/* --- PREMIUM HEADER (Moved OUTSIDE the container for full width) --- */}
            <div className="premium-page-header">
                {/* Decorative Background Elements (Desktop Only) */}
                <div className="shape-dots"></div>
                <div className="shape-zigzag"></div>
                <div className="shape-red-dots"></div>
                <div className="shape-arc"></div>
                <div className="shape-arc-left"></div>

                <div className="header-content">
                    <h1>Courses</h1>
                    <ul className="breadcrumb">
                        <li><a href="/" className="crumb-link">Home</a></li>
                        <li className="separator">&gt;</li>
                        <li>Pages</li>
                        <li className="separator">&gt;</li>
                        <li className="active">Courses</li>
                    </ul>
                </div>
            </div>

            {/* --- MAIN CONTENT CONTAINER --- */}
            <div className="container">
                {/* Course Counter */}
                

                <div className="course-grid">
                    {/* ... your existing mapping logic ... */}
                    {currentCourses.map((course) => (
                        <div key={course.id} className="course-card">
                            
                            {/* Card Image Area with Premium Fallback */}
                            <div className="card-image-wrapper">
                                {!imageErrors[course.id] ? (
                                    <img 
                                        src={course.image || '/images/default-course.jpg'} 
                                        alt={course.title} 
                                        className="card-img" 
                                        onError={() => handleImageError(course.id)}
                                    />
                                ) : (
                                    <div className="premium-fallback">
                                        <div className="fallback-pattern"></div>
                                        <IoBookOutline className="fallback-icon" />
                                        <span className="fallback-text">Vertex Internship</span>
                                    </div>
                                )}
                            </div>

                            {/* Card Content Area */}
                            <div className="card-content">
                                <span className="category-tag">{course.category}</span>
                                <h3>{course.title}</h3>
                                <p>{course.desc}</p>
                                
                                <button className="btn-enroll" onClick={() => openModal(course)}>
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        <button className="page-btn prev-next" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button key={idx + 1} className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`} onClick={() => handlePageChange(idx + 1)}>
                                {idx + 1}
                            </button>
                        ))}
                        <button className="page-btn prev-next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    </div>
                )}
            </div>

            {/* --- ENROLLMENT MODAL --- */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="btn-close" onClick={closeModal}><IoCloseOutline /></button>
                        
                        <h2>Course Enrollment</h2>
                        <div className="selected-course-badge">
                            <strong>Selected Course:</strong> {selectedCourse?.title}
                        </div>

                        <form onSubmit={handleEnrollSubmit} className="enroll-form">
                            <div className="input-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter your name" value={enrollName} onChange={e => setEnrollName(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label>Phone / WhatsApp Number</label>
                                <input type="tel" placeholder="Enter your number" value={enrollPhone} onChange={e => setEnrollPhone(e.target.value)} required />
                            </div>
                            
                            <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : 'Submit & Continue to WhatsApp'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
                .courses-wrapper { 
                    background-color: #f4f6f9; 
                    padding-bottom: 6rem; /* Removed top and side padding */
                    font-family: 'Ubuntu', sans-serif; 
                    min-height: 100vh; 
                }

                .container { 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    padding: 0 1.5rem; /* Added side padding back to the main container */
                }

                /* --- PREMIUM PAGE HEADER --- */
                .premium-page-header {
                    position: relative;
                    background-color: #ffffff; /* Clean white background */
                    padding: 7rem 1.5rem 5rem; /* Extra top padding to touch the very top */
                    text-align: center;
                    margin-bottom: 3rem;
                    overflow: hidden; 
                    border-bottom: 1px solid #e2e8f0; /* Subtle edge separation */
                    width: 100%; /* Forces full width */
                }

                /* --- PREMIUM PAGE HEADER --- */
                .premium-page-header {
                    position: relative;
                    background-color: #f8fafc; /* Premium light background */
                    padding: 6rem 1.5rem;
                    text-align: center;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    overflow: hidden; /* Keeps shapes inside */
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.01);
                }

                .header-content {
                    position: relative;
                    z-index: 10;
                }

                .premium-page-header h1 {
                    font-size: 3.5rem;
                    color: #1e293b;
                    font-weight: 700;
                    margin: 0 0 1rem 0;
                    letter-spacing: -0.5px;
                }

                .breadcrumb {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1.15rem;
                    font-weight: 500;
                    color: #0f172a;
                }

                .crumb-link {
                    color: #0f172a;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .crumb-link:hover {
                    color: #145da0; /* Brand Blue */
                }

                .separator {
                    color: #cbd5e1;
                    font-weight: 400;
                    font-size: 0.9rem;
                }

                .active {
                    color: #0f172a;
                }

                .course-counter {
                    text-align: center;
                    margin-bottom: 3rem;
                }
                .course-counter p {
                    color: #64748b;
                    font-size: 1rem;
                    font-weight: 500;
                    margin: 0;
                }

                /* --- DECORATIVE SHAPES (Match Desktop Reference) --- */
                .shape-dots {
                    position: absolute;
                    left: 12%;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 140px;
                    height: 140px;
                    background-image: radial-gradient(#1bba93 2.5px, transparent 2.5px);
                    background-size: 20px 20px;
                    border-radius: 50%;
                    opacity: 0.8;
                }

                .shape-zigzag {
                    position: absolute;
                    right: 15%;
                    top: 45%;
                    width: 50px;
                    height: 25px;
                    /* Clean SVG data URI for the teal zigzag */
                    background-image: url("data:image/svg+xml,%3Csvg width='50' height='25' viewBox='0 0 50 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%231bba93' stroke-width='2.5' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 6l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 14l10-4 10 4 10-4 10 4'/%3E%3Cpath d='M2 22l10-4 10 4 10-4 10 4'/%3E%3C/g%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                }

                .shape-red-dots {
                    position: absolute;
                    right: 0;
                    top: 10%;
                    width: 30px;
                    height: 120px;
                    background-image: radial-gradient(#ef4444 2.5px, transparent 2.5px);
                    background-size: 20px 20px;
                    opacity: 0.7;
                }

                .shape-arc {
                    position: absolute;
                    right: -10%;
                    bottom: -40%;
                    width: 500px;
                    height: 500px;
                    border: 1px solid #e2e8f0;
                    border-radius: 50%;
                    z-index: 0;
                }
                
                .shape-arc-left {
                    position: absolute;
                    left: -5%;
                    top: -20%;
                    width: 300px;
                    height: 300px;
                    border: 1px solid #e2e8f0;
                    border-radius: 50%;
                    z-index: 0;
                }

                /* --- MOBILE RESPONSIVE UI --- */
                @media (max-width: 768px) {
                    .premium-page-header {
                        padding: 3rem 1rem;
                        border-radius: 8px;
                    }
                    .premium-page-header h1 {
                        font-size: 2.2rem;
                        margin-bottom: 0.75rem;
                    }
                    .breadcrumb {
                        font-size: 1rem;
                    }
                    
                    /* Hide decorative shapes strictly on mobile for clean look */
                    .shape-dots, 
                    .shape-zigzag, 
                    .shape-red-dots, 
                    .shape-arc,
                    .shape-arc-left {
                        display: none;
                    }
                }

                /* Course Grid & Card */
                .course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
                .course-card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; }
                .course-card:hover {  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08); }

                /* --- Image Area & Premium Fallback --- */
                .card-image-wrapper { width: 100%; height: 220px; position: relative; background: #e2e8f0; overflow: hidden; }
                .card-img { width: 100%; height: 100%; object-fit: cover; }
                
                .premium-fallback {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #0b3964 0%, #145da0 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                
                /* Subtle diagonal lines pattern to make the fallback look textured */
                .fallback-pattern {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 8px);
                    pointer-events: none;
                }

                :global(.fallback-icon) {
                    font-size: 4.5rem;
                    color: #fcab17; /* Brand Accent */
                    margin-bottom: 0.5rem;
                    z-index: 1;
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
                }

                .fallback-text {
                    color: #ffffff;
                    font-size: 1.1rem;
                    font-weight: 700;
                    letter-spacing: 1px;
                    z-index: 1;
                    opacity: 0.9;
                }

                /* Content Area */
                .card-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
                .category-tag { background-color: #fee2e2; color: #ef4444; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 500; display: inline-block; width: fit-content; margin-bottom: 1rem; }
                .card-content h3 { font-size: 1.25rem; color: #0f172a; font-weight: 700; margin: 0 0 1rem 0; line-height: 1.4; }
                .card-content p { color: #64748b; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.5rem 0; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

                .btn-enroll { background-color: #145da0; color: #ffffff; border: none; padding: 12px; border-radius: 6px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background-color 0.3s; width: 100%; font-family: inherit; margin-top: auto; }
                .btn-enroll:hover { background-color: #0f4a82; }

                /* Pagination */
                .pagination { display: flex; justify-content: center; gap: 8px; margin-top: 4rem; flex-wrap: wrap; }
                .page-btn { background: #ffffff; border: 1px solid #cbd5e1; color: #475569; width: 40px; height: 40px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; }
                .page-btn.prev-next { width: auto; padding: 0 15px; }
                .page-btn:hover:not(:disabled) { background: #f1f5f9; border-color: #145da0; color: #145da0; }
                .page-btn.active { background: #145da0; color: #ffffff; border-color: #145da0; }
                .page-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                /* Modal Overlay & Content */
                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 1rem; backdrop-filter: blur(4px); }
                .modal-content { background: #ffffff; padding: 2.5rem; border-radius: 12px; width: 100%; max-width: 450px; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); animation: scaleUp 0.3s ease; }
                @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

                .btn-close { position: absolute; top: 15px; right: 15px; background: #f1f5f9; border: none; font-size: 1.5rem; color: #64748b; width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: 0.2s; }
                .btn-close:hover { background: #e2e8f0; color: #ef4444; }

                .modal-content h2 { color: #145da0; font-weight: 700; margin: 0 0 1.5rem 0; font-size: 1.6rem; text-align: center;}
                .selected-course-badge { background: #fffbeb; color: #b45309; padding: 12px; border-radius: 8px; border: 1px solid #fde68a; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.4; }

                .enroll-form { display: flex; flex-direction: column; gap: 1rem; }
                .input-group { display: flex; flex-direction: column; gap: 6px; }
                .input-group label { font-size: 0.9rem; font-weight: 700; color: #1e293b; }
                .input-group input { padding: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; font-size: 1rem; outline: none; transition: 0.3s; }
                .input-group input:focus { border-color: #145da0; }

                .btn-submit { background: #fcab17; color: #ffffff; border: none; padding: 14px; border-radius: 6px; font-weight: 700; font-size: 1.05rem; cursor: pointer; transition: background 0.3s; margin-top: 0.5rem; }
                .btn-submit:hover:not(:disabled) { background: #e59a15; }
                .btn-submit:disabled { opacity: 0.7; cursor: wait; }

                /* Responsive */
                @media (max-width: 1024px) {
                    .course-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
                }
                @media (max-width: 768px) {
                    .courses-wrapper { 
                        padding: 0 0 4rem 0; /* 0 padding on top/sides so it touches the edges */
                    }
                    .premium-page-header {
                        padding: 5rem 1rem 3rem; /* Taller top padding for mobile status bars */
                        border-radius: 0px; /* Removes the curved card look completely */
                        margin-bottom: 2rem;
                    }
                    .page-header h1 { font-size: 2.2rem; }
                    .course-grid { grid-template-columns: 1fr; gap: 1.5rem; }
                    .card-image-wrapper { height: 200px; }
                    .modal-content { padding: 2rem 1.5rem; }
                }
            `}</style>
        </div>
    );
}