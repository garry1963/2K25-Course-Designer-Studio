import React, { useState } from 'react';
import { CourseProject } from '../types/golf';
import {
  Sparkles,
  Layers,
  MapPin,
  Compass,
  Trophy,
  CheckCircle2,
  Clock,
  ArrowRight,
  FolderOpen,
  Plus,
  Play,
  Share2,
  TrendingUp,
  AlertCircle,
  FileText
} from 'lucide-react';

interface ProjectDashboardProps {
  project: CourseProject;
  onNavigateTab: (tabId: string) => void;
  onUpdateProject: (updater: (prev: CourseProject) => CourseProject) => void;
  onSelectHole: (holeNumber: number) => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  project,
  onNavigateTab,
  onUpdateProject,
  onSelectHole
}) => {
  // Compute course statistics
  const totalYardage = project.holes.reduce((sum, h) => sum + h.yardage, 0);
  const totalPar = project.holes.reduce((sum, h) => sum + h.par, 0);

  // Compute design completion metrics
  const completedHolesCount = project.holes.filter(
    (h) => h.completedSteps.greenComplex && h.completedSteps.layFairway
  ).length;

  const totalSteps = project.holes.length * 8;
  const completedStepsCount = project.holes.reduce((sum, h) => {
    const s = h.completedSteps;
    const count = Object.values(s).filter(Boolean).length;
    return sum + count;
  }, 0);
  const progressPct = Math.round((completedStepsCount / Math.max(1, totalSteps)) * 100);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Hero Course Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-900/40 p-7 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PGA TOUR 2K25 ACTIVE PROJECT
              </span>
              <span className="text-xs text-slate-400">· {project.version}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              {project.name}
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
              {project.subtitle} — {project.locationName}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('masterplan')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4" /> Open Masterplan
            </button>
            <button
              onClick={() => onNavigateTab('execution')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm flex items-center gap-2 border border-slate-700 transition"
            >
              <Play className="w-4 h-4 text-amber-400" /> 2K25 Builder Guide
            </button>
          </div>
        </div>

        {/* Quick Spec Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
            <div className="text-xs text-slate-400 font-medium">Holes / Par</div>
            <div className="text-lg font-bold text-white mt-0.5">{project.holes.length} Holes / Par {totalPar}</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
            <div className="text-xs text-slate-400 font-medium">Total Yardage</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{totalYardage.toLocaleString()} yds</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
            <div className="text-xs text-slate-400 font-medium">Theme Setting</div>
            <div className="text-lg font-bold text-amber-400 capitalize mt-0.5">{project.environmentTheme}</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
            <div className="text-xs text-slate-400 font-medium">Architectural Style</div>
            <div className="text-lg font-bold text-sky-400 mt-0.5 truncate">{project.style}</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
            <div className="text-xs text-slate-400 font-medium">LiDAR Status</div>
            <div className="text-lg font-bold text-purple-400 mt-0.5">
              {project.lidar ? 'Processed (1m DEM)' : 'Ready for Import'}
            </div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
            <div className="text-xs text-slate-400 font-medium">Overall Progress</div>
            <div className="text-lg font-bold text-emerald-300 mt-0.5 flex items-center gap-1.5">
              {progressPct}%
              <span className="text-xs font-normal text-slate-400">({completedStepsCount}/{totalSteps})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Quick Jump Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Completion Meter */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Course Construction Progress
            </h2>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              {progressPct}% Complete
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
            <div className="p-2.5 rounded-lg bg-slate-800/50 flex justify-between items-center">
              <span>Holes Planned:</span>
              <strong className="text-white">{project.holes.length} / 18</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/50 flex justify-between items-center">
              <span>Greens Sculpted:</span>
              <strong className="text-white">{project.holes.filter(h => h.completedSteps.greenComplex).length} / 18</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/50 flex justify-between items-center">
              <span>Bunkers Placed:</span>
              <strong className="text-white">{project.holes.filter(h => h.completedSteps.bunkersPlaced).length} / 18</strong>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-800/50 flex justify-between items-center">
              <span>Playtested:</span>
              <strong className="text-white">{project.playtestLogs.length} Sessions</strong>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('execution')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
            >
              Step-by-Step 2K25 Execution Tasks <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2K25 Object Budget Estimator */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" /> 2K25 Object Budget
            </h2>
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              Memory Guard
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Trees & Shrubs</span>
                <span className="font-semibold text-white">
                  {project.objectBudget.currentTrees} / {project.objectBudget.maxTrees}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: `${(project.objectBudget.currentTrees / project.objectBudget.maxTrees) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Decorative Props & Buildings</span>
                <span className="font-semibold text-white">
                  {project.objectBudget.currentProps} / {project.objectBudget.maxProps}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-sky-500 h-2 rounded-full"
                  style={{ width: `${(project.objectBudget.currentProps / project.objectBudget.maxProps) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Estimated Game Memory</span>
                <span className="font-semibold text-amber-400">
                  {project.objectBudget.estimatedMemoryMb}MB / {project.objectBudget.maxMemoryMb}MB
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${(project.objectBudget.estimatedMemoryMb / project.objectBudget.maxMemoryMb) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-normal bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
            Tip: Prioritize auto-generated background trees in the Boreal theme to conserve placed object budget for custom greenside styling.
          </p>
        </div>

        {/* AI Architect Recommendations Card */}
        <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> AI Design Advice
            </h2>
            <button
              onClick={() => onNavigateTab('assistant')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
            >
              Ask AI <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
            {project.aiRecommendations?.map((rec, i) => (
              <div key={i} className="text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab('concept')}
            className="w-full py-2 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5" /> Re-generate Course Concepts
          </button>
        </div>
      </div>

      {/* Hole-by-Hole Status Grid */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg text-white">18-Hole Routing Matrix</h2>
            <p className="text-xs text-slate-400">Click any hole to jump straight into its detailed hole design tools.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('masterplan')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 font-medium transition"
            >
              Full Masterplan Canvas
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {project.holes.map((hole) => {
            const isCompleted = hole.completedSteps.greenComplex && hole.completedSteps.layFairway;
            return (
              <button
                key={hole.id}
                onClick={() => {
                  onSelectHole(hole.number);
                  onNavigateTab('hole');
                }}
                className={`p-3 rounded-xl border text-left transition-all hover:scale-105 active:scale-95 flex flex-col justify-between h-28 ${
                  isCompleted
                    ? 'bg-slate-900/90 border-emerald-600/40 hover:border-emerald-500'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-white">#{hole.number}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-slate-800 text-emerald-400">
                    Par {hole.par}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-200">{hole.yardage} yds</div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-between mt-0.5">
                    <span>{hole.dogleg}</span>
                    <span className={hole.elevationChangeYards < 0 ? 'text-sky-400' : 'text-amber-400'}>
                      {hole.elevationChangeYards > 0 ? `+${hole.elevationChangeYards}` : hole.elevationChangeYards}y
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${hole.completedSteps.sculptTerrain ? 'bg-emerald-400' : 'bg-slate-700'}`} title="Terrain" />
                  <div className={`w-2 h-2 rounded-full ${hole.completedSteps.layFairway ? 'bg-emerald-400' : 'bg-slate-700'}`} title="Fairway" />
                  <div className={`w-2 h-2 rounded-full ${hole.completedSteps.greenComplex ? 'bg-emerald-400' : 'bg-slate-700'}`} title="Green" />
                  <div className={`w-2 h-2 rounded-full ${hole.completedSteps.bunkersPlaced ? 'bg-emerald-400' : 'bg-slate-700'}`} title="Bunkers" />
                  <div className={`w-2 h-2 rounded-full ${hole.completedSteps.playtested ? 'bg-sky-400' : 'bg-slate-700'}`} title="Playtested" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
