import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteUserRecipe } from '../store/recipesSlice';
import { addToMealPlan } from '../store/mealPlanSlice';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Find recipe API recipes or user recipes
  const { items, userRecipes } = useSelector(state => state.recipes);
  const recipe = [...items, ...userRecipes].find(r => r.id === id);
  
  // Meal plan state
  const [mealPlanOptions, setMealPlanOptions] = useState({
    day: 'monday',
    mealType: 'breakfast'
  });
  
  // Handle if recipe not found
  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Recipe not found</p>
        <Link 
          to="/"
          className="text-emerald-600 hover:text-emerald-800 font-medium"
        >
          Back to Recipes
        </Link>
      </div>
    );
  }
  
  // Check if is a user recipe
  const isUserRecipe = userRecipes.some(r => r.id === id);
  
  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      dispatch(deleteUserRecipe(id));
      navigate('/');
    }
  };
  
  // Handle meal plan change
  const handleMealPlanChange = (e) => {
    setMealPlanOptions({
      ...mealPlanOptions,
      [e.target.name]: e.target.value
    });
  };
  
  // Add meal plan
  const handleAddToMealPlan = () => {
    dispatch(addToMealPlan({
      day: mealPlanOptions.day,
      mealType: mealPlanOptions.mealType,
      recipe
    }));
    alert(`Added to ${mealPlanOptions.day}'s ${mealPlanOptions.mealType}`);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/" className="text-emerald-600 hover:text-emerald-800">
          ← Back to Recipes
        </Link>
        
        {isUserRecipe && (
          <div className="space-x-2">
            <Link 
              to={`/edit/${id}`}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 object-cover"
          />
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {recipe.readyInMinutes && (
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Ready in: {recipe.readyInMinutes} min
              </div>
            )}
            
            {recipe.servings && (
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Servings: {recipe.servings}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              {recipe.instructions ? (
                <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
              ) : (
                <p className="text-gray-600">No instructions provided</p>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              ) : recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
                <ul className="space-y-2">
                  {recipe.extendedIngredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mt-2 mr-2"></span>
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No ingredients listed</p>
              )}
              
              {/* Add to Meal Plan */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
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
                
                <button
                  onClick={handleAddToMealPlan}
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Add to Meal Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;