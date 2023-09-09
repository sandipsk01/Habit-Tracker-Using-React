import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faBan,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import HabitForm from '../HabitForm/HabitForm';
import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteHabit, updateHabitStatus } from '../../Redux/Reducer/HabitSlice';
import Navbar from '../Navbar/Navbar';


export default function Dashboard() {
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();

  const handleDelete = (habitId) => {
    dispatch(deleteHabit(habitId));
  };

  const currentDate = new Date();
  const today = formatDate(currentDate);

  // Function to format a date as 'YYYY-MM-DD'
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleUpdateStatus = (habitId, newStatus) => {
    const currentDate = new Date();
    const today = formatDate(currentDate);

    // Dispatch the updateHabitStatus action with habit ID, date, and new status
    dispatch(updateHabitStatus({ id: habitId, date: today, status: newStatus }));
  };

  console.log(habits);
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.habitForm}>
        <HabitForm />
      </div>

      <div className={styles.habitlist}>
        <table>
          <thead>
            <tr>
              <th>Habit Name</th>
              <th>Today's Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td>{habit.name}</td>
                <td>
                  <button
                    className={styles.statusButton}
                    onClick={() => handleUpdateStatus(habit.id, 'done')}
                    style={{
                      backgroundColor:
                        habit.status[today] === 'done' ? '#28a745' : 'transparent',
                      color: habit.status[today] === 'done' ? 'white' : 'inherit',
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className={styles.statusButton}
                    onClick={() => handleUpdateStatus(habit.id, 'notDone')}
                    style={{
                      backgroundColor:
                        habit.status[today] === 'notDone' ? '#dc3545' : 'transparent',
                      color: habit.status[today] === 'notDone' ? 'white' : 'inherit',
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                  <button
                    className={styles.statusButton}
                    onClick={() => handleUpdateStatus(habit.id, 'noAction')}
                    style={{
                      backgroundColor:
                        habit.status[today] === 'noAction' ? '#ffc107' : 'transparent',
                      color: habit.status[today] === 'noAction' ? 'black' : 'inherit',
                    }}
                  >
                    <FontAwesomeIcon icon={faBan} />
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(habit.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
