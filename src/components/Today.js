import { useEffect, useState } from 'react';
import allTasks from '../../public/allTasks.json';
import Task from './Task';
import Shimmer from './Shimmer';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';

import { auth, db } from '../firebaseConfig'; // Ensure correct import
import { useNavigate } from 'react-router-dom';



const Today = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      const user =  auth.currentUser;
      console.log('auth',auth);

      if (user) {
        try {
          const userTodosRef = collection(db, 'users', user.uid, 'todos');
          const querySnapshot = await getDocs(userTodosRef);
          const todosList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTodos(todosList);
        } catch (e) {
          console.error('Error fetching todos:', e);
        }
      } else {
        navigate('/login');
        console.error('No user is signed in');
      }
      setLoading(false);
    };
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <>
        <Shimmer />
      </>
    );
  }
  return (
    <>
      {!loading > 0 ? (
        todos.map((task) => <Task task={task} onToggle={() => handleToggle(task.id)} />)
      ) : (
        <p>No tasks found.</p>
      )}
    </>
  );
};

export default Today;
