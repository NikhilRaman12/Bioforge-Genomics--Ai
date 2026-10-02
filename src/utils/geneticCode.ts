import {
  AminoAcidInfo,
  CodonTranslation,
  DNABase,
  MutationAnalysis,
  MutationType,
  PresetGene,
  RNABase,
  RestrictionSite,
  SequenceMetrics,
  OpenReadingFrame,
  ProteinBiochemistry,
} from '../types/biology';

export const AMINO_ACID_LIBRARY: Record<string, AminoAcidInfo> = {
  Met: {
    name: 'Methionine',
    shortCode: 'Met',
    letter: 'M',
    property: 'hydrophobic',
    propertyLabel: 'Nonpolar / Hydrophobic (START)',
    molecularWeight: 149.21,
    formula: 'C5H11NO2S',
    description: 'Universal initiation codon translation product in eukaryotes and archaea. Contains a thioether sulfur atom.',
    charge: 'neutral',
    color: {
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/30',
    },
  },
  Gly: {
    name: 'Glycine',
    shortCode: 'Gly',
    letter: 'G',
    property: 'polar-uncharged',
    propertyLabel: 'Special / Smallest (Flexible)',
    molecularWeight: 75.07,
    formula: 'C2H5NO2',
    description: 'The smallest amino acid with only a hydrogen atom as its side chain, conferring supreme backbone flexibility.',
    charge: 'neutral',
    color: {
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/30',
    },
  },
  Ser: {
    name: 'Serine',
    shortCode: 'Ser',
    letter: 'S',
    property: 'polar-uncharged',
    propertyLabel: 'Polar Uncharged',
    molecularWeight: 105.09,
    formula: 'C3H7NO3',
    description: 'Contains a polar hydroxyl group (-OH) frequently phosphorylated in cell signaling cascades.',
    charge: 'neutral',
    color: {
      bg: 'bg-sky-500/20',
      border: 'border-sky-500',
      text: 'text-sky-400',
      glow: 'shadow-sky-500/30',
    },
  },
  Val: {
    name: 'Valine',
    shortCode: 'Val',
    letter: 'V',
    property: 'hydrophobic',
    propertyLabel: 'Branched Nonpolar',
    molecularWeight: 117.15,
    formula: 'C5H11NO2',
    description: 'Branched-chain hydrophobic amino acid. Key residue in hemoglobin beta-chain sickle cell pathogenesis.',
    charge: 'neutral',
    color: {
      bg: 'bg-teal-500/20',
      border: 'border-teal-500',
      text: 'text-teal-400',
      glow: 'shadow-teal-500/30',
    },
  },
  Phe: {
    name: 'Phenylalanine',
    shortCode: 'Phe',
    letter: 'F',
    property: 'hydrophobic',
    propertyLabel: 'Aromatic Nonpolar',
    molecularWeight: 165.19,
    formula: 'C9H11NO2',
    description: 'Large bulky benzyl side chain, strongly hydrophobic, critical for protein hydrophobic core stabilization.',
    charge: 'neutral',
    color: {
      bg: 'bg-indigo-500/20',
      border: 'border-indigo-500',
      text: 'text-indigo-400',
      glow: 'shadow-indigo-500/30',
    },
  },
  Leu: {
    name: 'Leucine',
    shortCode: 'Leu',
    letter: 'L',
    property: 'hydrophobic',
    propertyLabel: 'Branched Nonpolar',
    molecularWeight: 131.17,
    formula: 'C6H13NO2',
    description: 'Major constituent of protein interior cores and leucine zipper transcription factor dimerization domains.',
    charge: 'neutral',
    color: {
      bg: 'bg-teal-600/20',
      border: 'border-teal-400',
      text: 'text-teal-300',
      glow: 'shadow-teal-500/30',
    },
  },
  Ile: {
    name: 'Isoleucine',
    shortCode: 'Ile',
    letter: 'I',
    property: 'hydrophobic',
    propertyLabel: 'Branched Nonpolar',
    molecularWeight: 131.17,
    formula: 'C6H13NO2',
    description: 'Isomer of leucine possessing two chiral centers. Strictly hydrophobic aliphatic side chain.',
    charge: 'neutral',
    color: {
      bg: 'bg-emerald-600/20',
      border: 'border-emerald-400',
      text: 'text-emerald-300',
      glow: 'shadow-emerald-500/30',
    },
  },
  Ala: {
    name: 'Alanine',
    shortCode: 'Ala',
    letter: 'A',
    property: 'hydrophobic',
    propertyLabel: 'Aliphatic Nonpolar',
    molecularWeight: 89.09,
    formula: 'C3H7NO2',
    description: 'Possesses a simple methyl group (-CH3). Common helix former in secondary structure prediction.',
    charge: 'neutral',
    color: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/30',
    },
  },
  Tyr: {
    name: 'Tyrosine',
    shortCode: 'Tyr',
    letter: 'Y',
    property: 'polar-uncharged',
    propertyLabel: 'Aromatic Polar',
    molecularWeight: 181.19,
    formula: 'C9H11NO3',
    description: 'Phenolic side chain absorbing UV at 280 nm; central phosphorylation target of receptor tyrosine kinases.',
    charge: 'neutral',
    color: {
      bg: 'bg-cyan-600/20',
      border: 'border-cyan-400',
      text: 'text-cyan-300',
      glow: 'shadow-cyan-400/30',
    },
  },
  His: {
    name: 'Histidine',
    shortCode: 'His',
    letter: 'H',
    property: 'basic',
    propertyLabel: 'Basic / Positively Charged',
    molecularWeight: 155.16,
    formula: 'C6H9N3O2',
    description: 'Imidazole ring with pKa ~6.0, uniquely allowing reversible protonation near physiological pH.',
    charge: 'positive',
    color: {
      bg: 'bg-violet-500/20',
      border: 'border-violet-500',
      text: 'text-violet-300',
      glow: 'shadow-violet-500/30',
    },
  },
  Gln: {
    name: 'Glutamine',
    shortCode: 'Gln',
    letter: 'Q',
    property: 'polar-uncharged',
    propertyLabel: 'Polar Amide',
    molecularWeight: 146.15,
    formula: 'C5H10N2O3',
    description: 'Amide derivative of glutamate. Primary nitrogen carrier in systemic human circulation.',
    charge: 'neutral',
    color: {
      bg: 'bg-sky-600/20',
      border: 'border-sky-400',
      text: 'text-sky-300',
      glow: 'shadow-sky-400/30',
    },
  },
  Asn: {
    name: 'Asparagine',
    shortCode: 'Asn',
    letter: 'N',
    property: 'polar-uncharged',
    propertyLabel: 'Polar Amide',
    molecularWeight: 132.12,
    formula: 'C4H8N2O3',
    description: 'Amide derivative of aspartate. Target for N-linked protein glycosylation in the endoplasmic reticulum.',
    charge: 'neutral',
    color: {
      bg: 'bg-sky-500/20',
      border: 'border-sky-400',
      text: 'text-sky-300',
      glow: 'shadow-sky-500/30',
    },
  },
  Lys: {
    name: 'Lysine',
    shortCode: 'Lys',
    letter: 'K',
    property: 'basic',
    propertyLabel: 'Basic / Positively Charged',
    molecularWeight: 146.19,
    formula: 'C6H14N2O2',
    description: 'Positively charged epsilon-amino aliphatic tail; frequent site of ubiquitinylation and acetylation.',
    charge: 'positive',
    color: {
      bg: 'bg-purple-500/20',
      border: 'border-purple-500',
      text: 'text-purple-300',
      glow: 'shadow-purple-500/30',
    },
  },
  Asp: {
    name: 'Aspartic Acid',
    shortCode: 'Asp',
    letter: 'D',
    property: 'acidic',
    propertyLabel: 'Acidic / Negatively Charged',
    molecularWeight: 133.10,
    formula: 'C4H7NO4',
    description: 'Beta-carboxyl group ionized at physiological pH; critical in catalytic triads and metal coordination.',
    charge: 'negative',
    color: {
      bg: 'bg-rose-500/20',
      border: 'border-rose-400',
      text: 'text-rose-300',
      glow: 'shadow-rose-500/30',
    },
  },
  Glu: {
    name: 'Glutamic Acid',
    shortCode: 'Glu',
    letter: 'E',
    property: 'acidic',
    propertyLabel: 'Acidic / Negatively Charged',
    molecularWeight: 147.13,
    formula: 'C5H9NO4',
    description: 'Negatively charged gamma-carboxylate side chain. Mutated to Valine in Sickle Cell Disease.',
    charge: 'negative',
    color: {
      bg: 'bg-rose-500/20',
      border: 'border-rose-400',
      text: 'text-rose-300',
      glow: 'shadow-rose-500/30',
    },
  },
  Cys: {
    name: 'Cysteine',
    shortCode: 'Cys',
    letter: 'C',
    property: 'polar-uncharged',
    propertyLabel: 'Thiol / Crosslinker',
    molecularWeight: 121.16,
    formula: 'C3H7NO2S',
    description: 'Contains a reactive thiol group (-SH) capable of forming covalent disulfide bonds (-S-S-).',
    charge: 'neutral',
    color: {
      bg: 'bg-amber-500/20',
      border: 'border-amber-400',
      text: 'text-amber-300',
      glow: 'shadow-amber-500/30',
    },
  },
  Trp: {
    name: 'Tryptophan',
    shortCode: 'Trp',
    letter: 'W',
    property: 'hydrophobic',
    propertyLabel: 'Aromatic Nonpolar (Bulkiest)',
    molecularWeight: 204.23,
    formula: 'C11H12N2O2',
    description: 'Largest amino acid with an indole bicyclic ring; precursor for serotonin and melatonin biosynthesis.',
    charge: 'neutral',
    color: {
      bg: 'bg-blue-600/20',
      border: 'border-blue-400',
      text: 'text-blue-300',
      glow: 'shadow-blue-500/30',
    },
  },
  Arg: {
    name: 'Arginine',
    shortCode: 'Arg',
    letter: 'R',
    property: 'basic',
    propertyLabel: 'Basic / Positively Charged',
    molecularWeight: 174.20,
    formula: 'C6H14N4O2',
    description: 'Guanidinium group with pKa ~12.5; consistently positively charged, binds DNA phosphate backbone strongly.',
    charge: 'positive',
    color: {
      bg: 'bg-violet-600/20',
      border: 'border-violet-400',
      text: 'text-violet-300',
      glow: 'shadow-violet-600/30',
    },
  },
  Pro: {
    name: 'Proline',
    shortCode: 'Pro',
    letter: 'P',
    property: 'hydrophobic',
    propertyLabel: 'Cyclic / Helix Breaker',
    molecularWeight: 115.13,
    formula: 'C5H9NO2',
    description: 'Unique secondary amine forming a rigid pyrrolidine ring; introduces kinks in alpha-helices.',
    charge: 'neutral',
    color: {
      bg: 'bg-teal-700/20',
      border: 'border-teal-500',
      text: 'text-teal-200',
      glow: 'shadow-teal-600/30',
    },
  },
  Thr: {
    name: 'Threonine',
    shortCode: 'Thr',
    letter: 'T',
    property: 'polar-uncharged',
    propertyLabel: 'Polar Hydroxyl',
    molecularWeight: 119.12,
    formula: 'C4H9NO3',
    description: 'Secondary alcohol side chain possessing two chiral centers. Key target for O-linked glycosylation.',
    charge: 'neutral',
    color: {
      bg: 'bg-sky-600/20',
      border: 'border-sky-500',
      text: 'text-sky-300',
      glow: 'shadow-sky-500/30',
    },
  },
  STOP: {
    name: 'Stop Codon',
    shortCode: 'STOP',
    letter: '*',
    property: 'stop',
    propertyLabel: 'Termination Signal',
    molecularWeight: 0,
    formula: 'Release Factor Binding',
    description: 'Recruits eukaryotic Release Factor (eRF1) to dissociate peptide chain and disassemble ribosomal subunits.',
    charge: 'neutral',
    color: {
      bg: 'bg-red-500/25',
      border: 'border-red-500',
      text: 'text-red-400',
      glow: 'shadow-red-500/40',
    },
  },
};

