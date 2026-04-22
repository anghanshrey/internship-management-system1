import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/admin-login");
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
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 25px rgba(0,0,0,0.4)"
      }}>

        <h5 style={{ color: "white", fontWeight: "600" }}>
          Admin Panel
        </h5>

        {/* HAMBURGER */}
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

      {/* FLOAT MENU */}
      <div
        onMouseLeave={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          top: "70px",
          right: "20px",
          width: "240px",
          background: "rgba(15,23,42,0.95)",
          backdropFilter: "blur(15px)",
          borderRadius: "15px",
          padding: "15px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",

          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "0.3s ease",
          zIndex: 1000
        }}
      >

        {menuBtn("Add Internship", () => navigate("/add-internship"))}
        {menuBtn("Applications", () => navigate("/view-applications"))}
        {menuBtn("Students", () => navigate("/all-students"))}
        {menuBtn("Manage Internships", () => navigate("/admin-internships"))}
        {menuBtn("Search Data", () => navigate("/search"))}

        <button
          onClick={() => window.open("http://localhost:5000/api/export")}
          style={menuStyle}
        >
          Export Data
        </button>

        <button
          onClick={handleLogout}
          style={{
            ...menuStyle,
            background: "#ef4444",
            marginTop: "10px"
          }}
        >
          Logout
        </button>

      </div>

      {/* TITLE */}
      <div className="container mt-5">

        <h2 className="text-white text-center fw-bold mb-5">
          Admin Dashboard
        </h2>

        {/* CARDS */}
        <div className="row g-4 justify-content-center">

          {[
            {
              title: "Add Internship",
              desc: "Create new opportunity",
              btn: "Open",
              route: "/add-internship",
              color: "linear-gradient(135deg,#6366f1,#8b5cf6)"
            },
            {
              title: "Applications",
              desc: "Approve or reject",
              btn: "Open",
              route: "/view-applications",
              color: "linear-gradient(135deg,#22c55e,#4ade80)"
            },
            {
              title: "Students",
              desc: "View registered users",
              btn: "View",
              route: "/all-students",
              color: "linear-gradient(135deg,#f97316,#fb7185)"
            },
            {
              title: "Manage Internships",
              desc: "Edit or delete",
              btn: "Manage",
              route: "/admin-internships",
              color: "linear-gradient(135deg,#f59e0b,#eab308)"
            },
            {
              title: "Export Data",
              desc: "Download reports",
              btn: "Download",
              action: "export",
              color: "linear-gradient(135deg,#0ea5e9,#2563eb)"
            },
            {
              title: "Search Data",
              desc: "Find students or apps",
              btn: "Search",
              route: "/search",
              color: "linear-gradient(135deg,#a855f7,#d946ef)"
            }
          ].map((card, i) => (

            <div className="col-md-4" key={i}>

              <div
                style={{
                  borderRadius: "20px",
                  padding: "25px",
                  background: card.color,
                  color: "white",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  transition: "0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-10px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >

                <h5 style={{ fontWeight: "600" }}>
                  {card.title}
                </h5>

                <p style={{ opacity: "0.9", fontSize: "14px" }}>
                  {card.desc}
                </p>

                <button
                  className="btn btn-light w-100 mt-3"
                  style={{ borderRadius: "10px" }}
                  onClick={() => {
                    if (card.action === "export") {
                      window.open("http://localhost:5000/api/export");
                    } else {
                      navigate(card.route);
                    }
                  }}
                >
                  {card.btn}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

/* MENU BUTTON STYLE */
const menuStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "none",
  width: "100%",
  marginTop: "8px",
  background: "#1e293b",
  color: "white",
  textAlign: "left",
  cursor: "pointer",
  transition: "0.3s"
};

const menuBtn = (text, click) => (
  <button
    onClick={click}
    style={menuStyle}
    onMouseEnter={e => {
      e.currentTarget.style.background = "#334155";
      e.currentTarget.style.transform = "translateX(5px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "#1e293b";
      e.currentTarget.style.transform = "translateX(0)";
    }}
  >
    {text}
  </button>
);

export default AdminDashboard;