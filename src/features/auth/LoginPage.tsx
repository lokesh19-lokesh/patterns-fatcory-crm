import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Lock, Mail, ShieldCheck, ArrowRight, KeyRound, Eye, EyeOff, Crown, Building2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isLoading, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // If already authenticated, redirect to appropriate portal
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'Super Admin') {
        navigate('/app/super-admin', { replace: true });
      } else {
        navigate('/app/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setErrorMsg('');

    try {
      await login(email, password);
      if (email.trim().toLowerCase() === 'brickserpsoftware@gmail.com') {
        navigate('/app/super-admin');
      } else {
        navigate('/app/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    }
  };

  const handleSendOtp = () => {
    if (!email) return;
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Soft Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-red-100/40 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-100/40 blur-[120px] rounded-full pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 z-10">
        <div className="inline-flex items-center justify-center p-3 bg-white border border-slate-200/90 rounded-2xl shadow-sm">
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

      {/* Login Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/90 rounded-3xl space-y-6">
          {/* Auth Method Tabs */}
          <div className="flex border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setMode('password')}
              className={`flex-1 text-center py-2 text-xs font-bold transition-all border-b-2 ${
                mode === 'password'
                  ? 'border-[#D8232A] text-[#D8232A]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => setMode('otp')}
              className={`flex-1 text-center py-2 text-xs font-bold transition-all border-b-2 ${
                mode === 'otp'
                  ? 'border-[#D8232A] text-[#D8232A]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Instant OTP Login
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium text-center">
              {errorMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            {mode === 'password' ? (
              /* Password Field with View Password Toggle */
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#forgot" className="text-[11px] text-slate-500 hover:text-[#D8232A] font-semibold">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                    title={showPassword ? 'Hide password' : 'View password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-600" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* OTP Field */
              <div className="space-y-3">
                {!otpSent ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-xs font-bold py-2.5"
                    onClick={handleSendOtp}
                  >
                    Send 6-Digit Login Code
                  </Button>
                ) : (
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Enter Verification Code
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 font-mono tracking-widest text-center font-bold focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                      />
                    </div>
                    <p className="text-[10px] text-emerald-600 font-bold text-center pt-1">
                      OTP sent to registered address
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-full py-3 shadow-lg shadow-red-600/20 text-xs font-bold uppercase tracking-wider rounded-xl mt-2"
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to ERP Cloud
            </Button>
          </form>

          {/* 1-Click Quick Demo Login: Super Admin vs End User */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider text-center">
              Quick 1-Click Role Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('brickserpsoftware@gmail.com');
                  setPassword('Tpc@123');
                }}
                className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-800 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                  <Crown className="w-3.5 h-3.5" />
                  <span>Super Admin</span>
                </div>
                <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">
                  Subscriptions & Platform Accounting
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('admin@apexmaterials.com');
                  setPassword('Apex@1234');
                }}
                className="p-2.5 bg-red-50 hover:bg-red-100/80 text-slate-900 rounded-xl border border-red-200/80 text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-[#D8232A] font-bold text-[11px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>End User</span>
                </div>
                <p className="text-[9px] text-slate-600 mt-0.5 leading-tight">
                  Factory CRM & Plant Operations
                </p>
              </button>
            </div>
          </div>

          {/* Footer Security Badges */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-bit Encrypted RLS</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Patterns Cloud v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
