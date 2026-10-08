import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('✨ Starting VOGUE - SOA Fashion Club Database Seed...');

  // 1. Seed Admin User
  const adminUsername = process.env.ADMIN_INITIAL_USERNAME || 'vogue_admin';
  const adminEmail = process.env.ADMIN_INITIAL_EMAIL || 'vogue@soa.ac.in';
  const adminRawPassword = process.env.ADMIN_INITIAL_PASSWORD || 'VogueSOA@2026!Master';
  const passwordHash = await bcrypt.hash(adminRawPassword, 10);

  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: {
      passwordHash,
      email: adminEmail,
    },
    create: {
      username: adminUsername,
      email: adminEmail,
      passwordHash,
      role: 'SUPERADMIN',
    },
  });
  console.log(`✅ Admin user configured: ${adminUsername}`);

  // 2. Seed Signature Themes with High-Res Fashion Editorial Imagery
  const themesData = [
    {
      slug: 'anantara',
      name: 'Anantara',
      tagline: 'Timeless Elegance & Infinite Heritage',
      narrative: 'A journey through timeless aesthetics, where ancient textile traditions meet fluid modern tailoring. Anantara embodies the boundless cycle of fashion as cultural identity.',
      paletteTokens: JSON.stringify(['#561C47', '#B89B5E', '#EADBC4', '#171415']),
      coverImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      displayOrder: 1,
    },
    {
      slug: 'evolution-over-royal-fashion',
      name: 'Evolution Over Royal Fashion',
      tagline: 'Regal Metamorphosis & Contemporary Lineage',
      narrative: 'Deconstructing imperial silhouettes into sharp, modern-day runway statements. A study in how classic grandeur evolves into sustainable, bold silhouettes.',
      paletteTokens: JSON.stringify(['#5A4738', '#B89B5E', '#0C0A0B', '#F3E8D6']),
      coverImageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      displayOrder: 2,
    },
    {
      slug: 'raj-ghrana',
      name: 'Raj Ghrana',
      tagline: 'Imperial Aristocracy & Handcrafted Splendor',
      narrative: 'An homage to royal courtyards, opulent brocades, jaali architectural lines, and aristocratic poise presented with fierce runway confidence.',
      paletteTokens: JSON.stringify(['#4A123C', '#D4AF37', '#B89B5E', '#0C0A0B']),
      coverImageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      displayOrder: 3,
    },
    {
      slug: 'indo-western',
      name: 'Indo-Western',
      tagline: 'Contemporary Fusion & Avant-Garde Draping',
      narrative: 'Bridging Eastern heritage drapes with structured Western cuts. High-octane contrast, asymmetrical geometry, and fearless contemporary styling.',
      paletteTokens: JSON.stringify(['#EADBC4', '#C5A059', '#561C47', '#0C0A0B']),
      coverImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      displayOrder: 4,
    },
  ];

  const createdThemes: Record<string, string> = {};
  for (const t of themesData) {
    const theme = await prisma.theme.upsert({
      where: { slug: t.slug },
      update: t,
      create: t,
    });
    createdThemes[t.slug] = theme.id;
  }
  console.log('✅ Signature Themes seeded (Anantara, Evolution, Raj Ghrana, Indo-Western)');

  // 3. Seed Verified Achievements (Club Source of Truth)
  const achievementsData = [
    {
      title: 'Spectra Runway',
      position: 'Champion',
      institution: 'Birla Global University (BGU)',
      year: 2025,
      category: 'NATIONAL_RUNWAY',
      description: 'Grand victory showcasing the Anantara collection with premier choreography and unified styling.',
      isHighlight: true,
      displayOrder: 1,
    },
    {
      title: 'Advita 2026',
      position: '1st Runners Up',
      institution: 'IIIT Bhubaneswar',
      year: 2026,
      category: 'RUNWAY_FEST',
      description: 'Premier podium finish with Indo-Western collection against top national collegiate teams.',
      isHighlight: true,
      displayOrder: 2,
    },
    {
      title: 'Brahmastra 2026',
      position: 'Runners Up',
      institution: 'Regional College of Management (RCM)',
      year: 2026,
      category: 'INTER_COLLEGIATE',
      description: 'Exceptional runway staging and costume coordination.',
      isHighlight: false,
      displayOrder: 3,
    },
    {
      title: 'Celestia 2025',
      position: 'Victorious (Winner)',
      institution: 'Sri Sri University (SSU)',
      year: 2025,
      category: 'NATIONAL_RUNWAY',
      description: 'Gold trophy in thematic fashion presentation and choreography sync.',
      isHighlight: true,
      displayOrder: 4,
    },
    {
      title: 'Chiasma 2025',
      position: '1st Runners Up',
      institution: 'AIIMS Bhubaneswar',
      year: 2025,
      category: 'FEST_CHAMPIONSHIP',
      description: 'Spectacular showcase of Raj Ghrana collection praised by national jury.',
      isHighlight: true,
      displayOrder: 5,
    },
    {
      title: 'Spectra Runway',
      position: 'Champion',
      institution: 'Birla Global University (BGU)',
      year: 2023,
      category: 'NATIONAL_RUNWAY',
      description: 'Historic championship victory cementing VOGUE as a dominant state fashion club.',
      isHighlight: true,
      displayOrder: 6,
    },
    {
      title: 'Bramhastra 2024',
      position: 'Winner',
      institution: 'Regional College of Management (RCM)',
      year: 2024,
      category: 'INTER_COLLEGIATE',
      description: 'First place title in couture design and ramp synchronization.',
      isHighlight: true,
      displayOrder: 7,
    },
    {
      title: 'Advita 2024',
      position: '1st Runners Up',
      institution: 'IIIT Bhubaneswar',
      year: 2024,
      category: 'RUNWAY_FEST',
      description: 'High-voltage performance in avant-garde and retro fusion.',
      isHighlight: false,
      displayOrder: 8,
    },
    {
      title: 'Miss Abhipsa (Miss Universe 2024 State Track)',
      position: 'Top 5 Finalist',
      institution: 'Miss Universe Platform',
      year: 2024,
      category: 'PAGEANT',
      description: 'Top 5 national finalist representation from VOGUE SOA.',
      isHighlight: true,
      displayOrder: 9,
    },
    {
      title: 'IDA Fest',
      position: '1st Runner Up',
      institution: 'KIIT University',
      year: 2023,
      category: 'INTER_COLLEGIATE',
      description: 'Stellar podium performance across multi-round design challenges.',
      isHighlight: false,
      displayOrder: 10,
    },
    {
      title: 'IGNITE Fest',
      position: 'Runners Up',
      institution: 'ASBM University',
      year: 2023,
      category: 'INTER_COLLEGIATE',
      description: 'High acclaim for contemporary ramp discipline.',
      isHighlight: false,
      displayOrder: 11,
    },
    {
      title: 'Orion Fest 2022',
      position: 'Runners Up',
      institution: 'Sri Sri University (SSU)',
      year: 2022,
      category: 'NATIONAL_RUNWAY',
      description: 'Foundational breakthrough podium finish in club history.',
      isHighlight: false,
      displayOrder: 12,
    },
  ];

  await prisma.achievement.deleteMany();
  for (const a of achievementsData) {
    await prisma.achievement.create({ data: a });
  }
  console.log(`✅ ${achievementsData.length} Official Achievements seeded.`);

  // 4. Seed Members (Founders & Faculty Coordinator) with High-Res Editorial Portraits
  const membersData = [
    {
      fullName: 'Dr. Mitali Madhusmita Nayak',
      roleTitle: 'Faculty Coordinator',
      category: 'FACULTY',
      bio: "Guiding visionary mentor at Siksha 'O' Anusandhan, fostering student leadership, stage poise, and cultural excellence.",
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
      instagramUrl: 'https://instagram.com/VOGUE_SOA_FASHION_CLUB',
      displayOrder: 1,
    },
    {
      fullName: 'Umashankar Biswal',
      roleTitle: 'Co-Founder & Creative Director',
      category: 'FOUNDER',
      bio: 'Pioneering founder of VOGUE SOA. Established the club vision of turning campus runway into a high-fashion storytelling platform.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      instagramUrl: 'https://instagram.com/VOGUE_SOA_FASHION_CLUB',
      displayOrder: 2,
    },
    {
      fullName: 'Ashutosh Samal',
      roleTitle: 'Co-Founder & Runway Lead',
      category: 'FOUNDER',
      bio: 'Co-founder driving show choreography, model grooming, and national competition strategy across premier collegiate circuits.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
      instagramUrl: 'https://instagram.com/VOGUE_SOA_FASHION_CLUB',
      displayOrder: 3,
    },
  ];

  await prisma.member.deleteMany();
  for (const m of membersData) {
    await prisma.member.create({ data: m });
  }
  console.log('✅ Leadership & Faculty Coordinator seeded.');

  // 5. Seed Activities and Events with High-Res Imagery
  const eventsData = [
    {
      title: 'Annual Runway Auditions 2026',
      category: 'AUDITIONS',
      eventDate: new Date('2026-10-25T14:00:00Z'),
      venue: 'Main Auditorium, ITER SOA University Campus',
      description: 'Official auditions for fresh models, creative stylists, fashion sketchers, and BTS media managers. Open to all SOA students.',
      coverImageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=85',
      status: 'UPCOMING',
      displayOrder: 1,
    },
    {
      title: 'Couture Styling & Grooming Masterclass',
      category: 'WORKSHOP',
      eventDate: new Date('2026-11-10T11:00:00Z'),
      venue: 'Creative Arts Studio, SOA Campus 1',
      description: 'Hands-on training session covering runway walk posture, color blocking, editorial makeup fundamentals, and lighting awareness.',
      coverImageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85',
      status: 'UPCOMING',
      displayOrder: 2,
    },
    {
      title: 'Sustainable Fashion & Retro Styling Challenge',
      category: 'COMPETITION',
      eventDate: new Date('2026-08-15T10:00:00Z'),
      venue: 'SOA Campus 2 Amphitheatre',
      description: 'Intra-university upcycling design contest blending 90s vintage aesthetics with zero-waste textiles.',
      coverImageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=85',
      status: 'COMPLETED',
      displayOrder: 3,
    },
  ];

  await prisma.event.deleteMany();
  for (const e of eventsData) {
    await prisma.event.create({ data: e });
  }
  console.log('✅ Club Activities & Calendar Events seeded.');

  // 6. Seed Rich Editorial Gallery (14 Items with Photos & Video Streams)
  const galleryData = [
    {
      title: 'Spectra Gold Champion Runway Walk',
      category: 'RUNWAY',
      themeId: createdThemes['anantara'],
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-golden-dress-on-a-dark-stage-41481-large.mp4',
      isVideo: true,
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 1,
    },
    {
      title: 'Anantara Royal Tissue Organza Draping',
      category: 'RUNWAY',
      themeId: createdThemes['anantara'],
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 2,
    },
    {
      title: 'Raj Ghrana Imperial Heritage Brocade',
      category: 'RUNWAY',
      themeId: createdThemes['raj-ghrana'],
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-walking-on-a-runway-during-a-fashion-show-43093-large.mp4',
      isVideo: true,
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 3,
    },
    {
      title: 'Evolution Noir Studio Cover',
      category: 'EDITORIAL',
      themeId: createdThemes['evolution-over-royal-fashion'],
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '1:1',
      isFeatured: true,
      displayOrder: 4,
    },
    {
      title: 'Indo-Western Avant-Garde Draping',
      category: 'EDITORIAL',
      themeId: createdThemes['indo-western'],
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 5,
    },
    {
      title: 'Golden Hour Haute Couture Stride',
      category: 'EDITORIAL',
      themeId: createdThemes['anantara'],
      imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-studio-setting-42777-large.mp4',
      isVideo: true,
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 6,
    },
    {
      title: 'Backstage Choreography & Quick Change',
      category: 'BTS',
      imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '16:9',
      isFeatured: false,
      displayOrder: 7,
    },
    {
      title: 'Ramp Walk Synchrony & Geometry',
      category: 'RUNWAY',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 8,
    },
    {
      title: 'HD Runway Makeup & Contouring Masterclass',
      category: 'WORKSHOP',
      imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '1:1',
      isFeatured: false,
      displayOrder: 9,
    },
    {
      title: 'Couture Sketching & Fabric Draping Lab',
      category: 'WORKSHOP',
      imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '16:9',
      isFeatured: false,
      displayOrder: 10,
    },
    {
      title: 'Celestia Victory Stage Celebration',
      category: 'BTS',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '16:9',
      isFeatured: false,
      displayOrder: 11,
    },
    {
      title: 'Vintage Metamorphosis Lookbook',
      category: 'EDITORIAL',
      imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 12,
    },
    {
      title: 'Chiasma National Podium Walk',
      category: 'RUNWAY',
      themeId: createdThemes['raj-ghrana'],
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '3:4',
      isFeatured: true,
      displayOrder: 13,
    },
    {
      title: 'Backstage Styling Wardrobe Sync',
      category: 'BTS',
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      aspectRatio: '16:9',
      isFeatured: false,
      displayOrder: 14,
    },
  ];

  await prisma.galleryItem.deleteMany();
  for (const g of galleryData) {
    await prisma.galleryItem.create({ data: g });
  }
  console.log(`✅ ${galleryData.length} Rich Editorial Gallery items seeded.`);

  console.log('🎉 Database Seeding Completed Successfully for VOGUE SOA Fashion Club!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
