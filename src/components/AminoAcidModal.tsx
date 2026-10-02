import React from 'react';
import { AminoAcidInfo } from '../types/biology';
import { CODON_TABLE } from '../utils/geneticCode';
import { X, Dna, Activity, Scale, Zap, Info } from 'lucide-react';

interface AminoAcidModalProps {
  aminoAcid: AminoAcidInfo | null;
  codonTrigger?: string;
  onClose: () => void;
}

export const AminoAcidModal: React.FC<AminoAcidModalProps> = ({
  aminoAcid,
  codonTrigger,
  onClose,
}) => {
  if (!aminoAcid) return null;

  // Find all codons in universal code table that translate to this amino acid
  const synonymousCodons = Object.entries(CODON_TABLE)
    .filter(([_, code]) => code === aminoAcid.shortCode)
    .map(([c]) => c);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Header Banner */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border font-mono text-2xl font-bold ${aminoAcid.color.bg} ${aminoAcid.color.border} ${aminoAcid.color.text} shadow-lg`}>
              {aminoAcid.letter}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{aminoAcid.name}</h3>
                <span className="font-mono text-sm font-semibold text-slate-400">
                  ({aminoAcid.shortCode})
                </span>
              </div>
              <span className={`text-xs font-mono font-medium ${aminoAcid.color.text}`}>
                {aminoAcid.propertyLabel}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Mol. Weight</span>
              <span className="text-sm font-bold font-mono text-slate-200 mt-1 block">
                {aminoAcid.molecularWeight > 0 ? `${aminoAcid.molecularWeight} g/mol` : 'N/A'}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Net Charge (pH 7.4)</span>
              <span className={`text-sm font-bold font-mono mt-1 block capitalize ${
                aminoAcid.charge === 'positive' ? 'text-violet-400' :
                aminoAcid.charge === 'negative' ? 'text-rose-400' : 'text-slate-300'
              }`}>
                {aminoAcid.charge}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Formula</span>
              <span className="text-sm font-bold font-mono text-cyan-300 mt-1 block">
                {aminoAcid.formula}
              </span>
            </div>
          </div>

          {/* Biological Description */}
          <div className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              Biological Role & Structure
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {aminoAcid.description}
            </p>
          </div>

          {/* Synonymous Codons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">
                Synonymous Genetic Codons ({synonymousCodons.length})
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Genetic Code Degeneracy
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {synonymousCodons.map((codon) => {
                const isTrigger = codon === codonTrigger;
                return (
                  <span
                    key={codon}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-colors ${
                      isTrigger
                        ? 'border-cyan-400 bg-cyan-950 text-cyan-300 ring-1 ring-cyan-400/50'
                        : 'border-slate-800 bg-slate-950 text-slate-300'
                    }`}
                  >
                    {codon}
                    {isTrigger && <span className="ml-1 text-[10px] text-cyan-400 font-normal">★</span>}
                  </span>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Residue in Polypeptide Backbone
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
