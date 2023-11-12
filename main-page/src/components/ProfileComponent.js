import React, { useEffect, useState } from 'react';

const ProfileComponent = () => {
  const [exerciseDataArray, setExerciseDataArray] = useState([]);

  useEffect(() => {
    const storedData = loadExerciseData();
    if (storedData) {
      setExerciseDataArray(storedData);
    }
  }, []); // Empty dependency array to run only on mount

  const saveExerciseData = () => {
    const weightInput = document.getElementById('weight');
    const stepsInput = document.getElementById('steps');
    const waterInput = document.getElementById('water');

    const weight = weightInput.value;
    const steps = stepsInput.value;
    const water = waterInput.value;

    if (weight && steps && water) {
      const exerciseData = {
        weight: parseFloat(weight),
        steps: parseInt(steps),
        water: parseInt(water),
      };

      setExerciseDataArray((prevData) => [...prevData, exerciseData]);

      // Save data to localStorage
      saveToLocalStorage([...exerciseDataArray, exerciseData]);

      // Clear input fields
      weightInput.value = '';
      stepsInput.value = '';
      waterInput.value = '';
    } else {
      alert("Please fill in all fields.");
    }
  };

  useEffect(() => {
    displayStatistics();
  }, [exerciseDataArray]);

  const displayStatistics = () => {
    const averageWeight = calculateAverage('weight');
    const averageSteps = calculateAverage('steps');
    const averageWater = calculateAverage('water');

    document.getElementById('averageWeight').innerText = `Average Weight: ${averageWeight.toFixed(2)} kg`;
    document.getElementById('averageSteps').innerText = `Average Steps: ${averageSteps.toFixed(0)}`;
    document.getElementById('averageWater').innerText = `Average Glasses of Water: ${averageWater.toFixed(0)}`;
  };

  const calculateAverage = (property) => {
    const total = exerciseDataArray.reduce((sum, data) => sum + data[property], 0);
    return exerciseDataArray.length > 0 ? total / exerciseDataArray.length : 0;
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem('exerciseData', JSON.stringify(data));
  };

  const loadExerciseData = () => {
    const storedData = localStorage.getItem('exerciseData');
    return storedData ? JSON.parse(storedData) : [];
  };

  return (
    <div>
      <h1>My personal page</h1>

      <form id="exerciseForm">
        <label htmlFor="weight">Weight (kg):</label>
        <input type="number" id="weight" name="weight" required />

        <label htmlFor="steps">Steps:</label>
        <input type="number" id="steps" name="steps" required />

        <label htmlFor="water">Glasses of Water:</label>
        <input type="number" id="water" name="water" required />

        <button type="button" onClick={saveExerciseData}>
          Submit
        </button>
      </form>

      <div id="statistics">
        <h2>Statistics</h2>
        <p id="averageWeight">Average Weight: N/A</p>
        <p id="averageSteps">Average Steps: N/A</p>
        <p id="averageWater">Average Glasses of Water: N/A</p>
      </div>
    </div>
  );
};

export default ProfileComponent;
