import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

 const navigate = useNavigate();

 return (

 <div style={{
 minHeight:"100vh",
 background:"linear-gradient(120deg,#0f172a,#1e293b,#020617)",
 display:"flex",
 alignItems:"center",
 justifyContent:"center",
 fontFamily:"Poppins, sans-serif"
 }}>

 {/* ANIMATION */}
 <style>
 {`
 @keyframes fadeUp {
  from {
   opacity:0;
   transform:translateY(40px);
  }
  to {
   opacity:1;
   transform:translateY(0);
  }
 }
 `}
 </style>

 <div className="container text-center">

 {/* TITLE */}
 <h1 style={{
 color:"white",
 fontWeight:"700",
 marginBottom:"60px",
 letterSpacing:"1px",
 animation:"fadeUp 0.8s ease"
 }}>
 Internship Management Portal
 </h1>

 <div className="row justify-content-center">

 {/* STUDENT CARD */}
 <div className="col-md-4 m-3">

 <div
 style={cardStyle}
 onMouseEnter={e=>{
  e.currentTarget.style.transform="translateY(-10px) scale(1.02)";
 }}
 onMouseLeave={e=>{
  e.currentTarget.style.transform="translateY(0)";
 }}
 >

 <h3 style={titleStyle}>Student Portal</h3>

 <button
 onClick={()=>navigate("/login")}
 style={btnPrimary}
 >
 Login
 </button>

 <button
 onClick={()=>navigate("/register")}
 style={btnOutlineBlue}
 >
 Register
 </button>

 </div>

 </div>

 {/* ADMIN CARD */}
 <div className="col-md-4 m-3">

 <div
 style={cardStyle}
 onMouseEnter={e=>{
  e.currentTarget.style.transform="translateY(-10px) scale(1.02)";
 }}
 onMouseLeave={e=>{
  e.currentTarget.style.transform="translateY(0)";
 }}
 >

 <h3 style={titleStyle}>Admin Portal</h3>

 <button
 onClick={()=>navigate("/admin-login")}
 style={btnPurple}
 >
 Login
 </button>

 <button
 onClick={()=>navigate("/admin-register")}
 style={btnOutlinePurple}
 >
 Register
 </button>

 </div>

 </div>

 </div>

 </div>

 </div>
 );
}

/* ================= STYLES ================= */

const cardStyle = {
 background:"rgba(255,255,255,0.08)",
 backdropFilter:"blur(12px)",
 borderRadius:"22px",
 padding:"40px",
 color:"white",
 border:"1px solid rgba(255,255,255,0.1)",
 boxShadow:"0 20px 60px rgba(0,0,0,0.5)",
 transition:"0.3s",
 cursor:"pointer"
};

const titleStyle = {
 marginBottom:"25px",
 fontWeight:"600"
};

const btnPrimary = {
 width:"100%",
 padding:"12px",
 borderRadius:"12px",
 border:"none",
 background:"linear-gradient(90deg,#3b82f6,#06b6d4)",
 color:"white",
 fontWeight:"600",
 marginBottom:"15px",
 transition:"0.2s",
 boxShadow:"0 10px 30px rgba(59,130,246,0.4)"
};

const btnOutlineBlue = {
 width:"100%",
 padding:"12px",
 borderRadius:"12px",
 border:"1px solid #3b82f6",
 background:"transparent",
 color:"#3b82f6",
 fontWeight:"600"
};

const btnPurple = {
 width:"100%",
 padding:"12px",
 borderRadius:"12px",
 border:"none",
 background:"linear-gradient(90deg,#6366f1,#8b5cf6)",
 color:"white",
 fontWeight:"600",
 marginBottom:"15px",
 transition:"0.2s",
 boxShadow:"0 10px 30px rgba(139,92,246,0.4)"
};

const btnOutlinePurple = {
 width:"100%",
 padding:"12px",
 borderRadius:"12px",
 border:"1px solid #8b5cf6",
 background:"transparent",
 color:"#8b5cf6",
 fontWeight:"600"
};

export default HomePage;