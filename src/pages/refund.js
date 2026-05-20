export default function Refund() {
    return (
        <div className="legal-wrapper">
            <div className="container">
                <h1>Refund Policy</h1>
                
                <h3>Refund Eligibility</h3>
                <p>We strive to provide the best training experience. However, since our courses provide immediate access to digital resources and mentorship slots, the following policy applies:</p>
                
                <ul>
                    <li><strong>Before Course Commencement:</strong> A full refund may be requested up to 48 hours before the batch start date.</li>
                    <li><strong>After Commencement:</strong> No refunds are provided once the student has accessed course materials or attended the first live session.</li>
                    <li><strong>Exceptional Circumstances:</strong> Requests made due to medical emergencies will be reviewed on a case-by-case basis.</li>
                </ul>
                
                <p>To request a refund, please email <strong>info@elevateinterns.in</strong> with your registration details.</p>
            </div>
            <style jsx>{`
                .legal-wrapper { padding: 5rem 1.5rem; background: #ffffff; }
                .container { max-width: 800px; margin: 0 auto; line-height: 1.8; color: #475569; }
                h1 { color: #934761; }
                ul { padding-left: 20px; }
                li { margin-bottom: 10px; }
            `}</style>
        </div>
    );
}