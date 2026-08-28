import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Cloud,
  Headphones,
  Globe2,
  Phone,
  Check,
  Layers,
  Package,
  HardHat,
  Truck,
  IndianRupee,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';

const customEase = [0.16, 1, 0.3, 1];

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 bg-[#FAFAFC] overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* MAIN HERO GRID (Left: Product & 6 Pillars | Right: Curved Factory & Pricing Card) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-2">
          {/* ---------------- LEFT SIDE ---------------- */}
          <motion.div
            initial={{ x: -24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Slogan Red Tagline */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-1.5 h-7 bg-[#D8232A] rounded-full" />
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black tracking-widest text-[#D8232A] uppercase">
                  DIGITAL BANO. ZYAADA KAMAO.
                </span>
              </div>
            </div>

            {/* Giant Title: BrickOS */}
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-slate-950 font-heading leading-none mb-3">
              Brick<span className="text-[#D8232A]">OS</span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-2">
              Complete ERP for <br className="hidden sm:inline" />
              <span className="text-[#D8232A]">Brick & Block Manufacturers</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-semibold mb-8 max-w-xl leading-relaxed">
              Manage your entire factory from one simple software.
            </p>

            {/* 6 Circular Feature Icons Grid (Exact Match to Flyer) */}
            <div className="grid grid-cols-3 gap-y-6 gap-x-3 sm:gap-x-6 mb-8 max-w-xl">
              {[
                {
                  icon: Layers,
                  title: 'Production',
                  sub: 'Management',
                },
                {
                  icon: Package,
                  title: 'Stock & Raw',
                  sub: 'Materials',
                },
                {
                  icon: HardHat,
                  title: 'Labour &',
                  sub: 'Wages',
                },
                {
                  icon: Truck,
                  title: 'Dispatch &',
                  sub: 'Vehicles',
                },
                {
                  icon: IndianRupee,
                  title: 'Payments &',
                  sub: 'Outstanding',
                },
                {
                  icon: BarChart3,
                  title: 'Reports &',
                  sub: 'Insights',
                },
              ].map((pillar, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FEE2E2] border border-[#D8232A]/20 flex items-center justify-center mb-2.5 shadow-xs group-hover:scale-110 group-hover:bg-[#D8232A] transition-all">
                    <pillar.icon className="w-7 h-7 text-[#D8232A] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {pillar.title}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                    {pillar.sub}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ---------------- RIGHT SIDE: CURVED FACTORY IMAGE + FLOATING PRICING CARD ---------------- */}
          <motion.div
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: customEase, delay: 0.2 }}
            className="lg:col-span-5 relative flex flex-col items-center"
          >
            {/* Curved Factory Graphic Visual Container with Video */}
            <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-2 border-slate-200">
              <video
                src="/assets/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Tag in Video */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>High-Output Kiln & Block Plant</span>
              </div>
            </div>

            {/* FLOATING WHITE ANNUAL PACK PRICING CARD (Matching Poster) */}
            <div className="w-full sm:w-11/12 -mt-24 sm:-mt-32 relative z-20 bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#D8232A] shadow-2xl">
              <div className="text-center">
                {/* Header Line */}
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-8 h-[1.5px] bg-slate-300" />
                  <span className="text-xs sm:text-sm font-black tracking-widest text-slate-800 uppercase">
                    ANNUAL PACK
                  </span>
                  <div className="w-8 h-[1.5px] bg-slate-300" />
                </div>

                {/* Price Display */}
                <div className="text-5xl sm:text-6xl font-black text-[#D8232A] font-heading tracking-tight mb-1">
                  ₹14,999
                </div>
                <span className="text-xs sm:text-sm font-black text-slate-900 tracking-wider uppercase block mb-5">
                  / YEAR ONLY
                </span>

                {/* Checked Bullet Points */}
                <div className="space-y-2.5 mb-6 text-left max-w-xs mx-auto">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#D8232A] stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      All features included
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#D8232A] stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      No hidden charges
                    </span>
                  </div>
                </div>

                {/* Instant Access Button */}
                <Link to="/login">
                  <Button
                    size="lg"
                    className="w-full bg-[#D8232A] hover:bg-[#B91C1C] text-white font-black py-3.5 text-sm sm:text-base rounded-xl shadow-lg shadow-[#D8232A]/25 transition-transform active:scale-95"
                  >
                    Get Instant Access
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* WHATSAPP CALLOUT PILL & TRUST BADGES ROW (Exact Match to Poster) */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Big Red WhatsApp Button Pill */}
          <div className="lg:col-span-5">
            <a
              href="https://wa.me/918500693113?text=Hi%20Patterns%20Team%2C%20I%20want%20to%20book%20a%20FREE%20demo%20of%20BrickOS%20ERP"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3.5 bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-[#D8232A]/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg group"
            >
              {/* WhatsApp Icon */}
              <svg className="w-8 h-8 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <div className="text-left">
                <span className="block text-xs uppercase tracking-wider font-extrabold text-white/90">
                  Book a <strong className="underline decoration-white font-black">FREE Demo</strong>
                </span>
                <span className="block text-base sm:text-xl font-black leading-tight">
                  on WhatsApp Now!
                </span>
              </div>
            </a>
          </div>

          {/* 3 Trust Badges */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-slate-800" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 leading-tight">Secure &</h4>
                <p className="text-xs text-slate-500 font-bold leading-tight">Reliable</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                <Cloud className="w-5 h-5 text-slate-800" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 leading-tight">Cloud Based</h4>
                <p className="text-[11px] text-slate-500 font-bold leading-tight">Anywhere Access</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                <Headphones className="w-5 h-5 text-slate-800" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 leading-tight">Local Support</h4>
                <p className="text-xs text-slate-500 font-bold leading-tight">Always</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM STRIP (Website | Phone WhatsApp | Made for Brick Factories) */}
        {/* ========================================================================= */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-800">
          <div className="flex items-center gap-2 text-slate-700">
            <Globe2 className="w-4 h-4 text-[#D8232A]" />
            <a href="https://patternserp.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D8232A] transition-colors">
              www.patternserp.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D8232A] flex items-center justify-center text-white shadow-sm">
              <Phone className="w-4 h-4 fill-white" />
            </div>
            <div>
              <a href="tel:8500693113" className="text-lg font-black text-slate-950 tracking-tight hover:text-[#D8232A]">
                8500693113
              </a>
              <span className="text-[11px] text-slate-500 font-semibold block -mt-1">Call / WhatsApp</span>
            </div>
          </div>

          <div className="text-slate-600 text-center md:text-right">
            <span>
              Made for <strong className="text-[#D8232A] font-black">Brick Factories</strong>. Built for <strong className="text-slate-950 font-black">Growth</strong>.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
