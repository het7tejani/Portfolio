import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubIcon, LinkedInIcon, EmailIcon, ExternalLinkIcon } from './Icons';
import '../styles.css';

// Configuration from your provided code
const EMAIL_CONFIG = {
  SERVICE_ID: "service_qwxanz3",
  TEMPLATE_ID: "template_ph8nytr",
  PUBLIC_KEY: "c3uJ_VpzeInuHqLlP"
};

const sendEmail = async (data) => {
  const payload = {
    service_id: EMAIL_CONFIG.SERVICE_ID,
    template_id: EMAIL_CONFIG.TEMPLATE_ID,
    user_id: EMAIL_CONFIG.PUBLIC_KEY,
    template_params: data
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errors, setErrors] = useState({});

  const contactInfo = {
    email: "hettejani07@gmail.com",
    github: "https://github.com/het7tejani",
    linkedin: "https://www.linkedin.com/in/het-tejani-1a45a1240/"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending' || status === 'success') return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrors({});

    try {
      await sendEmail(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrors({ general: "Failed to send. Please try again later." });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: -1, opacity: 0.15,
        backgroundImage: 'radial-gradient(#4B5563 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 60%, transparent 100%)'
      }} />

      <div className="container">
        <motion.div 
          className="contact-grid-layout"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column: Info */}
          <motion.div variants={itemVariants} className="contact-info-col">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Get in Touch</h2>
            <p className="contact-desc">
              I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            
            <div className="social-links-vertical">
              <a href={contactInfo.github} target="_blank" rel="noreferrer" className="social-card github group">
                <div className="social-icon-box">
                  <GitHubIcon style={{ width: '1.75rem', height: '1.75rem' }} />
                </div>
                <div>
                  <div className="social-label">GitHub</div>
                  <div className="social-value">het7tejani</div>
                </div>
                <ExternalLinkIcon className="social-arrow" />
              </a>

              <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="social-card linkedin group">
                <div className="social-icon-box">
                  <LinkedInIcon style={{ width: '1.75rem', height: '1.75rem' }} />
                </div>
                <div>
                  <div className="social-label">LinkedIn</div>
                  <div className="social-value">Het Tejani</div>
                </div>
                <ExternalLinkIcon className="social-arrow" />
              </a>

              <a href={`mailto:${contactInfo.email}`} className="social-card email group">
                <div className="social-icon-box">
                  <EmailIcon style={{ width: '1.75rem', height: '1.75rem' }} />
                </div>
                <div>
                  <div className="social-label">Email</div>
                  <div className="social-value">{contactInfo.email}</div>
                </div>
                <i className="fas fa-arrow-right social-arrow"></i>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div variants={itemVariants} className="contact-form-col">
            <form onSubmit={handleSubmit} className="glass-form">
              <h3 className="form-title">Send a Message</h3>
              
              <div className="form-group-floating">
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" " 
                  className={`form-input-floating ${errors.name ? 'error' : ''}`}
                />
                <label htmlFor="name" className="form-label-floating">Your Name</label>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group-floating">
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" " 
                  className={`form-input-floating ${errors.email ? 'error' : ''}`}
                />
                <label htmlFor="email" className="form-label-floating">Your Email</label>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group-floating">
                <textarea 
                  name="message" 
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" " 
                  rows="4"
                  className={`form-input-floating textarea ${errors.message ? 'error' : ''}`}
                ></textarea>
                <label htmlFor="message" className="form-label-floating">Your Message</label>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              {errors.general && <div className="error-banner">{errors.general}</div>}

              <button 
                type="submit" 
                className={`submit-btn ${status}`} 
                disabled={status === 'sending' || status === 'success'}
              >
                {status === 'idle' && <><i className="fas fa-paper-plane"></i> Send Message</>}
                {status === 'sending' && <><i className="fas fa-spinner fa-spin"></i> Sending...</>}
                {status === 'success' && <><i className="fas fa-check"></i> Message Sent!</>}
                {status === 'error' && <><i className="fas fa-exclamation-circle"></i> Try Again</>}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
