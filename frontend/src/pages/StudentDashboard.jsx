import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    if (
  !user.department ||
  !user.enrollment ||
  !user.skills ||
  user.skills.length === 0
) {
  navigate("/profile");
  return;
}

    // ✅ FIX: Calculate stats manually
    fetch(`http://localhost:5000/api/applications/student/${user._id}`)
      .then(res => res.json())
      .then(apps => {

        const total = apps.length;
        const approved = apps.filter(a => a.status === "Approved").length;
        const rejected = apps.filter(a => a.status === "Rejected").length;

        // Applied → Pending
        const pending = apps.filter(
          a => a.status !== "Approved" && a.status !== "Rejected"
        ).length;

        setStats({ total, approved, rejected, pending });

      })
      .catch(err => console.log(err));

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (

    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg,#020617,#0f172a,#020617)",
      paddingBottom: "50px"
    }}>

      {/* NAVBAR */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)"
      }}>

        <h5 style={{ color: "white", fontWeight: "600" }}>
          Student Portal
        </h5>

        <div
  onMouseEnter={(e) => {
    setMenuOpen(true);
    e.currentTarget.style.transform = "scale(1.2)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
  }}
  onClick={(e) => {
    e.stopPropagation();
    setMenuOpen(prev => !prev);
  }}
  style={{
    fontSize: "26px",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  }}
>
  ☰
</div>

      </nav>

      {/* MENU */}
      <div
        onMouseLeave={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          top: "70px",
          right: "20px",
          width: "230px",
          background: "rgba(15,23,42,0.95)",
          borderRadius: "14px",
          padding: "15px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",

          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "0.3s ease"
        }}
      >
        {navBtn("Home", () => navigate("/student-dashboard"))}
        {navBtn("Internships", () => navigate("/internships"))}
        {navBtn("Applications", () => navigate("/my-applications"))}
        {navBtn("Resume", () => navigate("/upload-resume"))}
        {navBtn("Profile", () => navigate("/profile"))}

        <button
          onClick={handleLogout}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white"
          }}
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="container mt-5">

        <h2 style={{
          textAlign: "center",
          color: "white",
          marginBottom: "40px",
          fontWeight: "700"
        }}>
          Dashboard Overview
        </h2>

        {/* STATS */}
        <div className="row g-4 text-center mb-5">
          <StatCard title="Total" value={stats.total} color="#6366f1" />
          <StatCard title="Approved" value={stats.approved} color="#22c55e" />
          <StatCard title="Rejected" value={stats.rejected} color="#ef4444" />
          <StatCard title="Pending" value={stats.pending} color="#f59e0b" />
        </div>

        {/* ACTION CARDS */}
        <div className="row g-4">

          <ActionCard
            title="Browse Internships"
            desc="Find best opportunities"
            btn="Explore"
            color="#3b82f6"
            onClick={() => navigate("/internships")}
          />

          <ActionCard
            title="Track Applications"
            desc="Check status & updates"
            btn="View"
            color="#22c55e"
            onClick={() => navigate("/my-applications")}
          />

          <ActionCard
            title="Upload Resume"
            desc="Improve matching system"
            btn="Upload"
            color="#f59e0b"
            onClick={() => navigate("/upload-resume")}
          />

        </div>

      </div>

    </div>
  );
}

/* BUTTON */
const navBtn = (text, click) => (
  <button
    onClick={click}
    style={{
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.2)",
      background: "transparent",
      color: "white",
      width: "100%",
      textAlign: "left",
      transition: "0.3s"
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = "#1e293b";
      e.currentTarget.style.transform = "translateX(5px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.transform = "translateX(0)";
    }}
  >
    {text}
  </button>
);

/* STAT CARD */
const StatCard = ({ title, value, color }) => (
  <div className="col-md-3">
    <div style={{
      padding: "25px",
      borderRadius: "20px",
      color: "white",
      background: `linear-gradient(135deg,${color},#020617)`,
      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
      transition: "0.3s"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <h6 style={{ opacity: "0.7" }}>{title}</h6>
      <h1>{value}</h1>
    </div>
  </div>
);

/* ACTION CARD */
const ActionCard = ({ title, desc, btn, color, onClick }) => (
  <div className="col-md-4">
    <div style={{
      padding: "30px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(10px)",
      color: "white",
      textAlign: "center",
      boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
      transition: "0.3s"
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-8px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <h5>{title}</h5>
      <p style={{ color: "#cbd5f5" }}>{desc}</p>

      <button
        onClick={onClick}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          border: "none",
          marginTop: "10px",
          background: `linear-gradient(90deg,${color},#0ea5e9)`,
          color: "white",
          fontWeight: "600"
        }}
      >
        {btn}
      </button>
    </div>
  </div>
);

export default StudentDashboard;