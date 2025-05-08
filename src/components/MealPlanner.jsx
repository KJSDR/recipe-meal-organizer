import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
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
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold">Weekly Meal Planner</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearMealPlan}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Clear All
        </motion.button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <motion.th
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="py-3 px-4 text-left border-b"
                ></motion.th>
                
                {days.map((day, index) => (
                  <motion.th 
                    key={day.value} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="py-3 px-4 text-left border-b capitalize"
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
                  <td className="py-3 px-4 font-medium bg-gray-50">{mealType.label}</td>
                  
                  {days.map(day => {
                    const recipe = mealPlan[day.value][mealType.value];
                    
                    return (
                      <td key={`${day.value}-${mealType.value}`} className="py-3 px-4">
                        <AnimatePresence mode="wait">
                          {recipe ? (
                            <motion.div 
                              key="recipe"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="flex flex-col"
                            >
                              <div className="flex justify-between items-start">
                                <Link 
                                  to={`/recipes/${recipe.id}`}
                                  className="text-emerald-600 hover:text-emerald-800 font-medium"
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
                                  ×
                                </motion.button>
                              </div>
                              
                              {recipe.readyInMinutes && (
                                <span className="text-xs text-gray-500 mt-1">
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
                              className="text-gray-400 text-sm"
                            >
                              No meal planned
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
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-gray-600"
      >
        <p>To add recipes to your meal plan, visit a recipe and use the "Add to Meal Plan" option</p>
      </motion.div>
    </motion.div>
  );
};

export default MealPlanner;