const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { register, login, getUserById, updateProfile } =
require("../controller/usercontroller");

const User = require("../models/User");

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const uploadProfile = multer({ storage });

/* ================= ROUTES ================= */

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);

// ✅ update profile
router.put("/update-user", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        bio: req.body.bio,
        github: req.body.github,
        linkedin: req.body.linkedin,
        skills: req.body.skills,
        department: req.body.department,
        enrollment: req.body.enrollment
      },
      { new: true }
    );

    res.json(updatedUser);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Profile update failed" });
  }
});

/* ================= IMAGE UPLOAD ================= */

router.post(
  "/upload-profile",
  uploadProfile.single("profileImage"), // ✅ FIXED
  async (req, res) => {
    try {

      const userId = req.body.userId;

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      if (!userId) {
        return res.status(400).json({ message: "User ID missing" });
      }

      const imagePath = `uploads/profile/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(
        userId,
        { profileImage: imagePath },
        { new: true }
      );

      res.json(user);

    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      res.status(500).json({
        message: "Upload failed",
        error: err.message
      });
    }
  }
);

module.exports = router;