import React, { useState, useEffect } from 'react';
import { CourseProject, Hole } from './types/golf';
import { generateProceduralHeightmap } from './utils/lidarEngine';
import {
  loadProjectsFromStorage,
  saveProjectsToStorage,
  loadActiveProjectId,
  saveActiveProjectId
} from './utils/projectStorage';
import { createNewCourseProject } from './utils/projectFactory';

// Components
import { ProjectDashboard } from './components/ProjectDashboard';
import { ConceptStudio } from './components/ConceptStudio';
import { ThemeExplorer } from './components/ThemeExplorer';
import { MasterplanDesigner } from './components/MasterplanDesigner';
import { HoleDesigner } from './components/HoleDesigner';
import { LiDARStudio } from './components/LiDARStudio';
import { ResearchStudio } from './components/ResearchStudio';
import { ExecutionGuide } from './components/ExecutionGuide';
import { ExportCentre } from './components/ExportCentre';
import { AIAssistant } from './components/AIAssistant';
import { Playtesting } from './components/Playtesting';
import { HelpGuide } from './components/HelpGuide';
import { ProjectManagerModal } from './components/ProjectManagerModal';

// Icons
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  Compass,
  Flag,
  Mountain,
  BookOpen,
  Play,
  Download,
  Bot,
  Trophy,
  Save,
  CheckCircle2,
  FolderOpen,
  FolderPlus,
  HelpCircle,
  AlertTriangle,
  LogOut,
  X,
  Check
} from 'lucide-react';

