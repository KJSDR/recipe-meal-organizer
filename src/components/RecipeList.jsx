import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { fetchRecipes } from '../store/recipesSlice';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { items, userRecipes, status, error } = useSelector(state => state.recipes);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch recipes when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [status, dispatch]);

  // Combine API recipes and user recipes
  const allRecipes = [...items, ...userRecipes];

  // Filter recipes based on search term
  const filteredRecipes = allRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const recipeCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold">Recipes</h1>
        <Link 
          to="/new"
          className="bg-yellow-900 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            Add New Recipe
          </motion.span>
        </Link>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </motion.div>

      {/* Loading State */}
      {status === 'loading' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <motion.svg 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block h-8 w-8 text-emerald-500" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </motion.svg>
          <p className="mt-2 text-gray-600">Loading recipes...</p>
        </motion.div>
      )}

      {/* Error State */}
      {status === 'failed' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
        >
          <p>Error loading recipes: {error}</p>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => dispatch(fetchRecipes())}
            className="mt-2 text-sm font-medium underline"
          >
            Try Again
          </motion.button>
        </motion.div>
      )}

      {/* Recipe Grid */}
      {status !== 'loading' && filteredRecipes.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRecipes.map(recipe => (
            <motion.div 
              key={recipe.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={recipeCardVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.2 }}
            >
              {recipe.image && (
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>Ready in: {recipe.readyInMinutes || '?'} min</span>
                  <span>Servings: {recipe.servings || '?'}</span>
                </div>
                <Link 
                  to={`/recipes/${recipe.id}`}
                  className="text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  <motion.span 
                    whileHover={{ x: 3 }}
                    className="inline-block"
                  >
                    View Recipe →
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : status !== 'loading' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} 
          className="text-center py-12 bg-gray-50 rounded-lg"
        >
          <p className="text-gray-600">No recipes found. Try a different search term or add a new recipe.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecipeList;