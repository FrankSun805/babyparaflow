import React, { useRef, useState, useEffect, useMemo } from 'react';
import { CanvasNode, NodeType, CanvasView, ScreenData, CanvasEdge, CanvasTool, CanvasSection, CanvasPin, IntegrationData } from '../../types';
import { DocumentNode } from './nodes/DocumentNode';
import { WhiteboardNode } from './nodes/WhiteboardNode';
import { ScreenNode } from './nodes/ScreenNode';
import { TableNode } from './nodes/TableNode';
import { APINode } from './nodes/APINode';
import { IntegrationNode } from './nodes/IntegrationNode';
import { PinMarker } from './PinMarker';
import { MentionBadge } from './MentionBadge';
import { MOBILE_SCREEN_WIDTH, MOBILE_SCREEN_HEIGHT, WEB_SCREEN_WIDTH, WEB_SCREEN_HEIGHT, MIN_ZOOM, MAX_ZOOM, SECTION_IDS } from '../../constants';
import { Plus, Minus, FileText, GitBranch, Smartphone, GripHorizontal, MousePointer2, Hand, BoxSelect, MapPin, Table as TableIcon, Globe, Zap, Database } from 'lucide-react';

interface CanvasContainerProps {
  nodes: CanvasNode[];
  edges?: CanvasEdge[];
  pins?: CanvasPin[];
  view: CanvasView;
  onViewChange: (view: CanvasView) => void;
  onNodeMove: (id: string, x: number, y: number) => void;
  onBatchNodeMove: (updates: {id: string, dx: number, dy: number}[]) => void;
  onNodeSectionChange: (nodeId: string, sectionId: string | undefined) => void;
  onAddNode: (node: CanvasNode) => void;
  onEditNode: (id: string) => void;
  onRunNode: (id: string) => void;
  onAddPinClick?: (x: number, y: number) => void;
  onDeletePin?: (id: string) => void;
  onDeleteNodes?: (ids: string[]) => void;
  isCanvasSelectionMode?: boolean;
  mentionedNodeIds?: string[];
  onNodeMentionSelect?: (nodeId: string) => void;
  onRemoveMention?: (nodeId: string) => void;
}

