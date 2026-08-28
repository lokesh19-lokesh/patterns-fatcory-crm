import React from 'react';
import { LandingNavbar } from './components/LandingNavbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { ServicesSection } from './components/ServicesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { PersonasSection } from './components/PersonasSection';
import { PricingSection } from './components/PricingSection';
import { SecuritySection } from './components/SecuritySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaSection } from './components/CtaSection';
import { LandingFooter } from './components/LandingFooter';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 font-sans selection:bg-[#D8232A]/20 selection:text-[#D8232A] overflow-x-hidden">
      {/* 1. Fixed Brand Navigation */}
      <LandingNavbar />

      <main>
        {/* 2. Hero Section (BrickOS / Patterns Hero with 6 Pillars & Pricing Card) */}
        <HeroSection />

        {/* 3. Stats & Scale Strip */}
        <StatsSection />

        {/* 4. Complete Services & Operational Capabilities (All 9 Modules) */}
        <ServicesSection />

        {/* 5. How It Works / Implementation Workflow */}
        <WorkflowSection />

        {/* 6. Tailored Role Personas & Department Access */}
        <PersonasSection />

        {/* 7. Transparent Pricing & Plans Comparison */}
        <PricingSection />

        {/* 8. Military-Grade Database Security & PostgreSQL RLS */}
        <SecuritySection />

        {/* 9. Customer Testimonials & Industry Validation */}
        <TestimonialsSection />

        {/* 10. Call to Action / Direct Booking */}
        <CtaSection />
      </main>

      {/* 11. Comprehensive Brand Footer */}
      <LandingFooter />
    </div>
  );
};
