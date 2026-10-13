"use client";

import { useState } from "react";
import { contact, profile } from "@/data/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="contact" aria-label="Contact" data-reveal="">
      <p className="overline">04. What&apos;s Next?</p>
      <h2>{contact.heading}</h2>
      <p>{contact.text}</p>
      <div className="mailbox">
        <a className="mailtext" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <button className="btn big" type="button" onClick={copy}>
          {copied ? "Copied!" : "Copy email"}
        </button>
      </div>
    </section>
  );
}
