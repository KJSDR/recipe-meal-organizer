import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { deleteUserRecipe } from '../store/recipesSlice';
import { addToMealPlan } from '../store/mealPlanSlice';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Find recipe in either API recipes or user recipes
  const { items, userRecipes } = useSelector(state => state.recipes);
  const recipe = [...items, ...userRecipes].find(r => r.id === id);
  
  // Meal plan state
  const [mealPlanOptions, setMealPlanOptions] = useState({
    day: 'monday',
    mealType: 'breakfast'
  });
  
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  
  // Handle if recipe not found
  if (!recipe) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-gray-600 mb-4">Recipe not found</p>
        <Link 
          to="/"
          className="text-emerald-600 hover:text-emerald-800 font-medium"
        >
          <motion.span whileHover={{ x: -3 }}>
            Back to Recipes
          </motion.span>
        </Link>
      </motion.div>
    );
  }
  
  // Check if this is a user recipe (can be edited/deleted)
  const isUserRecipe = userRecipes.some(r => r.id === id);
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      dispatch(deleteUserRecipe(id));
      navigate('/');
    }
  };
  
  // Handle meal plan changes
  const handleMealPlanChange = (e) => {
    setMealPlanOptions({
      ...mealPlanOptions,
      [e.target.name]: e.target.value
    });
  };
  
  // Add to meal plan
  const handleAddToMealPlan = () => {
    dispatch(addToMealPlan({
      day: mealPlanOptions.day,
      mealType: mealPlanOptions.mealType,
      recipe
    }));
    
    // Show and then hide notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex justify-between items-center"
      >
        <Link to="/" className="text-emerald-600 hover:text-emerald-800">
          <motion.span whileHover={{ x: -3 }} className="inline-block">
            ← Back to Recipes
          </motion.span>
        </Link>
        
        {isUserRecipe && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-x-2"
          >
            <Link 
              to={`/edit/${id}`}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Edit
              </motion.span>
            </Link>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </motion.button>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        {recipe.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-64 object-cover"
            />
          </motion.div>
        )}
        
        <div className="p-6">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-3xl font-bold mb-4"
          >
            {recipe.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap gap-4 mb-6"
          >
            {recipe.readyInMinutes && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                Ready in: {recipe.readyInMinutes} min
              </motion.div>
            )}
            
            {recipe.servings && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                Servings: {recipe.servings}
              </motion.div>
            )}
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="md:col-span-2"
            >
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              {recipe.instructions ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
                />
              ) : (
                <p className="text-gray-600">No instructions provided</p>
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <motion.ul 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.6
                      }
                    }
                  }}
                  className="space-y-2"
                >
                  {recipe.ingredients.map((ingredient, index) => (
                    <motion.li 
                      key={index} 
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                      {ingredient}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
                <motion.ul 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.6
                      }
                    }
                  }}
                  className="space-y-2"
                >
                  {recipe.extendedIngredients.map((ingredient, idx) => (
                    <motion.li 
                      key={idx} 
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                      {ingredient.original}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="text-gray-600">No ingredients listed</p>
              )}
              
              {/* Add to Meal Plan */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-8 p-4 bg-gray-50 rounded-lg"
              >
                <h3 className="font-medium mb-3">Add to Meal Plan</h3>
                
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Day</label>
                  <select
                    name="day"
                    value={mealPlanOptions.day}
                    onChange={handleMealPlanChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Meal</label>
                  <select
                    name="mealType"
                    value={mealPlanOptions.mealType}
                    onChange={handleMealPlanChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                  </select>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToMealPlan}
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Add to Meal Plan
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg"
          >
            <p>Recipe added to {mealPlanOptions.day}'s {mealPlanOptions.mealType}!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecipeDetail;