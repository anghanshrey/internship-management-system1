const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");

const Application = require("../models/Application");


// ===============================
// ALL STUDENTS EXCEL
// ===============================
router.get("/", async (req,res)=>{

 try{

  const applications =
  await Application.find()
  .populate("studentId")
  .populate("internshipId");


  const data = applications.map(app=>({

 StudentName: app.studentId?.name || "N/A",

 Email: app.studentId?.email || "N/A",

 Enrollment: app.studentId?.enrollment || "N/A",

 Internship: app.internshipId?.title || "N/A",

 // ✅ ADD DEPARTMENT
 Department:
 Array.isArray(app.internshipId?.department)
   ? app.internshipId.department.join(", ")
   : app.internshipId?.department || "N/A"

}));


  const sheet =
  XLSX.utils.json_to_sheet(data);

  const book =
  XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
   book,
   sheet,
   "All Students"
  );


  const buffer =
  XLSX.write(book,{
   type:"buffer",
   bookType:"xlsx"
  });


  res.setHeader(
   "Content-Disposition",
   "attachment; filename=All_Students.xlsx"
  );

  res.send(buffer);

 }

 catch(err){

  console.log(err);

  res.status(500).send("Excel error");

 }

});



// ===============================
// COMPANY WISE EXCEL
// ===============================
router.get("/company/:id", async (req,res)=>{

 try{

  const applications =
  await Application.find({

   internshipId:req.params.id

  })

  .populate("studentId")
  .populate("internshipId");


  const data = applications.map(app=>({

 StudentName: app.studentId?.name || "N/A",

 Email: app.studentId?.email || "N/A",

 Enrollment: app.studentId?.enrollment || "N/A",

 Internship: app.internshipId?.title || "N/A",

 Department:
 Array.isArray(app.internshipId?.department)
   ? app.internshipId.department.join(", ")
   : app.internshipId?.department || "N/A"

}));


  const sheet =
  XLSX.utils.json_to_sheet(data);

  const book =
  XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
   book,
   sheet,
   "Company Students"
  );


  const buffer =
  XLSX.write(book,{
   type:"buffer",
   bookType:"xlsx"
  });


  res.setHeader(
   "Content-Disposition",
   `attachment; filename=company_${req.params.id}.xlsx`
  );

  res.send(buffer);

 }

 catch(err){

  console.log(err);

  res.status(500).send("Excel error");

 }

});


module.exports = router;