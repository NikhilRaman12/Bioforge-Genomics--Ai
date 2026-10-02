import React, { useState } from 'react';
import { CodonTranslation, AminoAcidInfo } from '../types/biology';
import { Dna, Activity, Copy, Check, Info, ShieldAlert, Sparkles } from 'lucide-react';

interface TranslationPaneProps {
  translations: CodonTranslation[];
  onSelectAminoAcid: (aa: AminoAcidInfo, codon: string, index: number) => void;
  selectedCodonIndex?: number;
  mutationActive?: boolean;
}

export const TranslationPane: React.FC<TranslationPaneProps> = ({
  translations,
  onSelectAminoAcid,
  selectedCodonIndex,
  mutationActive,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Compute biochemical distribution chart data
  const propertyCounts: Record<string, number> = {
    hydrophobic: 0,
    'polar-uncharged': 0,
    basic: 0,
    acidic: 0,
    stop: 0,
  };

  let totalWeight = 0;
  translations.forEach((t) => {
    const prop = t.aminoAcid.property;
    if (propertyCounts[prop] !== undefined) {
      propertyCounts[prop]++;
    }
    totalWeight += t.aminoAcid.molecularWeight;
  });

  const totalResidues = translations.length;
  const fullNameChain = translations.map((t) => t.aminoAcid.name).join(' — ');
  const threeLetterChain = translations.map((t) => t.aminoAcid.shortCode).join('-');
  const oneLetterChain = translations.map((t) => t.aminoAcid.letter).join('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="rounded-xl border border-emerald-900/60 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-sm shadow-xl relative overflow-hidden">
      {/* Decorative emerald ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Pane Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">3. Translation (Peptide Synthesis)</h2>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-700/50">
                N-Terminus → C-Terminus
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Ribosome decodes mRNA triplets using the Universal Genetic Code matrix to assemble the amino acid polypeptide chain.
            </p>
          </div>
        </div>

        {/* Legend for START & STOP */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            START (AUG)
          </span>
          <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-red-950/80 border border-red-500/50 text-red-300 font-bold shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            STOP (UAA/UAG/UGA)
          </span>
        </div>
      </div>

      {/* Primary Polypeptide Chain Box Visualization */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-300">
              Nascent Polypeptide Chain (Interactive Residue Nodes)
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              (Click any residue to view biochemical profile)
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {totalResidues} Residues · ~{(totalWeight / 1000).toFixed(2)} kDa
          </span>
        </div>

        {/* Chain visualization with peptide backbone linkages */}
        <div className="overflow-x-auto pb-4 pt-2 scrollbar-thin">
          <div className="flex items-center min-w-max gap-1">
            {/* N-terminus cap */}
            <div className="flex flex-col items-center justify-center px-2 py-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-cyan-400 font-bold">
              <span>H₂N-</span>
              <span className="text-[9px] text-slate-400">N-Term</span>
            </div>

            {/* Residue cards linked by peptide bond */}
            {translations.map((t, idx) => {
              const { aminoAcid, codon, isStart, isStop } = t;
              const isTargetCodon = mutationActive && idx === selectedCodonIndex;

              let nodeClass = 'border-slate-700 bg-slate-950 hover:border-slate-500';
              if (isStart) {
                nodeClass = 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/40 shadow-[0_0_14px_rgba(16,185,129,0.3)]';
              } else if (isStop) {
                nodeClass = 'border-red-500 bg-red-950/40 ring-2 ring-red-500/40 shadow-[0_0_14px_rgba(239,68,68,0.3)]';
              } else if (isTargetCodon) {
                nodeClass = 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-400/50 shadow-[0_0_14px_rgba(245,158,11,0.3)]';
              }

              return (
                <React.Fragment key={`residue-${idx}`}>
                  {/* Peptide Bond indicator */}
                  {idx > 0 && (
                    <div className="flex flex-col items-center justify-center px-1 text-slate-600 font-mono text-[10px]">
                      <span className="text-slate-400 leading-none">—</span>
                      <span className="text-[8px] text-slate-400 uppercase tracking-tighter">CO-NH</span>
                      <span className="text-slate-400 leading-none">—</span>
                    </div>
                  )}

                  {/* Interactive Amino Acid Node */}
                  <button
                    onClick={() => onSelectAminoAcid(aminoAcid, codon, idx)}
                    className={`flex flex-col items-center p-2.5 rounded-xl border text-center transition-all duration-150 relative group cursor-pointer active:scale-95 ${nodeClass}`}
                    style={{ minWidth: '82px' }}
                  >
                    {/* Index & Badge */}
                    <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-slate-800/80 pb-1 mb-1.5">
                      <span>#{idx + 1}</span>
                      <span className="font-mono text-[9px] text-cyan-300 font-bold">{codon}</span>
                    </div>

                    {/* Single-Letter Glyph */}
                    <div className="my-0.5">
                      <span
                        className={`text-xl font-bold font-mono ${
                          isStart
                            ? 'text-emerald-400'
                            : isStop
                            ? 'text-red-400'
                            : aminoAcid.color.text
                        }`}
                      >
                        {aminoAcid.letter}
                      </span>
                    </div>

                    {/* 3-Letter Code */}
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      {aminoAcid.shortCode}
                    </span>

                    {/* Full Name */}
                    <span className="text-[10px] text-slate-400 truncate max-w-[70px] mt-0.5">
                      {aminoAcid.name}
                    </span>

                    {/* Property Tag */}
                    <div className="mt-1.5 pt-1 border-t border-slate-800/80 w-full text-[9px] font-mono">
                      {isStart ? (
                        <span className="text-emerald-400 font-semibold">START</span>
                      ) : isStop ? (
                        <span className="text-red-400 font-semibold">STOP</span>
                      ) : (
                        <span className="text-slate-400 capitalize truncate block">
                          {aminoAcid.property.split('-')[0]}
                        </span>
                      )}
                    </div>
                  </button>
                </React.Fragment>
              );
            })}

            {/* C-terminus cap */}
            <div className="flex flex-col items-center justify-center px-2 py-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-emerald-400 font-bold ml-1">
              <span>-COOH</span>
              <span className="text-[9px] text-slate-400">C-Term</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chain Representation Copy Ribbon */}
      <div className="mt-4 rounded-lg bg-slate-950/70 border border-slate-800 p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="overflow-hidden w-full">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
            Synthesized Peptide Sequence
          </span>
          <p className="font-mono text-xs sm:text-sm text-emerald-300 font-medium truncate mt-0.5">
            {fullNameChain}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleCopy(threeLetterChain, '3letter')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            {copiedType === '3letter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>3-Letter</span>
          </button>
          <button
            onClick={() => handleCopy(oneLetterChain, '1letter')}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            {copiedType === '1letter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>1-Letter</span>
          </button>
        </div>
      </div>

      {/* Interactive Chemical Composition Distribution Chart */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-300">
            Biochemical Composition Analysis
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Residue Polarity & Charge Balance
          </span>
        </div>

        {/* Stacked Percentage Bar Chart */}
        <div className="w-full h-3 rounded-full bg-slate-950 flex overflow-hidden border border-slate-800">
          {propertyCounts.hydrophobic > 0 && (
            <div
              style={{ width: `${(propertyCounts.hydrophobic / totalResidues) * 100}%` }}
              className="bg-blue-500 h-full transition-all duration-300"
              title={`Hydrophobic: ${propertyCounts.hydrophobic} (${Math.round((propertyCounts.hydrophobic / totalResidues) * 100)}%)`}
            />
          )}
          {propertyCounts['polar-uncharged'] > 0 && (
            <div
              style={{ width: `${(propertyCounts['polar-uncharged'] / totalResidues) * 100}%` }}
              className="bg-cyan-400 h-full transition-all duration-300"
              title={`Polar Uncharged: ${propertyCounts['polar-uncharged']} (${Math.round((propertyCounts['polar-uncharged'] / totalResidues) * 100)}%)`}
            />
          )}
          {propertyCounts.basic > 0 && (
            <div
              style={{ width: `${(propertyCounts.basic / totalResidues) * 100}%` }}
              className="bg-violet-500 h-full transition-all duration-300"
              title={`Basic (+): ${propertyCounts.basic} (${Math.round((propertyCounts.basic / totalResidues) * 100)}%)`}
            />
          )}
          {propertyCounts.acidic > 0 && (
            <div
              style={{ width: `${(propertyCounts.acidic / totalResidues) * 100}%` }}
              className="bg-rose-500 h-full transition-all duration-300"
              title={`Acidic (-): ${propertyCounts.acidic} (${Math.round((propertyCounts.acidic / totalResidues) * 100)}%)`}
            />
          )}
          {propertyCounts.stop > 0 && (
            <div
              style={{ width: `${(propertyCounts.stop / totalResidues) * 100}%` }}
              className="bg-red-500 h-full transition-all duration-300"
              title={`Stop Signals: ${propertyCounts.stop}`}
            />
          )}
        </div>

        {/* Distribution Legend with precise tabular metrics */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-400">Nonpolar:</span>
            <span className="text-blue-300 font-bold tabular-nums">{propertyCounts.hydrophobic}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-400">Polar:</span>
            <span className="text-cyan-300 font-bold tabular-nums">{propertyCounts['polar-uncharged']}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
            <span className="text-slate-400">Basic (+):</span>
            <span className="text-violet-300 font-bold tabular-nums">{propertyCounts.basic}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-400">Acidic (-):</span>
            <span className="text-rose-300 font-bold tabular-nums">{propertyCounts.acidic}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span className="text-slate-400">Stop:</span>
            <span className="text-red-300 font-bold tabular-nums">{propertyCounts.stop}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