interface SectionBounds {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

type SectionTheme = 'blue' | 'purple' | 'emerald' | 'orange' | 'rose' | 'slate';

const THEMES: Record<SectionTheme, { border: string; bg: string; badge: string; dot: string }> = {
  blue: { border: 'border-blue-200/50', bg: 'bg-blue-50/30', badge: 'bg-blue-100 text-blue-600', dot: 'bg-blue-500' },
  purple: { border: 'border-purple-200/50', bg: 'bg-purple-50/30', badge: 'bg-purple-100 text-purple-600', dot: 'bg-purple-500' },
  emerald: { border: 'border-brand-200/60', bg: 'bg-brand-50/30', badge: 'bg-brand-100 text-moxt-brand-7', dot: 'bg-moxt-brand-7' },
  orange: { border: 'border-orange-200/50', bg: 'bg-orange-50/30', badge: 'bg-orange-100 text-orange-600', dot: 'bg-orange-500' },
  rose: { border: 'border-rose-200/50', bg: 'bg-rose-50/30', badge: 'bg-rose-100 text-rose-600', dot: 'bg-rose-500' },
  slate: { border: 'border-moxt-line-1', bg: 'bg-moxt-fill-1/30', badge: 'bg-moxt-fill-2 text-moxt-text-2', dot: 'bg-moxt-text-3' },
};

// Helper to get dimensions for a node type
const getNodeDimensions = (node: CanvasNode) => {
    if (node.width && node.height) return { width: node.width, height: node.height }; // Manual override

    if (node.type === NodeType.SCREEN) {
         const screenData = node.data as ScreenData;
         const isWeb = screenData?.variant === 'web';
         const width = isWeb ? WEB_SCREEN_WIDTH : MOBILE_SCREEN_WIDTH;
         const height = (isWeb ? WEB_SCREEN_HEIGHT : MOBILE_SCREEN_HEIGHT) + 80; // +80 for header/shadows
         return { width, height };
    } else if (node.type === NodeType.WHITEBOARD) {
         return { width: 850, height: 700 }; // Increased height for header
    } else if (node.type === NodeType.DOCUMENT) {
         return { width: 450, height: 550 }; // Increased height for header
    } else if (node.type === NodeType.TABLE) {
        return { width: 280, height: 320 };
    } else if (node.type === NodeType.API) {
        return { width: 320, height: 240 };
    } else if (node.type === NodeType.INTEGRATION) {
        return { width: 320, height: 240 };
    }
    return { width: 400, height: 400 };
};

// Helper to calculate bounding box for a group of nodes
const getSectionBounds = (nodes: CanvasNode[], padding = 120): Omit<SectionBounds, 'id'> | null => {
    if (nodes.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    nodes.forEach(node => {
        const { width, height } = getNodeDimensions(node);
        
        if (node.x < minX) minX = node.x;
        if (node.y < minY) minY = node.y;
        if (node.x + width > maxX) maxX = node.x + width;
        if (node.y + height > maxY) maxY = node.y + height;
    });

    return {
        x: minX - padding,
        y: minY - padding,
        width: (maxX - minX) + (padding * 2),
        height: (maxY - minY) + (padding * 2)
    };
};

const SectionContainer = ({ 
    bounds, 
    title, 
    theme, 
    icon: Icon,
    isSelected,
    onDragStart,
    onClick,
    onTitleChange,
    onThemeChange
}: { 
    bounds: Omit<SectionBounds, 'id'> | null, 
    title: string, 
    theme: SectionTheme, 
    icon: any,
    isSelected?: boolean,
    onDragStart: (e: React.MouseEvent) => void,
    onClick?: () => void,
    onTitleChange: (val: string) => void,
    onThemeChange: (val: SectionTheme) => void
}) => {
    if (!bounds) return null;
    
    const themeStyles = THEMES[theme];

    return (
        <div 
            className={`canvas-section absolute rounded-[48px] border-2 ${themeStyles.border} ${themeStyles.bg} backdrop-blur-[2px] transition-all duration-300 group cursor-pointer
                ${isSelected ? 'ring-4 ring-violet-400/50 border-violet-400' : ''}
            `}
            style={{
                left: bounds.x,
                top: bounds.y,
                width: bounds.width,
                height: bounds.height,
                zIndex: 0 
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
        >
            {/* Drag Handle / Header */}
            <div 
                className="absolute -top-16 left-6 flex flex-col items-start gap-2"
            >
                 <div 
                    className="flex items-center gap-4 cursor-grab active:cursor-grabbing p-2 rounded-xl hover:bg-white/40 transition-colors"
                    onMouseDown={onDragStart}
                 >
                    <div className={`p-3 rounded-xl ${themeStyles.badge} shadow-sm`}>
                        <Icon size={24} />
                    </div>
                    
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="bg-transparent border-none outline-none text-2xl font-bold text-slate-500 uppercase tracking-wider placeholder-slate-300 focus:text-slate-800 transition-colors w-auto min-w-[200px]"
                    />

                    <GripHorizontal className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity ml-2" size={24} />
                 </div>

                 {/* Color Picker (Visible on hover of parent group) */}
                 <div className="flex items-center gap-2 ml-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80 backdrop-blur px-2 py-1.5 rounded-full shadow-sm border border-slate-100">
                     {(Object.keys(THEMES) as SectionTheme[]).map((t) => (
                         <button
                            key={t}
                            onClick={() => onThemeChange(t)}
                            className={`w-4 h-4 rounded-full ${THEMES[t].dot} ${theme === t ? 'ring-2 ring-offset-1 ring-slate-300' : 'hover:scale-110'} transition-all`}
                            title={t}
                         />
                     ))}
                 </div>
            </div>
        </div>
    );
};

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
    nodes,
    edges = [],
    pins = [],
    view,
    onViewChange,
    onNodeMove,
    onBatchNodeMove,
    onNodeSectionChange,
    onAddNode,
    onEditNode,
    onRunNode,
    onAddPinClick,
    onDeletePin,
    onDeleteNodes,
    isCanvasSelectionMode = false,
    mentionedNodeIds = [],
    onNodeMentionSelect,
    onRemoveMention
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- Interaction State ---
  const [activeTool, setActiveTool] = useState<CanvasTool>('SELECT');
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  
  // Drawing State
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [ghostBox, setGhostBox] = useState<{ x: number, y: number, w: number, h: number } | null>(null);

  // RAF refs for smooth animation
  const rafRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);

  // Section Metadata State
  const [sectionSettings, setSectionSettings] = useState<Record<string, { title: string, theme: SectionTheme }>>({
      [SECTION_IDS.DOCUMENT]: { title: 'Documents & Specs', theme: 'blue' },
      [SECTION_IDS.CHART]: { title: 'Logic & Flow', theme: 'purple' },
      [SECTION_IDS.SCREEN]: { title: 'Prototype', theme: 'emerald' },
      [SECTION_IDS.BACKEND]: { title: 'Backend Development', theme: 'orange' },
      // 5个流程Section
      [SECTION_IDS.FLOW_AUTH]: { title: 'Section 1: 登录注册流程', theme: 'purple' },
      [SECTION_IDS.FLOW_SEARCH]: { title: 'Section 2: 搜索下单流程', theme: 'emerald' },
      [SECTION_IDS.FLOW_LEARN]: { title: 'Section 3: 我的学习流程', theme: 'orange' },
      [SECTION_IDS.FLOW_PROFILE]: { title: 'Section 4: 个人中心流程', theme: 'rose' },
      [SECTION_IDS.FLOW_LIVE]: { title: 'Section 5: 直播课程流程', theme: 'blue' },
  });

  const [manualSections, setManualSections] = useState<CanvasSection[]>([]);

  // Node/Section Dragging State
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [draggedSectionId, setDraggedSectionId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Selection & Hover State
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);  // 选中的 Section
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [mouseDownPos, setMouseDownPos] = useState<{ x: number, y: number } | null>(null);

  // Calculate Auto Sections
  const docNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.DOCUMENT), [nodes]);
  const chartNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.CHART), [nodes]);
  const screenNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.SCREEN), [nodes]);
  const backendNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.BACKEND), [nodes]);
  
  // 5个流程Section节点
  const authFlowNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.FLOW_AUTH), [nodes]);
  const searchFlowNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.FLOW_SEARCH), [nodes]);
  const learnFlowNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.FLOW_LEARN), [nodes]);
  const profileFlowNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.FLOW_PROFILE), [nodes]);
  const liveFlowNodes = useMemo(() => nodes.filter(n => n.sectionId === SECTION_IDS.FLOW_LIVE), [nodes]);

  const docBounds = useMemo(() => getSectionBounds(docNodes), [docNodes]);
  const chartBounds = useMemo(() => getSectionBounds(chartNodes), [chartNodes]);
  const screenBounds = useMemo(() => getSectionBounds(screenNodes), [screenNodes]);
  const backendBounds = useMemo(() => getSectionBounds(backendNodes, 120), [backendNodes]);
  
  // 5个流程Section边界
  const authFlowBounds = useMemo(() => getSectionBounds(authFlowNodes, 80), [authFlowNodes]);
  const searchFlowBounds = useMemo(() => getSectionBounds(searchFlowNodes, 80), [searchFlowNodes]);
  const learnFlowBounds = useMemo(() => getSectionBounds(learnFlowNodes, 80), [learnFlowNodes]);
  const profileFlowBounds = useMemo(() => getSectionBounds(profileFlowNodes, 80), [profileFlowNodes]);
  const liveFlowBounds = useMemo(() => getSectionBounds(liveFlowNodes, 80), [liveFlowNodes]);

  // Helpers
  const getCanvasCoords = (clientX: number, clientY: number) => {
      return {
          x: (clientX - view.x) / view.scale,
          y: (clientY - view.y) / view.scale
      };
  };

  const updateSectionSettings = (id: string, updates: Partial<{ title: string, theme: SectionTheme }>) => {
      if (SECTION_IDS[id as keyof typeof SECTION_IDS]) {
        setSectionSettings(prev => ({
            ...prev,
            [id]: { ...prev[id], ...updates }
        }));
      } else {
        setManualSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
      }
  };

  // --- Zoom Helpers ---
  const zoomIn = () => {
    const newScale = Math.min(MAX_ZOOM, view.scale + 0.1);
    const container = containerRef.current;
    if (container) {
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;
      const canvasX = (centerX - view.x) / view.scale;
      const canvasY = (centerY - view.y) / view.scale;
      const newX = centerX - canvasX * newScale;
      const newY = centerY - canvasY * newScale;
      onViewChange({ x: newX, y: newY, scale: newScale });
    } else {
      onViewChange({ ...view, scale: newScale });
    }
  };

  const zoomOut = () => {
    const newScale = Math.max(MIN_ZOOM, view.scale - 0.1);
    const container = containerRef.current;
    if (container) {
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;
      const canvasX = (centerX - view.x) / view.scale;
      const canvasY = (centerY - view.y) / view.scale;
      const newX = centerX - canvasX * newScale;
      const newY = centerY - canvasY * newScale;
      onViewChange({ x: newX, y: newY, scale: newScale });
    } else {
      onViewChange({ ...view, scale: newScale });
    }
  };

  // --- Shortcuts ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) return;

      if (e.key === '=' || e.key === '+') { e.preventDefault(); zoomIn(); }
      if (e.key === '-' || e.key === '_') { e.preventDefault(); zoomOut(); }

      if (e.code === 'Space') { setIsSpacePressed(true); }
      if (e.key === 'v' || e.key === 'V') { setActiveTool('SELECT'); }
      if (e.key === 'h' || e.key === 'H') { setActiveTool('HAND'); }
      if (e.key === 'p' || e.key === 'P') { setActiveTool('PIN'); }

      // Selection shortcuts
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedNodeIds([]);
        setSelectedSectionId(null);
        // Note: Canvas selection mode exit will be handled by App.tsx
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        if (selectedNodeIds.length > 0) {
          // Delete selected nodes
          onDeleteNodes?.(selectedNodeIds);
          setSelectedNodeIds([]);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Space') { setIsSpacePressed(false); }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, [view, selectedNodeIds]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const effectiveTool = isSpacePressed ? 'HAND' : activeTool;

  // Handle Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const canvasPos = getCanvasCoords(e.clientX, e.clientY);

    // Interaction Check (ignore UI elements but not for PIN tool which can click anywhere)
    if (target.closest('button') || target.closest('input') || target.closest('textarea')) {
        // Exception: If using PIN tool, we might want to pin specific buttons, but for now prevent UI interference
        return;
    }

    // Record mouse down position for click vs drag distinction
    setMouseDownPos({ x: e.clientX, y: e.clientY });

    // 1. PIN Logic
    if (effectiveTool === 'PIN') {
        onAddPinClick?.(canvasPos.x, canvasPos.y);
        // Optional: Switch back to select or stay in pin mode?
        // Let's stay in PIN mode for multiple pins, user must switch back manually.
        return;
    }

    // 2. Drawing Logic
    if (['CREATE_SECTION', 'CREATE_DOCUMENT', 'CREATE_CHART', 'CREATE_TABLE', 'CREATE_API', 'CREATE_INTEGRATION'].includes(effectiveTool)) {
        setIsDrawing(true);
        setDrawStart(canvasPos);
        setGhostBox({ x: canvasPos.x, y: canvasPos.y, w: 0, h: 0 });
        return;
    }

    // 3. Node Interaction (Canvas Selection Mode or SELECT tool)
    const nodeEl = target.closest('.canvas-node');

    // Canvas Selection Mode - just select the node for mentioning
    if (nodeEl && isCanvasSelectionMode) {
        const nodeId = nodeEl.getAttribute('data-id');
        if (nodeId) {
            e.preventDefault();
            e.stopPropagation();
            onNodeMentionSelect?.(nodeId);
        }
        return;
    }

    // Normal SELECT tool interaction
    if (nodeEl && effectiveTool === 'SELECT') {
        const nodeId = nodeEl.getAttribute('data-id');
        if (nodeId) {
            e.preventDefault();
            e.stopPropagation();
            const node = nodes.find(n => n.id === nodeId);
            if (node) {
                // If node is not selected, select it (or add to selection with Shift)
                if (!selectedNodeIds.includes(nodeId)) {
                    if (e.shiftKey) {
                        // Add to selection
                        setSelectedNodeIds(prev => [...prev, nodeId]);
                    } else {
                        // Replace selection
                        setSelectedNodeIds([nodeId]);
                    }
                } else if (e.shiftKey) {
                    // If Shift is pressed and node is already selected, deselect it
                    setSelectedNodeIds(prev => prev.filter(id => id !== nodeId));
                }
                // Start dragging
                setDraggedNodeId(nodeId);
                setDragOffset({ x: canvasPos.x - node.x, y: canvasPos.y - node.y });
            }
        }
        return;
    }

    // 4. Canvas Background Click (deselect when clicking empty space)
    if (effectiveTool === 'SELECT') {
        // Will be handled in mouseUp if it's a click (not drag)
    }

    // 5. Panning (Hand Tool or Canvas Click)
    setIsDraggingCanvas(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleSectionDragStart = (e: React.MouseEvent, sectionId: string) => {
      if (effectiveTool !== 'SELECT') return;
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'input') return;
      
      e.preventDefault();
      e.stopPropagation();
      setDraggedSectionId(sectionId);
      const canvasPos = getCanvasCoords(e.clientX, e.clientY);
      setDragOffset({ x: canvasPos.x, y: canvasPos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Cancel any pending RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Store event properties (React events are pooled)
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Use RAF to sync with browser refresh rate
    rafRef.current = requestAnimationFrame(() => {
      const currentPos = getCanvasCoords(clientX, clientY);

      // Drawing
      if (isDrawing && ghostBox) {
          const w = currentPos.x - drawStart.x;
          const h = currentPos.y - drawStart.y;
          setGhostBox({
              x: w < 0 ? currentPos.x : drawStart.x,
              y: h < 0 ? currentPos.y : drawStart.y,
              w: Math.abs(w),
              h: Math.abs(h)
          });
          return;
      }

      // Panning
      if (isDraggingCanvas) {
        const dx = clientX - lastMousePos.x;
        const dy = clientY - lastMousePos.y;
        onViewChange({ ...view, x: view.x + dx, y: view.y + dy });
        setLastMousePos({ x: clientX, y: clientY });
        return;
      }

      // Dragging nodes
      if (draggedNodeId) {
          const draggedNode = nodes.find(n => n.id === draggedNodeId);
          if (!draggedNode) return;

          // If dragged node is in selection, move all selected nodes
          if (selectedNodeIds.includes(draggedNodeId) && selectedNodeIds.length > 1) {
              // Batch move all selected nodes
              const newX = currentPos.x - dragOffset.x;
              const newY = currentPos.y - dragOffset.y;
              const dx = newX - draggedNode.x;
              const dy = newY - draggedNode.y;

              const updates = selectedNodeIds.map(id => ({
                  id,
                  dx,
                  dy
              }));
              onBatchNodeMove(updates);
          } else {
              // Single node move
              onNodeMove(draggedNodeId, currentPos.x - dragOffset.x, currentPos.y - dragOffset.y);
          }
      }

      if (draggedSectionId) {
          const dx = currentPos.x - dragOffset.x;
          const dy = currentPos.y - dragOffset.y;

          if (dx !== 0 || dy !== 0) {
              // Check if manual section
              const manualSec = manualSections.find(s => s.id === draggedSectionId);
              if (manualSec) {
                  setManualSections(prev => prev.map(s => s.id === draggedSectionId ? { ...s, x: s.x + dx, y: s.y + dy } : s));
              } else {
                  // Auto section - move all nodes in it
                  const sectionNodes = nodes.filter(n => n.sectionId === draggedSectionId);
                  if (sectionNodes.length > 0) {
                      const updates = sectionNodes.map(n => ({ id: n.id, dx, dy }));
                      onBatchNodeMove(updates);
                  }
              }
              setDragOffset({ x: currentPos.x, y: currentPos.y });
          }
      }
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // Check if it was a click (not drag) - distance < 5px
    const wasClick = mouseDownPos &&
      Math.abs(e.clientX - mouseDownPos.x) < 5 &&
      Math.abs(e.clientY - mouseDownPos.y) < 5;

    if (isDrawing && ghostBox) {
        // Finalize Creation
        if (ghostBox.w > 50 && ghostBox.h > 50) {
            if (effectiveTool === 'CREATE_SECTION') {
                const newSection: CanvasSection = {
                    id: `sec-${Date.now()}`,
                    x: ghostBox.x,
                    y: ghostBox.y,
                    width: ghostBox.w,
                    height: ghostBox.h,
                    title: 'New Section',
                    theme: 'slate'
                };
                setManualSections(prev => [...prev, newSection]);
            } else {
                let type = NodeType.WHITEBOARD;
                let title = 'New Node';
                let data: any = { elements: [] };

                if (effectiveTool === 'CREATE_DOCUMENT') {
                    type = NodeType.DOCUMENT;
                    title = 'New Document';
                    data = { content: '' };
                } else if (effectiveTool === 'CREATE_CHART') {
                    type = NodeType.WHITEBOARD;
                    title = 'New Chart';
                    data = { elements: [] };
                } else if (effectiveTool === 'CREATE_TABLE') {
                    type = NodeType.TABLE;
                    title = 'New Table';
                    data = { fields: [] };
                } else if (effectiveTool === 'CREATE_API') {
                    type = NodeType.API;
                    title = 'New Endpoint';
                    data = { method: 'GET', path: '/api/resource', params: [] };
                } else if (effectiveTool === 'CREATE_INTEGRATION') {
                    type = NodeType.INTEGRATION;
                    title = 'New Integration';
                    data = { provider: 'New Service', category: 'Email', description: '', requiredKeys: [] };
                }

                const newNode: CanvasNode = {
                    id: `node-${Date.now()}`,
                    type,
                    x: ghostBox.x,
                    y: ghostBox.y,
                    width: ghostBox.w,
                    height: ghostBox.h,
                    title,
                    status: 'done',
                    data
                };
                onAddNode(newNode);
            }
        }
        setIsDrawing(false);
        setGhostBox(null);
        setActiveTool('SELECT'); // Reset to Select after draw
    }

    // Handle click on canvas background (deselect all)
    if (wasClick && !draggedNodeId && effectiveTool === 'SELECT' && !e.shiftKey) {
        const target = e.target as HTMLElement;
        // Check if clicked on canvas background (not on a node or section)
        if (!target.closest('.canvas-node') && !target.closest('.canvas-section')) {
            setSelectedNodeIds([]);
            setSelectedSectionId(null);
        }
    }

    setIsDraggingCanvas(false);
    setDraggedNodeId(null);
    setDraggedSectionId(null);
    setMouseDownPos(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, view.scale - e.deltaY * 0.001));
      
      // Zoom around viewport center (not mouse position)
      const container = containerRef.current;
      if (container) {
        const centerX = container.clientWidth / 2;
        const centerY = container.clientHeight / 2;
        
        // Calculate canvas point at viewport center before zoom
        const canvasX = (centerX - view.x) / view.scale;
        const canvasY = (centerY - view.y) / view.scale;
        
        // Calculate new view position to keep canvas point at viewport center
        const newX = centerX - canvasX * newScale;
        const newY = centerY - canvasY * newScale;
        
        onViewChange({ x: newX, y: newY, scale: newScale });
      } else {
      onViewChange({ ...view, scale: newScale });
      }
    } else {
      onViewChange({ ...view, x: view.x - e.deltaX, y: view.y - e.deltaY });
    }
  };

  // Edge Rendering Logic - 从点击热点到目标屏幕（只有选中源节点时才显示）
  const renderEdges = () => {
    const edgeElements = edges.map(edge => {
        const fromNode = nodes.find(n => n.id === edge.fromNode);
        const toNode = nodes.find(n => n.id === edge.toNode);
        
        if (!fromNode || !toNode) return null;

        // 只有当源节点被选中、或节点所属 Section 被选中时才显示连线
        const isFromSelected = selectedNodeIds.includes(edge.fromNode);
        const isToSelected = selectedNodeIds.includes(edge.toNode);
        const isHovered = hoveredNodeId === edge.fromNode;
        
        // 检查节点是否属于选中的 Section
        const isFromNodeInSelectedSection = selectedSectionId && fromNode.sectionId === selectedSectionId;
        const isToNodeInSelectedSection = selectedSectionId && toNode.sectionId === selectedSectionId;
        const isSectionSelected = isFromNodeInSelectedSection || isToNodeInSelectedSection;
        
        // 不显示连线的条件：节点没被选中、Section 没被选中、且源节点没被 hover
        if (!isFromSelected && !isToSelected && !isSectionSelected && !isHovered) return null;

        const fromDim = getNodeDimensions(fromNode);
        const toDim = getNodeDimensions(toNode);

        // 计算手机屏幕内容区域的边界
        // ScreenNode 结构:
        // - header (48px): 标题栏和按钮
        // - 手机边框 border-4 (4px)
        // - 顶部刘海 h-7 (28px)
        // - 状态栏 h-6 (24px)
        // - 内容区域 flex-1
        // - 底部指示条 h-9 (36px)
        const HEADER_HEIGHT = 48;      // 顶部标题栏和按钮
        const NOTCH = 28;              // 手机顶部刘海 (h-7)
        const STATUS_BAR = 24;         // 状态栏时间显示 (h-6)
        const HOME_INDICATOR = 36;     // 手机底部指示条 (h-9)
        const BORDER = 4;              // 边框宽度
        
        // 内容区域的顶部偏移（从节点顶部开始计算）
        const contentTop = HEADER_HEIGHT + BORDER + NOTCH + STATUS_BAR;
        // 内容区域的高度（手机边框高度 - 边框 - 刘海 - 状态栏 - 底部指示条）
        const contentHeight = MOBILE_SCREEN_HEIGHT - BORDER * 2 - NOTCH - STATUS_BAR - HOME_INDICATOR;
        const contentWidth = MOBILE_SCREEN_WIDTH - BORDER * 2;
        
        // 屏幕内容区域的起始 X 位置
        const contentLeft = (fromDim.width - MOBILE_SCREEN_WIDTH) / 2 + BORDER;

        // 计算起点位置（如果有热点锚点则使用，否则用右边中心）
        let fromPoint = {
            x: fromNode.x + fromDim.width,  // 默认从右边出发
            y: fromNode.y + fromDim.height / 2
        };
        
        if (edge.fromAnchor) {
            // anchor 坐标是相对于手机屏幕内容区域的百分比
            fromPoint = {
                x: fromNode.x + contentLeft + contentWidth * edge.fromAnchor.x,
                y: fromNode.y + contentTop + contentHeight * edge.fromAnchor.y
            };
        }

        // 目标点：目标屏幕的左边中心（指向手机屏幕内容区域）
        const toContentLeft = (toDim.width - MOBILE_SCREEN_WIDTH) / 2;
        const toContentTop = HEADER_HEIGHT + BORDER + STATUS_BAR;
        const toContentHeight = MOBILE_SCREEN_HEIGHT - STATUS_BAR - HOME_INDICATOR;
        
        const toPoint = {
            x: toNode.x + toContentLeft,
            y: toNode.y + toContentTop + toContentHeight / 2
        };

        // 计算贝塞尔曲线控制点
        const deltaX = toPoint.x - fromPoint.x;
        const controlOffset = Math.min(Math.abs(deltaX) * 0.4, 150);
        const cp1 = { x: fromPoint.x + controlOffset, y: fromPoint.y };
        const cp2 = { x: toPoint.x - controlOffset, y: toPoint.y };
        const pathData = `M ${fromPoint.x} ${fromPoint.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${toPoint.x} ${toPoint.y}`;

        // 连线样式 - 选中时更明显
        const isActive = isFromSelected;
        const stroke = isActive ? '#7c3aed' : '#a78bfa'; // 选中时用更深的紫色
        const strokeWidth = isActive ? 2.5 : 2;
        const strokeOpacity = isActive ? 1 : 0.6;

        return (
            <g key={edge.id} className="transition-opacity duration-200">
                {/* 连线 */}
                <path 
                  d={pathData} 
                  stroke={stroke} 
                  strokeWidth={strokeWidth} 
                  fill="none" 
                  strokeLinecap="round"
                  strokeDasharray={isActive ? "0" : "6, 4"}
                  opacity={strokeOpacity}
                />
                
                {/* 起点：点击热点标记 */}
                <g transform={`translate(${fromPoint.x}, ${fromPoint.y})`}>
                  {/* 外圈光晕 - 脉冲动画 */}
                  <circle r="14" fill={stroke} opacity="0.1">
                    {isActive && <animate attributeName="r" values="14;18;14" dur="1.5s" repeatCount="indefinite" />}
                    {isActive && <animate attributeName="opacity" values="0.1;0.05;0.1" dur="1.5s" repeatCount="indefinite" />}
                  </circle>
                  {/* 内圈 */}
                  <circle r="8" fill="white" stroke={stroke} strokeWidth="2" />
                  {/* 点击光标图标 */}
                  <path 
                    d="M-3,-4 L-3,4 L0,2 L2,6 L4,5 L2,1 L5,1 L-3,-4Z" 
                    fill={stroke}
                    transform="translate(0, -1)"
                  />
                </g>

                {/* 终点：箭头 */}
                <g transform={`translate(${toPoint.x}, ${toPoint.y})`}>
                  <polygon 
                    points="-10,-6 0,0 -10,6" 
                    fill={stroke}
                  />
                </g>

                {/* 点击按钮名称标签 */}
                {edge.fromAnchor?.label && (
                  <g transform={`translate(${fromPoint.x + 20}, ${fromPoint.y - 16})`}>
                    <rect 
                      x="-4" y="-10" 
                      width={edge.fromAnchor.label.length * 7 + 16} 
                      height="20" 
                      rx="6" 
                      fill="white" 
                      stroke={stroke}
                      strokeWidth="1.5"
                      filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
                    />
                    <text 
                      x="4" y="4" 
                      fill={stroke}
                      fontSize="11" 
                      fontWeight="600"
                      fontFamily="system-ui, sans-serif"
                    >
                      {edge.fromAnchor.label}
                    </text>
                  </g>
                )}
            </g>
        );
    });

    return edgeElements;
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full bg-moxt-theme-bg overflow-hidden relative canvas-grid
        ${effectiveTool === 'HAND' || isDraggingCanvas ? 'cursor-grab active:cursor-grabbing' : ''}
        ${effectiveTool === 'SELECT' && !isDraggingCanvas ? 'cursor-default' : ''}
        ${['CREATE_SECTION', 'CREATE_DOCUMENT', 'CREATE_CHART', 'CREATE_TABLE', 'CREATE_API', 'CREATE_INTEGRATION'].includes(effectiveTool) ? 'cursor-crosshair' : ''}
        ${effectiveTool === 'PIN' ? 'cursor-copy' : ''}
      `}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full origin-top-left pointer-events-none ${!isDraggingCanvas ? 'transition-transform duration-150 ease-out' : ''}`}
        style={{
          transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
          willChange: isDraggingCanvas ? 'transform' : 'auto',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="pointer-events-auto relative w-full h-full">
            
            {/* --- AUTO SECTIONS --- */}
            <SectionContainer 
                bounds={docBounds} 
                title={sectionSettings[SECTION_IDS.DOCUMENT].title} 
                theme={sectionSettings[SECTION_IDS.DOCUMENT].theme} 
                icon={FileText}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.DOCUMENT)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.DOCUMENT, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.DOCUMENT, { theme })}
            />
            <SectionContainer 
                bounds={chartBounds} 
                title={sectionSettings[SECTION_IDS.CHART].title}
                theme={sectionSettings[SECTION_IDS.CHART].theme}
                icon={GitBranch}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.CHART)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.CHART, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.CHART, { theme })}
            />
            <SectionContainer 
                bounds={screenBounds} 
                title={sectionSettings[SECTION_IDS.SCREEN].title}
                theme={sectionSettings[SECTION_IDS.SCREEN].theme}
                icon={Smartphone}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.SCREEN)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.SCREEN, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.SCREEN, { theme })}
            />
            <SectionContainer 
                bounds={backendBounds} 
                title={sectionSettings[SECTION_IDS.BACKEND].title}
                theme={sectionSettings[SECTION_IDS.BACKEND].theme}
                icon={Database}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.BACKEND)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.BACKEND, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.BACKEND, { theme })}
            />

            {/* --- 5个流程 SECTIONS --- */}
            <SectionContainer 
                bounds={authFlowBounds} 
                title={sectionSettings[SECTION_IDS.FLOW_AUTH]?.title || 'Section 1: 登录注册流程'}
                theme={sectionSettings[SECTION_IDS.FLOW_AUTH]?.theme || 'purple'}
                icon={Smartphone}
                isSelected={selectedSectionId === SECTION_IDS.FLOW_AUTH}
                onClick={() => setSelectedSectionId(selectedSectionId === SECTION_IDS.FLOW_AUTH ? null : SECTION_IDS.FLOW_AUTH)}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.FLOW_AUTH)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.FLOW_AUTH, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.FLOW_AUTH, { theme })}
            />
            <SectionContainer 
                bounds={searchFlowBounds} 
                title={sectionSettings[SECTION_IDS.FLOW_SEARCH]?.title || 'Section 2: 搜索下单流程'}
                theme={sectionSettings[SECTION_IDS.FLOW_SEARCH]?.theme || 'emerald'}
                icon={Smartphone}
                isSelected={selectedSectionId === SECTION_IDS.FLOW_SEARCH}
                onClick={() => setSelectedSectionId(selectedSectionId === SECTION_IDS.FLOW_SEARCH ? null : SECTION_IDS.FLOW_SEARCH)}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.FLOW_SEARCH)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.FLOW_SEARCH, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.FLOW_SEARCH, { theme })}
            />
            <SectionContainer 
                bounds={learnFlowBounds} 
                title={sectionSettings[SECTION_IDS.FLOW_LEARN]?.title || 'Section 3: 我的学习流程'}
                theme={sectionSettings[SECTION_IDS.FLOW_LEARN]?.theme || 'orange'}
                icon={Smartphone}
                isSelected={selectedSectionId === SECTION_IDS.FLOW_LEARN}
                onClick={() => setSelectedSectionId(selectedSectionId === SECTION_IDS.FLOW_LEARN ? null : SECTION_IDS.FLOW_LEARN)}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.FLOW_LEARN)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.FLOW_LEARN, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.FLOW_LEARN, { theme })}
            />
            <SectionContainer 
                bounds={profileFlowBounds} 
                title={sectionSettings[SECTION_IDS.FLOW_PROFILE]?.title || 'Section 4: 个人中心流程'}
                theme={sectionSettings[SECTION_IDS.FLOW_PROFILE]?.theme || 'rose'}
                icon={Smartphone}
                isSelected={selectedSectionId === SECTION_IDS.FLOW_PROFILE}
                onClick={() => setSelectedSectionId(selectedSectionId === SECTION_IDS.FLOW_PROFILE ? null : SECTION_IDS.FLOW_PROFILE)}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.FLOW_PROFILE)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.FLOW_PROFILE, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.FLOW_PROFILE, { theme })}
            />
            <SectionContainer 
                bounds={liveFlowBounds} 
                title={sectionSettings[SECTION_IDS.FLOW_LIVE]?.title || 'Section 5: 直播课程流程'}
                theme={sectionSettings[SECTION_IDS.FLOW_LIVE]?.theme || 'blue'}
                icon={Smartphone}
                isSelected={selectedSectionId === SECTION_IDS.FLOW_LIVE}
                onClick={() => setSelectedSectionId(selectedSectionId === SECTION_IDS.FLOW_LIVE ? null : SECTION_IDS.FLOW_LIVE)}
                onDragStart={(e) => handleSectionDragStart(e, SECTION_IDS.FLOW_LIVE)}
                onTitleChange={(title) => updateSectionSettings(SECTION_IDS.FLOW_LIVE, { title })}
                onThemeChange={(theme) => updateSectionSettings(SECTION_IDS.FLOW_LIVE, { theme })}
            />

            {/* --- MANUAL SECTIONS --- */}
            {manualSections.map(s => (
                 <SectionContainer 
                    key={s.id}
                    bounds={{ x: s.x, y: s.y, width: s.width, height: s.height }}
                    title={s.title}
                    theme={s.theme}
                    icon={BoxSelect}
                    onDragStart={(e) => handleSectionDragStart(e, s.id)}
                    onTitleChange={(title) => updateSectionSettings(s.id, { title })}
                    onThemeChange={(theme) => updateSectionSettings(s.id, { theme })}
                />
            ))}

            {/* --- GHOST BOX --- */}
            {ghostBox && (
                <div 
                    className="absolute border-2 border-moxt-brand-7 bg-moxt-brand-7/10 rounded-lg z-50"
                    style={{ left: ghostBox.x, top: ghostBox.y, width: ghostBox.w, height: ghostBox.h }}
                />
            )}

            {/* --- NODES --- */}
            {nodes.map(node => {
                const dims = getNodeDimensions(node);
                const isSelected = selectedNodeIds.includes(node.id);
                const isMentioned = mentionedNodeIds.includes(node.id);
                const isHovered = hoveredNodeId === node.id && !isSelected && !isMentioned;
                const isHoveredInSelectionMode = isCanvasSelectionMode && hoveredNodeId === node.id;
                const isDragging = draggedNodeId === node.id;

                return (
                <div
                    key={node.id}
                    data-id={node.id}
                    className={`canvas-node absolute shadow-sm rounded-lg bg-moxt-fill-white border border-moxt-line-1
                        ${!isDragging ? 'transition-all duration-200' : ''}
                        ${node.type === NodeType.SCREEN || isMentioned ? 'z-20 overflow-visible' : 'z-10 overflow-hidden'}
                        ${isHovered ? 'ring-2 ring-moxt-brand-7/50 shadow-lg' : ''}
                        ${isHoveredInSelectionMode ? 'ring-2 ring-blue-500/50 shadow-lg' : ''}
                        ${isSelected ? 'ring-2 ring-moxt-brand-7' : ''}
                        ${isMentioned ? 'ring-2 ring-blue-500' : ''}
                        ${isDragging ? 'scale-[1.01] cursor-grabbing' : ''}
                        ${isCanvasSelectionMode ? 'cursor-pointer' : ''}
                    `}
                    style={{
                        left: node.x,
                        top: node.y,
                        width: dims.width,
                        height: dims.height,
                        willChange: isDragging ? 'transform' : 'auto'
                    }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                >
                    {node.type === NodeType.DOCUMENT && (
                        <DocumentNode title={node.title} data={node.data as any} loading={node.status === 'loading'} onEdit={() => onEditNode(node.id)} />
                    )}
                    {node.type === NodeType.WHITEBOARD && (
                        <WhiteboardNode title={node.title} data={node.data as any} loading={node.status === 'loading'} onEdit={() => onEditNode(node.id)} />
                    )}
                    {node.type === NodeType.SCREEN && (
                        <ScreenNode
                            title={node.title}
                            data={node.data as any}
                            loading={node.status === 'loading'}
                            onRun={() => onRunNode(node.id)}
                            onEditPlan={() => onEditNode(node.id)}
                        />
                    )}
                    {node.type === NodeType.TABLE && (
                        <TableNode title={node.title} data={node.data as any} loading={node.status === 'loading'} onExpand={() => onEditNode(node.id)} />
                    )}
                    {node.type === NodeType.API && (
                        <APINode title={node.title} data={node.data as any} loading={node.status === 'loading'} />
                    )}
                    {node.type === NodeType.INTEGRATION && (
                        <IntegrationNode title={node.title} data={node.data as IntegrationData} loading={node.status === 'loading'} onEdit={() => onEditNode(node.id)} />
                    )}

                    {/* Mention Badge */}
                    {isMentioned && onRemoveMention && (
                        <MentionBadge
                            nodeTitle={node.title}
                            onRemove={() => onRemoveMention(node.id)}
                        />
                    )}
                </div>
            )})}

            {/* --- EDGES (渲染在节点上方) --- */}
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible z-30 pointer-events-none">
                {renderEdges()}
            </svg>

            {/* --- PINS --- */}
            {pins.map(pin => (
                <PinMarker 
                    key={pin.id} 
                    pin={pin} 
                    scale={view.scale}
                    onClick={() => { /* Future: Open Edit */ }}
                    onDelete={() => onDeletePin?.(pin.id)}
                />
            ))}

        </div>
      </div>

      {/* --- FLOATING TOOLBAR --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-moxt-fill-white rounded-full shadow-lg border border-moxt-line-1 p-1 flex items-center gap-0.5 z-50 transition-transform hover:scale-[1.02]">
          <ToolbarButton 
            icon={MousePointer2} 
            active={effectiveTool === 'SELECT'} 
            onClick={() => setActiveTool('SELECT')} 
            tooltip="Select (V)"
          />
          <ToolbarButton 
            icon={Hand} 
            active={effectiveTool === 'HAND'} 
            onClick={() => setActiveTool('HAND')} 
            tooltip="Hand Tool (H / Space)"
          />
           <ToolbarButton 
            icon={MapPin} 
            active={effectiveTool === 'PIN'} 
            onClick={() => setActiveTool('PIN')} 
            tooltip="Pin Tool (P)"
          />
          <div className="w-px h-5 bg-moxt-line-1 mx-1"></div>
          
          {/* Add Menu Group */}
          <div className="relative group">
             <button className="p-2.5 bg-moxt-brand-7 text-white hover:opacity-90 rounded-full transition-colors">
                <Plus size={20} />
             </button>
             {/* Bridge */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-transparent" /> 
             {/* Hover Menu */}
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:flex flex-col gap-1 bg-moxt-fill-white p-2 rounded-lg shadow-lg border border-moxt-line-1 min-w-[160px] animate-in fade-in slide-in-from-bottom-2 after:content-[''] after:absolute after:top-full after:left-0 after:w-full after:h-4 after:bg-transparent">
                 <div className="text-[10px] font-bold text-moxt-text-4 uppercase px-3 py-1 tracking-wider">Create Entity</div>
                 <AddMenuItem icon={BoxSelect} label="Section" onClick={() => setActiveTool('CREATE_SECTION')} active={activeTool === 'CREATE_SECTION'} />
                 <AddMenuItem icon={FileText} label="Document" onClick={() => setActiveTool('CREATE_DOCUMENT')} active={activeTool === 'CREATE_DOCUMENT'} />
                 <AddMenuItem icon={GitBranch} label="Chart" onClick={() => setActiveTool('CREATE_CHART')} active={activeTool === 'CREATE_CHART'} />
                 <AddMenuItem icon={TableIcon} label="Table" onClick={() => setActiveTool('CREATE_TABLE')} active={activeTool === 'CREATE_TABLE'} />
                 <AddMenuItem icon={Globe} label="API" onClick={() => setActiveTool('CREATE_API')} active={activeTool === 'CREATE_API'} />
                 <AddMenuItem icon={Zap} label="Integration" onClick={() => setActiveTool('CREATE_INTEGRATION')} active={activeTool === 'CREATE_INTEGRATION'} />
             </div>
          </div>
      </div>

      {/* HUD / Controls (Zoom) */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-2 pointer-events-auto z-50">
         <div className="bg-moxt-fill-white/95 backdrop-blur shadow-md border border-moxt-line-1 rounded-lg p-1.5 flex flex-col gap-1">
            <button onClick={zoomIn} className="p-1.5 hover:bg-moxt-fill-1 rounded-md text-moxt-text-2 transition-colors"><Plus size={18} /></button>
            <button onClick={zoomOut} className="p-1.5 hover:bg-moxt-fill-1 rounded-md text-moxt-text-2 transition-colors"><Minus size={18} /></button>
         </div>
         <div className="bg-moxt-text-1/90 backdrop-blur text-white text-12 font-mono py-1 px-2.5 rounded-md shadow-md text-center">
             {Math.round(view.scale * 100)}%
         </div>
      </div>

    </div>
  );
};

const ToolbarButton = ({ icon: Icon, active, onClick, tooltip }: { icon: any, active: boolean, onClick: () => void, tooltip: string }) => (
    <button 
        onClick={onClick}
        title={tooltip}
        className={`p-2.5 rounded-full transition-all ${active ? 'bg-moxt-text-1 text-white' : 'text-moxt-text-3 hover:bg-moxt-fill-1 hover:text-moxt-text-1'}`}
    >
        <Icon size={18} />
    </button>
);

const AddMenuItem = ({ icon: Icon, label, onClick, active }: { icon: any, label: string, onClick: () => void, active: boolean }) => (
    <button 
        onClick={(e) => {
            onClick();
            (document.activeElement as HTMLElement)?.blur();
        }}
        className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-13 font-medium transition-colors w-full text-left
            ${active ? 'bg-moxt-fill-1 text-moxt-brand-7' : 'hover:bg-moxt-fill-opacity-1 text-moxt-text-2'}
        `}
    >
        <Icon size={14} />
        {label}
    </button>
);
