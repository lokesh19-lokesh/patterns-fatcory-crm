import React, { useState } from 'react';
import { Menu, Sun, Moon, Bell, Search, Building2, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { company } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Low Stock Alert', time: '10m ago', text: 'TMT Steel Bars Fe550D (12mm) reached reorder level (12 MT remaining).' },
    { id: 2, title: 'Dispatch Confirmation', time: '30m ago', text: 'Challan #DC-9921 delivered to Oberoi Realty Site. OTP Verified.' },
    { id: 3, title: 'Payment Received', time: '1h ago', text: 'Rs. 4,50,000 received from L&T Construction via NEFT.' },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 flex items-center justify-between gap-4 shadow-xs">
      {/* Left side: Mobile menu & Quick Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs w-64 md:w-80 focus-within:border-[#D8232A] focus-within:ring-1 focus-within:ring-[#D8232A] transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search Invoices, Products, GSTIN, PO..."
            className="bg-transparent text-slate-900 placeholder-slate-400 border-none outline-none w-full text-xs"
          />
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Active Branch Tag */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700">
          <Building2 className="w-3.5 h-3.5 text-[#D8232A]" />
          <span>HQ - Mumbai Plant</span>
        </div>

        {/* Multi-Tenant Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Tenant Isolated (RLS)</span>
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D8232A] rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D8232A] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-4 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">Live System Alerts</h4>
                <span className="text-[10px] bg-red-50 text-[#D8232A] font-bold px-2 py-0.5 rounded-full border border-red-100">3 New</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{n.text}</p>
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
