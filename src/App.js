import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsSection from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles.css';

const ABOUT_TEXT = [
  "Hi, I'm <highlight>HET TEJANI</highlight> — a passionate <highlight>Web Developer</highlight> with expertise in <highlight>Frontend</highlight>, <highlight>Backend</highlight>, and <highlight>Full Stack Development</highlight>.",
  "I specialize in crafting high-performance websites and applications using <highlight>React</highlight>, <highlight>Next.js</highlight>, and <highlight>Node.js</highlight>. My focus is on writing clean, efficient code and delivering seamless user experiences that solve real-world problems.",
  "I'm a continuous learner who stays up-to-date with the latest web technologies. Whether it's building complex <highlight>dashboards</highlight> or optimizing <highlight>server-side performance</highlight>, I bring creativity and technical precision to every project."
];

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About summaryParagraphs={ABOUT_TEXT} />
      <SkillsSection />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
