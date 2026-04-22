const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const nodemailer = require("nodemailer");
const mammoth = require("mammoth");

const detectSkills = require("../utils/detectSkills");

const Internship =
require("../models/Internship");

const fs = require("fs");
const pdfLib = require("pdf-parse");

// Wrapper to handle different export shapes of pdf-parse
const parsePDF = async (buffer) => {
  if (typeof pdfLib === "function") return pdfLib(buffer);
  if (pdfLib && typeof pdfLib.default === "function") return pdfLib.default(buffer);
  throw new Error("pdf-parse is not available as a callable function");
};

const calculateMatch =
require("../utils/matchSkills");

// APPLY INTERNSHIP

router.post("/apply", async (req, res) => {

try {

const { studentId, internshipId } = req.body;


// check already applied
const alreadyApplied = await Application.findOne({

studentId,
internshipId

});

if (alreadyApplied) {

return res.send("You already applied for this internship");

}


// get internship details
const internship = await Internship.findById(internshipId);


// get student profile
const User = require("../models/User");

const student = await User.findById(studentId);


// calculate match %
const matchScore = calculateMatch(

student?.skills || [],

internship?.requiredSkills || []

);


// create application
const newApplication = new Application({

studentId,

internshipId,

matchScore,

detectedSkills: student?.skills || []

});


await newApplication.save();


res.send("Applied successfully");


}

catch (err) {

console.log(err);

res.status(500).send("error");

}

});

router.get("/student-stats/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const total = await Application.countDocuments({ studentId });
    const approved = await Application.countDocuments({ studentId, status: "Approved" });
    const rejected = await Application.countDocuments({ studentId, status: "Rejected" });
    const pending = await Application.countDocuments({
      studentId,
      $or: [{ status: "Pending" }, { status: { $exists: false } }]
    });

    res.json({ total, approved, rejected, pending });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL APPLICATIONS

router.get("/", async (req,res)=>{

 try{

 const applications =
 await Application.find()

 .populate("studentId")

 .populate("internshipId");


 const updatedApps =
 await Promise.all(

 applications.map(async app => {

let matchScore = 0;

try{

 if(app.studentId?.resume){

  const filePath =
`${__dirname}/../uploads/${app.studentId.resume}`;

let resumeText = "";

if (fs.existsSync(filePath)) {
      if (filePath.endsWith(".pdf")) {

        const buffer = fs.readFileSync(filePath);

        const data = await parsePDF(buffer);

        resumeText = data.text || (typeof data === "string" ? data : "");

        const detectedSkills = detectSkills(resumeText);
        console.log("Detected skills:", detectedSkills);
        console.log("RESUME TEXT:", resumeText.substring(0, 200));

      } else if (filePath.endsWith(".docx")) {

        const data = await mammoth.extractRawText({ path: filePath });

        resumeText = data.value || "";

      }

    }

matchScore =
calculateMatch(

app.internshipId.skills || [],

 resumeText || ""

) || 0;

 }

 }


catch(err){

 console.log("Match error:", err);

 matchScore = 0;

}

return {

 ...app._doc,
 matchScore: matchScore

};  

 })

 );

 res.json(updatedApps);

 }
 catch(err){

 console.log(err);

 res.json([]);

 }

});


// UPDATE STATUS

router.put("/:id", async (req,res)=>{

try{

const { status } = req.body;

const application =
await Application.findByIdAndUpdate(

req.params.id,

{ status },

{ new:true }

).populate("studentId")
 .populate("internshipId");


// send email when approved
if(status === "Approved"){

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{
 user:"palanghan8@gmail.com",
 pass:"lvpp yiow tahk pjyp" 
}

});

await transporter.sendMail({

to: application.studentId.email,

subject:"Internship Approved",

text:
`Congratulations!
You are selected for
${application.internshipId.title}`

});

}

res.json(application);

}

catch(err){

console.log(err);
res.status(500).send("error");

}

});


// router.put("/status/:id", async (req,res)=>{

//  const application =
//  await Application.findById(req.params.id)
//  .populate("studentId");

//  application.status = req.body.status;

//  await application.save();

//  // email send inside async function
//  await transporter.sendMail({

//   to: application.studentId.email,

//   subject:"Internship status",

//   text:`Your application is ${req.body.status}`

//  });

//  res.json(application);

// });

// get applications by student
router.get("/student/:studentId", async (req,res)=>{

 try{

 const applications =
 await Application.find({

  studentId: req.params.studentId

 })
 .populate("internshipId");

 res.json(applications);

 }

 catch(err){

 res.status(500).send("error");

 }

});

// update status and send email


router.put("/status/:id", async (req,res)=>{

 try{

 const application =
 await Application.findById(req.params.id)

 .populate("studentId")

 .populate("internshipId");


 application.status = req.body.status;

 await application.save();


 // send email only if approved

 if(req.body.status === "Approved"){

  console.log("Sending email to:",
  application.studentId.email);

 const transporter =
 nodemailer.createTransport({

 service:"gmail",

 auth:{

 user:"palanghan8@gmail.com",

 pass:"lvpp yiow tahk pjyp"

 }

 });


 await transporter.sendMail({

 to: application.studentId.email,

 subject:"Internship Approved",

 text:

 `Congratulations!

 You are selected for:

 ${application.internshipId.title}

 Login to portal for details.`

 });

 }


 res.json(application);

 }

 catch(err){

 res.status(500).send(err);

 }

});

// delete application
router.delete("/:id", async (req,res)=>{

await Application.findByIdAndDelete(req.params.id);

res.send("deleted");

});

const transporter = nodemailer.createTransport({

 service:"gmail",

 auth:{

 user:"palanghan8@gmail.com",

 pass:"lvpp yiow tahk pjyp"

 }

});

module.exports = router;