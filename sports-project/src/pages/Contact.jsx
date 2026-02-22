import "../styles/contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        Have a question or need help? We’d love to hear from you.
      </p>

      <div className="contact-container">
        {/* Left side */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>
            Reach out to us for orders, support, or general inquiries.
          </p>

          <div className="info-item">
            <strong>Email:</strong>
            <span>support@sportkits.com</span>
          </div>

          <div className="info-item">
            <strong>Phone:</strong>
            <span>+1 234 567 890</span>
          </div>

          <div className="info-item">
            <strong>Address:</strong>
            <span>123 Sports Street, New York, USA</span>
          </div>
        </div>

        {/* Right side */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
