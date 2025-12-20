// app/features/ai-automation/page.tsx
'use client';
import { useJobQueue } from '@/components/providers/JobQueueProvider';
import { Button } from '@/components/ui/button';

export default function AIAutomationPage() {
  const { addJob } = useJobQueue();

  const handleStartAutomation = () => {
    addJob({
      type: 'ai-automation',
      title: 'AI Data Processing',
      description: 'Processing customer data with AI models',
    });
  };

  const handleStartZapierIntegration = () => {
    addJob({
      type: 'zapier-integration',
      title: 'Zapier Webhook Setup',
      description: 'Configuring webhook integration with Zapier',
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">AI Automation Dashboard</h1>
      <div className="space-y-4">
        <Button onClick={handleStartAutomation}>
          Start AI Data Processing
        </Button>
        <Button variant="outline" onClick={handleStartZapierIntegration}>
          Setup Zapier Integration
        </Button>
      </div>
    </div>
  );
}