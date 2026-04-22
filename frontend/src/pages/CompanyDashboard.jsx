import React, { useEffect, useState } from "react";

function CompanyDashboard(){

const [internships,setInternships] = useState([]);

const company =
JSON.parse(localStorage.getItem("user"));

useEffect(()=>{

fetch("http://localhost:5000/api/internships")
.then(res=>res.json())
.then(data=>{

const filtered = data.filter(

i => i.company === company.name

);

setInternships(filtered);

});

},[]);

return(

<div style={{padding:"20px", background: "linear-gradient(120deg, #0f172a, #1e293b, #020617)",}}>

<h2>Company Dashboard</h2>

{

internships.map(item=>(

<div key={item._id}
style={{
border:"1px solid #ccc",
padding:"15px",
marginBottom:"10px"
}}>

<h4>{item.title}</h4>

<p>Company: {item.company}</p>

<p>Deadline: {item.deadline}</p>

<button

onClick={()=>

window.open(

`http://localhost:5000/api/export/${item._id}`

)

}

>

Download Excel

</button>

</div>

))

}

</div>

);

}

export default CompanyDashboard;