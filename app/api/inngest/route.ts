// app/api/inngest/route.ts
import { serve } from 'inngest/next';
import { inngest } from './client';
import { processAIAutomation } from './functions/ai-automation';
import { generateAIText } from './functions/ai-text-generation';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processAIAutomation, generateAIText],
  streaming: 'allow',
});