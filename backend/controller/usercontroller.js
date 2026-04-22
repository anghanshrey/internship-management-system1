const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, Skills, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      role,
      Skills,
      department,   
      resume: req.file ? req.file.filename : ""

      });

    res.status(201).json({
      message: "Student Registered Successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//login controller
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    // only create token if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET missing in .env"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login Successful",
      user,
      token
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }
};

exports.getUserById = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};
``

exports.updateProfile = async (req,res)=>{

 try{

  const user =
  await User.findByIdAndUpdate(

   req.body._id,

   {

    name:req.body.name,
    bio:req.body.bio,
    github:req.body.github,
    linkedin:req.body.linkedin,

    skills:req.body.skills,
    
    enrollment: req.body.enrollment,

    department:req.body.department   

   },

   {new:true}

  );

  res.json(user);

 }

 catch(err){

  res.status(500).json({

   message:"Profile update failed",

   error:err.message

  });

 }

};

exports.uploadImage = async(req,res)=>{

try{

const user = await User.findById(req.body.userId);

user.profileImage = req.file.filename;

await user.save();

res.json(user);

}
catch(err){

console.log(err);

res.status(500).json({message:"error upload"});

}

};