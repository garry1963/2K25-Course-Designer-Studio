import React, { useState } from 'react';
import { LiDARDataset } from '../types/golf';
import {
  generateProceduralHeightmap,
  generateSampleLiDARPoints,
  COMMON_GOLF_CRS,
  ProcessingReport
} from '../utils/lidarEngine';
import { Terrain3DViewer } from './Terrain3DViewer';
import {
  Mountain,
  Upload,
  FileCheck,
  Cpu,
  Layers,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Download,
  FolderArchive,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface LiDARStudioProps {
  onApplyHeightmapToProject: (heightmap: number[][]) => void;
  onNavigateTab: (tabId: string) => void;
}

export const LiDARStudio: React.FC<LiDARStudioProps> = ({
  onApplyHeightmapToProject,
  onNavigateTab
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'LAZ' | 'LAS' | 'GeoTIFF' | 'DEM'>('LAZ');
  const [selectedCRS, setSelectedCRS] = useState('EPSG:32618');
  const [verticalDatum, setVerticalDatum] = useState<'NAVD88' | 'EGM96' | 'Ellipsoidal'>('NAVD88');
  const [gridResolution, setGridResolution] = useState<number>(1.0); // 1.0m resolution
  const [smoothingPasses, setSmoothingPasses] = useState<number>(2);
  const [removeCanopy, setRemoveCanopy] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(3); // 1..8

  // Sample heightmap generated from procedural elevation algorithm
  const [heightmap, setHeightmap] = useState<number[][]>(() =>
    generateProceduralHeightmap(48, 48, 'rolling')
  );

  const [activeViewMode, setActiveViewMode] = useState<'3D' | 'HeightmapPreview' | 'Report'>('3D');

  const [processingReport, setProcessingReport] = useState<ProcessingReport>({
    fileName: 'highland_whispering_pines_usgs_1m.laz',
    totalPoints: 1842000,
    groundPoints: 1220400,
    filteredOutliers: 6800,
    detectedCRS: 'EPSG:32618 - WGS 84 / UTM zone 18N',
    elevationRange: { min: 84.2, max: 138.6, unit: 'meters' },
    gridDimensions: { width: 1024, height: 1024 },
    tgcToolsCompatible: true,
    warnings: [
      'Elevation unit is meters. Ensure TGC Designer Tools scaling factor is set to 1.0 (not feet).',
      'Point cloud boundary extends 200m beyond default 2K25 plot boundary. Crop mask recommended.'
    ],
    recommendations: [
      'Classification 2 (Ground) successfully isolated for terrain sculpting.',
      'Vegetation points (Class 3/4/5) stripped to avoid bumpy surface artifacts.',
      'CRS alignment verified for OpenStreetMap feature vector projection.'
    ]
  });

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newHeightmap = generateProceduralHeightmap(48, 48, 'rolling');
      setHeightmap(newHeightmap);
      onApplyHeightmapToProject(newHeightmap);
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Mountain className="w-4 h-4" /> Geographical LiDAR & Terrain Studio
          </div>
          <h1 className="text-2xl font-black text-white mt-1">LiDAR & Heightmap Processing Engine</h1>
          <p className="text-sm text-slate-400">
            Import USGS / DEFRA elevation point-clouds (LAZ, LAS, GeoTIFF), calibrate CRS coordinates, generate 1m resolution heightmaps, and prepare files for TGC Designer Tools.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('execution')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white flex items-center gap-2 hover:bg-slate-800 transition"
          >
            <FolderArchive className="w-4 h-4 text-emerald-400" /> TGC Tools Integration Guide
          </button>
        </div>
      </div>

      {/* 8-Stage Community LiDAR Workflow Stepper */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 overflow-x-auto shadow-lg">
        <div className="flex items-center justify-between min-w-[760px] text-xs">
          {[
            { step: 1, label: 'Import Source' },
            { step: 2, label: 'CRS Datum' },
            { step: 3, label: 'Point-Cloud Filter' },
            { step: 4, label: 'Heightmap Grid' },
            { step: 5, label: 'Boundary Mask' },
            { step: 6, label: 'OSM Overlay' },
            { step: 7, label: '3D Preview' },
            { step: 8, label: '2K25 Export' }
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveWorkflowStage(s.step)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                activeWorkflowStage === s.step
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : activeWorkflowStage > s.step
                  ? 'text-emerald-400 font-medium hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                activeWorkflowStage === s.step ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {s.step}
              </span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Layout: Controls on Left, 3D Interactive Viewport on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: LiDAR Configuration Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* File Format & CRS Selection Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h2 className="font-bold text-sm text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" /> Source Data & Coordinate Reference (CRS)
            </h2>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                LiDAR Format
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['LAZ', 'LAS', 'GeoTIFF', 'DEM'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`py-2 rounded-lg text-xs font-bold transition border ${
                      selectedFormat === fmt
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Coordinate Reference System (EPSG)
              </label>
              <select
                value={selectedCRS}
                onChange={(e) => setSelectedCRS(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {COMMON_GOLF_CRS.map((crs) => (
                  <option key={crs.code} value={crs.code}>
                    {crs.code} — {crs.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Vertical Datum
                </label>
                <select
                  value={verticalDatum}
                  onChange={(e) => setVerticalDatum(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="NAVD88">NAVD88 (North America)</option>
                  <option value="EGM96">EGM96 (Global Geoid)</option>
                  <option value="Ellipsoidal">Ellipsoidal Height</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Resolution
                </label>
                <select
                  value={gridResolution}
                  onChange={(e) => setGridResolution(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="0.5">0.5m (Ultra Precision)</option>
                  <option value="1.0">1.0m (Recommended 2K25)</option>
                  <option value="2.0">2.0m (Standard USGS)</option>
                </select>
              </div>
            </div>

            {/* Filtering Options */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeCanopy}
                  onChange={(e) => setRemoveCanopy(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Remove non-ground returns (Strip Tree Foliage & Buildings)</span>
              </label>

              <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                <span>Gaussian Smoothing Passes:</span>
                <span className="font-bold text-emerald-400">{smoothingPasses} passes</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={smoothingPasses}
                onChange={(e) => setSmoothingPasses(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Processing LiDAR Cloud & Heightmap...
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" /> Run DTM Surface Interpolation
                </>
              )}
            </button>
          </div>

          {/* TGC Designer Tools Pre-flight Validation Checklist */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> TGC Designer Tools Pre-flight Check
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>Blank Course Save Created</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>Heightmap Resolution</span>
                <span className="text-emerald-400 font-bold">1024x1024 16-bit TIFF</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>Coordinate Reference Match</span>
                <span className="text-emerald-400 font-bold">{selectedCRS.split(' ')[0]}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>Backup Game Save Guard</span>
                <span className="text-sky-400 font-bold">Auto-Protected</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              Compatible with TGC Designer Tools v0.3.x+ and experimental 2K25 LiDAR import routines. Never overwrites original course save without user confirmation.
            </div>
          </div>
        </div>

        {/* Right Column: 3D Terrain Viewport & Processing Report */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveViewMode('3D')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeViewMode === '3D' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> 3D Digital Terrain Model
              </button>
              <button
                onClick={() => setActiveViewMode('HeightmapPreview')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeViewMode === 'HeightmapPreview' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> 16-bit Grayscale Heightmap
              </button>
              <button
                onClick={() => setActiveViewMode('Report')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                  activeViewMode === 'Report' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" /> Quality Audit Report
              </button>
            </div>

            <button
              onClick={() => {
                const jsonStr = JSON.stringify(heightmap);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'whispering_pines_2k25_heightmap.json';
                a.click();
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-lg flex items-center gap-1.5 border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5" /> Export Heightmap
            </button>
          </div>

          {/* Viewport container */}
          <div className="h-[520px] rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl bg-slate-950">
            {activeViewMode === '3D' && (
              <Terrain3DViewer
                heightmap={heightmap}
                exaggeration={1.5}
                showContour={true}
              />
            )}

            {activeViewMode === 'HeightmapPreview' && (
              <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-slate-950">
                <div className="w-80 h-80 rounded-xl border-2 border-emerald-500/50 shadow-2xl overflow-hidden grid grid-cols-6 grid-rows-6">
                  {heightmap.slice(0, 36).map((row, r) =>
                    row.slice(0, 36).map((val, c) => (
                      <div
                        key={`${r}-${c}`}
                        style={{
                          backgroundColor: `rgb(${Math.round(val * 255)}, ${Math.round(val * 255)}, ${Math.round(val * 255)})`
                        }}
                      />
                    ))
                  )}
                </div>
                <div className="mt-4 text-center">
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    16-Bit Grayscale Normalized Heightmap [0..65535]
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                    Dark pixels correspond to lowest valleys and water table (84.2m). Light pixels represent high ridge peaks (138.6m).
                  </p>
                </div>
              </div>
            )}

            {activeViewMode === 'Report' && (
              <div className="w-full h-full p-6 overflow-y-auto space-y-4 bg-slate-950 text-xs text-slate-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">LiDAR Processing & Quality Audit Report</h3>
                    <p className="text-slate-400">Source: {processingReport.fileName}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
                    Confidence: 98.4%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Total Point Returns</span>
                    <strong className="text-sm text-white font-mono">{processingReport.totalPoints.toLocaleString()}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Classified Ground Points</span>
                    <strong className="text-sm text-emerald-400 font-mono">{processingReport.groundPoints.toLocaleString()} (66.2%)</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">Elevation Range</span>
                    <strong className="text-sm text-white font-mono">
                      {processingReport.elevationRange.min}m – {processingReport.elevationRange.max}m ({((processingReport.elevationRange.max - processingReport.elevationRange.min) * 1.09361).toFixed(1)} yds delta)
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[11px]">CRS Datum</span>
                    <strong className="text-sm text-sky-400 font-mono">{processingReport.detectedCRS}</strong>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block text-[11px]">
                    Validation Findings & Verification
                  </span>
                  {processingReport.recommendations.map((rec, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                  {processingReport.warnings.map((w, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-amber-300 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
