export default function Terms() {
    return (
        <div className="legal-wrapper">
            <div className="container">
                <h1>Terms & Conditions</h1>
                <p>Last Updated: May 20, 2026</p>
                
                <h3>1. Introduction</h3>
                <p>Welcome to Elevate Interns. By accessing our platform and enrolling in our programs, you agree to be bound by these terms.</p>

                <h3>2. Enrollment & Payments</h3>
                <p>All enrollments are subject to verification. Fees paid for training programs are non-transferable.</p>

                <h3>3. Intellectual Property</h3>
                <p>All content provided, including course materials, videos, and platform designs, is the exclusive property of Elevate Interns and Antigravity Technologies.</p>

                <h3>4. User Conduct</h3>
                <p>Users are prohibited from sharing account credentials or distributing copyrighted course materials.</p>
            </div>
            <style jsx>{`
                .legal-wrapper { padding: 5rem 1.5rem; background: #ffffff; }
                .container { max-width: 800px; margin: 0 auto; line-height: 1.8; color: #475569; }
                h1 { color: #934761; }
                h3 { color: #AD5C71; margin-top: 2rem; }
            `}</style>
        </div>
    );
}