"use client";

import React, { useState } from "react";
import { Section, Card, ProgressBar, Button } from "@mcki/ui";

const MOCK_USER = {
  name: "Matlub",
  tier: "Silver",
  referrals: 4,
  points: 400,
  nextTier: "Gold",
  nextTierReq: 5,
  link: "https://live.mckisolutions.com/?ref=matlub"
};

const LEADERBOARD = [
  { rank: 1, name: "S. Williams", referrals: 24, tier: "Platinum" },
  { rank: 2, name: "J. Davies", referrals: 18, tier: "Gold" },
  { rank: 3, name: "Matlub", referrals: 4, tier: "Silver" },
  { rank: 4, name: "A. Smith", referrals: 2, tier: "Bronze" },
  { rank: 5, name: "R. Patel", referrals: 1, tier: "Bronze" }
];

const REWARDS = [
  { tier: "Bronze", req: 1, reward: "Exclusive WhatsApp Mastermind Access", unlocked: MOCK_USER.referrals >= 1 },
  { tier: "Silver", req: 3, reward: "Free AI Foundation Course (Worth £600)", unlocked: MOCK_USER.referrals >= 3 },
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
    <main>
      <Section className="pt-20 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome back, {MOCK_USER.name}</h1>
        <p className="text-lg text-white/70 mb-12">Track your referrals, climb the leaderboard, and unlock exclusive rewards.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Dashboard Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Status Card */}
            <Card accentClass="bg-ai">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-mono text-ai uppercase tracking-widest mb-1">Current Tier</p>
                  <h2 className="text-3xl font-extrabold">{MOCK_USER.tier} Ambassador</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-white/50 uppercase tracking-widest mb-1">Total Points</p>
                  <p className="text-3xl font-bold text-white">{MOCK_USER.points}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <ProgressBar 
                  progress={MOCK_USER.referrals} 
                  total={MOCK_USER.nextTierReq} 
                  label={`Referrals to unlock ${MOCK_USER.nextTier}`} 
                />
              </div>
              
              <div className="p-4 bg-ink/50 border border-white/10 rounded-xl">
                <p className="text-sm font-semibold mb-2">Your Unique Referral Link</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={MOCK_USER.link} 
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/80 focus:outline-none"
                  />
                  <button 
                    onClick={handleCopy}
                    className="px-6 py-2 bg-ai text-ink font-bold rounded-lg transition-transform hover:-translate-y-0.5"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </Card>

            {/* Rewards & Unlockables */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Unlockables & Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REWARDS.map((r, idx) => (
                  <div key={idx} className={`p-6 rounded-2xl border transition-all ${r.unlocked ? 'bg-ai/10 border-ai/50' : 'bg-white/5 border-white/10 opacity-60'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs font-mono font-bold uppercase tracking-widest ${r.unlocked ? 'text-ai' : 'text-white/50'}`}>
                        {r.tier} Tier
                      </span>
                      {r.unlocked && <span className="text-xs bg-ai text-ink px-2 py-0.5 rounded-full font-bold">Unlocked</span>}
                    </div>
                    <p className={`font-semibold ${r.unlocked ? 'text-white' : 'text-white/70'}`}>{r.reward}</p>
                    <p className="text-sm text-white/40 mt-2">Requires {r.req} Referrals</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Leaderboard Column */}
          <div className="space-y-8">
            <Card title="Leaderboard" tagline="Top Ambassadors this month">
              <div className="space-y-4 mt-6">
                {LEADERBOARD.map((lb, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-3 rounded-xl ${lb.name === MOCK_USER.name ? 'bg-white/10 border border-white/20' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${idx < 3 ? 'bg-ai text-ink' : 'bg-white/10 text-white'}`}>
                        {lb.rank}
                      </span>
                      <span className={`font-semibold ${lb.name === MOCK_USER.name ? 'text-white' : 'text-white/80'}`}>
                        {lb.name} {lb.name === MOCK_USER.name && "(You)"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-ai">{lb.referrals}</p>
                      <p className="text-[10px] uppercase tracking-wider text-white/50">{lb.tier}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      </Section>
    </main>
  );
}
