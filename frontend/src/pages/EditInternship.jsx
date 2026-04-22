import React,{useEffect,useState} from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function EditInternship(){

const navigate = useNavigate();
const {id} = useParams();

const [form,setForm] = useState({

title:"",
description:"",
requiredSkills:"",
duration:"",
applicationDeadline:""

});

useEffect(()=>{

axios.get(

`http://localhost:5000/api/internships/${id}`

)

.then(res=>{

setForm({

...res.data,

requiredSkills:

res.data.requiredSkills?.join(", ") || "",

applicationDeadline:

res.data.applicationDeadline

? res.data.applicationDeadline.slice(0,16)

: ""

});

})

.catch(err=>console.log(err));

},[id]);



const handleUpdate = async ()=>{

try{

await axios.put(

`http://localhost:5000/api/internships/${id}`,

{

...form,

requiredSkills:

form.requiredSkills

.split(",")

.map(s=>s.trim())

}

);

alert("Internship updated");

navigate("/admin-internships");

}

catch(err){

console.log(err);

alert("error updating");

}

};



return(

<div style={{

minHeight:"100vh",

background:

"linear-gradient(120deg,#0f172a,#1e293b,#020617)",

padding:"40px"

}}>



<div className="container">



{/* BACK BUTTON */}

<button

className="btn btn-outline-light mb-3"

onClick={()=>navigate("/admin-internships")}

>

Back

</button>



{/* CARD */}

<div

style={{

maxWidth:"520px",

margin:"auto",

background:"rgba(255,255,255,0.95)",

padding:"30px",

borderRadius:"18px",

boxShadow:

"0 20px 50px rgba(0,0,0,0.25)"

}}

>



<h3

style={{

textAlign:"center",

marginBottom:"20px",

fontWeight:"600"

}}

>

Edit Internship

</h3>



{/* TITLE */}

<label className="fw-semibold">

Title

</label>

<input

className="form-control mb-3"

value={form.title}

onChange={(e)=>

setForm({

...form,

title:e.target.value

})

}

/>



{/* DESCRIPTION */}

<label className="fw-semibold">

Description

</label>

<textarea

className="form-control mb-3"

rows="3"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

/>



{/* SKILLS */}

<label className="fw-semibold">

Required Skills

</label>

<input

className="form-control mb-3"

value={form.requiredSkills}

placeholder="react, node, css"

onChange={(e)=>

setForm({

...form,

requiredSkills:e.target.value

})

}

/>



{/* DURATION */}

<label className="fw-semibold">

Duration

</label>

<input

className="form-control mb-3"

value={form.duration}

placeholder="3 months"

onChange={(e)=>

setForm({

...form,

duration:e.target.value

})

}

/>



{/* DEADLINE */}

<label className="fw-semibold">

Application Deadline

</label>

<input

type="datetime-local"

className="form-control mb-4"

value={form.applicationDeadline}

onChange={(e)=>

setForm({

...form,

applicationDeadline:e.target.value

})

}

/>



{/* BUTTON */}

<button

className="btn w-100"

onClick={handleUpdate}

style={{

background:

"linear-gradient(90deg,#6366f1,#8b5cf6)",

color:"white",

fontWeight:"600",

padding:"12px",

borderRadius:"12px",

border:"none",

boxShadow:

"0 6px 20px rgba(99,102,241,0.4)"

}}

>

Update Internship

</button>



</div>



</div>

</div>

);

}

export default EditInternship;