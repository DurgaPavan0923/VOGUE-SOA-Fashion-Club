export interface ThemeData {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  narrative: string;
  palette: string[];
  paletteNames: string[];
  image: string;
  motif: string;
  badge: string;
  bgGlow: string;
  conceptSpecs: string[];
}

export const THEMES_DATA: ThemeData[] = [
  {
    id: 'anantara',
    slug: 'anantara',
    number: '01',
    title: 'Anantara',
    tagline: 'Timeless Elegance & Infinite Heritage',
    narrative:
      'A celebration of primordial Indian textile artistry merged with fluid royal draping. Anantara represents the eternal continuum of couture—where ancient temple architecture and gold zari weaves meet contemporary runway poise.',
    palette: ['#561C47', '#B89B5E', '#EADBC4', '#171415'],
    paletteNames: ['Imperial Plum', 'Antique Gold', 'Champagne', 'Near-Black'],
    image: '/images/shoots/shoot-20260403-sd0-8461.jpg',
    motif: 'Mandala & Romanesque Royal Arch',
    badge: 'Spectra Gold Champion Theme',
    bgGlow: 'from-[#561C47]/40 via-vogue-dark to-vogue-black',
    conceptSpecs: [
      'Fabric: Pure Raw Silk, Tissue Organza, and Gold Zari Weaves',
      'Draping: Imperial Royal Pallu with Cascading Symmetrical Trails',
      'Inspiration: Odishan Temple Architecture & Vedic Geometry',
      'Accents: Antique Kundan Embroidery & Matte Brass Chokers',
    ],
  },
  {
    id: 'evolution',
    slug: 'evolution-over-royal-fashion',
    number: '02',
    title: 'Evolution Over Royal Fashion',
    tagline: 'Regal Metamorphosis & Modern Lineage',
    narrative:
      'Deconstructing vintage imperial silhouettes into sharp, structured tailoring. A dialogue between the opulent past and sustainable, minimalist future of high fashion.',
    palette: ['#5A4738', '#B89B5E', '#0C0A0B', '#F3E8D6'],
    paletteNames: ['Espresso', 'Antique Gold', 'Slate Noir', 'Cream'],
    image: '/images/shoots/shoot-20260403-sd0-8497.jpg',
    motif: 'Geometric Linear Structure',
    badge: 'State Finalist Lookbook',
    bgGlow: 'from-[#5A4738]/40 via-vogue-dark to-vogue-black',
    conceptSpecs: [
      'Fabric: Structured Matka Wool, Recycled Cotton, and Slate Linen',
      'Draping: Razor-Sharp Asymmetrical Lapels and Minimalist Trench Cuts',
      'Inspiration: Bauhaus Architecture & Royal Metamorphosis',
      'Accents: Monolithic Titanium Cufflinks & Raw Edge Piping',
    ],
  },
  {
    id: 'raj-ghrana',
    slug: 'raj-ghrana',
    number: '03',
    title: 'Raj Ghrana',
    tagline: 'Imperial Dynasty & Regal Grandeur',
    narrative:
      'Drawing inspiration from the opulent court attires of Indian royalty. Handwoven brocades, zardozi work, and majestic layered capes define this tribute to dynastic elegance.',
    palette: ['#4E1C1F', '#C49746', '#2A2421', '#E8DEC8'],
    paletteNames: ['Royal Crimson', 'Mughal Gold', 'Deep Charcoal', 'Pearl Ivory'],
    image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    motif: 'Peacock & Paisley Filigree',
    badge: 'National Circuit Winner',
    bgGlow: 'from-[#4E1C1F]/40 via-vogue-dark to-vogue-black',
    conceptSpecs: [
      'Fabric: Heavy Banarasi Brocade, Velvet Trims, and Metallic Organza',
      'Draping: Layered Angrakha Overlays with Sculpted Floor-Length Capes',
      'Inspiration: 17th Century Royal Courts & Mughal Miniature Art',
      'Accents: Hand-Beaded Zardozi Borders & Antique Gold Brooches',
    ],
  },
  {
    id: 'indo-western',
    slug: 'indo-western-fusion',
    number: '04',
    title: 'Indo-Western Fusion',
    tagline: 'Global Cadence & Cultural Synthesis',
    narrative:
      'Where eastern drapery meets western streetwear silhouettes. Corsets fused with dhoti pants, blazers draped with dupatta capes, and metallic accents defining tomorrow.',
    palette: ['#1C334E', '#B89B5E', '#14171C', '#C8D6E8'],
    paletteNames: ['Midnight Indigo', 'Warm Ochre', 'Onyx', 'Ice Blue'],
    image: '/images/shoots/shoot-20260403-sd0-8531.jpg',
    motif: 'Kinetic Chevron & Fractal Tessellation',
    badge: 'Avant-Garde Exhibition',
    bgGlow: 'from-[#1C334E]/40 via-vogue-dark to-vogue-black',
    conceptSpecs: [
      'Fabric: Technical Neoprene, Handloom Ikat, and Metallic Jacquard',
      'Draping: Structured Tailored Blazers with Fluid Pre-Pleated Cowls',
      'Inspiration: Cyberpunk Neo-Tokyo & Traditional Handloom Heritage',
      'Accents: Laser-Cut Leather Harnesses & Brushed Brass Hardware',
    ],
  },
];
