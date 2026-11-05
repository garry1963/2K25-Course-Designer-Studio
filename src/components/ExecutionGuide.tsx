import React, { useState } from 'react';
import { CourseProject } from '../types/golf';
import {
  Play,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sliders,
  FolderArchive,
  Download,
  Info,
  CheckSquare,
  Square,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ExecutionGuideProps {
  project: CourseProject;
  onUpdateProject: (updater: (prev: CourseProject) => CourseProject) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ExecutionGuide: React.FC<ExecutionGuideProps> = ({
  project,
  onUpdateProject,
  onNavigateTab
}) => {
  const [selectedHoleNum, setSelectedHoleNum] = useState<number>(1);
  const currentHole = project.holes.find((h) => h.number === selectedHoleNum) || project.holes[0];

  const toggleHoleStep = (key: keyof typeof currentHole.completedSteps) => {
    onUpdateProject((prev) => {
      const updatedHoles = prev.holes.map((h) => {
        if (h.number === currentHole.number) {
          return {
            ...h,
            completedSteps: {
              ...h.completedSteps,
              [key]: !h.completedSteps[key]
            }
          };
        }
        return h;
      });
      return { ...prev, holes: updatedHoles };
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Play className="w-4 h-4 text-emerald-400" /> PGA TOUR 2K25 Execution Assistant
          </div>
          <h1 className="text-2xl font-black text-white mt-1">In-Game Course Designer Translation Guide</h1>
          <p className="text-sm text-slate-400">
            Translate studio masterplans into precise in-game actions. Follow community-proven plot zeroing, terrain sculpting orders, and spline placement techniques.
          </p>
        </div>
      </div>

      {/* Community Tutorial Highlight Card: Blank Plot Setup */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-900/50 p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            CRITICAL FOUNDATION STEP
          </span>
          <h2 className="text-lg font-black text-white">Community Standard: Blank Plot Zero-Out Setup</h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Based on established 2K Course Designer tutorials (Crazycanuck1985 & b101 design), starting with a default game course leads to messy automated surfaces and unwanted fairway segments. Follow these exact steps inside 2K25 before manual sculpting:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-amber-400 block text-[11px]">1. New Course Creation</span>
            <p className="text-slate-400">Select Create New Course & choose the <strong>{project.environmentTheme.toUpperCase()}</strong> theme.</p>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-amber-400 block text-[11px]">2. Zero Automatic Layout</span>
            <p className="text-slate-400">Set Number of Holes to 0 or 1, and set Fairway / Green / Bunker generation density to <strong>0%</strong>.</p>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-amber-400 block text-[11px]">3. Flatten Water Table</span>
            <p className="text-slate-400">Lower initial water level so it does not flood your planned low-lying valleys and ravines.</p>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-amber-400 block text-[11px]">4. Save Base Template</span>
            <p className="text-slate-400">Save as <code>{project.name}_BasePlot</code> before touching any sculpting brushes.</p>
          </div>
        </div>
      </div>

      {/* Hole Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {project.holes.map((h) => {
          const isDone = Object.values(h.completedSteps).filter(Boolean).length === 8;
          return (
            <button
              key={h.id}
              onClick={() => setSelectedHoleNum(h.number)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 border ${
                selectedHoleNum === h.number
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>Hole #{h.number}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-950" />}
            </button>
          );
        })}
      </div>

      {/* Step by Step Construction Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-400">In-Game Construction Checklist</span>
            <h2 className="text-xl font-black text-white mt-0.5">
              Building Hole #{currentHole.number} (Par {currentHole.par}, {currentHole.yardage} yds)
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {Object.values(currentHole.completedSteps).filter(Boolean).length} / 8 Steps Finished
          </span>
        </div>

        {/* 8 Actionable Step Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: 'plotSetup' as const,
              title: '1. Establish Plot Boundary & Clear Auto Surfaces',
              desc: 'Confirm zero-surface generation is active for this hole corridor.'
            },
            {
              key: 'sculptTerrain' as const,
              title: '2. Sculpt Major Elevation & Landforms',
              desc: `Carve the ${currentHole.elevationChangeYards > 0 ? 'uphill' : 'downhill'} gradient (${Math.abs(currentHole.elevationChangeYards)} yards delta) with smooth falloff.`
            },
            {
              key: 'layFairway' as const,
              title: '3. Lay Fairway Splines & Landing Zone',
              desc: `Lay the ${currentHole.dogleg} fairway corridor. Width calibrated to approx 32 yards in landing area.`
            },
            {
              key: 'greenComplex' as const,
              title: '4. Construct Green Complex & Contours',
              desc: `Sculpt putting surface (radius ${currentHole.green.radius}). Keep pin cup slopes under 2.5 degrees.`
            },
            {
              key: 'bunkersPlaced' as const,
              title: '5. Sculpt & Texture Bunkers',
              desc: `Place ${currentHole.bunkers.length} bunkers with smooth sod face edges.`
            },
            {
              key: 'hazardDecor' as const,
              title: '6. Water Hazards & Retaining Walls',
              desc: 'Add ponds/creeks with natural stone or timber bulkhead perimeters.'
            },
            {
              key: 'vegetation' as const,
              title: '7. Frame Foliage & Tree Sightlines',
              desc: 'Place framing trees along outer rough while preserving clear tee-to-fairway sightlines.'
            },
            {
              key: 'playtested' as const,
              title: '8. Playtest from Championship Tees',
              desc: 'Hit driver & approach irons to verify landing roll and ball behavior on the green.'
            }
          ].map((step) => {
            const isChecked = currentHole.completedSteps[step.key];
            return (
              <div
                key={step.key}
                onClick={() => toggleHoleStep(step.key)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-xs ${isChecked ? 'text-white' : 'text-slate-200'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
