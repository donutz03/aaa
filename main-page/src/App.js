import React from 'react';
import ImageGallery from './components/ImageGallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalorieCalculator from './components/CalorieCalculator';
import './App.css';
 

function App() {
  const images = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
  ];

  return (
    // <div className='app-container'>
    <Router>
      <Routes>
        <Route path="/" element={<ImageGallery images={images} />} />
        <Route path="/calorie-calculator" element={<CalorieCalculator />} />
      </Routes>
    </Router>
    // </div>
  );

  // return (
  //   <div className="app-container">
  //     <ImageGallery images={images} />
  //   </div>
  // );


}

export default App;