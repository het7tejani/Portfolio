import React from 'react';
import { motion } from 'framer-motion';
import '../styles.css';

const Hero = () => {
  const firstName = "HET";
  const lastName = "TEJANI";
  const tagline = "I'm a Web Developer building modern, scalable, and user-friendly web applications.";

  const handleScroll = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation Variants
  const fadeInUp = (delay) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: delay, type: "spring", stiffness: 120 } 
    }
  });

  const letterVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.045,
        duration: 0.45,
        ease: "easeOut",
        type: "spring",
        stiffness: 150
      }
    })
  };

  return (
    <section id="home" className="hero-section">
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-intro" variants={fadeInUp(0.1)}>
          Hi,
        </motion.p>
        <motion.p className="hero-intro-sub" variants={fadeInUp(0.15)}>
          My name is
        </motion.p>
        
        <motion.h1 
            className="hero-main-title" 
            variants={fadeInUp(0.2)}
            aria-label={`${firstName} ${lastName}`}
        >
            <span className="name-gradient">
                {firstName.split("").map((char, index) => (
                    <motion.span key={`fn-${index}`} custom={index} variants={letterVariant} className="inline-char">
                        {char}
                    </motion.span>
                ))}
            </span>
            <span className="name-accent">
                {lastName.split("").map((char, index) => (
                    <motion.span key={`ln-${index}`} custom={firstName.length + index} variants={letterVariant} className="inline-char">
                        {char}
                    </motion.span>
                ))}
            </span>
        </motion.h1>

        <motion.p className="hero-tagline" variants={fadeInUp(0.3)}>
          {tagline}
        </motion.p>

        <motion.a 
          href="#contact" 
          onClick={handleScroll}
          className="btn hero-btn"
          variants={fadeInUp(0.4)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
