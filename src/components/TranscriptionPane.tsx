import React from 'react';
import { DNABase, RNABase } from '../types/biology';
import { CODON_TABLE, AMINO_ACID_LIBRARY } from '../utils/geneticCode';
import { ArrowDown, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface TranscriptionPaneProps {
  dnaSequence: string;
  templateStrand: string;
  mrnaStrand: string;
  codons: string[];
  onTranslate: () => void;
  isTranslated: boolean;
  selectedBaseIndex?: number;
  mutationActive?: boolean;
}

export const TranscriptionPane: React.FC<TranscriptionPaneProps> = ({
  dnaSequence,
  templateStrand,
  mrnaStrand,
  codons,
  onTranslate,
  isTranslated,
  selectedBaseIndex,
  mutationActive,
}) => {
  const selectedCodonIndex = selectedBaseIndex !== undefined ? Math.floor(selectedBaseIndex / 3) : -1;

  return (
    <div className="rounded-xl border border-cyan-900/60 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-sm shadow-xl relative overflow-hidden">
      {/* Decorative accent glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Pane Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">2. Transcription (mRNA Synthesis)</h2>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-700/50">
                5&apos; → 3&apos; mRNA Strand
              </span>
            </div>
            <p className="text-xs text-slate-400">
              RNA Polymerase reads template DNA (3&apos;→5&apos;) and transcribes matching ribonucleotides. Thymine (T) is replaced by Uracil (U).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-slate-400">
          <span className="px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-cyan-300">
            {codons.length} Triplet Codons
          </span>
        </div>
      </div>

      {/* Molecular Mechanism Callout */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-400 uppercase text-[10px] tracking-wider block font-semibold">
            DNA Coding (5&apos; → 3&apos;)
          </span>
          <span className="font-mono text-slate-300 font-medium truncate block mt-1">
            {dnaSequence.slice(0, 15)}...
          </span>
        </div>
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <span className="text-slate-400 uppercase text-[10px] tracking-wider block font-semibold">
            Template Strand (3&apos; → 5&apos;)
          </span>
          <span className="font-mono text-slate-400 truncate block mt-1">
            {templateStrand.slice(0, 15)}...
          </span>
        </div>
        <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40">
          <span className="text-cyan-400 uppercase text-[10px] tracking-wider block font-semibold">
            Synthesized mRNA (T → U)
          </span>
          <span className="font-mono text-cyan-300 font-bold truncate block mt-1">
            {mrnaStrand.slice(0, 15)}...
          </span>
        </div>
      </div>

      {/* Triplet Codons Layout */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-300">
            Grouped Codons (Reading Frame 0)
          </span>
          <span className="text-[11px] text-slate-400">
            Hover or tap codon to view biological translation target
          </span>
        </div>

        {/* Codons visual cards grid / horizontal scroller */}
        <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
          <div className="flex gap-2.5 min-w-max">
            {codons.map((codon, cIdx) => {
              const isStart = codon === 'AUG';
              const isStop = ['UAA', 'UAG', 'UGA'].includes(codon);
              const aaCode = CODON_TABLE[codon] || 'Unknown';
              const aa = AMINO_ACID_LIBRARY[aaCode];
              const isTargetCodon = mutationActive && cIdx === selectedCodonIndex;

              let codonBadge = 'border-slate-700 bg-slate-950/70 hover:border-slate-500';
              if (isStart) {
                codonBadge = 'border-emerald-500 bg-emerald-950/40 shadow-[0_0_12px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/40';
              } else if (isStop) {
                codonBadge = 'border-red-500 bg-red-950/40 shadow-[0_0_12px_rgba(239,68,68,0.25)] ring-1 ring-red-500/40';
              } else if (isTargetCodon) {
                codonBadge = 'border-amber-400 bg-amber-950/40 shadow-[0_0_12px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50';
              }

              return (
                <div
                  key={`codon-${cIdx}`}
                  className={`flex flex-col items-center rounded-lg border p-2.5 transition-all duration-200 relative ${codonBadge}`}
                >
                  {/* Codon Index */}
                  <div className="flex items-center justify-between w-full text-[10px] font-mono text-slate-400 pb-1 mb-1 border-b border-slate-800">
                    <span>#{cIdx + 1}</span>
                    {isStart && (
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
                        START
                      </span>
                    )}
                    {isStop && (
                      <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">
                        STOP
                      </span>
                    )}
                    {isTargetCodon && (
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">
                        MUT
                      </span>
                    )}
                  </div>

                  {/* 3 Nucleotides of this codon */}
                  <div className="flex items-center gap-1 my-1">
                    {codon.split('').map((base, bIdx) => {
                      const globalBaseIndex = cIdx * 3 + bIdx;
                      const isMutatedBase = mutationActive && globalBaseIndex === selectedBaseIndex;

                      let baseColor = 'text-slate-200';
                      if (base === 'A') baseColor = 'text-sky-300 bg-sky-950/60 border-sky-800/40';
                      if (base === 'U') baseColor = 'text-cyan-300 bg-cyan-950/60 border-cyan-700/50';
                      if (base === 'C') baseColor = 'text-emerald-300 bg-emerald-950/60 border-emerald-800/40';
                      if (base === 'G') baseColor = 'text-teal-300 bg-teal-950/60 border-teal-800/40';

                      return (
                        <span
                          key={`b-${bIdx}`}
                          className={`w-6 h-7 rounded flex items-center justify-center font-mono font-bold text-sm border ${baseColor} ${
                            isMutatedBase
                              ? 'ring-2 ring-amber-400 text-amber-300 bg-amber-950/80 scale-105'
                              : ''
                          }`}
                        >
                          {base}
                        </span>
                      );
                    })}
                  </div>

                  {/* Predicted Amino Acid preview */}
                  <div className="mt-1 pt-1 border-t border-slate-800/80 w-full text-center">
                    <span
                      className={`text-[11px] font-mono font-semibold ${
                        isStart
                          ? 'text-emerald-400'
                          : isStop
                          ? 'text-red-400'
                          : aa?.color.text || 'text-cyan-300'
                      }`}
                    >
                      {aa?.shortCode || '???'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Translation CTA Bar */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>mRNA strand processed. Ready for ribosomal translation at the codon matrix.</span>
        </div>

        <button
          onClick={onTranslate}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
        >
          <span>Translate to Amino Acids</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
