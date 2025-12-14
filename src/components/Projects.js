import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHubIcon, ExternalLinkIcon } from './Icons';
import '../styles.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Expense Manager',
    categories: ['Frontend', 'Web'],
    shortDescription: 'Tracking and managing personal or business expenses. Easily categorize, record, and visualize your spending to stay on top of your budget.',
    technologies: ['React', 'JavaScript', 'Bootstrap', 'Chart.js', 'Local Storage'],
    repoUrl: 'https://github.com/het7tejani/Expense-manager',
    liveDemoUrl: 'https://expense-manager-orpin.vercel.app/',
    icon: 'wallet'
  },
  {
    id: 2,
    title: 'UrbanPantry',
    categories: ['Full Stack', 'Web'],
    shortDescription: 'A modern home and kitchen essentials store offering stylish, functional, and high-quality products designed to elevate everyday living.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'JWT'],
    repoUrl: 'https://github.com/het7tejani/UrbanPantry',
    liveDemoUrl: 'https://urbanpantry.netlify.app/',
    icon: 'store'
  },
  {
    id: 3,
    title: 'Onclick Infotech',
    categories: ['Frontend', 'Web'],
    shortDescription: 'Custom software, web & mobile app solutions for digital growth.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    repoUrl: 'https://github.com/het7tejani/onclick',
    liveDemoUrl: 'https://www.onclickinfotech.com/',
    icon: 'laptop-code'
  },
  {
    id: 4,
    title: 'The Blog',
    categories: ['Frontend', 'Web'],
    shortDescription: 'The Blog is a conceptual blog application built to demonstrate the power of React, modern CSS in JS patterns, and efficient data fetching with Axios.',
    technologies: ['React', 'Next.js', 'Axios', 'Styled Components'],
    repoUrl: 'https://github.com/het7tejani/Blog',
    liveDemoUrl: 'https://theblog99.vercel.app/',
    icon: 'newspaper'
  },
  {
    id: 5,
    title: 'Recipe Finder',
    categories: ['Frontend', 'Web'],
    shortDescription: 'The Recipe Finder app is a modern, responsive web application built with React that allows users to search and discover recipes from a wide variety of cuisines.',
    technologies: ['React', 'Next.js', 'Axios', 'CSS Modules'],
    repoUrl: 'https://github.com/het7tejani/Recipe-Finder',
    liveDemoUrl: 'https://recipe99.vercel.app/',
    icon: 'utensils'
  },
  {
    id: 6,
    title: 'Shreeji Masala',
    categories: ['Full Stack', 'Web'],
    shortDescription: 'Manage your spice inventory effortlessly with this Masala Dashboard. Track stock levels, daily consumption, supplier records, and profit.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Recharts'],
    repoUrl: 'https://github.com/het7tejani/Shreeji',
    liveDemoUrl: 'https://shreejimasala.vercel.app/',
    icon: 'boxes-stacked'
  }
];

const ALL_CATEGORIES = ['All', 'Full Stack', 'Frontend', 'Web'];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { delay: 0.05, duration: 0.25, ease: "easeOut" }
  }
};

const ProjectCard = ({ project, index }) => {
  const [showAllTech, setShowAllTech] = useState(false);
  const visibleTechCount = 4;
  const visibleTech = project.technologies.slice(0, visibleTechCount);
  const hiddenTech = project.technologies.slice(visibleTechCount);
  const hasMoreTech = hiddenTech.length > 0;

  return (
    <motion.div
      layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="project-card-new"
    >
      {/* Visual Section */}
      <div className="project-visual">
        <div className="project-visual-inner">
          <i className={`fas fa-${project.icon} project-visual-icon`}></i>
        </div>
      </div>

      {/* Content Section */}
      <div className="project-details">
        <h3 className="project-title-new">{project.title}</h3>
        <p className="project-description-new">{project.shortDescription}</p>

        {/* Tech Stack */}
        <div className="project-tech-section">
          <div className="tech-label">
            <i className="fas fa-code"></i> <span>Tech Stack</span>
          </div>
          <div className="tech-tags-container">
            {visibleTech.map(tech => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
            
            <AnimatePresence>
              {showAllTech && hiddenTech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="tech-badge"
                >
                  {tech}
                </motion.span>
              ))}
            </AnimatePresence>

            {hasMoreTech && (
              <button 
                onClick={() => setShowAllTech(!showAllTech)}
                className="tech-expand-btn"
              >
                {showAllTech ? 'Show less' : `+${hiddenTech.length} more`}
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="project-actions">
          {project.repoUrl && (
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn repo-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitHubIcon className="w-4 h-4" style={{ width: '1rem', height: '1rem' }} /> GitHub
            </motion.a>
          )}

          {project.liveDemoUrl && (
            <motion.a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn live-btn group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="live-btn-shine"></span>
              <ExternalLinkIcon className="w-4 h-4" style={{ width: '1rem', height: '1rem' }} /> Live WebApp
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.categories.includes(activeCategory));

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <i className="fas fa-laptop-code" style={{ marginRight: '1rem', color: '#8B5CF6' }}></i>
            My Projects
          </h2>
          <p className="projects-subtitle">
            A selection of my work, from dynamic web applications to inventory management systems.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="projects-filter-container">
          {ALL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="projects-list"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-projects"
              >
                No projects found for this category.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;