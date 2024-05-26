const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken'); 
const prisma = new PrismaClient();
const router = express.Router();

// Secret key for JWT signing (should be a long random string)
const JWT_SECRET = 'your_jwt_secret_key';

// Login
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user with provided email exists
    const user = await prisma.student.findUnique({
      where: {
        email: email ,
      }
    });
    const admin = await prisma.admin.findUnique({
      where: {
        email: email ,
      }
    });

    // If admin exists and password matches
    if (admin && admin.password === password) {
      // Create JWT token with admin ID payload
      const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '1h' }); // Expires in 1 hour
      res.status(200).json({
        user: admin ,
        message: "Login successful and is admin",
        token: token // Send token to client
      });
    }
    // If user exists and password matches
    else if (user && user.password === password) {
      // Create JWT token with user ID payload
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' }); // Expires in 1 hour
      res.status(200).json({
        user: user ,
        message: "Login successful",
        token: token // Send token to client
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
