const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajout d'un enseignant
router.post('/', async (req, res) => {
  const { name, age, schoolId, courseId } = req.body;
  try {
    const teacher = await prisma.teacher.create({
      data: {
        name: name,
        age: age,
        schoolId: schoolId,
        courseId: courseId
      }
    });
    res.json(teacher);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher la liste des enseignants
router.get('/', async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher un enseignant
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Modifier un enseignant
router.put('/:id', async (req, res) => {
  const { name, age, schoolId, courseId } = req.body;
  const id = req.params.id;
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: {
        id: Number(id)
      },
      data: {
        name: name,
        age: age,
        schoolId: schoolId,
        courseId: courseId
      }
    });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Supprimer un enseignant
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.teacher.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: "Teacher deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
