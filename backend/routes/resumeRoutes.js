const express = require("express");
const router = express.Router();
const upload = require("../middleware/resume");
const User = require("../models/User");

// POST /api/resume/upload
// Accepts multipart/form-data with fields: resume (file), userId, enrollment
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const { userId, enrollment } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save only the filename so it can be served from /uploads/:filename
    user.resume = req.file.filename;
    if (enrollment) user.enrollment = enrollment;

    await user.save();

    return res.json({ message: "Resume uploaded successfully", filename: req.file.filename });

  } catch (err) {
    console.error("Resume upload error:", err);
    return res.status(500).json({ message: "Upload error", error: err.message });
  }
});

module.exports = router;