// Standard Genetic Code 64 Codon Matrix
export const CODON_TABLE: Record<string, string> = {
  // U row
  UUU: 'Phe', UUC: 'Phe', UUA: 'Leu', UUG: 'Leu',
  UCU: 'Ser', UCC: 'Ser', UCA: 'Ser', UCG: 'Ser',
  UAU: 'Tyr', UAC: 'Tyr', UAA: 'STOP', UAG: 'STOP',
  UGU: 'Cys', UGC: 'Cys', UGA: 'STOP', UGG: 'Trp',

  // C row
  CUU: 'Leu', CUC: 'Leu', CUA: 'Leu', CUG: 'Leu',
  CCU: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro',
  CAU: 'His', CAC: 'His', CAA: 'Gln', CAG: 'Gln',
  CGU: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg',

  // A row
  AUU: 'Ile', AUC: 'Ile', AUA: 'Ile', AUG: 'Met',
  ACU: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr',
  AAU: 'Asn', AAC: 'Asn', AAA: 'Lys', AAG: 'Lys',
  AGU: 'Ser', AGC: 'Ser', AGA: 'Arg', AGG: 'Arg',

  // G row
  GUU: 'Val', GUC: 'Val', GUA: 'Val', GUG: 'Val',
  GCU: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala',
  GAU: 'Asp', GAC: 'Asp', GAA: 'Glu', GAG: 'Glu',
  GGU: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly',
};

