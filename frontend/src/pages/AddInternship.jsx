import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddInternship(){

const navigate = useNavigate();

const [internship,setInternship] = useState({

title:"",
description:"",
requiredSkills:"",
duration:"",
applicationDeadline:"",
maxApplicants:"",
companyName:"",
companyAddress:"",
companyWebsite:"",
internshipType:""
});

const [department,setDepartment] = useState([]);

const [companyPdf, setCompanyPdf] = useState(null);

/* ================= DEPARTMENT ================= */

const handleDepartmentChange = (e)=>{

const value = e.target.value;

if(e.target.checked){

setDepartment(prev => [...prev,value]);

}

else{

setDepartment(prev => prev.filter(dep => dep !== value));

}

};

/* ================= SUBMIT ================= */

const handleSubmit = async () => {

 try {

  const formData = new FormData();

  formData.append("title", internship.title);
  formData.append("description", internship.description);

  formData.append(
   "requiredSkills",
   internship.requiredSkills
    .split(",")
    .map(skill => skill.trim())
    .filter(skill => skill !== "")
    .join(",")
  );

  formData.append("duration", internship.duration);
  formData.append("applicationDeadline", internship.applicationDeadline);
  formData.append("maxApplicants", internship.maxApplicants);
  formData.append("companyName", internship.companyName);
  formData.append("companyAddress", internship.companyAddress);
  formData.append("companyWebsite", internship.companyWebsite);
  formData.append("internshipType", internship.internshipType);

  formData.append("department", department);

  // ✅ PDF
  if (companyPdf) {
   formData.append("companyPdf", companyPdf);
  }

  const res = await fetch(
   "http://localhost:5000/api/internships",
   {
    method: "POST",
    body: formData
   }
  );

  if (res.ok) {
   alert("Internship added successfully");
   navigate("/admin");
  } else {
   alert("Error adding internship");
  }

 } catch (err) {
  console.log(err);
  alert("Server error");
 }

};
/* ================= UI ================= */

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(120deg,#0f172a,#1e293b,#020617)",
paddingBottom:"50px"
}}>

{/* NAVBAR */}

<nav style={{
display:"flex",
justifyContent:"space-between",
padding:"15px 25px",
background:"rgba(0,0,0,0.6)",
backdropFilter:"blur(10px)"
}}>

<h5 style={{color:"white"}}>Admin Panel</h5>

<button
className="btn btn-outline-light"
onClick={()=>navigate("/admin")}
>
Home
</button>

</nav>


<div className="container mt-5">

<div style={{
maxWidth:"700px",
margin:"auto",
borderRadius:"20px",
background:"rgba(255,255,255,0.95)",
padding:"30px",
boxShadow:"0 25px 70px rgba(0,0,0,0.4)"
}}>

<h3 className="text-center fw-bold mb-4">
Add Internship
</h3>


{/* GRID FORM */}

<div className="row">

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Company Name"
onChange={(e)=>setInternship({...internship,companyName:e.target.value})}
/>
</div>

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Company Address"
onChange={(e)=>setInternship({...internship,companyAddress:e.target.value})}
/>
</div>

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Internship Title"
onChange={(e)=>setInternship({...internship,title:e.target.value})}
/>
</div>

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Duration (e.g. 3 months)"
onChange={(e)=>setInternship({...internship,duration:e.target.value})}
/>
</div>

</div>


{/* DESCRIPTION */}

<textarea
className="form-control mb-3"
placeholder="Description"
rows="3"
onChange={(e)=>setInternship({...internship,description:e.target.value})}
/>


{/* SKILLS */}

<input
className="form-control mb-3"
placeholder="Skills (comma separated)"
onChange={(e)=>setInternship({...internship,requiredSkills:e.target.value})}
/>


{/* DEADLINE + MAX */}

<div className="row">

<div className="col-md-6">
<label className="fw-semibold">Application Deadline</label>
<input
type="datetime-local"
className="form-control mb-3"
onChange={(e)=>setInternship({...internship,applicationDeadline:e.target.value})}
/>
</div>


{/* COMPANY PDF */}

<label className="fw-semibold mt-3">Company PDF</label>

<input
type="file"
className="form-control mb-3"
onChange={(e)=>setCompanyPdf(e.target.files[0])}
/>

<div className="col-md-6">
<label className="fw-semibold">Max Students</label>
<input
type="number"
className="form-control mb-3"
onChange={(e)=>setInternship({...internship,maxApplicants:e.target.value})}
/>
</div>

</div>

<div className="col-md-6">
<input
className="form-control mb-3"
placeholder="Company Website (optional)"
onChange={(e)=>setInternship({...internship,companyWebsite:e.target.value})}
/>
</div>

<div className="col-md-6">
<select
className="form-control mb-3"
onChange={(e)=>setInternship({...internship,internshipType:e.target.value})}
>
<option value="">Select Internship Type</option>
<option value="Fresher">Fresher</option>
<option value="Senior">Senior</option>
</select>
</div>


{/* DEPARTMENT */}

<h5 className="mt-3 mb-2">Select Department</h5>

<div className="row">

{["BCA","B.Tech","Diploma","BBA","Pharmacy","Robotics"].map(dep=>(

<div className="col-md-4 mb-2" key={dep}>

<label style={{
display:"block",
padding:"10px",
borderRadius:"10px",
border:"1px solid #ddd",
cursor:"pointer",
background:
department.includes(dep)
? "#e0f2fe"
: "#f8fafc",
fontWeight:"500"
}}>

<input
type="checkbox"
value={dep}
className="form-check-input me-2"
onChange={handleDepartmentChange}
/>

{dep}

</label>

</div>

))}

</div>


{/* SELECTED */}

<p className="mt-2 text-muted">
Selected: {department.join(", ") || "None"}
</p>


{/* BUTTON */}

<button
className="btn w-100 mt-3"
style={{
background:"linear-gradient(90deg,#3b82f6,#2563eb)",
color:"white",
padding:"12px",
borderRadius:"12px",
fontWeight:"600",
boxShadow:"0 10px 30px rgba(59,130,246,0.4)"
}}
onClick={handleSubmit}
>

Add Internship

</button>

</div>

</div>

</div>

);

}

export default AddInternship;