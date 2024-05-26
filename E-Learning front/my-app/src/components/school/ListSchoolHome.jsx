"use client"


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListSchoolHome = () => {
  const [schools, setSchools] = useState([]);

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

  return (
    <div className="container mt-4">
      <h2>List of Schools</h2>
      <div className="row">
        {schools.map((school) => (
          <div key={school.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={school.imgSchool} width={300} height={200} className="card-img-top" alt={school.name} />
              <div className="card-body">
                <h5 className="card-title">{school.name}</h5>
                <p className="card-text">Principal: {school.principal}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Address: {school.address}</li>
                <li className="list-group-item">Phone Number: {school.phoneNumber}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSchoolHome;
