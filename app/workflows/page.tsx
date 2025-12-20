'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Workflow = {
  id: string;
  name: string;
  description: string;
  lastRun: string | null;
  status: 'active' | 'inactive' | 'error';
};

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Customer Support Bot',
      description: 'Automated responses to common support queries',
      lastRun: '2023-12-19T14:30:00Z',
      status: 'active',
    },
    {
      id: '2',
      name: 'Lead Qualification',
      description: 'Qualify and route new leads',
      lastRun: '2023-12-18T09:15:00Z',
      status: 'active',
    },
  ]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
        <Link
          href="/workflows/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Workflow
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {workflows.length > 0 ? (
            workflows.map((workflow) => (
              <li key={workflow.id}>
                <Link href={`/workflows/${workflow.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {workflow.name}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          workflow.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : workflow.status === 'error' 
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status === 'active' ? 'Active' : workflow.status === 'error' ? 'Error' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {workflow.description}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Last run{' '}
                          <time dateTime={workflow.lastRun || ''}>
                            {formatDate(workflow.lastRun)}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No workflows</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new workflow.
              </p>
              <div className="mt-6">
                <Link
                  href="/workflows/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Workflow
                </Link>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