// Base pairing rules
export const DNA_COMPLEMENT_MAP: Record<DNABase, DNABase> = {
  A: 'T',
  T: 'A',
  C: 'G',
  G: 'C',
};

export const COMMON_RESTRICTION_ENZYMES = [
  { enzyme: 'EcoRI', site: 'GAATTC', cutOffset: 1 },
  { enzyme: 'BamHI', site: 'GGATCC', cutOffset: 1 },
  { enzyme: 'HindIII', site: 'AAGCTT', cutOffset: 1 },
  { enzyme: 'NotI', site: 'GCGGCCGC', cutOffset: 2 },
  { enzyme: 'XhoI', site: 'CTCGAG', cutOffset: 1 },
  { enzyme: 'NdeI', site: 'CATATG', cutOffset: 2 },
  { enzyme: 'NcoI', site: 'CCATGG', cutOffset: 1 },
  { enzyme: 'XbaI', site: 'TCTAGA', cutOffset: 1 },
  { enzyme: 'PstI', site: 'CTGCAG', cutOffset: 5 },
  { enzyme: 'SmaI', site: 'CCCGGG', cutOffset: 3 },
];

// Kyte-Doolittle Hydropathy Scale
export const KYTE_DOOLITTLE_HYDROPATHY: Record<string, number> = {
  Ile: 4.5, Val: 4.2, Leu: 3.8, Phe: 2.8, Cys: 2.5,
  Met: 1.9, Ala: 1.8, Gly: -0.4, Thr: -0.7, Ser: -0.8,
  Trp: -0.9, Tyr: -1.3, Pro: -1.6, His: -3.2, Glu: -3.5,
  Gln: -3.5, Asp: -3.5, Asn: -3.5, Lys: -3.9, Arg: -4.5,
  STOP: 0,
};

// pKa Values for Henderson-Hasselbalch calculation
const PKA_VALUES = {
  nTerm: 9.69,
  cTerm: 2.34,
  Asp: 3.86,
  Glu: 4.25,
  Cys: 8.33,
  Tyr: 10.07,
  His: 6.00,
  Lys: 10.53,
  Arg: 12.48,
};

