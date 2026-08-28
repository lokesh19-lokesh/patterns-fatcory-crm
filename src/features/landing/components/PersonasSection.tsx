import React from 'react';
import { Users, Truck, Package, Calculator, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PersonasSection: React.FC = () => {
  const personas = [
    {
      title: 'Managing Director & Admins',
      desc: 'Complete high-level visibility over multi-plant revenues, live cash flow, P&L, and branch performance metrics.',
      icon: ShieldCheck,
      color: 'from-[#D8232A] to-rose-700',
      features: ['Executive Revenue Dashboard', 'Branch Comparison & P&L', 'Full Multi-Tenant Audit Logs'],
    },
    {
      title: 'Sales & Commercial Managers',
      desc: 'Empower field executives to record site inspections, manage quotations, enforce credit limits, and close orders.',
      icon: Users,
      color: 'from-slate-900 to-slate-800',
      features: ['Lead Kanban & Inspections', 'Instant Proforma Quotes', 'Customer Outstanding Limits'],
    },
    {
      title: 'Plant & Inventory Managers',
      desc: 'Real-time control over raw material consumption, green brick counts, drying batches, and sorted finished stocks.',
      icon: Package,
      color: 'from-emerald-700 to-teal-800',
      features: ['Batch & Kiln Tracking', 'Reorder Shortage Alerts', 'Damage & Wastage Logs'],
    },
    {
      title: 'Logistics & Dispatch Drivers',
      desc: 'Mobile-ready dispatch views for drivers with route GPS navigation, digital challans, and customer OTP sign-offs.',
      icon: Truck,
      color: 'from-amber-600 to-orange-700',
      features: ['Digital E-Delivery Challans', 'Live Route Telematics', 'OTP Customer Signature POD'],
    },
    {
      title: 'Accountants & Tax Auditors',
      desc: 'Zero-error accounting with double-entry ledgers, automated CGST/SGST/IGST tax splits, and Excel export ready.',
      icon: Calculator,
      color: 'from-blue-700 to-indigo-800',
      features: ['Double-Entry General Ledger', 'GST E-Invoice IRN QR Codes', 'Bank & Cash Reconciliation'],
    },
  ];

  return (
    <section id="personas" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-[#D8232A] uppercase mb-2 block">
            11 ROLE PERSONAS INCLUDED
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
            Tailored Experiences for Every Team Member
          </h2>
          <p className="text-slate-600 font-medium mt-3">
            Every staff member gets a clutter-free, secure interface showing only the tools and data relevant to their role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <div
              key={i}
              className="bg-[#FAFAFC] border-2 border-slate-200/80 rounded-3xl p-7 hover:border-[#D8232A]/50 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] flex items-center justify-center mb-5">
                <persona.icon className="w-6 h-6 text-[#D8232A]" />
              </div>
              <h3 className="text-lg font-black text-slate-950 font-heading mb-2">
                {persona.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                {persona.desc}
              </p>
              <ul className="space-y-2.5 mt-auto pt-4 border-t border-slate-200">
                {persona.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#D8232A] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
