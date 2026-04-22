const skillList = require("./skillList");

function detectSkills(resumeText){

const text = resumeText.toLowerCase();

const foundSkills = skillList.filter(skill =>

text.includes(skill.toLowerCase())

);

return [...new Set(foundSkills)];

}

module.exports = detectSkills;