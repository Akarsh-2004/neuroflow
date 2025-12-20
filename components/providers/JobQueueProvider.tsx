// components/providers/JobQueueProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';
import { inngest } from '@/app/api/inngest/client';

type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';
type JobType = 'ai-automation' | 'data-processing' | 'other';

interface Job {
  id: string;
  type: JobType;
  status: JobStatus;
  title: string;
  description: string;
  progress?: number;
  createdAt: Date;
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'status' | 'createdAt'>) => Promise<string>;
  updateJobStatus: (jobId: string, status: JobStatus, progress?: number) => void;
}

const JobQueueContext = createContext<JobContextType | undefined>(undefined);

export function JobQueueProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  const updateJobStatus = (jobId: string, status: JobStatus, progress?: number) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, status, ...(progress !== undefined && { progress }) } 
          : job
      )
    );
  };

  const addJob = async (job: Omit<Job, 'id' | 'status' | 'createdAt'>) => {
    const newJob: Job = {
      ...job,
      id: `job-${Date.now()}`,
      status: 'queued',
      progress: 0,
      createdAt: new Date(),
    };

    setJobs(prev => [newJob, ...prev]);
    
    toast('Job Queued', {
      description: `${job.title} has been added to the queue.`,
    });

    try {
      await inngest.send({
        name: 'ai/automation.started',
        data: { jobId: newJob.id, ...job },
      });
    } catch (error) {
      console.error('Failed to start job:', error);
      updateJobStatus(newJob.id, 'failed');
      toast.error('Failed to start job', {
        description: 'Could not communicate with the job server.',
      });
    }

    return newJob.id;
  };

  return (
    <JobQueueContext.Provider value={{ jobs, addJob, updateJobStatus }}>
      {children}
    </JobQueueContext.Provider>
  );
}

export const useJobQueue = () => {
  const context = useContext(JobQueueContext);
  if (!context) {
    throw new Error('useJobQueue must be used within a JobQueueProvider');
  }
  return context;
};