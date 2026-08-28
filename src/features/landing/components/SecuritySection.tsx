import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Database, KeyRound } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const SecuritySection: React.FC = () => {
  return (
    <section id="security" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[#D8232A] text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-[#D8232A]" />
              <span>Enterprise Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight mb-4">
              Military-Grade Data Isolation & Multi-Tenancy
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-6">
              Patterns OS leverages native PostgreSQL Row Level Security (RLS). Every branch, transaction, customer record, and ledger entry is strictly scoped by company and user permissions, ensuring zero cross-tenant leakage.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xl font-black text-[#D8232A] font-heading block">11 Personas</span>
                <span className="text-xs text-slate-400 font-medium">Fine-Grained RBAC</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xl font-black text-emerald-400 font-heading block">Native RLS</span>
                <span className="text-xs text-slate-400 font-medium">PostgreSQL Engine</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xl font-black text-white font-heading block">100% Tax</span>
                <span className="text-xs text-slate-400 font-medium">GST Compliant</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#D8232A]" />
                <span>Ready to Digitise Your Operations?</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Join hundreds of forward-thinking manufacturers and material suppliers running on Patterns Factory OS.
              </p>
              <div className="space-y-3">
                <Link to="/login">
                  <Button size="lg" className="w-full bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold py-3.5 rounded-xl">
                    Access Demo Portal
                  </Button>
                </Link>
                <a
                  href="https://wa.me/918500693113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors text-center"
                >
                  <span>Talk to an Expert on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