/**
 * Validates whether string contains only A, T, C, G (case insensitive)
 */
export function validateDNA(input: string): { isValid: boolean; sanitized: string; invalidChars: string[] } {
  const upper = input.toUpperCase().replace(/\s+/g, '');
  const invalidChars: string[] = [];
  
  for (const char of upper) {
    if (!['A', 'T', 'C', 'G'].includes(char)) {
      if (!invalidChars.includes(char)) {
        invalidChars.push(char);
      }
    }
  }

  const sanitized = upper.split('').filter(c => ['A', 'T', 'C', 'G'].includes(c)).join('');
  return {
    isValid: invalidChars.length === 0,
    sanitized,
    invalidChars,
  };
}

/**
 * Parse FASTA file contents into structured metadata and raw clean sequence
 */
export function parseFasta(fileContent: string): {
  header: string;
  sequence: string;
  cleanName: string;
  lineCount: number;
} {
  const lines = fileContent.split(/\r?\n/);
  let header = '';
  const seqParts: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('>') || trimmed.startsWith(';')) {
      if (!header) {
        header = trimmed.replace(/^[>;]\s*/, '');
      }
    } else {
      // Remove any numbers or whitespace within sequence lines
      const cleanSeq = trimmed.replace(/[\d\s]/g, '');
      seqParts.push(cleanSeq);
    }
  }

  const fullRawSeq = seqParts.join('').toUpperCase();
  const validation = validateDNA(fullRawSeq);
  const cleanName = header ? header.split(/[|\s]/)[0] : 'Imported_Sequence';

  return {
    header: header || 'Custom Uploaded DNA Sequence',
    sequence: validation.sanitized,
    cleanName,
    lineCount: lines.length,
  };
}

/**
 * Compute exhaustive molecular metrics for real-world laboratory sequences
 */
export function calculateSequenceMetrics(dnaSequence: string): SequenceMetrics {
  const seq = dnaSequence.toUpperCase();
  const len = seq.length;

  if (len === 0) {
    return {
      lengthBp: 0,
      gcCount: 0,
      atCount: 0,
      gcPercent: 0,
      atPercent: 0,
      gcSkew: 0,
      cpgCount: 0,
      meltingTempBasic: 0,
      meltingTempThermodynamic: 0,
      dsMolecularWeightKDa: 0,
      ssMolecularWeightKDa: 0,
      restrictionSites: [],
    };
  }

  let a = 0, t = 0, c = 0, g = 0;
  let cpgCount = 0;

  for (let i = 0; i < len; i++) {
    const b = seq[i];
    if (b === 'A') a++;
    else if (b === 'T') t++;
    else if (b === 'C') c++;
    else if (b === 'G') g++;

    if (i < len - 1 && seq[i] === 'C' && seq[i + 1] === 'G') {
      cpgCount++;
    }
  }

  const gcCount = g + c;
  const atCount = a + t;
  const gcPercent = Number(((gcCount / len) * 100).toFixed(1));
  const atPercent = Number(((atCount / len) * 100).toFixed(1));
  const gcSkew = (g + c) > 0 ? Number(((g - c) / (g + c)).toFixed(3)) : 0;

  // Wallace Rule Tm for short oligos (< 14 bp) vs Nearest-neighbor for longer (> 14 bp)
  const tmBasic = len < 14 ? (a + t) * 2 + (g + c) * 4 : Number((64.9 + 41 * (gcCount - 16.4) / len).toFixed(1));
  // Thermodynamic approximation with 50mM Na+ salt condition
  const tmThermo = Number((81.5 + 16.6 * Math.log10(0.05) + 0.41 * gcPercent - (675 / len)).toFixed(1));

  // Molecular weights in kDa (Average dsDNA ~ 660 g/mol per bp, ssDNA ~ 330 g/mol per nt)
  const dsMolecularWeightKDa = Number(((len * 660) / 1000).toFixed(2));
  const ssMolecularWeightKDa = Number(((len * 330) / 1000).toFixed(2));

  // Scan common restriction enzyme cleavage sites
  const restrictionSites: RestrictionSite[] = [];
  for (const re of COMMON_RESTRICTION_ENZYMES) {
    const positions: number[] = [];
    let idx = seq.indexOf(re.site);
    while (idx !== -1) {
      positions.push(idx + 1); // 1-based coordinate
      idx = seq.indexOf(re.site, idx + 1);
    }
    if (positions.length > 0) {
      restrictionSites.push({
        enzyme: re.enzyme,
        site: re.site,
        positions,
        cutPositionOffset: re.cutOffset,
      });
    }
  }

  return {
    lengthBp: len,
    gcCount,
    atCount,
    gcPercent,
    atPercent,
    gcSkew,
    cpgCount,
    meltingTempBasic: tmBasic,
    meltingTempThermodynamic: tmThermo,
    dsMolecularWeightKDa,
    ssMolecularWeightKDa,
    restrictionSites,
  };
}

/**
 * Transcribe DNA coding strand (5' -> 3') to mRNA strand (5' -> 3').
 */
