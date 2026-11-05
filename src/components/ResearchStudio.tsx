import React, { useState } from 'react';
import { FAMOUS_INSPIRATIONS } from '../data/mockGolfData';
import { FamousCourseInspiration } from '../types/golf';
import {
  Search,
  MapPin,
  Compass,
  Trophy,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
  Check,
  CheckCircle2,
  Calendar,
  User,
  Info
} from 'lucide-react';

interface ResearchStudioProps {
  onApplyCourseInspiration: (inspiration: FamousCourseInspiration) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ResearchStudio: React.FC<ResearchStudioProps> = ({
  onApplyCourseInspiration,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [selectedInspiration, setSelectedInspiration] = useState<FamousCourseInspiration>(
    FAMOUS_INSPIRATIONS[0]
  );
  const [appliedCourseName, setAppliedCourseName] = useState<string | null>(null);

  const filteredCourses = FAMOUS_INSPIRATIONS.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.architect.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedTypeFilter === 'All' || course.type.includes(selectedTypeFilter);
    return matchesSearch && matchesType;
  });

  const handleApply = (course: FamousCourseInspiration) => {
    setAppliedCourseName(course.name);
    onApplyCourseInspiration(course);
    setTimeout(() => setAppliedCourseName(null), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" /> Real-World Golf Course Research & Inspiration
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Architectural Inspiration Library</h1>
          <p className="text-sm text-slate-400">
            Research world-renowned golf courses, study legendary architects (MacKenzie, Donald Ross, Pete Dye, Old Tom Morris), and borrow timeless design principles for your 2K25 course.
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course name, architect, location, or signature feature..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Links', 'Parkland', 'Sandbelt', 'Ocean'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedTypeFilter(type)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                selectedTypeFilter === type
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Course Cards List on Left, Deep Architectural Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredCourses.map((c) => {
            const isSelected = selectedInspiration.name === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setSelectedInspiration(c)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                    : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-sm text-white">{c.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                    {c.type}
                  </span>
                </div>

                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" /> {c.location}
                </div>

                <div className="text-xs text-slate-300 font-medium mt-2 line-clamp-2">
                  {c.signatureFeature}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Dossier Detail View */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Architectural Masterwork Dossier
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">{selectedInspiration.name}</h2>
              <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedInspiration.location}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {selectedInspiration.architect}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Est. {selectedInspiration.year}</span>
              </div>
            </div>

            <button
              onClick={() => handleApply(selectedInspiration)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition shrink-0"
            >
              {appliedCourseName === selectedInspiration.name ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> DNA Applied!
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Apply Design DNA to Project
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Signature Architectural Character
              </h3>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                {selectedInspiration.signatureFeature}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Historical Overview & Philosophy
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                {selectedInspiration.description}
              </p>
            </div>

            {/* Core Architectural Principles */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Key Principles to Recreate in PGA TOUR 2K25
              </h3>
              <div className="space-y-2">
                {selectedInspiration.keyDesignPrinciples.map((principle, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-200"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
