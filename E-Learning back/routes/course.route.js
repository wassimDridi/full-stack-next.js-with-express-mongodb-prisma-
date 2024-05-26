const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajout d'un cours
router.post('/', async (req, res) => {
  const { name, description, prix, imgCourse } = req.body;
  try {
    const course = await prisma.course.create({
      data: {
        name: name,
        description: description,
        prix: prix,
        imgCourse: imgCourse
      }
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher la liste des cours
router.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher un cours
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Modifier un cours
router.put('/:id', async (req, res) => {
  const { name, description, prix, imgCourse } = req.body;
  const id = req.params.id;
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: Number(id)
      },
      data: {
        name: name,
        description: description,
        prix: prix,
        imgCourse: imgCourse
      }
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Supprimer un cours
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.course.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: "Course deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
