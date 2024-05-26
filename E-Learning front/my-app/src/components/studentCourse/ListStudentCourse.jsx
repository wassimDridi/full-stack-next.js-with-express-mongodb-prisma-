"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListStudentCourse = () => {
  const [studentCourses, setStudentCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentCoursesResponse = await axios.get('http://localhost:3001/api/studentCourse/');
      setStudentCourses(studentCoursesResponse.data);

      const studentsResponse = await axios.get('http://localhost:3001/api/student/');
      setStudents(studentsResponse.data);

      const coursesResponse = await axios.get('http://localhost:3001/api/course/');
      setCourses(coursesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>List of Student Courses</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Student</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {studentCourses.map((studentCourse, index) => (
            <tr key={index}>
              <td>{students.find(student => student.id === studentCourse.studentId)?.name}</td>
              <td>{courses.find(course => course.id === studentCourse.courseId)?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>List of Students in Each Course</h2>
      {courses.map(course => (
        <div key={course.id} className="my-4">
          <h3>{course.name}</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {studentCourses
                .filter(studentCourse => studentCourse.courseId === course.id)
                .map(studentCourse => {
                  const student = students.find(student => student.id === studentCourse.studentId);
                  return (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.email}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ListStudentCourse;
