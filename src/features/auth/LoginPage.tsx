import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Lock, Mail, Building, KeyRound, ShieldCheck, ArrowRight, Crown, Building2, HardHat } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, isLoading, workers } = useAuth();
  const [email, setEmail] = useState('admin@apexmaterials.com');
  const [password, setPassword] = useState('••••••••••••');
  const [companyGstin, setCompanyGstin] = useState('27AAACA12341Z5');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'Super Admin') {
      setEmail('superadmin@patterns.com');
      setCompanyGstin('PLATFORM-MASTER');
    } else if (role === 'Admin' || role === 'Company Admin') {
      setEmail('admin@apexmaterials.com');
      setCompanyGstin('27AAACA12341Z5');
    } else if (role === 'Worker') {
      setEmail(workers[0]?.email || 'worker@apexmaterials.com');
      setCompanyGstin('27AAACA12341Z5');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100/50 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-100/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        <div className="inline-flex items-center justify-center p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <svg width="40" height="30" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M34.5 28H10C5.58172 28 2 24.4183 2 20C2 15.9329 5.03457 12.5746 8.97495 12.0628C10.4282 6.32626 15.6517 2 21.8571 2C28.7844 2 34.524 7.21319 35.3211 13.9317C39.6384 14.8052 42.8571 18.636 42.8571 23.2C42.8571 28.0601 38.9172 32 34.0571 32"
                stroke="#D8232A"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-slate-950 font-heading block leading-none">
                Patterns
              </span>
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">
                ERP Cloud Software
              </span>
            </div>
          </div>
        </div>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
          Enterprise Cloud Management & Factory OS Portal
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/90 rounded-2xl space-y-6">
          {/* 3-Tier Quick Role Selector Cards */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
              Choose Access Portal Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSelection('Super Admin')}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center text-center gap-1 ${
                  selectedRole === 'Super Admin'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Crown className={`w-4 h-4 ${selectedRole === 'Super Admin' ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="text-[11px] font-bold leading-tight">Super Admin</span>
                <span className="text-[9px] opacity-70 leading-none">Owner</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelection('Admin')}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center text-center gap-1 ${
                  selectedRole === 'Admin' || selectedRole === 'Company Admin'
                    ? 'bg-[#D8232A] text-white border-[#D8232A] shadow-md ring-2 ring-red-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Building2 className={`w-4 h-4 ${selectedRole === 'Admin' ? 'text-white' : 'text-slate-500'}`} />
                <span className="text-[11px] font-bold leading-tight">Admin</span>
                <span className="text-[9px] opacity-70 leading-none">Subscriber</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelection('Worker')}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col items-center text-center gap-1 ${
                  selectedRole === 'Worker'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <HardHat className={`w-4 h-4 ${selectedRole === 'Worker' ? 'text-white' : 'text-slate-500'}`} />
                <span className="text-[11px] font-bold leading-tight">Worker</span>
                <span className="text-[9px] opacity-70 leading-none">Staff</span>
              </button>
            </div>
          </div>

          {/* Auth Method Tabs */}
          <div className="flex border-b border-slate-200 pb-2">
            <button
              onClick={() => setMode('password')}
              className={`flex-1 text-center py-2 text-xs font-bold transition-all border-b-2 ${
                mode === 'password' ? 'border-[#D8232A] text-[#D8232A]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setMode('otp')}
              className={`flex-1 text-center py-2 text-xs font-bold transition-all border-b-2 ${
                mode === 'otp' ? 'border-[#D8232A] text-[#D8232A]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Instant OTP Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Company GSTIN / Tenant Code"
              icon={<Building className="w-4 h-4" />}
              value={companyGstin}
              onChange={(e) => setCompanyGstin(e.target.value)}
              placeholder="e.g. 27AAACA12341Z5"
              required
            />

            <Input
              label="Official Work Email"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@construction.com"
              required
            />

            {mode === 'password' ? (
              <Input
                label="Password"
                type="password"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Mobile / OTP Authorization
                </label>
                {!otpSent ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={handleSendOtp}
                  >
                    Send 6-Digit OTP Code
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      icon={<KeyRound className="w-4 h-4" />}
                      placeholder="Enter 6-digit OTP"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                    <Button type="button" variant="primary" className="shrink-0 text-xs">
                      Verify
                    </Button>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2 py-2.5 text-sm font-bold"
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In as {selectedRole}
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 256-bit Encrypted RLS
            </span>
            <button className="hover:text-slate-800 font-semibold underline">Forgot Password?</button>
          </div>
        </div>
      </div>
    </div>
  );
};
