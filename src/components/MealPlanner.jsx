// src/components/MealPlanner.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { removeFromMealPlan, clearMealPlan } from '../store/mealPlanSlice';

const MealPlanner = () => {
  const dispatch = useDispatch();
  const mealPlan = useSelector(state => state.mealPlan);
  
  // Days and meal types for display
  const days = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
  ];
  
  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
  ];
  
  // Clear the meal plan
  const handleClearMealPlan = () => {
    if (window.confirm('Are you sure you want to clear the entire meal plan?')) {
      dispatch(clearMealPlan());
    }
  };
  
  // Remove a recipe from the meal plan
  const handleRemoveRecipe = (day, mealType) => {
    dispatch(removeFromMealPlan({ day, mealType }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <div className="relative mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-90"></div>
        <div className="relative z-10 py-16 px-8 text-white text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Sanji's Weekly Menu
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            "A good chef plans their menu like a captain charts their course. Organization is the secret ingredient."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearMealPlan}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg flex items-center"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Clear Meal Plan
            </motion.button>
          </motion.div>
        </div>
        
        {/* Animated flame elements */}
        <div className="absolute bottom-0 right-0 opacity-70">
          <div className="relative">
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut" 
              }}
              className="absolute -top-10 right-8 h-10 w-6 bg-yellow-400 rounded-full blur-md"
            ></motion.div>
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut",
                delay: 0.3
              }}
              className="absolute -top-12 right-14 h-12 w-8 bg-orange-500 rounded-full blur-md"
            ></motion.div>
          </div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                <motion.th
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="py-4 px-4 text-left border-b border-slate-700 font-medium"
                ></motion.th>
                
                {days.map((day, index) => (
                  <motion.th 
                    key={day.value} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="py-4 px-4 text-left border-b border-slate-700 font-medium capitalize"
                  >
                    {day.label}
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mealTypes.map((mealType, typeIndex) => (
                <motion.tr 
                  key={mealType.value} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + (typeIndex * 0.1) }}
                  className="border-b"
                >
                  <td className="py-4 px-4 font-medium bg-slate-100">{mealType.label}</td>
                  
                  {days.map(day => {
                    const recipe = mealPlan[day.value][mealType.value];
                    
                    return (
                      <td key={`${day.value}-${mealType.value}`} className="py-4 px-4 border border-gray-100">
                        <AnimatePresence mode="wait">
                          {recipe ? (
                            <motion.div 
                              key="recipe"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="flex flex-col bg-blue-50 p-3 rounded-lg border border-blue-200"
                            >
                              <div className="flex justify-between items-start">
                                <Link 
                                  to={`/recipes/${recipe.id}`}
                                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                >
                                  <motion.span 
                                    whileHover={{ x: 3 }} 
                                    className="inline-block"
                                  >
                                    {recipe.title}
                                  </motion.span>
                                </Link>
                                <motion.button
                                  whileHover={{ scale: 1.2, rotate: 90 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleRemoveRecipe(day.value, mealType.value)}
                                  className="text-red-500 hover:text-red-700 ml-2"
                                >
                                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </motion.button>
                              </div>
                              
                              {recipe.readyInMinutes && (
                                <span className="text-xs text-gray-500 mt-1 flex items-center">
                                  <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  {recipe.readyInMinutes} min
                                </span>
                              )}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.7 }}
                              exit={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="text-gray-400 text-sm flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                              </svg>
                              <span>Add a meal</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* Sanji Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 max-w-3xl mx-auto text-center"
      >
        <svg className="w-10 h-10 mx-auto text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
        
        <p className="text-xl text-gray-700 italic mb-4">
          "To feed someone is to share a part of your heart with them. That's why everyone who eats my food feels my soul in each bite."
        </p>
        
        <p className="text-blue-600 font-medium">— Sanji, Ship's Cook of the Straw Hat Pirates</p>
      </motion.div>
    </motion.div>
  );
};

export default MealPlanner;