"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSchool() {
    const [schoolData, setSchoolData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        principal: '',
        imgSchool : ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSchoolData({
          ...schoolData,
          [name]: value
        });
      };
      
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file.name)
        setSchoolData({
          ...schoolData,
          imgSchool: file.name
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log(schoolData)
          const response = await axios.post('http://localhost:3001/api/school/', schoolData);
          console.log(response.data); // Handle success response here
          // Optionally, you can reset the form after successful submission
          toast.success("school added successful");

          setSchoolData({
            name: '',
            address: '',
            phoneNumber: '',
            principal: '' ,
            imgSchool : ""
          });
        } catch (error) {
          console.error('Error adding school:', error);
          toast.error("add school  failed");

          // Handle error here
        }
      };
    
      return (
        <div>
          <h2>Add School</h2>
          <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded p-4">
          <h2 className="text-center">Add School</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" className="form-control" id="name" name="name" value={schoolData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input type="text" className="form-control" id="address" name="address" value={schoolData.address} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
              <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" value={schoolData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="principal" className="form-label">Principal:</label>
              <input type="text" className="form-control" id="principal" name="principal" value={schoolData.principal} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="imgSchool" className="form-label">Image:</label>
              <input type="file" className="form-control" id="imgSchool" name="imgSchool" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />

        </div>
      );
}
