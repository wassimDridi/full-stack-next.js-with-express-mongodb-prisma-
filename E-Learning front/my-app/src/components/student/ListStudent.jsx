"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListStudent() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/student/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      // Handle error here
    }
  };

  return (
    <div>
      <h2>List of Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            <strong>Name:</strong> {student.name}, <strong>Age:</strong> {student.age}, <strong>Grade:</strong> {student.grade}, <strong>School:</strong> {student.schoolId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListStudent;
