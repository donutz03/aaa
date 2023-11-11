// src/components/CalorieCalculator.js
import React, { useState } from 'react';

const CalorieCalculator = () => {
  const [result, setResult] = useState('');

  const calculateCalories = () => {
    // Get user inputs
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = document.getElementById('activityLevel').value;
    const goal = document.getElementById('goal').value;

    // Perform calorie calculation (a simple formula for illustration purposes)
    const basalMetabolicRate =
      gender === 'male'
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
      totalCalories -= 500; // Caloric deficit for weight loss
    } else if (goal === 'gain') {
      totalCalories += 500; // Caloric surplus for weight gain
    }

    // Display the result
    setResult(`Calories per day: ${totalCalories.toFixed(2)} kcal`);
  };

  return (
    <div>
      <form id="calorieForm">
        <h1>Calorie Calculator</h1>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" required />

        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="weight">Weight (kg):</label>
        <input type="number" id="weight" name="weight" required />

        <label htmlFor="height">Height (cm):</label>
        <input type="number" id="height" name="height" required />

        <label htmlFor="activityLevel">Activity Level:</label>
        <select id="activityLevel" name="activityLevel" required>
          <option value="sedentary">Sedentary</option>
          <option value="lightlyActive">Lightly Active</option>
          <option value="moderatelyActive">Moderately Active</option>
          <option value="veryActive">Very Active</option>
        </select>

        <label htmlFor="goal">Goal:</label>
        <select id="goal" name="goal" required>
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>

        <button type="button" onClick={calculateCalories}>
          Calculate
        </button>
      </form>

      <div id="result">{result}</div>
    </div>
  );
};

export default CalorieCalculator;