export function transcribeDNA(dnaCodingStrand: string): {
  templateStrand: string;
  mrnaStrand: string;
  codons: string[];
} {
  const sanitized = dnaCodingStrand.toUpperCase().replace(/[^ATCG]/g, '');
  
  // Template strand (complement): A -> T, T -> A, C -> G, G -> C
  const templateStrand = sanitized
    .split('')
    .map(base => DNA_COMPLEMENT_MAP[base as DNABase] || 'N')
    .join('');

  // mRNA: directly coding strand replacing T with U
  const mrnaStrand = sanitized.replace(/T/g, 'U');

  // Group into triplets (codons)
  const codons: string[] = [];
  for (let i = 0; i < mrnaStrand.length; i += 3) {
    codons.push(mrnaStrand.slice(i, i + 3));
  }

  return {
    templateStrand,
    mrnaStrand,
    codons,
  };
}

/**
 * Translates an array of mRNA codons into Amino Acids
 */
export function translateCodons(codons: string[], dnaStrand: string): CodonTranslation[] {
  return codons.map((codon, index) => {
    const dnaCodon = dnaStrand.slice(index * 3, index * 3 + 3);
    const shortCode = CODON_TABLE[codon] || 'Unknown';
    const aminoAcid = AMINO_ACID_LIBRARY[shortCode] || {
      name: `Unknown (${codon})`,
      shortCode: codon.length < 3 ? 'Inc' : '???',
      letter: '?',
      property: 'polar-uncharged',
      propertyLabel: 'Incomplete Codon',
      molecularWeight: 0,
      formula: 'N/A',
      description: 'Codon is incomplete or unrecognized.',
      charge: 'neutral',
      color: {
        bg: 'bg-slate-700/50',
        border: 'border-slate-500',
        text: 'text-slate-400',
        glow: '',
      },
    };

    const isStart = codon === 'AUG';
    const isStop = ['UAA', 'UAG', 'UGA'].includes(codon);

    return {
      codon,
      index,
      dnaCodon,
      aminoAcid,
      isStart,
      isStop,
    };
  });
}

/**
 * Scan all 3 forward reading frames to identify Open Reading Frames (ORFs)
 */
export function findOpenReadingFrames(dnaSequence: string): OpenReadingFrame[] {
  const orfs: OpenReadingFrame[] = [];
  const frames: (1 | 2 | 3)[] = [1, 2, 3];

  frames.forEach((frame) => {
    const offset = frame - 1;
    let inOrf = false;
    let startIdx = -1;
    let codonList: string[] = [];

    for (let i = offset; i <= dnaSequence.length - 3; i += 3) {
      const codon = dnaSequence.slice(i, i + 3).replace(/T/g, 'U');
      
      if (!inOrf) {
        if (codon === 'AUG') {
          inOrf = true;
          startIdx = i;
          codonList = [codon];
        }
      } else {
        codonList.push(codon);
        if (['UAA', 'UAG', 'UGA'].includes(codon)) {
          // Closed ORF encountered
          const endIdx = i + 2;
          const dnaFrag = dnaSequence.slice(startIdx, endIdx + 1);
          const mrnaFrag = dnaFrag.replace(/T/g, 'U');
          const aaLetters = codonList.map(c => AMINO_ACID_LIBRARY[CODON_TABLE[c]]?.letter || '?').join('');

          orfs.push({
            id: `orf-f${frame}-${startIdx}-${endIdx}`,
            frame,
            startIndex: startIdx,
            endIndex: endIdx,
            lengthBp: endIdx - startIdx + 1,
            lengthCodons: codonList.length,
            startCodon: 'AUG',
            stopCodon: codon,
            dnaSequence: dnaFrag,
            mrnaSequence: mrnaFrag,
            proteinSequence: aaLetters,
            isLongest: false,
          });

          inOrf = false;
          codonList = [];
        }
      }
    }
  });

  // Mark the longest ORF
  if (orfs.length > 0) {
    let longestIdx = 0;
    let maxLen = orfs[0].lengthBp;
    for (let i = 1; i < orfs.length; i++) {
      if (orfs[i].lengthBp > maxLen) {
        maxLen = orfs[i].lengthBp;
        longestIdx = i;
      }
    }
    orfs[longestIdx].isLongest = true;
  }

  return orfs;
}

/**
 * Calculate biochemistry metrics: pI, GRAVY, Net Charge, Extinction Coeff
 */
