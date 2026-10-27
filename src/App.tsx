import { useState } from 'react';
import { profileData } from './data/profile';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SmoothScroll } from './components/common/SmoothScroll';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { ObservatorySection } from './sections/ObservatorySection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { ContactSection } from './sections/ContactSection';
import { ProfileConfigDrawer } from './components/modals/ProfileConfigDrawer';
import { BackToTop } from './components/common/BackToTop';
import { CinematicPreloader } from './components/common/CinematicPreloader';
import { CinematicBackground3D } from './components/3d/CinematicBackground3D';
import { useScrollAnimations } from './hooks/useScrollAnimations';

function DynamicAmbientGlows({ scrollProgress, isLight }: { scrollProgress: number; isLight: boolean }) {
  const glowTranslateY = scrollProgress * 180;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Upper Ambient Orbital Glow */}
      <div
        className={`absolute -top-24 left-1/4 w-[700px] h-[700px] rounded-full blur-[140px] transition-transform duration-700 ${
          isLight ? 'bg-sky-200/20' : 'bg-sky-500/12'
        }`}
        style={{
          transform: `translate3d(0, ${glowTranslateY}px, 0)`,
        }}
      />
      {/* Lower Secondary Ambient Glow */}
      <div
        className={`absolute top-1/2 -right-24 w-[600px] h-[600px] rounded-full blur-[140px] transition-transform duration-700 ${
          isLight ? 'bg-indigo-200/20' : 'bg-indigo-600/10'
        }`}
        style={{
          transform: `translate3d(0, ${-glowTranslateY * 0.6}px, 0)`,
        }}
      />
      {/* Subtle Warm Caustic Glow */}
      <div
        className={`absolute bottom-12 left-12 w-[500px] h-[500px] rounded-full blur-[130px] transition-opacity duration-700 ${
          isLight ? 'bg-amber-100/20' : 'bg-cyan-600/5'
        }`}
      />
    </div>
  );
}

function PortfolioMain() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const { scrollProgress, showBackToTop } = useScrollAnimations();

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isLight
          ? 'bg-slate-50 text-slate-950 selection:bg-sky-500/20 selection:text-sky-950'
          : 'bg-[#07090e] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200'
      }`}
    >
      {/* Cinematic Opening Preloader */}
      <CinematicPreloader />

      {/* Dynamic Ambient Background Glows */}
      <DynamicAmbientGlows scrollProgress={scrollProgress} isLight={isLight} />

      {/* Global Cinematic 3D Background Canvas */}
      <CinematicBackground3D scrollProgress={scrollProgress} />

      {/* Top Scroll Progress Indicator */}
      <div
        id="scroll-progress-bar"
        style={{
          width: '100%',
          transform: `scaleX(${scrollProgress})`,
          transition: 'transform 0.08s linear',
        }}
      />

      {/* Top Fixed Navigation */}
      <Navbar
        profile={profileData}
        onOpenConfigDrawer={() => setIsConfigDrawerOpen(true)}
      />

      {/* Main Portfolio Sections */}
      <main className="relative z-10">
        <HeroSection profile={profileData} />
        <ObservatorySection />
        <AboutSection
          profile={profileData}
          onOpenConfigDrawer={() => setIsConfigDrawerOpen(true)}
        />
        <SkillsSection profile={profileData} />
        <ProjectsSection profile={profileData} />
        <ExperienceSection
          profile={profileData}
          onOpenConfigDrawer={() => setIsConfigDrawerOpen(true)}
        />
        <EducationSection
          profile={profileData}
          onOpenConfigDrawer={() => setIsConfigDrawerOpen(true)}
        />
        <ContactSection
          profile={profileData}
          onOpenConfigDrawer={() => setIsConfigDrawerOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer profile={profileData} />

      {/* Profile Configuration & Launch Checklist Modal */}
      <ProfileConfigDrawer
        profile={profileData}
        isOpen={isConfigDrawerOpen}
        onClose={() => setIsConfigDrawerOpen(false)}
      />

      {/* Smooth Scroll Back to Top Button */}
      <BackToTop show={showBackToTop} />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <PortfolioMain />
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;