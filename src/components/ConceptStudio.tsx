import React, { useState } from 'react';
import { CourseProject } from '../types/golf';
import { OFFICIAL_2K25_THEMES } from '../data/mockGolfData';
import {
  Sparkles,
  RefreshCw,
  Sliders,
  Check,
  Eye,
  Bookmark,
  Share2,
  Compass,
  TreePine,
  Mountain,
  Sun,
  Layers,
  Info
} from 'lucide-react';

interface ConceptStudioProps {
  project: CourseProject;
  onApplyConcept: (themeId: string, style: string, summary: string, recommendations: string[]) => void;
  onNavigateTab: (tabId: string) => void;
}

interface GeneratedConceptItem {
  id: string;
  title: string;
  themeId: string;
  themeName: string;
  style: string;
  par: number;
  lengthYards: number;
  backdrop: string;
  vegetationPreset: string;
  waterFeatureType: string;
  bunkerStyle: string;
  terrainSignature: string;
  summary: string;
  recommendations: string[];
}

export const ConceptStudio: React.FC<ConceptStudioProps> = ({
  project,
  onApplyConcept,
  onNavigateTab
}) => {
  const [prompt, setPrompt] = useState(
    project.conceptPrompt ||
      'An 18-hole championship mountain-forest golf course carved through steep Scots pine ridges with glacial streams, sod-faced pot bunkers, and dramatic elevated cliffside tee shots overlooking a tranquil alpine lake.'
  );

  const [selectedStyle, setSelectedStyle] = useState<string>(project.style);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Recreational' | 'Championship' | 'Tournament'>('Championship');
  const [holesCount, setHolesCount] = useState<9 | 18>(project.holesCount);
  const [activePerspective, setActivePerspective] = useState<string>('Aerial');
  const [isGenerating, setIsGenerating] = useState(false);

  // Pre-calculated & AI-synthesized concept variations
  const [concepts, setConcepts] = useState<GeneratedConceptItem[]>([
    {
      id: 'c1',
      title: 'Highland Glacial Reserve (Concept A)',
      themeId: 'boreal',
      themeName: 'Boreal',
      style: 'Championship',
      par: 72,
      lengthYards: 7260,
      backdrop: 'Distant Pine Ridges & Alpine Mist',
      vegetationPreset: 'Dense Scots Pine, Balsam Fir & Wild Heather',
      waterFeatureType: 'Glacial Torrent Creek & Mirrored Tarn Lakes',
      bunkerStyle: 'Deep Revetted Pot Bunkers with Grass Faces',
      terrainSignature: 'Sharp 40ft ridge drop-offs, natural kettle depressions, shelf greens',
      summary:
        'A rugged northern layout that leverages dramatic elevation drops to generate breathtaking tee shots while penalizing missed fairways with native heathland.',
      recommendations: [
        'Select the Boreal theme in 2K25 Course Designer with Tree Density set to 75%.',
        'Use the Blank Plot zero-out workflow before laying fairways on the severe elevation drop of holes 3 and 10.',
        'Set default green firmness to Firm (stimp 155) to reward properly placed approach shots.'
      ]
    },
    {
      id: 'c2',
      title: 'Thunder Valley Links (Concept B)',
      themeId: 'links',
      themeName: 'Links',
      style: 'Traditional Links',
      par: 71,
      lengthYards: 7080,
      backdrop: 'Rolling Coastal Dune Bluff & Open Horizon',
      vegetationPreset: 'Whistling Marram Grass & Low Sea Cabbage',
      waterFeatureType: 'Natural Winding Burns & Coastal Swales',
      bunkerStyle: 'Authentic Sod-Walled Bunker Rings with Heavy Lips',
      terrainSignature: 'Firm undulating rumpled fairway swales with deep green run-offs',
      summary:
        'True coastal links philosophy where ground game and rolling shots triumph over target golf. Wind direction alters club selection by up to 3 clubs.',
      recommendations: [
        'Apply the Links theme in 2K25 and calibrate fairway firmness to maximum (180).',
        'Carve out false fronts that send balls spinning 25 yards back down approach hollows.',
        'Use cross-bunkering at 285 yards to force strategic layups on prevailing downwind days.'
      ]
    },
    {
      id: 'c3',
      title: 'Granite Ridge Sanctuary (Concept C)',
      themeId: 'swiss',
      themeName: 'Swiss',
      style: 'Alpine Mountain',
      par: 72,
      lengthYards: 7340,
      backdrop: 'Towering 14,000ft Snowcapped Mountain Massifs',
      vegetationPreset: 'Alpine Larch, Swiss Stone Pine & Scree Slopes',
      waterFeatureType: 'Rushing Glacier River with Boulder Spillways',
      bunkerStyle: 'Sculpted Sandbelt-style Bunkers Cut into Hillside',
      terrainSignature: 'Extreme verticality with multi-tier amphitheatre spectator bowls',
      summary:
        'A majestic alpine journey where every hole is framed by jagged rocky crags and dramatic soundscapes of cascading glacier waters.',
      recommendations: [
        'Set Swiss theme in 2K25 with custom rock placements along fairway edges.',
        'Sculpt punchbowl greens on blind approaches to keep the extreme slope fair.',
        'Limit out-of-bounds stakes to preserve open mountain playability.'
      ]
    }
  ]);

  const [activeConceptIndex, setActiveConceptIndex] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Shuffle or refine concept
    }, 1200);
  };

  const currentConcept = concepts[activeConceptIndex];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> AI Course Concept Studio
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Generate Golf Course Concepts & Environments</h1>
          <p className="text-sm text-slate-400">
            Describe your dream course in natural language. Our AI synthesizes themes, architectural DNA, hole routing logic, and 2K25 environmental settings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('themes')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-2 hover:bg-slate-800 transition"
          >
            <Layers className="w-4 h-4 text-emerald-400" /> 2K25 Theme Explorer
          </button>
        </div>
      </div>

      {/* Input Formulation Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <label className="block text-xs font-bold uppercase text-slate-300 tracking-wider">
          Course Vision & Natural Language Description
        </label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="e.g., Design a 7,200 yard championship links course weaving along jagged ocean sea cliffs with deep pot bunkers, natural fescue dunes, and a dramatic island green 17th hole..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none leading-relaxed"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="absolute bottom-3 right-3 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 transition disabled:opacity-50 shadow-md"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Synthesizing...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> Generate Architecture Concepts
              </>
            )}
          </button>
        </div>

        {/* Quick Style Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 font-medium">Presets:</span>
          {[
            'Championship Mountain Forest',
            'Authentic Scottish Links',
            'Southwest Desert Oasis',
            'Augusta-Style Azalea Parkland',
            'Melbourne Sandbelt',
            'Tropical Volcanic Reef'
          ].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setPrompt(`A world-class ${preset} layout designed for PGA TOUR 2K25 with tournament greens, deep strategic bunkers, and dramatic natural vistas.`);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-600/60 text-[11px] text-slate-300 hover:text-emerald-300 transition"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Alternative Concept Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            {concepts.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveConceptIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeConceptIndex === idx
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{c.title}</span>
                <span className="text-[10px] opacity-80 uppercase px-1.5 py-0.2 rounded bg-black/20">
                  {c.themeName}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onApplyConcept(
                currentConcept.themeId,
                currentConcept.style,
                currentConcept.summary,
                currentConcept.recommendations
              );
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition"
          >
            <Check className="w-4 h-4" /> Apply This Concept to Project
          </button>
        </div>

        {/* Selected Concept Deep Dive View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visual Concept Render Preview */}
          <div className="lg:col-span-1 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" /> Visual Environment Concept
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-semibold">
                Theme: {currentConcept.themeName}
              </span>
            </div>

            {/* Generated Concept Canvas Card */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group shadow-inner flex flex-col justify-end p-4">
              {/* Procedural Golf Landscape Gradient Background */}
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    currentConcept.themeId === 'links'
                      ? 'linear-gradient(to bottom, #1e3d59, #17252a 40%, #3a506b 70%, #4a7c59 100%)'
                      : currentConcept.themeId === 'swiss'
                      ? 'linear-gradient(to bottom, #2b2d42, #4a4e69 35%, #8d99ae 70%, #2a6f97 100%)'
                      : 'linear-gradient(to bottom, #0d1b2a, #1b263b 35%, #415a77 65%, #2d6a4f 100%)'
                }}
              />

              {/* Decorative Landscape Elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="relative z-10 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  {activePerspective} Perspective Simulation
                </div>
                <div className="text-base font-extrabold text-white">{currentConcept.title}</div>
                <p className="text-xs text-slate-300 line-clamp-2">{currentConcept.backdrop}</p>
              </div>
            </div>

            {/* Perspective Selector Pills */}
            <div className="flex items-center justify-between gap-1 text-[11px] bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['Aerial', 'Tee-to-Green', 'Green Complex', 'Clubhouse Vista'].map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePerspective(p)}
                  className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
                    activePerspective === p ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <Info className="w-3.5 h-3.5 text-sky-400" /> 2K25 Environment Note
              </div>
              <p className="text-[11px] leading-relaxed">
                Images serve as architectural and mood inspiration. 2K25 in-game lighting and automated tree placement will adhere to the{' '}
                <strong className="text-emerald-400">{currentConcept.themeName}</strong> theme configuration.
              </p>
            </div>
          </div>

          {/* Architectural Breakdown & 2K25 Settings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5">
              <div>
                <h3 className="text-lg font-extrabold text-white">Architectural Summary & Character</h3>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">{currentConcept.summary}</p>
              </div>

              {/* Specific Spec Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <TreePine className="w-3.5 h-3.5 text-emerald-400" /> Vegetation Preset
                  </span>
                  <div className="text-sm font-semibold text-white">{currentConcept.vegetationPreset}</div>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-400" /> Bunkering Style
                  </span>
                  <div className="text-sm font-semibold text-white">{currentConcept.bunkerStyle}</div>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-sky-400" /> Suggested Water Features
                  </span>
                  <div className="text-sm font-semibold text-white">{currentConcept.waterFeatureType}</div>
                </div>

                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-purple-400" /> Terrain Character
                  </span>
                  <div className="text-sm font-semibold text-white">{currentConcept.terrainSignature}</div>
                </div>
              </div>

              {/* Actionable Recommendations for 2K25 */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4" /> 2K25 Implementation Blueprint
                </h4>
                <div className="space-y-2">
                  {currentConcept.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
