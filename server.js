const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

const Student = require("./models/Student");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Multer Setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// ✅ CREATE Student
app.post("/addStudent", upload.single("photo"), async (req, res) => {
  try {
    const newStudent = new Student({
      studentId: "STU" + Date.now(),
      name: req.body.name,
      department: req.body.department,
      year: req.body.year,
      email: req.body.email,
      photo: req.file.filename,
    });

    await newStudent.save();

    res.json({
      message: "Student Added Successfully",
      studentId: newStudent.studentId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ READ ALL Students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});


// ✅ READ Student By ID
app.get("/student/:id", async (req, res) => {
  const student = await Student.findOne({ studentId: req.params.id });

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});


// ✅ UPDATE Student
app.put("/update/:id", async (req, res) => {
  const updatedStudent = await Student.findOneAndUpdate(
    { studentId: req.params.id },
    req.body,
    { new: true }
  );

  res.json(updatedStudent);
});


// ✅ DELETE Student
app.delete("/delete/:id", async (req, res) => {
  await Student.findOneAndDelete({ studentId: req.params.id });
  res.json({ message: "Student Deleted Successfully" });
});


// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));