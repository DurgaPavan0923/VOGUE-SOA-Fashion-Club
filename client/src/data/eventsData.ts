export interface EventItem {
  id: string;
  title: string;
  date: string;
  formattedDate: string;
  time?: string;
  location: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  category: 'AUDITION' | 'WORKSHOP' | 'COMPETITION' | 'RUNWAY_SHOW';
  categoryLabel?: string;
  description: string;
  image: string;
  registrationUrl?: string;
  highlights: string[];
  audienceTag?: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-auditions-2026',
    title: 'VOGUE Annual Auditions 2026: The Runway Calling',
    date: '2026-10-18',
    formattedDate: 'October 18, 2026',
    time: '4:30 PM IST',
    location: 'SOA Student Activity Centre & Main Auditorium',
    status: 'UPCOMING',
    category: 'AUDITION',
    categoryLabel: 'Auditions',
    description:
      'Calling aspiring models, choreographers, fashion stylists, costume designers, and media creators. Open to all SOA University departments.',
    image: '/images/shoots/shoot-20260403-sd0-8440.jpg',
    registrationUrl: '/apply',
    audienceTag: 'Open to SOA',
    highlights: [
      'Open to all SOA University campuses',
      'Ramp walk & posture evaluations',
      'Styling, photography & backstage management slots',
    ],
  },
  {
    id: 'evt-spectra-gala-2026',
    title: 'Spectra Gala Showcase: Nocturne & Gold Couture',
    date: '2026-11-05',
    formattedDate: 'November 05, 2026',
    time: '6:00 PM IST',
    location: 'Main University Grounds Amphitheatre',
    status: 'UPCOMING',
    category: 'RUNWAY_SHOW',
    categoryLabel: 'Runway Gala',
    description:
      'Our premier 2026 collection presentation featuring 28 custom tailored ensembles, live orchestral score, and guest industry jury.',
    image: '/images/runway/runway-vol1-dsc-0004.jpg',
    registrationUrl: '/apply',
    audienceTag: 'Open to SOA',
    highlights: [
      '28 Bespoke handcrafted couture ensembles',
      'Live orchestral score & lighting geometry',
      'Industry designer jury presentation',
    ],
  },
  {
    id: 'evt-grooming-bootcamp',
    title: 'Couture Grooming & Runway Masterclass',
    date: '2026-11-20',
    formattedDate: 'November 20, 2026',
    time: '2:00 PM IST',
    location: 'Studio Room 402, SOA Campus 1',
    status: 'UPCOMING',
    category: 'WORKSHOP',
    categoryLabel: 'Masterclass',
    description:
      'Comprehensive intensive on runway posture, tempo control, facial expression mechanics, outfit draping, and stage poise.',
    image: '/images/workshops/workshop-dsc02769.jpg',
    registrationUrl: '/apply',
    audienceTag: 'Club Members Only',
    highlights: [
      'Advanced pivot & sync walk techniques',
      'High-fashion photo-movement drills',
      'Stage presence & eye-line coaching',
    ],
  },
  {
    id: 'evt-bgu-spectra-2026-win',
    title: 'BGU Spectra National Runway Championship 2026',
    date: '2026-03-15',
    formattedDate: 'March 15, 2026',
    location: 'Birla Global University Main Stage',
    status: 'COMPLETED',
    category: 'COMPETITION',
    categoryLabel: 'National 1st Prize',
    description:
      'VOGUE clinched 1st Place at the prestigious BGU Spectra National Fashion Fest against 18 inter-university teams.',
    image: '/images/achievements/bgu-spectra-2026.jpg',
    highlights: [
      '1st Place Trophy Winner (Haute Couture Category)',
      'Best Choreography Award',
      'Best Male & Female Model Accolades',
    ],
  },
];
