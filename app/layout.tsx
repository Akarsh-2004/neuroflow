// app/layout.tsx
'use client';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { JobQueueProvider } from '@/components/providers/JobQueueProvider';
import { JobQueue } from '@/components/jobs/JobQueue';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JobQueueProvider>
          {children}
          <JobQueue />
          <Toaster position="top-right" />
        </JobQueueProvider>
      </body>
    </html>
  );
}