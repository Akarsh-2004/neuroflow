import { Inngest } from 'inngest';

// Initialize the Inngest client with enhanced configuration
export const inngest = new Inngest({
  name: 'Neuroflow',
  // This key is used to authenticate with the Inngest API
  // In production, set this in your environment variables
  eventKey: process.env.INNGEST_EVENT_KEY || 'local-dev-key',
  
  // Enhanced logging for better debugging
  logger: {
    debug: (message, ...args) => console.debug(`[Inngest] ${message}`, ...args),
    info: (message, ...args) => console.info(`[Inngest] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[Inngest] ${message}`, ...args),
    error: (message, ...args) => console.error(`[Inngest] ${message}`, ...args),
  },
  
  // Environment information
  env: process.env.NODE_ENV || 'development',
});

// Define event types for better type safety
declare module 'inngest' {
  interface Events {
    'graph/process': {
      data: {
        graphId: string;
        userId: string;
        nodes?: any[];
        edges?: any[];
        [key: string]: any;
      };
    };
    'graph/analyze': {
      data: {
        graphId: string;
        userId: string;
        metrics?: string[];
        [key: string]: any;
      };
    };
  }
}
