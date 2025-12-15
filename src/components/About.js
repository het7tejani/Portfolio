import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { EmailIcon } from './Icons';
import '../styles.css';

const Highlight = ({ children }) => (
  <span className="about-highlight">
    {children}
  </span>
);

const parseText = (text) => {
  return text.split(/<highlight>(.*?)<\/highlight>/g).map((part, index) => 
    index % 2 === 1 ? <Highlight key={index}>{part}</Highlight> : part
  );
};

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 }
  })
};

const About = ({ summaryParagraphs }) => {
  const handleContactClick = (e) => {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="section about-section">
      <div className="container about-container">
        <div className="about-content-wrapper">
            <motion.h2 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
                custom={0}
                className="section-title about-title"
            >
                About Me
            </motion.h2>

            <div className="about-text-content">
                {summaryParagraphs.map((para, index) => (
                    <motion.p
                        key={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={variants}
                        custom={index + 1}
                    >
                        {parseText(para)}
                    </motion.p>
                ))}
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
                custom={summaryParagraphs.length + 1}
                className="about-buttons"
            >
                <motion.a
                    href="/Het Tejani.pdf" 
                    download
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <i className="fas fa-download"></i> Download Resume
                </motion.a>

                <motion.a
                    href="#contact"
                    onClick={handleContactClick}
                    className="btn btn-outline"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <EmailIcon style={{ width: '1.25rem', height: '1.25rem' }} /> Contact Me
                </motion.a>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);
