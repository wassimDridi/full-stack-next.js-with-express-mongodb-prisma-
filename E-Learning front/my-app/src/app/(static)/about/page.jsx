import React from 'react';

const About = () => {
  return (
    <div className="container mt-4">
      <h2>About Us</h2>
      
      {/* Description */}
      <div className="mb-4">
        <h3>Our Mission</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis ante ac urna ultricies semper. 
          Nulla facilisi. Phasellus ut gravida est. Vestibulum ante ipsum primis in faucibus orci luctus et 
          ultrices posuere cubilia curae; Sed id viverra est.
        </p>
        <p>
          Vestibulum tristique eros non metus bibendum suscipit. Integer feugiat, dui ut consequat pharetra, 
          felis magna posuere magna, a accumsan nisi elit et sapien.
        </p>
      </div>

      {/* Positive Impact */}
      <div className="mb-4">
        <h3>Our Positive Impact</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis ante ac urna ultricies semper. 
          Nulla facilisi. Phasellus ut gravida est. Vestibulum ante ipsum primis in faucibus orci luctus et 
          ultrices posuere cubilia curae; Sed id viverra est.
        </p>
        <p>
          Vestibulum tristique eros non metus bibendum suscipit. Integer feugiat, dui ut consequat pharetra, 
          felis magna posuere magna, a accumsan nisi elit et sapien.
        </p>
      </div>

      {/* Slideshow */}
      <div className="mb-4">
        <h3>Image Slideshow</h3>
        <img src="java.jpg" width={300} height={300} alt="" className="img-fluid" />
        <img src="java.jpg" width={300} height={300} alt="" className="img-fluid" />
        <img src="java.jpg" width={300} height={300} alt="" className="img-fluid" />
        <img src="java.jpg" width={300} height={300} alt="" className="img-fluid" />

        {/* Insert slideshow component here */}
      </div>

      {/* Services */}
      <div className="mb-4">
        <h3>Our Services</h3>
        <ul>
          <li>Service 1</li>
          <li>Service 2</li>
          <li>Service 3</li>
          {/* Add more services as needed */}
        </ul>
      </div>

      {/* Course Offerings */}
      <div>
        <h3>Our Course Offerings</h3>
        <p>Here you can find information about our course offerings, including:</p>
        <ul>
          <li>Course 1</li>
          <li>Course 2</li>
          <li>Course 3</li>
          {/* Add more courses as needed */}
        </ul>
        <p>Explore our website to learn more about the courses we offer.</p>
      </div>
    </div>
  );
};

export default About;
