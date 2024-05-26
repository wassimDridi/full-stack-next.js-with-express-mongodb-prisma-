const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Ajout d'une école
router.post('/', async (req, res) => {
  const { name, address, phoneNumber, principal, imgSchool } = req.body;
  try {
    const school = await prisma.school.create({
      data: {
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        principal: principal,
        imgSchool: imgSchool
      }
    });
    res.json(school);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher la liste des écoles
router.get('/', async (req, res) => {
  try {
    const schools = await prisma.school.findMany();
    res.json(schools);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Afficher une école
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const school = await prisma.school.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(school);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Modifier une école
router.put('/:id', async (req, res) => {
  const { name, address, phoneNumber, principal, imgSchool } = req.body;
  const id = req.params.id;
  try {
    const updatedSchool = await prisma.school.update({
      where: {
        id: Number(id)
      },
      data: {
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        principal: principal,
        imgSchool: imgSchool
      }
    });
    res.json(updatedSchool);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Supprimer une école
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.school.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: "School deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
