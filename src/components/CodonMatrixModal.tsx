import React, { useState } from 'react';
import { CODON_TABLE, AMINO_ACID_LIBRARY } from '../utils/geneticCode';
import { AminoAcidInfo } from '../types/biology';
import { Search, X, BookOpen, Filter, Sparkles, Check } from 'lucide-react';

interface CodonMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCodons: string[];
  onSelectAminoAcid: (aa: AminoAcidInfo, codon: string) => void;
}

export const CodonMatrixModal: React.FC<CodonMatrixModalProps> = ({
  isOpen,
  onClose,
  activeCodons,
  onSelectAminoAcid,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');

  if (!isOpen) return null;

  const bases = ['U', 'C', 'A', 'G'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Standard Genetic Code Matrix (64 Codons)
              </h2>
              <p className="text-xs text-slate-400">
                Universal triplet to amino acid dictionary with degeneracy & wobble mapping.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/30 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search codon, amino acid, or letter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Property Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            {['all', 'hydrophobic', 'polar-uncharged', 'basic', 'acidic', 'stop'].map((prop) => (
              <button
                key={prop}
                onClick={() => setSelectedProperty(prop)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors shrink-0 ${
                  selectedProperty === prop
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {prop === 'all' ? 'All Classes' : prop.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* 64-Codon Matrix Table */}
        <div className="p-4 overflow-y-auto flex-1 scrollbar-thin">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bases.map((firstBase) => (
              <div
                key={firstBase}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    1st Base: {firstBase}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">16 Codons</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {bases.flatMap((secondBase) =>
                    bases.map((thirdBase) => {
                      const codon = `${firstBase}${secondBase}${thirdBase}`;
                      const aaCode = CODON_TABLE[codon] || 'Unknown';
                      const aa = AMINO_ACID_LIBRARY[aaCode];
                      const isActiveInApp = activeCodons.includes(codon);
                      const isStart = codon === 'AUG';
                      const isStop = ['UAA', 'UAG', 'UGA'].includes(codon);

                      // Filtering logic
                      if (selectedProperty !== 'all' && aa?.property !== selectedProperty) {
                        return null;
                      }
                      if (
                        searchTerm &&
                        !codon.toLowerCase().includes(searchTerm) &&
                        !aa?.name.toLowerCase().includes(searchTerm) &&
                        !aa?.shortCode.toLowerCase().includes(searchTerm) &&
                        !aa?.letter.toLowerCase().includes(searchTerm)
                      ) {
                        return null;
                      }

                      return (
                        <button
                          key={codon}
                          onClick={() => {
                            if (aa) onSelectAminoAcid(aa, codon);
                          }}
                          className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all relative ${
                            isActiveInApp
                              ? 'border-cyan-400 bg-cyan-950/50 ring-1 ring-cyan-400/50 shadow-sm'
                              : isStart
                              ? 'border-emerald-500/60 bg-emerald-950/30'
                              : isStop
                              ? 'border-red-500/60 bg-red-950/30'
                              : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-mono font-bold text-xs text-slate-200">
                              {codon}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate max-w-[65px]">
                              {aa?.name || '???'}
                            </span>
                          </div>

                          <div className="flex flex-col items-end">
                            <span
                              className={`font-mono text-xs font-bold ${
                                isStart
                                  ? 'text-emerald-400'
                                  : isStop
                                  ? 'text-red-400'
                                  : aa?.color.text || 'text-slate-300'
                              }`}
                            >
                              {aa?.shortCode}
                            </span>
                            {isActiveInApp && (
                              <span className="text-[9px] text-cyan-400 font-mono flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5" /> in seq
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> AUG = Methionine (START)
            </span>
            <span className="flex items-center gap-1.5 text-red-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-400"></span> UAA, UAG, UGA = Termination
            </span>
          </div>

          <span className="text-[11px] text-slate-500 hidden sm:inline font-mono">
            Standard NCBI Translation Table 1
          </span>
        </div>

      </div>
    </div>
  );
};
