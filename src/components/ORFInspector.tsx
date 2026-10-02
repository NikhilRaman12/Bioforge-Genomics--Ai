import React from 'react';
import { OpenReadingFrame } from '../types/biology';
import { Layers, CheckCircle2, ArrowRight, Play, Eye } from 'lucide-react';

interface ORFInspectorProps {
  orfs: OpenReadingFrame[];
  currentDnaLength: number;
  onSelectOrfSequence: (orfSeq: string) => void;
}

export const ORFInspector: React.FC<ORFInspectorProps> = ({
  orfs,
  currentDnaLength,
  onSelectOrfSequence,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Multi-Frame Open Reading Frame (ORF) Analyzer
            </h3>
            <p className="text-xs text-slate-400">
              Scans all 3 forward reading frames (+1, +2, +3) from initiating AUG to in-frame termination codons.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800 self-start sm:self-auto">
          {orfs.length} Detected ORF(s)
        </span>
      </div>

      {orfs.length > 0 ? (
        <div className="space-y-2.5">
          {orfs.map((orf) => (
            <div
              key={orf.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                orf.isLongest
                  ? 'border-emerald-500/50 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                  : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-800 text-slate-200">
                    Frame +{orf.frame}
                  </span>
                  {orf.isLongest && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Longest Functional CDS
                    </span>
                  )}
                  <span className="text-xs font-mono text-slate-400">
                    nt {orf.startIndex + 1} → {orf.endIndex + 1} ({orf.lengthBp} bp · {orf.lengthCodons} codons)
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-300 truncate max-w-xl">
                  <span className="text-emerald-400 font-bold">{orf.startCodon}</span>
                  <span className="text-slate-400">...</span>
                  <span className="text-slate-200">{orf.proteinSequence.slice(0, 24)}</span>
                  {orf.proteinSequence.length > 24 && <span className="text-slate-400">...</span>}
                  <span className="text-red-400 font-bold ml-1">{orf.stopCodon}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectOrfSequence(orf.dnaSequence)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors self-start md:self-auto shrink-0 border border-slate-700"
                title="Isolate this specific Open Reading Frame into simulator"
              >
                <span>Isolate ORF</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center bg-slate-950/30">
          <p className="text-xs text-slate-400">
            No closed Open Reading Frames (Start ATG to in-frame Stop) detected in frames +1, +2, or +3.
            The current sequence is translating in standard continuous frame 0.
          </p>
        </div>
      )}
    </div>
  );
};
