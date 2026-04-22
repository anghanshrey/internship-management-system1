import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

const navigate = useNavigate();

const user =
JSON.parse(localStorage.getItem("user"));

const [department,setDepartment] =
useState(user.department || "");

const [image, setImage] = useState(null);

const [form, setForm] = useState({
  name: user.name || "",
  email: user.email || "",
  phone: user.phone || "",
  department: user.department || "",
  skills: user.skills || ""
});

const handleImageUpload = async () => {

  if(!image){
    alert("Please select image");
    return;
  }

  const userData = JSON.parse(localStorage.getItem("user"));

  const formData = new FormData();

formData.append("profileImage", image);

formData.append("userId", userData._id);

  try{

    const res = await fetch(
      "http://localhost:5000/api/users/upload-profile",
      {
        method: "POST",
        body: formData
      }
    );

    let data;

try {
  data = await res.json();
} catch (err) {
  const text = await res.text();
  console.error("Server error response:", text);
  alert("Server error (check backend)");
  return;
}

// save updated user with new image
localStorage.setItem("user", JSON.stringify(data));

alert("Image uploaded");

// reload page
window.location.reload();
  }catch(err){

    console.log(err);
    alert("Upload error");

  }

};




const handleUpdate = async () => {

 const userData =
 JSON.parse(localStorage.getItem("user"));

 const skillsArray =
 typeof form.skills === "string" && form.skills.length > 0
  ? form.skills.split(",").map(s => s.trim().toLowerCase())
  : [];

 const updatedUser = {

  _id: userData._id,

  name: form.name,

  bio: form.bio,

  github: form.github,

  linkedin: form.linkedin,

  skills: skillsArray,

  department: department,

  enrollment: form.enrollment

 };

 console.log("sending", updatedUser);

 const res = await fetch(
"http://localhost:5000/api/users/update-user",
 {
  method:"PUT",
  headers:{
   "Content-Type":"application/json"
  },
  body: JSON.stringify(updatedUser)
 });

 const data = await res.json();

 console.log("response", data);

 localStorage.setItem("user",
 JSON.stringify(data));

 alert("Profile updated");

 // ✅ go to dashboard after update
navigate("/student-dashboard");

};



return (

<div

style={{

minHeight:"100vh",

 background: "linear-gradient(120deg, #0f172a, #1e293b, #020617)",

paddingBottom:"50px"

}}

>

{/* NAVBAR */}

<nav className="navbar navbar-dark bg-dark px-4">

<h5 className="text-white m-0">

Student Portal

</h5>

</nav>



{/* CARD */}

<div className="container pt-5">

<div

className="card border-0"

style={{

maxWidth:"520px",

margin:"auto",

borderRadius:"18px",

background:"rgba(255,255,255,0.95)",

backdropFilter:"blur(10px)",

boxShadow:
"0 20px 60px rgba(0,0,0,0.25)",

padding:"30px",

transition:"0.3s"
}}
onMouseEnter={e=>{
e.currentTarget.style.transform="translateY(-5px)"
}}
onMouseLeave={e=>{
e.currentTarget.style.transform="translateY(0)"


}}


>



{/* AVATAR */}

{/* PROFILE HEADER */}

<div style={{
textAlign:"center",
marginBottom:"25px"
}}>

{user.profileImage ? (

<img
src={
  user.profileImage
    ? `http://localhost:5000/${user.profileImage}`
    : "https://ui-avatars.com/api/?name=" + user.name
}
alt="profile"

style={{
width:"130px",
height:"130px",
borderRadius:"50%",
objectFit:"cover",
display:"block",
margin:"0 auto",
border:"4px solid white",
boxShadow:"0 8px 20px rgba(0,0,0,0.2)"
}}
/>

) : (

<div
style={{
width:"130px",
height:"130px",
borderRadius:"50%",
margin:"0 auto",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"42px",
fontWeight:"bold",
color:"white",
background:"linear-gradient(135deg,#6366f1,#06b6d4)",
boxShadow:"0 8px 20px rgba(0,0,0,0.2)"
}}
>

{user.name?.charAt(0).toUpperCase()}

</div>

)}

<h3 style={{
marginTop:"15px",
fontWeight:"600",
letterSpacing:"0.5px",
borderRadius:"12px"
}}>
{user.name}
</h3>

<p style={{
color:"#64748b",
fontSize:"14px"
}}>

Student Profile

</p>

</div>




{/* IMAGE UPLOAD */}

<div style={{marginBottom:"20px"}}>

<input
type="file"
className="form-control"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button
className="btn w-100 mt-2"
onClick={handleImageUpload}
style={{
background:"linear-gradient(90deg,#3b82f6,#06b6d4)",
border:"none",
padding:"10px",
fontWeight:"600",
borderRadius:"12px",
boxShadow:"0 4px 15px rgba(59,130,246,0.3)"
}}
>

Upload Photo

</button>

</div>





{/* NAME */}

<label className="fw-semibold">

Name

</label>

<input

className="form-control mb-3"

value={form.name}

placeholder="Enter name"

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

style={{

borderRadius:"10px",

padding:"10px"

}}

/>

{/* ENROLLMENT NUMBER */}
<label>Enrollment Number</label>

<input
className="form-control mb-3"

value={form.enrollment || ""}

onChange={(e)=>
setForm({
...form,
enrollment:e.target.value
})
}
/>




{/* SKILLS */}

<label className="fw-semibold">

Skills

</label>

<input

className="form-control mb-3"

value={form.skills}

placeholder="react, node, css"

onChange={(e)=>

setForm({

...form,

skills:e.target.value

})

}

style={{

borderRadius:"10px",

padding:"10px"

}}

/>



{/* BIO */}

<label className="fw-semibold">

Bio

</label>

<textarea

className="form-control mb-3"

value={form.bio}

placeholder="short intro"

onChange={(e)=>

setForm({

...form,

bio:e.target.value

})

}

style={{

borderRadius:"10px",

height:"80px"

}}

/>



{/* DEPARTMENT */}

<label className="fw-semibold">

Department

</label>

<select

className="form-control mb-4"

value={department}

onChange={(e)=>

setDepartment(e.target.value)

}

style={{

borderRadius:"10px",

padding:"10px"

}}

>

<option value="">

Select Department

</option>

<option value="BCA">

BCA

</option>

<option value="B.Tech">

B.Tech

</option>

<option value="Diploma">

Diploma

</option>

<option value="BBA">

BBA

</option>

</select>



{/* LINKS */}

<label className="fw-semibold">

Github

</label>

<input

className="form-control mb-3"

value={form.github}

placeholder="github url"

onChange={(e)=>

setForm({

...form,

github:e.target.value

})

}

style={{

borderRadius:"10px"

}}

/>

<label className="fw-semibold">

LinkedIn

</label>

<input

className="form-control mb-4"

value={form.linkedin}

placeholder="linkedin url"

onChange={(e)=>

setForm({

...form,

linkedin:e.target.value

})

}

style={{

borderRadius:"10px"

}}

/>




{/* BUTTON */}

<button

className="btn w-100"

onClick={handleUpdate}

style={{
background:"linear-gradient(90deg,#6366f1,#8b5cf6)",
border:"none",
padding:"12px",
fontWeight:"600",
borderRadius:"12px",
boxShadow:"0 4px 15px rgba(99,102,241,0.3)"
}}

>

Update Profile

</button>

</div>

</div>

</div>

);

}

export default Profile;