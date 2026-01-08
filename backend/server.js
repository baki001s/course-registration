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

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
