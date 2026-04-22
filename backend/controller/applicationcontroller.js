const Application = require("../models/Application");
const Internship = require("../models/Internship");

exports.applyInternship = async (req, res) => {

  try {

    const { internshipId, studentId } = req.body;

    // find internship
    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    // ⛔ DEADLINE CHECK
    if (new Date() > new Date(internship.applicationDeadline)) {
      return res.status(400).json({
        message: "Application deadline finished"
      });
    }

    // create application
    const application = await Application.create({
      internshipId,
      studentId
    });

    res.status(201).json({
      message: "Application submitted",
      application
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};