import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromMealPlan, clearMealPlan } from '../store/mealPlanSlice';

const MealPlanner = () => {
  const dispatch = useDispatch();
  const mealPlan = useSelector(state => state.mealPlan);
  
  // Days and meal type
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Weekly Meal Planner</h1>
        <button
          onClick={handleClearMealPlan}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left border-b"></th>
              {days.map(day => (
                <th key={day.value} className="py-3 px-4 text-left border-b capitalize">
                  {day.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map(mealType => (
              <tr key={mealType.value} className="border-b">
                <td className="py-3 px-4 font-medium bg-gray-50">{mealType.label}</td>
                
                {days.map(day => {
                  const recipe = mealPlan[day.value][mealType.value];
                  
                  return (
                    <td key={`${day.value}-${mealType.value}`} className="py-3 px-4">
                      {recipe ? (
                        <div className="flex flex-col">
                          <div className="flex justify-between items-start">
                            <Link 
                              to={`/recipes/${recipe.id}`}
                              className="text-emerald-600 hover:text-emerald-800 font-medium"
                            >
                              {recipe.title}
                            </Link>
                            <button
                              onClick={() => handleRemoveRecipe(day.value, mealType.value)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              ×
                            </button>
                          </div>
                          
                          {recipe.readyInMinutes && (
                            <span className="text-xs text-gray-500 mt-1">
                              {recipe.readyInMinutes} min
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No meal planned</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealPlanner;