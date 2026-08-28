import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export const LandingNavbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <svg width="44" height="32" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M34.5 28H10C5.58172 28 2 24.4183 2 20C2 15.9329 5.03457 12.5746 8.97495 12.0628C10.4282 6.32626 15.6517 2 21.8571 2C28.7844 2 34.524 7.21319 35.3211 13.9317C39.6384 14.8052 42.8571 18.636 42.8571 23.2C42.8571 28.0601 38.9172 32 34.0571 32"
                stroke="#D8232A"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-heading leading-tight">
              Patterns
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 tracking-wider uppercase -mt-0.5">
              ERP Cloud Software
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <a href="#hero" className="hover:text-[#D8232A] transition-colors">Overview</a>
          <a href="#services" className="hover:text-[#D8232A] transition-colors">9 Core Services</a>
          <a href="#workflow" className="hover:text-[#D8232A] transition-colors">How It Works</a>
          <a href="#personas" className="hover:text-[#D8232A] transition-colors">Roles & Access</a>
          <a href="#pricing" className="hover:text-[#D8232A] transition-colors">Pricing</a>
          <a href="#security" className="hover:text-[#D8232A] transition-colors">Security</a>
        </div>

        {/* Right Action CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:8500693113"
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#D8232A] transition-colors px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
          >
            <Phone className="w-3.5 h-3.5 text-[#D8232A] fill-[#D8232A]" />
            <span>8500693113</span>
          </a>

          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-slate-800 hover:text-[#D8232A] font-semibold">
              Sign In
            </Button>
          </Link>

          <Link to="/login">
            <Button
              size="sm"
              className="bg-[#D8232A] hover:bg-[#B91C1C] text-white font-bold px-4 py-2 rounded-lg shadow-md shadow-[#D8232A]/20 transition-transform active:scale-95"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Go to Portal
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
