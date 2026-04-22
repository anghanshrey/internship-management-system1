const commonSkills = [

"html",
"css",
"javascript",

"react",
"angular",
"vue",
"next",

"node",
"express",

"mongodb",
"mysql",
"sql",

"python",
"java",
"c",
"cpp",

"bootstrap",
"tailwind",

"php",
"laravel",

"api",
"rest",
"json",

"git",
"github",

"frontend",
"backend",

"responsive",
"ui",
"ux"

];

function normalize(skill){
return skill
.toLowerCase()
.trim()
.replace(".js","")
.replace("js","javascript");
}


function matchSkills(studentSkills=[], requiredSkills=[]){

const student =
studentSkills.map(s =>
s.toLowerCase().trim()
);

const required =
requiredSkills.map(s =>
s.toLowerCase().trim()
);

const matched =
required.filter(skill =>
student.includes(skill)
);

return required.length === 0
? 0
: Math.round(
(matched.length / required.length) * 100
);

}

module.exports = matchSkills;


function extractSkillsFromText(text){

 const words = normalizeText(text);

 let foundSkills = [];

 commonSkills.forEach(skill => {

 if(words.includes(skill)){

 foundSkills.push(skill);

 }

 });

 return foundSkills;

}


function calculateMatch(internshipSkills, resumeText){

 const studentSkills =
 extractSkillsFromText(resumeText);

 let match = 0;

 internshipSkills.forEach(skill => {

 if(
 studentSkills.includes(
 skill.toLowerCase()
 )
 ){
 match++;
 }

 });

 return Math.round(

 (match / internshipSkills.length) * 100

 );

}
function matchSkills(studentSkills = [], requiredSkills = []) {

if(!studentSkills.length || !requiredSkills.length)
return 0;

const matched =
requiredSkills.filter(skill =>

studentSkills.includes(skill.toLowerCase())

);

return Math.round(

(matched.length / requiredSkills.length) * 100

);

}

module.exports = matchSkills;