export function calculateProteinBiochemistry(translations: CodonTranslation[]): ProteinBiochemistry {
  const validResidues = translations
    .filter(t => t.aminoAcid.shortCode !== 'STOP' && t.aminoAcid.shortCode !== 'Inc' && t.aminoAcid.shortCode !== '???')
    .map(t => t.aminoAcid);

  const lengthResidues = validResidues.length;
  if (lengthResidues === 0) {
    return {
      lengthResidues: 0,
      molecularWeightKDa: 0,
      isoelectricPoint: 7.0,
      netChargePH7: 0,
      gravyScore: 0,
      extinctionCoefficient280: 0,
      absorbance01Percent: 0,
      aromaticity: 0,
    };
  }

  // Molecular weight sum minus water of condensation (18.015 g/mol per peptide bond)
  const totalRawWeight = validResidues.reduce((acc, aa) => acc + aa.molecularWeight, 0);
  const condensationWaterLoss = (lengthResidues - 1) * 18.015;
  const netWeightDa = Math.max(0, totalRawWeight - condensationWaterLoss);
  const molecularWeightKDa = Number((netWeightDa / 1000).toFixed(2));

  // Count amino acid frequencies
  const counts: Record<string, number> = {};
  validResidues.forEach(aa => {
    counts[aa.shortCode] = (counts[aa.shortCode] || 0) + 1;
  });

  // GRAVY (Grand Average of Hydropathicity)
  const totalHydropathy = validResidues.reduce((sum, aa) => {
    return sum + (KYTE_DOOLITTLE_HYDROPATHY[aa.shortCode] || 0);
  }, 0);
  const gravyScore = Number((totalHydropathy / lengthResidues).toFixed(3));

  // Extinction Coefficient at 280 nm (Pace et al. 1995: Trp=5500, Tyr=1490, Cys=125)
  const trp = counts['Trp'] || 0;
  const tyr = counts['Tyr'] || 0;
  const cys = counts['Cys'] || 0;
  const extinctionCoefficient280 = trp * 5500 + tyr * 1490 + Math.floor(cys / 2) * 125;
  const absorbance01Percent = netWeightDa > 0 ? Number((extinctionCoefficient280 / netWeightDa).toFixed(3)) : 0;

  // Aromaticity (Phe + Tyr + Trp) / total
  const aromaticCount = (counts['Phe'] || 0) + (counts['Tyr'] || 0) + (counts['Trp'] || 0);
  const aromaticity = Number(((aromaticCount / lengthResidues) * 100).toFixed(1));

  // Compute Net Charge at arbitrary pH using Henderson-Hasselbalch
  const computeChargeAtPH = (pH: number): number => {
    // N-terminus
    let charge = 1 / (1 + Math.pow(10, pH - PKA_VALUES.nTerm));
    // C-terminus
    charge -= 1 / (1 + Math.pow(10, PKA_VALUES.cTerm - pH));
    // Positive side chains: Arg, Lys, His
    charge += (counts['Arg'] || 0) * (1 / (1 + Math.pow(10, pH - PKA_VALUES.Arg)));
    charge += (counts['Lys'] || 0) * (1 / (1 + Math.pow(10, pH - PKA_VALUES.Lys)));
    charge += (counts['His'] || 0) * (1 / (1 + Math.pow(10, pH - PKA_VALUES.His)));
    // Negative side chains: Asp, Glu, Cys, Tyr
    charge -= (counts['Asp'] || 0) * (1 / (1 + Math.pow(10, PKA_VALUES.Asp - pH)));
    charge -= (counts['Glu'] || 0) * (1 / (1 + Math.pow(10, PKA_VALUES.Glu - pH)));
    charge -= (counts['Cys'] || 0) * (1 / (1 + Math.pow(10, PKA_VALUES.Cys - pH)));
    charge -= (counts['Tyr'] || 0) * (1 / (1 + Math.pow(10, PKA_VALUES.Tyr - pH)));
    return charge;
  };

  const netChargePH7 = Number(computeChargeAtPH(7.4).toFixed(2));

  // Binary search for theoretical Isoelectric Point (pI) where net charge = 0
  let lowPH = 2.0;
  let highPH = 13.0;
  let pI = 7.0;

  for (let step = 0; step < 50; step++) {
    const midPH = (lowPH + highPH) / 2;
    const charge = computeChargeAtPH(midPH);
    if (Math.abs(charge) < 0.001) {
      pI = midPH;
      break;
    }
    if (charge > 0) {
      lowPH = midPH;
    } else {
      highPH = midPH;
    }
    pI = midPH;
  }

  return {
    lengthResidues,
    molecularWeightKDa,
    isoelectricPoint: Number(pI.toFixed(2)),
    netChargePH7,
    gravyScore,
    extinctionCoefficient280,
    absorbance01Percent,
    aromaticity,
  };
}

/**
 * Analyzes the biological impact of a single nucleotide point mutation
 */
