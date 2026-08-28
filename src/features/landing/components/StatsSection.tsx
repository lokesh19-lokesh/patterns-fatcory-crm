import React from 'react';
import { Factory, TrendingUp, Shield, Users } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Factory,
      value: '500+',
      label: 'Brick Kilns & Plants Active',
      sub: 'Across 14 States in India',
    },
    {
      icon: TrendingUp,
      value: '₹180Cr+',
      label: 'Dispatches & Bills Generated',
      sub: '100% Tax Compliant',
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'Cloud Availability SLA',
      sub: 'Automated Daily Backups',
    },
    {
      icon: Users,
      value: '11+',
      label: 'Role Personas Supported',
      sub: 'Tailored Department Views',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#FAFAFC] border border-slate-200/80 hover:border-[#D8232A]/40 transition-all text-center flex flex-col items-center group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-5 h-5 text-[#D8232A]" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-slate-950 font-heading tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
