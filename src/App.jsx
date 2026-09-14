import { profile } from "./data/profile";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";

function Tags({ items }) {
  return (
    <ul className="tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
function SectionHeading({ number, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        {number} / {title}
      </p>
      <h2>{description}</h2>
    </div>
  );
}
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <section
          className="hero container"
          id="about"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" />
              {profile.location} / Software & AI
            </p>
            <h1 id="hero-title">
              Aycan Gelen
              <span>
                Engineering ideas.
                <br />
                <em>Building impact.</em>
              </span>
            </h1>
            <p className="role">{profile.title}</p>
            <p className="intro">{profile.summary}</p>
            <div className="actions">
              <a className="button primary" href="#projects">
                Explore my work <span aria-hidden="true">↗</span>
              </a>
              <button
                className="button secondary"
                onClick={() => window.print()}
              >
                Print / save résumé <span aria-hidden="true">↓</span>
              </button>
            </div>
            <div className="socials">
              <a href={profile.linkedin}>LinkedIn ↗</a>
              <a href={profile.github}>GitHub ↗</a>
              <a href={`mailto:${profile.email}`}>Email ↗</a>
            </div>
          </div>
          <aside className="impact-panel" aria-label="Selected career results">
            <div className="panel-top">
              <span>SELECTED IMPACT</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="metric">
              <strong>
                76<span>%</span>
              </strong>
              <h2>Less time reporting.</h2>
              <p>
                26 → 6 minutes per analysis task at FPT Industrial. Validated
                with three sales team members.
              </p>
            </div>
            <div className="metric-row">
              <div>
                <strong>40k+</strong>
                <span>Candidate profiles</span>
              </div>
              <div>
                <strong>40+</strong>
                <span>Customer accounts</span>
              </div>
            </div>
            <p className="panel-foot">
              AI applications. Data systems. Real-world delivery.
            </p>
          </aside>
        </section>
        <div className="focus-strip">
          <div className="container">
            <span>FULL STACK DEVELOPMENT</span>
            <span aria-hidden="true">✳</span>
            <span>AI APPLICATIONS</span>
            <span aria-hidden="true">✳</span>
            <span>DATA ENGINEERING</span>
          </div>
        </div>
        <section className="section container" id="experience">
          <SectionHeading
            number="01"
            title="Experience"
            description="Built in real working environments."
          />
          <div className="timeline">
            {profile.experience.map((job) => (
              <article className="job" key={job.company}>
                <div className="job-meta">
                  <p>{job.dates}</p>
                  <span>{job.location}</span>
                </div>
                <div>
                  <h3>{job.company}</h3>
                  <p className="job-role">{job.role}</p>
                  <ul className="bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Tags items={job.tags} />
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="project-section" id="projects">
          <div className="container section">
            <SectionHeading
              number="02"
              title="Selected projects"
              description="From a complex problem to a useful product."
            />
            <div className="project-grid">
              {profile.projects.map((project, i) => (
                <article className="project-card" key={project.title}>
                  <div className={`project-art art-${i}`} aria-hidden="true">
                    {i === 0 ? (
                      <>
                        <span className="art-label">SALES / INTELLIGENCE</span>
                        <div className="chart-bars">
                          {[32, 48, 42, 70, 59, 86, 100].map((h, j) => (
                            <i key={j} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <span className="art-caption">DATA → DECISIONS</span>
                      </>
                    ) : i === 1 ? (
                      <>
                        <span className="art-label">SEMANTIC / MATCHING</span>
                        <div className="match-graphic">
                          <span>PROFILE</span>
                          <b>↔</b>
                          <span>OPPORTUNITY</span>
                        </div>
                        <span className="art-caption">
                          CONTEXT BEYOND KEYWORDS
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="art-label">
                          AI / PROJECT MANAGEMENT
                        </span>
                        <div className="plan-graphic">
                          <span>01 &nbsp; Artifacts</span>
                          <span>02 &nbsp; Structure</span>
                          <span>03 &nbsp; Project plan</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="project-body">
                    <p className="eyebrow">
                      {project.type} / {project.year}
                    </p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="contribution">{project.contribution}</p>
                    <div className="project-outcome">
                      <strong>{project.outcome}</strong>
                      <small>{project.note}</small>
                    </div>
                    <Tags items={project.tags} />
                    <a className="text-link" href={project.anchor}>
                      {i === 2 ? "Discuss this project" : "View experience"}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section container" id="skills">
          <SectionHeading
            number="03"
            title="Technical skills"
            description="A toolkit for end-to-end delivery."
          />
          <div className="skills-grid">
            {profile.skills.map((group) => (
              <article key={group.title}>
                <h3>{group.title}</h3>
                <Tags items={group.items} />
              </article>
            ))}
          </div>
        </section>
        <section className="section container education-section" id="education">
          <SectionHeading
            number="04"
            title="Education & languages"
            description="An international engineering foundation."
          />
          <div className="education-list">
            {profile.education.map((e) => (
              <article key={e.degree}>
                <div>
                  <h3>{e.degree}</h3>
                  <p>{e.school}</p>
                </div>
                <p>
                  {e.dates}
                  <span>{e.location}</span>
                </p>
              </article>
            ))}
          </div>
          <div className="languages">
            <h3>Languages</h3>
            {profile.languages.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="container contact-inner">
            <div>
              <p className="eyebrow">05 / Get in touch</p>
              <h2>
                Let’s build something
                <br />
                <em>that makes a difference.</em>
              </h2>
              <p>
                For software engineering, AI, and data-driven product
                conversations.
              </p>
            </div>
            <div className="contact-links">
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email} ↗
              </a>
              <a href={profile.linkedin}>Connect on LinkedIn ↗</a>
              <a href={profile.github}>Explore GitHub ↗</a>
              <button onClick={() => window.print()}>
                Print / save résumé ↓
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="container">
        <span>© {new Date().getFullYear()} Aycan Gelen</span>
        <span>Software. AI. Meaningful impact.</span>
        <a href="#about">Back to top ↑</a>
      </footer>
      <Chat />
    </>
  );
}
