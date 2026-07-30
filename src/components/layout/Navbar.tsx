import React, { useState } from 'react';
import { Menu, Sun, Moon, Bell, Plus, Search, Building2, Shield, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, company, role } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Low Stock Alert', time: '10m ago', text: 'TMT Steel Bars Fe550D (12mm) reached reorder level (12 MT remaining).' },
    { id: 2, title: 'Dispatch Confirmation', time: '30m ago', text: 'Challan #DC-9921 delivered to Oberoi Realty Site. OTP Verified.' },
    { id: 3, title: 'Payment Received', time: '1h ago', text: 'Rs. 4,50,000 received from L&T Construction via NEFT.' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 flex items-center justify-between gap-4">
      {/* Left side: Mobile menu & Quick Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 text-xs w-64 md:w-80">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search Invoices, Products, GSTIN, Vehicles, PO..."
            className="bg-transparent text-slate-200 placeholder-slate-500 border-none outline-none w-full text-xs"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Active Branch Tag */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md text-xs font-semibold text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-sky-400" />
          <span>HQ - Mumbai Plant</span>
        </div>

        {/* Multi-Tenant Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Tenant Isolated (RLS)</span>
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-4 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Live System Alerts</h4>
                <span className="text-[10px] bg-sky-500/20 text-sky-400 font-bold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
