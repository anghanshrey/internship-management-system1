import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

 const navigate = useNavigate();

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);
 const [loading, setLoading] = useState(false);

 const handleLogin = async () => {

  setLoading(true);

  try {

   const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
   });

   const data = await res.json();

   if (res.ok) {

    localStorage.setItem("user", JSON.stringify(data.user));

// ✅ Check profile completion
    const user = data.user;

    if (!user.department || !user.skills || !user.enrollment) {
        navigate("/profile");   // go fill profile first
    } else {
        navigate("/student-dashboard"); // already filled
    }

    } else {
        alert(data.message || "Login failed");
    }
    
  } catch (error) {
   console.log(error);
   alert("Server error");
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
 Student Login
 </h2>

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
 color:"#000000ff",
 cursor:"pointer",
 fontSize:"12px"
 }}
 >
 {showPassword ? "Hide" : "Show"}
 </button>

 </div>

 {/* BUTTON */}
 <button
 onClick={handleLogin}
 style={{
 width:"100%",
 padding:"12px",
 borderRadius:"12px",
 border:"none",
 marginTop:"10px",
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
 {loading ? "Please wait..." : "Login"}
 </button>

 {/* LINKS */}
 <div style={{marginTop:"15px", textAlign:"center"}}>

 <Link
 to="/register"
 style={{
 color:"#38bdf8",
 textDecoration:"none",
 fontSize:"14px"
 }}
 >
 Create account
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

export default Login;