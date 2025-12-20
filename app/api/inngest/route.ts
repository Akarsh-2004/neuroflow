// app/api/inngest/route.ts
import { serve } from 'inngest/next';
import { inngest } from './client';
import { processAIAutomation } from './functions/ai-automation';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processAIAutomation],
  streaming: 'allow',
});