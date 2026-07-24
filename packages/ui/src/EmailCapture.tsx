"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { captureLead } from "./actions";

export function EmailCapture({ ctaText = "Join the waitlist", source = "homepage", accentClass = "bg-ai text-ink" }: { ctaText?: string; source?: string; accentClass?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await captureLead(source, email);
      if (!res.success) throw new Error("Failed to capture lead");
      
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Failed to capture email:", err);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md">
      {status === "success" ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="p-4 rounded-xl border border-green-500/30 bg-green-500/10 text-center backdrop-blur-md"
        >
          <p className="font-sans text-green-400 font-medium">Thank you! You've been added to the list.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow px-6 py-4 rounded-full border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-sans"
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0 ${accentClass}`}
          >
            {status === "loading" ? "Submitting..." : ctaText}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-3 text-red-400 text-sm font-sans text-center">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
