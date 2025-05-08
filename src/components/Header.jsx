import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 text-white shadow-lg z-10 sticky top-0"
    >
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="flex items-center mb-4 md:mb-0 group">
          <motion.div
            whileHover={{ rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="mr-2"
          >
            {/* Chef hat icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 16a2 2 0 001.106-3.337c.185.093.543.227 1.157.333C13.936 13.3 16 13.84 16 15c0 1-2 2-6 2s-6-1-6-2c0-1.16 2.064-1.7 3.737-2.004.614-.106.972-.24 1.157-.333A2 2 0 0010 16zm0-4a2 2 0 100-4 2 2 0 000 4zm-3-2a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" />
              <path d="M3 8c0-1 1-1 2-1h10c1 0 2 0 2 1s-1 2-2 2H9.87l-.7-1.75L6.88 10H5c-1 0-2-1-2-2z" />
              <path d="M4 5h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
            </svg>
          </motion.div>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold group-hover:text-yellow-400 transition-colors duration-300"
          >
            Sanji's<span className="text-yellow-400 group-hover:text-white transition-colors duration-300"> Recipe Book</span>
          </motion.span>
        </Link>
        
        <nav>
          <motion.ul 
            className="flex space-x-8 items-center"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            <motion.li
              variants={{
                hidden: { y: -20, opacity: 0 },
                show: { y: 0, opacity: 1 }
              }}
            >
              <Link 
                to="/" 
                className={`nav-link text-lg font-medium ${isActive('/') ? 'text-yellow-400' : 'text-white hover:text-yellow-200'} transition-colors`}
              >
                <motion.span whileHover={{ y: -2 }} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Recipes
                </motion.span>
              </Link>
            </motion.li>
            
            <motion.li
              variants={{
                hidden: { y: -20, opacity: 0 },
                show: { y: 0, opacity: 1 }
              }}
            >
              <Link 
                to="/new" 
                className={`nav-link text-lg font-medium ${isActive('/new') ? 'text-yellow-400' : 'text-white hover:text-yellow-200'} transition-colors`}
              >
                <motion.span whileHover={{ y: -2 }} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Add Recipe
                </motion.span>
              </Link>
            </motion.li>
            
            <motion.li
              variants={{
                hidden: { y: -20, opacity: 0 },
                show: { y: 0, opacity: 1 }
              }}
            >
              <Link 
                to="/meal-planner" 
                className={`nav-link text-lg font-medium ${isActive('/meal-planner') ? 'text-yellow-400' : 'text-white hover:text-yellow-200'} transition-colors`}
              >
                <motion.span whileHover={{ y: -2 }} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Meal Planner
                </motion.span>
              </Link>
            </motion.li>
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;