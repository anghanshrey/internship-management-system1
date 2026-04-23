import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

function Internships(){

const navigate = useNavigate();

const [internships,setInternships] = useState([]);
const [appliedIds,setAppliedIds] = useState([]);
const [saved,setSaved] = useState([]);

const [search,setSearch] = useState("");
const [skillFilter,setSkillFilter] = useState("");
const [category,setCategory] = useState("");

const user =
JSON.parse(localStorage.getItem("user"));

const studentSkills =
(user?.skills||[])
.map(s=>s.toLowerCase().trim());



/* ================= FETCH ================= */

useEffect(()=>{

fetchInternships();
fetchApplied();

const savedData =
JSON.parse(localStorage.getItem("savedInternships"))||[];

setSaved(savedData);

},[]);



const fetchInternships = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/internships");
    const data = await res.json();

    const withScore = data.map(item => {

      const required =
        Array.isArray(item.requiredSkills)
          ? item.requiredSkills
          : (item.requiredSkills || "").split(",");

      const requiredClean =
        required.map(s => s.toLowerCase().trim());

      const matchCount =
        requiredClean.filter(skill =>
          studentSkills.includes(skill)
        ).length;

      const matchScore =
        requiredClean.length > 0
          ? Math.round((matchCount / requiredClean.length) * 100)
          : 0;

      return {
        ...item,
        requiredSkills: requiredClean,
        matchScore
      };
    });

    setInternships(withScore);

  } catch (err) {
    console.log(err);
  }
};


const fetchApplied = async ()=>{

try{

const res = await fetch(

`http://localhost:5000/api/applications/student/${user._id}`

);

const data = await res.json();

setAppliedIds(

data.map(app=>

app.internshipId?._id

)

);

}

catch(err){

console.log(err);

}

};



/* ================= APPLY ================= */

const handleApply = async(id)=>{

try{

const res = await fetch(

"http://localhost:5000/api/applications/apply",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body: JSON.stringify({

studentId:user._id,
internshipId:id

})

}

);

if(res.ok){

alert("Applied successfully!");

setAppliedIds(prev=>[...prev,id]);

}

}

catch(err){

console.log(err);

}

};



/* ================= SAVE ================= */

const toggleSave = id =>{

let updated;

if(saved.includes(id)){

updated =
saved.filter(x=>x!==id);

}

else{

updated =
[...saved,id];

}

setSaved(updated);

localStorage.setItem(

"savedInternships",

JSON.stringify(updated)

);

};



/* ================= CATEGORY ================= */

const getCategory = skills => {

const s = (skills || []).join(" ").toLowerCase();

if(s.includes("react") || s.includes("html") || s.includes("css"))
 return "Web Development";

if(s.includes("python") || s.includes("ai") || s.includes("ml"))
 return "AI / ML";

if(s.includes("data"))
 return "Data Science";

if(s.includes("android"))
 return "App Development";

return "Other";

};



/* ================= FILTER ================= */

// const filtered =
// internships

const filtered =
internships
.filter(item =>

 item.title?.toLowerCase().includes(search.toLowerCase()) ||

 item.companyName?.toLowerCase().includes(search.toLowerCase())

)
.filter(item =>

 skillFilter === "" ||

 (item.requiredSkills || [])
 .join(" ")
 .toLowerCase()
 .includes(skillFilter.toLowerCase())

)
.filter(item =>

 category === "" ||

 getCategory(item.requiredSkills) === category

);


/* ================= SORT ================= */

const sorted =
[...filtered].sort((a,b)=>
 (b.matchScore || 0) - (a.matchScore || 0)
);

const recommended = sorted;

const trending = sorted;


/* ================= TIME ================= */

const getRemainingTime = deadline =>{

const now = new Date();

const end = new Date(deadline);

const diff = end-now;

if(diff<=0) return "Closed";

const d =
Math.floor(diff/(1000*60*60*24));

const h =
Math.floor(

(diff%(1000*60*60*24))

/(1000*60*60)

);

return `${d}d ${h}h`;

};



