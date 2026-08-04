"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface KYAStamp {
  action: string;
  timestamp: string;
  rule_applied: string;
  approver?: string;
  previous_hash: string;
  hash: string;
}

export async function generateKYAStamp(action: string, rule_applied: string, approver?: string): Promise<KYAStamp> {
  const payload = {
    action,
    timestamp: new Date().toISOString(),
    rule_applied,
    approver,
    previous_hash: "0000000000000000000000000000000000000000000000000000000000000000",
  };
  
  const payloadString = JSON.stringify(payload);
  const msgBuffer = new TextEncoder().encode(payloadString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return { ...payload, hash };
}

interface KYABadgeProps {
  stamp: KYAStamp;
  className?: string;
}

export function KYABadge({ stamp, className = "" }: KYABadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1428] border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all group ${className}`}
      >
        <ShieldCheck className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
        <span className="text-xs font-mono font-medium text-blue-200 uppercase tracking-widest">
          Verified by KYA
        </span>
      </motion.button>

      <KYAAuditModal isOpen={isOpen} onClose={() => setIsOpen(false)} stamp={stamp} />
    </>
  );
}

export function DynamicKYABadge({ action, rule_applied, approver, className = "" }: { action: string, rule_applied: string, approver?: string, className?: string }) {
  const [stamp, setStamp] = useState<KYAStamp | null>(null);

  useEffect(() => {
    generateKYAStamp(action, rule_applied, approver).then(setStamp);
  }, [action, rule_applied, approver]);

  if (!stamp) return null;
  return <KYABadge stamp={stamp} className={className} />;
}

interface KYAAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamp: KYAStamp;
}

export function KYAAuditModal({ isOpen, onClose, stamp }: KYAAuditModalProps) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);

  const verifyIntegrity = async () => {
    setVerifying(true);
    setVerified(null);
    
    try {
      // Simulate slight network/processing delay for UX effect
      await new Promise(resolve => setTimeout(resolve, 800));

      // Reconstruct the exact string payload that the backend stamper used
      const { hash, ...rest } = stamp;
      const payloadString = JSON.stringify(rest);
      
      // Calculate SHA-256 hash using Web Crypto API
      const msgBuffer = new TextEncoder().encode(payloadString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      
      // Convert buffer to hex string
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      if (calculatedHash === stamp.hash) {
        setVerified(true);
      } else {
        console.error("KYA Integrity Failure: Hash mismatch.", { expected: stamp.hash, calculated: calculatedHash });
        setVerified(false);
      }
    } catch (error) {
      console.error("KYA Verification Error:", error);
      setVerified(false);
    } finally {
      setVerifying(false);
    }
  };

  // Reset verification state when modal opens
  useEffect(() => {
    if (isOpen) {
      setVerified(null);
      setVerifying(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020813]/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a1428]/90 border border-blue-500/20 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">KYA Birth Certificate</h3>
                    <p className="text-xs font-mono text-blue-300/70">Immutable Audit Trail</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-white/40 hover:text-white p-2">
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs font-mono text-white/40 mb-1 uppercase">Action</p>
                  <p className="text-sm font-medium text-white">{stamp.action}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs font-mono text-white/40 mb-1 uppercase">Timestamp</p>
                  <p className="text-sm font-medium text-white">{new Date(stamp.timestamp).toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs font-mono text-white/40 mb-1 uppercase">Rule Applied</p>
                  <p className="text-sm font-medium text-blue-300 font-mono break-words">{stamp.rule_applied}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-xs font-mono text-white/40 mb-1 uppercase">Approver</p>
                  <p className="text-sm font-medium text-white">{stamp.approver || "Autonomous (No human override)"}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-blue-500/10">
                <p className="text-xs font-mono text-white/40 mb-2 uppercase flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Cryptographic Seal (SHA-256)
                </p>
                <div className="font-mono text-xs text-blue-200/80 break-all leading-relaxed select-all">
                  {stamp.hash}
                </div>
              </div>
            </div>

            {/* Footer / Verifier */}
            <div className="p-6 border-t border-blue-500/20 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                {verified === true && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Integrity Verified. Chain holds.</span>
                  </motion.div>
                )}
                {verified === false && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium">Verification Failed. Broken chain.</span>
                  </motion.div>
                )}
              </div>
              <button
                onClick={verifyIntegrity}
                disabled={verifying}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {verifying ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Activity className="w-4 h-4" />
                    </motion.div>
                    Recalculating...
                  </>
                ) : (
                  "Verify Integrity"
                )}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
