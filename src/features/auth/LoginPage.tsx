import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Lock,
  Mail,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  Eye,
  EyeOff,
  Crown,
  Building2,
  User,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginWithOtp, sendOtp, resetPassword, signUp, isLoading, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Primary Tab: 'signin' vs 'signup'
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>(() => {
    return searchParams.get('tab') === 'signup' ? 'signup' : 'signin';
  });

  // Sign In states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Forgot Password modal progressive states: 'email' -> 'otp' -> 'new_password'
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'new_password'>('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  // Sign Up states for new factory registration
  const [suFullName, setSuFullName] = useState('');
  const [suCompanyName, setSuCompanyName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPhone, setSuPhone] = useState('');
  const [suCity, setSuCity] = useState('');
  const [suState, setSuState] = useState('Maharashtra');
  const [suGstin, setSuGstin] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suShowPassword, setSuShowPassword] = useState(false);

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup' || tab === 'signin') {
      setAuthTab(tab);
    }
  }, [searchParams]);

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

  // Handle Sign In (Password or OTP)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'password') {
        if (!password) {
          setErrorMsg('Please enter your password.');
          return;
        }
        await login(email, password);
      } else {
        // OTP Login mode
        if (!otpCode || otpCode.length < 6) {
          setErrorMsg('Please enter the complete 6-digit verification code.');
          return;
        }
        await loginWithOtp(email, otpCode);
      }

      if (email.trim().toLowerCase() === 'brickserpsoftware@gmail.com') {
        navigate('/app/super-admin');
      } else {
        navigate('/app/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please verify credentials.');
    }
  };

  // Handle OTP Send for Login
  const handleSendLoginOtp = async () => {
    if (!email) {
      setErrorMsg('Please enter your official email address first.');
      return;
    }
    setErrorMsg('');
    try {
      await sendOtp(email);
      setOtpSent(true);
      setSuccessMsg(`Verification code sent to ${email}. Please check your email inbox.`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not send OTP. Please verify email.');
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suEmail || !suCompanyName || !suFullName) return;
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await signUp({
        fullName: suFullName,
        email: suEmail,
        password: suPassword,
        phone: suPhone,
        companyName: suCompanyName,
        gstin: suGstin,
        city: suCity,
        state: suState,
      });
      if (suEmail.trim().toLowerCase() === 'brickserpsoftware@gmail.com') {
        navigate('/app/super-admin');
      } else {
        navigate('/app/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please check details.');
    }
  };

  // Forgot Password: Step 1 -> Send OTP
  const handleForgotSendOtp = async () => {
    if (!forgotEmail) {
      setForgotError('Please enter your registered email address.');
      return;
    }
    setForgotError('');
    setForgotLoading(true);
    try {
      await sendOtp(forgotEmail);
      setForgotStep('otp');
      setForgotSuccess(`Verification code sent to ${forgotEmail}. Please check your email.`);
    } catch (err: any) {
      setForgotError(err.message || 'Could not send OTP. Please verify this email is registered.');
    } finally {
      setForgotLoading(false);
    }
  };

  // Forgot Password: Step 2 -> Verify OTP
  const handleForgotVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotOtp || forgotOtp.trim().length < 6) {
      setForgotError('Please enter the full 6-digit verification code.');
      return;
    }
    setForgotError('');
    setForgotLoading(true);
    try {
      const { verifyLiveUserOtp } = await import('../../lib/api');
      const isValid = await verifyLiveUserOtp(forgotEmail, forgotOtp);

      if (!isValid) {
        setForgotError('Invalid or expired OTP code. Please check your email or request a new code.');
        setForgotLoading(false);
        return;
      }

      setForgotSuccess('Code verified successfully! You can now set your new password.');
      setForgotStep('new_password');
    } catch (err: any) {
      setForgotError(err.message || 'Failed to verify OTP code.');
    } finally {
      setForgotLoading(false);
    }
  };

  // Forgot Password: Step 3 -> Set New Password
  const handleForgotSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotNewPassword || forgotNewPassword.length < 6) {
      setForgotError('New password must be at least 6 characters.');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError('Passwords do not match. Please ensure both fields are identical.');
      return;
    }

    setForgotError('');
    setForgotLoading(true);
    try {
      await resetPassword(forgotEmail, forgotNewPassword);
      setForgotSuccess('Password updated successfully! Redirecting to sign in...');
      setTimeout(() => {
        setIsForgotModalOpen(false);
        setEmail(forgotEmail);
        setPassword('');
        setMode('password');
        setSuccessMsg('Your password has been reset. Please sign in with your new password.');
      }, 1200);
    } catch (err: any) {
      setForgotError(err.message || 'Password reset failed.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Soft Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-red-100/40 blur-[140px] rounded-full pointer-events-none" />
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

      {/* Main Authentication Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <div className="bg-white py-7 px-6 shadow-xl border border-slate-200/90 rounded-3xl space-y-5">
          {/* Main Top Switcher: Sign In vs Sign Up */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setAuthTab('signin');
                setSearchParams({ tab: 'signin' });
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                authTab === 'signin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In to Account
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthTab('signup');
                setSearchParams({ tab: 'signup' });
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authTab === 'signup'
                  ? 'bg-[#D8232A] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sign Up New Factory</span>
            </button>
          </div>

          {/* Feedback Banners */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* 1. SIGN IN FORM */}
          {/* ========================================================= */}
          {authTab === 'signin' ? (
            <div className="space-y-4">
              {/* Secondary Auth Method Tabs: Password vs OTP */}
              <div className="flex border-b border-slate-200 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('password');
                    setErrorMsg('');
                  }}
                  className={`flex-1 text-center py-1.5 text-xs font-bold transition-all border-b-2 ${
                    mode === 'password'
                      ? 'border-[#D8232A] text-[#D8232A]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Email & Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('otp');
                    setErrorMsg('');
                  }}
                  className={`flex-1 text-center py-1.5 text-xs font-bold transition-all border-b-2 ${
                    mode === 'otp'
                      ? 'border-[#D8232A] text-[#D8232A]'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Instant OTP Login
                </button>
              </div>

              <form className="space-y-3.5" onSubmit={handleSignIn}>
                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
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
                  /* Password Field */
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email);
                          setForgotError('');
                          setForgotSuccess('');
                          setForgotStep('email');
                          setForgotOtp('');
                          setForgotNewPassword('');
                          setForgotConfirmPassword('');
                          setIsForgotModalOpen(true);
                        }}
                        className="text-[11px] text-[#D8232A] hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Instant OTP Field */
                  <div className="space-y-2.5">
                    {!otpSent ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full text-xs font-bold py-2.5 bg-slate-50 hover:bg-slate-100 border-slate-300"
                        onClick={handleSendLoginOtp}
                      >
                        Send 6-Digit Login Code
                      </Button>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                            Enter Verification Code
                          </label>
                          <button
                            type="button"
                            onClick={handleSendLoginOtp}
                            className="text-[10px] text-[#D8232A] font-bold hover:underline"
                          >
                            Resend Code
                          </button>
                        </div>
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
            </div>
          ) : (
            /* ========================================================= */
            /* 2. SIGN UP / NEW FACTORY REGISTRATION FORM */
            /* ========================================================= */
            <form className="space-y-3" onSubmit={handleSignUp}>
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={suFullName}
                    onChange={(e) => setSuFullName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Factory / Company Legal Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={suCompanyName}
                    onChange={(e) => setSuCompanyName(e.target.value)}
                    placeholder="e.g. Sunrise Eco-Bricks & Concrete Works"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Official Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={suEmail}
                      onChange={(e) => setSuEmail(e.target.value)}
                      placeholder="owner@plant.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Mobile Phone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={suPhone}
                      onChange={(e) => setSuPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Plant City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={suCity}
                      onChange={(e) => setSuCity(e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    State
                  </label>
                  <select
                    value={suState}
                    onChange={(e) => setSuState(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={suShowPassword ? 'text' : 'password'}
                    required
                    value={suPassword}
                    onChange={(e) => setSuPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-10 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setSuShowPassword(!suShowPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    {suShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-full py-3 shadow-lg shadow-red-600/20 text-xs font-bold uppercase tracking-wider rounded-xl mt-3"
                isLoading={isLoading}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Register & Launch Factory OS
              </Button>
            </form>
          )}

          {/* Footer Security Badges */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>256-bit Encrypted Database</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Patterns Cloud v2.4</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. FORGOT PASSWORD MODAL (PROGRESSIVE 3-STEP VERIFICATION) */}
      {/* ========================================================= */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => {
          setIsForgotModalOpen(false);
          setForgotStep('email');
          setForgotError('');
          setForgotSuccess('');
        }}
        title="Reset Account Password"
      >
        <div className="space-y-4">
          {/* Feedback alerts */}
          {forgotError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{forgotError}</span>
            </div>
          )}

          {forgotSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{forgotSuccess}</span>
            </div>
          )}

          {/* STEP 1: ENTER EMAIL */}
          {forgotStep === 'email' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleForgotSendOtp();
              }}
              className="space-y-3.5"
            >
              <p className="text-xs text-slate-500">
                Enter your registered official email address. We will send a 6-digit security verification code to your inbox.
              </p>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl mt-2"
                isLoading={forgotLoading}
              >
                Send 6-Digit Verification Code
              </Button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP CODE */}
          {forgotStep === 'otp' && (
            <form onSubmit={handleForgotVerifyOtp} className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Sent to: <strong className="text-slate-800">{forgotEmail}</strong></span>
                <button
                  type="button"
                  onClick={() => setForgotStep('email')}
                  className="text-[#D8232A] hover:underline font-semibold text-[11px]"
                >
                  Change Email
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Enter 6-Digit OTP Code
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotSendOtp}
                    className="text-[10px] text-[#D8232A] font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-900 font-mono tracking-widest text-center font-bold focus:outline-none focus:border-[#D8232A] focus:bg-white"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl mt-2"
                isLoading={forgotLoading}
              >
                Verify Code & Proceed
              </Button>
            </form>
          )}

          {/* STEP 3: SET NEW PASSWORD */}
          {forgotStep === 'new_password' && (
            <form onSubmit={handleForgotSetPassword} className="space-y-3.5">
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Identity verified for {forgotEmail}</span>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={forgotConfirmPassword}
                    onChange={(e) => setForgotConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#D8232A] focus:bg-white"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-full py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl mt-2"
                isLoading={forgotLoading}
              >
                Set New Password & Sign In
              </Button>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};