/* ================= CARD ================= */
const Card = ({ item }) => {

 const applied = appliedIds.includes(item._id);
 const savedItem = saved.includes(item._id);

 const seatsLeft =
  item.maxApplicants
   ? item.maxApplicants - (item.appliedCount || 0)
   : 0;

 const seatsPercent =
  item.maxApplicants
   ? (seatsLeft / item.maxApplicants) * 100
   : 60;

 return (
  <div className="col-lg-4 col-md-6 mb-4">

   <div
    className="card h-100 shadow-lg border-0"
    style={{
     borderRadius: "18px",
     overflow: "hidden",
     transition: "0.3s"
    }}
   >

    {/* TOP MATCH BAR */}
    <div
     style={{
      height: "6px",
      background: "linear-gradient(90deg,#00c853,#64dd17)",
      width: `${item.matchScore || 50}%`
     }}
    />

    <div className="card-body d-flex flex-column">

     {/* TITLE */}
     <div className="d-flex justify-content-between">
      <h5 className="fw-bold">{item.title || "No Title"}</h5>
      <span className="badge bg-dark">
       {item.matchScore || 0}%
      </span>
     </div>

     {/* COMPANY */}
     <p className="text-muted mb-2">
      {item.companyName || "Unknown Company"}
     </p>

     {/* DETAILS */}
     <div className="small mb-2">
      <div>{item.stipend || "Not specified"}</div>
      <div>{item.internshipType || "Remote"}</div>
     </div>

     {/* DURATION + LOCATION */}
     <div className="mb-2">
      <span className="badge bg-light text-dark me-2">
       {item.duration || "N/A"}
      </span>
     </div>

     {/* DEADLINE */}
     <p className="small text-muted">
      {getRemainingTime(item.applicationDeadline)}
     </p>

     {/* SKILLS */}
     <div className="mb-3">

  {(item.requiredSkills || []).map((skill, i) => (

    <div
      key={i}
      className="mb-1"
      style={{
        background: "#eef6ff",
        borderLeft: "4px solid #2979ff",
        padding: "6px 10px",
        borderRadius: "6px",
        fontSize: "13px"
      }}
    >
      • {skill}
    </div>

  ))}

</div>

     {/* LINKS */}
     <div className="mb-2">

      {item.companyWebsite && (
       <a
        href={item.companyWebsite}
        target="_blank"
        rel="noreferrer"
        className="me-3 small text-primary fw-semibold"
       >
        Website
       </a>
      )}

      {(item.companyPdf || item.pdf) && (
 <a
  href={`http://localhost:5000/uploads/company/${item.companyPdf || item.pdf}`}
  target="_blank"
  rel="noreferrer"
  style={{ textDecoration: "none" }}
 >
  <button
   className="btn w-100 mb-2"
   style={{
    background: "linear-gradient(90deg,#10b981,#059669)",
    color: "white",
    borderRadius: "10px",
    fontWeight: "600"
   }}
  >
    View Company Details
  </button>
 </a>
)}
     </div>

     {/* SEATS */}
     <div className="mb-3">
      <small className="text-muted">
       Seats left: {seatsLeft}
      </small>

      <div className="progress mt-1">
       <div
        className="progress-bar"
        style={{
         width: `${seatsPercent}%`,
         background:
          "linear-gradient(90deg,#00bcd4,#2196f3)"
        }}
       />
      </div>
     </div>

     {/* BUTTONS */}
     <div className="mt-auto">

      <button
       className="btn w-100 mb-2"
       style={{
        background: applied
         ? "#9ec5fe"
         : "linear-gradient(90deg,#2979ff,#00b0ff)",
        color: "white",
        borderRadius: "10px",
        fontWeight: "600"
       }}
       disabled={applied}
       onClick={() => handleApply(item._id)}
      >
       {applied ? "Applied ✔" : "Apply Now"}
      </button>

      <button
       className="btn w-100"
       style={{
        borderRadius: "10px",
        border: savedItem
         ? "2px solid #e91e63"
         : "2px solid #ccc",
        color: savedItem ? "#e91e63" : "#444"
       }}
       onClick={() => toggleSave(item._id)}
      >
       {savedItem ? "Saved ❤" : "Save ♡"}
      </button>

     </div>

    </div>
   </div>
  </div>
 );
};

/* ================= UI ================= */

return (

<div

style={{

minHeight:"100vh",

background:
"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",

paddingBottom:"60px"

}}

>

{/* NAVBAR */}

<nav

className="navbar px-4"

style={{

background:"rgba(0,0,0,0.35)",

backdropFilter:"blur(10px)",

borderBottom:"1px solid rgba(255,255,255,0.1)"

}}

>

<h4 className="text-white fw-bold">

 Internships Portal

</h4>

<button

className="btn btn-outline-light"

onClick={()=>navigate("/student-dashboard")}

>

Home

</button>

</nav>


<div className="container py-4">


{/* SEARCH BOX */}

<div

className="card border-0 shadow-lg mb-4"

style={{

borderRadius:"16px",

background:"rgba(255,255,255,0.95)"

}}

>

<div className="card-body">

<div className="row g-2">

<div className="col-md-4">

<input

type="text"

placeholder=" Search internship"

className="form-control"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>


<div className="col-md-4">

<input

type="text"

placeholder=" Filter skill"

className="form-control"

value={skillFilter}

onChange={(e)=>setSkillFilter(e.target.value)}

/>

</div>


<div className="col-md-4">

<select

className="form-control"

value={category}

onChange={(e)=>setCategory(e.target.value)}

>

<option>

All Categories

</option>

<option>

Web Development

</option>

<option>

AI / ML

</option>

<option>

App Development

</option>

<option>

Data Science

</option>

</select>

</div>

</div>

</div>

</div>



{/* AI recommended */}

<h4

className="text-white mb-3"

style={{

fontWeight:"700",

letterSpacing:"0.5px"

}}

>

 AI Recommended

</h4>

<div className="row">

{recommended.slice(0,1).map(item=>(

<Card key={item._id} item={item} />

))}

</div>



{/* trending */}

<h4

className="text-white mt-4 mb-3"

style={{

fontWeight:"700"

}}

>

 Trending Internships

</h4>

<div className="row">

{trending.map(item=>(

<Card key={item._id} item={item} />

))}

</div>



{/* all */}

<h4

className="text-white mt-4 mb-3"

style={{

fontWeight:"700"

}}

>

 All Internships

</h4>

<div className="row">

{filtered.map(item=>(

<Card key={item._id} item={item} />

))}

</div>


</div>

</div>

);

}

export default Internships;