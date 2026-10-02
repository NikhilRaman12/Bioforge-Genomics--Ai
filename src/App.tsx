/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DNABase, AminoAcidInfo, PresetGene } from './types/biology';
import {
  PRESET_GENES,
  generateRandomDNA,
  transcribeDNA,
  translateCodons,
  analyzePointMutation,
  calculateSequenceMetrics,
  findOpenReadingFrames,
  calculateProteinBiochemistry,
} from './utils/geneticCode';
import { Header } from './components/Header';
import { DNAInputPane } from './components/DNAInputPane';
import { TranscriptionPane } from './components/TranscriptionPane';
import { TranslationPane } from './components/TranslationPane';
import { MutationSimulator } from './components/MutationSimulator';
import { CodonMatrixModal } from './components/CodonMatrixModal';
import { AminoAcidModal } from './components/AminoAcidModal';
import { GeneLibraryModal } from './components/GeneLibraryModal';
import { FileUploadModal } from './components/FileUploadModal';
import { BiologistMetricsPanel } from './components/BiologistMetricsPanel';
import { ORFInspector } from './components/ORFInspector';
import { AIBiologistAssistant } from './components/AIBiologistAssistant';
import { Dna, ArrowDown, Activity, Sparkles, BookOpen, Layers, BarChart3, Bot } from 'lucide-react';

