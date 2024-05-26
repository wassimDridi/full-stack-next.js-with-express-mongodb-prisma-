"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListSchool = () => {
  const [schools, setSchools] = useState([]);
  const [editingSchool, setEditingSchool] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/school/');
      setSchools(response.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleEdit = (id) => {
    const schoolToEdit = schools.find((school) => school.id === id);
    setEditingSchool(schoolToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/school/${id}`);
      setSchools(schools.filter((school) => school.id !== id));
    } catch (error) {
      console.error(`Error deleting school with ID ${id}:`, error);
    }
  };

  const handleSubmitEdit = async (updatedSchool) => {
    try {
      await axios.put(`http://localhost:3001/api/school/${updatedSchool.id}`, updatedSchool);
      setSchools(schools.map((school) => (school.id === updatedSchool.id ? updatedSchool : school)));
      setEditingSchool(null);
    } catch (error) {
      console.error(`Error updating school with ID ${updatedSchool.id}:`, error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>List of Schools</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Principal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id}>
              <td><img src={school.imgSchool} alt={school.name} style={{ width: '50px', height: '50px' }} /></td>
              <td>{school.name}</td>
              <td>{school.address}</td>
              <td>{school.phoneNumber}</td>
              <td>{school.principal}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(school.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(school.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSchool && <EditSchoolForm school={editingSchool} onSubmit={handleSubmitEdit} />}
    </div>
  );
};

const EditSchoolForm = ({ school, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: school.id,
    name: school.name,
    address: school.address,
    phoneNumber: school.phoneNumber,
    principal: school.principal,
    imgSchool: school.imgSchool,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>Edit School</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
          <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="principal" className="form-label">Principal:</label>
          <input type="text" id="principal" name="principal" value={formData.principal} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="imgSchool" className="form-label">Image:</label>
          <input type="text" id="imgSchool" name="imgSchool" value={formData.imgSchool} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ListSchool;
