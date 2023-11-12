import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { useNavigate } from 'react-router-dom';

const WeightTracker = () => {
  const [weightData, setWeightData] = useState([]);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [showStrength, setShowStrength] = useState(false);
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const showStrengthLevel = () => {
    setShowStrength(true);
    navigate('/strength-level'); // Navigate to the "/weight-tracker" route
  }

  const trackWeight = () => {
    if (!weight || isNaN(weight)) {
      alert('Please enter a valid weight.');
      return;
    }

    const newEntry = { date: new Date(date), weight: parseFloat(weight) };
    setWeightData([...weightData, newEntry]);

    // Clear the form fields
    setWeight('');
    setDate('');
  };

  const updateChart = () => {
    const ctx = chartRef.current.getContext('2d');

    // If the chart already exists, destroy it before creating a new one
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    // Create the chart
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: weightData.map((entry) => entry.date.toLocaleDateString()),
        datasets: [
          {
            label: 'Weight Entries',
            data: weightData.map((entry) => entry.weight),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
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
              text: 'Weight (kg)',
            },
            min: 30,
          },
        },
      },
    });

    // Save the chart instance to the ref
    chartRef.current.chartInstance = chart;
  };

  useEffect(() => {
    updateChart();
  }, [weightData]);

  const generateCanvasId = () => {
    // Generating a random id for the canvas
    return `weightChart_${Math.floor(Math.random() * 1000)}`;
  };

  return (
    <div>
      <h1>Weight Tracker</h1>
      <form id="weightForm">
        <label htmlFor="weight">Enter your weight:</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <label htmlFor="date">Enter the date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="button" onClick={trackWeight}>
          Track Weight
        </button>
        <Link to="/strength-level">
        <button onClick={showStrengthLevel}>Go to Strength Tracker</button>
      </Link>
      </form>
      <h2>Weight History</h2>
      <ul>
        {weightData.map((entry, index) => (
          <li key={index}>
            Date: {entry.date.toLocaleDateString()}, Weight: {entry.weight} kg
          </li>
        ))}
      </ul>
      <canvas id={generateCanvasId()} width="300" height="50" ref={chartRef}></canvas>
      
    </div>
  );
};

export default WeightTracker;
