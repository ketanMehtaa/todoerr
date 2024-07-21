// Shimmer.js
import React from 'react';
import '../../Shimmer.css'; // Import the CSS for styling

const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {[...Array(20)].map((_, index) => (
        <div key={index} className="shimmer-task">
          <div className="shimmer-checkbox" />
          <div className="shimmer-text shimmer-task-name" />
          <div className="shimmer-text shimmer-task-date" />
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
