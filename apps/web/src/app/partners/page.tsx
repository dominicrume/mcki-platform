"use client";

import React, { useState } from "react";
import { Section, ProgressBar, Nav } from "@mcki/ui";

const MOCK_USER = {
  name: "Alistair",
  tier: "Silver",
  referrals: 4,
  points: 400,
  nextTier: "Gold",
  nextTierReq: 5,
  link: "https://mcki.com/partners?ref=alistair"
};

const LEADERBOARD = [
  { rank: 1, name: "Montgomery Sinclair", referrals: 24, tier: "Platinum" },
  { rank: 2, name: "Eleanor Fairfax", referrals: 18, tier: "Gold" },
  { rank: 3, name: "Alistair Kensington", referrals: 4, tier: "Silver" },
  { rank: 4, name: "Winston Harrington", referrals: 2, tier: "Bronze" },
  { rank: 5, name: "Beatrice Wellington", referrals: 1, tier: "Bronze" }
];

const REWARDS = [
  { tier: "Bronze", req: 1, reward: "Exclusive WhatsApp Mastermind Access", unlocked: MOCK_USER.referrals >= 1 },
  { tier: "Silver", req: 3, reward: "Free AI Foundation Course", unlocked: MOCK_USER.referrals >= 3 },
  { tier: "Gold", req: 5, reward: "VIP Seating at Next Live Event", unlocked: MOCK_USER.referrals >= 5 },
  { tier: "Platinum", req: 10, reward: "20% Cash Commission on Live Builds", unlocked: MOCK_USER.referrals >= 10 }
];

export default function PartnersDashboard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_USER.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-ink text-white selection:bg-ai selection:text-ink relative overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-ai/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#1E5B8F]/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      
      <Nav currentApp="partners" />

      <Section className="pt-20 pb-24 relative z-10">
        <header className="mb-16 text-center animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md shadow-2xl">
            <span className="font-mono text-[12px] tracking-widest uppercase text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">
              Partner Dashboard
            </span>
          </div>
          <h1 className="text-[clamp(40px,6vw,64px)] font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 tracking-tight leading-tight">
            Welcome back, {MOCK_USER.name}
          </h1>
          <p className="text-[18px] text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Track your impact, climb the leaderboard, and unlock exclusive tier rewards in the MCKI Ambassador Program.
          </p>
        </header>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1200px] mx-auto animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          
          {/* Main Status Widget (Spans 8 cols) */}
          <div className="lg:col-span-8 group relative rounded-[2rem] bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.04]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-8 md:p-12 relative z-10 flex flex-col h-full justify-between gap-12">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="text-[11px] font-mono text-ai uppercase tracking-[0.2em] mb-3 font-bold">Current Status</p>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white flex items-center gap-3 tracking-tight">
                    {MOCK_USER.tier}
                  </h2>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-[11px] font-mono text-white/40 uppercase tracking-[0.2em] mb-3 font-bold">Total Points</p>
                  <p className="text-4xl md:text-5xl font-black text-ai drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] tracking-tight">{MOCK_USER.points}</p>
                </div>
              </div>
              
              <div className="w-full">
                <ProgressBar 
                  progress={MOCK_USER.referrals} 
                  total={MOCK_USER.nextTierReq} 
                  label={`Referrals to unlock ${MOCK_USER.nextTier}`} 
                />
              </div>
              
              <div className="p-2 bg-black/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-inner items-center">
                <input 
                  type="text" 
                  readOnly 
                  value={MOCK_USER.link} 
                  className="flex-1 bg-transparent px-5 py-4 text-[14px] text-white/80 focus:outline-none font-mono w-full"
                />
                <button 
                  onClick={handleCopy}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-ink hover:bg-ai font-bold rounded-xl transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] flex items-center justify-center whitespace-nowrap"
                >
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>

            </div>
          </div>

          {/* Leaderboard Widget (Spans 4 cols) */}
          <div className="lg:col-span-4 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-8 flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-xl font-extrabold text-white tracking-tight">Leaderboard</h3>
              <p className="text-[13px] text-white/50 mt-1">Top Ambassadors</p>
            </div>
            
            <div className="space-y-4 flex-1">
              {LEADERBOARD.map((lb, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${lb.name === "Alistair Kensington" ? 'bg-ai/10 border border-ai/20 shadow-[0_0_20px_rgba(255,215,0,0.05)]' : 'hover:bg-white/5 border border-transparent'}`}>
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[12px] font-black ${idx === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-ink shadow-[0_0_15px_rgba(255,215,0,0.4)]' : idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-ink' : idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 'bg-white/10 text-white/60'}`}>
                      {lb.rank}
                    </span>
                    <span className={`font-semibold text-[14px] ${lb.name === "Alistair Kensington" ? 'text-white' : 'text-white/80'}`}>
                      {lb.name} {lb.name === "Alistair Kensington" && <span className="text-ai text-[11px] ml-1 opacity-70">(You)</span>}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-black text-white">{lb.referrals}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards Grid (Spans 12 cols, nested) */}
          <div className="lg:col-span-12 mt-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-white/10 flex-1"></div>
              <h3 className="text-lg font-bold text-white/60 tracking-widest uppercase font-mono px-4">Rewards & Unlockables</h3>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {REWARDS.map((r, idx) => (
                <div key={idx} className={`relative p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden group flex flex-col justify-between min-h-[220px] ${r.unlocked ? 'bg-ai/[0.05] border-ai/30 hover:border-ai/60 hover:bg-ai/[0.08] shadow-[0_0_30px_rgba(255,215,0,0.05)]' : 'bg-white/[0.02] border-white/10 opacity-60 hover:opacity-100'}`}>
                  <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-2xl ${r.unlocked ? 'from-ai/30' : ''}`} />
                  
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] ${r.unlocked ? 'text-ai drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]' : 'text-white/40'}`}>
                        {r.tier}
                      </span>
                      {r.unlocked && <span className="text-[9px] bg-ai text-ink px-2.5 py-1 rounded-full font-black uppercase tracking-[0.1em] shadow-[0_0_10px_rgba(255,215,0,0.5)]">Unlocked</span>}
                    </div>
                    <p className={`font-bold text-[17px] leading-snug relative z-10 ${r.unlocked ? 'text-white' : 'text-white/60'}`}>{r.reward}</p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                    <p className="text-[12px] font-mono text-white/40 uppercase tracking-widest">Req: {r.req} Referrals</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>
    </main>
  );
}
