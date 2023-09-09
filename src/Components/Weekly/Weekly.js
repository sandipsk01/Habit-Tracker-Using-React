import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faBan } from '@fortawesome/free-solid-svg-icons';
import { updateHabitStatus } from '../../Redux/Reducer/HabitSlice';

function Weekly() {
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();

  // Function to format a date as 'YYYY-MM-DD'
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const getPreviousDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const previousDate = new Date(today);
      previousDate.setDate(today.getDate() - i);
      dates.push(previousDate);
    }
    return dates;
  };

  const previousDates = getPreviousDates();
  const statusByDate = {};

  // Initialize statusByDate with empty status for each date
  previousDates.forEach((date) => {
    statusByDate[formatDate(date)] = {};
  });

  // Fill statusByDate with habit statuses for each date
  habits.forEach((habit) => {
    const habitStatus = habit.status;
    previousDates.forEach((date) => {
      const formattedDate = formatDate(date);
      statusByDate[formattedDate][habit.id] = habitStatus[formattedDate] || 'noAction';
    });
  });

  

  const handleUpdateStatus = (habitId, date, newStatus) => {
    // Dispatch the updateHabitStatus action with the habit ID, date, and new status
    dispatch(updateHabitStatus({ id: habitId, date, status: newStatus }));
  };

  return (
    <div>
      <Navbar />
      <div>
        <table>
          <thead>
            <tr>
              <th>Habit Name</th>
              {previousDates.map((date) => (
                <th key={formatDate(date)}>{formatDate(date)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.name}</td>
                {previousDates.map((date) => (
                  <td key={formatDate(date)}>
                    <button
                      onClick={() =>
                        handleUpdateStatus(habit.id, formatDate(date), 'done')
                      }
                      style={{
                        backgroundColor:
                          statusByDate[formatDate(date)][habit.id] === 'done'
                            ? '#28a745'
                            : 'transparent',
                        color:
                          statusByDate[formatDate(date)][habit.id] === 'done'
                            ? 'white'
                            : 'inherit',
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(habit.id, formatDate(date), 'notDone')
                      }
                      style={{
                        backgroundColor:
                          statusByDate[formatDate(date)][habit.id] === 'notDone'
                            ? '#dc3545'
                            : 'transparent',
                        color:
                          statusByDate[formatDate(date)][habit.id] === 'notDone'
                            ? 'white'
                            : 'inherit',
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(habit.id, formatDate(date), 'noAction')
                      }
                      style={{
                        backgroundColor:
                          statusByDate[formatDate(date)][habit.id] === 'noAction'
                            ? '#ffc107'
                            : 'transparent',
                        color:
                          statusByDate[formatDate(date)][habit.id] === 'noAction'
                            ? 'black'
                            : 'inherit',
                      }}
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  </td>
                ))}
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Weekly;
