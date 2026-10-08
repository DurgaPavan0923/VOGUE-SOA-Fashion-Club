export interface PillarItem {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  quote: string;
  image: string;
  keywords: string[];
}

export const PILLARS_DATA: PillarItem[] = [
  {
    id: 'creativity',
    number: '01',
    title: 'Creativity & Haute Couture',
    headline: 'Reimagining garments as sculptural mediums to challenge ordinary aesthetics',
    description:
      'Reimagining garments as sculptural mediums to challenge ordinary aesthetics. Pushing beyond conventional runway norms with avant-garde styling, upcycled zero-waste textiles, and bespoke concept construction.',
    quote: 'Art is not what you see, but what you make others experience on the ramp.',
    image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    keywords: ['Sculptural Couture', 'Avant-Garde', 'Upcycling', 'Bespoke Draping'],
  },
  {
    id: 'confidence',
    number: '02',
    title: 'Confidence & Poise',
    headline: 'Empowering students to own space, command attention, and celebrate self-expression',
    description:
      'Empowering students to own space, command attention, and celebrate self-expression. Cultivating stage command, facial poise, posture discipline, and vocal authority both on the ramp and in life.',
    quote: 'Confidence is the ultimate accessory—it speaks louder than any garment.',
    image: '/images/runway/runway-vol1-dsc-0004.jpg',
    keywords: ['Stage Poise', 'Runway Command', 'Personal Growth', 'Posture Clinic'],
  },
  {
    id: 'identity',
    number: '03',
    title: 'Identity & Storytelling',
    headline: 'Every runway walk is a personal chapter, translating lived experience into sartorial art',
    description:
      'Every runway walk is a personal chapter, translating lived experience into sartorial art. Blending ancient Indian heritage motifs, royal architectural symmetry, and fearless modern silhouettes.',
    quote: 'You do not just wear couture; you embody the lineage and future of design.',
    image: '/images/shoots/shoot-20260403-sd0-8461.jpg',
    keywords: ['Heritage Motifs', 'Odishan Lineage', 'Cinematic Runway', 'Self-Expression'],
  },
  {
    id: 'collaboration',
    number: '04',
    title: 'Unity & Collaboration',
    headline: 'Seamless synergy uniting models, textile designers, stylists, and media storytellers',
    description:
      'Seamless synergy uniting models, textile designers, stylists, and media storytellers into a championship-winning creative powerhouse across national collegiate circuits.',
    quote: 'Championship gold is not forged by one person—it is the harmony of an entire movement.',
    image: '/images/workshops/workshop-dsc02769.jpg',
    keywords: ['Inter-Disciplinary', 'Backstage Sync', 'Production Squad', 'National Circuit'],
  },
];

