const express = require('express');
const router = express.Router();
const studentController = require('../controller/hostel');

// Register a new student
router.post('/students', studentController.createStudent);

// Get all students
router.get('/students', studentController.getAllStudents);

// Get a student by id
router.get('/students/:id', studentController.getStudentById);

// Update a student by id
router.patch('/students/:id', studentController.updateStudentById);

// Delete a student by id
router.delete('/students/:id', studentController.deleteStudentById);

module.exports = router;
