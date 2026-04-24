import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/*  BACKGROUND BLOBS */}
      <div className="blob"></div>
      <div className="blob blob2"></div>

      {/* TITLE */}
      <h1 style={styles.title}>
        Internship Management Portal
      </h1>

      <div style={styles.wrapper}>

        {/* LEFT */}
        <div style={styles.left}>
          <div style={styles.card}>

            <h3 style={styles.subtitle}>Welcome </h3>

            <button
              style={{ ...styles.btn, ...styles.primaryBtn }}
              onClick={() => navigate("/login")}
            >
               Student Login
            </button>

            <button
              style={{ ...styles.btn, ...styles.outlineBtn }}
              onClick={() => navigate("/register")}
            >
              Student Register
            </button>

            <p
              style={styles.adminLink}
              onClick={() => navigate("/admin-login")}
            >
              Admin Login →
            </p>

          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <div style={styles.imageWrapper}>
            <img
              src="https://www.gradleaders.com/wp-content/uploads/2025/06/Screenshot-2025-06-26-at-12.26.48-PM-1.png"
              alt="students"
              style={styles.image}
            />
          </div>
        </div>

      </div>

    </div>
  );
}

export default HomePage;

const styles = {

  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
    fontFamily: "Poppins, sans-serif",
    overflow: "hidden",
    position: "relative",
    paddingTop: "60px"
  },

  title: {
    color: "white",
    fontSize: "42px",
    fontWeight: "700",
    marginLeft: "140px",
    marginBottom: "40px"
  },

wrapper: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 120px",
  gap: "50px"   //  ADD THIS
},

  left: {
    flex: 1
  },

  card: {
    width: "420px",
    padding: "60px 50px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(25px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 50px 120px rgba(0,0,0,0.9)",
    transition: "0.4s ease"
  },

  subtitle: {
    color: "#e2e8f0",
    marginBottom: "30px"
  },

  btn: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "15px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.3s"
  },

  primaryBtn: {
    background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
    color: "white",
    boxShadow: "0 10px 30px rgba(59,130,246,0.6)"
  },

  

  outlineBtn: {
    background: "transparent",
    border: "1px solid #06b6d4",
    color: "#06b6d4"
  },

  adminLink: {
    color: "#a855f7",
    marginTop: "10px",
    cursor: "pointer"
  },

  right: {
  flex: 1,
  display: "flex",
  alignItems: "center",   //  align vertically with card
  justifyContent: "center"
},

imageWrapper: {
  padding: "4px",
  borderRadius: "28px",
  background: "linear-gradient(135deg,#3b82f6,#a855f7)",
},

image: {
  width: "550px",
  height: "470px",   //  increase height
  objectFit: "cover",
  borderRadius: "20px",
  boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
  transition: "0.6s ease"
}
};