import { useEffect, useState } from 'react';
import allTasks from '../../public/allTasks.json';
import Task from './Task';

const Today = () => {
  const [tasks, setTasks] = useState([]);

  const handleToggle = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: task.done === 'true' ? 'false' : 'true' } : task)));
  };

  useEffect(() => {
    // Convert the object to an array for easier mapping
    const tasksArray = Object.entries(allTasks).map(([key, value]) => ({ id: key, ...value }));
    setTasks(tasksArray);
  }, []);

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => <Task task={task} onToggle={() => handleToggle(task.id)} />)
      ) : (
        <p>No tasks found.</p>
      )}
    </>
  );
};

export default Today;
