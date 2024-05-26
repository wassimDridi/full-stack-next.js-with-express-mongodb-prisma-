const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Add a student to a course
router.post('/', async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const studentCourse = await prisma.studentCourse.create({
      data: {
        studentId: studentId,
        courseId: courseId
      }
    });
    res.json(studentCourse);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Get all student-course relationships
router.get('/', async (req, res) => {
  try {
    const studentCourses = await prisma.studentCourse.findMany();
    res.json(studentCourses);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Get a student-course relationship by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const studentCourse = await prisma.studentCourse.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(studentCourse);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Update a student-course relationship
router.put('/:id', async (req, res) => {
  const { studentId, courseId } = req.body;
  const id = req.params.id;
  try {
    const updatedStudentCourse = await prisma.studentCourse.update({
      where: {
        id: Number(id)
      },
      data: {
        studentId: studentId,
        courseId: courseId
      }
    });
    res.json(updatedStudentCourse);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Delete a student-course relationship
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.studentCourse.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: "Student-Course relationship deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
