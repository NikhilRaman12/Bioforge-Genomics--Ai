import React from 'react';
import { Dna, Upload, RotateCcw, BookOpen, Shuffle, Sparkles, BarChart3, Bot } from 'lucide-react';

interface HeaderProps {
  activeTab: 'pipeline' | 'matrix' | 'library' | 'biometrics' | 'ai-copilot';
  setActiveTab: (tab: 'pipeline' | 'matrix' | 'library' | 'biometrics' | 'ai-copilot') => void;
  onOpenUpload: () => void;
  onGenerateRandom: () => void;
  onReset: () => void;
  mutationActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenUpload,
  onGenerateRandom,
  onReset,
  mutationActive,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400 shadow-inner">
            <Dna className="h-5 w-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              BioForge
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                · Central Dogma & Genomics AI
              </span>
            </h1>
          </div>
        </div>

        {/* Zone 2: Clean navigation links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'pipeline'
                ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            Pipeline
            {mutationActive && (
              <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('biometrics')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap hidden md:inline-flex ${
              activeTab === 'biometrics'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              Biometrics
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Codon Matrix
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ai-copilot')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'ai-copilot'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              AI Assistant
            </span>
          </button>
        </nav>

        {/* Zone 3: Primary Action buttons */}
        <div className="flex items-center gap-2">
          {/* Upload DNA sequence button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all shadow-sm active:scale-95"
            title="Upload FASTA / DNA File"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Upload DNA</span>
          </button>

          <button
            onClick={onGenerateRandom}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/60 hover:border-cyan-400 transition-all shadow-sm active:scale-95 hidden sm:inline-flex"
            title="Generate random 30 bp DNA chain with ATG start"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random</span>
            <span className="font-mono text-[10px] text-cyan-400">30bp</span>
          </button>

          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            title="Reset Sequence"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
