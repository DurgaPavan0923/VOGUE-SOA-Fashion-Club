export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  badge: string;
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-runway',
    number: '01',
    title: 'Runway Shows & Ramp Walks',
    category: 'CHAMPIONSHIP CIRCUIT',
    tagline: 'Choreographed Stage Geometry & Thematic Cadence',
    description:
      'High-impact runway showcases across national cultural festivals. Synchronized model choreography, lighting design, and unified couture aesthetics designed to dominate podiums.',
    highlights: ['Synchronized Ramp Walks', 'National Fest Competitions', 'State Championship Stages'],
    image: '/images/runway/runway-vol1-dsc-0004.jpg',
    badge: 'National Circuit',
  },
  {
    id: 'exp-styling',
    number: '02',
    title: 'Theme Styling Competitions',
    category: 'CREATIVE DESIGN',
    tagline: 'Retro, Vintage 90s & Avant-Garde Challenges',
    description:
      'High-intensity intra and inter-university styling contests challenging members to create bold looks centered around Retro aesthetics, 90s vintage glam, and futuristic fusion.',
    highlights: ['Retro & Vintage 90s Styling', 'Rapid Ideation Contests', 'Material Fusion Labs'],
    image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    badge: 'Style Innovation',
  },
  {
    id: 'exp-workshops',
    number: '03',
    title: 'Skill & Grooming Masterclasses',
    category: 'INDUSTRY MENTORSHIP',
    tagline: 'Runway Poise, HD Makeup & Fashion Sketching',
    description:
      'Hands-on interactive training clinics in runway walk posture, personal styling, HD editorial makeup fundamentals, and fashion illustration led by senior coordinators and guest experts.',
    highlights: ['Posture & Stride Clinics', 'HD Runway Makeup Workshops', 'Couture Fashion Illustration'],
    image: '/images/workshops/workshop-dsc02769.jpg',
    badge: 'Skill Development',
  },
  {
    id: 'exp-photoshoots',
    number: '04',
    title: 'Photoshoots & Lookbook Magazines',
    category: 'EDITORIAL MEDIA',
    tagline: 'Studio Portfolios & Digital Editorial Spreads',
    description:
      'High-production studio and outdoor fashion photography sessions producing magazine-grade lookbooks, high-fashion portfolio shoots, and digital campaigns.',
    highlights: ['Magazine Lookbook Production', 'High-Fashion Studio Shoots', 'Creative Concept Photography'],
    image: '/images/shoots/shoot-20260403-sd0-8461.jpg',
    badge: 'Digital Editorial',
  },
  {
    id: 'exp-cross-campus',
    number: '05',
    title: 'Cross-Campus Collaborative Showcases',
    category: 'SOA LEADERSHIP',
    tagline: 'Uniting Engineering, Law, Nursing & Dental Campuses',
    description:
      'Grand unified productions bringing together talent from ITER, SNIL, SNC, and IDS campuses to create university-wide runway galas and inter-disciplinary fashion events.',
    highlights: ['Multi-Campus Unification', 'University-Wide Fest Galas', 'Cross-Disciplinary Teams'],
    image: '/images/workshops/workshop-dsc02772.jpg',
    badge: 'SOA Unity',
  },
  {
    id: 'exp-fests',
    number: '06',
    title: 'National College Fests & Competitions',
    category: 'COMPETITIVE ARENA',
    tagline: 'BGU Spectra, AIIMS Chiasma, ASBM, RCM & KIIT IDA',
    description:
      'Direct competitive participation at eastern India’s top university fests, bringing home consecutive 1st-place trophies and establishing SOA’s fashion supremacy.',
    highlights: ['10+ Verified Championship Titles', 'BGU Spectra Winners 2026', 'National Stage Authority'],
    image: '/images/achievements/bgu-spectra-2026.jpg',
    badge: '10+ Championships',
  },
  {
    id: 'exp-walks',
    number: '07',
    title: 'Theme-Based Fashion Walks',
    category: 'CONCEPT RUNWAY',
    tagline: 'Sustainable Couture, Traditional Handlooms & Indo-Western',
    description:
      'Curated concept walks focused on raising social awareness, celebrating Odishan handloom heritage, and pioneering sustainable fashion zero-waste draping methods.',
    highlights: ['Odishan Handloom Revivals', 'Sustainable Upcycling Walks', 'Conceptual Social Themes'],
    image: '/images/runway/runway-vol2-dsc-0083.jpg',
    badge: 'Heritage & Ecology',
  },
  {
    id: 'exp-portfolio',
    number: '08',
    title: 'Model Portfolio & Industry Placement',
    category: 'CAREER ACCELERATION',
    tagline: 'Professional Headshots, Comp Cards & Agency Connections',
    description:
      'Comprehensive grooming support for aspiring runway models and designers, including verified digital comp cards, networking avenues, and commercial portfolio building.',
    highlights: ['Verified Comp Cards', 'Agency Casting Exposure', 'Professional Direction'],
    image: '/images/shoots/shoot-20260403-sd0-8497.jpg',
    badge: 'Career Launchpad',
  },
];
