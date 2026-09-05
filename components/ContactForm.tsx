"use client";

import { useState } from "react";

const EMAIL = "jack.webb@rootcauseanalytics.com.au";

// A backend-free contact form: composes a pre-filled email in the visitor's
// own mail client. Nothing is collected or stored by the website.
// The three selects give the context a reply needs: industry, document
// volume, and deployment constraints.
export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [industry, setIndustry] = useState("");
  const [volume, setVolume] = useState("");
  const [deployment, setDeployment] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry from ${name || "your website"}`;
    const body = [
      message,
      "",
      industry ? `Industry: ${industry}` : "",
      volume ? `Document volume: ${volume}` : "",
      deployment ? `Deployment constraints: ${deployment}` : "",
      name ? `From: ${name}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={submit}>
      <label className="form-field">
        <span>Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="form-field">
        <span>Your industry (optional)</span>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="">Choose one, or skip</option>
          <option>Medical or health</option>
          <option>Insurance</option>
          <option>Legal</option>
          <option>Government</option>
          <option>Research or education</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="form-field">
        <span>Roughly how many documents? (optional)</span>
        <select value={volume} onChange={(e) => setVolume(e.target.value)}>
          <option value="">Choose one, or skip</option>
          <option>Under 1,000</option>
          <option>1,000 to 10,000</option>
          <option>10,000 to 100,000</option>
          <option>More than 100,000</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label className="form-field">
        <span>Where must it run? (optional)</span>
        <select
          value={deployment}
          onChange={(e) => setDeployment(e.target.value)}
        >
          <option value="">Choose one, or skip</option>
          <option>Fully on our own hardware, offline</option>
          <option>Our own cloud is fine</option>
          <option>No constraint yet</option>
          <option>Not sure</option>
        </select>
      </label>
      <label className="form-field">
        <span>Message</span>
        <textarea
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What documents are you dealing with, and what do you want out of them?"
        />
      </label>
      <button className="btn btn-gold" type="submit">
        Open email to Jack
      </button>
      <p className="spec-cap" style={{ marginTop: 14 }}>
        This opens your own email app with the message filled in. The website
        stores nothing. Replies within one business day, Sydney time.
      </p>
    </form>
  );
}
