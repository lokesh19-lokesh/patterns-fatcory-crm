import React from 'react';
import { Database, Factory, Truck, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Database,
      title: 'Setup & Master Data Ingestion',
      desc: 'Configure your company branches, kilns, yards, material SKUs, customer credit limits, and staff accounts in under 15 minutes.',
    },
    {
      num: '02',
      icon: Factory,
      title: 'Daily Factory & Labour Logging',
      desc: 'Log raw materials (coal, clay, dust), pathera green brick counts, drying batches, and kiln burning rounds seamlessly.',
    },
    {
      num: '03',
      icon: Truck,
      title: 'GPS Dispatch & Instant Challan',
      desc: 'Assign tractor/truck drivers, create digital delivery challans, track shipments via GPS, and capture OTP proof of delivery.',
    },
    {
      num: '04',
      icon: BarChart3,
      title: 'Automated GST Billing & Cashflow',
      desc: 'Generate 1-click GST tax invoices, audit customer outstanding balances, process labour wages, and export P&L reports.',
    },
  ];

  return (
    <section id="workflow" className="py-24 bg-[#FAFAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-[#D8232A] uppercase mb-2 block">
            HOW PATTERNS OS WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
            From Raw Sourcing to Customer Payment
          </h2>
          <p className="text-slate-600 font-medium mt-3">
            A frictionless, closed-loop workflow ensuring every brick, rupee, and kilometre is tracked automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 shadow-xs hover:border-[#D8232A]/50 hover:shadow-lg transition-all flex flex-col relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6 text-[#D8232A]" />
                </div>
                <span className="text-2xl font-black text-slate-300 font-heading">
                  {step.num}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-950 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D8232A] hover:underline"
          >
            <span>See Live Interactive Demo in Action</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
