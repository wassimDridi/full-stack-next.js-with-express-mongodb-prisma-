"use client"
import React, { useState, useEffect } from 'react';
import MonImage from '../monImage/MonImage';

const CourseDetails = ({ course }) => {
  const [userID, setUserID] = useState(localStorage.getItem('userID'));

  const handleEnroll = () => {
    // Implement enrollment functionality here
    if (course) {
      console.log(`Enrolling user ${userID} in course ${course.id}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <MonImage url={course.imgCourse} width={300} height={200} />
          <img src={course.imgCourse} width={300} height={300} alt={course.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <p>Prix: {course.prix}</p>
          {/* Render any other course details here */}
          {userID && (
            <button className="btn btn-primary" onClick={handleEnroll}>Enroll</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

