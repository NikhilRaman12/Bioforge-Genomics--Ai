import React from 'react';
import { DNABase, MutationAnalysis, CodonTranslation, AminoAcidInfo } from '../types/biology';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Dna, 
  Shuffle, 
  ArrowRight, 
  Zap, 
  Sliders, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface MutationSimulatorProps {
  mutationActive: boolean;
  onToggleMutation: (active: boolean) => void;
  selectedBaseIndex: number;
  onSelectBaseIndex: (index: number) => void;
  mutatedBase: DNABase;
  onSelectMutatedBase: (base: DNABase) => void;
  analysis: MutationAnalysis | null;
  dnaSequence: string;
  mutatedSequence: string;
  originalTranslations: CodonTranslation[];
  mutatedTranslations: CodonTranslation[];
  onSelectAminoAcid: (aa: AminoAcidInfo, codon: string, index: number) => void;
}

export const MutationSimulator: React.FC<MutationSimulatorProps> = ({
  mutationActive,
  onToggleMutation,
  selectedBaseIndex,
  onSelectBaseIndex,
  mutatedBase,
  onSelectMutatedBase,
  analysis,
  dnaSequence,
  mutatedSequence,
  originalTranslations,
  mutatedTranslations,
  onSelectAminoAcid,
}) => {
  const currentWildTypeBase = dnaSequence[selectedBaseIndex] as DNABase;
  const bases: DNABase[] = ['A', 'T', 'C', 'G'];
  const totalBases = dnaSequence.length;

  return (
    <div className="rounded-xl border border-amber-500/40 bg-slate-900/80 p-4 sm:p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Decorative amber glow for active mutation */}
      {mutationActive && (
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Header & Toggle Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">4. Point Mutation Simulator</h2>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/60">
                Single Nucleotide Polymorphism (SNP)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Substitute a nucleotide at any position and calculate real-time translational consequences.
            </p>
          </div>
        </div>

        {/* Mutation Toggle Switch */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <span className="text-xs font-medium text-slate-300">
            {mutationActive ? 'Mutation Active' : 'Enable Mutation'}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={mutationActive}
            onClick={() => onToggleMutation(!mutationActive)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
              mutationActive ? 'bg-amber-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                mutationActive ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {mutationActive ? (
        <div className="mt-5 space-y-6">
          {/* Controls: Position Selector & New Base Picker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            
            {/* Position Selector */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Target Nucleotide Position
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  Index {selectedBaseIndex + 1} of {totalBases}
                </span>
              </div>

              {/* Slider & Stepper */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectBaseIndex(Math.max(0, selectedBaseIndex - 1))}
                  disabled={selectedBaseIndex === 0}
                  className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 disabled:opacity-30 hover:bg-slate-800 transition-colors"
                  title="Previous base"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <input
                  type="range"
                  min={0}
                  max={Math.max(0, totalBases - 1)}
                  value={selectedBaseIndex}
                  onChange={(e) => onSelectBaseIndex(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <button
                  onClick={() => onSelectBaseIndex(Math.min(totalBases - 1, selectedBaseIndex + 1))}
                  disabled={selectedBaseIndex >= totalBases - 1}
                  className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 disabled:opacity-30 hover:bg-slate-800 transition-colors"
                  title="Next base"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between mt-1">
                <span>Codon #{Math.floor(selectedBaseIndex / 3) + 1} (Base position {(selectedBaseIndex % 3) + 1} of 3)</span>
                <span className="text-slate-300 font-bold">
                  Wild-Type Base: <span className="text-cyan-400">{currentWildTypeBase}</span>
                </span>
              </div>
            </div>

            {/* Mutated Base Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium text-slate-300">
                Replace Nucleotide with:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {bases.map((base) => {
                  const isCurrent = base === currentWildTypeBase;
                  const isSelectedMut = base === mutatedBase;
                  return (
                    <button
                      key={base}
                      onClick={() => onSelectMutatedBase(base)}
                      className={`h-11 rounded-lg border font-mono font-bold text-sm flex flex-col items-center justify-center transition-all ${
                        isSelectedMut
                          ? 'border-amber-400 bg-amber-500/20 text-amber-300 ring-2 ring-amber-400/50 shadow-md shadow-amber-500/20 scale-102'
                          : isCurrent
                          ? 'border-slate-700/60 bg-slate-900/40 text-slate-500 hover:text-slate-300'
                          : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                      }`}
                    >
                      <span>{base}</span>
                      <span className="text-[9px] font-normal tracking-tight">
                        {isCurrent ? '(Wild-Type)' : isSelectedMut ? 'Active Mut' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Classification Banner */}
          {analysis && (
            <div
              className={`p-4 rounded-xl border transition-all ${
                analysis.mutationType === 'Silent'
                  ? 'border-blue-500/40 bg-blue-950/30'
                  : analysis.mutationType === 'Missense'
                  ? 'border-amber-500/40 bg-amber-950/30'
                  : analysis.mutationType === 'Nonsense' || analysis.mutationType === 'Start-Loss'
                  ? 'border-red-500/50 bg-red-950/30'
                  : 'border-slate-800 bg-slate-950/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  {analysis.mutationType === 'Silent' ? (
                    <div className="p-1 rounded bg-blue-500/20 text-blue-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : analysis.mutationType === 'Missense' ? (
                    <div className="p-1 rounded bg-amber-500/20 text-amber-400">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-1 rounded bg-red-500/20 text-red-400">
                      <XCircle className="w-5 h-5" />
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Classification Result
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>{analysis.mutationType} Mutation</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-mono uppercase ${
                          analysis.severity === 'benign'
                            ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
                            : analysis.severity === 'moderate'
                            ? 'bg-amber-900/50 text-amber-300 border border-amber-700/50'
                            : 'bg-red-900/50 text-red-300 border border-red-700/50'
                        }`}
                      >
                        {analysis.severity}
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
                  <span className="text-cyan-400 font-bold">{analysis.originalCodon}</span>
                  <span className="text-slate-500 mx-1.5">→</span>
                  <span className="text-amber-400 font-bold">{analysis.mutatedCodon}</span>
                  <span className="text-slate-500 mx-1.5">|</span>
                  <span className="text-slate-300 font-semibold">{analysis.originalAminoAcid.shortCode}</span>
                  <span className="text-slate-500 mx-1.5">→</span>
                  <span className="text-amber-300 font-bold">{analysis.mutatedAminoAcid.shortCode}</span>
                </div>
              </div>

              {/* Explanatory text */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider block">
                    Molecular Shift
                  </span>
                  <p className="text-slate-300 mt-1 font-medium">{analysis.description}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider block">
                    Biochemical Impact
                  </span>
                  <p className="text-slate-400 mt-1">{analysis.biochemicalImpact}</p>
                </div>
              </div>
            </div>
          )}

          {/* Re-rendered Protein Chains: Wild-Type vs Mutated Chain Comparison */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Comparative Polypeptide Re-Rendering
            </h4>

            {/* 1. Wild-Type Chain */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  Wild-Type Protein (Normal)
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {originalTranslations.length} Residues
                </span>
              </div>

              <div className="overflow-x-auto pb-2 scrollbar-thin">
                <div className="flex items-center gap-1 min-w-max">
                  {originalTranslations.map((t, idx) => {
                    const isMutatedPos = analysis && idx === analysis.codonIndex;
                    return (
                      <React.Fragment key={`wt-chain-${idx}`}>
                        {idx > 0 && <span className="text-slate-700 text-xs">-</span>}
                        <button
                          onClick={() => onSelectAminoAcid(t.aminoAcid, t.codon, idx)}
                          className={`px-2.5 py-1.5 rounded-lg border text-center font-mono text-xs transition-all ${
                            isMutatedPos
                              ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500'
                              : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="block font-bold">{t.aminoAcid.shortCode}</span>
                          <span className="text-[9px] text-slate-400">{t.codon}</span>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Mutated Chain */}
            <div className="rounded-xl border border-amber-500/50 bg-slate-950/80 p-3 sm:p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  Mutated Protein Chain (Re-rendered)
                </span>
                <span className="text-[11px] font-mono text-amber-400/90 font-medium">
                  {analysis?.mutationType} outcome
                </span>
              </div>

              <div className="overflow-x-auto pb-2 scrollbar-thin">
                <div className="flex items-center gap-1 min-w-max">
                  {mutatedTranslations.map((t, idx) => {
                    const isMutatedPos = analysis && idx === analysis.codonIndex;
                    const isTruncated = analysis?.mutationType === 'Nonsense' && idx > analysis.codonIndex;

                    return (
                      <React.Fragment key={`mut-chain-${idx}`}>
                        {idx > 0 && <span className="text-slate-700 text-xs">-</span>}
                        <button
                          onClick={() => onSelectAminoAcid(t.aminoAcid, t.codon, idx)}
                          disabled={isTruncated}
                          className={`px-2.5 py-1.5 rounded-lg border text-center font-mono text-xs transition-all ${
                            isTruncated
                              ? 'border-dashed border-slate-800 bg-slate-950/30 text-slate-600 line-through opacity-40'
                              : isMutatedPos
                              ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-2 ring-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.3)] scale-105 z-10'
                              : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="block font-bold">{t.aminoAcid.shortCode}</span>
                          <span className="text-[9px] text-slate-400">{t.codon}</span>
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {analysis?.mutationType === 'Nonsense' && (
                <div className="mt-2 text-xs font-mono text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Ribosome terminates translation early at codon {analysis.codonIndex + 1}. Downstream residues truncated.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty / Disabled State */
        <div className="mt-4 p-6 rounded-xl border border-dashed border-slate-800 text-center bg-slate-950/30">
          <Dna className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <h4 className="text-sm font-medium text-slate-300">Point Mutation Inactive</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Toggle the switch above to introduce a single base substitution at any sequence position and evaluate its phenotype on the translated protein.
          </p>
          <button
            onClick={() => onToggleMutation(true)}
            className="mt-3 px-4 py-2 text-xs font-medium text-amber-300 bg-amber-950/40 border border-amber-500/40 rounded-lg hover:bg-amber-900/40 transition-colors"
          >
            Activate Mutation Simulator
          </button>
        </div>
      )}
    </div>
  );
};
