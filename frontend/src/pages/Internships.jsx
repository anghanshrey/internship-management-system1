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

 try{

  const res = await fetch(
  "http://localhost:5000/api/internships"
  );

  const data = await res.json();

  const active = data;   // show all internships

  const withScore =
   active.map(item=>{

    const required =
     (item.skills||[])
     .map(s=>s.toLowerCase());

    const matchCount =
     required.filter(skill=>
      studentSkills.includes(skill)
     ).length;

    const matchScore =
     required.length>0
      ? Math.round(
        (matchCount/required.length)*100
       )
      : 0;

    return{
     ...item,
     matchScore
    };

   });

  setInternships(withScore);

 }
 catch(err){

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

const getCategory = skills =>{

const s =
skills.join(" ").toLowerCase();

if(s.includes("react")
|| s.includes("html")
|| s.includes("css"))

return "Web Development";

if(s.includes("python")
|| s.includes("ai")
|| s.includes("ml"))

return "AI / ML";

if(s.includes("data"))

return "Data Science";

if(s.includes("android"))

return "App Development";

if(s.includes("marketing"))

return "Marketing";

return "Other";

};



/* ================= FILTER ================= */

// const filtered =
// internships

const filtered =
internships
.filter(item=> true)
.filter(item=>

 item.title.toLowerCase()
 .includes(search.toLowerCase())

 ||

 item.companyName.toLowerCase()
 .includes(search.toLowerCase())

)
.filter(item=>

 skillFilter===""

 ||

 item.skills.join(" ")
 .toLowerCase()
 .includes(skillFilter.toLowerCase())

)
.filter(item=>

 category===""

 ||

 getCategory(item.skills)===category

);


const sorted =
[...filtered].sort((a,b)=>

 (b.matchScore||0)
 -(a.matchScore||0)

);

const recommended = sorted;

const trending =
sorted.filter(i=>
 (i.appliedCount||0)>=0
);


/* ================= SORT ================= */

// const sorted =
// [...filtered]

// .sort((a,b)=>

// (b.matchScore||0)
// -(a.matchScore||0)

// );



// const recommended =
// sorted.filter(i=>

// i.matchScore>=70

// );

// const recommended = sorted; 

// const trending =
// sorted.filter(i=>

// (i.appliedCount||0)>=2

// );



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

 const applied =
 appliedIds.includes(item._id);

 const savedItem =
 saved.includes(item._id);

 const seatsPercent =
 item.totalSeats
 ? (item.seats / item.totalSeats) * 100
 : 60;

 return (

 <div className="col-lg-4 col-md-6 mb-4">

 <div

 className="card h-100 border-0 shadow-lg"

 style={{

 borderRadius:"18px",

 background:
 "linear-gradient(145deg,#ffffff,#f4f8ff)",

 transition:"0.35s",

 cursor:"pointer"

 }}

 onMouseEnter={e=>{

 e.currentTarget.style.transform="translateY(-8px)";

 e.currentTarget.style.boxShadow=
 "0 20px 40px rgba(0,0,0,0.12)";

 }}

 onMouseLeave={e=>{

 e.currentTarget.style.transform="translateY(0px)";

 e.currentTarget.style.boxShadow=
 "0 8px 18px rgba(0,0,0,0.08)";

 }}

 >

 {/* match bar */}

 <div

 style={{

 height:"7px",

 borderTopLeftRadius:"18px",

 borderTopRightRadius:"18px",

 background:
 "linear-gradient(90deg,#00c853,#64dd17)",

 width:`${item.matchScore || 50}%`

 }}

 />

 <div className="card-body d-flex flex-column">

 {/* title + match */}

 <div className="d-flex justify-content-between align-items-start mb-1">

 <h5 className="fw-bold mb-1">

 {item.title}

 </h5>

 <span className="badge bg-dark">

 {item.matchScore || 50}% match

 </span>

 </div>

 {/* company */}

 <p className="text-muted mb-2">

  {item.companyName}

 </p>

 {/* badges */}

 <div className="mb-2 d-flex flex-wrap gap-2">

 <span className="badge bg-light text-dark border">

  {item.location || "Remote"}

 </span>

 <span className="badge bg-light text-dark border">

  {item.duration}

 </span>

 </div>

 {/* deadline */}

 <p className="small text-muted mb-2">

  {getRemainingTime(item.applicationDeadline)}

 </p>

 {/* skills */}

 <div className="mb-3">

 {item.skills?.map((skill,i)=>(

 <span

 key={i}

 className="badge me-1 mb-1"

 style={{

 background:"#e3f2fd",

 color:"#0d47a1",

 fontWeight:"500",

 borderRadius:"8px",

 padding:"6px 10px"

 }}

 >

 {skill}

 </span>

 ))}

 </div>

 {/* seats */}

 <div className="mb-3">

 <small className="text-muted">

  Seats left: {item.seats}

 </small>

 <div className="progress mt-1">

 <div

 className="progress-bar"

 style={{

 width:`${seatsPercent}%`,

 background:
 "linear-gradient(90deg,#00bcd4,#2196f3)"

 }}

 />

 </div>

 </div>

 {/* buttons */}

 <div className="mt-auto">

 <button

 className="btn w-100 mb-2"

 style={{

 background:
 applied
 ? "#9ec5fe"
 : "linear-gradient(90deg,#2979ff,#00b0ff)",

 color:"white",

 borderRadius:"10px",

 border:"none",

 fontWeight:"600",

 transition:"0.3s"

 }}

 disabled={applied}

 onClick={()=>handleApply(item._id)}

 >

 {applied ? "Applied ✔" : "Apply Now"}

 </button>

 <button

 className="btn w-100"

 style={{

 borderRadius:"10px",

 fontWeight:"600",

 border:
 savedItem
 ? "2px solid #e91e63"
 : "2px solid #ccc",

 color:
 savedItem
 ? "#e91e63"
 : "#444",

 background:"#fff"

 }}

 onClick={()=>toggleSave(item._id)}

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