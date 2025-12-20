'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SaveIcon, XIcon, PlusIcon, LightningBoltIcon, ArrowRightIcon } from '@heroicons/react/outline';

const nodeTypes = [
  { id: 'trigger', name: 'Trigger', description: 'Start your workflow with an event', icon: LightningBoltIcon },
  { id: 'ai_agent', name: 'AI Agent', description: 'Process data with AI', icon: LightningBoltIcon },
  { id: 'action', name: 'Action', description: 'Perform an action', icon: ArrowRightIcon },
  { id: 'condition', name: 'Condition', description: 'Add conditional logic', icon: LightningBoltIcon },
  { id: 'api_call', name: 'API Call', description: 'Call an external API', icon: LightningBoltIcon },
];

type Node = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
};

type Edge = {
  id: string;
  source: string;
  target: string;
};

export default function NewWorkflowPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      alert('Please enter a workflow name');
      return;
    }

    setIsSaving(true);
    try {
      // TODO: Implement actual save to backend
      console.log('Saving workflow:', { name, description, nodes, edges });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to workflows list after save
      router.push('/workflows');
    } catch (error) {
      console.error('Failed to save workflow:', error);
      alert('Failed to save workflow. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: type },
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setEdges(edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const connectNodes = (sourceId: string, targetId: string) => {
    const newEdge = {
      id: `edge-${sourceId}-${targetId}`,
      source: sourceId,
      target: targetId,
    };
    setEdges([...edges, newEdge]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              <input
                type="text"
                className="border-0 text-lg font-medium text-gray-900 focus:ring-0 p-0"
                placeholder="Workflow name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </h1>
          </div>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <input
                type="text"
                className="border-0 text-sm text-gray-500 focus:ring-0 p-0 w-full"
                placeholder="Add a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4 space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => router.push('/workflows')}
          >
            <XIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSave}
            disabled={isSaving}
          >
            <SaveIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Node Palette */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Nodes</h2>
          <div className="space-y-2">
            {nodeTypes.map((nodeType) => (
              <button
                key={nodeType.id}
                className="group relative w-full flex items-center p-3 text-sm font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => addNode(nodeType.id)}
              >
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <nodeType.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="ml-4 text-left">
                  <span className="text-gray-900 font-medium">{nodeType.name}</span>
                  <span className="text-gray-500 block">{nodeType.description}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="flex-1 bg-gray-100 overflow-auto relative">
          {nodes.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
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
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No nodes added</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding nodes from the panel on the left.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* This is a simplified representation. In a real app, you'd use a library like React Flow */}
              <svg className="w-full h-full">
                {/* Draw edges */}
                {edges.map((edge) => {
                  const sourceNode = nodes.find(n => n.id === edge.source);
                  const targetNode = nodes.find(n => n.id === edge.target);
                  
                  if (!sourceNode || !targetNode) return null;
                  
                  const startX = sourceNode.position.x + 100; // Assuming node width is 200px
                  const startY = sourceNode.position.y + 25;  // Middle of the node
                  const endX = targetNode.position.x;
                  const endY = targetNode.position.y + 25;    // Middle of the target node
                  
                  return (
                    <line
                      key={edge.id}
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="#94a3b8"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })}
                
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                </defs>
              </svg>
              
              {/* Render nodes */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute w-48 bg-white rounded-lg shadow-md p-4 border-2 ${
                    selectedNode === node.id ? 'border-indigo-500' : 'border-transparent'
                  }`}
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`,
                    cursor: 'move',
                  }}
                  onClick={() => setSelectedNode(node.id)}
                  draggable
                  onDragStart={(e) => {
                    // Store initial position for drag calculations
                    e.dataTransfer.setData('application/node-id', node.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const sourceId = e.dataTransfer.getData('application/node-id');
                    if (sourceId && sourceId !== node.id) {
                      connectNodes(sourceId, node.id);
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-900">
                      {nodeTypes.find(nt => nt.id === node.type)?.name || node.type}
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNode(node.id);
                      }}
                    >
                      <XIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {nodeTypes.find(nt => nt.id === node.type)?.description}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    Click to configure
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Node Configuration Panel */}
        {selectedNode && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Node Settings</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setSelectedNode(null)}
              >
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="node-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="node-name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter node name"
                />
              </div>

              <div>
                <label htmlFor="node-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="node-description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter node description"
                  defaultValue={''}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <p className="mt-1 text-sm text-gray-500">
                  {nodeTypes.find(nt => nt.id === nodes.find(n => n.id === selectedNode)?.type)?.name}
                </p>
              </div>

              {/* Dynamic form based on node type would go here */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900">Configuration</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Node-specific configuration options would appear here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