export default function App() {
  // Load initial projects from storage (or fresh blank project if empty)
  const [projects, setProjects] = useState<CourseProject[]>(() => loadProjectsFromStorage());
  const [currentProjectId, setCurrentProjectId] = useState<string>(() => {
    const loaded = loadProjectsFromStorage();
    const savedId = loadActiveProjectId();
    if (savedId && loaded.some((p) => p.id === savedId)) {
      return savedId;
    }
    return loaded[0]?.id || '';
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedHoleNumber, setSelectedHoleNumber] = useState<number>(1);

  // Persistence & Unsaved Changes State
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(() => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });
  const [saveToastMessage, setSaveToastMessage] = useState<string | null>(null);

  // Modals for Unsaved Actions
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isUnsavedPromptOpen, setIsUnsavedPromptOpen] = useState<boolean>(false);
  const [pendingSwitchProjectId, setPendingSwitchProjectId] = useState<string | null>(null);

  // Ensure an active project always exists
  const project =
    projects.find((p) => p.id === currentProjectId) ||
    projects[0] ||
    createNewCourseProject({ name: 'My Course 1', holesCount: 18 });

  // Update current project and flag unsaved changes
  const setProject = (updater: CourseProject | ((prev: CourseProject) => CourseProject)) => {
    setProjects((prevProjects) => {
      return prevProjects.map((p) => {
        if (p.id === currentProjectId) {
          const updated = typeof updater === 'function' ? updater(p) : updater;
          return {
            ...updated,
            lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return p;
      });
    });
    setHasUnsavedChanges(true);
  };

  // Master Heightmap state
  const [heightmap, setHeightmap] = useState<number[][]>(() =>
    generateProceduralHeightmap(48, 48, 'rolling')
  );

  const selectedHole = project.holes.find((h) => h.number === selectedHoleNumber) || project.holes[0];

  const handleUpdateHole = (updatedHole: Hole) => {
    setProject((prev) => ({
      ...prev,
      holes: prev.holes.map((h) => (h.id === updatedHole.id ? updatedHole : h))
    }));
  };

  // Explicit Save Project Handler
  const handleSaveProject = () => {
    const success = saveProjectsToStorage(projects);
    saveActiveProjectId(currentProjectId);
    if (success) {
      setHasUnsavedChanges(false);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSavedTime(timeStr);
      setSaveToastMessage(`Course "${project.name}" saved successfully!`);
      setTimeout(() => setSaveToastMessage(null), 3000);
    }
  };

  // Browser beforeunload protection: ask to save before closing window/tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved course modifications. Are you sure you want to close without saving?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  // Keyboard shortcut: Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects, currentProjectId]);

  // Project Creation
  const handleCreateProject = (newProj: CourseProject) => {
    const updated = [newProj, ...projects];
    setProjects(updated);
    setCurrentProjectId(newProj.id);
    saveProjectsToStorage(updated);
    saveActiveProjectId(newProj.id);
    setHasUnsavedChanges(false);
    setSelectedHoleNumber(1);
    setActiveTab('dashboard');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSavedTime(timeStr);
    setSaveToastMessage(`New course "${newProj.name}" created and saved!`);
    setTimeout(() => setSaveToastMessage(null), 3000);
  };

  // Project Deletion
  const handleDeleteProject = (projectIdToDelete: string) => {
    const remaining = projects.filter((p) => p.id !== projectIdToDelete);
    const finalProjects =
      remaining.length > 0
        ? remaining
        : [createNewCourseProject({ name: 'My Course 1', holesCount: 18 })];

    setProjects(finalProjects);
    saveProjectsToStorage(finalProjects);

    if (currentProjectId === projectIdToDelete) {
      setCurrentProjectId(finalProjects[0].id);
      saveActiveProjectId(finalProjects[0].id);
      setSelectedHoleNumber(1);
    }

    setHasUnsavedChanges(false);
    setSaveToastMessage('Project removed.');
    setTimeout(() => setSaveToastMessage(null), 3000);
  };

  // Safe Project Switching with dirty check
  const handleRequestSelectProject = (newProjectId: string) => {
    if (newProjectId === currentProjectId) return;

    if (hasUnsavedChanges) {
      setPendingSwitchProjectId(newProjectId);
      setIsUnsavedPromptOpen(true);
    } else {
      setCurrentProjectId(newProjectId);
      saveActiveProjectId(newProjectId);
      setSelectedHoleNumber(1);
    }
  };

  // Confirm Save & Switch
  const handleConfirmSaveAndSwitch = () => {
    handleSaveProject();
    if (pendingSwitchProjectId) {
      setCurrentProjectId(pendingSwitchProjectId);
      saveActiveProjectId(pendingSwitchProjectId);
      setSelectedHoleNumber(1);
    }
    setPendingSwitchProjectId(null);
    setIsUnsavedPromptOpen(false);
  };

  // Discard & Switch
  const handleDiscardAndSwitch = () => {
    // Reload from storage to reset in-memory changes
    const stored = loadProjectsFromStorage();
    setProjects(stored);
    setHasUnsavedChanges(false);
    if (pendingSwitchProjectId) {
      setCurrentProjectId(pendingSwitchProjectId);
      saveActiveProjectId(pendingSwitchProjectId);
      setSelectedHoleNumber(1);
    }
    setPendingSwitchProjectId(null);
    setIsUnsavedPromptOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Project Dashboard', icon: LayoutDashboard },
    { id: 'concept', label: 'AI Concept Studio', icon: Sparkles },
    { id: 'themes', label: '2K25 Theme Explorer', icon: Layers },
    { id: 'masterplan', label: 'Course Masterplan', icon: Compass },
    { id: 'hole', label: 'Hole Designer', icon: Flag },
    { id: 'lidar', label: 'LiDAR & Terrain', icon: Mountain },
    { id: 'research', label: 'Course Research', icon: BookOpen },
    { id: 'execution', label: '2K25 Execution', icon: Play },
    { id: 'assistant', label: 'AI Architect', icon: Bot },
    { id: 'playtesting', label: 'Playtesting & QA', icon: Trophy },
    { id: 'export', label: 'Export Centre', icon: Download },
    { id: 'help', label: 'Help & User Guide', icon: HelpCircle }
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Toast Notification Banner */}
      {saveToastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-900/90 border border-emerald-500/80 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs font-bold">{saveToastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
        {/* App Title & Branding */}
        <div className="p-4 border-b border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-emerald-500/20">
              2K
            </div>
            <div>
              <div className="text-xs font-black tracking-wider uppercase text-emerald-400 leading-none">
                PGA TOUR 2K25
              </div>
              <div className="text-sm font-bold text-white tracking-tight mt-0.5">
                Designer Studio
              </div>
            </div>
          </div>

          {/* Project Switcher Card */}
          <div
            onClick={() => setIsProjectModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between text-xs transition group"
            title="Click to switch projects or create a new course"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <FolderOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-slate-200 truncate font-bold text-[11px] group-hover:text-emerald-300">
                {project.name}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 group-hover:text-emerald-400 font-mono font-medium shrink-0 ml-1">
              Switch
            </span>
          </div>

          {/* Dedicated Save Project Button in Sidebar */}
          <button
            onClick={handleSaveProject}
            title="Save course project to local storage (Ctrl+S)"
            className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all shadow-md ${
              hasUnsavedChanges
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 ring-2 ring-amber-400/40 animate-pulse'
                : 'bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-700/60'
            }`}
          >
            <div className="flex items-center gap-2">
              {hasUnsavedChanges ? (
                <Save className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
              <span>{hasUnsavedChanges ? 'Save Project' : 'Project Saved'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {hasUnsavedChanges ? (
                <span className="text-[9px] uppercase tracking-wider bg-slate-950/30 text-slate-950 px-1.5 py-0.5 rounded font-black">
                  Unsaved
                </span>
              ) : (
                <span className="text-[10px] text-emerald-400/80 font-mono">
                  Ctrl+S
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
          >
            <FolderPlus className="w-3.5 h-3.5" /> + New Course Project
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto p-2.5 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Project Metadata Bar & Exit Studio Trigger */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 space-y-2 bg-slate-950/70">
          <div className="flex justify-between items-center text-slate-400">
            <span>Storage Status:</span>
            <span className={hasUnsavedChanges ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {hasUnsavedChanges ? '● Unsaved edits' : '✓ Saved to browser'}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Theme:</span>
            <span className="text-slate-300 font-bold uppercase">{project.environmentTheme}</span>
          </div>

          <div className="flex justify-between">
            <span>Last Saved:</span>
            <span className="text-slate-400 font-mono">{lastSavedTime || 'Not yet saved'}</span>
          </div>

          <button
            onClick={() => setIsExitModalOpen(true)}
            className="w-full mt-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition"
            title="Prompt to save and safely close or exit studio"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" /> Close / Exit Studio
          </button>
        </div>
      </aside>

      {/* Main Studio Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950">
        {/* Top Viewport Header Bar with Save & Status Indicators */}
        <header className="h-14 px-6 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-extrabold text-white truncate max-w-xs sm:max-w-md">
              {project.name}
            </h2>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-semibold text-emerald-400 capitalize">
              {navItems.find((n) => n.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dirty / Saved Status Pill */}
            {hasUnsavedChanges ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Unsaved Changes
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved {lastSavedTime ? `at ${lastSavedTime}` : ''}
              </span>
            )}

            {/* Save Project Button */}
            <button
              onClick={handleSaveProject}
              title="Save course project to local storage (Ctrl+S)"
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                hasUnsavedChanges
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Project</span>
            </button>

            {/* Exit Studio Button */}
            <button
              onClick={() => setIsExitModalOpen(true)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition"
              title="Close or exit studio"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <ProjectDashboard
              project={project}
              onNavigateTab={setActiveTab}
              onUpdateProject={setProject}
              onSelectHole={setSelectedHoleNumber}
              onOpenProjectManager={() => setIsProjectModalOpen(true)}
              onSaveProject={handleSaveProject}
              hasUnsavedChanges={hasUnsavedChanges}
              lastSavedTime={lastSavedTime}
            />
          )}

          {activeTab === 'concept' && (
            <ConceptStudio
              project={project}
              onApplyConcept={(themeId, style, summary, recommendations) => {
                setProject((prev) => ({
                  ...prev,
                  environmentTheme: themeId,
                  style: style as any,
                  aiConceptSummary: summary,
                  aiRecommendations: recommendations
                }));
                setActiveTab('dashboard');
              }}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'themes' && (
            <ThemeExplorer
              currentThemeId={project.environmentTheme}
              onSelectTheme={(themeId) => {
                setProject((prev) => ({ ...prev, environmentTheme: themeId }));
              }}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'masterplan' && (
            <MasterplanDesigner
              project={project}
              selectedHoleNumber={selectedHoleNumber}
              onSelectHole={setSelectedHoleNumber}
              onUpdateHole={handleUpdateHole}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'hole' && (
            <HoleDesigner
              hole={selectedHole}
              onUpdateHole={handleUpdateHole}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'lidar' && (
            <LiDARStudio
              onApplyHeightmapToProject={(newHeightmap) => {
                setHeightmap(newHeightmap);
                setHasUnsavedChanges(true);
              }}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'research' && (
            <ResearchStudio
              onApplyCourseInspiration={(course) => {
                setProject((prev) => ({
                  ...prev,
                  style: course.type as any,
                  aiRecommendations: course.keyDesignPrinciples
                }));
              }}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'execution' && (
            <ExecutionGuide
              project={project}
              onUpdateProject={setProject}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'assistant' && (
            <AIAssistant project={project} onNavigateTab={setActiveTab} />
          )}

          {activeTab === 'playtesting' && (
            <Playtesting project={project} onUpdateProject={setProject} />
          )}

          {activeTab === 'export' && (
            <ExportCentre project={project} heightmap={heightmap} />
          )}

          {activeTab === 'help' && (
            <HelpGuide onNavigateTab={setActiveTab} />
          )}
        </div>
      </main>

      {/* Project Manager Modal */}
      <ProjectManagerModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        projects={projects}
        currentProjectId={currentProjectId}
        onSelectProject={handleRequestSelectProject}
        onCreateProject={handleCreateProject}
        onDeleteProject={handleDeleteProject}
      />

      {/* Unsaved Changes Warning Before Switching Projects */}
      {isUnsavedPromptOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-amber-500/50 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-800/80 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Save Changes Before Switching?</h3>
                <p className="text-xs text-slate-400">You have unsaved edits in "{project.name}".</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              Switching courses without saving will cause any recent hole or routing edits to be lost. Would you like to save your project first?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => {
                  setIsUnsavedPromptOpen(false);
                  setPendingSwitchProjectId(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDiscardAndSwitch}
                className="px-3.5 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800 text-xs font-bold transition"
              >
                Discard Edits
              </button>
              <button
                onClick={handleConfirmSaveAndSwitch}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition"
              >
                <Save className="w-3.5 h-3.5" /> Save & Switch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Studio Modal (Ask to Save Before Closing) */}
      {isExitModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Save className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {hasUnsavedChanges ? 'Save Project Before Closing?' : 'Close Studio'}
                  </h3>
                  <p className="text-xs text-slate-400">PGA TOUR 2K25 Course Designer</p>
                </div>
              </div>
              <button
                onClick={() => setIsExitModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {hasUnsavedChanges ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-600/40 text-amber-200 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    You have unsaved changes in <strong className="text-white">"{project.name}"</strong>. Save your project now so you don't lose any hole routings or theme settings.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    onClick={() => setIsExitModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
                  >
                    Keep Editing
                  </button>
                  <button
                    onClick={() => {
                      setIsExitModalOpen(false);
                      // Close or notify
                      setSaveToastMessage('Studio closed without saving current edits.');
                      setTimeout(() => setSaveToastMessage(null), 3000);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-300 border border-red-800 text-xs font-bold transition"
                  >
                    Close Without Saving
                  </button>
                  <button
                    onClick={() => {
                      handleSaveProject();
                      setIsExitModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition"
                  >
                    <Save className="w-3.5 h-3.5" /> Save & Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-600/40 text-emerald-200 text-xs flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white mb-1">All Course Changes Are Saved!</p>
                    <p className="text-slate-300 leading-relaxed">
                      Your course project <strong className="text-emerald-300">"{project.name}"</strong> is safely stored in your browser's persistent storage. You can safely close this tab or window.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5">
                  <button
                    onClick={() => setIsExitModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
                  >
                    Got It / Return to Studio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
