'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "./ui/button";
import { RefreshCw, Plus, Minus, Trash2, Save, Upload, Download, X, Check, PlusCircle, Link as LinkIcon, Type as TypeIcon, Edit2, Eye, Menu, ArrowRight } from 'lucide-react';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Dynamically import the ForceGraph3D component with SSR disabled
const ForceGraph3D = dynamic(
  () => import('react-force-graph-3d').then((mod) => mod.default),
  { ssr: false }
) as any; // Using 'any' as a temporary workaround for the type issue

interface Node {
  id: string;
  name: string;
  val: number;
  color: string;
  x?: number;
  y?: number;
  z?: number;
  fx?: number | null;
  fy?: number | null;
  fz?: number | null;
}

interface Link {
  id?: string;
  source: string;
  target: string;
  value: number;
  color: string;
  label?: string;
}

type Mode = 'view' | 'addNode' | 'addEdge' | 'edit';

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B97B2', '#E8F9FD', '#79DAE8', '#0AA1DD'
];

const generateRandomGraph = (nodeCount: number = 10) => {
  const nodes: Node[] = [];
  const links: Link[] = [];
  
  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    nodes.push({
      id: `node-${i}`,
      name: `Node ${i + 1}`,
      val: Math.random() * 10 + 5,
      color
    });
  }
  
  // Create links (approximately 1.5x the number of nodes)
  const linkCount = Math.floor(nodeCount * 1.5);
  const existingLinks = new Set();
  
  for (let i = 0; i < linkCount; i++) {
    let source, target;
    
    // Ensure we don't create duplicate links or self-loops
    do {
      source = Math.floor(Math.random() * nodeCount);
      target = Math.floor(Math.random() * nodeCount);
    } while (source === target || existingLinks.has(`${source}-${target}`));
    
    existingLinks.add(`${source}-${target}`);
    
    links.push({
      source: `node-${source}`,
      target: `node-${target}`,
      value: Math.random() * 5 + 1,
      color: 'rgba(200, 200, 200, 0.6)'
    });
  }
  
  return { nodes, links };
};

