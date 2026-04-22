const Admin = require("../models/admin");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER ADMIN
const register = async (req, res) => {

 try {

  const { name, email, password } = req.body;

  const existingUser =
  await Admin.findOne({ email });

  if (existingUser) {

   return res.status(400).json({
    message: "Email already exists"
   });

  }

  const salt =
  await bcrypt.genSalt(10);

  const hashedPassword =
  await bcrypt.hash(password, salt);

  const user =
  await Admin.create({

   name,
   email,
   password: hashedPassword

  });

  res.status(201).json({

   message: "Admin Registered Successfully",
   user

  });

 }

 catch (error) {

  res.status(500).json({
   error: error.message
  });

 }

};



// LOGIN ADMIN
const login = async (req, res) => {

 try {

  const { email, password } = req.body;

  const admin =
  await Admin.findOne({ email });

  if (!admin) {

   return res.status(400).json({
    message: "Invalid Email"
   });

  }

  const isMatch =
  await bcrypt.compare(
   password,
   admin.password
  );

  if (!isMatch) {

   return res.status(400).json({
    message: "Invalid Password"
   });

  }

  const role =
  admin.role || "admin";

  const token =
  jwt.sign(

   {
    id: admin._id,
    role
   },

   process.env.JWT_SECRET,

   {
    expiresIn: "1d"
   }

  );


  res.status(200).json({

   message: "Login Successful",

   admin,

   role,

   token

  });

 }

 catch (error) {

  res.status(500).json({
   error: error.message
  });

 }

};




// ADMIN DETAILS
const admindetails = async (req, res) => {

 try {

  const admins =
  await Admin.find({
   role: "admin"
  });

  res.status(200).json(admins);

 }

 catch (error) {

  res.status(500).json({
   error: error.message
  });

 }

};




// GET ALL STUDENTS
const getAllStudents = async (req, res) => {

 try {

  const students =
  await User.find({
   role: "student"
  })
  .select("-password");


  res.status(200).json(students);

 }

 catch (error) {

  res.status(500).json({
   message: error.message
  });

 }

};




// DOWNLOAD RESUME
const downloadResume = async (req, res) => {

 try {

  const student =
  await User.findById(req.params.id);

  if (!student || !student.resume) {

   return res.status(404).json({
    message: "Resume not found"
   });

  }

  res.download(student.resume);

 }

 catch (error) {

  res.status(500).json({
   message: error.message
  });

 }

};




// EXPORT ALL FUNCTIONS
module.exports = {

 register,
 login,
 admindetails,
 getAllStudents,
 downloadResume

};