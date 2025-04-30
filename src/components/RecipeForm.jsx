import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addUserRecipe, updateUserRecipe } from '../store/recipesSlice';

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get recipe if in edit mode
  const userRecipes = useSelector(state => state.recipes.userRecipes);
  const recipeToEdit = id ? userRecipes.find(recipe => recipe.id === id) : null;
  
  // Form state with controlled components
  const [formData, setFormData] = useState({
    title: '',
    readyInMinutes: '',
    servings: '',
    ingredients: [''],
    instructions: '',
    image: ''
  });
  
  // Load recipe data if editing
  useEffect(() => {
    if (recipeToEdit) {
      setFormData({
        title: recipeToEdit.title || '',
        readyInMinutes: recipeToEdit.readyInMinutes || '',
        servings: recipeToEdit.servings || '',
        ingredients: recipeToEdit.ingredients || [''],
        instructions: recipeToEdit.instructions || '',
        image: recipeToEdit.image || ''
      });
    }
  }, [recipeToEdit]);
  
  // Handle input changes basic fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle ingredient changes
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };
  
  // Add new ingredient
  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };
  
  // Remove ingredient
  const removeIngredientField = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients.splice(index, 1);
      setFormData({
        ...formData,
        ingredients: updatedIngredients
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      alert('Please enter a recipe title');
      return;
    }
    
    const recipeData = {
      ...formData,
      readyInMinutes: parseInt(formData.readyInMinutes) || 0,
      servings: parseInt(formData.servings) || 1,
      id: recipeToEdit ? recipeToEdit.id : undefined
    };
    
    if (recipeToEdit) {
      dispatch(updateUserRecipe(recipeData));
    } else {
      dispatch(addUserRecipe(recipeData));
    }
    
    navigate('/');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {recipeToEdit ? 'Edit Recipe' : 'Add New Recipe'}
      </h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Recipe Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="readyInMinutes" className="block text-gray-700 font-medium mb-2">
              Cook Time (minutes)
            </label>
            <input
              type="number"
              id="readyInMinutes"
              name="readyInMinutes"
              value={formData.readyInMinutes}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div>
            <label htmlFor="servings" className="block text-gray-700 font-medium mb-2">
              Servings
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {formData.image && (
            <div className="mt-2">
              <img src={formData.image} alt="Recipe preview" className="h-40 object-cover rounded-md" />
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 font-medium">
              Ingredients
            </label>
            <button
              type="button"
              onClick={addIngredientField}
              className="text-emerald-600 hover:text-emerald-800"
            >
              + Add Ingredient
            </button>
          </div>
          
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder={`Ingredient ${index + 1}`}
              />
              
              <button
                type="button"
                onClick={() => removeIngredientField(index)}
                className="ml-2 text-red-500 hover:text-red-700"
                disabled={formData.ingredients.length <= 1}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <label htmlFor="instructions" className="block text-gray-700 font-medium mb-2">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="6"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Enter cooking instructions..."
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            {recipeToEdit ? 'Update Recipe' : 'Add Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;