import { motion } from "framer-motion";

const GlowingOrb = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep dark background with multi-depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(15, 50, 100, 0.35) 0%, transparent 50%),
            linear-gradient(180deg, #030810 0%, #061020 20%, #081830 50%, #0a1525 80%, #050c18 100%)
          `,
        }}
      />

      {/* Strong edge vignetting */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.6) 100%)
          `,
        }}
      />

      {/* Subtle grid pattern - very faint */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(50, 100, 180, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(50, 100, 180, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)',
        }}
      />

      {/* Curved energy arcs - LEFT side */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="arcGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(80, 160, 255, 0.5)" />
            <stop offset="40%" stopColor="rgba(60, 140, 240, 0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="arcGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(80, 160, 255, 0.5)" />
            <stop offset="40%" stopColor="rgba(60, 140, 240, 0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="arcGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Left curved arcs */}
        <path 
          d="M -50 250 Q 200 320, 400 420" 
          stroke="url(#arcGradLeft)" 
          strokeWidth="1.5" 
          fill="none" 
          filter="url(#arcGlow)"
          opacity="0.7"
        />
        <path 
          d="M -30 320 Q 220 380, 420 470" 
          stroke="url(#arcGradLeft)" 
          strokeWidth="1.2" 
          fill="none" 
          filter="url(#arcGlow)"
          opacity="0.5"
        />
        <path 
          d="M -20 390 Q 240 440, 440 520" 
          stroke="url(#arcGradLeft)" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.4"
        />
        
        {/* Right curved arcs */}
        <path 
          d="M 1490 250 Q 1240 320, 1040 420" 
          stroke="url(#arcGradRight)" 
          strokeWidth="1.5" 
          fill="none" 
          filter="url(#arcGlow)"
          opacity="0.7"
        />
        <path 
          d="M 1470 320 Q 1220 380, 1020 470" 
          stroke="url(#arcGradRight)" 
          strokeWidth="1.2" 
          fill="none" 
          filter="url(#arcGlow)"
          opacity="0.5"
        />
        <path 
          d="M 1460 390 Q 1200 440, 1000 520" 
          stroke="url(#arcGradRight)" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.4"
        />
      </svg>

      {/* Soft ambient glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px]"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(50, 120, 220, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Central light beam - vertical */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[52%]"
        style={{
          background: 'linear-gradient(180deg, rgba(120, 200, 255, 0.5) 0%, rgba(100, 180, 255, 0.7) 40%, rgba(80, 170, 255, 0.9) 70%, rgba(140, 220, 255, 1) 100%)',
        }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Light beam outer glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[55%]"
        style={{
          background: 'linear-gradient(180deg, rgba(60, 140, 255, 0.05) 0%, rgba(50, 130, 255, 0.1) 50%, rgba(80, 170, 255, 0.2) 100%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Main sphere - large, bottom positioned */}
      <div className="absolute bottom-[-60%] left-1/2 -translate-x-1/2 w-[1800px] h-[1800px] md:w-[2200px] md:h-[2200px]">
        {/* Outer atmospheric haze */}
        <div
          className="absolute inset-[-3%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse 100% 45% at 50% 12%, rgba(50, 110, 180, 0.12) 0%, transparent 50%)',
            filter: 'blur(30px)',
          }}
        />
        
        {/* Sphere main body */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse 100% 40% at 50% 10%, rgba(70, 130, 200, 0.2) 0%, rgba(40, 90, 160, 0.1) 30%, transparent 55%),
              radial-gradient(circle at 50% 50%, rgba(15, 40, 80, 0.9) 0%, rgba(8, 25, 55, 0.95) 40%, #040a15 65%)
            `,
          }}
        />
        
        {/* Inner shine layer */}
        <div
          className="absolute inset-[2%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse 80% 35% at 50% 8%, rgba(90, 160, 230, 0.1) 0%, transparent 50%)',
          }}
        />

        {/* Top rim highlight */}
        <div
          className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[75%] h-[6%] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(100, 170, 240, 0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Bright convergence glow where beam hits sphere */}
      <motion.div
        className="absolute bottom-[36%] left-1/2 -translate-x-1/2 w-[250px] h-[120px]"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(150, 220, 255, 0.7) 0%, rgba(100, 190, 255, 0.4) 30%, rgba(60, 150, 240, 0.15) 55%, transparent 75%)',
          filter: 'blur(20px)',
        }}
        animate={{ opacity: [0.7, 1, 0.7], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core focal point - very bright */}
      <motion.div
        className="absolute bottom-[37.5%] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, #b0e8ff 40%, #60c0ff 100%)',
          boxShadow: '0 0 25px rgba(180, 230, 255, 1), 0 0 50px rgba(140, 210, 255, 0.9), 0 0 80px rgba(100, 180, 255, 0.6), 0 0 120px rgba(60, 150, 255, 0.4)',
        }}
        animate={{ opacity: [0.9, 1, 0.9], scale: [0.95, 1.1, 0.95] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbital rings - prominent curved ellipses */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="8%" stopColor="rgba(90, 170, 255, 0.15)" />
            <stop offset="25%" stopColor="rgba(110, 190, 255, 0.4)" />
            <stop offset="50%" stopColor="rgba(130, 210, 255, 0.55)" />
            <stop offset="75%" stopColor="rgba(110, 190, 255, 0.4)" />
            <stop offset="92%" stopColor="rgba(90, 170, 255, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="orbitGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor="rgba(80, 160, 240, 0.1)" />
            <stop offset="30%" stopColor="rgba(100, 180, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(120, 200, 255, 0.4)" />
            <stop offset="70%" stopColor="rgba(100, 180, 255, 0.3)" />
            <stop offset="90%" stopColor="rgba(80, 160, 240, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="orbitGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="rgba(70, 150, 230, 0.08)" />
            <stop offset="35%" stopColor="rgba(90, 170, 250, 0.2)" />
            <stop offset="50%" stopColor="rgba(100, 180, 255, 0.28)" />
            <stop offset="65%" stopColor="rgba(90, 170, 250, 0.2)" />
            <stop offset="85%" stopColor="rgba(70, 150, 230, 0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="orbitGlow">
            <feGaussianBlur stdDeviation="1" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outermost orbit */}
        <ellipse 
          cx="50%" cy="110%" rx="65%" ry="42%" 
          fill="none" stroke="url(#orbitGrad1)" strokeWidth="2.5"
          filter="url(#orbitGlow)"
        />
        
        {/* Outer orbit */}
        <ellipse 
          cx="50%" cy="104%" rx="56%" ry="33%" 
          fill="none" stroke="url(#orbitGrad1)" strokeWidth="2.2"
          filter="url(#orbitGlow)"
        />
        
        {/* Middle-outer orbit */}
        <ellipse 
          cx="50%" cy="97%" rx="47%" ry="25%" 
          fill="none" stroke="url(#orbitGrad2)" strokeWidth="2"
        />
        
        {/* Middle orbit */}
        <ellipse 
          cx="50%" cy="91%" rx="39%" ry="18%" 
          fill="none" stroke="url(#orbitGrad2)" strokeWidth="1.8"
        />
        
        {/* Inner orbit */}
        <ellipse 
          cx="50%" cy="85%" rx="31%" ry="12%" 
          fill="none" stroke="url(#orbitGrad3)" strokeWidth="1.5"
        />

        {/* Innermost orbit */}
        <ellipse 
          cx="50%" cy="80%" rx="23%" ry="8%" 
          fill="none" stroke="url(#orbitGrad3)" strokeWidth="1.2"
        />
        
        {/* Core orbit */}
        <ellipse 
          cx="50%" cy="76%" rx="16%" ry="5%" 
          fill="none" stroke="url(#orbitGrad3)" strokeWidth="1"
        />
      </svg>

      {/* Ambient light diffusion around center */}
      <div
        className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 50% 70%, rgba(60, 140, 220, 0.08) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Very subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
};

export default GlowingOrb;
