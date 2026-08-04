import crypto from 'crypto';

export interface KYARecord {
  action: string;
  timestamp: string;
  rule_applied: string;
  approver?: string;
  details?: Record<string, any>;
}

export interface KYAStamp extends KYARecord {
  previous_hash: string;
  hash: string;
}

export class Stamper {
  private previousHash: string = "GENESIS_BLOCK";

  /**
   * Initializes the stamper. In a production system, this might load the latest hash from a secure ledger.
   * @param initialHash The hash to start the chain from.
   */
  constructor(initialHash?: string) {
    if (initialHash) {
      this.previousHash = initialHash;
    }
  }

  /**
   * Generates a cryptographic stamp for an action, sealing it in the KYA chain.
   */
  public stampAction(record: Omit<KYARecord, 'timestamp'>): KYAStamp {
    const timestamp = new Date().toISOString();
    
    const baseRecord: KYARecord = {
      ...record,
      timestamp,
    };

    const payloadString = JSON.stringify({
      ...baseRecord,
      previous_hash: this.previousHash,
    });

    const hash = crypto.createHash('sha256').update(payloadString).digest('hex');

    const stamp: KYAStamp = {
      ...baseRecord,
      previous_hash: this.previousHash,
      hash,
    };

    // Move the chain forward
    this.previousHash = hash;

    return stamp;
  }

  /**
   * Verifies if a given stamp's hash is cryptographically valid based on its contents and previous hash.
   */
  public verifyStamp(stamp: KYAStamp): boolean {
    const { hash, ...rest } = stamp;
    
    const payloadString = JSON.stringify(rest);
    const expectedHash = crypto.createHash('sha256').update(payloadString).digest('hex');

    return hash === expectedHash;
  }

  public getCurrentHash(): string {
    return this.previousHash;
  }
}

// Global instance for simple usage across an app
export const kyaStamper = new Stamper();
