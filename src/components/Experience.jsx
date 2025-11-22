// src/components/Experience.jsx

function Experience() {
  console.log("Experience render edildi");
  return (
    <section id="experience" className="section">
      <h2>Experience</h2>

      <div className="cards">
        <article className="card">
          <h3>Software Engineer Intern – KiTalent</h3>
          <p>Sep 2024 – Nov 2024 · Torino, Italy</p>
          <ul>
            <li>
              Led a small team (4 BSc and 1 MSc student) to deliver an
              AI-powered CV matching tool.
            </li>
            <li>
              Designed and implemented a web application using React and Node.js,
              integrating ChatGPT for CV–job matching.
            </li>
            <li>
              Collaborated with stakeholders to translate hiring needs into
              product features and UX flows.
            </li>
          </ul>
        </article>

        <article className="card">
          <h3>Frontend Engineer Intern – CoDeRTD</h3>
          <p>Jun 2023 – Sep 2023 · Torino, Italy</p>
          <ul>
            <li>
              Improved the company website by building new pages and reusable
              React components.
            </li>
            <li>
              Implemented responsive layouts with HTML, CSS, JavaScript and
              TypeScript to support desktop and mobile users.
            </li>
            <li>
              Worked closely with designers and engineers to keep the UI
              consistent and maintainable.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Experience;
