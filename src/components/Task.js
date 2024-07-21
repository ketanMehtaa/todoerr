import React from 'react';

const Task = ({ task, onToggle }) => {
  return (
    <div key={task.id} className="box-shadow taskbox">
      <div>
        <input type="checkbox" checked={task?.done && task.done === 'true'} onChange={onToggle} />
      </div>
      <div>
        <div>Task: {task.task}</div>
        <div>Date: {task.date}</div>
        <div>Done: {task.done}</div>
      </div>
    </div>
  );
};
export default Task;
