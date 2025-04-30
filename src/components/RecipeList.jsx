import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <Link 
          to="/new"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition-colors"
        >
          Add New Recipe
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      {/* Loading State */}
      {status === 'loading' && (
        <div className="text-center py-12">
          <svg className="inline-block animate-spin h-8 w-8 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Loading recipes...</p>
        </div>
      )}

      {/* Error State */}
      {status === 'failed' && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>Error loading recipes: {error}</p>
          <button 
            onClick={() => dispatch(fetchRecipes())}
            className="mt-2 text-sm font-medium underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      {status !== 'loading' && filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {recipe.image && (
                <img 
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
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : status !== 'loading' && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No recipes found. Try a different search term or add a new recipe.</p>
        </div>
      )}
    </div>
  );
};

export default RecipeList;