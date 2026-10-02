import React, { useState } from 'react';
import { AIBiologistAnalysis, AIMutationAnalysis, MutationAnalysis, SequenceMetrics } from '../types/biology';
import { 
  Sparkles, 
  Cpu, 
  Dna, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  HelpCircle, 
  Lightbulb, 
  FlaskConical, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface AIBiologistAssistantProps {
  dnaSequence: string;
  fastaHeader?: string;
  proteinSequence?: string;
  metrics: SequenceMetrics;
  mutationAnalysis: MutationAnalysis | null;
  mutationActive: boolean;
}

export const AIBiologistAssistant: React.FC<AIBiologistAssistantProps> = ({
  dnaSequence,
  fastaHeader,
  proteinSequence,
  metrics,
  mutationAnalysis,
  mutationActive,
}) => {
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIBiologistAnalysis | null>(null);
  const [loadingMutationAi, setLoadingMutationAi] = useState(false);
  const [mutationAi, setMutationAi] = useState<AIMutationAnalysis | null>(null);

  // Chat / Q&A state
  const [userQuestion, setUserQuestion] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [copiedPrimer, setCopiedPrimer] = useState<string | null>(null);

  // Run comprehensive sequence dossier
  const handleRunAiAnalysis = async () => {
    setLoadingAnalysis(true);
    try {
      const res = await fetch('/api/ai/analyze-sequence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sequence: dnaSequence,
          fastaHeader,
          proteinSequence,
          metrics,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAiAnalysis(data.analysis);
      }
    } catch (err) {
      console.error('Failed to run AI analysis:', err);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  // Run mutation clinical & structural assessment
  const handleRunMutationAi = async () => {
    if (!mutationAnalysis) return;
    setLoadingMutationAi(true);
    try {
      const res = await fetch('/api/ai/analyze-mutation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sequence: dnaSequence,
          position: mutationAnalysis.position,
          mutatedBase: mutationAnalysis.mutatedBase,
          originalCodon: mutationAnalysis.originalCodon,
          mutatedCodon: mutationAnalysis.mutatedCodon,
          originalAA: mutationAnalysis.originalAminoAcid.name,
          mutatedAA: mutationAnalysis.mutatedAminoAcid.name,
          mutationType: mutationAnalysis.mutationType,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        setMutationAi(data.analysis);
      }
    } catch (err) {
      console.error('Failed to run AI mutation evaluation:', err);
    } finally {
      setLoadingMutationAi(false);
    }
  };

  // Ask AI bench question
  const handleAskQuestion = async (customPrompt?: string) => {
    const q = customPrompt || userQuestion;
    if (!q.trim()) return;

    setChatLoading(true);
    setChatResponse(null);
    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          sequence: dnaSequence,
          proteinSequence,
          metrics,
        }),
      });
      const data = await res.json();
      if (data.answer) {
        setChatResponse(data.answer);
      } else if (data.error) {
        setChatResponse(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setChatResponse(`Failed to query AI assistant: ${err.message}`);
    } finally {
      setChatLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrimer(id);
    setTimeout(() => setCopiedPrimer(null), 2000);
  };

  return (
    <div className="rounded-xl border border-cyan-500/40 bg-slate-900/80 p-4 sm:p-6 backdrop-blur-md shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">AI Molecular Biologist Co-Pilot</h2>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-700">
                Powered by Gemini 3.8
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Automates nucleotide annotation, structural folding predictions, PCR primer design, and pathogenicity classification to reduce manual lab struggles.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunAiAnalysis}
          disabled={loadingAnalysis}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          {loadingAnalysis ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{aiAnalysis ? 'Re-Analyze with AI' : 'Generate Full AI Dossier'}</span>
        </button>
      </div>

      {/* SECTION 1: AI Comprehensive Sequence Dossier */}
      {aiAnalysis && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Putative Identity & Taxa */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
              <span className="text-[11px] font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
                <Dna className="w-4 h-4" /> Putative Gene Identity & Taxa
              </span>
              <h4 className="text-sm font-bold text-white">{aiAnalysis.putativeIdentity}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{aiAnalysis.homologyAndTaxa}</p>
            </div>

            {/* 2. Protein Domain & Folding */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Protein Domain Architecture & 3D Folding
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{aiAnalysis.proteinDomainAndFolding}</p>
            </div>

            {/* 3. Transcription & Translation Kinetics */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-2">
              <span className="text-[11px] font-mono uppercase text-sky-400 font-bold tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Transcription & Translation Kinetics
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{aiAnalysis.transcriptionalCharacteristics}</p>
              <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-1.5">
                {aiAnalysis.translationalEfficiency}
              </p>
            </div>

            {/* 4. Biological Risks / Hurdles */}
            <div className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/15 space-y-2">
              <span className="text-[11px] font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Experimental Risk Audit
              </span>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {aiAnalysis.biologicalRisksOrChallenges}
              </p>
            </div>
          </div>

          {/* Automated Benchwork PCR Primers & Cloning Protocol Card */}
          <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Automated PCR Primer & Cloning Protocol Recommendations
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">
                Optimal Host: {aiAnalysis.experimentalRecommendations.recommendedHost}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Forward Primer */}
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Forward PCR Primer (5&apos; → 3&apos;)
                  </span>
                  <span className="font-mono text-xs text-emerald-300 font-bold mt-0.5 block truncate max-w-[240px]">
                    {aiAnalysis.experimentalRecommendations.pcrPrimerForward}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(aiAnalysis.experimentalRecommendations.pcrPrimerForward, 'fwd')}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy Forward Primer"
                >
                  {copiedPrimer === 'fwd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Reverse Primer */}
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    Reverse PCR Primer (5&apos; → 3&apos;)
                  </span>
                  <span className="font-mono text-xs text-cyan-300 font-bold mt-0.5 block truncate max-w-[240px]">
                    {aiAnalysis.experimentalRecommendations.pcrPrimerReverse}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(aiAnalysis.experimentalRecommendations.pcrPrimerReverse, 'rev')}
                  className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy Reverse Primer"
                >
                  {copiedPrimer === 'rev' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
              <span>
                Annealing Range: <span className="text-cyan-400">{aiAnalysis.experimentalRecommendations.primerTm}</span>
              </span>
              <span>·</span>
              <span>
                Cloning Method: <span className="text-slate-200">{aiAnalysis.experimentalRecommendations.cloningStrategy}</span>
              </span>
              <span>·</span>
              <span>
                Purification Tag: <span className="text-emerald-400">{aiAnalysis.experimentalRecommendations.purificationTag}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: AI Mutation & Pathogenicity Evaluator */}
      {mutationActive && mutationAnalysis && (
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-800/60 pb-2">
            <div>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                AI Clinical & Structural Mutation Impact Assessor
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Assessing {mutationAnalysis.originalAminoAcid.shortCode} → {mutationAnalysis.mutatedAminoAcid.shortCode} at position {mutationAnalysis.position + 1}
              </span>
            </div>

            <button
              onClick={handleRunMutationAi}
              disabled={loadingMutationAi}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 self-start sm:self-auto disabled:opacity-50"
            >
              {loadingMutationAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{mutationAi ? 'Re-Evaluate Variant' : 'Predict ACMG Pathogenicity'}</span>
            </button>
          </div>

          {mutationAi ? (
            <div className="space-y-3 text-xs pt-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-slate-400">Predicted Classification:</span>
                <span className={`px-2.5 py-1 rounded font-mono font-bold uppercase text-xs ${
                  mutationAi.predictedPathogenicity.includes('Pathogenic')
                    ? 'bg-red-950 border border-red-700 text-red-300'
                    : mutationAi.predictedPathogenicity.includes('Benign')
                    ? 'bg-blue-950 border border-blue-700 text-blue-300'
                    : 'bg-amber-950 border border-amber-700 text-amber-300'
                }`}>
                  {mutationAi.predictedPathogenicity}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  ACMG Criteria: {mutationAi.acmgEvidenceSummary}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    3D Structural Perturbation
                  </span>
                  <p className="text-slate-300 mt-1 leading-relaxed">{mutationAi.structuralImpact}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                    Evolutionary Conservation & Tolerance
                  </span>
                  <p className="text-slate-300 mt-1 leading-relaxed">{mutationAi.evolutionaryConservation}</p>
                </div>
              </div>

              {mutationAi.recommendedValidationAssays && (
                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold mb-1.5">
                    Recommended In Vitro Validation Assays
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300">
                    {mutationAi.recommendedValidationAssays.map((assay, i) => (
                      <li key={i}>{assay}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              Click &quot;Predict ACMG Pathogenicity&quot; to have the AI evaluate structural destabilization, evolutionary conservation, and recommended bench assays.
            </p>
          )}
        </div>
      )}

      {/* SECTION 3: Interactive Ask AI Biologist Console */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Ask AI Molecular Biologist (Benchwork Co-Pilot)
          </h3>
        </div>

        {/* Quick query buttons to reduce manual typing */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            'Design high-fidelity PCR primers with optimal Tm',
            'Is this sequence suitable for E. coli BL21 expression?',
            'Check for potential RNA secondary structures & hairpins',
            'Suggest restriction enzyme sites to clone this into pET28a',
          ].map((promptText) => (
            <button
              key={promptText}
              onClick={() => {
                setUserQuestion(promptText);
                handleAskQuestion(promptText);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-slate-300 hover:text-cyan-200 transition-colors text-[11px]"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input & Ask button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAskQuestion();
            }}
            placeholder="Ask about secondary structures, folding stability, codon optimization, or benchwork protocols..."
            className="flex-1 text-xs bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleAskQuestion()}
            disabled={chatLoading || !userQuestion.trim()}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-40"
          >
            {chatLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>Consult AI</span>
          </button>
        </div>

        {/* AI Answer Box */}
        {chatResponse && (
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
              AI Biologist Guidance:
            </span>
            {chatResponse}
          </div>
        )}
      </div>

    </div>
  );
};
