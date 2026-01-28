import React, { useState } from "react";
import "./Contact.css";
import { useLogin } from "../LoginContext/LoginContext";

const Contact = () => {
  const { user } = useLogin(); // ✅ inside the component

  // 🔒 If not logged in
  if (!user) {
    return (
      <div className="contact-container">
        <h2 className="contact-title">Please Login First</h2>
        <p className="contact-subtitle">
          You need to be logged in to access the contact page.
        </p>
      </div>
    );
  }

  // If logged in → show form
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Thank you, ${formData.name}! Your message has been sent.`);

    setFormData({
      name: user.name || "",
      email: user.email || "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">
        Have any questions or feedback? We’d love to hear from you.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled // can't change logged-in name
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled // can't change logged-in email
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className="contact-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
