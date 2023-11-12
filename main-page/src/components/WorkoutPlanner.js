import React, { useState } from 'react';
import axios from 'axios';
import './WorkoutPlanner.css';

const WorkoutPlanner = () => {
  const [type, setType] = useState('');
  const [muscle, setMuscle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [apiResult, setApiResult] = useState([]);

  const getExercises = async () => {
    const params = {
      type: type,
      muscle: muscle,
      difficulty: difficulty,
    };

    const apiKey = 'Ygnfr5fgdWJvnXyvDGgw0A==TpykOtkdts2go1A9'; // Replace API KEY

    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/exercises', {
        params: params,
        headers: { 'X-Api-Key': apiKey },
      });

      console.log(response.data);

      // Handle the API response as needed
      setApiResult(response.data.slice(0, 5));
    } catch (error) {
      console.error('Error: ', error.response ? error.response.data : error.message);
      // Handle the error as needed
    }
  };

  function generateGoogleCalendarEventURL() {
    // Retrieve workout details from #apiResult
    var workoutDetails = apiResult.map((exercise, index) => (
      `<strong>Exercise ${index + 1}:</strong> ${exercise.name}<br>`
    )).join('');

    var event = {
      title: 'Workout Time',
      location: 'Somewhere',
      details: workoutDetails,
    };

    var calendarEventURL = 'https://www.google.com/calendar/render?action=TEMPLATE';
    calendarEventURL += '&text=' + encodeURIComponent(event.title);
    calendarEventURL += '&location=' + encodeURIComponent(event.location);
    calendarEventURL += '&details=' + encodeURIComponent(event.details);

    return calendarEventURL;
  }

  return (
    <div className='div-workout-planner'>
      <h1 className="h1-workout-planner">Workout Planner</h1>

      <form id="exerciseForm">
        <label htmlFor="type">Type:</label>
        <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="cardio">Cardio</option>
          <option value="olympic_weightlifting">Olympic Weightlifting</option>
          <option value="plyometrics">Plyometrics</option>
          <option value="powerlifting">Powerlifting</option>
          <option value="strength">Strength</option>
          <option value="stretching">Stretching</option>
          <option value="strongman">strong className="a"man</option>
        </select>

        <label htmlFor="muscle">Muscle:</label>
        <select id="muscle" name="muscle" value={muscle} onChange={(e) => setMuscle(e.target.value)}>
          <option value="">Select Muscle</option>
          <option value="abdominals">Abdominals</option>
          <option value="biceps">Biceps</option>
          <option value="calves">Calves</option>
          <option value="chest">Chest</option>
          <option value="forearms">Forearms</option>
          <option value="glutes">Glutes</option>
          <option value="hamstrings">Hamstrings</option>
          <option value="lats">Lats</option>
          <option value="lower_back">Lower Back</option>
          <option value="middle_back">Middle Back</option>
          <option value="neck">Neck</option>
          <option value="quadriceps">Quadriceps</option>
          <option value="traps">Traps</option>
          <option value="biceps">Biceps</option>
          <option value="abdominals">Abdominals</option>
          <option value="triceps">Triceps</option>
        </select>

        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>

        <button type="button" onClick={getExercises}>
          Get Exercises
        </button>
      </form>

      <div id="resultSection" className="result-section">
        {/* <h2>Today's workout:</h2> */}
        <ul id="exercise-list" className="exercise-list">
          {apiResult.map((exercise, index) => (
            <li className="exercise-item" key={index}>
              <h2>
                <strong className="a">Exercise:</strong> {exercise.name}
              </h2>
              <ul className="exercise-details">
                <li>
                  <strong className="a">Type:</strong> {exercise.type}
                </li>
                <li>
                  <strong className="a">Difficulty:</strong> {exercise.difficulty}
                </li>
                <li>
                  <strong className="a">Equipment:</strong> {exercise.equipment}
                </li>
                <li>
                  <strong className="a">Muscle:</strong> {exercise.muscle}
                </li>
                <li>
                  <strong className="a">Instructions:</strong> {exercise.instructions}
                </li>
              </ul>
            </li>
          ))}
        </ul>
        
      </div>
      <button id="addToCalendarBtn" style={{ display: apiResult.length > 0 ? 'block' : 'none' }} onClick={() => window.open(generateGoogleCalendarEventURL())}>
        Add to Google Calendar
      </button>
      
    </div>
  );
};

export default WorkoutPlanner;
