import React from 'react';
import { GitHubIcon, LinkedInIcon, EmailIcon } from './Icons';
import '../styles.css';

const Navbar = () => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Het Tejani</div>
        <div className="nav-links">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a>
          <a href="#skills" onClick={(e) => handleScroll(e, 'skills')}>Skills</a>
          <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Projects</a>
          <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
        </div>
        <div className="social-icons">
          <a href="https://github.com/het7tejani" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="https://www.linkedin.com/in/het-tejani-1a45a1240/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="mailto:hettejani07@gmail.com" aria-label="Email">
            <EmailIcon />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
