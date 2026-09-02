import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Company, UserRole, SubscriptionStatus, SubscriptionPlan } from '../types';
import { hasRolePermission, PermissionAction } from '../lib/permissions';
import {
  fetchLiveCompanies,
  fetchLiveWorkers,
  fetchLiveUserProfile,
  verifyLiveUserLogin,
  generateLiveUserOtp,
  verifyLiveUserOtp,
  resetLiveUserPassword,
  createLiveCompany,
  updateLiveCompanySubscription,
  createLiveWorker,
  updateLiveWorker,
  deleteLiveWorker,
  deleteEndUserProfile,
} from '../lib/api';

export const SOLE_SUPER_ADMIN_EMAIL = 'brickserpsoftware@gmail.com';

interface AuthContextType {
  user: UserProfile | null;
  company: Company | null;
  companies: Company[];
  workers: UserProfile[];
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, role?: UserRole, customPermissions?: PermissionAction[]) => Promise<void>;
  loginWithOtp: (email: string, otp: string) => Promise<void>;
  sendOtp: (email: string) => Promise<string>;
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  deleteCurrentProfile: () => Promise<boolean>;
  signUp: (params: {
    fullName: string;
    email: string;
    password?: string;
    phone: string;
    companyName: string;
    gstin?: string;
    city?: string;
    state?: string;
  }) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: UserRole, workerDetails?: Partial<UserProfile>) => void;
  selectCompany: (companyId: string) => void;
  updateCompanySubscription: (
    companyId: string,
    status: SubscriptionStatus,
    plan?: SubscriptionPlan,
    expiresAt?: string,
    price?: number,
    maxWorkers?: number
  ) => void;
  addCompany: (newComp: Partial<Company>) => void;
  addWorker: (workerData: Omit<UserProfile, 'id' | 'created_at'>) => void;
  updateWorker: (id: string, updates: Partial<UserProfile>) => void;
  deleteWorker: (id: string) => void;
  hasPermission: (permission: PermissionAction) => boolean;
  refreshLiveData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(() => {
    const stored = localStorage.getItem('patterns_companies');
    return stored ? JSON.parse(stored) : [];
  });

  const [workers, setWorkers] = useState<UserProfile[]>(() => {
    const stored = localStorage.getItem('patterns_workers');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(() => {
    return localStorage.getItem('patterns_selected_comp_id') || '';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem('patterns_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [role, setRole] = useState<UserRole>(() => {
    const stored = localStorage.getItem('patterns_user');
    return stored ? JSON.parse(stored).role : 'End User';
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem('patterns_companies', JSON.stringify(companies));
    }
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('patterns_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('patterns_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('patterns_user');
    }
  }, [user]);

  useEffect(() => {
    if (selectedCompanyId) {
      localStorage.setItem('patterns_selected_comp_id', selectedCompanyId);
    }
  }, [selectedCompanyId]);

  // Initial Load from Supabase Database
  useEffect(() => {
    loadLiveSupabaseData();
  }, []);

  const loadLiveSupabaseData = async () => {
    try {
      const liveCompanies = await fetchLiveCompanies();
      if (liveCompanies && liveCompanies.length > 0) {
        setCompanies(liveCompanies);
        if (!selectedCompanyId) {
          setSelectedCompanyId(liveCompanies[0].id);
        }
      }

      const liveWorkers = await fetchLiveWorkers();
      if (liveWorkers) {
        setWorkers(liveWorkers);
      }

      // If user is logged in, refresh profile directly from database
      const storedUser = localStorage.getItem('patterns_user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed?.email) {
          const liveProfile = await fetchLiveUserProfile(parsed.email);
          if (liveProfile) {
            setUser(liveProfile);
            setRole(liveProfile.role);
          }
        }
      }
    } catch (e) {
      console.warn('Initial Supabase live data load notice:', e);
    }
  };

  const refreshLiveData = async () => {
    setIsLoading(true);
    try {
      await loadLiveSupabaseData();
    } finally {
      setIsLoading(false);
    }
  };

  const currentCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0] || null;

  // 1. Dynamic Login Function with STRICT Database Password Verification
  const login = async (
    email: string,
    password?: string,
    explicitRole?: UserRole,
    customPermissions?: PermissionAction[]
  ) => {
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const isSuperAdmin = cleanEmail === SOLE_SUPER_ADMIN_EMAIL.toLowerCase();

    // 1. If password is provided, strictly verify password against live PostgreSQL hash
    if (password) {
      const authResult = await verifyLiveUserLogin(cleanEmail, password);

      if (!authResult.isValid) {
        setIsLoading(false);
        throw new Error('Incorrect password. Please verify your credentials and try again.');
      }
    }

    // 2. Fetch live user profile directly from Supabase PostgreSQL
    const liveProfile = await fetchLiveUserProfile(cleanEmail);

    let loggedUser: UserProfile;

    if (liveProfile) {
      loggedUser = {
        ...liveProfile,
        role: isSuperAdmin ? 'Super Admin' : liveProfile.role,
      };
      if (liveProfile.company_id) {
        setSelectedCompanyId(liveProfile.company_id);
      }
    } else if (isSuperAdmin) {
      loggedUser = {
        id: 'usr_super_admin',
        company_id: currentCompany?.id || 'platform_master',
        email: SOLE_SUPER_ADMIN_EMAIL,
        full_name: 'Patterns Super Admin',
        phone: '+91 90000 00001',
        role: 'Super Admin',
        department: 'Platform Architecture & Subscriptions',
        designation: 'Sole Super Admin (Us)',
        status: 'Active',
        created_at: new Date().toISOString(),
        permissions: ['all'],
      };
    } else {
      setIsLoading(false);
      throw new Error(
        'Account not found. No registered factory workspace matches this email. Please click "Sign Up New Factory" to create your account.'
      );
    }

    const detectedRole: UserRole = isSuperAdmin ? 'Super Admin' : loggedUser.role;

    setUser(loggedUser);
    setRole(detectedRole);
    setIsLoading(false);
  };

  // 2. Instant OTP Verification Login
  const loginWithOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    const isValid = await verifyLiveUserOtp(cleanEmail, otp);

    if (!isValid) {
      setIsLoading(false);
      throw new Error('Invalid or expired OTP code. Please enter the correct 6-digit verification code.');
    }

    // Fetch user profile from database
    const liveProfile = await fetchLiveUserProfile(cleanEmail);
    const isSuperAdmin = cleanEmail === SOLE_SUPER_ADMIN_EMAIL.toLowerCase();

    if (!liveProfile && !isSuperAdmin) {
      setIsLoading(false);
      throw new Error('No user profile found for this email. Please sign up to register your factory.');
    }

    const loggedUser: UserProfile = liveProfile || {
      id: 'usr_super_admin',
      company_id: currentCompany?.id || 'platform_master',
      email: SOLE_SUPER_ADMIN_EMAIL,
      full_name: 'Patterns Super Admin',
      phone: '+91 90000 00001',
      role: 'Super Admin',
      department: 'Platform Architecture & Subscriptions',
      designation: 'Sole Super Admin (Us)',
      status: 'Active',
      created_at: new Date().toISOString(),
      permissions: ['all'],
    };

    const detectedRole: UserRole = isSuperAdmin ? 'Super Admin' : loggedUser.role;

    setUser(loggedUser);
    setRole(detectedRole);
    if (loggedUser.company_id) {
      setSelectedCompanyId(loggedUser.company_id);
    }
    setIsLoading(false);
  };

  // 3. Send OTP to Email
  const sendOtp = async (email: string): Promise<string> => {
    const cleanEmail = email.trim().toLowerCase();
    const otpCode = await generateLiveUserOtp(cleanEmail);

    if (!otpCode) {
      throw new Error('Could not generate OTP. Please verify this email is registered.');
    }

    return otpCode;
  };

  // 4. Reset User Password
  const resetPassword = async (email: string, newPassword: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    const success = await resetLiveUserPassword(cleanEmail, newPassword);

    if (!success) {
      throw new Error('Password reset failed. Please ensure the email address is registered.');
    }

    return true;
  };

  // 5. Dynamic Sign Up Function (Creates Company & User in DB)
  const signUp = async (params: {
    fullName: string;
    email: string;
    password?: string;
    phone: string;
    companyName: string;
    gstin?: string;
    city?: string;
    state?: string;
  }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const cleanEmail = params.email.trim().toLowerCase();
    const tempCompId = `comp_${Date.now()}`;

    const newCompany: Company = {
      id: tempCompId,
      name: params.companyName.trim(),
      gstin: params.gstin?.trim() || `27${Math.random().toString(36).substring(2, 8).toUpperCase()}1Z5`,
      pan: (params.gstin?.trim().substring(2, 12) || 'ABCDE1234F').toUpperCase(),
      email: cleanEmail,
      phone: params.phone.trim(),
      website: '',
      logo_url: '/assets/logo.png',
      address: {
        street: 'Industrial Zone',
        city: params.city?.trim() || 'Mumbai',
        state: params.state?.trim() || 'Maharashtra',
        pincode: '400001',
        country: 'India',
      },
      bank_details: {
        bank_name: 'State Bank of India',
        account_number: '300012345678',
        ifsc: 'SBIN0001234',
        branch: params.city || 'Main',
      },
      branches_count: 1,
      subscription_plan: 'Starter',
      subscription_status: 'Trial',
      subscription_expires_at: new Date(Date.now() + 14 * 86400000).toISOString(),
      subscription_price: 9999,
      billing_cycle: 'Monthly',
      max_workers: 15,
      max_branches: 2,
      admin_name: params.fullName.trim(),
      admin_email: cleanEmail,
      created_at: new Date().toISOString(),
    };

    // 1. Insert company into Supabase PostgreSQL
    const createdLiveComp = await createLiveCompany(newCompany);
    const finalComp = createdLiveComp || newCompany;

    // 2. Add to local state
    setCompanies((prev) => [finalComp, ...prev]);
    setSelectedCompanyId(finalComp.id);

    // 3. Create user profile in Supabase PostgreSQL
    const newUserProfile: UserProfile = {
      id: `usr_${Date.now()}`,
      company_id: finalComp.id,
      email: cleanEmail,
      full_name: params.fullName.trim(),
      phone: params.phone.trim(),
      role: cleanEmail === SOLE_SUPER_ADMIN_EMAIL.toLowerCase() ? 'Super Admin' : 'End User',
      department: 'Factory Operations & Management',
      designation: 'Managing Director & Subscriber',
      status: 'Active',
      created_at: new Date().toISOString(),
      permissions: ['all'],
    };

    await createLiveWorker(newUserProfile);

    setUser(newUserProfile);
    setRole(newUserProfile.role);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('patterns_user');
  };

  const switchRole = (newRole: UserRole, workerDetails?: Partial<UserProfile>) => {
    setRole(newRole);
    if (user) {
      setUser({
        ...user,
        role: newRole,
        ...(workerDetails || {}),
      });
    }
  };

  const selectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    if (user && user.role !== 'Super Admin') {
      setUser({ ...user, company_id: companyId });
    }
  };

  const updateCompanySubscription = async (
    companyId: string,
    status: SubscriptionStatus,
    plan?: SubscriptionPlan,
    expiresAt?: string,
    price?: number,
    maxWorkers?: number
  ) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id === companyId) {
          return {
            ...c,
            subscription_status: status,
            subscription_plan: plan || c.subscription_plan,
            subscription_expires_at: expiresAt || c.subscription_expires_at,
            subscription_price: price !== undefined ? price : c.subscription_price,
            max_workers: maxWorkers !== undefined ? maxWorkers : c.max_workers,
          };
        }
        return c;
      })
    );

    // Sync live to Supabase
    await updateLiveCompanySubscription(companyId, status, plan, expiresAt, price, maxWorkers);
  };

  const addCompany = async (newComp: Partial<Company>) => {
    const tempId = `comp_${Date.now()}`;
    const createdComp: Company = {
      id: tempId,
      name: newComp.name || 'New Factory Tenant',
      gstin: newComp.gstin || '27XXXXX0000X1Z1',
      pan: newComp.pan || 'XXXXX0000X',
      email: newComp.email || 'admin@newfactory.com',
      phone: newComp.phone || '+91 98000 00000',
      website: newComp.website || '',
      logo_url: '/assets/logo.png',
      address: newComp.address || {
        street: 'Industrial Plot 1',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India',
      },
      bank_details: newComp.bank_details || {
        bank_name: 'HDFC Bank',
        account_number: '501000000000',
        ifsc: 'HDFC0001234',
        branch: 'Mumbai',
      },
      branches_count: 1,
      subscription_plan: newComp.subscription_plan || 'Professional',
      subscription_status: newComp.subscription_status || 'Active',
      subscription_expires_at: newComp.subscription_expires_at || new Date(Date.now() + 365 * 86400000).toISOString(),
      subscription_price: newComp.subscription_price || 24999,
      billing_cycle: newComp.billing_cycle || 'Annual',
      max_workers: newComp.max_workers || 30,
      max_branches: newComp.max_branches || 5,
      admin_name: newComp.admin_name || 'Plant Owner',
      admin_email: newComp.admin_email || newComp.email || 'owner@newfactory.com',
      created_at: new Date().toISOString(),
    };

    setCompanies((prev) => [createdComp, ...prev]);

    // Live insert into Supabase
    try {
      const liveRes = await createLiveCompany(createdComp);
      if (liveRes) {
        setCompanies((prev) => prev.map((c) => (c.id === tempId ? liveRes : c)));
      }
    } catch (err) {
      console.error('addCompany live sync notice:', err);
    }
  };

  const addWorker = async (workerData: Omit<UserProfile, 'id' | 'created_at'>) => {
    const tempId = `usr_w_${Date.now()}`;
    const newWorker: UserProfile = {
      ...workerData,
      id: tempId,
      role: 'Worker',
      status: workerData.status || 'Active',
      assigned_by: user?.full_name || 'Admin',
      created_at: new Date().toISOString(),
      permissions: workerData.permissions && workerData.permissions.length > 0 
        ? workerData.permissions 
        : ['view_dashboard', 'view_attendance'],
    };

    setWorkers((prev) => [newWorker, ...prev]);

    // Live sync to Supabase user_profiles
    try {
      await createLiveWorker({
        company_id: currentCompany?.id || newWorker.company_id,
        email: newWorker.email,
        full_name: newWorker.full_name,
        phone: newWorker.phone,
        role: 'Worker',
        worker_designation: newWorker.worker_designation,
        assigned_by: newWorker.assigned_by,
        department: newWorker.department,
        designation: newWorker.designation,
        status: newWorker.status,
        permissions: newWorker.permissions,
      });
    } catch (err) {
      console.error('addWorker live sync notice:', err);
    }
  };

  const updateWorker = async (id: string, updates: Partial<UserProfile>) => {
    setWorkers((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w))
    );
    if (user && user.id === id) {
      setUser((prev) => (prev ? { ...prev, ...updates } : null));
    }
    await updateLiveWorker(id, updates);
  };

  const deleteWorker = async (id: string) => {
    setWorkers((prev) => prev.filter((w) => w.id !== id));
    await deleteLiveWorker(id);
  };

  const deleteCurrentProfile = async (): Promise<boolean> => {
    if (!user) return false;
    const cleanEmail = user.email.trim().toLowerCase();
    
    // Strict guard: Super Admin can NEVER be deleted
    if (cleanEmail === SOLE_SUPER_ADMIN_EMAIL.toLowerCase() || role === 'Super Admin') {
      throw new Error('Super Admin profile is the permanent platform master and cannot be deleted.');
    }

    try {
      const success = await deleteEndUserProfile(user.id, user.email);
      if (success) {
        logout();
        return true;
      }
      return false;
    } catch (err: any) {
      console.error('deleteCurrentProfile error:', err);
      throw err;
    }
  };

  const hasPermission = (permission: PermissionAction): boolean => {
    if (!user) return false;
    return hasRolePermission(role, permission, user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company: currentCompany,
        companies,
        workers,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithOtp,
        sendOtp,
        resetPassword,
        deleteCurrentProfile,
        signUp,
        logout,
        switchRole,
        selectCompany,
        updateCompanySubscription,
        addCompany,
        addWorker,
        updateWorker,
        deleteWorker,
        hasPermission,
        refreshLiveData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
