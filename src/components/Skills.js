import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import '../styles.css';

const SKILLS = [
  { name: 'React', slug: 'react', color: '#61DAFB' },
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
  { name: 'Context API', icon: 'sitemap', iconClass: 'fas', color: '#61DAFB' },
  { name: 'React Query', slug: 'reactquery', color: '#FF4154' },
  { name: 'React Router', slug: 'reactrouter', color: '#CA4245' },
  { name: 'Redux', slug: 'redux', color: '#764ABC' },
  { name: 'React Spring', icon: 'bolt', iconClass: 'fas', color: '#6EC2F8' },
  { name: 'React Testing Library', slug: 'testinglibrary', color: '#E33332' },
  { name: 'Jest', slug: 'jest', color: '#C21325' },
  { name: 'Chart.js', slug: 'chartdotjs', color: '#FF6384' },
  { name: 'Framer Motion', slug: 'framer', color: '#0055FF' },
  { name: 'React Hook Form', slug: 'reacthookform', color: '#EC5990' },
  { name: 'HTML5', slug: 'html5', color: '#E34F26' },
  { name: 'CSS3', icon: 'css3-alt', iconClass: 'fab', color: '#1572B6' },
  { name: 'Tailwind', slug: 'tailwindcss', color: '#06B6D4' },
  { name: 'PostCSS', slug: 'postcss', color: '#DD3A0A' },
  { name: 'Bootstrap', slug: 'bootstrap', color: '#7952B3' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
  { name: 'Node.js', slug: 'nodedotjs', color: '#339933' },
  { name: 'Express.js', slug: 'express', color: '#ffffff' },
  { name: 'Axios', slug: 'axios', color: '#5A29E4' },
  { name: 'MongoDB', slug: 'mongodb', color: '#47A248' },
  { name: 'Mongoose', slug: 'mongoose', color: '#880000' },
  { name: 'C', slug: 'c', color: '#A8B9CC' },
  { name: 'C++', slug: 'cplusplus', color: '#00599C' },
  { name: 'Python', slug: 'python', color: '#3776AB' },
  { name: 'PyCharm', slug: 'pycharm', color: '#21D789' },
  { name: 'Git', slug: 'git', color: '#F05032' },
  { name: 'GitHub', slug: 'github', color: '#ffffff' },
  { name: 'Vercel', slug: 'vercel', color: '#ffffff' },
  { name: 'Web Vitals', icon: 'heart-pulse', iconClass: 'fas', color: '#818CF8' },
  { name: 'AWS', icon: 'aws', iconClass: 'fab', color: '#FF9900' },
];

const SkillIcon = ({ skill, size = '48px' }) => {
    const iconStyle = { width: size, height: size, objectFit: 'contain' };
    
    if (skill.slug) {
        const colorHex = skill.color.replace('#', '');
        return (
             <img 
                src={`https://cdn.simpleicons.org/${skill.slug}/${colorHex}`} 
                alt={skill.name} 
                style={iconStyle}
                className="skill-icon-img"
             />
        );
    }

    const iconClass = skill.iconClass || 'fas';

    return (
        <i 
            className={`${iconClass} fa-${skill.icon}`} 
            style={{ color: skill.color, fontSize: size }}
        ></i>
    );
}

const SkillCard = ({ item, large = true }) => {
    const cardStyle = {
        minWidth: large ? '140px' : '100%',
        height: large ? '140px' : '120px',
        flexShrink: 0,
        backgroundColor: '#0f172a',
        borderRadius: '0.75rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        cursor: 'default',
    };

    const textStyle = {
        marginTop: '0.5rem',
        textAlign: 'center',
        fontSize: large ? '1rem' : '0.75rem',
        color: large ? '#ffffff' : '#f5f5f5',
        fontWeight: 500
    };

    return (
        <div className="glow-hover" style={cardStyle}>
            <SkillIcon skill={item} size={large ? '48px' : '40px'} />
            <span style={textStyle}>{item.name}</span>
        </div>
    );
};

const SkillsSection = () => {
    const containerRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);
    const reqId1 = useRef(0);
    const reqId2 = useRef(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoverRow1, setHoverRow1] = useState(false);
    const [hoverRow2, setHoverRow2] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    useEffect(() => {
        const scrollRow1 = () => {
            if (!hoverRow1 && row1Ref.current) {
                row1Ref.current.scrollLeft += 0.5;
                if (row1Ref.current.scrollLeft >= row1Ref.current.scrollWidth / 2) {
                    row1Ref.current.scrollLeft = 0;
                }
            }
            reqId1.current = requestAnimationFrame(scrollRow1);
        };

        const scrollRow2 = () => {
            if (!hoverRow2 && row2Ref.current) {
                row2Ref.current.scrollLeft -= 0.5; 
                if (row2Ref.current.scrollLeft <= 0) {
                     row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 2;
                }
            }
            reqId2.current = requestAnimationFrame(scrollRow2);
        };

        if (row2Ref.current && row2Ref.current.scrollLeft === 0) {
            row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 2;
        }

        if (!isExpanded) {
            reqId1.current = requestAnimationFrame(scrollRow1);
            reqId2.current = requestAnimationFrame(scrollRow2);
        }

        return () => {
            if (reqId1.current) cancelAnimationFrame(reqId1.current);
            if (reqId2.current) cancelAnimationFrame(reqId2.current);
        };
    }, [hoverRow1, hoverRow2, isExpanded]);

    const mid = Math.ceil(SKILLS.length / 2);
    const firstHalf = SKILLS.slice(0, mid);
    const secondHalf = SKILLS.slice(mid);
    
    const containerVariants = {
        initial: { rotateY: -90, opacity: 0 },
        animate: { 
            rotateY: 0, opacity: 1, 
            transition: { type: "spring", stiffness: 150, damping: 25, delay: 0.1 } 
        },
        exit: { 
            rotateY: 90, opacity: 0, 
            transition: { type: "spring", stiffness: 150, damping: 25 } 
        }
    };

    const gridVariants = {
        initial: {},
        animate: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } }
    };

    const itemVariants = {
        initial: { y: 20, opacity: 0, scale: 0.8 },
        animate: { 
            y: 0, opacity: 1, scale: 1, 
            transition: { type: "spring", stiffness: 300, damping: 20 } 
        }
    };

    return (
        <section id="skills" className="section" style={{ overflow: 'hidden', perspective: '1000px' }}>
            <style>{`
                .animate-gear { animation: rotateScaleGlow 6s ease-in-out infinite; }
                @keyframes rotateScaleGlow {
                  0% { transform: rotate(0deg) scale(1); filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2)); }
                  25% { transform: rotate(90deg) scale(1.05); filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.25)); }
                  50% { transform: rotate(180deg) scale(1.1); filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3)); }
                  75% { transform: rotate(270deg) scale(1.05); filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.25)); }
                  100% { transform: rotate(180deg) scale(1); filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2)); }
                }
                .glow-hover { position: relative; transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.1s ease; will-change: transform, box-shadow; background-color: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.015), transparent); overflow: hidden; z-index: 10; }
                .glow-hover::before { content: ''; position: absolute; inset: 0; border-radius: 0.75rem; background: radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 70%); opacity: 0; transition: opacity 0.1s ease-in-out; pointer-events: none; z-index: 0; }
                .glow-hover:hover { transform: translateY(-6px) scale(1.06); box-shadow: 0 8px 24px rgba(255, 255, 255, 0.05), 0 4px 12px rgba(255, 255, 255, 0.08), 0 0 10px rgba(255, 255, 255, 0.04); background: radial-gradient(circle at center, rgba(23, 8, 61, 0.68), rgba(15, 23, 42, 0.7) 70%); }
                .glow-hover:hover::before { opacity: 1; }
                .skills-container-breathing { position: relative; will-change: box-shadow; animation: breathing-glow 6s ease-in-out infinite; }
                @keyframes breathing-glow { 0%, 100% { box-shadow: 0 0 20px -5px rgba(168, 85, 247, 0.2); } 50% { box-shadow: 0 0 35px -5px rgba(168, 85, 247, 0.4); } }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .particle-field { position: relative; overflow: hidden; }
                .particle-field::before, .particle-field::after { content: ''; position: absolute; top: 0; left: 0; width: 200%; height: 100%; background-repeat: repeat; animation: animate-particles 25s linear infinite; z-index: 0; pointer-events: none; }
                .particle-field::before { background-image: radial-gradient(circle, #67e8f9 0.5px, transparent 1px); background-size: 30px 30px; opacity: 0.3; }
                .particle-field::after { background-image: radial-gradient(circle,rgb(157, 73, 236) 0.6px, transparent 1px); background-size: 50px 50px; animation-duration: 40s; animation-direction: reverse; opacity: 0.3; }
                @keyframes animate-particles { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            `}</style>

            <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <i className="fas fa-cog animate-gear" style={{ fontSize: '2.5rem', color: '#9CA3AF' }}></i>
                    My Stack
                </h2>

                <motion.div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    layout
                    transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.8 }}
                    style={{
                        width: isExpanded ? '100%' : '90%',
                        maxWidth: isExpanded ? '1400px' : '1100px',
                        background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(56,189,248,0.1), transparent)',
                        padding: '2px',
                        borderRadius: '1rem',
                    }}
                    className="skills-container-breathing"
                >
                    <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        className="particle-field"
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: isExpanded ? 'auto' : '380px',
                            background: 'linear-gradient(135deg, #171717, #0a0a0a)',
                            borderRadius: '1rem',
                            border: '1px solid #333',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            style={{
                                position: 'absolute',
                                pointerEvents: 'none',
                                zIndex: 0,
                                x: mouseX,
                                y: mouseY,
                                width: 400,
                                height: 400,
                                translateX: "-50%",
                                translateY: "-50%",
                                background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
                                filter: "blur(50px)"
                            }}
                        />

                        <AnimatePresence mode="wait">
                            {isExpanded ? (
                                <motion.div
                                    key="grid"
                                    variants={containerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ zIndex: 1, position: 'relative', padding: '2rem' }}
                                >
                                    <motion.div
                                        variants={gridVariants}
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                            gap: '1rem',
                                            justifyItems: 'center'
                                        }}
                                    >
                                        {SKILLS.map((skill) => (
                                            <motion.div key={skill.name} variants={itemVariants} style={{ width: '120px', height: '120px' }}>
                                                <SkillCard item={skill} large={false} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="scrolling"
                                    variants={containerVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{ zIndex: 1, position: 'relative', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                                >
                                    <div
                                        ref={row1Ref}
                                        onMouseEnter={() => setHoverRow1(true)}
                                        onMouseLeave={() => setHoverRow1(false)}
                                        className="no-scrollbar"
                                        style={{ display: 'flex', gap: '1rem', overflowX: 'scroll', whiteSpace: 'nowrap' }}
                                    >
                                        {[...firstHalf, ...firstHalf, ...firstHalf].map((skill, i) => (
                                            <SkillCard key={`r1-${skill.name}-${i}`} item={skill} large={true} />
                                        ))}
                                    </div>
                                    <div
                                        ref={row2Ref}
                                        onMouseEnter={() => setHoverRow2(true)}
                                        onMouseLeave={() => setHoverRow2(false)}
                                        className="no-scrollbar"
                                        style={{ display: 'flex', gap: '1rem', overflowX: 'scroll', whiteSpace: 'nowrap' }}
                                    >
                                        {[...secondHalf, ...secondHalf, ...secondHalf].map((skill, i) => (
                                            <SkillCard key={`r2-${skill.name}-${i}`} item={skill} large={true} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                <div style={{ marginTop: '2rem' }}>
                    <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '3rem',
                            width: '3rem',
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(30, 41, 59, 0.5)', 
                            backdropFilter: 'blur(4px)',
                            border: '1px solid #334155', 
                            color: 'white',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                             <i className="fas fa-chevron-down"></i>
                        </motion.div>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;