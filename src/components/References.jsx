// src/components/References.jsx

function References() {
  return (
    <section id="references" className="section">
      <h2>References</h2>

      <div className="cards">
        <article className="card">
          <h3>Alessio Montaruli</h3>
          <p>Managing Director at KiTalent</p>
          <p>
            Email:{" "}
            <a href="mailto:alessio@tapartners.org">
              alessio@tapartners.org
            </a>
          </p>
          
          
        </article>

        <article className="card">
          <h3>Prof. Dr. Ahmet Duran Şahin</h3>
          <p>Head of Meteorological Engineering at ITU</p>
          <p>
            Email:{" "}
            <a href="mailto:sahind@itu.edu.tr">
              sahind@itu.edu.tr
            </a>
          </p>
          
        </article>
      </div>
    </section>
  );
}

export default References;
