import React, { useState } from 'react';
import { CourseProject } from '../types/golf';
import { OFFICIAL_2K25_THEMES } from '../data/mockGolfData';
import { createNewCourseProject } from '../utils/projectFactory';
import {
  FolderPlus,
  Trash2,
  Check,
  X,
  Compass,
  Layers,
  Sparkles,
  AlertTriangle,
  FolderOpen,
  Calendar,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ProjectManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: CourseProject[];
  currentProjectId: string;
  onSelectProject: (projectId: string) => void;
  onCreateProject: (newProject: CourseProject) => void;
  onDeleteProject: (projectId: string) => void;
}

export const ProjectManagerModal: React.FC<ProjectManagerModalProps> = ({
  isOpen,
  onClose,
  projects,
  currentProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject
}) => {
  const [activeView, setActiveView] = useState<'list' | 'create'>('list');
  const [projectToDelete, setProjectToDelete] = useState<CourseProject | null>(null);

  // New Project Form State
  const [newName, setNewName] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newStyle, setNewStyle] = useState<CourseProject['style']>('Championship');
  const [newTheme, setNewTheme] = useState('boreal');
  const [newHolesCount, setNewHolesCount] = useState<9 | 18>(18);
  const [newLocation, setNewLocation] = useState('');

  if (!isOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created = createNewCourseProject({
      name: newName.trim(),
      subtitle: newSubtitle.trim() || undefined,
      style: newStyle,
      environmentTheme: newTheme,
      holesCount: newHolesCount,
      locationName: newLocation.trim() || undefined
    });

    onCreateProject(created);
    // Reset form
    setNewName('');
    setNewSubtitle('');
    setNewLocation('');
    setActiveView('list');
    onClose();
  };

  const confirmDelete = () => {
    if (!projectToDelete) return;
    onDeleteProject(projectToDelete.id);
    setProjectToDelete(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Project Manager</h2>
              <p className="text-xs text-slate-400">Create, switch, or remove 2K25 course design projects</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeView === 'list' ? (
              <button
                onClick={() => setActiveView('create')}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                <FolderPlus className="w-4 h-4" /> New Project
              </button>
            ) : (
              <button
                onClick={() => setActiveView('list')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
              >
                Back to Projects
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeView === 'list' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
                <span>Course Projects ({projects.length})</span>
                <span>Active Project Highlighted</span>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => {
                  const isActive = proj.id === currentProjectId;
                  const totalYds = proj.holes.reduce((sum, h) => sum + h.yardage, 0);

                  return (
                    <div
                      key={proj.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isActive
                          ? 'bg-emerald-950/20 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/30'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-extrabold text-sm text-white">{proj.name}</h3>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Active Project
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-1">{proj.subtitle} — {proj.locationName}</p>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                          <span className="text-slate-300 font-medium">Theme: <strong className="capitalize text-amber-400">{proj.environmentTheme}</strong></span>
                          <span>•</span>
                          <span>Holes: <strong className="text-white">{proj.holesCount} (Par {proj.targetPar})</strong></span>
                          <span>•</span>
                          <span>Yardage: <strong className="text-emerald-400">{totalYds.toLocaleString()} yds</strong></span>
                          <span>•</span>
                          <span className="font-mono text-slate-500">{proj.version}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {!isActive && (
                          <button
                            onClick={() => {
                              onSelectProject(proj.id);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition"
                          >
                            Open Project
                          </button>
                        )}

                        <button
                          onClick={() => setProjectToDelete(proj)}
                          disabled={projects.length <= 1}
                          title={projects.length <= 1 ? 'Cannot delete the only remaining project' : 'Remove course project'}
                          className={`p-2 rounded-lg transition ${
                            projects.length <= 1
                              ? 'text-slate-600 cursor-not-allowed'
                              : 'text-red-400 hover:bg-red-950/50 hover:text-red-300'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Create New Project Form */
            <form onSubmit={handleCreateSubmit} className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  New Course Project Setup
                </span>
                <p className="text-xs text-slate-400">
                  Initialize a new blank golf course project with calibrated routing boundaries and 2K25 theme settings.
                </p>
              </div>

              <div className="space-y-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Course Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Black Sands Ocean Links"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Subtitle / Course Description
                    </label>
                    <input
                      type="text"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      placeholder="e.g. Championship 18-Hole Dunes Reserve"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Number of Holes
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {([18, 9] as const).map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setNewHolesCount(count)}
                          className={`py-2 rounded-xl text-xs font-bold border transition ${
                            newHolesCount === count
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {count} Holes
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      2K25 Environment Theme
                    </label>
                    <select
                      value={newTheme}
                      onChange={(e) => setNewTheme(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white capitalize focus:outline-none focus:border-emerald-500"
                    >
                      {OFFICIAL_2K25_THEMES.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                          {theme.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                      Architectural Style
                    </label>
                    <select
                      value={newStyle}
                      onChange={(e) => setNewStyle(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Championship">Championship</option>
                      <option value="Traditional Links">Traditional Links</option>
                      <option value="Sandbelt">Sandbelt</option>
                      <option value="Desert Oasis">Desert Oasis</option>
                      <option value="Alpine Mountain">Alpine Mountain</option>
                      <option value="Tropical Rainforest">Tropical Rainforest</option>
                      <option value="Heathland">Heathland</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
                    Location Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Monterey Peninsula, CA or Fife, Scotland"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveView('list')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                >
                  <Check className="w-4 h-4" /> Create & Open Project
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        {projectToDelete && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85">
            <div className="w-full max-w-md bg-slate-900 border border-red-900/60 rounded-2xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 text-red-400">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/80 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Delete Course Project?</h3>
                  <p className="text-xs text-slate-400">This action cannot be undone.</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                Are you sure you want to remove <strong className="text-white">"{projectToDelete.name}"</strong>? All 18-hole routing, bunker placements, and playtesting logs will be permanently deleted from this studio.
              </p>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={() => setProjectToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  Keep Project
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-600/20 transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
