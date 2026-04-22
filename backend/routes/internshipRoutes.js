const express = require("express");
const router = express.Router();
const multer = require("multer");

const Internship = require("../models/Internship");
const Application = require("../models/Application");

// ================= MULTER =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/company");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ================= CREATE INTERNSHIP =================

router.post("/add", upload.single("companyPdf"), async (req, res) => {
  try {

    const {
      title,
      description,
      duration,
      applicationDeadline,
      maxApplicants,
      companyName,
      companyAddress,
      department,

    } = req.body;

    const requiredSkills = req.body.requiredSkills
      ? req.body.requiredSkills.split(",").map(s => s.trim())
      : [];

    const internship = await Internship.create({
      title,
      description,
      requiredSkills,
      duration,
      applicationDeadline,
      maxApplicants,
      companyName,
      companyAddress,
      department,
      companyPdf: req.file ? req.file.filename : ""
    });

    res.json(internship);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating internship" });
  }
});

// ================= GET ALL =================

router.get("/", async (req, res) => {
  try {

    const internships = await Internship.find().sort({ createdAt: -1 });

    const updated = await Promise.all(
      internships.map(async (i) => {

        const count = await Application.countDocuments({
          internshipId: i._id
        });

        return {
          ...i._doc,
          appliedCount: count
        };

      })
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json([]);
  }
});

// ================= DELETE =================

router.delete("/:id", async (req, res) => {
  try {

    await Internship.findByIdAndDelete(req.params.id);

    await Application.deleteMany({
      internshipId: req.params.id
    });

    res.json({ message: "Deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;