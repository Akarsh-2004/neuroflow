// app/sentry-test/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import * as Sentry from "@sentry/nextjs";
import { inngest } from '../api/inngest/client';

async function serverAction() {
    Sentry.captureMessage("Server action executed!");
}

async function generateText() {
    await inngest.send({
        name: 'ai/text.generation.started',
        data: {
            prompt: 'Write a short story about a robot who discovers music.',
        },
    });
}

export default function SentryTestPage() {
  const [text, setText] = useState('');

  const handleButtonClick = () => {
    Sentry.captureMessage('Sentry test button clicked!');
    alert('Check the console and Sentry for a message.');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sentry Test Page</h1>
      <div className="space-y-4 max-w-sm">
        <p>
          This page is for testing Sentry integration. Interact with the elements below to generate events that will be sent to Sentry.
        </p>
        <Input 
          placeholder="Type something here to test session replay" 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleButtonClick}>
          Click me to send a Sentry client-side event
        </Button>
        <form action={serverAction}>
            <Button type="submit">Click me to send a Sentry server-side event</Button>
        </form>
        <form action={generateText}>
            <Button type="submit">Click me to generate AI text</Button>
        </form>
        <p>
          Your session is being recorded and you can view the replay in the Sentry dashboard.
        </p>
      </div>
    </div>
  );
}
