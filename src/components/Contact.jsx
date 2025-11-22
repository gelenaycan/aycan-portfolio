// src/components/Contact.jsx
import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const toEmail = "gelenaycan@gmail.com";

    const subject = `New message from ${form.name}`;
    const body =
      `Message:\n${form.message}\n\n` +
      `From: ${form.name} (${form.email})`;

    const mailtoLink =
      "mailto:" +
      encodeURIComponent(toEmail) +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailtoLink;
  }

  return (
    <section id="contact" className="section">
      <h2>Contact Me</h2>

      {/* DIRECT CONTACT INFO */}
      <div className="contact-info">
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:gelenaycan@gmail.com">gelenaycan@gmail.com</a>
        </p>

        <p>
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/aycangelen"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/aycangelen
          </a>
        </p>

        <p>
          <strong>Phone:</strong> +39 351 798 8980
        </p>
      </div>

      {/* CONTACT FORM */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
