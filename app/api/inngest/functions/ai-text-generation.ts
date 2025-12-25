// app/api/inngest/functions/ai-text-generation.ts
import { inngest } from '../client';
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import * as Sentry from '@sentry/nextjs';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const generateAIText = inngest.createFunction(
  { id: 'generate-ai-text' },
  { event: 'ai/text.generation.started' },
  async ({ event, step }) => {
    const { prompt } = event.data;

    const transaction = Sentry.startTransaction({ name: "generate-ai-text" });
    const span = transaction.startChild({ op: "ai.generation", description: "Generate AI Text" });

    try {
      const { text } = await streamText({
        model: google('models/gemini-pro'),
        prompt,
      });

      span.finish();
      transaction.finish();

      return { success: true, text };
    } catch (error) {
      Sentry.captureException(error);
      span.finish();
      transaction.finish();
      return { success: false, error: error.message };
    }
  }
);
