import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import References from "./components/References";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <section className="hero" id="about">
        <h1>Aycan Gelen</h1>
        <p>Full-stack oriented Computer Engineer building real-world web apps with React & Node.js.</p>

        <div className="hero-buttons">
          <a href="#experience">View Experience</a>
          <a href="#contact">Contact Me</a>
        </div>
      </section>

      <Education />
      <Experience />
      <Skills />
      <References/>
      <Contact />
    </>
  );
}
export default App;