export function analyzePointMutation(
  originalDNA: string,
  mutationPosition: number,
  mutatedBase: DNABase
): MutationAnalysis {
  if (mutationPosition < 0 || mutationPosition >= originalDNA.length) {
    throw new Error(`Mutation index ${mutationPosition} is out of bounds (0-${originalDNA.length - 1})`);
  }

  const originalBase = originalDNA[mutationPosition] as DNABase;
  
  if (originalBase === mutatedBase) {
    const codonIndex = Math.floor(mutationPosition / 3);
    const codonStart = codonIndex * 3;
    const originalCodon = originalDNA.slice(codonStart, codonStart + 3).replace(/T/g, 'U');
    const aaCode = CODON_TABLE[originalCodon] || 'Unknown';
    const aaInfo = AMINO_ACID_LIBRARY[aaCode] || AMINO_ACID_LIBRARY.Met;
    return {
      hasMutation: false,
      position: mutationPosition,
      originalBase,
      mutatedBase,
      codonIndex,
      positionInCodon: mutationPosition % 3,
      originalCodon,
      mutatedCodon: originalCodon,
      originalAminoAcid: aaInfo,
      mutatedAminoAcid: aaInfo,
      mutationType: 'No-Change',
      description: 'Mutated base is identical to the wild-type base.',
      biochemicalImpact: 'No alteration to primary sequence or translation.',
      severity: 'benign',
    };
  }

  const codonIndex = Math.floor(mutationPosition / 3);
  const positionInCodon = mutationPosition % 3;
  const codonStart = codonIndex * 3;

  const originalDNACodon = originalDNA.slice(codonStart, codonStart + 3);
  const originalMRNACodon = originalDNACodon.replace(/T/g, 'U');

  const mutatedDNAArray = originalDNA.split('');
  mutatedDNAArray[mutationPosition] = mutatedBase;
  const mutatedDNAStrand = mutatedDNAArray.join('');
  const mutatedDNACodon = mutatedDNAStrand.slice(codonStart, codonStart + 3);
  const mutatedMRNACodon = mutatedDNACodon.replace(/T/g, 'U');

  const originalAACode = CODON_TABLE[originalMRNACodon] || 'Unknown';
  const mutatedAACode = CODON_TABLE[mutatedMRNACodon] || 'Unknown';

  const originalAA = AMINO_ACID_LIBRARY[originalAACode] || AMINO_ACID_LIBRARY.Met;
  const mutatedAA = AMINO_ACID_LIBRARY[mutatedAACode] || AMINO_ACID_LIBRARY.Met;

  let mutationType: MutationType = 'Missense';
  let description = '';
  let biochemicalImpact = '';
  let severity: 'benign' | 'moderate' | 'severe' = 'moderate';

  const wasStart = originalMRNACodon === 'AUG';
  const nowStart = mutatedMRNACodon === 'AUG';
  const wasStop = ['UAA', 'UAG', 'UGA'].includes(originalMRNACodon);
  const nowStop = ['UAA', 'UAG', 'UGA'].includes(mutatedMRNACodon);

  if (wasStart && !nowStart) {
    mutationType = 'Start-Loss';
    description = `Start Codon Lost: ${originalMRNACodon} (AUG) → ${mutatedMRNACodon} (${mutatedAA.shortCode}).`;
    biochemicalImpact = 'Ribosome 40S subunit will fail to initiate translation at this locus; peptide synthesis may abort or initiate at a cryptic downstream ATG.';
    severity = 'severe';
  } else if (wasStop && !nowStop) {
    mutationType = 'Stop-Loss';
    description = `Stop Codon Lost (Readthrough): ${originalMRNACodon} (Stop) → ${mutatedMRNACodon} (${mutatedAA.shortCode}).`;
    biochemicalImpact = 'Ribosome fails to terminate at the normal stop locus, translating into the 3\' UTR until an aberrant downstream stop codon is encountered.';
    severity = 'severe';
  } else if (!wasStop && nowStop) {
    mutationType = 'Nonsense';
    description = `Nonsense Mutation: ${originalMRNACodon} (${originalAA.shortCode}) → ${mutatedMRNACodon} (STOP).`;
    biochemicalImpact = `Premature polypeptide truncation at codon ${codonIndex + 1}. Likely triggers Nonsense-Mediated mRNA Decay (NMD) or produces a non-functional truncated protein.`;
    severity = 'severe';
  } else if (originalAACode === mutatedAACode) {
    mutationType = 'Silent';
    description = `Silent (Synonymous) Mutation: ${originalMRNACodon} → ${mutatedMRNACodon} both translate to ${originalAA.name} (${originalAA.shortCode}).`;
    biochemicalImpact = `Primary amino acid chain remains unaltered due to genetic code degeneracy. May subtly modulate translation kinetics or tRNA abundance availability.`;
    severity = 'benign';
  } else {
    mutationType = 'Missense';
    const sameProperty = originalAA.property === mutatedAA.property;
    const sameCharge = originalAA.charge === mutatedAA.charge;

    description = `Missense Mutation: ${originalMRNACodon} (${originalAA.shortCode}) → ${mutatedMRNACodon} (${mutatedAA.shortCode}).`;
    
    if (sameProperty && sameCharge) {
      biochemicalImpact = `Conservative substitution: Replaced ${originalAA.name} with ${mutatedAA.name}. Both share ${originalAA.propertyLabel} properties; tertiary structure may tolerate substitution.`;
      severity = 'moderate';
    } else {
      biochemicalImpact = `Radical non-conservative substitution: Changed ${originalAA.name} (${originalAA.propertyLabel}, ${originalAA.charge}) to ${mutatedAA.name} (${mutatedAA.propertyLabel}, ${mutatedAA.charge}). High probability of perturbing folding or active site kinetics.`;
      severity = 'severe';
    }
  }

  return {
    hasMutation: true,
    position: mutationPosition,
    originalBase,
    mutatedBase,
    codonIndex,
    positionInCodon,
    originalCodon: originalMRNACodon,
    mutatedCodon: mutatedMRNACodon,
    originalAminoAcid: originalAA,
    mutatedAminoAcid: mutatedAA,
    mutationType,
    description,
    biochemicalImpact,
    severity,
  };
}

/**
 * Generate a random 30 bp DNA sequence with valid nucleotides.
 */
export function generateRandomDNA(ensureStartCodon = true): string {
  const bases: DNABase[] = ['A', 'T', 'C', 'G'];
  let sequence = '';
  
  if (ensureStartCodon) {
    sequence += 'ATG';
  }

  const remaining = 30 - sequence.length;
  for (let i = 0; i < remaining; i++) {
    const randomIndex = Math.floor(Math.random() * bases.length);
    sequence += bases[randomIndex];
  }

  return sequence;
}

/**
 * Real-world Gene Presets with authentic FASTA definitions
 */
