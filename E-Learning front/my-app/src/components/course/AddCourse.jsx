"use client"


import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    prix: '',
    imgCourse: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'prix' ? parseInt(value, 10) : value;
    setCourseData({
      ...courseData,
      [name]: newValue
    });
  };
  
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCourseData({
      ...courseData,
      imgCourse: file.name
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
        console.log(courseData)
      const response = await axios.post('http://localhost:3001/api/course/', courseData);
      console.log(response.data); // Handle success response here

      // Reset form after successful submission
      setCourseData({
        name: '',
        description: '',
        prix: '',
        imgCourse: ""
      });
    } catch (error) {
      console.error('Error adding course:', error);
      // Handle error here
    }
  };

  return (
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={courseData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={courseData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Prix:
          <input type="number" name="prix" value={courseData.prix} onChange={handleChange} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="imgCourse" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCourse;

