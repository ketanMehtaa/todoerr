import { useEffect, useState } from 'react';
import Task from './Task';
import Shimmer from './Shimmer';
import AddTask from '../components/AddTask';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Today = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, loadingAuth] = useAuthState(auth);

  useEffect(() => {
    const fetchTodos = async () => {
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
        navigate('/login'); // Redirect to login if no user is signed in
      }
      setLoading(false);
    };

    if (!loadingAuth) {
      fetchTodos();
    }
  }, [user, loadingAuth, navigate]);

  if (loading || loadingAuth) {
    return <Shimmer />;
  }

  return (
    <>
      <AddTask />
      {todos.length > 0 ? (
        todos.map((task) => <Task key={task.id} task={task} onToggle={() => handleToggle(task.id)} />)
      ) : (
        <p>No tasks found.</p>
      )}
    </>
  );
};

export default Today;
