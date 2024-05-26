"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonImage from '@/components/monImage/MonImage';
import ListSchoolHome from '@/components/school/ListSchoolHome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Reservation({ params }) {
  const courseId = parseInt(params.id, 10); // Convert id to a number
  const [course, setCourse] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');

    if (token) {
      setIsLoggedIn(true);
      // Fetch course data if user is logged in
      fetchCourse();
    }
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/course/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const handleGetStarted = async () => {
    const studentCourseData = {
      studentId: parseInt(localStorage.getItem('userID'), 10), // Assuming userID is stored in localStorage
      courseId: courseId,
    };
    

    try {
      console.log(studentCourseData)
      await axios.post('http://localhost:3001/api/studentCourse/', studentCourseData);
      toast.success("RESERVATION  successful");
      // Handle success, maybe show a success message or redirect to another page
    } catch (error) {
      console.error('Error posting student course:', error);
      toast.error("RESERVATION  failed");
    }
  };

  return (
    <div>
      {isLoggedIn && course ? (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <img src={course.imgCourse} width={300} height={300} alt={course.name} className="img-fluid" />

            </div>
            <div className="col-md-6">
              <h2>{course.name}</h2>
              <p>{course.description}</p>
              <p>Prix: {course.prix}</p>
              {/* Render any other course details here */}
              {isLoggedIn && (
                <button className="btn btn-primary" onClick={handleGetStarted}>GET STARTED</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Please log in to view this page.</p>
          <a href="/Inscription/login">Login</a>
        </div>
      )}
  <ToastContainer />
    </div>
  );
}