export default function GraphVisualizer() {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [nodeCount, setNodeCount] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('view');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [edgeStartNode, setEdgeStartNode] = useState<Node | null>(null);
  const [nodeName, setNodeName] = useState('');
  const [nodeColor, setNodeColor] = useState('#4F46E5');
  const [edgeLabel, setEdgeLabel] = useState('');
  const [edgeColor, setEdgeColor] = useState('#9CA3AF');
  const [graphName, setGraphName] = useState('My Graph');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fgRef = useRef<any>(null);
  
  const generateNewGraph = useCallback(() => {
    setIsLoading(true);
    const data = generateRandomGraph(nodeCount);
    setGraphData(data);
    setSelectedNode(null);
    setSelectedLink(null);
    setEdgeStartNode(null);
    setMode('view');
    // Small delay to ensure the graph has time to render
    setTimeout(() => setIsLoading(false), 300);
  }, [nodeCount]);
  
  const handleNodeClick = useCallback((node: Node) => {
    if (mode === 'addEdge') {
      if (!edgeStartNode) {
        // First node selected for edge
        setEdgeStartNode(node);
      } else if (edgeStartNode.id !== node.id) {
        // Second node selected, create edge
        const newLink: Link = {
          id: `link-${Date.now()}`,
          source: edgeStartNode.id,
          target: node.id,
          value: 1,
          color: edgeColor,
          label: edgeLabel || undefined
        };
        
        setGraphData(prev => ({
          ...prev,
          links: [...prev.links, newLink]
        }));
        
        setEdgeStartNode(null);
        setEdgeLabel('');
        setMode('view');
      }
    } else if (mode === 'edit') {
      setSelectedNode(node);
      setNodeName(node.name);
      setNodeColor(node.color);
    } else {
      // View mode - focus on node
      setSelectedNode(node);
      if (fgRef.current) {
        const distance = 100;
        const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, node.z || 0);
        fgRef.current.cameraPosition(
          { x: (node.x || 0) * distRatio, y: (node.y || 0) * distRatio, z: (node.z || 0) * distRatio },
          node,
          1000
        );
      }
    }
  }, [mode, edgeStartNode, edgeColor, edgeLabel]);
  
  const handleLinkClick = useCallback((link: Link) => {
    if (mode === 'edit') {
      setSelectedLink(link);
      setEdgeLabel(link.label || '');
      setEdgeColor(link.color);
    }
  }, [mode]);
  
  const handleBackgroundClick = useCallback(() => {
    if (mode === 'view') {
      setSelectedNode(null);
      setSelectedLink(null);
    } else if (mode === 'addNode') {
      // Add new node at clicked position
      if (fgRef.current) {
        const { x, y } = fgRef.current.screen2GraphCoords(
          fgRef.current.width / 2,
          fgRef.current.height / 2
        );
        
        const newNode: Node = {
          id: `node-${Date.now()}`,
          name: nodeName || `Node ${graphData.nodes.length + 1}`,
          val: 10,
          color: nodeColor,
          x,
          y,
          z: 0
        };
        
        setGraphData(prev => ({
          ...prev,
          nodes: [...prev.nodes, newNode]
        }));
        
        setNodeName('');
        setMode('view');
      }
    }
  }, [mode, nodeName, nodeColor, graphData.nodes.length]);
  
  const updateNode = useCallback(() => {
    if (!selectedNode) return;
    
    setGraphData(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === selectedNode.id 
          ? { ...node, name: nodeName || node.name, color: nodeColor }
          : node
      )
    }));
    
    setSelectedNode(null);
    setNodeName('');
    setMode('view');
  }, [selectedNode, nodeName, nodeColor]);
  
  const updateLink = useCallback(() => {
    if (!selectedLink) return;
    
    setGraphData(prev => ({
      ...prev,
      links: prev.links.map(link => 
        link.source === selectedLink.source && link.target === selectedLink.target
          ? { ...link, label: edgeLabel, color: edgeColor }
          : link
      )
    }));
    
    setSelectedLink(null);
    setEdgeLabel('');
    setMode('view');
  }, [selectedLink, edgeLabel, edgeColor]);
  
  const deleteSelected = useCallback(() => {
    if (selectedNode) {
      setGraphData(prev => ({
        nodes: prev.nodes.filter(node => node.id !== selectedNode.id),
        links: prev.links.filter(link => 
          link.source !== selectedNode.id && link.target !== selectedNode.id
        )
      }));
      setSelectedNode(null);
    } else if (selectedLink) {
      setGraphData(prev => ({
        ...prev,
        links: prev.links.filter(link => 
          !(link.source === selectedLink.source && link.target === selectedLink.target)
        )
      }));
      setSelectedLink(null);
    }
    setMode('view');
  }, [selectedNode, selectedLink]);
  
  useEffect(() => {
    generateNewGraph();
    
    // Handle window resize
    const handleResize = () => {
      if (fgRef.current) {
        fgRef.current.width(fgRef.current.parentElement?.clientWidth || 0);
        fgRef.current.height(fgRef.current.parentElement?.clientHeight || 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [generateNewGraph]);
  
  const handleZoomIn = () => {
    if (fgRef.current) {
      const distance = fgRef.current.cameraDistance();
      fgRef.current.cameraDistance(distance * 0.8, 1000);
    }
  };
  
  const handleZoomOut = () => {
    if (fgRef.current) {
      const distance = fgRef.current.cameraDistance();
      fgRef.current.cameraDistance(distance * 1.2, 1000);
    }
  };
  
  const saveGraph = useCallback(() => {
    const data = JSON.stringify({
      name: graphName,
      ...graphData,
      nodes: graphData.nodes.map(({ fx, fy, fz, ...rest }) => ({
        ...rest,
        fx: undefined,
        fy: undefined,
        fz: undefined
      }))
    }, null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${graphName.replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [graphData, graphName]);
  
  const loadGraph = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.nodes && Array.isArray(data.nodes)) {
          setGraphData({
            nodes: data.nodes,
            links: data.links || []
          });
          if (data.name) {
            setGraphName(data.name);
          }
          setMode('view');
          setSelectedNode(null);
          setSelectedLink(null);
        }
      } catch (error) {
        console.error('Error parsing graph file:', error);
        alert('Invalid graph file');
      }
    };
    reader.readAsText(file);
  }, []);
  
  const handleFileInputClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    // Reset the value to allow selecting the same file again
    (e.target as HTMLInputElement).value = '';
  }, []);

  return (
    <div className="w-full h-[calc(100vh-200px)] min-h-[500px] rounded-xl overflow-hidden relative bg-gray-900 border border-gray-800 flex flex-col">
      {/* Sidebar */}
      <div className={`absolute top-4 left-4 z-10 transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 w-80 border border-gray-800 shadow-xl max-h-[calc(100vh-100px)] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Graph Editor</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="nodes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="nodes">Nodes</TabsTrigger>
              <TabsTrigger value="edges">Edges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nodes" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="graphName">Graph Name</Label>
                <Input
                  id="graphName"
                  value={graphName}
                  onChange={(e) => setGraphName(e.target.value)}
                  placeholder="Enter graph name"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              
              <div className="space-y  -2">
                <Label>Mode</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={mode === 'view' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={() => setMode('view')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant={mode === 'addNode' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={() => setMode('addNode')}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Node
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={mode === 'addEdge' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={() => setMode('addEdge')}
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Add Edge
                  </Button>
                  <Button
                    variant={mode === 'edit' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={() => setMode('edit')}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
              
              {(mode === 'addNode' || (mode === 'edit' && selectedNode)) && (
                <div className="space-y-3 pt-2 border-t border-gray-800">
                  <h4 className="font-medium text-white">
                    {mode === 'addNode' ? 'Add New Node' : 'Edit Node'}
                  </h4>
                  <div className="space-y-2">
                    <Label htmlFor="nodeName">Name</Label>
                    <Input
                      id="nodeName"
                      value={nodeName}
                      onChange={(e) => setNodeName(e.target.value)}
                      placeholder="Node name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nodeColor">Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="nodeColor"
                        value={nodeColor}
                        onChange={(e) => setNodeColor(e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-400">{nodeColor.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={mode === 'addNode' ? handleBackgroundClick : updateNode}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {mode === 'addNode' ? 'Click to Add' : 'Update'}
                    </Button>
                    {mode === 'edit' && selectedNode && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={deleteSelected}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              )}
              
              {mode === 'addEdge' && (
                <div className="space-y-3 pt-2 border-t border-gray-800">
                  <h4 className="font-medium text-white">
                    {edgeStartNode ? 'Select Target Node' : 'Select Source Node'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {edgeStartNode 
                      ? `Source: ${edgeStartNode.name}`
                      : 'Click on a node to select the source'}
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="edgeLabel">Label (optional)</Label>
                    <Input
                      id="edgeLabel"
                      value={edgeLabel}
                      onChange={(e) => setEdgeLabel(e.target.value)}
                      placeholder="Edge label"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edgeColor">Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="edgeColor"
                        value={edgeColor}
                        onChange={(e) => setEdgeColor(e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-400">{edgeColor.toUpperCase()}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      setEdgeStartNode(null);
                      setMode('view');
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
              
              {mode === 'edit' && selectedLink && (
                <div className="space-y-3 pt-2 border-t border-gray-800">
                  <h4 className="font-medium text-white">Edit Edge</h4>
                  <div className="space-y-2">
                    <Label>Connection</Label>
                    <div className="text-sm text-gray-300 bg-gray-800 p-2 rounded">
                      {graphData.nodes.find(n => n.id === selectedLink.source)?.name} 
                      <ArrowRight className="h-4 w-4 inline mx-1" />
                      {graphData.nodes.find(n => n.id === selectedLink.target)?.name}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edgeLabel">Label</Label>
                    <Input
                      id="edgeLabel"
                      value={edgeLabel}
                      onChange={(e) => setEdgeLabel(e.target.value)}
                      placeholder="Edge label"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edgeColor">Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="edgeColor"
                        value={edgeColor}
                        onChange={(e) => setEdgeColor(e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-400">{edgeColor.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={updateLink}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={deleteSelected}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="edges" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Import/Export</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={saveGraph}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <input
                    type="file"
                    id="importGraph"
                    accept=".json"
                    onChange={loadGraph}
                    onClick={handleFileInputClick}
                    className="hidden"
                  />
                  <label
                    htmlFor="importGraph"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full cursor-pointer text-center"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Generate</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={nodeCount}
                    onChange={(e) => setNodeCount(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="bg-gray-800 border-gray-700 text-white w-20"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={generateNewGraph}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Random Graph
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Stats</Label>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Nodes: {graphData.nodes.length}</div>
                  <div>Edges: {graphData.links.length}</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="flex-1 relative w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <ForceGraph3D
            ref={fgRef}
            graphData={graphData}
            nodeLabel="name"
            nodeAutoColorBy="color"
            linkColor={(link: any) => link.color}
            linkWidth={1.5}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.01}
            nodeRelSize={6}
            nodeResolution={16}
            backgroundColor="rgba(0, 0, 0, 0)"
            onNodeClick={handleNodeClick}
            onLinkClick={handleLinkClick}
            onBackgroundClick={handleBackgroundClick}
            nodeColor={(node: any) => 
              (selectedNode && node.id === selectedNode.id) 
                ? '#F43F5E' 
                : (edgeStartNode && node.id === edgeStartNode.id) 
                  ? '#3B82F6' 
                  : node.color
            }
            linkDirectionalParticleColor={(link: any) => link.color}
            linkDirectionalParticleResolution={5}
            linkDirectionalParticleWidth={(link: any) => 
              (selectedLink && 
               link.source.id === (selectedLink as any).source && 
               link.target.id === (selectedLink as any).target) ? 4 : 2
            }
            linkDirectionalParticleSpeed={0.01}
            linkDirectionalParticles={(link: any) => 
              (selectedLink && 
               link.source.id === (selectedLink as any).source && 
               link.target.id === (selectedLink as any).target) ? 4 : 0
            }
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.1}
            linkLabel={(link: any) => {
              const l = link as Link;
              const sourceNode = graphData.nodes.find(n => n.id === l.source) || { name: l.source };
              const targetNode = graphData.nodes.find(n => n.id === l.target) || { name: l.target };
              return `<div class="bg-gray-900 text-white text-xs p-2 rounded border border-gray-700">
                ${l.label || `${sourceNode.name} → ${targetNode.name}`}
              </div>`;
            }}
            nodeLabel={(node: any) => {
              const n = node as Node;
              return `<div class="bg-gray-900 text-white text-xs p-2 rounded border border-gray-700">
                <div class="font-semibold">${n.name}</div>
                <div class="text-gray-400">ID: ${n.id}</div>
              </div>`;
            }}
          />
        )}
        
        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {!isSidebarOpen && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsSidebarOpen(true)}
              className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleZoomIn}
            className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800"
            title="Zoom In"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleZoomOut}
            className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800"
            title="Zoom Out"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={generateNewGraph}
            className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:bg-gray-800"
            disabled={isLoading}
            title="Generate Random Graph"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      {/* Node count controls - Moved to sidebar */}
    </div>
  );
}
