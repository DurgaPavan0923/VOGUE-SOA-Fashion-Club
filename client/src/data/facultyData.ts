export interface CampusFacultyItem {
  id: string;
  campusCode: string;
  label: string;
  subtitle: string;
  roleBadge: string;
  coordinator: {
    name: string;
    designation: string;
    image: string;
    description: string;
    credentials: string[];
    department: string;
  };
}

export interface FounderItem {
  name: string;
  role: string;
  image: string;
  brief: string;
  instagram?: string;
}

export const CHIEF_FACULTY_COORDINATOR = {
  name: 'Dr. Mitali Madhusmita Nayak',
  title: 'Chief Faculty Coordinator',
  department: "ITER — Faculty of Engineering & Technology, Siksha 'O' Anusandhan",
  image: '/images/faculty/dr-mitali-nayak.jpg',
  message:
    "At VOGUE, fashion transcends mere glamour — it is an intellectual discipline of self-discovery, cultural preservation, and fearless individuality. Our students bridge the rigor of academic excellence with the sublime artistry of the runway. Watching them transform stage anxiety into commanding presence and creative vision into couture triumphs is an immense honor. VOGUE is not just a club; it is a movement empowering students to express who they are with unwavering confidence.",
  credentials: [
    'Distinguished Faculty Mentor & Cultural Patron',
    'Advisor for Inter-University Cultural Competitions',
    'Advocate for Student Creative Expression & Performing Arts',
    'ITER — Faculty of Engineering & Technology',
  ],
};

export const CAMPUS_FACULTY_LIST: CampusFacultyItem[] = [
  {
    id: 'campus-01',
    campusCode: 'Campus 01',
    label: 'ITER',
    subtitle: 'Mentor, VOGUE Fashion Club',
    roleBadge: 'Campus 01 · ITER',
    coordinator: {
      name: 'Dr. Mitali Madhusmita Nayak',
      designation: 'Faculty Coordinator, Campus 01 (ITER)',
      department: 'ITER — Faculty of Engineering & Technology',
      image: '/images/faculty/dr-mitali-nayak.jpg',
      description:
        'At VOGUE, fashion transcends mere glamour — it is an intellectual discipline of self-discovery, cultural preservation, and fearless individuality. Our students bridge the rigor of academic excellence with the sublime artistry of the runway.',
      credentials: [
        'Distinguished Faculty Mentor & Cultural Patron',
        'Advisor for Inter-University Cultural Competitions',
        'Advocate for Student Creative Expression & Performing Arts',
        'ITER — Faculty of Engineering & Technology',
      ],
    },
  },
  {
    id: 'campus-02',
    campusCode: 'Campus 02',
    label: 'SNC',
    subtitle: 'Mentor, VOGUE Fashion Club',
    roleBadge: 'Campus 02 · SNC',
    coordinator: {
      name: 'Ms. Karishma Sahoo',
      designation: 'Faculty Coordinator, Campus 02 (SNC)',
      department: 'School of Nursing & Sciences',
      image: '/images/faculty/ms-karishma-sahoo.jpg',
      description:
        'Inspiring poise, confidence, and creative leadership across our collegiate community while fostering discipline, empathy, and artistic excellence on every runway.',
      credentials: [
        'Faculty Mentor, SNC Cultural Initiatives',
        'Student Development & Stage Poise Advisor',
        'Patron of Youth Fashion Leadership',
        'School of Nursing & Sciences',
      ],
    },
  },
  {
    id: 'campus-03',
    campusCode: 'Campus 03',
    label: 'IDS',
    subtitle: 'Mentor, VOGUE Fashion Club',
    roleBadge: 'Campus 03 · IDS',
    coordinator: {
      name: 'Dr. Gatha Mohanty',
      designation: 'Faculty Coordinator, Campus 03 (IDS)',
      department: 'Institute of Dental Sciences',
      image: '/images/faculty/dr-gatha-mohanty.jpg',
      description:
        'Nurturing creative excellence and artistic innovation, encouraging students to express their true character through conceptual fashion, poise, and teamwork.',
      credentials: [
        'Faculty Mentor, IDS Cultural Society',
        'Creative Vision & Stagecraft Advisor',
        'Advocate for Inter-Disciplinary Arts',
        'Institute of Dental Sciences',
      ],
    },
  },
  {
    id: 'campus-04',
    campusCode: 'Campus 04',
    label: 'SNIL',
    subtitle: 'Mentor, VOGUE Fashion Club',
    roleBadge: 'Campus 04 · SNIL',
    coordinator: {
      name: 'Mr. Akash Trikha',
      designation: 'Faculty Coordinator, Campus 04 (SNIL)',
      department: 'SOA National Institute of Law',
      image: '/images/faculty/mr-akash-trikha.jpg',
      description:
        'Empowering students with commanding stage presence, strategic teamwork, and fearless dedication to creative craft across all regional and national circuits.',
      credentials: [
        'Faculty Mentor, SNIL Student Affairs',
        'Leadership & Team Dynamics Mentor',
        'Patron of Runway Discipline & Ethics',
        'SOA National Institute of Law',
      ],
    },
  },
  {
    id: 'campus-05',
    campusCode: 'Campus 05',
    label: 'IAS',
    subtitle: 'Mentor, VOGUE Fashion Club',
    roleBadge: 'IAS',
    coordinator: {
      name: 'Dr. Shilpa Bahubalendra',
      designation: 'Faculty Coordinator, IAS',
      department: 'Institute of Agricultural Sciences',
      image: '/images/faculty/dr-shilpa-bahubalendra.jpg',
      description:
        'Fostering organic expression, aesthetic harmony, and artistic confidence across collegiate platforms, celebrating culture and sustainable runway design.',
      credentials: [
        'Faculty Mentor, IAS Cultural Board',
        'Cultural Ambassador & Student Mentor',
        'Advocate for Sustainable Fashion',
        'Institute of Agricultural Sciences',
      ],
    },
  },
];

export const FOUNDERS_DATA: FounderItem[] = [
  {
    name: 'Ashutosh Samal',
    role: 'Co-Founder & Creative Visionary',
    image: '/images/founders/asutosh-samal.jpg',
    brief:
      'A visionary leader who helped establish VOGUE SOA, driving its creative direction and setting the foundation for avant-garde collegiate fashion.',
    instagram: 'https://instagram.com/VOGUE_SOA_FASHION_CLUB',
  },
  {
    name: 'Miss Abhipsa',
    role: 'Co-Founder & Artistic Director',
    image: '/images/founders/miss-abhipsa.jpg',
    brief:
      'Co-founder instrumental in establishing VOGUE brand identity, model mentoring, haute couture curation, and thematic stage performances.',
    instagram: 'https://instagram.com/VOGUE_SOA_FASHION_CLUB',
  },
  {
    name: 'Umasankar Biswal',
    role: 'Co-Founder & Executive Director',
    image: '/images/founders/umasankar-biswal.png',
    brief:
      'An executive force behind VOGUE SOA, dedicated to fostering a strong community, flawless execution, and empowering students to shine on the runway.',
    instagram: 'https://instagram.com/VOGUE_SOA_FASHION_CLUB',
  },
];

