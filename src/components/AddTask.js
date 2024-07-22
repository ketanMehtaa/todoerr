// firebaseUtils.js
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';

const AddTask = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const addTodo = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (user) {
      try {
        const userTodosRef = collection(db, 'users', user.uid, 'todos');
        const docRef = await addDoc(userTodosRef, { task, date });
        console.log('Todo added with ID:', docRef.id);

        // Clear the form after submission
        setTask('');
        setDate('');
      } catch (e) {
        console.error('Error adding todo:', e);
      }
    } else {
      console.error('No user is signed in');
    }
  };

  return (
    <form onSubmit={addTodo}>
      <label>
        Task: <input name="task" type="text" value={task} onChange={handleTaskChange} />
      </label>
      <label>
        Date: <input name="date" type="date" value={date} onChange={handleDateChange} />
      </label>
      <button type="submit">Submit form</button>
    </form>
  );
};

export default AddTask;
