import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-[#FAFAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-[#D8232A] uppercase mb-2 block">
            TRANSPARENT & AFFORDABLE PRICING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading">
            Simple Pricing. Infinite Scaling.
          </h2>
          <p className="text-slate-600 font-medium mt-3">
            No per-user licensing fees. No hidden setup charges. 100% full-featured access.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Main Popular Plan: Annual Pack */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#D8232A] shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-[#D8232A] text-white text-[11px] font-black tracking-wider uppercase px-4 py-1.5 rounded-bl-2xl">
              Most Popular
            </div>

            <div>
              <span className="text-xs font-black tracking-widest text-slate-500 uppercase block mb-1">
                COMPLETE FACTORY PLAN
              </span>
              <h3 className="text-2xl font-black text-slate-950 font-heading mb-4">
                BrickOS Annual Pack
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl sm:text-6xl font-black text-[#D8232A] font-heading">
                  ₹14,999
                </span>
                <span className="text-sm font-extrabold text-slate-700 tracking-wider">
                  / YEAR ONLY
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mb-8">
                Designed for single & multi-kiln brick factories, flyash plants, concrete blocks, and aggregate yards.
              </p>

              <div className="space-y-3.5 mb-8">
                {[
                  'All 9 Operational Engines & Modules Included',
                  'Unlimited Users, Drivers & Staff Logins',
                  'Live GPS Fleet Tracking & Delivery Challans',
                  'Automated GST Invoicing & IRN Barcodes',
                  'Customer Credit Control & Ledger Summaries',
                  'Mobile & Desktop Cloud Access (Anywhere)',
                  'Free Data Migration Assistance & Onboarding',
                  'Direct Phone & WhatsApp Support Priority',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#D8232A] stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/login">
              <Button
                size="lg"
                className="w-full bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold py-4 text-base rounded-2xl shadow-xl shadow-[#D8232A]/25"
              >
                Get Started Now — ₹14,999/yr
              </Button>
            </Link>
          </div>

          {/* Enterprise Multi-Unit Plan */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs font-black tracking-widest text-slate-500 uppercase block mb-1">
                ENTERPRISE CONGLOMERATES
              </span>
              <h3 className="text-2xl font-black text-slate-950 font-heading mb-4">
                Multi-Branch Custom
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-slate-900 font-heading">
                  Custom Quote
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-6">
                For developers, mining conglomerates, and 5+ multi-location plant networks requiring custom ERP integrations.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Custom ERP Database Connectors & APIs',
                  'Dedicated Account Manager & Field Trainer',
                  'Custom Weighbridge & Sensor Hardware Integration',
                  'Multi-Company Consolidated P&L Analytics',
                  'Custom SLA (99.99%) & On-Premises Option',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-slate-700 stroke-[3]" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/918500693113?text=Hi%20Patterns%20Team%2C%20I%20need%20a%20custom%20quote%20for%20our%20multi-plant%20network"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors text-center"
            >
              <span>Contact Enterprise Sales</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
