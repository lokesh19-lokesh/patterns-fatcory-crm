import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Lock, Mail, Building, KeyRound, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('admin@apexmaterials.com');
  const [password, setPassword] = useState('••••••••••••');
  const [companyGstin, setCompanyGstin] = useState('27AAACA12341Z5');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Company Admin');
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        <div className="inline-flex items-center justify-center p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
          <img src="/assets/logo.png" alt="Patterns Factory" className="h-12 w-auto object-contain" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">Patterns Factory OS</h2>
        <p className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
          Enterprise Multi-Tenant Construction CRM & ERP
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl border border-slate-800 rounded-2xl space-y-6">
          {/* Auth Method Tabs */}
          <div className="flex border-b border-slate-800 pb-3">
            <button
              onClick={() => setMode('password')}
              className={`flex-1 text-center py-2 text-xs font-bold transition-all border-b-2 ${
                mode === 'password' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setMode('otp')}
              className={`flex-1 text-center py-2 text-xs font-bold transition-all border-b-2 ${
                mode === 'otp' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
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
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide">
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
                    <Button type="button" variant="amber" className="shrink-0 text-xs">
                      Verify
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                Select Initial Role View
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-sky-500"
              >
                <option value="Company Admin">Company Admin (Full Access)</option>
                <option value="Sales Executive">Sales Executive (Leads & Orders)</option>
                <option value="Purchase Manager">Purchase Manager (POs & Suppliers)</option>
                <option value="Warehouse Manager">Warehouse Manager (Stock & Inventory)</option>
                <option value="Accountant">Accountant (GST Invoices & P&L)</option>
                <option value="HR">HR Manager (Payroll & Attendance)</option>
                <option value="Driver">Driver (Delivery Dispatch & GPS)</option>
                <option value="Customer">Customer (Client Portal & Bills)</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Tenant Portal
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 256-bit Encrypted RLS
            </span>
            <button className="hover:text-slate-200 underline">Forgot Password?</button>
          </div>
        </div>
      </div>
    </div>
  );
};
