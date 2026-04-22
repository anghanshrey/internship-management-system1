import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminInternships() {

 const [internships, setInternships] = useState([]);
 const navigate = useNavigate();

 useEffect(()=>{
  fetchInternships();
 },[]);

 const fetchInternships = async()=>{
  try{
   const res = await axios.get(
   "http://localhost:5000/api/internships"
   );
   setInternships(res.data || []);
  }
  catch(err){
   console.log(err);
  }
 };

 const deleteInternship = async(id)=>{
  if(!window.confirm("Delete this internship?")) return;

  try{
   await axios.delete(
   `http://localhost:5000/api/internships/${id}`
   );
   fetchInternships();
  }
  catch(err){
   console.log(err);
  }
 };

 return(

 <div style={{
 minHeight:"100vh",
 background:"linear-gradient(120deg,#0f172a,#1e293b,#020617)",
 padding:"40px"
 }}>

 {/* HEADER */}

 <div style={{
 display:"flex",
 justifyContent:"space-between",
 alignItems:"center",
 marginBottom:"30px"
 }}>

 <h2 style={{
 color:"white",
 fontWeight:"700",
 letterSpacing:"1px"
 }}>
 Manage Internships
 </h2>

 <button
 className="btn btn-outline-light"
 onClick={()=>navigate("/admin")}
 >
 Home
 </button>

 </div>

 {/* GRID */}

 <div className="container">

 <div className="row g-4">

 {internships.map(internship => (

 <div className="col-md-4" key={internship._id}>

 <div
 style={{
 background:"rgba(255,255,255,0.95)",
 borderRadius:"18px",
 padding:"22px",
 boxShadow:"0 15px 40px rgba(0,0,0,0.3)",
 transition:"0.3s",
 cursor:"pointer"
 }}
 onMouseEnter={e=>{
  e.currentTarget.style.transform="translateY(-8px)";
 }}
 onMouseLeave={e=>{
  e.currentTarget.style.transform="translateY(0)";
 }}
 >

 {/* TITLE */}
 <h5 style={{
 fontWeight:"700",
 marginBottom:"8px",
 color:"#0f172a"
 }}>
 {internship.title}
 </h5>

 {/* COMPANY */}
 <p style={{
 color:"#475569",
 fontWeight:"500",
 marginBottom:"6px"
 }}>
 {internship.companyName || "No Company"}
 </p>

 {/* LOCATION */}
 <p style={{
 fontSize:"13px",
 color:"#64748b"
 }}>
 {internship.location || "Remote"}
 </p>

 {/* SKILLS */}
 {internship.requiredSkills?.length > 0 && (

 <div className="mt-2">

 {internship.requiredSkills.slice(0,3).map((skill,i)=>(

 <span
 key={i}
 style={{
 background:"#e0f2fe",
 color:"#0369a1",
 padding:"4px 8px",
 borderRadius:"8px",
 fontSize:"11px",
 marginRight:"5px"
 }}
 >
 {skill}
 </span>

 ))}

 </div>

 )}

 {/* ACTION */}
 <div className="mt-4">

 <button
 className="btn w-100"
 onClick={()=>deleteInternship(internship._id)}
 style={{
 background:"linear-gradient(90deg,#ef4444,#dc2626)",
 color:"white",
 borderRadius:"10px",
 fontWeight:"600",
 boxShadow:"0 8px 20px rgba(239,68,68,0.4)"
 }}
 >
 Delete Internship
 </button>

 <button
className="btn btn-primary mt-2"
onClick={()=>navigate(`/edit-internship/${internship._id}`)}
>
Edit
</button>

 </div>

 </div>

 </div>

 ))}

 </div>

 </div>

 </div>

 );

}

export default AdminInternships;