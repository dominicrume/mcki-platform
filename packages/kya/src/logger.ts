/**
 * 3 AM Visibility Logger
 * This logger ensures that every critical stage boundary is explicitly logged
 * so that a failure at 3 AM can be diagnosed within 10 minutes.
 */

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL'
}

export interface KYAContext {
  stage: string;
  runId: string;
}

export class KYALogger {
  constructor(private context: KYAContext) {}

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    let logString = `[${timestamp}] [${level}] [Stage: ${this.context.stage}] [RunID: ${this.context.runId}] ${message}`;
    if (data) {
      logString += ` | Data: ${JSON.stringify(data)}`;
    }
    return logString;
  }

  public info(message: string, data?: any) {
    console.log(this.formatMessage(LogLevel.INFO, message, data));
  }

  public warn(message: string, data?: any) {
    console.warn(this.formatMessage(LogLevel.WARN, message, data));
  }

  public error(message: string, data?: any) {
    console.error(this.formatMessage(LogLevel.ERROR, message, data));
  }

  /**
   * Fails loudly and terminates the process or throws an error.
   * "if bad data arrives, the system stops and says so; it never quietly guesses."
   */
  public failLoudly(message: string, data?: any): never {
    const errorMsg = this.formatMessage(LogLevel.FATAL, message, data);
    console.error(errorMsg);
    throw new Error(`KYA FATAL ERROR: ${message}`);
  }
}
