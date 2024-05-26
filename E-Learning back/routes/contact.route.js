const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new contact
router.post('/', async (req, res) => {
  const { email, description } = req.body;
  try {
    console.log("sjdcblhsdch")
    const contact = await prisma.contact.create({
      data: {
        email: email,
        description: description
      }
    });
    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Get a single contact by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Update a contact by ID
router.put('/:id', async (req, res) => {
  const { email, description } = req.body;
  const { id } = req.params;
  try {
    const updatedContact = await prisma.contact.update({
      where: {
        id: Number(id)
      },
      data: {
        email: email,
        description: description
      }
    });
    res.json(updatedContact);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contact.delete({
      where: {
        id: Number(id)
      }
    });
    res.json({
      message: "Contact deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

module.exports = router;
