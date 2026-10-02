import React, { useState } from 'react';
import { DNABase, PresetGene } from '../types/biology';
import { PRESET_GENES, validateDNA } from '../utils/geneticCode';
import { Sparkles, AlertCircle, Check, ArrowRight, Dna, Upload, FileText, Activity } from 'lucide-react';

interface DNAInputPaneProps {
  dnaSequence: string;
  onSequenceChange: (newSeq: string) => void;
  onGenerateRandom: () => void;
  onTranscribe: () => void;
  onOpenUpload: () => void;
  selectedBaseIndex: number;
  onSelectBaseIndex: (index: number) => void;
  isTranscribed: boolean;
  mutationActive: boolean;
  activePresetId?: string;
  onSelectPreset: (preset: PresetGene) => void;
  fastaHeader?: string;
}

export const DNAInputPane: React.FC<DNAInputPaneProps> = ({
  dnaSequence,
  onSequenceChange,
  onGenerateRandom,
  onTranscribe,
  onOpenUpload,
  selectedBaseIndex,
  onSelectBaseIndex,
  isTranscribed,
  mutationActive,
  activePresetId,
  onSelectPreset,
  fastaHeader,
}) => {
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawVal = e.target.value.toUpperCase();
    const validation = validateDNA(rawVal);
    
    if (!validation.isValid && validation.invalidChars.length > 0) {
      setErrorNotice(`Invalid nucleotide(s) rejected: ${validation.invalidChars.join(', ')}. Only A, T, C, G permitted.`);
    } else {
      setErrorNotice(null);
    }

    onSequenceChange(validation.sanitized);
  };

  const baseCount = dnaSequence.length;
  const codonCount = Math.floor(baseCount / 3);
  const remainder = baseCount % 3;

  // Real-time quick GC% calculation
  const gcCount = (dnaSequence.match(/[GC]/g) || []).length;
  const gcPercent = baseCount > 0 ? Math.round((gcCount / baseCount) * 100) : 0;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xl">
      {/* Pane Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">1. DNA Sequence Input & FASTA Ingestion</h2>
              <span className="text-xs font-mono text-cyan-400/90 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                5&apos; → 3&apos; Coding Strand
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Enter uppercase nucleotides (A, T, C, G), upload FASTA files, or explore calibrated genetic models.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all shadow-sm active:scale-95"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Upload FASTA</span>
          </button>

          <button
            onClick={onGenerateRandom}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 rounded-lg hover:bg-cyan-900/40 hover:border-cyan-400 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Random (30 bp)</span>
          </button>
        </div>
      </div>

      {/* Preset Gene Selector Carousel / Bar */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Explore Biological Models
          </span>
          <span className="text-[11px] text-slate-500">
            Click to load real human, viral & fluorescent sequences
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {PRESET_GENES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`shrink-0 px-3 py-1.5 text-xs rounded-lg border transition-all text-left flex flex-col gap-0.5 ${
                activePresetId === preset.id
                  ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500/30'
                  : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span className="font-medium text-slate-200 text-[12px]">{preset.name}</span>
              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                {preset.organism}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* FASTA Header Banner if Present */}
      {fastaHeader && (
        <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-400 truncate">
              Record: <span className="text-cyan-300 font-semibold">{fastaHeader}</span>
            </span>
          </div>
          <span className="text-[10px] text-slate-500 shrink-0">FASTA Header</span>
        </div>
      )}

      {/* Input Field & Metrics */}
      <div className="mt-3">
        <div className="relative">
          <textarea
            value={dnaSequence}
            onChange={handleInputChange}
            rows={2}
            placeholder="e.g. ATGGTGCACCTGACTCCTGAGGAGAAGTCT"
            className="w-full font-mono text-sm sm:text-base tracking-widest uppercase bg-slate-950/80 border border-slate-700/80 rounded-lg p-3 text-cyan-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none selection:bg-cyan-500/30"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              {baseCount} bp · {codonCount} codons · {gcPercent}% GC
              {remainder > 0 && <span className="text-amber-400"> (+{remainder} incomplete)</span>}
            </span>
          </div>
        </div>

        {errorNotice && (
          <div className="mt-2 flex items-center gap-2 text-xs text-amber-400 bg-amber-950/30 border border-amber-800/40 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorNotice}</span>
          </div>
        )}
      </div>

      {/* Double Helix Strand Visualization */}
      {baseCount > 0 && (
        <div className="mt-5 rounded-lg border border-slate-800/90 bg-slate-950/60 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-300">
                Interactive DNA Double Strand
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                (Click any base to target for point mutation)
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span> A-T (2 H-bonds)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> C-G (3 H-bonds)
              </span>
            </div>
          </div>

          {/* Nucleotide ribbon */}
          <div className="overflow-x-auto pb-2 scrollbar-thin">
            <div className="inline-flex flex-col gap-1 min-w-full">
              {/* Index numbers */}
              <div className="flex gap-1 items-center font-mono text-[10px] text-slate-400 pl-8">
                {dnaSequence.split('').map((_, idx) => (
                  <div
                    key={`num-${idx}`}
                    className={`w-7 text-center shrink-0 ${
                      idx === selectedBaseIndex && mutationActive ? 'text-amber-400 font-bold' : ''
                    } ${idx % 3 === 0 ? 'text-slate-400' : 'text-slate-400'}`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* 5' to 3' Coding Strand */}
              <div className="flex gap-1 items-center">
                <span className="text-[11px] font-mono text-cyan-400 font-bold w-7 shrink-0 text-right pr-1">
                  5&apos;
                </span>
                {dnaSequence.split('').map((base, idx) => {
                  const isSelected = idx === selectedBaseIndex && mutationActive;
                  const isStartBase = idx < 3 && dnaSequence.slice(0, 3) === 'ATG';
                  
                  let baseBg = 'bg-slate-900 border-slate-700 text-slate-200';
                  if (base === 'A') baseBg = 'bg-sky-950/60 border-sky-600/50 text-sky-300';
                  if (base === 'T') baseBg = 'bg-blue-950/60 border-blue-600/50 text-blue-300';
                  if (base === 'C') baseBg = 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300';
                  if (base === 'G') baseBg = 'bg-teal-950/60 border-teal-600/50 text-teal-300';

                  return (
                    <button
                      key={`sense-${idx}`}
                      onClick={() => onSelectBaseIndex(idx)}
                      title={`Position ${idx + 1}: ${base} (Click to target for mutation)`}
                      className={`w-7 h-8 shrink-0 flex flex-col items-center justify-center rounded font-mono font-bold text-sm border transition-all relative ${baseBg} ${
                        isSelected
                          ? 'ring-2 ring-amber-400 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] scale-105 z-10'
                          : 'hover:border-cyan-400 hover:scale-102'
                      } ${idx % 3 === 2 ? 'mr-1 border-r-2 border-r-slate-500/50' : ''}`}
                    >
                      {base}
                      {isStartBase && (
                        <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-400"></span>
                      )}
                    </button>
                  );
                })}
                <span className="text-[11px] font-mono text-slate-500 font-bold pl-1">
                  3&apos;
                </span>
              </div>

              {/* Hydrogen Bonds */}
              <div className="flex gap-1 items-center pl-8 py-0.5">
                {dnaSequence.split('').map((base, idx) => {
                  const isTriple = base === 'C' || base === 'G';
                  return (
                    <div
                      key={`bond-${idx}`}
                      className={`w-7 text-center shrink-0 font-mono text-[9px] ${
                        idx === selectedBaseIndex && mutationActive ? 'text-amber-400' : 'text-slate-600'
                      } ${idx % 3 === 2 ? 'mr-1' : ''}`}
                    >
                      {isTriple ? '≡' : '='}
                    </div>
                  );
                })}
              </div>

              {/* 3' to 5' Complementary Template Strand */}
              <div className="flex gap-1 items-center">
                <span className="text-[11px] font-mono text-slate-500 font-bold w-7 shrink-0 text-right pr-1">
                  3&apos;
                </span>
                {dnaSequence.split('').map((base, idx) => {
                  const comp = base === 'A' ? 'T' : base === 'T' ? 'A' : base === 'C' ? 'G' : 'C';
                  let compBg = 'bg-slate-900/60 border-slate-800 text-slate-400';
                  if (comp === 'A') compBg = 'bg-sky-950/30 border-sky-800/40 text-sky-400/80';
                  if (comp === 'T') compBg = 'bg-blue-950/30 border-blue-800/40 text-blue-400/80';
                  if (comp === 'C') compBg = 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400/80';
                  if (comp === 'G') compBg = 'bg-teal-950/30 border-teal-800/40 text-teal-400/80';

                  return (
                    <div
                      key={`comp-${idx}`}
                      className={`w-7 h-7 shrink-0 flex items-center justify-center rounded font-mono text-xs border ${compBg} ${
                        idx % 3 === 2 ? 'mr-1 border-r-2 border-r-slate-600/40' : ''
                      }`}
                    >
                      {comp}
                    </div>
                  );
                })}
                <span className="text-[11px] font-mono text-slate-500 font-bold pl-1">
                  5&apos;
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transcribe Trigger Bar */}
      <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-800/80">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
          Ready for transcription into messenger RNA (mRNA)
        </div>

        <button
          onClick={onTranscribe}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <span>Transcribe</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
