import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#D8232A] via-[#B91C1C] to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-black uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5 fill-white" /> Digital Transformation Ready
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight mb-4">
          Upgrade Your Factory to BrickOS Today
        </h2>
        <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
          Start managing your daily production, labour wages, raw materials, and customer ledgers from one simple app for just ₹14,999/year.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://wa.me/918500693113?text=Hi%20Patterns%20Team%2C%20I%20want%20to%20get%20started%20with%20BrickOS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-slate-950 hover:bg-slate-100 font-extrabold px-8 py-4 rounded-2xl shadow-xl text-base transition-all transform hover:scale-105"
          >
            <span>Book Free WhatsApp Demo</span>
            <ArrowRight className="w-5 h-5 text-[#D8232A]" />
          </a>

          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950/60 hover:bg-slate-950 text-white font-bold px-8 py-4 rounded-2xl border border-white/30 text-base transition-all"
          >
            <span>Access Interactive Portal</span>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 font-bold">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free Setup & Training
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Cloud Activation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Tax Compliant
          </span>
        </div>
      </div>
    </section>
  );
};
