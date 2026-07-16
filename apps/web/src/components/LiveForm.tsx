"use client";

import React, { useState } from "react";
import { submitData } from "@mcki/ui";

export function LiveForm({ actionName, label, accentClass }: { actionName: string; label: string; accentClass: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    setStatus("submitting");
    await submitData("event_data", { action: actionName, value });
    setStatus("success");
    setValue("");
  };

  if (status === "success") {
    return <div className="p-3 bg-lime/10 text-lime font-medium rounded-xl text-[14px]">Received!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full mt-3">
      <input 
        type="text" 
        placeholder={label} 
        value={value}
        onChange={e => setValue(e.target.value)}
        className="flex-1 px-4 py-2 rounded-xl border border-white/20 outline-none focus:border-ai bg-white/10 text-white placeholder:text-white/50 text-[14px]"
        required
      />
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className={`px-4 py-2 rounded-xl ${(accentClass.includes("ai") || accentClass.includes("amber")) ? "text-ink" : "text-white"} font-bold text-[14px] shadow-sm hover:shadow-md transition-transform hover:-translate-y-0.5 disabled:opacity-50 ${accentClass}`}
      >
        {status === "submitting" ? "..." : "Submit"}
      </button>
    </form>
  );
}
