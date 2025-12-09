// src/components/Education.jsx

function Education() {
  return (
    <section id="education" className="section">
      <h2>Education</h2>

      <div className="cards">
        <article className="card">
          <h3>Politecnico di Torino(PoliTo)</h3>
          <p>M.Sc. in Engineering and Management and M.Sc. in Digital Skills for Sustainable Societal Transitions -Double Degree </p>
          <p>2025 – Present · Turin, Italy</p>
        </article>

        <article className="card">
          <h3>Politecnico di Torino(PoliTo)</h3>
          <p>B.Sc. in Computer Engineering</p>
          <p>Sep 2022 – Jul 2025 · Turin, Italy</p>
        </article>

        <article className="card">
          <h3>Karlsruhe Institute of Technology (KIT)</h3>
          <p>B.Sc. in Meteorology – Erasmus Exchange</p>
          <p>2021 – 2022 · Karlsruhe, Germany</p>
        </article>

        <article className="card">
          <h3>Istanbul Technical University (ITU)</h3>
          <p>B.Sc. in Meteorological Engineering</p>
          <p>2017 – 2022 · Istanbul, Turkey</p>
        </article>
      </div>
    </section>
  );
}

export default Education;
