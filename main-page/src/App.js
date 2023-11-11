// src/App.js
import React from 'react';
import ImageGallery from './components/ImageGallery';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './components/Home';
import CalorieCalculator from './components/CalorieCalculator';

function App() {
  const images = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    // Add more image URLs as needed
  ];

  return (
    <div className="app-container">
      <ImageGallery images={images} />
    </div>
  );

  // return (
  //   <Router>
  //     <div className="App">
  //       <nav>
  //         <ul>
  //           <li>
  //             <Link to="/">Home</Link>
  //           </li>
  //           <li>
  //             <Link to="/calorie-calculator">Calorie Calculator</Link>
  //           </li>
  //         </ul>
  //       </nav>
  //     <Routes>
  //     <Route path="/" exact component={Home} />
  //       <Route path="/calorie-calculator" component={CalorieCalculator} />
  //     </Routes>
        
  //     </div>
  //   </Router>
  // );

}

export default App;
