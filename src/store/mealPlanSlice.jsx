import { createSlice } from '@reduxjs/toolkit';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const mealTypes = ['breakfast', 'lunch', 'dinner'];

// Create initial empty meal plan
const createEmptyMealPlan = () => {
  const mealPlan = {};
  days.forEach(day => {
    mealPlan[day] = {};
    mealTypes.forEach(type => {
      mealPlan[day][type] = null;
    });
  });
  return mealPlan;
};

const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState: createEmptyMealPlan(),
  reducers: {
    addToMealPlan: (state, action) => {
      const { day, mealType, recipe } = action.payload;
      state[day][mealType] = recipe;
    },
    removeFromMealPlan: (state, action) => {
      const { day, mealType } = action.payload;
      state[day][mealType] = null;
    },
    clearMealPlan: () => createEmptyMealPlan()
  }
});

export const { addToMealPlan, removeFromMealPlan, clearMealPlan } = mealPlanSlice.actions;
export default mealPlanSlice.reducer;