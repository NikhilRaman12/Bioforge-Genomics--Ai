export type DNABase = 'A' | 'T' | 'C' | 'G';
export type RNABase = 'A' | 'U' | 'C' | 'G';

export type AminoAcidProperty = 
  | 'hydrophobic' 
  | 'polar-uncharged' 
  | 'basic' 
  | 'acidic' 
  | 'stop';

export interface AminoAcidInfo {
  name: string;
  shortCode: string; // 3-letter: Met, Gly, etc.
  letter: string;    // 1-letter: M, G, etc.
  property: AminoAcidProperty;
  propertyLabel: string;
  molecularWeight: number; // g/mol
  formula: string;
  description: string;
  charge: 'positive' | 'negative' | 'neutral';
  color: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
}

export interface CodonTranslation {
  codon: string;
  index: number; // Codon index (0, 1, 2...)
  dnaCodon: string;
  aminoAcid: AminoAcidInfo;
  isStart: boolean;
  isStop: boolean;
}

export type MutationType = 'Silent' | 'Missense' | 'Nonsense' | 'Start-Loss' | 'Stop-Loss' | 'No-Change';

export interface MutationAnalysis {
  hasMutation: boolean;
  position: number; // 0-indexed in sequence
  originalBase: DNABase;
  mutatedBase: DNABase;
  codonIndex: number;
  positionInCodon: number; // 0, 1, or 2
  originalCodon: string;
  mutatedCodon: string;
  originalAminoAcid: AminoAcidInfo;
  mutatedAminoAcid: AminoAcidInfo;
  mutationType: MutationType;
  description: string;
  biochemicalImpact: string;
  severity: 'benign' | 'moderate' | 'severe';
}

export interface PresetGene {
  id: string;
  name: string;
  organism: string;
  description: string;
  sequence: string; // 30 bp or multiple of 3
  clinicalSignificance?: string;
  highlightMutationIndex?: number;
  highlightMutationBase?: DNABase;
  fastaHeader?: string;
}

// Biologist Sequence Analytics
export interface RestrictionSite {
  enzyme: string;
  site: string;
  positions: number[]; // 1-based start coordinates
  cutPositionOffset: number;
}

export interface SequenceMetrics {
  lengthBp: number;
  gcCount: number;
  atCount: number;
  gcPercent: number;
  atPercent: number;
  gcSkew: number; // (G - C) / (G + C)
  cpgCount: number;
  meltingTempBasic: number; // Tm °C (Wallace rule: 2(A+T) + 4(G+C))
  meltingTempThermodynamic: number; // Nearest-neighbor thermodynamic Tm °C
  dsMolecularWeightKDa: number;
  ssMolecularWeightKDa: number;
  restrictionSites: RestrictionSite[];
}

export interface OpenReadingFrame {
  id: string;
  frame: 1 | 2 | 3;
  startIndex: number; // 0-based in DNA sequence
  endIndex: number;   // 0-based in DNA sequence (inclusive of stop codon)
  lengthBp: number;
  lengthCodons: number;
  startCodon: string;
  stopCodon: string;
  dnaSequence: string;
  mrnaSequence: string;
  proteinSequence: string;
  isLongest: boolean;
}

export interface ProteinBiochemistry {
  lengthResidues: number;
  molecularWeightKDa: number;
  isoelectricPoint: number; // pI
  netChargePH7: number;
  gravyScore: number; // Kyte-Doolittle GRAVY
  extinctionCoefficient280: number; // M^-1 cm^-1
  absorbance01Percent: number; // A280 for 0.1% (1 g/L)
  aromaticity: number; // Fraction of Phe + Tyr + Trp
}

export interface AIBiologistAnalysis {
  putativeIdentity: string;
  homologyAndTaxa: string;
  transcriptionalCharacteristics: string;
  translationalEfficiency: string;
  proteinDomainAndFolding: string;
  experimentalRecommendations: {
    recommendedHost: string;
    pcrPrimerForward: string;
    pcrPrimerReverse: string;
    primerTm: string;
    cloningStrategy: string;
    purificationTag: string;
  };
  biologicalRisksOrChallenges: string;
}

export interface AIMutationAnalysis {
  structuralImpact: string;
  evolutionaryConservation: string;
  predictedPathogenicity: 'Pathogenic' | 'Likely Pathogenic' | 'Variant of Uncertain Significance (VUS)' | 'Likely Benign' | 'Benign';
  acmgEvidenceSummary: string;
  recommendedValidationAssays: string[];
}
