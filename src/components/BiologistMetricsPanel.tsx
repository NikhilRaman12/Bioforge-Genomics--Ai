import React, { useState } from 'react';
import { SequenceMetrics, ProteinBiochemistry } from '../types/biology';
import { 
  BarChart3, 
  Thermometer, 
  Scissors, 
  Weight, 
  Zap, 
  Activity, 
  ShieldCheck, 
  AlertCircle,
  Copy,
  Check,
  Download
} from 'lucide-react';

interface BiologistMetricsPanelProps {
  metrics: SequenceMetrics;
  biochemistry: ProteinBiochemistry;
  dnaSequence: string;
  fastaHeader?: string;
  proteinSequence?: string;
}

export const BiologistMetricsPanel: React.FC<BiologistMetricsPanelProps> = ({
  metrics,
  biochemistry,
  dnaSequence,
  fastaHeader,
  proteinSequence,
}) => {
  const [copiedFasta, setCopiedFasta] = useState(false);

  const handleCopyFasta = () => {
    const fasta = `>${fastaHeader || 'BioForge_Analyzed_Sequence'}\n${dnaSequence}`;
    navigator.clipboard.writeText(fasta);
    setCopiedFasta(true);
    setTimeout(() => setCopiedFasta(false), 2000);
  };

  const handleDownloadFasta = () => {
    const fasta = `>${fastaHeader || 'BioForge_Analyzed_Sequence'}\n${dnaSequence}\n\n>${fastaHeader || 'BioForge'}_Translated_Peptide\n${proteinSequence || ''}`;
    const blob = new Blob([fasta], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sequence_analysis_${Date.now()}.fasta`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-sm shadow-xl space-y-6">
      
      {/* Header with Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">Biologist Sequence Metrics & Biophysics</h2>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-700/50">
                Benchwork Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Thermodynamic melting profiles, base composition, restriction digestion sites, and polypeptide charge calculations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyFasta}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-950 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
            title="Copy FASTA sequence"
          >
            {copiedFasta ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy FASTA</span>
          </button>

          <button
            onClick={handleDownloadFasta}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/60 transition-colors"
            title="Download FASTA file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export File</span>
          </button>
        </div>
      </div>

      {/* Primary Thermodynamic & Nucleotide Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Length & MW */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Sequence Length
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {metrics.lengthBp}
            </span>
            <span className="text-xs font-mono text-slate-400">bp</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">
            dsDNA: {metrics.dsMolecularWeightKDa} kDa · ssDNA: {metrics.ssMolecularWeightKDa} kDa
          </span>
        </div>

        {/* GC & AT Content */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            GC / AT Content
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-cyan-300 tabular-nums">
              {metrics.gcPercent}%
            </span>
            <span className="text-xs font-mono text-slate-400">GC</span>
          </div>
          <div className="mt-1.5 w-full h-1.5 rounded-full bg-slate-800 flex overflow-hidden">
            <div style={{ width: `${metrics.gcPercent}%` }} className="bg-cyan-400 h-full" />
            <div style={{ width: `${metrics.atPercent}%` }} className="bg-sky-600 h-full" />
          </div>
        </div>

        {/* Melting Temp (Tm) */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Melting Temp (Tm)
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-emerald-300 tabular-nums">
              {metrics.meltingTempThermodynamic}
            </span>
            <span className="text-xs font-mono text-slate-400">°C</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">
            Thermodynamic [Na+ 50mM] · Basic: {metrics.meltingTempBasic}°C
          </span>
        </div>

        {/* GC Skew & CpG */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            GC Skew & CpG Islands
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-mono text-violet-300 tabular-nums">
              {metrics.gcSkew}
            </span>
            <span className="text-xs font-mono text-slate-400">skew</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 block mt-1">
            {metrics.cpgCount} CpG Dinucleotides detected
          </span>
        </div>
      </div>

      {/* Restriction Enzyme Cleavage Digest Scanner */}
      <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Restriction Enzyme Cleavage Digest (Cloning Compatibility)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {metrics.restrictionSites.length > 0 ? (
              <span className="text-amber-400 font-bold">{metrics.restrictionSites.length} site(s) present</span>
            ) : (
              <span className="text-emerald-400 font-bold">Clean sequence (no internal cuts)</span>
            )}
          </span>
        </div>

        {metrics.restrictionSites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {metrics.restrictionSites.map((site) => (
              <div
                key={site.enzyme}
                className="p-2.5 rounded-lg border border-amber-500/40 bg-amber-950/20 text-xs font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300">{site.enzyme}</span>
                  <span className="text-[10px] text-slate-400">{site.site}</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Cut coordinates: <span className="text-cyan-300 font-bold">{site.positions.join(', ')}</span> bp
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 font-mono">
            EcoRI, BamHI, HindIII, NotI, XhoI, NdeI, NcoI, XbaI, PstI, SmaI do not cut internally. Ideal for sticky-end and directional plasmid cloning.
          </p>
        )}
      </div>

      {/* Protein Biophysics (pI, Net Charge, GRAVY, Extinction Coeff) */}
      <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Nascent Polypeptide Biophysics & Solubility Index
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {biochemistry.lengthResidues} Amino Acids · ~{biochemistry.molecularWeightKDa} kDa
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Isoelectric point */}
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Isoelectric Point</span>
            <span className="text-lg font-bold font-mono text-emerald-300 block mt-0.5">
              pI {biochemistry.isoelectricPoint}
            </span>
          </div>

          {/* Net Charge */}
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Charge (pH 7.4)</span>
            <span className={`text-lg font-bold font-mono block mt-0.5 ${
              biochemistry.netChargePH7 > 0 ? 'text-violet-400' :
              biochemistry.netChargePH7 < 0 ? 'text-rose-400' : 'text-slate-300'
            }`}>
              {biochemistry.netChargePH7 > 0 ? `+${biochemistry.netChargePH7}` : biochemistry.netChargePH7}
            </span>
          </div>

          {/* GRAVY */}
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">GRAVY Hydropathy</span>
            <span className={`text-lg font-bold font-mono block mt-0.5 ${
              biochemistry.gravyScore > 0 ? 'text-blue-400' : 'text-cyan-300'
            }`}>
              {biochemistry.gravyScore}
            </span>
            <span className="text-[9px] text-slate-500 font-mono">
              {biochemistry.gravyScore > 0 ? 'Hydrophobic' : 'Hydrophilic'}
            </span>
          </div>

          {/* Extinction Coefficient */}
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Extinction Coeff</span>
            <span className="text-lg font-bold font-mono text-cyan-300 block mt-0.5">
              {biochemistry.extinctionCoefficient280}
            </span>
            <span className="text-[9px] text-slate-500 font-mono">M⁻¹ cm⁻¹ (280nm)</span>
          </div>

          {/* Aromaticity */}
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Aromaticity</span>
            <span className="text-lg font-bold font-mono text-amber-300 block mt-0.5">
              {biochemistry.aromaticity}%
            </span>
            <span className="text-[9px] text-slate-500 font-mono">Phe + Tyr + Trp</span>
          </div>
        </div>
      </div>

    </div>
  );
};
