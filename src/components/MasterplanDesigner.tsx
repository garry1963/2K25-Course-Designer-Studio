import React, { useState, useRef, useEffect } from 'react';
import { CourseProject, Hole } from '../types/golf';
import {
  Compass,
  Layers,
  Flag,
  CircleDot,
  Plus,
  Trash2,
  Move,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
  Check,
  Eye,
  Sliders,
  Sparkles,
  TreePine,
  AlertTriangle
} from 'lucide-react';

interface MasterplanDesignerProps {
  project: CourseProject;
  selectedHoleNumber: number;
  onSelectHole: (holeNumber: number) => void;
  onUpdateHole: (updatedHole: Hole) => void;
  onNavigateTab: (tabId: string) => void;
}

export const MasterplanDesigner: React.FC<MasterplanDesignerProps> = ({
  project,
  selectedHoleNumber,
  onSelectHole,
  onUpdateHole,
  onNavigateTab
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showFairwayRibbons, setShowFairwayRibbons] = useState(true);
  const [showBunkers, setShowBunkers] = useState(true);
  const [showWater, setShowWater] = useState(true);
  const [showContours, setShowContours] = useState(true);
  const [showSafetyMargins, setShowSafetyMargins] = useState(true);

  // Active tool: select, move tee, move green, add bunker, add landing
  const [activeTool, setActiveTool] = useState<'select' | 'moveTee' | 'moveGreen' | 'addLanding' | 'addBunker'>('select');

  // Currently inspected hole
  const currentHole = project.holes.find((h) => h.number === selectedHoleNumber) || project.holes[0];

  const svgRef = useRef<SVGSVGElement>(null);
  const [draggedItem, setDraggedItem] = useState<{ type: 'tee' | 'green' | 'landing1' | 'landing2'; holeId: string } | null>(null);

  // Handle clicking or dragging on SVG canvas
  const handleSvgPointerDown = (type: 'tee' | 'green' | 'landing1' | 'landing2', holeId: string, e: React.PointerEvent) => {
    e.stopPropagation();
    setDraggedItem({ type, holeId });
  };

  const handleSvgPointerMove = (e: React.PointerEvent) => {
    if (!draggedItem || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000);

    const holeToEdit = project.holes.find((h) => h.id === draggedItem.holeId);
    if (!holeToEdit) return;

    if (draggedItem.type === 'tee') {
      const updated: Hole = { ...holeToEdit, tee: { ...holeToEdit.tee, x, y } };
      onUpdateHole(updated);
    } else if (draggedItem.type === 'green') {
      const updated: Hole = { ...holeToEdit, green: { ...holeToEdit.green, x, y } };
      onUpdateHole(updated);
    } else if (draggedItem.type === 'landing1' && holeToEdit.landing1) {
      const updated: Hole = { ...holeToEdit, landing1: { ...holeToEdit.landing1, x, y } };
      onUpdateHole(updated);
    }
  };

  const handleSvgPointerUp = () => {
    setDraggedItem(null);
  };

  // Check hole routing validation warnings
  const validationAlerts: string[] = [];
  project.holes.forEach((h1, i) => {
    project.holes.forEach((h2, j) => {
      if (i >= j) return;
      // Distance between tee of h2 and fairway/green of h1
      const distTeeGreen = Math.hypot(h1.green.x - h2.tee.x, h1.green.y - h2.tee.y);
      if (distTeeGreen < 45) {
        validationAlerts.push(`Hole #${h1.number} green is within 45 yds of Hole #${h2.number} tee (Safety buffer warning)`);
      }
    });
  });

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* Left: Interactive Routing Canvas */}
      <div className="flex-1 flex flex-col relative border-r border-slate-800 overflow-hidden">
        {/* Top Floating Toolbar */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5 tracking-wider">
              <Compass className="w-4 h-4" /> 18-Hole Masterplan Canvas
            </span>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1">
              {project.holes.map((h) => (
                <button
                  key={h.id}
                  onClick={() => onSelectHole(h.number)}
                  className={`w-6 h-6 rounded-md text-[10px] font-extrabold transition flex items-center justify-center ${
                    selectedHoleNumber === h.number
                      ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {h.number}
                </button>
              ))}
            </div>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowContours(!showContours)}
              className={`px-2 py-1 rounded text-[11px] font-medium border ${
                showContours ? 'bg-slate-800 text-emerald-400 border-emerald-500/40' : 'text-slate-400 border-slate-800'
              }`}
            >
              Contours
            </button>
            <button
              onClick={() => setShowFairwayRibbons(!showFairwayRibbons)}
              className={`px-2 py-1 rounded text-[11px] font-medium border ${
                showFairwayRibbons ? 'bg-slate-800 text-emerald-400 border-emerald-500/40' : 'text-slate-400 border-slate-800'
              }`}
            >
              Fairways
            </button>
            <button
              onClick={() => setShowBunkers(!showBunkers)}
              className={`px-2 py-1 rounded text-[11px] font-medium border ${
                showBunkers ? 'bg-slate-800 text-amber-400 border-amber-500/40' : 'text-slate-400 border-slate-800'
              }`}
            >
              Bunkers
            </button>
            <button
              onClick={() => setShowWater(!showWater)}
              className={`px-2 py-1 rounded text-[11px] font-medium border ${
                showWater ? 'bg-slate-800 text-sky-400 border-sky-500/40' : 'text-slate-400 border-slate-800'
              }`}
            >
              Water
            </button>
            <div className="w-[1px] h-4 bg-slate-800 mx-1" />
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
              className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-slate-400 font-mono w-10 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
              className="p-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Masterplan 2D SVG Layout Viewport */}
        <div
          className="flex-1 overflow-auto bg-slate-950 flex items-center justify-center p-4 relative"
          onPointerMove={handleSvgPointerMove}
          onPointerUp={handleSvgPointerUp}
        >
          <div
            className="relative bg-[#16271c] rounded-2xl shadow-2xl border border-emerald-950 overflow-hidden"
            style={{
              width: `${1000 * zoomLevel}px`,
              height: `${1000 * zoomLevel}px`,
              minWidth: `${1000 * zoomLevel}px`,
              minHeight: `${1000 * zoomLevel}px`
            }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1000 1000"
              className="w-full h-full cursor-crosshair"
            >
              <defs>
                {/* Background Grid Pattern */}
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                </pattern>
                {/* 100-yard major grid */}
                <pattern id="majorGrid" width="150" height="150" patternUnits="userSpaceOnUse">
                  <rect width="150" height="150" fill="url(#grid)" />
                  <path d="M 150 0 L 0 0 0 150" fill="none" stroke="rgba(74, 222, 128, 0.08)" strokeWidth="1.5" />
                </pattern>

                {/* Fairway Gradient */}
                <linearGradient id="fairwayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2d6a4f" />
                  <stop offset="100%" stopColor="#40916c" />
                </linearGradient>
              </defs>

              <rect width="1000" height="1000" fill="url(#majorGrid)" />

              {/* Topographical Contour lines simulation */}
              {showContours && (
                <g opacity="0.25">
                  <path d="M 100 200 Q 300 180 500 240 T 900 220" fill="none" stroke="#52b788" strokeWidth="1.2" strokeDasharray="6,4" />
                  <path d="M 80 400 Q 350 380 600 440 T 920 400" fill="none" stroke="#52b788" strokeWidth="1.2" strokeDasharray="6,4" />
                  <path d="M 120 600 Q 400 580 650 640 T 880 610" fill="none" stroke="#52b788" strokeWidth="1.2" strokeDasharray="6,4" />
                  <path d="M 90 800 Q 420 780 700 830 T 910 820" fill="none" stroke="#52b788" strokeWidth="1.2" strokeDasharray="6,4" />
                </g>
              )}

              {/* Natural Water Hazards */}
              {showWater &&
                project.holes.map((h) =>
                  h.waterHazards.map((w) => (
                    <polygon
                      key={w.id}
                      points={w.points.map((p) => `${p.x},${p.y}`).join(' ')}
                      fill="#0077b6"
                      fillOpacity="0.75"
                      stroke="#48cae4"
                      strokeWidth="2"
                    />
                  ))
                )}

              {/* Course Holes Paths & Shapes */}
              {project.holes.map((h) => {
                const isSelected = selectedHoleNumber === h.number;

                // Path construction
                const pathD = h.landing2
                  ? `M ${h.tee.x} ${h.tee.y} Q ${h.landing1?.x || h.tee.x} ${h.landing1?.y || h.tee.y} ${h.landing2.x} ${h.landing2.y} T ${h.green.x} ${h.green.y}`
                  : h.landing1
                  ? `M ${h.tee.x} ${h.tee.y} Q ${h.landing1.x} ${h.landing1.y} ${h.green.x} ${h.green.y}`
                  : `M ${h.tee.x} ${h.tee.y} L ${h.green.x} ${h.green.y}`;

                return (
                  <g key={h.id} className="transition-opacity">
                    {/* Fairway ribbon polygon / stroke */}
                    {showFairwayRibbons && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isSelected ? '#38bdf8' : '#52b788'}
                        strokeWidth={isSelected ? '28' : '22'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={isSelected ? 0.95 : 0.65}
                      />
                    )}

                    {/* Centerline flight path */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isSelected ? '#ffffff' : '#a7f3d0'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      strokeDasharray={isSelected ? 'none' : '4,3'}
                      opacity={0.9}
                    />

                    {/* Bunkers */}
                    {showBunkers &&
                      h.bunkers.map((b) => (
                        <ellipse
                          key={b.id}
                          cx={b.x}
                          cy={b.y}
                          rx={b.radiusX}
                          ry={b.radiusY}
                          fill="#fefae0"
                          stroke="#dda15e"
                          strokeWidth="1.5"
                          transform={`rotate(${b.rotation} ${b.x} ${b.y})`}
                        />
                      ))}

                    {/* Landing Zones */}
                    {h.landing1 && (
                      <circle
                        cx={h.landing1.x}
                        cy={h.landing1.y}
                        r="6"
                        fill="#38bdf8"
                        opacity={isSelected ? 1 : 0.4}
                        onPointerDown={(e) => handleSvgPointerDown('landing1', h.id, e)}
                        className="cursor-move hover:scale-125"
                      />
                    )}

                    {/* Green complex area */}
                    <circle
                      cx={h.green.x}
                      cy={h.green.y}
                      r={h.green.radius || 18}
                      fill="#74c69d"
                      stroke={isSelected ? '#38bdf8' : '#2d6a4f'}
                      strokeWidth={isSelected ? '3' : '2'}
                      onPointerDown={(e) => handleSvgPointerDown('green', h.id, e)}
                      className="cursor-move hover:scale-110 transition-transform"
                    />

                    {/* Pin Flagstick */}
                    <circle cx={h.green.x} cy={h.green.y} r="3" fill="#ef4444" />

                    {/* Tee Box */}
                    <rect
                      x={h.tee.x - 7}
                      y={h.tee.y - 4}
                      width="14"
                      height="8"
                      rx="2"
                      fill={isSelected ? '#38bdf8' : '#facc15'}
                      stroke="#000"
                      strokeWidth="1"
                      onPointerDown={(e) => handleSvgPointerDown('tee', h.id, e)}
                      className="cursor-move hover:scale-125 transition-transform"
                    />

                    {/* Hole Number Label Tag */}
                    <g
                      transform={`translate(${h.tee.x}, ${h.tee.y - 12})`}
                      onClick={() => onSelectHole(h.number)}
                      className="cursor-pointer"
                    >
                      <rect
                        x="-14"
                        y="-10"
                        width="28"
                        height="14"
                        rx="4"
                        fill={isSelected ? '#0284c7' : '#0f172a'}
                        stroke={isSelected ? '#38bdf8' : '#334155'}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="1"
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill={isSelected ? '#ffffff' : '#94a3b8'}
                      >
                        #{h.number}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Clubhouse Central Hub Marker */}
              <g transform="translate(180, 160)">
                <rect x="-18" y="-14" width="36" height="28" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                <text x="0" y="3" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ffffff">
                  CLUB
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Drag Hint */}
          <div className="absolute bottom-4 left-6 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Drag yellow tee markers or green circles on canvas to adjust routing coordinates
          </div>
        </div>
      </div>

      {/* Right: Inspector & Hole Routing Architectural Panel */}
      <div className="w-full lg:w-96 p-5 bg-slate-900 flex flex-col space-y-5 overflow-y-auto border-l border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Routing Properties
            </span>
            <h2 className="text-xl font-black text-white">Hole #{currentHole.number}</h2>
          </div>
          <button
            onClick={() => onNavigateTab('hole')}
            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition"
          >
            Hole Detailer →
          </button>
        </div>

        {/* Hole Card Details */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Par</span>
              <div className="text-lg font-black text-white">{currentHole.par}</div>
            </div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Yardage</span>
              <div className="text-lg font-black text-emerald-400">{currentHole.yardage}y</div>
            </div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Elevation</span>
              <div className={`text-lg font-black ${currentHole.elevationChangeYards < 0 ? 'text-sky-400' : 'text-amber-400'}`}>
                {currentHole.elevationChangeYards > 0 ? `+${currentHole.elevationChangeYards}` : currentHole.elevationChangeYards}y
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            {currentHole.description}
          </div>
        </div>

        {/* Quick Position Inputs */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            GPS / Plot Coordinates
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Tee Location</span>
              <span className="font-mono text-emerald-400 font-bold">
                X: {currentHole.tee.x}, Y: {currentHole.tee.y}
              </span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Green Center</span>
              <span className="font-mono text-emerald-400 font-bold">
                X: {currentHole.green.x}, Y: {currentHole.green.y}
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Safety & Routing Validation Alerts */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Routing Quality Audit
          </span>

          {validationAlerts.length > 0 ? (
            validationAlerts.slice(0, 3).map((alert, i) => (
              <div key={i} className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-lg leading-relaxed">
                {alert}
              </div>
            ))
          ) : (
            <div className="text-xs text-emerald-300 bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All 18 holes meet PGA TOUR 2K25 safety buffer guidelines.</span>
            </div>
          )}
        </div>

        {/* Construction Quick Steps Checklist */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
            2K25 Hole Construction Tracker
          </span>
          <div className="space-y-1.5">
            {Object.entries(currentHole.completedSteps).map(([key, val]) => (
              <label
                key={key}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950 hover:bg-slate-800/50 cursor-pointer text-xs text-slate-300 transition"
              >
                <input
                  type="checkbox"
                  checked={val}
                  onChange={(e) => {
                    const updated = {
                      ...currentHole,
                      completedSteps: {
                        ...currentHole.completedSteps,
                        [key]: e.target.checked
                      }
                    };
                    onUpdateHole(updated);
                  }}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
