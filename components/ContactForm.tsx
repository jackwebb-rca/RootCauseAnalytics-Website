"use client";

import { useState } from "react";

const EMAIL = "jack.webb@rootcauseanalytics.com.au";

// A backend-free contact form: composes a pre-filled email in the visitor's
// own mail client. Nothing is collected or stored by the website.
export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [docKind, setDocKind] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry from ${name || "your website"}`;
    const body = [
      message,
      "",
      docKind ? `Document types: ${docKind}` : "",
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
        <span>What kind of documents? (optional)</span>
        <select value={docKind} onChange={(e) => setDocKind(e.target.value)}>
          <option value="">Choose one, or skip</option>
          <option>Medical records</option>
          <option>Insurance documents</option>
          <option>Financial and invoices</option>
          <option>Mixed paper archive</option>
          <option>Something else</option>
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
        stores nothing.
      </p>
    </form>
  );
}
