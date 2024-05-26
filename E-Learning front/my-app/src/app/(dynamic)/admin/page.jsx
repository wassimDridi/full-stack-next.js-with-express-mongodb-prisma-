"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function admin() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/contact/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
      toast.success("delete  successful");

    } catch (error) {
      console.error(`Error deleting contact with ID ${id}:`, error);
      toast.error("delete  failed");

    }
  };
  return (
    <>
     <div style={{ textAlign: 'center' }}>
      <h2>Welcome to the Admin Interface</h2>
      <p>This is the administration panel for the eLearning website.</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div style={{ marginRight: '20px' }}>
          <img src="/lernn.jpg" alt="Image 1" style={{ width: '200px', height: '200px' }} />
          <p>Image 1</p>
        </div>
        <div>
          <img src="/lern.webp" alt="Image 2" style={{ width: '200px', height: '200px' }} />
          <p>Image 2</p>
        </div>
      </div>
    </div>

    <div className="container mt-4">
      <h2>Contact List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.email}</td>
              <td>{contact.description}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <ToastContainer />

    </>
    
  )
}
