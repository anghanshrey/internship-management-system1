import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllStudents(){

 const [students,setStudents] = useState([]);
 const [search,setSearch] = useState("");

 const navigate = useNavigate();

 useEffect(()=>{

  fetch("http://localhost:5000/api/admins/students")
  .then(res=>res.json())
  .then(data=>setStudents(data))

 },[]);


 const filtered = students.filter(s=>

 s.name?.toLowerCase().includes(search.toLowerCase()) ||
 s.email?.toLowerCase().includes(search.toLowerCase()) ||
 s.enrollment?.toLowerCase().includes(search.toLowerCase())

 );

 // STATS
 const totalStudents = students.length;

 const skilledStudents =
 students.filter(s=>s.skills?.length>0).length;

 const resumeStudents =
 students.filter(s=>s.resume).length;

 return(

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
 background:"rgba(0,0,0,0.6)"
 }}>

 <h5 style={{color:"white"}}>🎓 Student Dashboard</h5>

 <button
 className="btn btn-outline-light"
 onClick={()=>navigate("/admin")}
 >
 Home
 </button>

 </nav>


 {/*  TOP STATS */}

 <div className="container mt-4">

 <div className="row text-center g-3">

 <div className="col-md-4">
 <div style={cardStat("#3b82f6")}>
 <h6>Total Students</h6>
 <h3>{totalStudents}</h3>
 </div>
 </div>

 <div className="col-md-4">
 <div style={cardStat("#22c55e")}>
 <h6>Skilled Students</h6>
 <h3>{skilledStudents}</h3>
 </div>
 </div>

 <div className="col-md-4">
 <div style={cardStat("#f59e0b")}>
 <h6>Resume Uploaded</h6>
 <h3>{resumeStudents}</h3>
 </div>
 </div>

 </div>

 </div>


 {/* SEARCH */}

 <div style={{textAlign:"center", marginTop:"30px"}}>

 <input
 placeholder="🔍 Search..."
 value={search}
 onChange={(e)=>setSearch(e.target.value)}
 style={{
  padding:"14px",
  width:"320px",
  borderRadius:"12px",
  border:"none",
  outline:"none"
 }}
 />

 </div>


 <div className="container mt-5">

 <div style={{
 background:"white",
 borderRadius:"18px",
 padding:"20px"
 }}>

 <table className="table align-middle">

 <thead style={{
 background:"#0f172a",
 color:"white"
 }}>

 <tr>
 <th>Name</th>
 <th>Email</th>
 <th>Enrollment</th>
 <th>Department</th>
 <th>Skills</th>
 <th>Resume</th>
 </tr>

 </thead>

 <tbody>

 {filtered.map(s=>(

 <tr
 key={s._id}

 style={{

 //  highlight top skilled
 background:
 s.skills?.length >= 3
 ? "#ecfdf5"
 : "white",

 borderLeft:
 s.skills?.length >= 3
 ? "5px solid #22c55e"
 : ""

 }}

 >

 <td className="fw-bold">

  {s.name}

 {/*  badge */}
 {s.skills?.length >= 3 && (
 <span style={{
 marginLeft:"8px",
 background:"#22c55e",
 color:"white",
 padding:"2px 6px",
 borderRadius:"6px",
 fontSize:"10px"
 }}>
 TOP
 </span>
 )}

 </td>

 <td>{s.email}</td>

 <td>
 <span className="badge bg-info">
 {s.enrollment || "-"}
 </span>
 </td>

 <td>
 <span className="badge bg-secondary">
 {s.department || "-"}
 </span>
 </td>

 <td>

 {s.skills?.length > 0 ? (

 <span style={{fontSize:"13px"}}>
 {s.skills.join(", ")}
 </span>

 ) : (

 <span className="text-muted">
 No Skills
 </span>

 )}

 </td>

 <td>

 {s.resume ? (

 <div className="d-flex gap-2">

 <a
 href={`http://localhost:5000/uploads/company/${s.resume}`}
 target="_blank"
 rel="noreferrer"
 className="btn btn-success btn-sm"
 >
 View
 </a>

 <a
href={`http://localhost:5000/uploads/company/${s.resume}`}
 download
 className="btn btn-primary btn-sm"
 >
 Download
 </a>

 </div>

 ) : (

 <span className="text-danger">
 No Resume
 </span>

 )}

 </td>

 </tr>

 ))}

 </tbody>

 </table>

 </div>

 </div>

 </div>

 );

}


//  STAT CARD STYLE

const cardStat = (color)=>({

 background:`linear-gradient(135deg,${color},#1e293b)`,

 color:"white",

 padding:"20px",

 borderRadius:"14px",

 boxShadow:"0 10px 30px rgba(0,0,0,0.3)"

});


export default AllStudents;