/**
 * Centralized Real Photography System for VOGUE — SOA Fashion Club.
 * 100% Authentic Club Assets from Official Runway, Editorial Shoots, Workshops & Championships.
 * Zero Fake/Stock Images.
 */

export interface ClubImageMeta {
  id: string;
  url: string;
  title: string;
  category: string;
  year?: string;
  aspectRatio?: string;
}

export const CLUB_IMAGES = {
  // Brand Logos & Emblems
  logos: {
    vogue: '/images/vogue-logo.png',
    vogueCrest: '/images/vogue-crest.jpg',
    soa: '/images/soa-logo.png',
    soaUniversity: '/images/soa-university-logo.png',
    gdg: '/images/gdg-logo.png',
    gdgocIter: '/images/gdgoc-iter-logo.png',
  },

  // Primary Runway & Hero Photography
  hero: [
    {
      id: 'hero-1',
      url: '/images/shoots/shoot-20260403-sd0-8440.jpg',
      title: 'Avant-Garde Architectural Silhouette',
      category: 'Haute Couture',
      year: '2026',
    },
    {
      id: 'hero-2',
      url: '/images/runway/runway-vol1-dsc-0004.jpg',
      title: 'Spectra Gold Grand Runway Finale',
      category: 'Runway Showcase',
      year: '2026',
    },
    {
      id: 'hero-3',
      url: '/images/shoots/shoot-20260403-sd0-8461.jpg',
      title: 'Anantara Imperial Brocade & Fluid Drapes',
      category: 'Heritage Couture',
      year: '2026',
    },
    {
      id: 'hero-4',
      url: '/images/runway/runway-vol2-dsc-0083.jpg',
      title: 'National Stage Precision & Poise',
      category: 'Championship Circuit',
      year: '2026',
    },
    {
      id: 'hero-5',
      url: '/images/shoots/shoot-20260403-sd0-8497.jpg',
      title: 'Evolution Noir Contemporary Cut',
      category: 'Editorial Studio',
      year: '2026',
    },
    {
      id: 'hero-6',
      url: '/images/workshops/workshop-dsc02769.jpg',
      title: 'Masterclass Stage Cadence & Grooming',
      category: 'Virtual Showreel',
      year: '2026',
    },
  ],

  // Signature Couture Collections
  collections: {
    anantara: {
      cover: '/images/shoots/shoot-20260403-sd0-8461.jpg',
      gallery: [
        '/images/shoots/shoot-20260403-sd0-8461.jpg',
        '/images/shoots/shoot-20260403-sd0-8462.jpg',
        '/images/shoots/shoot-20260403-sd0-8463.jpg',
        '/images/runway/runway-vol1-dsc-0014.jpg',
        '/images/runway/runway-vol1-dsc-0018.jpg',
      ],
    },
    evolution: {
      cover: '/images/shoots/shoot-20260403-sd0-8497.jpg',
      gallery: [
        '/images/shoots/shoot-20260403-sd0-8497.jpg',
        '/images/shoots/shoot-20260403-sd0-8500.jpg',
        '/images/shoots/shoot-20260403-sd0-8508.jpg',
        '/images/runway/runway-vol2-dsc-0088.jpg',
        '/images/runway/runway-vol2-dsc-0090.jpg',
      ],
    },
    rajGhrana: {
      cover: '/images/shoots/shoot-20260403-sd0-8440.jpg',
      gallery: [
        '/images/shoots/shoot-20260403-sd0-8440.jpg',
        '/images/shoots/shoot-20260403-sd0-8441.jpg',
        '/images/shoots/shoot-20260403-sd0-8446.jpg',
        '/images/runway/runway-vol1-dsc-0024.jpg',
        '/images/runway/runway-vol1-dsc-0029.jpg',
      ],
    },
    indoWestern: {
      cover: '/images/shoots/shoot-20260403-sd0-8531.jpg',
      gallery: [
        '/images/shoots/shoot-20260403-sd0-8531.jpg',
        '/images/shoots/shoot-20260403-sd0-8532.jpg',
        '/images/shoots/shoot-20260403-sd0-8533.jpg',
        '/images/runway/runway-vol2-dsc-0098.jpg',
        '/images/runway/runway-vol2-dsc-0102.jpg',
      ],
    },
  },

  // Verified National Championship Trophies
  achievements: {
    spectra2026: '/images/achievements/bgu-spectra-2026.jpg',
    asbm2026: '/images/achievements/asbm-2026.png',
    ida2026: '/images/achievements/ida-2026.jpg',
    genesis2026: '/images/achievements/genesis-2026.jpg',
    rcm2026: '/images/achievements/rcm-2026.jpg',
    aiims2025: '/images/achievements/aiims-bbsr.png',
    bgu2025: '/images/achievements/bgu-2025.png',
    championshipTrophy: '/images/achievements/achievement-trophy.png',
  },

  // Founders
  founders: {
    asutosh: '/images/founders/asutosh-samal.jpg',
    abhipsa: '/images/founders/miss-abhipsa.jpg',
    umasankar: '/images/founders/umasankar-biswal.png',
  },

  // Faculty Coordinators
  faculty: {
    drMitaliNayak: '/images/faculty/dr-mitali-nayak.jpg',
    drGathaMohanty: '/images/faculty/dr-gatha-mohanty.jpg',
    drShilpaBahubalendra: '/images/faculty/dr-shilpa-bahubalendra.jpg',
    mrAkashTrikha: '/images/faculty/mr-akash-trikha.jpg',
    msKarishmaSahoo: '/images/faculty/ms-karishma-sahoo.jpg',
  },

  // Student Post Holders & Campus Cores
  members: {
    coordinators: {
      asmiRoutray: '/images/members/coordinator/asmi-routray.jpg',
      praticheePanigrahi: '/images/members/coordinator/pratichee-panigrahi.jpg',
      ritikaDas: '/images/members/coordinator/ritika-das.jpg',
      samirRout: '/images/members/coordinator/samir-rout.jpg',
    },
    iterCore: {
      anuragSwain: '/images/members/iter_core/anurag-swain.jpg',
      biswajitSahoo: '/images/members/iter_core/biswajit-sahoo.jpg',
      harshSinha: '/images/members/iter_core/harsh-sinha.jpg',
      sanketPanigrahi: '/images/members/iter_core/sanket-panigrahi.jpg',
      shreyaseeDas: '/images/members/iter_core/shreyasee-das.jpg',
      yashashreeJena: '/images/members/iter_core/yashashree-jena.jpg',
    },
    idsCore: {
      debatatiPahari: '/images/members/ids_core_campus_3/debatati-pahari.png',
      gayatriPanda: '/images/members/ids_core_campus_3/gayatri-panda.jpg',
      rituparnaSwain: '/images/members/ids_core_campus_3/rituparna-swain.png',
      saiPrasad: '/images/members/ids_core_campus_3/sai-prasad.png',
    },
    snc2: {
      anilDalabehera: '/images/members/snc_2/anil-dalabehera.png',
      bedaPrakash: '/images/members/snc_2/beda-prakash.png',
      meghnaParija: '/images/members/snc_2/meghna-parija.png',
      prachiPriyadarshini: '/images/members/snc_2/prachi-priyadarshini.png',
    },
    snilCampus4: {
      akyanshaMohanty: '/images/members/snil_campus_4/akyansha-mohanty.png',
      ayushMohapatra: '/images/members/snil_campus_4/ayush-mohapatra.png',
      prayasRath: '/images/members/snil_campus_4/prayas-rath.png',
      rudraChoudhary: '/images/members/snil_campus_4/rudra-choudhary.png',
      sutanviSwain: '/images/members/snil_campus_4/sutanvi-swain.jpg',
    },
  },
};
