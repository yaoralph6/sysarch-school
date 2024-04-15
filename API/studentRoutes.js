// studentRoutes.js

const express = require("express");
const router = express.Router();
const studentAPI = require("../API/studentAPI");

// Route for listing all students
router.get("/", (req, res) => {
  // Serve the HTML template for listing students
  res.sendFile(__dirname + "/../views/list_students.html");
});

// Route for creating a new student
router.get("/create", (req, res) => {
    res.sendFile(__dirname + "/../views/create_student.html");
  });
  
// Route for updating a student
router.put("/:id", studentAPI.updateStudent);

// Route for deleting a student
router.delete("/:id", studentAPI.deleteStudent);

module.exports = router;
