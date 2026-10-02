import React, { useState, useRef } from 'react';
import { parseFasta } from '../utils/geneticCode';
import { PRESET_GENES } from '../utils/geneticCode';
import { Upload, FileText, CheckCircle2, AlertCircle, X, Sparkles, ArrowRight } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSequenceLoaded: (sequence: string, header: string) => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onSequenceLoaded,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [pasteContent, setPasteContent] = useState('');
  const [parsedPreview, setParsedPreview] = useState<{
    header: string;
    sequence: string;
    cleanName: string;
    lineCount: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processText = (text: string) => {
    try {
      const parsed = parseFasta(text);
      if (parsed.sequence.length === 0) {
        setErrorMsg('No valid A, T, C, G nucleotide characters detected.');
        setParsedPreview(null);
        return;
      }
      setErrorMsg(null);
      setParsedPreview(parsed);
    } catch (e: any) {
      setErrorMsg('Failed to parse file: ' + e.message);
      setParsedPreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setPasteContent(content);
      processText(content);
    };
    reader.readAsText(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setPasteContent(content);
        processText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleApply = () => {
    if (parsedPreview && parsedPreview.sequence.length > 0) {
      onSequenceLoaded(parsedPreview.sequence, parsedPreview.header);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Import DNA Sequence (FASTA / Raw)</h2>
              <p className="text-xs text-slate-400">
                Upload .fasta, .fa, .seq, .txt, or paste genomic/cDNA records directly.
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

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto scrollbar-thin">
          
          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-cyan-400 bg-cyan-950/40 scale-[1.01]'
                : 'border-slate-700 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-900/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".fasta,.fa,.fna,.seq,.txt,.gb"
              onChange={handleFileChange}
              className="hidden"
            />
            <FileText className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs sm:text-sm font-semibold text-slate-200">
              Drag & Drop your FASTA or sequence file here, or <span className="text-cyan-400 underline">browse files</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">
              Supports .fasta, .fa, .fna, .seq, .txt formats
            </p>
          </div>

          {/* Quick Real-World Benchmarks */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Or load real-world benchmark sequences
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {PRESET_GENES.slice(0, 4).map((gene) => (
                <button
                  key={gene.id}
                  onClick={() => {
                    const fastaText = `${gene.fastaHeader || `>${gene.name}`}\n${gene.sequence}`;
                    setPasteContent(fastaText);
                    processText(fastaText);
                  }}
                  className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-left transition-all group"
                >
                  <span className="font-bold text-slate-200 group-hover:text-cyan-300 block truncate">
                    {gene.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block truncate">
                    {gene.sequence.length} bp · {gene.organism}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Raw Text Input */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">
              Manual Paste (FASTA Header + Nucleotides)
            </label>
            <textarea
              rows={4}
              value={pasteContent}
              onChange={(e) => {
                setPasteContent(e.target.value);
                processText(e.target.value);
              }}
              placeholder=">sp|P68871|HBB_HUMAN Hemoglobin subunit beta&#10;ATGGTGCACCTGACTCCTGAGGAGAAGTCT..."
              className="w-full font-mono text-xs p-3 rounded-lg border border-slate-800 bg-slate-950 text-cyan-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Parsed Preview Card */}
          {parsedPreview && (
            <div className="p-4 rounded-xl border border-cyan-500/40 bg-cyan-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Sequence Ready for Analysis
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  {parsedPreview.sequence.length} bp · {Math.floor(parsedPreview.sequence.length / 3)} codons
                </span>
              </div>

              <div className="text-xs font-mono text-slate-300 bg-slate-950/80 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 block truncate">
                  Header: <span className="text-cyan-200">{parsedPreview.header}</span>
                </span>
                <span className="text-slate-400 block mt-1 truncate">
                  Sequence: <span className="text-emerald-300">{parsedPreview.sequence.slice(0, 40)}...</span>
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            disabled={!parsedPreview || parsedPreview.sequence.length === 0}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs disabled:opacity-40 transition-all shadow-md shadow-cyan-500/20"
          >
            <span>Load & Analyze Sequence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
