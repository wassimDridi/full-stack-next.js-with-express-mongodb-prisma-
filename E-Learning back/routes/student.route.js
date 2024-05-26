const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajout d'un étudiant
router.post('/', async (req, res) => {
  const { name, age, email, schoolId, password } = req.body;
  try {
    const student = await prisma.student.create({
      data: {
        name: name,
        age: age,
        email: email,
        schoolId: schoolId,
        password: password
      }
    });
    res.json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher la liste des étudiants
router.get('/', async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher un étudiant
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Modifier un étudiant
router.put('/:id', async (req, res) => {
  const { name, age, email, schoolId, password } = req.body;
  const id = req.params.id;
  try {
    const updatedStudent = await prisma.student.update({
      where: {
        id: Number(id)
      },
      data: {
        name: name,
        age: age,
        email: email,
        schoolId: schoolId,
        password: password
      }
    });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Supprimer un étudiant
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.student.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
