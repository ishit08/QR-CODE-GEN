"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import '../../styles/authpage.css'; // Import the shared CSS file

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log({ name, email, subject, message });
    alert("Message sent successfully!");
    // You can replace this alert with a more appropriate action such as form validation or API submission
  };

  return (
    <div className="login-container">
      <div className="card-container">
        <div className="gradient-bg"></div>
        <div className="card-content">
          <div className="text-center pb-6">
            <h1 className="text-3xl">Contact Us!</h1>
            <p className="text-gray-300">
              Fill up the form below to send us a message.
            </p>
          </div>
         <form onSubmit={handleSubmit} className="space-y-6">
  <Input
    type="text"
    label="Name"
    placeholder="Enter your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    className="input-field"
  />
  <Input
    type="email"
    label="Email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="input-field"
  />
  <Input
    type="text"
    label="Subject"
    placeholder="Enter subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    required
    className="input-field"
  />
  <textarea
    className="input-field"
    placeholder="Type your message here..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    required
    style={{ height: "121px" }}
  ></textarea>

  {/* Updated buttons section */}
  <div className="flex flex-col space-y-4">
    <button
      type="submit"
      className="login-button"
    >
      Send
    </button>
    <button
      type="reset"
      className="login-button"
      onClick={() => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }}
    >
      Reset
    </button>
  </div>
</form>
        </div>
      </div>
    </div>
  );
}
