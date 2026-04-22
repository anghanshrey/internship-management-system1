import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewApplications() {

 const [applications, setApplications] = useState([]);
 const [internships, setInternships] = useState([]);
 const [search, setSearch] = useState("");

 const navigate = useNavigate();

 useEffect(() => {
  loadApplications();
  loadInternships();
 }, []);

 const loadApplications = async () => {
  const res = await fetch("http://localhost:5000/api/applications");
  const data = await res.json();
  setApplications(data);
 };

 const loadInternships = async () => {
  const res = await fetch("http://localhost:5000/api/internships");
  const data = await res.json();
  setInternships(data);
 };

 const updateStatus = async (id, status) => {

  if(!window.confirm(`Change status to ${status}?`)) return;

  await fetch(
   `http://localhost:5000/api/applications/status/${id}`,
   {
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({status})
   }
  );

  loadApplications();
 };

 const deleteInternship = async (id) => {

  if(!window.confirm("Delete internship?")) return;

  await fetch(
   `http://localhost:5000/api/internships/${id}`,
   { method:"DELETE" }
  );

  setInternships(internships.filter(i => i._id !== id));
  loadApplications();
 };

 return (

 <div style={{
  minHeight:"100vh",
  background:"linear-gradient(120deg,#0f172a,#1e293b,#020617)",
  paddingBottom:"40px"
 }}>

 {/* NAVBAR */}

 <nav style={{
  display:"flex",
  justifyContent:"space-between",
  padding:"15px 25px",
  background:"rgba(0,0,0,0.6)",
  backdropFilter:"blur(10px)"
 }}>

 <h5 style={{color:"white"}}>⚙ Admin Panel</h5>

 <button
 className="btn btn-outline-light"
 onClick={()=>navigate("/admin")}
 >
 Home
 </button>

 </nav>

 {/* SEARCH */}

 <div style={{textAlign:"center", marginTop:"25px"}}>

 <input
 placeholder="🔍 Search by name..."
 value={search}
 onChange={(e)=>setSearch(e.target.value)}
 style={{
  padding:"12px",
  width:"260px",
  borderRadius:"10px",
  border:"none",
  outline:"none",
  boxShadow:"0 5px 20px rgba(0,0,0,0.3)"
 }}
 />

 </div>

 <div className="container mt-4">

 <h2 className="text-white text-center mb-5 fw-bold">
 Internship Applications
 </h2>

 {internships.map(internship => {

 const companyApps = applications.filter(a =>
  a.internshipId?._id === internship._id &&
  (a.studentId?.name || "")
  .toLowerCase()
  .includes(search.toLowerCase())
 );

 return (

 <div key={internship._id} className="mb-5">

 {/* HEADER */}

 <div style={{
  background:"rgba(255,255,255,0.08)",
  padding:"25px",
  borderRadius:"18px",
  textAlign:"center",
  backdropFilter:"blur(10px)",
  boxShadow:"0 10px 40px rgba(0,0,0,0.4)"
 }}>

 <h4 className="text-white fw-bold">
 {internship.title}
 </h4>

 <p style={{color:"#cbd5f5"}}>
 👥 Applicants: {companyApps.length}
 </p>

 <p style={{color:"#94a3b8"}}>
 Seats:
 {internship.maxApplicants
 ? internship.maxApplicants - companyApps.length
 : "No limit"} / {internship.maxApplicants || "∞"}
 </p>

 <div className="d-flex justify-content-center gap-2 mt-3">

 <button
 className="btn btn-danger btn-sm"
 onClick={()=>deleteInternship(internship._id)}
 >
 Delete
 </button>

 <button
 className="btn btn-primary btn-sm"
 onClick={()=>window.open(
 `http://localhost:5000/api/export/company/${internship._id}`
 )}
 >
 Excel
 </button>

 </div>

 </div>

 {/* STUDENTS */}

 <div className="row g-4 mt-3">

 {companyApps.length > 0 ? (

 companyApps.map(app => (

 <div className="col-md-4" key={app._id}>

 <div
 style={{

 background:
 app.status==="Approved"
 ? "linear-gradient(135deg,#dcfce7,#bbf7d0)"
 :
 app.status==="Rejected"
 ? "linear-gradient(135deg,#fee2e2,#fecaca)"
 :
 "rgba(255,255,255,0.95)",

 borderRadius:"16px",
 padding:"20px",
 boxShadow:"0 15px 40px rgba(0,0,0,0.25)",
 transition:"0.3s",
 cursor:"pointer"

 }}

 onMouseEnter={e=>{
  e.currentTarget.style.transform="translateY(-6px)"
 }}
 onMouseLeave={e=>{
  e.currentTarget.style.transform="translateY(0)"
 }}
 >

 <h6 className="fw-bold">
 👤 {app.studentId?.name}
 </h6>

 <p className="text-muted mb-1">
 {app.studentId?.email}
 </p>

 <p style={{fontSize:"13px"}}>
 <b>Skills:</b>{" "}
 {app.detectedSkills?.length
 ? app.detectedSkills.join(", ")
 : "No skills"}
 </p>

 {/* STATUS BADGE */}

 <div style={{
 padding:"6px 14px",
 borderRadius:"20px",
 fontSize:"12px",
 fontWeight:"600",
 display:"inline-block",

 background:
 app.status==="Approved"
 ? "linear-gradient(90deg,#22c55e,#4ade80)"
 :
 app.status==="Rejected"
 ? "linear-gradient(90deg,#ef4444,#f87171)"
 :
 "linear-gradient(90deg,#f59e0b,#fbbf24)",

 color:"white"
 }}>

 {app.status}

 </div>

 {/* SUCCESS MESSAGE */}

 {app.status === "Approved" && (
 <p style={{
  color:"#166534",
  fontWeight:"600",
  marginTop:"5px"
 }}>
 🎉 Selected Candidate
 </p>
 )}

 {/* BUTTONS */}

 <div className="d-flex gap-2 mt-2">

 <button
 className="btn btn-success btn-sm w-50"
 disabled={app.status==="Approved"}
 onClick={()=>updateStatus(app._id,"Approved")}
 >
 Approve
 </button>

 <button
 className="btn btn-danger btn-sm w-50"
 disabled={app.status==="Rejected"}
 onClick={()=>updateStatus(app._id,"Rejected")}
 >
 Reject
 </button>

 </div>

 {/* RESUME */}

 {app.studentId?.resume ? (

 <a
 href={`http://localhost:5000/uploads/${app.studentId.resume}`}
 target="_blank"
 rel="noreferrer"
 >

 <button className="btn btn-dark btn-sm w-100 mt-2">
 View Resume
 </button>

 </a>

 ) : (

 <button
 className="btn btn-secondary btn-sm w-100 mt-2"
 disabled
 >
 No Resume
 </button>

 )}

 </div>

 </div>

 ))

 ) : (

 <p className="text-center text-light mt-3">
 No students applied
 </p>

 )}

 </div>

 </div>

 );

 })}

 </div>

 </div>

 );

}

export default ViewApplications;