import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, CheckCheck, Phone } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center">
                <svg width="36" height="26" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M34.5 28H10C5.58172 28 2 24.4183 2 20C2 15.9329 5.03457 12.5746 8.97495 12.0628C10.4282 6.32626 15.6517 2 21.8571 2C28.7844 2 34.524 7.21319 35.3211 13.9317C39.6384 14.8052 42.8571 18.636 42.8571 23.2C42.8571 28.0601 38.9172 32 34.0571 32"
                    stroke="#D8232A"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-black text-white font-heading">
                Patterns <span className="text-xs text-slate-400 font-sans font-medium block -mt-1">ERP Cloud Software</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4">
              The leading enterprise cloud platform designed specifically for brick kilns, block manufacturers, and building material suppliers.
            </p>
            <div className="flex items-center gap-3 text-sm text-white font-bold">
              <span>Direct Support Helpline:</span>
              <a href="tel:8500693113" className="text-[#D8232A] hover:underline flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 fill-current" />
                <span>+91 8500693113</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">BrickOS Modules</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#services" className="hover:text-[#D8232A] transition-colors">Multi-Branch Governance</a></li>
              <li><a href="#services" className="hover:text-[#D8232A] transition-colors">Production & Kiln Logs</a></li>
              <li><a href="#services" className="hover:text-[#D8232A] transition-colors">Labour & Pathera Wages</a></li>
              <li><a href="#services" className="hover:text-[#D8232A] transition-colors">Dispatch & Challans</a></li>
              <li><a href="#services" className="hover:text-[#D8232A] transition-colors">GST Tax Invoices</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/login" className="hover:text-[#D8232A] transition-colors">Customer Portal</Link></li>
              <li><Link to="/login" className="hover:text-[#D8232A] transition-colors">Staff Login</Link></li>
              <li><a href="https://wa.me/918500693113" className="hover:text-[#D8232A] transition-colors">WhatsApp Support</a></li>
              <li><a href="https://patternserp.com" className="hover:text-[#D8232A] transition-colors">www.patternserp.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-semibold">
            © 2026 The Patterns Company. All rights reserved. BrickOS™ is a registered product.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5 text-[#D8232A]" /> Hosted on Cloud</span>
            <span className="flex items-center gap-1.5 text-emerald-400"><CheckCheck className="w-3.5 h-3.5" /> 99.9% Uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
