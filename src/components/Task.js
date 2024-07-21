import React from 'react';

const Task = ({task}) =>{
  return (
    <div key={task.id} className="box-shadow taskbox">
      
      <div>Task: {task.task}</div>
      <div>Date: {task.date}</div>
      <div>Done: {task.done}</div>
    </div>
  );
}
export default Task;
