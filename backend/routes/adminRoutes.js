const express = require("express");
const admin = express.Router();

const {
  admindetails,
  register,
  login,
  getAllStudents,
  downloadResume
} = require("../controller/admincontroller");


// register & login
admin.post("/register", register);
admin.post("/login", login);

// admin details
admin.get("/", admindetails);

// get all students
admin.get("/students", getAllStudents);

// download resume
admin.get("/students/resume/:id", downloadResume);


module.exports = admin;