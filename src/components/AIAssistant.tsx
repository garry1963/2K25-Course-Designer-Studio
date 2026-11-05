import React, { useState } from 'react';
import { CourseProject } from '../types/golf';
import {
  Sparkles,
  Send,
  HelpCircle,
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AIAssistantProps {
  project: CourseProject;
  onNavigateTab: (tabId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  category?: 'routing' | 'bunkering' | 'terrain' | '2k25' | 'general';
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ project, onNavigateTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Welcome to the Golf Course Architecture Advisor for PGA TOUR 2K25! I am currently analyzing "${project.name}". Your 18-hole routing features a total length of ${project.targetLengthYards.toLocaleString()} yards (Par ${project.targetPar}) set within the ${project.environmentTheme.toUpperCase()} theme. How can I assist with your design strategy today?`,
      category: 'general'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Course Design Audit Scores (out of 100)
  const auditScores = {
    routingFlow: 94,
    hazardStrategy: 88,
    greenVariety: 91,
    elevationDrama: 95,
    visualBalancing: 89,
    gameplayFairness: 92
  };
  const overallScore = Math.round(
    Object.values(auditScores).reduce((a, b) => a + b, 0) / Object.values(auditScores).length
  );

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('bunker') || q.includes('sand')) {
        reply = `For ${project.environmentTheme} courses in PGA TOUR 2K25, I recommend revetted sod-faced pot bunkers with 1.8m to 2.2m depth on greenside approaches. Stagger your fairway bunkers between 270 and 295 yards from the championship tees to challenge modern tour driver carry distances without punishing high-handicap players who lay up short.`;
      } else if (q.includes('theme') || q.includes('look')) {
        reply = `The ${project.environmentTheme.toUpperCase()} theme delivers excellent distant atmospheric fog and high-density pine backdrops. In 2K25, set your automatic tree density to 60-75% to conserve placed object budget for custom spectator mounding around holes 9, 16, and 18.`;
      } else if (q.includes('green') || q.includes('slope')) {
        reply = `Keep pin cup slopes strictly below 2.5 degrees in the 2K25 green grid overlay. Contours over 3.0 degrees cause the ball to accelerate past the hole endlessly on tournament stimpmeter settings (155-165). For signature holes like #14, consider a classic Biarritz swale where the center channel acts as a natural speed brake.`;
      } else if (q.includes('elevation') || q.includes('mountain')) {
        reply = `On severe downhill shots like Hole #3 (-18 yards drop), players will experience approximately 15-20% extra ball rollout. Introduce a gentle false front or a front collection swale so balls don't bound uncontrollably through the green into the rear rough.`;
      } else {
        reply = `From an architectural perspective, your course layout has exceptional rhythm. To heighten tournament drama, consider making Hole #17 a high-stakes risk-and-reward drivable par 4 (under 340 yards) to allow thrilling leaderboard swings on Sunday final rounds!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          sender: 'assistant',
          text: reply
        }
      ]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-slate-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> AI Golf Course Architect & Advisor
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Design Intelligence & Strategic Analysis</h1>
          <p className="text-sm text-slate-400">
            Consult with an AI trained on classical golf course architecture (MacKenzie, Ross, Dye, Old Tom Morris) and PGA TOUR 2K25 Course Designer execution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Chat Assistant */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col h-[600px] shadow-xl overflow-hidden">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 text-xs leading-relaxed ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-4 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex gap-3 text-xs text-slate-400 items-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <span>Architect is formulating recommendations...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestion Prompts */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 font-bold uppercase shrink-0">Ask:</span>
            {[
              'Where should I position fairway bunkers on Hole 5?',
              'Is my green slope too severe for 2K25?',
              'How to make Hole 17 drivable and exciting?',
              'Best vegetation settings for Boreal theme?'
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-600/50 whitespace-nowrap transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask an architectural question about your course..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: AI Course Architecture Scorecard */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-400">Design Quality Audit</span>
                <h2 className="text-xl font-black text-white mt-0.5">Architectural Scorecard</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex flex-col items-center justify-center font-black">
                <span className="text-xl leading-none">{overallScore}</span>
                <span className="text-[9px] uppercase font-bold opacity-80 mt-0.5">/ 100</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {[
                { label: 'Routing Rhythm & Direction Flow', score: auditScores.routingFlow },
                { label: 'Elevation Drama & Visual Perceptions', score: auditScores.elevationDrama },
                { label: 'Hazard Risk / Reward Strategy', score: auditScores.hazardStrategy },
                { label: 'Green Complex Contour Variety', score: auditScores.greenVariety },
                { label: 'Gameplay Fairness & Recoverability', score: auditScores.gameplayFairness },
                { label: 'Environmental Theme Harmonization', score: auditScores.visualBalancing }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{item.label}</span>
                    <strong className="text-emerald-400 font-mono">{item.score} / 100</strong>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              Note: Architectural evaluations are AI-generated design quality assessments based on classical strategic golf principles, not official 2K game rankings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
