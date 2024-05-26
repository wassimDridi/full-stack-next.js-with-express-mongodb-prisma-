const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajout d'une classe
router.post('/', async (req, res) => {
  const { name, teacherId, courseId } = req.body;
  try {
    const newClass = await prisma.class.create({
      data: {
        name: name,
        teacherId: teacherId,
        courseId: courseId
      }
    });
    res.json(newClass);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher la liste des classes
router.get('/', async (req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.json(classes);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher une classe
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const singleClass = await prisma.class.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(singleClass);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Modifier une classe
router.put('/:id', async (req, res) => {
  const { name, teacherId, courseId } = req.body;
  const id = req.params.id;
  try {
    const updatedClass = await prisma.class.update({
      where: {
        id: Number(id)
      },
      data: {
        name: name,
        teacherId: teacherId,
        courseId: courseId
      }
    });
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Supprimer une classe
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.class.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: "Class deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
