// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="min-h-screen bg-slate-50">
          <Header />
          <AnimatePresence mode="wait">
            <main className="px-4 py-8">
              <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/recipes/:id" element={<RecipeDetail />} />
                <Route path="/new" element={<RecipeForm />} />
                <Route path="/edit/:id" element={<RecipeForm />} />
                <Route path="/meal-planner" element={<MealPlanner />} />
              </Routes>
            </main>
          </AnimatePresence>
          
          {/* Sanji Themed Footer */}
          <footer className="bg-slate-900 text-white py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">
                Sanji's Recipe Book &copy; {new Date().getFullYear()} | A React Final Project
              </p>
              <p className="text-blue-400 text-xs mt-2">
                "The best recipes are made with passion and care."
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;