export const PRESET_GENES: PresetGene[] = [
  {
    id: 'salmonella-inva',
    name: 'Salmonella enterica invA Diagnostic Locus',
    organism: 'Salmonella enterica subsp. enterica',
    description: 'Gold-standard diagnostic PCR biomarker encoding the surface invasion protein InvA essential for epithelial cell entry.',
    sequence: 'ATGGTGTTTATTTTTATCAGTGCCCTATTG',
    clinicalSignificance: 'Universal diagnostic target in clinical pathology and foodborne pathogen surveillance for Salmonella detection.',
    highlightMutationIndex: 14,
    highlightMutationBase: 'C',
    fastaHeader: '>M90846.1:1-30 Salmonella enterica invasion protein (invA) gene, diagnostic amplicon standard',
  },
  {
    id: 'hbb-normal',
    name: 'Human Beta-Globin (HbA Normal)',
    organism: 'Homo sapiens (HBB Exon 1)',
    description: 'N-terminal fragment of human beta-globin gene. Codon 6 (GAG) encodes Glutamic acid.',
    sequence: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCT',
    clinicalSignificance: 'Wild-type adult hemoglobin chain. Position 17 (A) in codon 6 GAG is the site of sickle cell mutation.',
    highlightMutationIndex: 17,
    highlightMutationBase: 'T',
    fastaHeader: '>sp|P68871|HBB_HUMAN Hemoglobin subunit beta OS=Homo sapiens OX=9606 GN=HBB PE=1 SV=2 [Exon 1]',
  },
  {
    id: 'hbb-sickle',
    name: 'Beta-Globin Sickle Mutation (HbS)',
    organism: 'Homo sapiens (Sickle Allele)',
    description: 'Classical missense mutation in codon 6: GAG (Glu) is converted to GTG (Val).',
    sequence: 'ATGGTGCACCTGACTCCTGTGGAGAAGTCT',
    clinicalSignificance: 'Causes pathological hydrophobic polymerization of deoxygenated HbS tetramers, distorting erythrocytes into rigid sickle morphology.',
    highlightMutationIndex: 17,
    highlightMutationBase: 'A',
    fastaHeader: '>VAR_003923|HBB_HUMAN Hemoglobin subunit beta Glu7Val variant (HbS allele)',
  },
  {
    id: 'sars2-rbd',
    name: 'SARS-CoV-2 Spike Receptor Binding Motif',
    organism: 'Severe acute respiratory syndrome coronavirus 2',
    description: 'Critical contact residue fragment in the Spike Receptor Binding Domain (RBD) interacting directly with human ACE2.',
    sequence: 'ATGTACTACTTAGTGCGTTTTGTCACCGGC',
    clinicalSignificance: 'Interacts with human ACE2 peptidase domain; hotspot for immune-evasion mutations in Omicron variants.',
    highlightMutationIndex: 14,
    highlightMutationBase: 'A',
    fastaHeader: '>NC_045512.2:22879-22908 Severe acute respiratory syndrome coronavirus 2 isolate Wuhan-Hu-1, Spike RBD',
  },
  {
    id: 'brca1-nonsense',
    name: 'BRCA1 Gene Truncation Hotspot (Exon 11)',
    organism: 'Homo sapiens (BRCA1 Exon 11)',
    description: 'Hotspot for truncating nonsense mutations predisposing to hereditary breast/ovarian cancer syndrome.',
    sequence: 'ATGGAGTTTGTGTGTGAACGCTACAGGAAA',
    clinicalSignificance: 'Exon 11 mutation (TAC to TAA at codon 8) produces premature termination codon truncating the nuclear localization and BRCT domains.',
    highlightMutationIndex: 23,
    highlightMutationBase: 'A',
    fastaHeader: '>NM_007294.4 Homo sapiens BRCA1 DNA repair associated (BRCA1), transcript variant 1, Exon 11',
  },
  {
    id: 'gfp-chromophore',
    name: 'GFP Chromophore Core (Aequorea victoria)',
    organism: 'Aequorea victoria (GFP)',
    description: 'Central fluorophore sequence (Ser-Tyr-Gly) responsible for bioluminescent green autocatalytic maturation.',
    sequence: 'ATGAGCAAAGGAGAAGAACTTTTCACTGGA',
    clinicalSignificance: 'Autocatalytic cyclization of residues produces the conjugated 4-(p-hydroxybenzylidene)imidazolidin-5-one fluorophore.',
    highlightMutationIndex: 8,
    highlightMutationBase: 'G',
    fastaHeader: '>M62653.1 Aequorea victoria green-fluorescent protein (GFP) mRNA, complete cds',
  },
  {
    id: 'insulin-leader',
    name: 'Human Insulin Signal Peptide',
    organism: 'Homo sapiens (INS Exon 2)',
    description: 'Hydrophobic N-terminal leader sequence directing nascent preproinsulin into the endoplasmic reticulum lumen.',
    sequence: 'ATGGCCCTGTGGATGCGCCTCCTGCCCCTG',
    clinicalSignificance: 'Directs co-translational translocation. Mutations in this peptide cause Mutant INS-gene-induced Diabetes of Youth (MIDY).',
    highlightMutationIndex: 11,
    highlightMutationBase: 'T',
    fastaHeader: '>NM_000207.3 Homo sapiens insulin (INS), transcript variant 1, mRNA [Signal Peptide]',
  },
];
