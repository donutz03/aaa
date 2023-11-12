
import './CalorieCalculator.css';
import React, { useState } from 'react';

const CalorieCalculator = () => {
  const [result, setResult] = useState('');

  const calculateCalories = () => {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = document.getElementById('activityLevel').value;
    const goal = document.getElementById('goal').value;

    const basalMetabolicRate = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    let totalCalories = 0;

    switch (activityLevel) {
      case 'sedentary':
        totalCalories = basalMetabolicRate * 1.2;
        break;
      case 'lightlyActive':
        totalCalories = basalMetabolicRate * 1.375;
        break;
      case 'moderatelyActive':
        totalCalories = basalMetabolicRate * 1.55;
        break;
      case 'veryActive':
        totalCalories = basalMetabolicRate * 1.725;
        break;
      default:
        break;
    }

    if (goal === 'lose') {
      totalCalories -= 500; 
    } else if (goal === 'gain') {
      totalCalories += 500; 
    }

    setResult(`Calories per day: ${totalCalories.toFixed(2)} kcal`);
  };

  return (
    <div className="calorie-calculator-container">
      <form id="calorieForm" className="calorie-form">
        <h1 className="calculator-title">Calorie Calculator</h1>
        <label htmlFor="age" className="input-label">Age:</label>
        <input type="number" id="age" name="age" className="input-field" required />

        <label htmlFor="gender" className="input-label">Gender:</label>
        <select id="gender" name="gender" className="input-field" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="weight" className="input-label">Weight (kg):</label>
        <input type="number" id="weight" name="weight" className="input-field" required />

        <label htmlFor="height" className="input-label">Height (cm):</label>
        <input type="number" id="height" name="height" className="input-field" required />

        <label htmlFor="activityLevel" className="input-label">Activity Level:</label>
        <select id="activityLevel" name="activityLevel" className="input-field" required>
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderatelyActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
        </select>

        <label htmlFor="goal" className="input-label">Goal:</label>
        <select id="goal" name="goal" className="input-field" required>
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>

        <button type="button" onClick={calculateCalories} className="calculate-button">
          Calculate
        </button>
      </form>

      <div id="result" className="calorie-result">{result}</div>
    </div>
  );
};

export default CalorieCalculator;
