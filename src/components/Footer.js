import React from 'react';
import '../styles.css';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem', color: '#6B7280', fontSize: '0.9rem' }}>
      © {new Date().getFullYear()} Het Tejani. All rights reserved.
    </footer>
  );
};

export default Footer;
