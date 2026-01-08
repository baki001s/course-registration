const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const Student = require("./models/Student"); // Fixed case-sensitive path

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Use environment variable or replace with your actual MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/studentdb";

mongoose.connect(MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Student Registration API' });
});

app.post('/api/students', async (req, res) => {
  try {
    const { name, email, course, semester } = req.body;
    
    // Input validation
    if (!name || !email || !course || !semester) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const student = new Student({ name, email, course, semester });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
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
