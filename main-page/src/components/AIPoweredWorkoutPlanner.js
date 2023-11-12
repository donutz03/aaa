import React, { useState } from 'react';
import axios from 'axios';

const AIPoweredWorkoutPlanner = () => {
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [muscle, setMuscle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [goals, setGoals] = useState('');
  const [apiResult, setApiResult] = useState('');

  const getPersonalizedWorkout = async () => {
    const params = {
      gender,
      type,
      muscle,
      difficulty,
      goals,
    };

    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = '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';

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Generate a personalized workout plan for ${params.type} focusing on ${params.muscle} with ${params.difficulty} difficulty.`,
            },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const workoutPlan = response.data.choices[0].message.content;
      setApiResult(workoutPlan);

    } catch (error) {
      console.error('Error: ', error.response ? error.response.data : error.message);
    }
  };

  const generateGoogleCalendarEventURL = () => {
    const event = {
      title: 'Workout Time',
      location: 'Somewhere',
      details: apiResult,
    };

    let calendarEventURL = 'https://www.google.com/calendar/render?action=TEMPLATE';
    calendarEventURL += `&text=${encodeURIComponent(event.title)}`;
    calendarEventURL += `&location=${encodeURIComponent(event.location)}`;
    calendarEventURL += `&details=${encodeURIComponent(event.details)}`;

    return calendarEventURL;
  };

  return (
    <div>
      <h1>Workout planner</h1>

      <form id="exerciseForm">
      <label for="gender">Gender:</label>
        <select id="gender" name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>

        <label for="type">Type:</label>
        <select id="type" name="type">
            <option value="">Select Type</option>
            <option value="cardio">Cardio</option>
            <option value="olympic_weightlifting">Olympic Weightlifting</option>
            <option value="plyometrics">Plyometrics</option>
            <option value="powerlifting">Powerlifting</option>
            <option value="strength">Strength</option>
            <option value="stretching">Stretching</option>
            <option value="strongman">Strongman</option>  
        </select>

        <label for="muscle">Muscle:</label>
        <select id="muscle" name="muscle">
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

        <label for="difficulty">Difficulty:</label>
        <select id="difficulty" name="difficulty">
            <option value="">Select Difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
        </select>

        <label for="goals">Goals:</label>
        <select id="goals" name="goals">
            <option value="strength">Strength Increase</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="weight_loss">Weight Loss</option>
        </select>

        <button type="button" onClick={getPersonalizedWorkout}>
          Get AI Powered Workout
        </button>
      </form>

      <div id="resultSection">
        <h2>Today's workout:</h2>
        <pre id="apiResult">{apiResult}</pre>
      </div>

      <button
        id="addToCalendarBtn"
        style={{ display: apiResult ? 'block' : 'none' }}
        onClick={() => window.open(generateGoogleCalendarEventURL())}
      >
        Add to Google Calendar
      </button>
    </div>
  );
};

export default AIPoweredWorkoutPlanner;
