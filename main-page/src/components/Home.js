// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to My Fitness App</h1>
      <p>Explore the features of our app.</p>
      <Link to="/calorie-calculator">
        <button>Go to Calorie Calculator</button>
      </Link>
    </div>
  );
};

export default Home;
