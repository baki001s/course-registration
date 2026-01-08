const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const Student = require("./models/student"); // correct path

const app = express();

app.use(cors());
app.use(express.json());

// Use environment variable or replace with your actual MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/studentdb";

mongoose.connect(MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Student Registration API' });
});

app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
