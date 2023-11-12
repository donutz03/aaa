import React from 'react';
import ImageGallery from './components/ImageGallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalorieCalculator from './components/CalorieCalculator';
import WorkoutPlanner from './components/WorkoutPlanner';
import WeightTracker from './components/WeightTracker';
import StrengthLevel from './components/StrengthLevel';
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
        <Route path="/workout-planner" element={<WorkoutPlanner />} />
        <Route path="/weight-tracker" element={<WeightTracker />} />
        <Route path="strength-level" element={<StrengthLevel />} />
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