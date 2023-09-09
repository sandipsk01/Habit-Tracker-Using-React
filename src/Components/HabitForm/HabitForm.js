import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../../Redux/Reducer/HabitSlice';
import styles from './HabitForm.css';

function HabitForm() {
  const dispatch = useDispatch();

  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the habit name is empty or contains only whitespace
    if (!habitName.trim()) {
      // Show the error message inline
      alert('Habit name cannot be empty');
      return; // Exit early if validation fails
    }

    // Get the current date
    const currentDate = new Date();

    // Function to format a date as 'YYYY-MM-DD'
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    // Create a new object with the date statuses
    const newDateStatus = {};

    // Loop through the previous 6 days and set their status to 'noAction'
    for (let i = 0; i < 7; i++) {
      const dateKey = formatDate(currentDate);
      newDateStatus[dateKey] = 'noAction';

      // Move to the previous day
      currentDate.setDate(currentDate.getDate() - 1);
    }

    
    // Dispatch the addHabit action with the habit data and the updated dateStatus
    dispatch(
      addHabit({
        name: habitName,
        status: newDateStatus
      })
    );

    // Clear the form inputs
    setHabitName('');
  };
  
  
  return (
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit}>
        <span>
          <input
            type="text"
            placeholder="Habit Name ...."
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </span>
        <span> </span>
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
}

export default HabitForm;
