import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const WorkoutPlanner = () => {
  const [exercises, setExercises] = useState([]);
  const [type, setType] = useState('');
  const [muscle, setMuscle] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const getExercises = async () => {
    const apiKey = 'Ygnfr5fgdWJvnXyvDGgw0A==TpykOtkdts2go1A9';  // Replace API KEY

    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}&type=${type}`,
        { headers: { 'X-Api-Key': apiKey } }
      );

      // Handle the API response as needed
      const result = response.data;
      setExercises(result.slice(0, 5));
    } catch (error) {
      console.error('Error: ', error.response ? error.response.data : error.message);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <h1>Workout planner</h1>

      <form id="exerciseForm">
        <label htmlFor="type">Type:</label>
        <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          {/* ... (other options) */}
        </select>

        <label htmlFor="muscle">Muscle:</label>
        <select id="muscle" name="muscle" value={muscle} onChange={(e) => setMuscle(e.target.value)}>
          <option value="">Select Muscle</option>
          {/* ... (other options) */}
        </select>

        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="">Select Difficulty</option>
          {/* ... (other options) */}
        </select>

        <button type="button" onClick={getExercises}>Get Exercises</button>
      </form>

      <div id="resultSection">
        <h2>Today's workout:</h2>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index}>
              <h2><strong>Exercise:</strong> {exercise.name}</h2>
              <ul>
                <li><strong>Type:</strong> {exercise.type}</li>
                <li><strong>Difficulty:</strong> {exercise.difficulty}</li>
                <li><strong>Equipment:</strong> {exercise.equipment}</li>
                <li><strong>Muscle:</strong> {exercise.muscle}</li>
                <li><strong>Instructions:</strong> {exercise.instructions}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutPlanner;
