import React, { useState } from 'react';
import { CourseProject, Hole } from './types/golf';
import { DEMO_PROJECT_WHISPERING_PINES, OFFICIAL_2K25_THEMES } from './data/mockGolfData';
import { generateProceduralHeightmap } from './utils/lidarEngine';

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
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<CourseProject[]>([DEMO_PROJECT_WHISPERING_PINES]);
  const [currentProjectId, setCurrentProjectId] = useState<string>(DEMO_PROJECT_WHISPERING_PINES.id);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedHoleNumber, setSelectedHoleNumber] = useState<number>(1);
  const [saveStatus, setSaveStatus] = useState<string>('Saved');

  // Active project derived from currentProjectId
  const project = projects.find((p) => p.id === currentProjectId) || projects[0] || DEMO_PROJECT_WHISPERING_PINES;

  const setProject = (updater: CourseProject | ((prev: CourseProject) => CourseProject)) => {
    setProjects((prevProjects) => {
      return prevProjects.map((p) => {
        if (p.id === currentProjectId) {
          return typeof updater === 'function' ? updater(p) : updater;
        }
        return p;
      });
    });
    triggerAutoSave();
  };

  const handleCreateProject = (newProj: CourseProject) => {
    setProjects((prev) => [newProj, ...prev]);
    setCurrentProjectId(newProj.id);
    setSelectedHoleNumber(1);
    setActiveTab('dashboard');
    triggerAutoSave();
  };

  const handleDeleteProject = (projectIdToDelete: string) => {
    setProjects((prev) => {
      const remaining = prev.filter((p) => p.id !== projectIdToDelete);
      if (currentProjectId === projectIdToDelete && remaining.length > 0) {
        setCurrentProjectId(remaining[0].id);
        setSelectedHoleNumber(1);
      }
      return remaining;
    });
    triggerAutoSave();
  };

  // Master Heightmap state
  const [heightmap, setHeightmap] = useState<number[][]>(() =>
    generateProceduralHeightmap(48, 48, 'rolling')
  );

  const selectedHole = project.holes.find((h) => h.number === selectedHoleNumber) || project.holes[0];

  const handleUpdateHole = (updatedHole: Hole) => {
    setProject((prev) => ({
      ...prev,
      holes: prev.holes.map((h) => (h.id === updatedHole.id ? updatedHole : h)),
      lastModified: new Date().toLocaleTimeString()
    }));
    triggerAutoSave();
  };

  const triggerAutoSave = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Saved');
    }, 600);
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
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
        {/* App Title & Branding */}
        <div className="p-4 border-b border-slate-800">
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

          <div
            onClick={() => setIsProjectModalOpen(true)}
            className="mt-3 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between text-xs transition group"
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

          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="w-full mt-2 py-1.5 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
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

        {/* Bottom Project Metadata Bar */}
        <div className="p-3 border-t border-slate-800 text-[11px] text-slate-500 space-y-1 bg-slate-950/50">
          <div className="flex justify-between">
            <span>Theme:</span>
            <span className="text-slate-300 font-bold uppercase">{project.environmentTheme}</span>
          </div>
          <div className="flex justify-between">
            <span>Course Length:</span>
            <span className="text-emerald-400 font-bold">{project.targetLengthYards.toLocaleString()} yds</span>
          </div>
          <div className="flex justify-between">
            <span>Version:</span>
            <span className="text-slate-400 font-mono">{project.version}</span>
          </div>
        </div>
      </aside>

      {/* Main Studio Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950">
        {activeTab === 'dashboard' && (
          <ProjectDashboard
            project={project}
            onNavigateTab={setActiveTab}
            onUpdateProject={setProject}
            onSelectHole={setSelectedHoleNumber}
            onOpenProjectManager={() => setIsProjectModalOpen(true)}
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
      </main>

      {/* Project Manager Modal */}
      <ProjectManagerModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        projects={projects}
        currentProjectId={currentProjectId}
        onSelectProject={(projId) => setCurrentProjectId(projId)}
        onCreateProject={handleCreateProject}
        onDeleteProject={handleDeleteProject}
      />
    </div>
  );
}
