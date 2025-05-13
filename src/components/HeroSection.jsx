import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section w-full mx-auto max-w-7xl flex items-center justify-center flex-col">
      {/* Hero background */}
      <div className="w-full flex justify-center">
        <img 
          src="https://i.pinimg.com/originals/2d/8f/99/2d8f99a7e3e820202bcd78d686c32f04.gif" 
          alt="Sanji from One Piece cooking" 
          className="hero-image mx-auto"
        />
      </div>
      
      {/* Hero content */}
      <div className="hero-content text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Cook Like Sanji
          </h1>
          <p className="hero-subtitle">
            "A cook feeds hungry people, not only when they're hungry for food."
            <span className="block mt-2 text-yellow-400 font-medium">- Sanji</span>
          </p>
          
          
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;