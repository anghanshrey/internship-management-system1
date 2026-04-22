import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExportData(){

 const navigate = useNavigate();

 const [internships,setInternships] = useState([]);
 const [search,setSearch] = useState("");
 const [results,setResults] = useState([]);

 // load companies
 useEffect(()=>{

  axios.get("http://localhost:5000/api/internships")

  .then(res=>{

   const data = res.data.reverse();

   setInternships(data);
   setResults(data);

  })

  .catch(err=>console.log(err));

 },[]);


 // search click
 const handleSearch = ()=>{

  if(search.trim()===""){

   setResults(internships);

  } else {

   const filtered =
   internships.filter(item=>

    item.companyName
    ?.toLowerCase()
    .includes(search.toLowerCase())

   );

   setResults(filtered);

  }

 };


 // live search
 const handleTyping = (value)=>{

  setSearch(value);

  if(value.trim()===""){

   setResults(internships);

  } else {

   const filtered =
   internships.filter(item=>

    item.companyName
    ?.toLowerCase()
    .includes(value.toLowerCase())

   );

   setResults(filtered);

  }

 };


 // excel download
 const downloadAllExcel = ()=>{

  window.open("http://localhost:5000/api/export");

 };

 const downloadCompanyExcel = (id)=>{

  window.open(
   `http://localhost:5000/api/export/company/${id}`
  );

 };


 return(

 <div style={{
    minHeight:"100vh",
    background:"linear-gradient(120deg, #0f172a, #1e293b, #020617)",
  padding:"40px"
 }}>

 <div className="container">

 {/* HEADER */}

 <h2 style={{
  color:"white",
  textAlign:"center",
  fontWeight:"700",
  letterSpacing:"1px"
 }}>

  Export Dashboard

 </h2>

 <p style={{
  color:"#94a3b8",
  textAlign:"center",
  marginBottom:"40px"
 }}>

 Download student data with advanced controls

 </p>


 {/* MAIN CARD */}

 <div style={{
  ...mainCard,
  background:"linear-gradient(135deg,#ffffff,#f1f5f9)"
 }}>

 <h5 style={{fontWeight:"700"}}>

  All Students Data

 </h5>

 <p style={{color:"#555"}}>

 Download complete student dataset

 </p>

 <button
 className="btn w-100 mt-2"
 onClick={downloadAllExcel}
 style={{
  background:"linear-gradient(90deg,#6366f1,#3b82f6)",
  color:"white",
  border:"none",
  padding:"10px",
  borderRadius:"10px",
  fontWeight:"600",
  boxShadow:"0 8px 20px rgba(59,130,246,0.4)"
 }}
 >

 Download Excel

 </button>

 </div>


 {/* SEARCH BAR */}

 <div style={{
  textAlign:"center",
  marginTop:"50px"
 }}>

 <input
 type="text"
 placeholder="🔍 Search company..."
 value={search}
 onChange={(e)=>handleTyping(e.target.value)}
 style={{
  padding:"14px",
  width:"280px",
  borderRadius:"12px",
  border:"none",
  outline:"none",
  background:"#f1f5f9",
  boxShadow:"0 6px 20px rgba(0,0,0,0.2)",
  marginRight:"10px"
 }}
 />

 <button
 className="btn"
 onClick={handleSearch}
 style={{
  background:"linear-gradient(90deg,#22c55e,#4ade80)",
  color:"white",
  borderRadius:"10px",
  padding:"10px 20px",
  fontWeight:"600"
 }}
 >

 Search

 </button>

 </div>


 {/* TITLE */}

 <h4 style={{
  color:"white",
  marginTop:"50px",
  textAlign:"center",
  fontWeight:"600"
 }}>

  Company Wise Export

 </h4>


 {/* CARDS */}

 <div className="row g-4 mt-3">

 {results.length===0 ? (

 <p style={{
  color:"#cbd5f5",
  textAlign:"center"
 }}>

 No company found

 </p>

 ):(

 results.map(internship=>(

 <div className="col-md-4" key={internship._id}>

 <div style={companyCardUltra}>

 <div style={{fontSize:"30px"}}>🏢</div>

 <h5 style={{fontWeight:"700"}}>
 {internship.companyName}
 </h5>

 <p style={{
  color:"#64748b",
  fontSize:"14px"
 }}>
 {internship.title}
 </p>

 <button
 className="btn w-100 mt-2"
 onClick={()=>downloadCompanyExcel(internship._id)}
 style={{
  background:"linear-gradient(90deg,#f59e0b,#f97316)",
  color:"white",
  border:"none",
  borderRadius:"10px",
  padding:"10px",
  fontWeight:"600",
  boxShadow:"0 8px 20px rgba(249,115,22,0.4)"
 }}
 >

 Download Excel

 </button>

 </div>

 </div>

 ))

 )}

 </div>


 {/* BACK BUTTON */}

 <div style={{
  textAlign:"center",
  marginTop:"50px"
 }}>

 <button
 className="btn px-4"
 onClick={()=>navigate("/admin")}
 style={{
  background:"rgba(255,255,255,0.1)",
  color:"white",
  borderRadius:"10px",
  backdropFilter:"blur(8px)",
  border:"1px solid rgba(255,255,255,0.2)"
 }}
 >

  Back to Dashboard

 </button>

 </div>

 </div>

 </div>

 );

}


// CARDS

const mainCard={

 padding:"25px",
 borderRadius:"18px",
 textAlign:"center",
 maxWidth:"520px",
 margin:"auto",
 boxShadow:"0 20px 60px rgba(0,0,0,0.4)"

};

const companyCardUltra={

 background:"rgba(255,255,255,0.95)",
 padding:"22px",
 borderRadius:"16px",
 textAlign:"center",
 boxShadow:"0 15px 40px rgba(0,0,0,0.3)",
 transition:"0.3s",
 cursor:"pointer"

};

export default ExportData;