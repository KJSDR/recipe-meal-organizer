import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-yellow-900 text-white shadow-md"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Meal Prep App
          </motion.span>
        </Link>
        <nav>
          <motion.ul 
            className="flex space-x-6"
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
                className="hover:text-emerald-200 transition-colors"
              >
                <motion.span whileHover={{ y: -2 }} className="inline-block">
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
                className="hover:text-emerald-200 transition-colors"
              >
                <motion.span whileHover={{ y: -2 }} className="inline-block">
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
                className="hover:text-emerald-200 transition-colors"
              >
                <motion.span whileHover={{ y: -2 }} className="inline-block">
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