import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users2,
  Package,
  ShoppingCart,
  Truck,
  FileSpreadsheet,
  HardHat,
  UserCheck,
  BarChart4,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const services = [
    {
      id: 'enterprise',
      category: 'core',
      num: '01',
      icon: Building2,
      title: 'Multi-Tenant & Multi-Branch Enterprise Management',
      subtitle: 'Centralized governance across corporate headquarters, subsidiary branches, and plants.',
      features: [
        {
          name: 'Company Profile & Branches Setup',
          desc: 'Centralized registry for corporate headquarters, sub-branches, GSTINs, PANs, and multi-bank account configurations.',
        },
        {
          name: 'Granular RBAC (11 Role Personas)',
          desc: 'Permission-gated access tailored for Super Admin, Company Admin, Manager, Sales Executive, Purchase Manager, Warehouse Manager, HR, Accountant, Driver, Customer, and Supplier.',
        },
        {
          name: 'Row-Level Security (RLS) & Multi-Tenancy',
          desc: 'Database-engine level data isolation keeping multiple companies and operational branches strictly partitioned with zero data leakage.',
        },
      ],
    },
    {
      id: 'crm',
      category: 'commercial',
      num: '02',
      icon: Users2,
      title: 'CRM & Client Relationship Services',
      subtitle: 'Accelerate deal closing, manage site inspections, and control credit risk.',
      features: [
        {
          name: 'Lead & Pipeline Management',
          desc: 'Visual Kanban and tabular lead tracking across stages: New, Contacted, Site Inspection, Quote Sent, Negotiation, Won, and Lost.',
        },
        {
          name: 'Site Inspections & Follow-up Scheduling',
          desc: 'Schedule on-site material inspections, assign field agents, and automate customer follow-up WhatsApp/SMS reminders.',
        },
        {
          name: 'Customer Credit & Ledger Control',
          desc: 'Automated credit limit checks, payment terms enforcement (15/30/60 days), and real-time outstanding balance tracking.',
        },
        {
          name: 'Client Category Segregation',
          desc: 'Tailored pricing, credit terms, and order rules for Contractors, Developers, Retailers, and Individual Home Builders.',
        },
      ],
    },
    {
      id: 'inventory',
      category: 'supply',
      num: '03',
      icon: Package,
      title: 'Supply Chain, Material Master & Multi-Warehouse Inventory',
      subtitle: 'Live stock tracking, automated balance triggers, and raw material monitoring.',
      features: [
        {
          name: 'Product Catalog & Material Master',
          desc: 'Unified master data with SKUs, barcode rendering (bwip-js), HSN codes, and dynamic GST tax rate slabs (0% to 28%).',
        },
        {
          name: 'Multi-Warehouse Stock Tracking',
          desc: 'Live inventory balances across factory floors, central warehouses, transit hubs, and retail yard locations.',
        },
        {
          name: 'Automated Stock Movements',
          desc: 'Stock In, Stock Out, Inter-Warehouse Transfers, Damage/Wastage adjustments, and Customer Returns with instant trigger recalculations.',
        },
        {
          name: 'Low Stock & Reorder Alerts',
          desc: 'Automated minimum threshold alerts preventing critical shortages of clay, coal, flyash, sand, and cement.',
        },
      ],
    },
    {
      id: 'procurement',
      category: 'supply',
      num: '04',
      icon: ShoppingCart,
      title: 'Procurement & Vendor Management',
      subtitle: 'Streamline raw material purchases, vendor grading, and intake verification.',
      features: [
        {
          name: 'Supplier & Vendor Directory',
          desc: 'Comprehensive vendor profiles, quality ratings (1–5 stars), material categories, banking data, and outstanding payables.',
        },
        {
          name: 'Purchase Order (PO) Engine',
          desc: 'End-to-end PO lifecycle management: Draft, Sent, Approved, Partially Received, and Completed with itemized tax calculations.',
        },
        {
          name: 'Goods Receipt Notes (GRN)',
          desc: 'Material intake inspection and physical quantity validation against approved POs before stock update.',
        },
      ],
    },
    {
      id: 'logistics',
      category: 'operations',
      num: '05',
      icon: Truck,
      title: 'Logistics, Fleet Dispatch & Proof of Delivery (POD)',
      subtitle: 'Real-time vehicle dispatches, live route telematics, and OTP delivery verification.',
      features: [
        {
          name: 'Delivery Challan Generation',
          desc: 'Digital e-challan creation directly converted from confirmed sales orders with vehicle and driver assignment.',
        },
        {
          name: 'Driver & Vehicle Allocation',
          desc: 'Assign dedicated transport trucks, tractors, and drivers per delivery route with trip freight tracking.',
        },
        {
          name: 'Live GPS Tracking',
          desc: 'Real-time shipment and route tracking to destination construction sites ensuring on-time delivery accountability.',
        },
        {
          name: 'Secure Proof of Delivery (POD)',
          desc: 'On-site customer OTP verification, digital touch-screen signature capture, and delivery photo uploads.',
        },
      ],
    },
    {
      id: 'billing',
      category: 'commercial',
      num: '06',
      icon: FileSpreadsheet,
      title: 'Commercial Sales & GST Billing Engine',
      subtitle: 'Government-compliant tax invoicing, instant quotation generator, and e-invoicing.',
      features: [
        {
          name: 'Quotations & Sales Orders',
          desc: 'Instant proforma quotation generator with 1-click conversion to confirmed sales orders and booking registers.',
        },
        {
          name: 'Automated GST Invoicing',
          desc: 'Strict compliance with Indian GST regulations with automated CGST, SGST, and IGST tax splits and round-offs.',
        },
        {
          name: 'E-Invoicing & Barcode/QR Generation',
          desc: 'Generate government-compliant IRN QR codes and barcodes for direct scanning on printed invoices.',
        },
        {
          name: 'Direct PDF Downloads & Printing',
          desc: 'Instant high-resolution PDF tax invoices, delivery notes, and payment receipts with customizable company branding.',
        },
      ],
    },
    {
      id: 'projects',
      category: 'operations',
      num: '07',
      icon: HardHat,
      title: 'Project & BOQ (Bill of Quantities) Management',
      subtitle: 'Track large-scale developer construction sites, BOQ consumption, and budgets.',
      features: [
        {
          name: 'Construction Site & Project Tracking',
          desc: 'Track project site budgets, milestone completion percentages, start/end timelines, and assigned site engineers.',
        },
        {
          name: 'Material Consumption vs BOQ',
          desc: 'Real-time monitoring of actual materials dispatched and consumed at project sites against planned BOQ limits.',
        },
      ],
    },
    {
      id: 'hrms',
      category: 'core',
      num: '08',
      icon: UserCheck,
      title: 'Workforce, Attendance & Payroll (HRMS)',
      subtitle: 'Geo-verified staff attendance, overtime tracking, and statutory salary processing.',
      features: [
        {
          name: 'Employee Directory & KYC Records',
          desc: 'Comprehensive employee profiles with statutory KYC records (Aadhaar, PAN, Bank Details) and department assignments.',
        },
        {
          name: 'Geofenced GPS Attendance & Selfie Check-In',
          desc: 'Location-verified check-in/out with GPS coordinates, camera selfie validation, and automated overtime hours calculation.',
        },
        {
          name: 'Automated Payroll & Salary Vouchers',
          desc: 'Basic salary calculation, attendance deductions, allowances, and statutory compliance (PF, ESI, TDS) with printable payslips.',
        },
      ],
    },
    {
      id: 'accounting',
      category: 'core',
      num: '09',
      icon: BarChart4,
      title: 'Financial Accounting, Reports & Compliance',
      subtitle: 'Double-entry general ledger, executive analytics, and compliance document vault.',
      features: [
        {
          name: 'Double-Entry General Ledger',
          desc: 'Standard chart of accounts, payment vouchers, receipt entries, contra vouchers, and automated trial balances.',
        },
        {
          name: 'Real-Time Analytics & Executive Reporting',
          desc: 'Sales velocity, inventory aging, customer outstanding aging analysis, and GSTR-1/GSTR-3B summaries with 1-click Excel/CSV export.',
        },
        {
          name: 'Encrypted Document Vault',
          desc: 'Centralized repository for contracts, GST returns, mining licenses, pollution certificates, and vehicle permits.',
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
            <span>Full Operational Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 font-heading">
            Complete Services & Operational Capabilities
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium mt-4">
            Explore the 9 dedicated operational engines engineered to eliminate spreadsheets, automate GST workflows, and scale manufacturing operations.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All 9 Services' },
              { id: 'core', label: 'Enterprise & Finance' },
              { id: 'commercial', label: 'CRM & GST Sales' },
              { id: 'supply', label: 'Inventory & Procurement' },
              { id: 'operations', label: 'Logistics & Sites' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#D8232A] text-white shadow-md shadow-[#D8232A]/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 9 Services Grid */}
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
