import React, { useState } from 'react';
import { Hole } from '../types/golf';
import {
  Flag,
  CircleDot,
  Compass,
  ArrowRight,
  Plus,
  Trash2,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  Sparkles
} from 'lucide-react';

interface HoleDesignerProps {
  hole: Hole;
  onUpdateHole: (updated: Hole) => void;
  onNavigateTab: (tabId: string) => void;
}

export const HoleDesigner: React.FC<HoleDesignerProps> = ({
  hole,
  onUpdateHole,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'bunkers' | 'green' | 'guide'>('specs');

  // Bunker quick adder
  const handleAddBunker = (type: 'fairway' | 'greenside' | 'pot' | 'waste' | 'cross') => {
    const newBunker = {
      id: `b_${Date.now()}`,
      type,
      x: hole.green.x - 20,
      y: hole.green.y - 15,
      radiusX: type === 'pot' ? 5 : type === 'waste' ? 18 : 10,
      radiusY: type === 'pot' ? 5 : type === 'waste' ? 9 : 6,
      depthMeters: type === 'pot' ? 2.2 : 1.5,
      rotation: 15
    };
    onUpdateHole({
      ...hole,
      bunkers: [...hole.bunkers, newBunker]
    });
  };

  const handleRemoveBunker = (id: string) => {
    onUpdateHole({
      ...hole,
      bunkers: hole.bunkers.filter((b) => b.id !== id)
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header with quick navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Flag className="w-4 h-4" /> Individual Hole Studio
          </div>
          <h1 className="text-2xl font-black text-white mt-1">
            Hole #{hole.number} — Par {hole.par} ({hole.yardage} yds)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Handicap Index {hole.handicapIndex} · Dogleg: {hole.dogleg} · Elevation Delta:{' '}
            {hole.elevationChangeYards > 0 ? `+${hole.elevationChangeYards}` : hole.elevationChangeYards} yds
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('masterplan')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-2 hover:bg-slate-800 transition"
          >
            <Compass className="w-4 h-4 text-emerald-400" /> Back to Masterplan
          </button>
          <button
            onClick={() => onNavigateTab('execution')}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            2K25 Build Steps →
          </button>
        </div>
      </div>

      {/* Hole Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-1 text-xs">
        <button
          onClick={() => setActiveTab('specs')}
          className={`px-4 py-2 rounded-xl font-bold transition ${
            activeTab === 'specs' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Hole Specs & Elevation
        </button>
        <button
          onClick={() => setActiveTab('bunkers')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
            activeTab === 'bunkers' ? 'bg-slate-800 text-amber-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Bunkering Matrix ({hole.bunkers.length})
        </button>
        <button
          onClick={() => setActiveTab('green')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
            activeTab === 'green' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Green Complex & Pins
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
            activeTab === 'guide' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          2K25 Construction Blueprint
        </button>
      </div>

      {/* Tab 1: Specs & Architecture */}
      {activeTab === 'specs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Hole Dimension Controls</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Par Value</label>
                <select
                  value={hole.par}
                  onChange={(e) => onUpdateHole({ ...hole, par: parseInt(e.target.value) as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value={3}>Par 3</option>
                  <option value={4}>Par 4</option>
                  <option value={5}>Par 5</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Total Yardage (Championship)</label>
                <input
                  type="number"
                  value={hole.yardage}
                  onChange={(e) => onUpdateHole({ ...hole, yardage: parseInt(e.target.value) || 400 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Dogleg Direction</label>
                <select
                  value={hole.dogleg}
                  onChange={(e) => onUpdateHole({ ...hole, dogleg: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="Straight">Straight</option>
                  <option value="Left">Dogleg Left</option>
                  <option value="Right">Dogleg Right</option>
                  <option value="Double">Double Dogleg</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Elevation Delta (Yards)</label>
                <input
                  type="number"
                  value={hole.elevationChangeYards}
                  onChange={(e) => onUpdateHole({ ...hole, elevationChangeYards: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Architectural Brief</label>
              <textarea
                value={hole.description}
                onChange={(e) => onUpdateHole({ ...hole, description: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">2K25 Builder Field Notes</label>
              <textarea
                value={hole.notes}
                onChange={(e) => onUpdateHole({ ...hole, notes: e.target.value })}
                rows={2}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Strategic Shot Value & Risk/Reward Breakdown */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Strategic Architecture Analysis
            </h2>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">Tee Shot Challenge:</span>
                {hole.dogleg === 'Straight' ? (
                  <p>Encourages distance and center-corridor placement. Look to place cross bunkers at 270-290 yards to challenge aggressive long drivers.</p>
                ) : (
                  <p>Shaping required! Carrying the inside corner of the {hole.dogleg} angle shaves 30 yards off the approach shot, while bail-out safe drives leave a blind second shot.</p>
                )}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-400 block mb-1">Elevation Physics in 2K25:</span>
                {hole.elevationChangeYards < 0 ? (
                  <p>Downhill {Math.abs(hole.elevationChangeYards)} yards. Drives will gain 15-25 yards of bounding roll in 2K25. Ensure fairway landing slope does not propel balls through into heavy rough.</p>
                ) : (
                  <p>Uphill {hole.elevationChangeYards} yards. Shots will play 1-2 clubs longer and land with steep descent angles. Design receptive green slopes to hold long iron shots.</p>
                )}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-bold text-sky-400 block mb-1">Pin Placement Flexibility:</span>
                <p>This green supports multiple distinct quadrants. The Sunday championship pin requires a surgical approach over the front greenside hazard.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bunkering */}
      {activeTab === 'bunkers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase">
              Bunkers Configured for Hole #{hole.number}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAddBunker('fairway')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> + Fairway Bunker
              </button>
              <button
                onClick={() => handleAddBunker('greenside')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> + Greenside Bunker
              </button>
              <button
                onClick={() => handleAddBunker('pot')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> + Pot Bunker
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hole.bunkers.map((b, i) => (
              <div key={b.id} className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    Bunker #{i + 1} ({b.type})
                  </span>
                  <button
                    onClick={() => handleRemoveBunker(b.id)}
                    className="p-1 rounded text-red-400 hover:bg-red-950/50"
                    title="Delete bunker"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Length (m)</span>
                    <input
                      type="number"
                      value={b.radiusX}
                      onChange={(e) => {
                        const updated = hole.bunkers.map((item) =>
                          item.id === b.id ? { ...item, radiusX: parseFloat(e.target.value) || 8 } : item
                        );
                        onUpdateHole({ ...hole, bunkers: updated });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Depth (m)</span>
                    <input
                      type="number"
                      step="0.1"
                      value={b.depthMeters}
                      onChange={(e) => {
                        const updated = hole.bunkers.map((item) =>
                          item.id === b.id ? { ...item, depthMeters: parseFloat(e.target.value) || 1.2 } : item
                        );
                        onUpdateHole({ ...hole, bunkers: updated });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-1.5 text-white"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg">
                  Position in plot: ({b.x}, {b.y}) · Rotation: {b.rotation}°
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Green Complex */}
      {activeTab === 'green' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Putting Green Architecture</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block font-bold uppercase">Green Surface Radius</span>
              <input
                type="number"
                value={hole.green.radius}
                onChange={(e) =>
                  onUpdateHole({
                    ...hole,
                    green: { ...hole.green, radius: parseInt(e.target.value) || 18 }
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
              />
              <span className="text-[10px] text-slate-500">Approx {Math.round(Math.PI * Math.pow(hole.green.radius * 3, 2))} sq ft</span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block font-bold uppercase">Green Elevation</span>
              <div className="text-base font-bold text-emerald-400 font-mono mt-1">{hole.green.elevation}m DTM</div>
              <span className="text-[10px] text-slate-500">Target platform height</span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 block font-bold uppercase">Pin Positions</span>
              <div className="text-base font-bold text-white mt-1">{hole.pins.length} Tournament Pins</div>
              <span className="text-[10px] text-slate-500">Includes Sunday Championship Pin</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 2K25 Construction Blueprint */}
      {activeTab === 'guide' && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Hole #{hole.number} In-Game Build Sequence
            </h2>
            <span className="text-xs text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-lg font-bold">
              PGA TOUR 2K25 Execution Card
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              {
                step: 1,
                title: 'Set Plot & Clear Auto Surfaces',
                desc: 'In 2K25 Course Designer, navigate to Hole settings and set automatic fairway/green generation to 0 for this hole.'
              },
              {
                step: 2,
                title: 'Sculpt Major Terrain & Elevation',
                desc: `Carve the ${hole.elevationChangeYards > 0 ? 'uphill' : 'downhill'} gradient of ${Math.abs(hole.elevationChangeYards)} yards between tee and green using the Landscape Flatten/Sculpt brush.`
              },
              {
                step: 3,
                title: 'Lay Fairway Spline & Landing Corridor',
                desc: `Draw the fairway spline from tee to landing zone (${hole.dogleg} angle). Keep width between 30 to 36 yards.`
              },
              {
                step: 4,
                title: 'Construct Green Complex & False Front',
                desc: `Sculpt green platform with radius ${hole.green.radius}. Ensure slope never exceeds 2.5 degrees near pin cups.`
              },
              {
                step: 5,
                title: 'Dig & Texture Bunkers',
                desc: `Place ${hole.bunkers.length} bunkers according to blueprint coordinates. Smooth bunker lips to avoid 2K25 physics glitches.`
              },
              {
                step: 6,
                title: 'Playtest from Championship Tee',
                desc: 'Hit 5 test drives in in-game playtest mode to confirm fairway rollout speed and sightlines to pin.'
              }
            ].map((task) => (
              <div key={task.step} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {task.step}
                </span>
                <div>
                  <h3 className="font-bold text-xs text-white">{task.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
