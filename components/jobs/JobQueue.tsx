// components/jobs/JobQueue.tsx
'use client';

import { useJobQueue } from '@/components/providers/JobQueueProvider';

export function JobQueue() {
  const { jobs } = useJobQueue();
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {jobs.map(job => (
        <div key={job.id} className="p-4 mb-2 bg-white rounded shadow-lg">
          <div className="font-medium">{job.title}</div>
          <div className="text-sm text-gray-500">{job.status}</div>
          {job.progress !== undefined && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${job.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}