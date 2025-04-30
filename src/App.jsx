import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import MealPlanner from './components/MealPlanner';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/new" element={<RecipeForm />} />
              <Route path="/edit/:id" element={<RecipeForm />} />
              <Route path="/meal-planner" element={<MealPlanner />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;