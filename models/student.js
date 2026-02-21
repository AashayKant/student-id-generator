// models/Student.js

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String,
  department: String,
  year: String,
  email: String,
  photo: String,
});

module.exports = mongoose.model("Student", studentSchema);