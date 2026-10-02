import React from 'react';
import { PRESET_GENES } from '../utils/geneticCode';
import { PresetGene } from '../types/biology';
import { X, Dna, ArrowRight, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

interface GeneLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetGene) => void;
  currentPresetId?: string;
}

export const GeneLibraryModal: React.FC<GeneLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentPresetId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Biological Gene Preset Models</h2>
              <p className="text-xs text-slate-400">
                Calibrated gene sequences demonstrating wild-type translation, missense sickle disease, and truncating nonsense mutations.
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

        {/* Preset Cards List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 scrollbar-thin">
          {PRESET_GENES.map((preset) => {
            const isSelected = preset.id === currentPresetId;
            return (
              <div
                key={preset.id}
                className={`p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500/40'
                    : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {preset.name}
                      {isSelected && (
                        <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                          Active Sequence
                        </span>
                      )}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">
                      {preset.organism}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectPreset(preset);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors self-start sm:self-auto"
                  >
                    <span>Load Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 mt-2">
                  {preset.description}
                </p>

                {preset.clinicalSignificance && (
                  <div className="mt-2.5 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{preset.clinicalSignificance}</span>
                  </div>
                )}

                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span className="truncate max-w-[400px]">
                    Sequence: <span className="text-slate-300">{preset.sequence}</span>
                  </span>
                  <span>{preset.sequence.length} bp</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
