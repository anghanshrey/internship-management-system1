import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!text) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/search/${text}`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg,#0f172a,#1e293b,#020617)",
        padding: "40px",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 25px",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "10px",
        }}
      >
        <h5 style={{ color: "white" }}>🔍 Search Data</h5>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate("/admin")}
        >
          Home
        </button>
      </nav>

      {/* CARD */}
      <div
        style={{
          maxWidth: "900px",
          margin: "50px auto",
          background: "rgba(255,255,255,0.95)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">Search Students</h3>

        {/* INPUT */}
        <div className="d-flex gap-2 mb-4">
          <input
            className="form-control"
            placeholder="Search by name, email, enrollment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "10px",
            }}
          />

          <button
            className="btn btn-primary px-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-muted">Searching...</p>
        )}

        {/* NO RESULT */}
        {!loading && results.length === 0 && text && (
          <p className="text-center text-muted">No results found</p>
        )}

        {/* RESULTS */}
        <div className="row g-4">
          {results.map((user) => (
            <div className="col-md-6" key={user._id}>
              <div
                style={{
                  borderRadius: "16px",
                  padding: "20px",
                  background: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* NAME */}
                <h5 className="fw-bold mb-3 text-primary">
                  {user.name || "-"}
                </h5>

                <hr />

                {/* DETAILS */}
                <div style={{ fontSize: "14px", lineHeight: "1.8" }}>
                  <p>
                    <b>Email:</b>{" "}
                    <span style={{ color: "#555" }}>
                      {user.email || "-"}
                    </span>
                  </p>

                  <p>
                    <b>Enrollment No:</b>{" "}
                    <span style={{ color: "#555" }}>
                      {user.enrollment || "-"}
                    </span>
                  </p>

                  <p>
                    <b>Department:</b>{" "}
                    <span style={{ color: "#555" }}>
                      {user.department || "-"}
                    </span>
                  </p>

                  <p>
                    <b>Total Skills:</b>{" "}
                    <span style={{ color: "#555" }}>
                      {user.skills?.length || 0}
                    </span>
                  </p>
                </div>

                {/* SKILLS LIST */}
                {user.skills?.length > 0 && (
                  <div className="mt-2">
                    <b>Skills:</b>
                    <div className="mt-2 d-flex flex-column gap-1">
                      {user.skills.map((skill, i) => (
                        <div
                          key={i}
                          style={{
                            background: "#eef6ff",
                            borderLeft: "4px solid #2979ff",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            fontSize: "13px",
                          }}
                        >
                          • {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RESUME */}
                <div className="mt-4">
                  {user.resume ? (
                    <a
                      href={`http://localhost:5000/uploads/${user.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-dark w-100"
                    >
                      📄 View Resume
                    </a>
                  ) : (
                    <button
                      className="btn btn-secondary w-100"
                      disabled
                    >
                      No Resume
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;