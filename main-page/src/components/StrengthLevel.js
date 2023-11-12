import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const StrengthLevel = () => {
  const [exerciseData, setExerciseData] = useState({});
  const [exerciseColors, setExerciseColors] = useState({});
  const chartRef = useRef(null);

  const trackStrength = () => {
    const exerciseName = document.getElementById('exercise').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const date = new Date(document.getElementById('date').value);
  
    if (!exerciseName.trim()) {
      alert('Please enter a valid exercise name.');
      return;
    }
  
    if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
      alert('Please enter valid weight and reps.');
      return;
    }
  
    // Check if the exerciseData[exerciseName] array exists, and initialize it if not
    const exerciseArray = exerciseData[exerciseName] || [];
    
    setExerciseData({
      ...exerciseData,
      [exerciseName]: [
        ...exerciseArray,
        { date: date, weight: weight, reps: reps },
      ],
    });
  
    const listItem = document.createElement('li');
    listItem.textContent = `Exercise: ${exerciseName}, Date: ${date.toDateString()}, Weight: ${weight} kg, Reps: ${reps}`;
  
    document.getElementById('strengthHistory').appendChild(listItem);
  
    updateChart();
  
    document.getElementById('exercise').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('reps').value = '';
    document.getElementById('date').value = '';
  };

  const updateChart = () => {
    const ctx = document.getElementById('strengthChart').getContext('2d');
    const allDates = new Set();
    const chartData = {};

    for (const exercise in exerciseData) {
      if (exerciseData.hasOwnProperty(exercise)) {
        const exerciseEntries = Array.isArray(exerciseData[exercise])
          ? exerciseData[exercise]
          : [];

        chartData[exercise] = {};

        exerciseEntries.forEach((entry) => {
          const dateKey = entry.date.toLocaleDateString();
          allDates.add(dateKey);
          chartData[exercise][dateKey] = entry.weight * entry.reps;

          if (!exerciseColors[exercise]) {
            setExerciseColors({
              ...exerciseColors,
              [exercise]: '#' + Math.floor(Math.random() * 16777215).toString(16),
            });
          }
        });
      }
    }

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedDates,
        datasets: Object.keys(chartData).map((exercise) => ({
          label: exercise,
          data: sortedDates.map((date) => chartData[exercise][date] || null),
          backgroundColor: exerciseColors[exercise],
          borderColor: exerciseColors[exercise],
          borderWidth: 1,
          fill: false,
          spanGaps: true,
        })),
      },
      options: {
        scales: {
          x: {
            type: 'category',
            offset: true,
            reverse: false,
          },
          y: {
            title: {
              display: true,
              text: 'Strength (weight x reps)',
            },
            min: 0,
          },
        },
      },
    });

    chartRef.current = newChart;
  };

  useEffect(() => {
    updateChart();
  }, [exerciseData, exerciseColors]);

  return (
    <div>
      <h1>Strength Tracker</h1>
      <form id="strengthForm">
        <label htmlFor="exercise">Enter your exercise:</label>
        <input type="text" id="exercise" required />
        <label htmlFor="weight">Enter the weight of the bar/bodyweight (kg):</label>
        <input type="number" id="weight" required />
        <label htmlFor="reps">Enter the number of reps:</label>
        <input type="number" id="reps" required />
        <label htmlFor="date">Enter the date:</label>
        <input type="date" id="date" required />
        <button type="button" onClick={trackStrength}>
          Track Strength
        </button>
      </form>

      <h2>Strength History</h2>
      <ul id="strengthHistory"></ul>

      <canvas id="strengthChart" width="300" height="50"></canvas>
    </div>
  );
};

export default StrengthLevel;
