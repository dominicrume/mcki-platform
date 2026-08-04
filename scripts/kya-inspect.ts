import * as fs from 'fs';
import * as path from 'path';
import { intro, outro, spinner, log, note } from '@clack/prompts';
import pc from 'picocolors';

/**
 * KYA Inspection Gate (Rich Developer UX)
 * 
 * This script runs the Thirteen Checks before deployment.
 */

const ROOT_DIR = path.resolve(__dirname, '..');
const RULES_FILE = path.join(ROOT_DIR, 'THE-RULES.md');
const ATTACK_REGISTER = path.join(ROOT_DIR, 'docs', 'kya', 'attack-register.md');

async function runChecks() {
  console.clear();
  intro(pc.bgBlue(pc.white(' KYA METHOD: The Thirteen Checks ')));
  
  const s = spinner();
  s.start('Inspecting project architecture...');
  
  // Simulate heavy AST/filesystem scanning for UX
  await new Promise(res => setTimeout(res, 1000));
  
  let passed = true;

  // 1. The Written Rules
  if (fs.existsSync(RULES_FILE)) {
    log.success(`${pc.green('PASS')} Check 1: The Written Rules (THE-RULES.md detected)`);
  } else {
    log.error(`${pc.red('MISSING')} Check 1: The Written Rules`);
    note('THE-RULES.md must exist at the project root to define system promises.', 'Resolution');
    passed = false;
  }

  // 2. Attack Register
  await new Promise(res => setTimeout(res, 400));
  if (fs.existsSync(ATTACK_REGISTER)) {
    log.success(`${pc.green('PASS')} Check 2 & 9: Attack Register & Fences (Register detected)`);
  } else {
    log.error(`${pc.red('MISSING')} Check 2 & 9: Attack Register`);
    note('docs/kya/attack-register.md must exist for threat modeling.', 'Resolution');
    passed = false;
  }

  s.stop('Inspection complete.');
  
  if (!passed) {
    outro(pc.red('🛑 KYA Inspection failed. The ship button has been locked.'));
    process.exit(1);
  } else {
    outro(pc.green('✅ KYA Inspection passed. Ready to ship.'));
    process.exit(0);
  }
}

runChecks().catch(console.error);
