const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

  title: { type: String, required: true },

  description: { type: String, required: true },

  requiredSkills: { type: [String], required: true },

  companyName: { type: String, default: "" },

  companyAddress: { type: String, default: "" },

  duration: { type: String, required: true },

  companyWebsite: {
  type: String,
  default: ""
},

internshipType: {
  type: String,
  enum: ["Fresher", "Senior"],
  default: ""
},

  applicationDeadline: { type: Date, required: true },

  maxApplicants: { type: Number },

  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  },

  createdBy: { type: String, default: "admin" },

  department: {
    type: [String],
    required: true
  },

  // ✅ NEW FIELD
  companyPdf: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);