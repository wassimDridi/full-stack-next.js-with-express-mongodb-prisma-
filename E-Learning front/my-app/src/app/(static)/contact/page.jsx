"use client"
import React, { useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    description: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text, setCopiedState) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setCopiedState(true);

    setTimeout(() => {
      setCopiedState(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:3001/api/contact/', formData);
      console.log('Form submitted successfully:', response.data);
      toast.success("send contact  successful");

      setFormData({
        email: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("message failed");

    }
  };

  return (
    <Container className="mt-4">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or inquiries, feel free to contact us using the form below. We'll get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <br /><br /><br />
      <hr className="my-4" />

      <h2 className="text-center mb-4" style={{ color: 'rgb(55, 131, 234)', backgroundColor: '#f8f9fa', padding: '10px' }}>
        Contact Information
      </h2>
      <Row>
        <Col md={6}>
          <Image src="logo.jpg" fluid />
        </Col>
        <Col md={6} className="text-muted" style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>Contact Information</h4>
          <p>
            <strong>Email:</strong> elearning@example.com{' '}
            <Button variant="primary" size="sm" onClick={() => handleCopy('elearning@example.com', setCopiedEmail)}>
              {copiedEmail ? 'Copied!' : 'Copy'}
            </Button>
            <br />
            <strong>Phone:</strong> +123 456 7890{' '}
            <Button
              style={{ backgroundColor: 'rgb(55, 131, 234)', borderColor: 'rgb(55, 131, 234)' }}
              size="sm"
              onClick={() => handleCopy('+123 456 7890', setCopiedPhone)}
            >
              {copiedPhone ? 'Copied!' : 'Copy'}
            </Button>
            <br />
            <strong>Location:</strong> Your Address Here
          </p>
        </Col>
      </Row>

      <hr className="my-4" />

      <h2 className="text-center mb-4" style={{ color: 'rgb(55, 131, 234)', backgroundColor: '#f8f9fa', padding: '10px' }}>
        Our Services
      </h2>
      <Row>
        <Col style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>Service 1</h4>
          <p>Description of Service 1.</p>
        </Col>
        <Col sm={12} lg={4} style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>Service 2</h4>
          <p>Description of Service 2.</p>
        </Col>
        <Col sm={12} lg={4} style={{ backgroundColor: '#f8f9fa', padding: '15px' }}>
          <h4>Service 3</h4>
          <p>Description of Service 3.</p>
        </Col>
      </Row>

      <div style={{ width: '100%' }}>
        <iframe
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=your%20address%20here&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Your Location"
        >
        </iframe>
      </div>
      <ToastContainer />

    </Container>
  );
};

export default Contact;
