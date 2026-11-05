import React, { useState } from 'react';
import { CourseTheme } from '../types/golf';
import { OFFICIAL_2K25_THEMES } from '../data/mockGolfData';
import {
  Layers,
  Check,
  TreePine,
  Sun,
  Mountain,
  Compass,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface ThemeExplorerProps {
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ThemeExplorer: React.FC<ThemeExplorerProps> = ({
  currentThemeId,
  onSelectTheme,
  onNavigateTab
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(currentThemeId || 'boreal');
  const [compareThemeId, setCompareThemeId] = useState<string>('links');
  const [isComparing, setIsComparing] = useState(false);

  const selectedTheme = OFFICIAL_2K25_THEMES.find((t) => t.id === selectedThemeId) || OFFICIAL_2K25_THEMES[0];
  const compareTheme = OFFICIAL_2K25_THEMES.find((t) => t.id === compareThemeId) || OFFICIAL_2K25_THEMES[1];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" /> PGA TOUR 2K25 Theme Reference
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Course Designer Theme Explorer</h1>
          <p className="text-sm text-slate-400">
            Compare verified in-game environmental presets, foliage blends, backdrops, and automated terrain behaviors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsComparing(!isComparing)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
              isComparing
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" /> {isComparing ? 'Close Comparison' : 'Side-by-Side Compare'}
          </button>
        </div>
      </div>

      {/* Theme Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {OFFICIAL_2K25_THEMES.map((theme) => {
          const isActive = theme.id === selectedThemeId;
          return (
            <button
              key={theme.id}
              onClick={() => setSelectedThemeId(theme.id)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-32 ${
                isActive
                  ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white">{theme.name}</span>
                {theme.id === currentThemeId && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Color Swatch Preview Palette */}
              <div className="flex items-center gap-1 my-1.5">
                <div
                  className="w-4 h-4 rounded-md border border-slate-700 shadow-sm"
                  style={{ backgroundColor: theme.recommendedColors.fairway }}
                  title="Fairway Turf"
                />
                <div
                  className="w-4 h-4 rounded-md border border-slate-700 shadow-sm"
                  style={{ backgroundColor: theme.recommendedColors.green }}
                  title="Green Turf"
                />
                <div
                  className="w-4 h-4 rounded-md border border-slate-700 shadow-sm"
                  style={{ backgroundColor: theme.recommendedColors.rough }}
                  title="Rough"
                />
                <div
                  className="w-4 h-4 rounded-md border border-slate-700 shadow-sm"
                  style={{ backgroundColor: theme.recommendedColors.bunkerSand }}
                  title="Bunker Sand"
                />
                <div
                  className="w-4 h-4 rounded-md border border-slate-700 shadow-sm"
                  style={{ backgroundColor: theme.recommendedColors.water }}
                  title="Water"
                />
              </div>

              <div className="text-[11px] text-slate-400 line-clamp-1 truncate">
                {theme.suitableStyles[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Theme Detail or Comparison View */}
      {isComparing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Theme */}
          <ThemeDetailCard
            theme={selectedTheme}
            isCurrent={selectedTheme.id === currentThemeId}
            onApply={() => onSelectTheme(selectedTheme.id)}
          />
          {/* Right Compare Theme */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold uppercase">Compare Against:</span>
              <select
                value={compareThemeId}
                onChange={(e) => setCompareThemeId(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg text-xs text-white px-2.5 py-1"
              >
                {OFFICIAL_2K25_THEMES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <ThemeDetailCard
              theme={compareTheme}
              isCurrent={compareTheme.id === currentThemeId}
              onApply={() => onSelectTheme(compareTheme.id)}
            />
          </div>
        </div>
      ) : (
        <ThemeDetailCard
          theme={selectedTheme}
          isCurrent={selectedTheme.id === currentThemeId}
          onApply={() => onSelectTheme(selectedTheme.id)}
        />
      )}

      {/* Community Warning Note from Master Prompt */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-900/40 text-xs text-amber-200/90 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-300 font-bold">Important Course Designer Architecture Note:</strong>
          <p className="leading-relaxed">
            In PGA TOUR 2K25, selecting an environment theme primarily dictates the background horizon panoramas, lighting model, weather parameters, and automated tree/bush generation. It does not automatically sculpt the terrain or lay fairway ribbons—those are planned via the <strong>Course Masterplan</strong> and sculpted manually in-game.
          </p>
        </div>
      </div>
    </div>
  );
};

const ThemeDetailCard: React.FC<{
  theme: CourseTheme;
  isCurrent: boolean;
  onApply: () => void;
}> = ({ theme, isCurrent, onApply }) => {
  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            2K25 Verified Theme
          </span>
          <h2 className="text-2xl font-black text-white mt-0.5">{theme.name}</h2>
        </div>
        <button
          onClick={onApply}
          disabled={isCurrent}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
            isCurrent
              ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 cursor-default'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
          }`}
        >
          {isCurrent ? <CheckCircle2 className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {isCurrent ? 'Current Project Theme' : 'Set as Project Theme'}
        </button>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">{theme.description}</p>

      {/* Color Swatches Breakdown */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Turf & Environmental Color Harmonization
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg border border-slate-700 shrink-0" style={{ backgroundColor: theme.recommendedColors.fairway }} />
            <div className="text-[11px]"><div className="font-bold text-white">Fairway</div><div className="text-slate-400">Turf Tint</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg border border-slate-700 shrink-0" style={{ backgroundColor: theme.recommendedColors.green }} />
            <div className="text-[11px]"><div className="font-bold text-white">Green</div><div className="text-slate-400">Putting Cut</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg border border-slate-700 shrink-0" style={{ backgroundColor: theme.recommendedColors.rough }} />
            <div className="text-[11px]"><div className="font-bold text-white">Rough</div><div className="text-slate-400">Secondary</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg border border-slate-700 shrink-0" style={{ backgroundColor: theme.recommendedColors.bunkerSand }} />
            <div className="text-[11px]"><div className="font-bold text-white">Sand</div><div className="text-slate-400">Bunker Base</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg border border-slate-700 shrink-0" style={{ backgroundColor: theme.recommendedColors.water }} />
            <div className="text-[11px]"><div className="font-bold text-white">Water</div><div className="text-slate-400">Depths</div></div>
          </div>
        </div>
      </div>

      {/* Architectural Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
            <TreePine className="w-3.5 h-3.5 text-emerald-400" /> Typical Foliage & Flora
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {theme.typicalVegetation.map((veg, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {veg}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-sky-400" /> Suitable Golf Styles
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {theme.suitableStyles.map((style, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                {style}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
            <Mountain className="w-3.5 h-3.5 text-purple-400" /> Horizon Backdrop
          </span>
          <div className="text-xs text-white pt-1">{theme.suggestedBackdrop}</div>
        </div>

        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" /> Suggested Water Features
          </span>
          <div className="text-xs text-white pt-1">{theme.suggestedWater}</div>
        </div>
      </div>
    </div>
  );
};
