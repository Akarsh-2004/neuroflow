// app/layout.tsx
'use client';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { JobQueueProvider } from '@/components/providers/JobQueueProvider';
import { JobQueue } from '@/components/jobs/JobQueue';
import Header from '@/components/Header'; // Add this import
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <JobQueueProvider>
          <Header /> {/* Add the Header component here */}
          <main className="flex-1 pt-16"> {/* Add padding-top to account for fixed header */}
            {children}
          </main>
          <JobQueue />
          <Toaster position="top-right" />
        </JobQueueProvider>
        /** */
      </body>
    </html>
  );
}