export default function App() {
  // Default to Human Beta-Globin Exon 1 fragment (30 bp)
  const defaultPreset = PRESET_GENES[0];
  const [dnaSequence, setDnaSequence] = useState<string>(defaultPreset.sequence);
  const [activePresetId, setActivePresetId] = useState<string | undefined>(defaultPreset.id);
  const [fastaHeader, setFastaHeader] = useState<string | undefined>(defaultPreset.fastaHeader);

  // Workflow states
  const [isTranscribed, setIsTranscribed] = useState<boolean>(true);
  const [isTranslated, setIsTranslated] = useState<boolean>(true);

  // Mutation Simulator state
  const [mutationActive, setMutationActive] = useState<boolean>(false);
  const [selectedBaseIndex, setSelectedBaseIndex] = useState<number>(17); // Codon 6 2nd base
  const [mutatedBase, setMutatedBase] = useState<DNABase>('T');

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<'pipeline' | 'matrix' | 'library' | 'biometrics' | 'ai-copilot'>('pipeline');
  const [isMatrixOpen, setIsMatrixOpen] = useState<boolean>(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [inspectedAA, setInspectedAA] = useState<{
    aa: AminoAcidInfo;
    codon: string;
  } | null>(null);

  // Section anchors
  const transcriptionRef = useRef<HTMLDivElement>(null);
  const translationRef = useRef<HTMLDivElement>(null);
  const mutationRef = useRef<HTMLDivElement>(null);
  const aiSectionRef = useRef<HTMLDivElement>(null);

  // Compute Wild-Type Transcription
  const transcription = useMemo(() => {
    return transcribeDNA(dnaSequence);
  }, [dnaSequence]);

  // Compute Wild-Type Translation
  const translations = useMemo(() => {
    return translateCodons(transcription.codons, dnaSequence);
  }, [transcription.codons, dnaSequence]);

  // Compute Biologist Molecular Metrics (Length, GC%, Tm, MW, Restriction sites)
  const sequenceMetrics = useMemo(() => {
    return calculateSequenceMetrics(dnaSequence);
  }, [dnaSequence]);

  // Compute Multi-Frame ORFs
  const orfs = useMemo(() => {
    return findOpenReadingFrames(dnaSequence);
  }, [dnaSequence]);

  // Compute Polypeptide Biochemistry (pI, Net charge, GRAVY, Extinction coeff)
  const proteinBiochemistry = useMemo(() => {
    return calculateProteinBiochemistry(translations);
  }, [translations]);

  // Primary translated protein sequence string
  const primaryProteinString = useMemo(() => {
    return translations.map(t => t.aminoAcid.shortCode).join('-');
  }, [translations]);

  // Compute Mutated Sequence
  const mutatedSequence = useMemo(() => {
    if (!mutationActive || selectedBaseIndex < 0 || selectedBaseIndex >= dnaSequence.length) {
      return dnaSequence;
    }
    const arr = dnaSequence.split('');
    arr[selectedBaseIndex] = mutatedBase;
    return arr.join('');
  }, [mutationActive, dnaSequence, selectedBaseIndex, mutatedBase]);

  // Compute Mutation Analysis
  const mutationAnalysis = useMemo(() => {
    if (!mutationActive || selectedBaseIndex < 0 || selectedBaseIndex >= dnaSequence.length) {
      return null;
    }
    try {
      return analyzePointMutation(dnaSequence, selectedBaseIndex, mutatedBase);
    } catch {
      return null;
    }
  }, [mutationActive, dnaSequence, selectedBaseIndex, mutatedBase]);

  // Compute Mutated Translation
  const mutatedTranslations = useMemo(() => {
    if (!mutationActive) return translations;
    const mutTranscription = transcribeDNA(mutatedSequence);
    return translateCodons(mutTranscription.codons, mutatedSequence);
  }, [mutationActive, mutatedSequence, translations]);

  // Handle sequence change
  const handleSequenceChange = (newSeq: string) => {
    setDnaSequence(newSeq);
    setActivePresetId(undefined);
    if (selectedBaseIndex >= newSeq.length && newSeq.length > 0) {
      setSelectedBaseIndex(newSeq.length - 1);
    }
  };

  // Handle sequence loaded from File / FASTA
  const handleSequenceLoaded = (newSeq: string, header: string) => {
    setDnaSequence(newSeq);
    setFastaHeader(header);
    setActivePresetId(undefined);
    setIsTranscribed(true);
    setIsTranslated(true);
    setSelectedBaseIndex(0);
    setActiveTab('pipeline');
  };

  // Generate random 30 bp DNA chain
  const handleGenerateRandom = () => {
    const randomSeq = generateRandomDNA(true); // 30 bp with ATG start
    setDnaSequence(randomSeq);
    setActivePresetId(undefined);
    setFastaHeader('BioForge_Synthetic_Random_Chain_30bp');
    setIsTranscribed(true);
    setIsTranslated(true);
    setSelectedBaseIndex(Math.floor(Math.random() * randomSeq.length));
  };

  // Reset to default
  const handleReset = () => {
    setDnaSequence(defaultPreset.sequence);
    setActivePresetId(defaultPreset.id);
    setFastaHeader(defaultPreset.fastaHeader);
    setMutationActive(false);
    setSelectedBaseIndex(17);
    setMutatedBase('T');
    setIsTranscribed(true);
    setIsTranslated(true);
  };

  // Load a preset gene
  const handleSelectPreset = (preset: PresetGene) => {
    setDnaSequence(preset.sequence);
    setActivePresetId(preset.id);
    setFastaHeader(preset.fastaHeader);
    setIsTranscribed(true);
    setIsTranslated(true);
    if (preset.highlightMutationIndex !== undefined) {
      setSelectedBaseIndex(preset.highlightMutationIndex);
    }
    if (preset.highlightMutationBase) {
      setMutatedBase(preset.highlightMutationBase);
    }
  };

  // Click on "Transcribe" button
  const handleTranscribe = () => {
    setIsTranscribed(true);
    setTimeout(() => {
      transcriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Click on "Translate" button
  const handleTranslate = () => {
    setIsTranslated(true);
    setTimeout(() => {
      translationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // When clicking an amino acid
  const handleSelectAminoAcid = (aa: AminoAcidInfo, codon: string) => {
    setInspectedAA({ aa, codon });
  };

  // Keep tabs in sync with modals
  useEffect(() => {
    if (activeTab === 'matrix') {
      setIsMatrixOpen(true);
    } else {
      setIsMatrixOpen(false);
    }

    if (activeTab === 'library') {
      setIsLibraryOpen(true);
    } else {
      setIsLibraryOpen(false);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => setIsUploadOpen(true)}
        onGenerateRandom={handleGenerateRandom}
        onReset={handleReset}
        mutationActive={mutationActive}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Real-World Scientist Banner */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
                Molecular Biology & Genomics Suite
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-emerald-400">
                FASTA Ingestion · Transcription · Translation · AI Co-Pilot
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Eliminate manual literature and benchwork calculations. Ingest FASTA sequences, inspect thermodynamic profiles, identify Open Reading Frames, and consult Gemini AI for primer design and variant pathogenicity.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <span>Upload Sequence</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('ai-copilot');
                setTimeout(() => {
                  aiSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg hover:bg-cyan-900/60 transition-colors"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Dossier</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Biometrics & Benchwork Telemetry (if active) */}
        {activeTab === 'biometrics' && (
          <section aria-label="Biologist Metrics and Restriction Sites">
            <BiologistMetricsPanel
              metrics={sequenceMetrics}
              biochemistry={proteinBiochemistry}
              dnaSequence={dnaSequence}
              fastaHeader={fastaHeader}
              proteinSequence={primaryProteinString}
            />
          </section>
        )}

        {/* Tab 2: AI Co-Pilot Direct Focus (if active) */}
        {activeTab === 'ai-copilot' && (
          <section ref={aiSectionRef} aria-label="AI Molecular Biologist Co-Pilot">
            <AIBiologistAssistant
              dnaSequence={dnaSequence}
              fastaHeader={fastaHeader}
              proteinSequence={primaryProteinString}
              metrics={sequenceMetrics}
              mutationAnalysis={mutationAnalysis}
              mutationActive={mutationActive}
            />
          </section>
        )}

        {/* Core Pipeline View (Always accessible or when pipeline tab is selected) */}
        {(activeTab === 'pipeline' || activeTab === 'biometrics') && (
          <div className="space-y-6">
            {/* STEP 1: DNA Input & FASTA Ingestion Pane */}
            <section aria-label="DNA Input and Synthesis">
              <DNAInputPane
                dnaSequence={dnaSequence}
                onSequenceChange={handleSequenceChange}
                onGenerateRandom={handleGenerateRandom}
                onTranscribe={handleTranscribe}
                onOpenUpload={() => setIsUploadOpen(true)}
                selectedBaseIndex={selectedBaseIndex}
                onSelectBaseIndex={(idx) => {
                  setSelectedBaseIndex(idx);
                  setMutationActive(true);
                }}
                isTranscribed={isTranscribed}
                mutationActive={mutationActive}
                activePresetId={activePresetId}
                onSelectPreset={handleSelectPreset}
                fastaHeader={fastaHeader}
              />
            </section>

            {/* Multi-Frame ORF Inspector */}
            <section aria-label="Open Reading Frame Multi-Frame Analysis">
              <ORFInspector
                orfs={orfs}
                currentDnaLength={dnaSequence.length}
                onSelectOrfSequence={(orfSeq) => {
                  setDnaSequence(orfSeq);
                  setIsTranscribed(true);
                  setIsTranslated(true);
                  setSelectedBaseIndex(0);
                }}
              />
            </section>

            {/* Quick Metrics Bar if not in dedicated biometrics tab */}
            {activeTab !== 'biometrics' && (
              <section aria-label="Quick Benchwork Metrics">
                <BiologistMetricsPanel
                  metrics={sequenceMetrics}
                  biochemistry={proteinBiochemistry}
                  dnaSequence={dnaSequence}
                  fastaHeader={fastaHeader}
                  proteinSequence={primaryProteinString}
                />
              </section>
            )}

            {/* Transition Connector 1 */}
            {isTranscribed && (
              <div className="flex items-center justify-center my-2 text-cyan-500/80">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-slate-700 to-cyan-500" />
                  <div className="p-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400/90 font-bold">
                    Transcription (RNA Polymerase)
                  </span>
                </div>
              </div>
            )}

            {/* STEP 2: Transcription Pane */}
            {isTranscribed && (
              <section ref={transcriptionRef} aria-label="Transcription mRNA Synthesis">
                <TranscriptionPane
                  dnaSequence={dnaSequence}
                  templateStrand={transcription.templateStrand}
                  mrnaStrand={transcription.mrnaStrand}
                  codons={transcription.codons}
                  onTranslate={handleTranslate}
                  isTranslated={isTranslated}
                  selectedBaseIndex={selectedBaseIndex}
                  mutationActive={mutationActive}
                />
              </section>
            )}

            {/* Transition Connector 2 */}
            {isTranscribed && isTranslated && (
              <div className="flex items-center justify-center my-2 text-emerald-500/80">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-emerald-500" />
                  <div className="p-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400/90 font-bold">
                    Translation (Ribosome 80S Assembly)
                  </span>
                </div>
              </div>
            )}

            {/* STEP 3: Translation Pane */}
            {isTranscribed && isTranslated && (
              <section ref={translationRef} aria-label="Translation Amino Acid Assembly">
                <TranslationPane
                  translations={translations}
                  onSelectAminoAcid={(aa, codon) => handleSelectAminoAcid(aa, codon)}
                  selectedCodonIndex={Math.floor(selectedBaseIndex / 3)}
                  mutationActive={mutationActive}
                />
              </section>
            )}

            {/* Transition Connector 3 */}
            {isTranscribed && isTranslated && (
              <div className="flex items-center justify-center my-2 text-amber-500/80">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-500 to-amber-500" />
                  <div className="p-1 rounded-full bg-amber-950 border border-amber-500/40 text-amber-400">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-400/90 font-bold">
                    Genomic Perturbation & Variant Classification
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: Point Mutation Simulator */}
            {isTranscribed && isTranslated && (
              <section ref={mutationRef} aria-label="Point Mutation Simulator">
                <MutationSimulator
                  mutationActive={mutationActive}
                  onToggleMutation={setMutationActive}
                  selectedBaseIndex={selectedBaseIndex}
                  onSelectBaseIndex={setSelectedBaseIndex}
                  mutatedBase={mutatedBase}
                  onSelectMutatedBase={setMutatedBase}
                  analysis={mutationAnalysis}
                  dnaSequence={dnaSequence}
                  mutatedSequence={mutatedSequence}
                  originalTranslations={translations}
                  mutatedTranslations={mutatedTranslations}
                  onSelectAminoAcid={(aa, codon) => handleSelectAminoAcid(aa, codon)}
                />
              </section>
            )}

            {/* Embedded AI Biologist Assistant Section in Pipeline */}
            <section ref={aiSectionRef} aria-label="AI Molecular Biologist Assistant">
              <AIBiologistAssistant
                dnaSequence={dnaSequence}
                fastaHeader={fastaHeader}
                proteinSequence={primaryProteinString}
                metrics={sequenceMetrics}
                mutationAnalysis={mutationAnalysis}
                mutationActive={mutationActive}
              />
            </section>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">BioForge</span>
            <span>·</span>
            <span>Genomics & Central Dogma Workbench</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>NCBI Code 1</span>
            <span>·</span>
            <span>Thermodynamic Tm</span>
            <span>·</span>
            <span>ORF Frame Scanning</span>
            <span>·</span>
            <span>Gemini 3.8 AI Assistant</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <FileUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSequenceLoaded={handleSequenceLoaded}
      />

      <CodonMatrixModal
        isOpen={isMatrixOpen}
        onClose={() => {
          setIsMatrixOpen(false);
          setActiveTab('pipeline');
        }}
        activeCodons={transcription.codons}
        onSelectAminoAcid={(aa, codon) => {
          setIsMatrixOpen(false);
          setActiveTab('pipeline');
          setInspectedAA({ aa, codon });
        }}
      />

      <GeneLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => {
          setIsLibraryOpen(false);
          setActiveTab('pipeline');
        }}
        onSelectPreset={handleSelectPreset}
        currentPresetId={activePresetId}
      />

      <AminoAcidModal
        aminoAcid={inspectedAA?.aa || null}
        codonTrigger={inspectedAA?.codon}
        onClose={() => setInspectedAA(null)}
      />

    </div>
  );
}
