# KYA Shortcuts Register

*Real builds take shortcuts — that is fine. What is not fine is forgetting them.*

Keep a running list of technical debt and shortcuts taken in the project. 

## Log

| Date | Feature | Shortcut Taken | Why | Repayment Date / Condition | Status |
|---|---|---|---|---|---|
| 2026-08-04 | Ambassador Dashboard | Static mockup for rewards and leaderboards (`MOCK_USER`) | UI demonstration for stakeholders prior to backend readiness. | When Supabase user auth/referral tracking is active. | Open |
| 2026-08-04 | KYA Stamping | Using in-memory `GENESIS_BLOCK` for hash chain | Proof of concept for stamping engine | When integrated with Redis/PostgreSQL for persistent chaining | Open |
