import React, { useState } from 'react';
import { CourseProject } from '../types/golf';
import {
  Trophy,
  Plus,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

interface PlaytestingProps {
  project: CourseProject;
  onUpdateProject: (updater: (prev: CourseProject) => CourseProject) => void;
}

export const Playtesting: React.FC<PlaytestingProps> = ({ project, onUpdateProject }) => {
  const [selectedHoleNum, setSelectedHoleNum] = useState<number>(3);
  const [teeTested, setTeeTested] = useState<'Championship' | 'Tournament' | 'Member' | 'Forward'>('Championship');
  const [pinTested, setPinTested] = useState('Sunday Championship Pin');
  const [carryTested, setCarryTested] = useState<number>(275);
  const [landingWidth, setLandingWidth] = useState<number>(32);
  const [greenFirmness, setGreenFirmness] = useState<'Firm' | 'Moderate' | 'Soft'>('Firm');
  const [rating, setRating] = useState<number>(8);
  const [issueText, setIssueText] = useState('');
  const [notesText, setNotesText] = useState('');

  const handleAddLog = () => {
    const newLog = {
      id: `pt_${Date.now()}`,
      holeNumber: selectedHoleNum,
      date: new Date().toISOString().split('T')[0],
      tee: teeTested,
      pinPosition: pinTested,
      driverCarryTested: carryTested,
      fairwayLandingWidthYards: landingWidth,
      greenReceptivity: greenFirmness,
      missToleranceRating: rating,
      issuesIdentified: issueText ? [issueText] : [],
      notes: notesText || 'Verified landing rollout and sightline satisfaction.'
    };

    onUpdateProject((prev) => ({
      ...prev,
      playtestLogs: [newLog, ...prev.playtestLogs]
    }));

    setIssueText('');
    setNotesText('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4" /> Quality Assurance & Playtesting Log
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Playtesting & Design Issue Register</h1>
          <p className="text-sm text-slate-400">
            Log ball-flight observations, landing area width verifications, green rollout speeds, and design bugs discovered while testing inside PGA TOUR 2K25.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Add Playtest Session */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" /> Record 2K25 In-Game Test
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Hole Tested</label>
              <select
                value={selectedHoleNum}
                onChange={(e) => setSelectedHoleNum(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                {project.holes.map((h) => (
                  <option key={h.id} value={h.number}>
                    Hole #{h.number} (Par {h.par})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Tee Used</label>
              <select
                value={teeTested}
                onChange={(e) => setTeeTested(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Championship">Championship (Back)</option>
                <option value="Tournament">Tournament</option>
                <option value="Member">Member</option>
                <option value="Forward">Forward</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Driver Carry (yds)</label>
              <input
                type="number"
                value={carryTested}
                onChange={(e) => setCarryTested(parseInt(e.target.value) || 280)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Landing Width (yds)</label>
              <input
                type="number"
                value={landingWidth}
                onChange={(e) => setLandingWidth(parseInt(e.target.value) || 30)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Green Receptivity</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Firm', 'Moderate', 'Soft'] as const).map((firm) => (
                <button
                  key={firm}
                  type="button"
                  onClick={() => setGreenFirmness(firm)}
                  className={`py-2 rounded-lg text-xs font-bold border transition ${
                    greenFirmness === firm
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {firm}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Issue Discovered (if any)</label>
            <input
              type="text"
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              placeholder="e.g. Speed slot feeds balls into right bunker"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Observations / Fix Notes</label>
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              rows={2}
              placeholder="Notes on trajectory, wind interaction, or camera sightlines..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 leading-relaxed"
            />
          </div>

          <button
            onClick={handleAddLog}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            <CheckCircle2 className="w-4 h-4" /> Save Playtest Record
          </button>
        </div>

        {/* Right Log List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recorded Test Sessions ({project.playtestLogs.length})
            </span>
          </div>

          <div className="space-y-3">
            {project.playtestLogs.map((log) => (
              <div key={log.id} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-white">Hole #{log.holeNumber}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">
                      {log.tee} Tee
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {log.date}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Tested Carry</span>
                    <span className="font-bold text-white">{log.driverCarryTested} yds</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Landing Width</span>
                    <span className="font-bold text-white">{log.fairwayLandingWidthYards} yds</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block">Receptivity</span>
                    <span className="font-bold text-emerald-400">{log.greenReceptivity}</span>
                  </div>
                </div>

                {log.issuesIdentified.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-xs text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{log.issuesIdentified.join(', ')}</span>
                  </div>
                )}

                <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                  {log.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
