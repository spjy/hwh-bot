const string = ` Education Level
<:edone:799921598025957386> Pre-High School
<:edtwo:799921598055579668> High School
<:edthree:799921598043521054> Undergraduate
<:edfour:799921598043521024> Graduate
<:edfive:799921598051516426> Postgraduate
<:edsix:799921598093983744> Professional
<:edseven:911788768535654483> Independent
 Event
<:evOne:799303021087555595> Event
<:evTwo:799303021393084436> Challenge Event
<:evThree:799303021343146016> Debate Event
<:evFour:799303021279313930> Game Event
<:evFive:799303021037223976> Study Group
 General Subject
<:math:911787645061955644> Math
🧑‍🔬 Science
🗺️ Social Science
👥 Social Studies
🔖 English
💻 Computer Science
🎨 Art
<:language:777009527224270858> Foreign Language
💡 School Advice
📧 Career Advice
 Mathematics
<:algebra:911787644906799155> Algebra
📏 Geometry
📐 Trigonometry
♾️ Calculus
📊 Statistics
<:advancedmath:911787644554465344> Advanced Math
🧾 Accounting
<:linearalgebra:911787645124890644> Linear Algebra
<:abstractalgebra:911787644789346356> Abstract Algebra
<:topologyandanalysis:911787645296869386> Topology and Analysis
<:competitionmath:911787645032624148> Competition Math
 Science
🫁 Anatomy and Physiology
🪐 Astronomy
🧬 Biology
🧪 Chemistry
<:organicchemistry:911787645061959701> Organic Chemistry
🧲 Physics
🗜️ Engineering
🩺 Health Science
 Social Science
💼 Business
💵 Economics
🌐 Geography
<:political_science:792574521861079041> Political Science
🧠 Psychology
<:sociology:911787645355589682> Sociology
 Social Studies
🏛️ History
<:philosophy:776992370553520149> Philosophy
⚖️ Law
🐲 Mythology
<:religion:911787645577875498> Religion
 English 
📓 English Composition
📚 English Literature
✍️ Writing
<:poetry:911792994343079936> Poetry
 Computer Science
<:programming:911787645145845760> Programming
<:ccpp:911787645078753311> C C++
<:java:911787644839690273> Java JVM
<:python:911787645045186611> Python
🧑‍💻 Web Development
🤖 Artificial Intelligence
<:cybersecurity:777009527429005323> Cybersecurity
🎮 Game Design
<:latex:776992369924898886> LaTeX
<:operatingsystems:911787645129097216> Operating Systems
 Art
<:calligraphy:911787644806115339> Calligraphy
🖊️ Drawing
<:graphic_design:776992369962516510> Graphic Design
🖌️ Painting
📸 Photography
<:drama:776992372131102751> Drama
🎵 Music
 Foreign Language
<:ASL:911787645229748314> ASL
🇸🇦 Arabic
🇧🇩 Bengali
🇨🇳 Chinese
🇳🇱 Dutch
🇫🇷 French
🇩🇪 German
🇬🇷 Greek
🇮🇳 Hindi
🇮🇹 Italian
🇯🇵 Japanese
🇰🇷 Korean
🇻🇦 Latin
🇲🇾 Malay
🇧🇷 Portuguese
🇷🇺 Russian
🇪🇸 Spanish
🇹🇷 Turkish`;

const s = string.split('\n');

s.forEach((r) => {
  const rr = r.split(' ');
  if (rr[0] === '') {
    console.log('],');
    console.log(`${rr[1]}: [`);
  } else {
    const l = `  {
    emoji: "${rr[0].trim()}",
    label: "${rr[1]}${rr[2] ? ' ' + rr[2] : ''}${rr[3] ? ' ' + rr[3] : ''}",
    value: "${rr[1]}${rr[2] ? ' ' + rr[2] : ''}${rr[3] ? ' ' + rr[3] : ''}"
  },`;
    console.log(l);
  }
});
