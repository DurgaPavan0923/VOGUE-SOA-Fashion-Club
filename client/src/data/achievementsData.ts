export interface AchievementItem {
  id: string;
  year: number;
  event: string;
  title: string;
  position: string;
  institution: string;
  category: 'NATIONAL_RUNWAY' | 'INTER_COLLEGIATE' | 'RUNWAY_FEST' | 'PAGEANT' | 'FEST_CHAMPIONSHIP';
  description: string;
  highlights: string[];
  isNationalChampion?: boolean;
  isHighlight?: boolean;
  image?: string;
  proofNote?: string;
}

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-spectra-2026',
    year: 2026,
    event: 'Spectra Runway 2026',
    title: 'Spectra Runway Championship',
    position: 'Champion (1st Place)',
    institution: 'Birla Global University (BGU)',
    category: 'NATIONAL_RUNWAY',
    description:
      'Grand championship victory showcasing the Anantara collection. Praised by the national jury for synchronized choreography, imperial royal draping, and stage poise.',
    highlights: [
      'Gold Trophy in National Runway Competition',
      'Showcase theme: Anantara Collection',
      'Flawless choreography sync and unified theme aesthetics',
    ],
    isNationalChampion: true,
    isHighlight: true,
    image: '/images/achievements/bgu-spectra-2026.jpg',
    proofNote: 'Official Certificate & Trophy Archive - BGU Spectra 2026',
  },
  {
    id: 'ach-asbm-2026',
    year: 2026,
    event: 'IGNITE 2026',
    title: 'ASBM Runway Fest',
    position: '1st Runners Up',
    institution: 'ASBM University',
    category: 'RUNWAY_FEST',
    description:
      'Premier podium finish presenting the Indo-Western contemporary collection against top collegiate teams across the region.',
    highlights: [
      'Silver Podium Trophy',
      'Avant-garde Indo-Western styling with architectural draping',
      'High acclaim for model lineup synchrony',
    ],
    isHighlight: true,
    image: '/images/achievements/asbm-2026.png',
    proofNote: 'ASBM IGNITE 2026 Official Festival Records',
  },
  {
    id: 'ach-ida-2026',
    year: 2026,
    event: 'IDA Runway 2026',
    title: 'IDA National Runway',
    position: 'Winners (1st Place)',
    institution: 'KIIT University',
    category: 'NATIONAL_RUNWAY',
    description:
      'Championship triumph showcasing thematic versatility, synchronized stage formations, and handcrafted heritage brocades.',
    highlights: [
      '1st Place Gold Trophy',
      'Outstanding stage choreography score',
      'Unified thematic styling',
    ],
    isNationalChampion: true,
    isHighlight: true,
    image: '/images/achievements/ida-2026.jpg',
    proofNote: 'KIIT IDA Runway 2026 Records',
  },
  {
    id: 'ach-genesis-2026',
    year: 2026,
    event: 'Genesis Fest 2026',
    title: 'ChakryaVyuh Genesis Runway',
    position: 'Champion (1st Place)',
    institution: 'National Cultural Arena',
    category: 'NATIONAL_RUNWAY',
    description:
      'Signature high-fashion runway shows presenting conceptual themes with disciplined formations, musical sync, and avant-garde silhouettes under the spotlights.',
    highlights: [
      '1st Place Grand Winner Trophy',
      'Signature group stride formations',
      'High-fashion lighting sync',
    ],
    isNationalChampion: true,
    isHighlight: true,
    image: '/images/achievements/genesis-2026.jpg',
    proofNote: 'Genesis 2026 Competition Registry',
  },
  {
    id: 'ach-rcm-2026',
    year: 2026,
    event: 'Brahmāstra 2026',
    title: 'Brahmāstra Fashion Walk',
    position: 'Runners Up',
    institution: 'Regional College of Management (RCM)',
    category: 'INTER_COLLEGIATE',
    description:
      'Stellar podium achievement recognized for high-fashion runway discipline and bespoke costume design.',
    highlights: [
      'Runners Up Trophy in Collegiate Ramp Show',
      'Bespoke royal metamorphosis wardrobe',
    ],
    isHighlight: false,
    image: '/images/achievements/rcm-2026.jpg',
    proofNote: 'Brahmāstra 2026 Competition Ledger - RCM',
  },
  {
    id: 'ach-aiims-2025',
    year: 2025,
    event: 'Chiasma 2025',
    title: 'Chiasma Runway Championship',
    position: '1st Runners Up',
    institution: 'AIIMS Bhubaneswar',
    category: 'FEST_CHAMPIONSHIP',
    description:
      'Outstanding podium showcase of the Raj Ghrana imperial brocade collection, commended by national fashion designers.',
    highlights: [
      '1st Runners Up Silver Medal',
      'Imperial Raj Ghrana motif showcase',
    ],
    isHighlight: true,
    image: '/images/achievements/aiims-bbsr.png',
    proofNote: 'AIIMS Chiasma 2025 Certificate of Merit',
  },
  {
    id: 'ach-spectra-2025',
    year: 2025,
    event: 'Spectra Runway 2025',
    title: 'Spectra Runway Championship',
    position: 'Champion (Winner)',
    institution: 'Birla Global University (BGU)',
    category: 'NATIONAL_RUNWAY',
    description:
      'Historic championship victory that cemented VOGUE SOA as a top collegiate runway powerhouse in eastern India.',
    highlights: [
      'Grand Champion Title',
      'Statewide acclaim for costume craftsmanship',
    ],
    isNationalChampion: true,
    isHighlight: true,
    image: '/images/achievements/bgu-2025.png',
    proofNote: 'Spectra 2025 Trophy & Award Register',
  },
  {
    id: 'ach-national-trophy',
    year: 2024,
    event: 'National Fashion Trophy Series',
    title: 'National Runway Merit Trophy',
    position: 'State #1 Ranked Fashion Society',
    institution: 'All Odisha Inter-University Circuit',
    category: 'FEST_CHAMPIONSHIP',
    description:
      'Conferred the prestigious State #1 Collegiate Fashion Society citation for consistent podium triumphs across multiple university circuits.',
    highlights: [
      'Over 10 Verified National Championship Titles',
      'Excellence in Stage Choreography & Costume Design',
    ],
    isNationalChampion: true,
    isHighlight: true,
    image: '/images/achievements/achievement-trophy.png',
    proofNote: 'State Championship Records 2024-2026',
  },
];
