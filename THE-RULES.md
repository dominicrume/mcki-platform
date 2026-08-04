# THE-RULES

**Project**: MCKI Platform
**Promise**: This system will operate predictably, providing educational resources and AI agent functionality without deviating into unverified assumptions.

## Core Promises
1. We will authenticate all users securely before granting access to partner or live dashboard features.
2. We will strictly isolate agentic AI tools from global system state.
3. Every AI decision and significant user state change will be logged and cryptographically stamped using the `@mcki/kya` engine.
4. We will fail loudly on unhandled inputs rather than silently guessing.

## The NOT List (Forbidden Actions)
1. **NOT** to use or expose hardcoded secrets (API keys, database passwords) in client-side code.
2. **NOT** to let AI agents execute arbitrary destructive commands on backend resources.
3. **NOT** to bypass the 13-point inspection gate during deployments.
4. **NOT** to use unverified data for decision-making logic without marking it as such.
5. **NOT** to allow random, un-seedable outputs in core logic tests.

## Routing
All AI agents developed within this monorepo must be broken down into discrete stages inside `packages/agents/` or `apps/ai-studio/`, with a corresponding `THE-JOB.md` file governing each specific stage.
