"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStudent() {
  const [studentData, setStudentData] = useState({
    name: '',
    age: '',
    email: '',
    schoolId: '',
    password: ''
  });

  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchSchools();
  }, []);

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
    const newValue = name === 'age' || name === 'schoolId' ? parseInt(value, 10) : value;
    setStudentData({
      ...studentData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/student/', studentData);
      console.log(response.data); // Handle success response here
      toast.success("Student added successfully!"); // Display success toast
      // Optionally, you can reset the form after successful submission
      setStudentData({
        name: '',
        age: '',
        email: '',
        schoolId: '',
        password: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error("Failed to add student."); // Display error toast
      // Handle error here
    }
  };

  return (
    <div className="container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={studentData.name} onChange={handleChange} className="form-control" />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={studentData.age} onChange={handleChange} className="form-control" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={studentData.email} onChange={handleChange} className="form-control" />
        </label>
        <br />
        <label>
          School:
          <select name="schoolId" value={studentData.schoolId} onChange={handleChange} className="form-select">
            <option value="">Select School</option>
            {schools.map(school => (
              <option key={school._id} value={school.id}>{school.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={studentData.password} onChange={handleChange} className="form-control" />
        </label>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <ToastContainer /> {/* Toast container for displaying notifications */}
    </div>
  );
}

export default AddStudent;
