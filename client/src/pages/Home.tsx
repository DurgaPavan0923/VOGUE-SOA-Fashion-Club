import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Marquee } from '../components/common/Marquee';
import { InfiniteImageMarquee, EDITORIAL_LOOKBOOK_PHOTOS } from '../components/common/InfiniteImageMarquee';
import { EditorialIntro } from '../components/sections/EditorialIntro';
import { RunwaySection } from '../components/sections/RunwaySection';
import { About } from '../components/sections/About';
import { Themes } from '../components/sections/Themes';
import { AchievementHighlight } from '../components/sections/AchievementHighlight';
import { Achievements } from '../components/sections/Achievements';
import { AchieveMoments } from '../components/sections/AchieveMoments';
import { Experience } from '../components/sections/Experience';
import { Gallery } from '../components/sections/Gallery';
import { EventsSection } from '../components/sections/EventsSection';
import { MembersSection } from '../components/sections/MembersSection';
import { FacultySection } from '../components/sections/FacultySection';
import { WhyJoin } from '../components/sections/WhyJoin';
import { JoinForm } from '../components/sections/JoinForm';
import { Contact } from '../components/sections/Contact';
import { CulturalDivider } from '../components/common/CulturalDivider';
import { ScrollHUD } from '../components/common/ScrollHUD';

export const Home: React.FC = () => {
  return (
    <div className="w-full relative bg-[#080808]">
      {/* Editorial Vertical Scroll HUD */}
      <ScrollHUD />

      {/* 1. Cinematic Hero Opener */}
      <Hero />

      {/* 2. Sleek Infinite Brand Marquee */}
      <Marquee speed="normal" />

      {/* 2B. Automatic Infinite Moving Runway Photo Stream (Right to Left) */}
      <InfiniteImageMarquee
        direction="rtl"
        speed="normal"
        eyebrow="LIVE RUNWAY PHOTO STREAM • CONTINUOUS MOTION"
      />

      {/* 3. Editorial Statement Spread */}
      <EditorialIntro />

      {/* 4. The Runway Arena Spread */}
      <RunwaySection />

      {/* 5. Core Pillars & Identity */}
      <About />

      {/* 6. Thematic Runway Universe & Interactive Spec Sheets */}
      <Themes />

      {/* 7. National Champions Feature Highlight */}
      <AchievementHighlight />

      {/* 8. Full Verified Achievements Timeline with Self-Drawing Spine */}
      <Achievements />

      {/* 8B. 3D Interactive Fan Deck Lookbook Moments */}
      <AchieveMoments />

      {/* 8C. Reverse Moving Couture Lookbook Stream (Left to Right) */}
      <InfiniteImageMarquee
        direction="ltr"
        speed="slow"
        photos={EDITORIAL_LOOKBOOK_PHOTOS}
        eyebrow="COUTURE ARCHIVES • EDITORIAL LOOKBOOK STREAM"
      />

      {/* 9. The VOGUE Experience (8 Dynamic Training Modules) */}
      <Experience />

      <CulturalDivider variant="mandala" />

      {/* 10. Multi-Campus Roster Matrix (The Faces of VOGUE) */}
      <MembersSection />

      {/* 11. Multi-Campus Faculty Leadership & Founding Directors */}
      <FacultySection />

      <CulturalDivider variant="simple" />

      {/* 12. Visual Editorial Gallery & 4K Video Films (Dual Auto-Stream) */}
      <Gallery />

      {/* 13. Reusable Event System & Calendar */}
      <EventsSection />

      {/* 14. Why Join Movement Benefits */}
      <WhyJoin />

      <CulturalDivider variant="mandala" />

      {/* 15. Audition & Join Form ("READY TO OWN THE RUNWAY?") */}
      <div id="join-section">
        <JoinForm />
      </div>

      {/* 16. Campus Location & Contact */}
      <Contact />
    </div>
  );
};

export default Home;
