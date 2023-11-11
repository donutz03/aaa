// ImageComponent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalorieCalculator from './CalorieCalculator';
import './ImageComponent.css';

const ImageComponent = ({ src, altText, currentImageIndex }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false); 
  const [showWeight, setShowWeight] = useState(false);
  const navigate = useNavigate();

  const showCalorieCalculator = () => {
    setShowCalculator(true);
    navigate('/calorie-calculator'); // Navigate to the "/calorie-calculator" route
  };

  const showWorkoutPlanner = () => {
    setShowWorkout(true);
    navigate('/workout-planner'); // Navigate to the "/workout-planner" route
  }

  const showWeightTracker = () => {
    setShowWeight(true);
    navigate('/weight-tracker'); // Navigate to the "/weight-tracker" route
  }

  const showButton = () => {
    switch (currentImageIndex) {
      case 0:
        return (
          <button className="show-calculator-button" onClick={showCalorieCalculator}>
            Show Calorie Calculator
          </button>
        );
      case 1:
        return (
          <button className="workout-planner" onClick={showWorkoutPlanner}>
            Workout Planner
          </button>
        );
      case 2:
        return (
          <button className="weight-tracker" onClick={showWeightTracker}>
            Go to Weight Tracker
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="image-container">
      {showCalculator ? (
        <CalorieCalculator />
      ) : (
        <>
          <img
            src={src}
            alt={altText || "Description of the image"}
            className="centered-image"
          />
          {showButton()}
        </>
      )}
    </div>
  );
};

export default ImageComponent;
