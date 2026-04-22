require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ConnectDB = require("./connect/db");

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const exportExcel = require("./routes/exportExcel");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("Backend working ");
});

// Connect DB
ConnectDB();

// Static uploads folder (FOR RESUME DOWNLOAD)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));



// Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/export", exportExcel);

app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/resume",resumeRoutes);



// Test API
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend + MongoDB connected" });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});