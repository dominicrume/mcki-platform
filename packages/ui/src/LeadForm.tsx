"use client";

import React, { useState } from "react";
import { captureLead } from "./actions";

export function LeadForm({ formId, accentClass = "bg-ai" }: { formId: string; accentClass?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    await captureLead(formId, email);
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return <div className="p-4 bg-lime/10 text-lime font-medium rounded-xl text-center">Thanks! We&apos;ll be in touch.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl border border-line outline-none focus:border-mid bg-white text-ink"
        required
      />
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className={`px-6 py-3 rounded-xl text-white font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-50 ${accentClass}`}
      >
        {status === "submitting" ? "..." : "Submit"}
      </button>
    </form>
  );
}
