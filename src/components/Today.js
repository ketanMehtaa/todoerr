import { useEffect, useState } from 'react';
import allTasks from '../../public/allTasks.json';
import Task from './Task';
import Shimmer from './Shimmer';
import { getAuth } from 'firebase/auth';

const Today = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    const auth = await getAuth();
    const user = auth.currentUser;

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
      console.error('No user is signed in');
    }
    setLoading(false);
  };

  useEffect(() => {
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
      {! loading > 0 ? (
        todos.map((task) => <Task task={task} onToggle={() => handleToggle(task.id)} />)
      ) : (
        <p>No tasks found.</p>
      )}
    </>
  );
};

export default Today;
