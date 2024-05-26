"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonImage from '../monImage/MonImage';

function ListCourse() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/course/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
   <>
   <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="section-title bg-white text-center text-primary px-3">Courses</h6>
                <h1 className="mb-5">Popular Courses</h1>
    </div>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {courses.map((course) => (
        <div className="col" key={course.id}>
          <div className="card">
            <img src={course.imgCourse} width={300} height={300} className="card-img-top" alt={course.name} />
            <div className="card-body">
              <h5 className="card-title">{course.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{course.prix}</h6>
              <p className="card-text">{course.description}</p>
              <a href={`/reservation/${course.id}`} className="btn btn-primary">Go To LEARNING</a>
            </div>
          </div>
        </div>
      ))}
    </div>
   </>
  );
}

export default ListCourse;
