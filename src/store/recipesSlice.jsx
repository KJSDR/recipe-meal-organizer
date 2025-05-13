import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

// Async thunk for fetching recipes from an API
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      
      const data = await response.json();
      return data.recipes.map(recipe => ({
        id: recipe.id.toString(),
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary,
        instructions: recipe.instructions,
        extendedIngredients: recipe.extendedIngredients
      }));
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }
);

// Initial state
const initialState = {
  items: [],
  userRecipes: [],
  status: 'idle',
  error: null
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addUserRecipe: (state, action) => {
      const newRecipe = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.userRecipes.push(newRecipe);
    },
    updateUserRecipe: (state, action) => {
      const index = state.userRecipes.findIndex(recipe => recipe.id === action.payload.id);
      if (index !== -1) {
        state.userRecipes[index] = action.payload;
      }
    },
    deleteUserRecipe: (state, action) => {
      state.userRecipes = state.userRecipes.filter(recipe => recipe.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addUserRecipe, updateUserRecipe, deleteUserRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;