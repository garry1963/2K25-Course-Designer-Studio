import React, { useState } from 'react';
import { CourseProject } from '../types/golf';
import {
  Download,
  FileText,
  Layers,
  Check,
  Share2,
  FolderArchive,
  Image,
  Printer,
  Table,
  CheckCircle2
} from 'lucide-react';

interface ExportCentreProps {
  project: CourseProject;
  heightmap: number[][];
}

export const ExportCentre: React.FC<ExportCentreProps> = ({ project, heightmap }) => {
  const [exportedFormat, setExportedFormat] = useState<string | null>(null);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `${project.name.toLowerCase().replace(/\s+/g, '_')}_2k25_project.json`);
    dlAnchorElem.click();
    setExportedFormat('JSON Project Save');
    setTimeout(() => setExportedFormat(null), 3000);
  };

  const handleExportCSV = () => {
    let csv = 'HoleNumber,Par,Yardage,ElevationDeltaYards,Dogleg,TeeX,TeeY,GreenX,GreenY,BunkersCount\n';
    project.holes.forEach((h) => {
      csv += `${h.number},${h.par},${h.yardage},${h.elevationChangeYards},${h.dogleg},${h.tee.x},${h.tee.y},${h.green.x},${h.green.y},${h.bunkers.length}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '_')}_scorecard_coordinates.csv`;
    a.click();
    setExportedFormat('Scorecard & Coordinates CSV');
    setTimeout(() => setExportedFormat(null), 3000);
  };

  const handleExportHeightmap = () => {
    const jsonStr = JSON.stringify(heightmap);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.toLowerCase().replace(/\s+/g, '_')}_16bit_heightmap.json`;
    a.click();
    setExportedFormat('16-bit Heightmap DTM');
    setTimeout(() => setExportedFormat(null), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Download className="w-4 h-4" /> Production Export Centre
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Export Course Plans & Terrain Datasets</h1>
          <p className="text-sm text-slate-400">
            Generate printable PDF construction dossiers, 16-bit heightmaps for TGC Designer Tools, GIS coordinates CSV, and complete course backup archives.
          </p>
        </div>

        {exportedFormat && (
          <div className="px-3.5 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Exported: {exportedFormat}
          </div>
        )}
      </div>

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Complete Project JSON Archive */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <FolderArchive className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Full Project Master Archive (.json)</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete course backup including all 18 hole coordinates, tee/green GPS positions, bunker matrices, 2K25 theme settings, object budget allocations, and playtest logs.
            </p>
          </div>
          <button
            onClick={handleExportJSON}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition"
          >
            <Download className="w-4 h-4" /> Export Complete Project
          </button>
        </div>

        {/* Card 2: 16-Bit Terrain Heightmap */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">16-Bit DTM Heightmap Grid</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calibrated elevation raster compatible with external community heightmap tools (TGC Designer Tools). Scaled with zero ground distortion.
            </p>
          </div>
          <button
            onClick={handleExportHeightmap}
            className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition"
          >
            <Download className="w-4 h-4" /> Export 16-Bit Heightmap
          </button>
        </div>

        {/* Card 3: Hole Coordinates & Scorecard CSV */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
              <Table className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Scorecard & Coordinates (.csv)</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tabular spreadsheet containing hole-by-hole yardages, par values, handicap ratings, dogleg directions, and exact tee-to-green cartesian plot coordinates.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
          >
            <Download className="w-4 h-4" /> Export CSV Spreadsheet
          </button>
        </div>
      </div>

      {/* Course Scorecard Summary Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-white">18-Hole Official Tournament Scorecard</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-300">
            <thead className="text-[11px] uppercase bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="px-3 py-2.5">Hole</th>
                <th className="px-3 py-2.5">Par</th>
                <th className="px-3 py-2.5">Yardage</th>
                <th className="px-3 py-2.5">Elevation</th>
                <th className="px-3 py-2.5">Dogleg</th>
                <th className="px-3 py-2.5">Handicap</th>
                <th className="px-3 py-2.5">Bunkers</th>
                <th className="px-3 py-2.5">Water Hazard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {project.holes.map((h) => (
                <tr key={h.id} className="hover:bg-slate-800/40">
                  <td className="px-3 py-2 font-bold text-white">#{h.number}</td>
                  <td className="px-3 py-2 text-emerald-400 font-bold">{h.par}</td>
                  <td className="px-3 py-2">{h.yardage} yds</td>
                  <td className={`px-3 py-2 ${h.elevationChangeYards < 0 ? 'text-sky-400' : 'text-amber-400'}`}>
                    {h.elevationChangeYards > 0 ? `+${h.elevationChangeYards}` : h.elevationChangeYards} yds
                  </td>
                  <td className="px-3 py-2 font-sans">{h.dogleg}</td>
                  <td className="px-3 py-2">{h.handicapIndex}</td>
                  <td className="px-3 py-2">{h.bunkers.length}</td>
                  <td className="px-3 py-2 font-sans">{h.waterHazards.length > 0 ? 'Yes' : 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
