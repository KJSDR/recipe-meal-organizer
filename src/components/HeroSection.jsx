import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section w-full mx-auto max-w-7xl content-center">
      {/* Hero background image - use a Sanji image URL */}
      <img 
        src="https://i.pinimg.com/originals/2d/8f/99/2d8f99a7e3e820202bcd78d686c32f04.gif" 
        alt="Sanji from One Piece cooking" 
        className="hero-image"
      />
      
      
      
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
          
          
          
          {/* Animated steam elements */}
          <div className="absolute bottom-10 right-10 opacity-70">
            <div className="relative">
              <div className="steam absolute -top-8 left-0 h-6 w-6 rounded-full bg-white"></div>
              <div className="steam absolute -top-8 left-6 h-6 w-6 rounded-full bg-white" style={{ animationDelay: '0.3s' }}></div>
              <div className="steam absolute -top-8 left-12 h-6 w-6 rounded-full bg-white" style={{ animationDelay: '0.6s' }}></div>
              <div className="h-16 w-20 bg-gray-800 rounded-t-3xl"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;