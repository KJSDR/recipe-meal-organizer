import React from 'react';
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
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/new" className="btn-primary bg-blue-600 hover:bg-blue-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Add New Recipe
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/meal-planner" className="btn-accent bg-yellow-500 hover:bg-yellow-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Plan Your Meals
              </Link>
            </motion.div>
          </div>
          
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