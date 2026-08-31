import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Boxes,
  HardHat,
  Truck,
  IndianRupee,
  BarChart3,
  Building2,
  Users,
  Package,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const services = [
    {
      id: 'production',
      category: 'core',
      num: '01',
      icon: Layers,
      title: 'Production Management',
      subtitle: 'Daily brick & block molding runs, batch mixing, kiln firing cycles, and breakage tracking.',
      features: [
        {
          name: 'Daily Output & Batch Runs',
          desc: 'Log daily production runs across Automatic Press Lines, Vibro Compactors, and Bull Trench Kiln chambers.',
        },
        {
          name: 'Raw Mix Ratio & Recipes',
          desc: 'Standardized batch recipes for Fly Ash (55%), Stone Dust (25%), Cement (12%), and Lime/Gypsum (8%).',
        },
        {
          name: 'Breakage & Wastage Control',
          desc: 'Real-time breakage monitoring with safety thresholds, QA compressive strength targets, and grade sorting (A/B/C Grade).',
        },
        {
          name: 'Kiln Firing & Curing Telemetry',
          desc: 'Monitor green bricks drying, autoclave steam cycles, and kiln chamber cooling schedules.',
        },
      ],
    },
    {
      id: 'stock',
      category: 'core',
      num: '02',
      icon: Boxes,
      title: 'Stock & Raw Materials',
      subtitle: 'Real-time inventory balances for raw materials and finished brick & block stockyards.',
      features: [
        {
          name: 'Raw Material Intake & Stock',
          desc: 'Live tracking of Fly Ash, OPC/PPC Cement, Lime, Gypsum, Stone Dust, River Sand, Red Clay, and Coal.',
        },
        {
          name: 'Finished Goods Inventory',
          desc: 'Real-time count of Fly Ash Bricks, Red Clay Bricks, Paver Blocks, AAC Lightweight Blocks, and Solid Masonry Blocks.',
        },
        {
          name: 'Automated Stock In/Out & Transfers',
          desc: 'Automatic stock deduction upon vehicle dispatch and automatic intake increment upon PO Goods Receipt Notes (GRN).',
        },
        {
          name: 'Low Stock & Reorder Alarms',
          desc: 'Intelligent threshold alerts preventing kiln shutdowns due to sudden shortages of fuel, coal, or fly ash.',
        },
      ],
    },
    {
      id: 'labour',
      category: 'core',
      num: '03',
      icon: HardHat,
      title: 'Labour & Wages',
      subtitle: 'Piece-rate gang billing per 1,000 bricks, daily attendance, advance deductions & weekly payouts.',
      features: [
        {
          name: 'Piece-Rate Pathai & Nikasi Wages',
          desc: 'Dynamic piece-rate calculation (e.g. ₹750/1k molding, ₹350/1k loading, ₹450/1k firing) for contractor gangs.',
        },
        {
          name: 'Contractor & Gang Ledgers',
          desc: 'Group workforce accounting with daily headcount, daily bricks molded, and team leader wage allocation.',
        },
        {
          name: 'Advance Kharcha Deductions',
          desc: 'Track daily/weekly cash advances given to worker families with automatic deduction from final weekly settlement.',
        },
        {
          name: '1-Click Wage Registers & Payslips',
          desc: 'Generate printable weekly wage slips, bank transfer sheets, and cash payout verification receipts.',
        },
      ],
    },
    {
      id: 'dispatch',
      category: 'core',
      num: '04',
      icon: Truck,
      title: 'Dispatch & Vehicles',
      subtitle: 'Trip challans, truck & tractor loading gate pass, live GPS tracking, and OTP delivery proof.',
      features: [
        {
          name: 'Delivery Trip Challans & Gate Pass',
          desc: 'Instant generation of digital loading slips specifying brick count (e.g. 3,500 bricks/trip), vehicle number, and driver.',
        },
        {
          name: 'Vehicle & Freight Management',
          desc: 'Manage company tipper trucks, tractor-trolleys, and hired third-party logistics with trip freight rates.',
        },
        {
          name: 'Live GPS Route Telematics',
          desc: 'Track transit trucks from the factory kiln directly to builder construction job-sites.',
        },
        {
          name: 'OTP & Digital Signature POD',
          desc: 'Site engineer OTP verification and digital signature capture ensuring tamper-proof proof of delivery.',
        },
      ],
    },
    {
      id: 'payments',
      category: 'core',
      num: '05',
      icon: IndianRupee,
      title: 'Payments & Outstanding',
      subtitle: 'Customer party ledgers, real-time outstanding balances, payment collections, and GST invoicing.',
      features: [
        {
          name: 'Customer & Builder Party Ledgers',
          desc: 'Live double-entry customer ledgers showing every dispatched truck, billed invoice, and payment received.',
        },
        {
          name: 'Payment Collections & Instant Receipts',
          desc: 'Record collections via Cash, UPI, Cheque, or NEFT/RTGS with automated WhatsApp/SMS payment receipts.',
        },
        {
          name: 'Credit Limit & Overdue Aging',
          desc: 'Set approved credit limits (e.g. ₹10 Lakhs) and receive overdue alerts for aging balances beyond 30/45 days.',
        },
        {
          name: 'Automated GST Invoices & IRN QR',
          desc: 'Compliant tax invoices with CGST/SGST/IGST splits, HSN codes, and government IRN QR verification.',
        },
      ],
    },
    {
      id: 'reports',
      category: 'core',
      num: '06',
      icon: BarChart3,
      title: 'Reports & Insights',
      subtitle: 'Kiln output analytics, fuel & raw material efficiency, cost per 1,000 bricks, and executive audits.',
      features: [
        {
          name: 'Daily Kiln Output vs Target',
          desc: 'Compare daily production velocity against monthly targets with visual output charts and shift breakdown.',
        },
        {
          name: 'Fuel & Raw Material Efficiency',
          desc: 'Analyze coal and diesel consumption per 1,000 bricks to detect kiln leakage or raw material wastage.',
        },
        {
          name: 'Cost & Profit Per 1,000 Bricks',
          desc: 'Calculate true landed cost per thousand bricks factoring raw mix, labour piece-rate, fuel, and transport.',
        },
        {
          name: '1-Click Excel & PDF Audit Reports',
          desc: 'Export complete production, sales, GST tax summaries, and customer outstanding ledgers in one click.',
        },
      ],
    },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEE2E2] text-[#D8232A] text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BrickOS Core Operational Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 font-heading">
            6 Core Services for Brick & Block Factories
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium mt-4">
            Everything your manufacturing plant needs: from kiln molding to raw stock, piece-rate wages, dispatch tracking, customer ledgers, and profit insights.
          </p>
        </div>

        {/* 6 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col bg-[#FAFAFC] border-2 border-slate-200/80 rounded-3xl p-7 hover:border-[#D8232A]/60 hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  {/* Top Number & Icon header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#D8232A] transition-all">
                      <IconComponent className="w-7 h-7 text-[#D8232A] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 font-heading">
                      {service.num}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-black text-slate-950 font-heading leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6 leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-3.5 mt-auto pt-4 border-t border-slate-200">
                    {service.features.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#D8232A] stroke-[3]" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block leading-tight">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-500 font-normal leading-normal block mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Link to Portal */}
                  <div className="mt-6 pt-3 flex items-center justify-between text-xs font-bold text-[#D8232A]">
                    <Link to="/login" className="flex items-center gap-1 hover:underline">
                      <span>Launch Module in Portal</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
