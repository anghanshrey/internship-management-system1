import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadResume = () => {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [enrollment, setEnrollment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {

    if (!file || !enrollment) {
      alert("Please enter enrollment and select resume");
      return;
    }

    // ✅ get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("enrollment", enrollment);
    formData.append("userId", user._id); // ✅ IMPORTANT

    try {

      setUploading(true);

      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log(res.data);

      setSuccess(true);
      setUploading(false);

      alert("✅ Resume uploaded successfully");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "❌ Upload failed"
      );

      setUploading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,#0f172a,#1e293b,#020617)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      {/* CARD */}
      <div
        style={{
          width: "420px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.95)",
          padding: "35px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
        }}
      >

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/student-dashboard")}
          style={{
            border: "none",
            background: "transparent",
            color: "#1976d2",
            fontWeight: "600",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          ← Back
        </button>

        {/* TITLE */}
        <h3 style={{ textAlign: "center", fontWeight: "700" }}>
          Upload Resume
        </h3>

        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "25px"
        }}>
          Upload PDF resume only
        </p>

        {/* ENROLLMENT */}
        <label>Enrollment Number</label>

        <input
          type="text"
          placeholder="Enter enrollment number"
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc"
          }}
        />

        {/* FILE */}
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "15px" }}
        />

        {file && (
          <p style={{ color: "green", fontSize: "14px" }}>
            Selected: {file.name}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: uploading
              ? "#999"
              : "linear-gradient(90deg,#2979ff,#00b0ff)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

        {/* SUCCESS */}
        {success && (
          <p style={{
            marginTop: "10px",
            color: "green",
            textAlign: "center"
          }}>
             Uploaded successfully
          </p>
        )}

      </div>
    </div>
  );
};

export default UploadResume;