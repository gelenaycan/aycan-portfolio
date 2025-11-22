// src/components/Skills.jsx

function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      <div className="skills-groups">
        <div className="skills-group">
          <h3>Languages & Frameworks</h3>
          <div className="skills-tags">
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">React.js</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Django</span>
            <span className="skill-tag">HTML & CSS</span>
          </div>
        </div>

        <div className="skills-group">
          <h3>Backend & Databases</h3>
          <div className="skills-tags">
            <span className="skill-tag">REST APIs</span>
            <span className="skill-tag">MongoDB</span>
            <span className="skill-tag">MySQL</span>
            <span className="skill-tag">Database Design</span>
          </div>
        </div>

        <div className="skills-group">
          <h3>Tools & Platforms</h3>
          <div className="skills-tags">
            <span className="skill-tag">Git & GitHub</span>
            <span className="skill-tag">ChatGPT API</span>
            <span className="skill-tag">Google Apps Script</span>
            <span className="skill-tag">VS Code</span>
          </div>
        </div>

        <div className="skills-group">
          <h3>Computer Science & Data</h3>
          <div className="skills-tags">
            <span className="skill-tag">Algorithms & Data Structures</span>
            <span className="skill-tag">OOP</span>
            <span className="skill-tag">Machine Learning (basics)</span>
            <span className="skill-tag">Data Analysis (NumPy, Pandas)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
