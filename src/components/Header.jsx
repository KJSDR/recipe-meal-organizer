import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-emerald-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold mb-4 md:mb-0">
          Meal Prep App
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="hover:text-emerald-200 transition-colors"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link 
                to="/new" 
                className="hover:text-emerald-200 transition-colors"
              >
                Add Recipe
              </Link>
            </li>
            <li>
              <Link 
                to="/meal-planner" 
                className="hover:text-emerald-200 transition-colors"
              >
                Meal Planner
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;