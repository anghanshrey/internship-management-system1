import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

 const navigate = useNavigate();

 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [department, setDepartment] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);

 const handleRegister = async () => {

  setLoading(true);

  try{

   const response = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, department }),
   });

   const data = await response.json();

   if(response.ok){
    navigate("/login");
   } else {
    alert(data.message || "Error");
   }

  }catch(err){
   console.log(err);
  }

  setLoading(false);
 };

 return (

 <div style={{
 minHeight:"100vh",
 background:"linear-gradient(120deg,#0f172a,#1e293b,#020617)",
 display:"flex",
 justifyContent:"center",
 alignItems:"center",
 fontFamily:"Poppins, sans-serif"
 }}>

 {/* ANIMATION */}
 <style>
 {`
 @keyframes fadeIn {
  from {
   opacity:0;
   transform:translateY(30px);
  }
  to {
   opacity:1;
   transform:translateY(0);
  }
 }
 `}
 </style>

 {/* CARD */}
 <div style={{
 width:"360px",
 padding:"35px",
 borderRadius:"20px",
 background:"rgba(255,255,255,0.08)",
 backdropFilter:"blur(15px)",
 border:"1px solid rgba(255,255,255,0.1)",
 boxShadow:"0 25px 60px rgba(0,0,0,0.5)",
 animation:"fadeIn 0.6s ease"
 }}>

 {/* TITLE */}
 <h2 style={{
 textAlign:"center",
 color:"white",
 marginBottom:"25px",
 fontWeight:"600"
 }}>
 Student Register
 </h2>

 {/* NAME */}
 <input
 type="text"
 placeholder="Full Name"
 value={name}
 onChange={(e)=>setName(e.target.value)}
 style={inputStyle}
 />

 {/* EMAIL */}
 <input
 type="email"
 placeholder="Email address"
 value={email}
 onChange={(e)=>setEmail(e.target.value)}
 style={inputStyle}
 />

 {/* PASSWORD WITH TOGGLE */}
 <div style={{ position:"relative", marginBottom:"15px" }}>

 <input
 type={showPassword ? "text" : "password"}
 placeholder="Password"
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
 style={inputStyle}
 />

 <button
 onClick={()=>setShowPassword(!showPassword)}
 style={{
 position:"absolute",
 right:"10px",
 top:"50%",
 transform:"translateY(-50%)",
 background:"transparent",
 border:"none",
 color:"#cbd5f5",
 cursor:"pointer",
 fontSize:"12px"
 }}
 >
 {showPassword ? "Hide" : "Show"}
 </button>

 </div>

 {/* DEPARTMENT SELECT (FIXED UI) */}
 <select
 value={department}
 onChange={(e)=>setDepartment(e.target.value)}
 style={{
 width:"100%",
 padding:"12px",
 marginBottom:"20px",
 borderRadius:"12px",
 border:"1px solid rgba(255,255,255,0.1)",
 background:"rgba(255,255,255,0.1)",
 color:"white",
 outline:"none"
 }}
 >

 <option value="" style={{color:"black"}}>Select Department</option>
 <option value="BCA" style={{color:"black"}}>BCA</option>
 <option value="B.Tech" style={{color:"black"}}>B.Tech</option>
 <option value="BBA" style={{color:"black"}}>BBA</option>
 <option value="Pharmacy" style={{color:"black"}}>Pharmacy</option>
 <option value="Robotics" style={{color:"black"}}>Robotics</option>

 </select>

 {/* BUTTON */}
 <button
 onClick={handleRegister}
 style={{
 width:"100%",
 padding:"12px",
 borderRadius:"12px",
 border:"none",
 background:"linear-gradient(90deg,#3b82f6,#06b6d4)",
 color:"white",
 fontWeight:"600",
 cursor:"pointer",
 transition:"0.2s",
 boxShadow:"0 10px 30px rgba(59,130,246,0.4)"
 }}
 onMouseDown={e=>{
  e.currentTarget.style.transform="scale(0.96)";
 }}
 onMouseUp={e=>{
  e.currentTarget.style.transform="scale(1)";
 }}
 >
 {loading ? "Please wait..." : "Register"}
 </button>

 {/* LINKS */}
 <div style={{marginTop:"15px", textAlign:"center"}}>

 <Link
 to="/login"
 style={{
 color:"#38bdf8",
 textDecoration:"none",
 fontSize:"14px"
 }}
 >
 Already have account? Login
 </Link>

 </div>

 <div style={{marginTop:"15px", textAlign:"center"}}>

 <Link
 to="/"
 style={{
 color:"#94a3b8",
 textDecoration:"none",
 fontSize:"13px"
 }}
 >
 Back to home
 </Link>

 </div>

 </div>

 </div>
 );
}

/* INPUT STYLE */

const inputStyle = {
 width:"100%",
 padding:"12px",
 marginBottom:"15px",
 borderRadius:"12px",
 border:"1px solid rgba(255,255,255,0.1)",
 background:"rgba(255,255,255,0.1)",
 color:"white",
 outline:"none"
};

export default Register;