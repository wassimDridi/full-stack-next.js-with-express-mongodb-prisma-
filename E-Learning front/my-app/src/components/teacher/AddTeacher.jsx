"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTeacher() {
  const [teacherData, setTeacherData] = useState({
    name: '',
    age: '',
    schoolId: '',
    courseId: ''
  });

  const [courses, setCourses] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchSchools();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/course/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Handle error here
    }
  };

  const fetchSchools = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/school/');
      setSchools(response.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
      // Handle error here
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'age' || name === 'courseId' || name === 'schoolId' ? parseInt(value, 10) : value; 
    setTeacherData({
      ...teacherData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(teacherData);
      const response = await axios.post('http://localhost:3001/api/teacher/', teacherData);
      console.log(response.data); // Handle success response here
      // Optionally, you can reset the form after successful submission
      setTeacherData({
        name: '',
        age: '',
        schoolId: '',
        courseId: ''
      });
    } catch (error) {
      console.error('Error adding teacher:', error);
      // Handle error here
    }
  };

  return (
    <div className="container">
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" value={teacherData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" className="form-control" name="age" value={teacherData.age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>School:</label>
          <select className="form-control" name="schoolId" value={teacherData.schoolId} onChange={handleChange}>
            <option value="">Select School</option>
            {schools.map(school => (
              <option key={school._id} value={school.id}>{school.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <select className="form-control" name="courseId" value={teacherData.courseId} onChange={handleChange}>
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course._id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddTeacher;
