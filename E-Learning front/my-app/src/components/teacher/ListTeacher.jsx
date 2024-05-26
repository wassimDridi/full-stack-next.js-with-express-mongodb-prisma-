"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/teacher/');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleEdit = (id) => {
    const teacherToEdit = teachers.find((teacher) => teacher.id === id);
    setEditingTeacher(teacherToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/teacher/${id}`);
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.error(`Error deleting teacher with ID ${id}:`, error);
    }
  };

  const handleSubmitEdit = async (updatedTeacher) => {
    try {
      await axios.put(`http://localhost:3001/api/teacher/${updatedTeacher.id}`, updatedTeacher);
      setTeachers(teachers.map((teacher) => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)));
      setEditingTeacher(null);
    } catch (error) {
      console.error(`Error updating teacher with ID ${updatedTeacher.id}:`, error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>List of Teachers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.name}</td>
              <td>{teacher.age}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(teacher.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTeacher && <EditTeacherForm teacher={editingTeacher} onSubmit={handleSubmitEdit} />}
    </div>
  );
};

const EditTeacherForm = ({ teacher, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: teacher.id,
    name: teacher.name,
    age: teacher.age,
    schoolId: teacher.schoolId,
    courseId: teacher.courseId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' || name === 'schoolId' || name === 'courseId' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age:</label>
          <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="schoolId" className="form-label">School ID:</label>
          <input type="text" id="schoolId" name="schoolId" value={formData.schoolId} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="courseId" className="form-label">Course ID:</label>
          <input type="text" id="courseId" name="courseId" value={formData.courseId} onChange={handleChange} className="form-control" />
        </div>
     
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ListTeacher;
