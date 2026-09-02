import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Company, UserRole, SubscriptionStatus, SubscriptionPlan } from '../types';
import { hasRolePermission, PermissionAction, AVAILABLE_WORKER_PERMISSIONS } from '../lib/permissions';
import {
  fetchLiveCompanies,
  fetchLiveWorkers,
  createLiveCompany,
  updateLiveCompanySubscription,
  createLiveWorker,
  updateLiveWorker,
  deleteLiveWorker,
} from '../lib/api';

interface AuthContextType {
  user: UserProfile | null;
  company: Company | null;
  companies: Company[];
  workers: UserProfile[];
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, role?: UserRole, customPermissions?: PermissionAction[]) => Promise<void>;
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
}

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp_77283',
    name: 'Apex Construction Materials & Aggregates Pvt Ltd',
    gstin: '27AAACA12341Z5',
    pan: 'AAACA12341',
    email: 'operations@apexmaterials.com',
    phone: '+91 98765 43210',
    website: 'https://apexmaterials.com',
    logo_url: '/assets/logo.png',
    address: {
      street: 'Industrial Zone, Plot 45-B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400072',
      country: 'India',
    },
    bank_details: {
      bank_name: 'HDFC Bank Ltd',
      account_number: '50200049182310',
      ifsc: 'HDFC0000123',
      branch: 'Andheri East, Mumbai',
    },
    branches_count: 4,
    subscription_plan: 'Enterprise',
    subscription_status: 'Active',
    subscription_expires_at: '2027-08-31T23:59:59Z',
    subscription_price: 49999,
    billing_cycle: 'Annual',
    max_workers: 100,
    max_branches: 15,
    admin_name: 'Vikramaditya Sharma',
    admin_email: 'admin@apexmaterials.com',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'comp_88392',
    name: 'Bharath Eco-Bricks & Pavers Ltd',
    gstin: '29BBBCB98762Z1',
    pan: 'BBBCB98762',
    email: 'contact@bharathecobricks.in',
    phone: '+91 98450 11223',
    website: 'https://bharathecobricks.in',
    address: {
      street: 'Peenya Industrial Area, Phase III',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560058',
      country: 'India',
    },
    bank_details: {
      bank_name: 'State Bank of India',
      account_number: '309988776655',
      ifsc: 'SBIN0001234',
      branch: 'Peenya, Bengaluru',
    },
    branches_count: 2,
    subscription_plan: 'Professional',
    subscription_status: 'Active',
    subscription_expires_at: '2027-03-15T23:59:59Z',
    subscription_price: 24999,
    billing_cycle: 'Annual',
    max_workers: 30,
    max_branches: 5,
    admin_name: 'Kavitha Ramesh',
    admin_email: 'kavitha@bharathecobricks.in',
    created_at: '2024-03-10T00:00:00Z',
  },
  {
    id: 'comp_99401',
    name: 'Shanti Ready Mix Concrete & Blocks',
    gstin: '24CCCDC54323Z9',
    pan: 'CCCDC54323',
    email: 'admin@shantirmc.com',
    phone: '+91 98250 88990',
    website: 'https://shantirmc.com',
    address: {
      street: 'GIDC Industrial Estate, Sector 28',
      city: 'Gandhinagar',
      state: 'Gujarat',
      pincode: '382028',
      country: 'India',
    },
    bank_details: {
      bank_name: 'ICICI Bank Ltd',
      account_number: '002305012345',
      ifsc: 'ICIC0000023',
      branch: 'Gandhinagar',
    },
    branches_count: 1,
    subscription_plan: 'Starter',
    subscription_status: 'Trial',
    subscription_expires_at: '2026-09-14T23:59:59Z',
    subscription_price: 9999,
    billing_cycle: 'Monthly',
    max_workers: 10,
    max_branches: 2,
    admin_name: 'Hitesh Patel',
    admin_email: 'hitesh@shantirmc.com',
    created_at: '2026-08-15T00:00:00Z',
  },
  {
    id: 'comp_11029',
    name: 'Deccan Aggregates & Stone Crusher Plant',
    gstin: '36DDDCD43214Z8',
    pan: 'DDDCD43214',
    email: 'finance@deccanaggregates.com',
    phone: '+91 94400 33221',
    address: {
      street: 'Nacharam Industrial Area',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500076',
      country: 'India',
    },
    bank_details: {
      bank_name: 'Axis Bank',
      account_number: '9180200334455',
      ifsc: 'UTIB0000456',
      branch: 'Secunderabad',
    },
    branches_count: 3,
    subscription_plan: 'Professional',
    subscription_status: 'Suspended',
    subscription_expires_at: '2026-07-31T23:59:59Z',
    subscription_price: 24999,
    billing_cycle: 'Annual',
    max_workers: 30,
    max_branches: 5,
    admin_name: 'Srinivas Reddy',
    admin_email: 'srinivas@deccanaggregates.com',
    created_at: '2023-11-20T00:00:00Z',
  },
];

export const INITIAL_WORKERS: UserProfile[] = [
  {
    id: 'usr_w_101',
    company_id: 'comp_77283',
    branch_id: 'br_1',
    email: 'ramesh.production@apexmaterials.com',
    full_name: 'Ramesh Powar',
    phone: '+91 98200 44551',
    role: 'Worker',
    worker_designation: 'Senior Plant & Production Operator',
    department: 'Production & Machinery',
    designation: 'Plant Shift Incharge',
    status: 'Active',
    assigned_by: 'Vikramaditya Sharma (Admin)',
    created_at: '2024-02-01T00:00:00Z',
    permissions: [
      'view_dashboard',
      'view_production',
      'manage_production',
      'view_inventory',
      'manage_inventory',
      'view_attendance',
    ],
  },
  {
    id: 'usr_w_102',
    company_id: 'comp_77283',
    branch_id: 'br_1',
    email: 'manoj.dispatch@apexmaterials.com',
    full_name: 'Manoj Salve',
    phone: '+91 98200 44552',
    role: 'Worker',
    worker_designation: 'Logistics & Dispatch Coordinator',
    department: 'Dispatch & Fleet',
    designation: 'Weighbridge & Gate Pass Officer',
    status: 'Active',
    assigned_by: 'Vikramaditya Sharma (Admin)',
    created_at: '2024-02-15T00:00:00Z',
    permissions: [
      'view_dashboard',
      'view_delivery',
      'manage_delivery',
      'view_inventory',
      'view_attendance',
    ],
  },
  {
    id: 'usr_w_103',
    company_id: 'comp_77283',
    branch_id: 'br_2',
    email: 'anita.sales@apexmaterials.com',
    full_name: 'Anita Joshi',
    phone: '+91 98200 44553',
    role: 'Worker',
    worker_designation: 'Sales & Client Order Executive',
    department: 'Sales & Commercial',
    designation: 'Sales Representative',
    status: 'Active',
    assigned_by: 'Vikramaditya Sharma (Admin)',
    created_at: '2024-03-01T00:00:00Z',
    permissions: [
      'view_dashboard',
      'view_sales',
      'manage_sales',
      'view_customers',
      'manage_customers',
      'view_products',
      'view_crm',
      'view_attendance',
    ],
  },
  {
    id: 'usr_w_104',
    company_id: 'comp_77283',
    branch_id: 'br_1',
    email: 'kiran.wages@apexmaterials.com',
    full_name: 'Kiran Gokhale',
    phone: '+91 98200 44554',
    role: 'Worker',
    worker_designation: 'Labour Attendance & Piece-Rate Supervisor',
    department: 'Factory Operations',
    designation: 'Floor Supervisor',
    status: 'Active',
    assigned_by: 'Vikramaditya Sharma (Admin)',
    created_at: '2024-03-10T00:00:00Z',
    permissions: [
      'view_dashboard',
      'view_labour_wages',
      'manage_labour_wages',
      'view_attendance',
      'manage_attendance',
    ],
  },
];

export const SOLE_SUPER_ADMIN_EMAIL = 'brickserpsoftware@gmail.com';

const DEFAULT_SUPER_ADMIN: UserProfile = {
  id: 'usr_super_001',
  company_id: 'platform_master',
  email: 'brickserpsoftware@gmail.com',
  full_name: 'Patterns Cloud Platform Owner',
  phone: '+91 90000 00001',
  role: 'Super Admin',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  department: 'Platform Architecture & Licensing',
  designation: 'Sole Platform Owner & Super Admin',
  status: 'Active',
  created_at: '2023-01-01T00:00:00Z',
  permissions: ['all'],
};

const DEFAULT_END_USER: UserProfile = {
  id: 'usr_enduser_1001',
  company_id: 'comp_77283',
  branch_id: 'br_1',
  email: 'admin@apexmaterials.com',
  full_name: 'Vikramaditya Sharma',
  phone: '+91 98200 11223',
  role: 'End User',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  department: 'Plant Operations & Management',
  designation: 'Factory Client & Business Owner',
  status: 'Active',
  created_at: '2024-01-15T00:00:00Z',
  permissions: ['all'],
};

const DEFAULT_ADMIN = DEFAULT_END_USER;

const DEFAULT_WORKER: UserProfile = {
  id: 'usr_worker_2001',
  company_id: 'comp_77283',
  branch_id: 'br_1',
  email: 'worker@apexmaterials.com',
  full_name: 'Ramesh Powar (Factory Worker)',
  phone: '+91 98200 44551',
  role: 'Worker',
  worker_designation: 'Production & Machinery Operator',
  avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  department: 'Plant Operations',
  designation: 'Machine Operator & Batch Incharge',
  status: 'Active',
  assigned_by: 'Vikramaditya Sharma (Admin)',
  created_at: '2024-02-01T00:00:00Z',
  permissions: [
    'view_dashboard',
    'view_production',
    'manage_production',
    'view_inventory',
    'view_delivery',
    'view_attendance',
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(() => {
    const stored = localStorage.getItem('patterns_companies');
    return stored ? JSON.parse(stored) : INITIAL_COMPANIES;
  });

  const [workers, setWorkers] = useState<UserProfile[]>(() => {
    const stored = localStorage.getItem('patterns_workers');
    return stored ? JSON.parse(stored) : INITIAL_WORKERS;
  });

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(() => {
    const stored = localStorage.getItem('patterns_selected_comp_id');
    return stored || 'comp_77283';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem('patterns_user');
    return stored ? JSON.parse(stored) : DEFAULT_END_USER;
  });

  const [role, setRole] = useState<UserRole>(() => {
    const stored = localStorage.getItem('patterns_user');
    return stored ? JSON.parse(stored).role : 'End User';
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('patterns_companies', JSON.stringify(companies));
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
    localStorage.setItem('patterns_selected_comp_id', selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    // Initial fetch from live Supabase
    async function loadLiveSupabaseData() {
      try {
        const liveCompanies = await fetchLiveCompanies();
        if (liveCompanies && liveCompanies.length > 0) {
          setCompanies(liveCompanies);
        }
        const liveWorkers = await fetchLiveWorkers();
        if (liveWorkers && liveWorkers.length > 0) {
          setWorkers(liveWorkers);
        }
      } catch (e) {
        console.warn('Initial Supabase live data load notice:', e);
      }
    }
    loadLiveSupabaseData();
  }, []);

  const currentCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0] || null;

  const login = async (
    email: string,
    password?: string,
    explicitRole?: UserRole,
    customPermissions?: PermissionAction[]
  ) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const cleanEmail = email.trim().toLowerCase();
    let detectedRole: UserRole = explicitRole || 'End User';
    let loggedUser: UserProfile;

    if (cleanEmail === SOLE_SUPER_ADMIN_EMAIL.toLowerCase()) {
      detectedRole = 'Super Admin';
      loggedUser = { ...DEFAULT_SUPER_ADMIN, email: SOLE_SUPER_ADMIN_EMAIL };
    } else {
      detectedRole = explicitRole || 'End User';
      loggedUser = {
        ...DEFAULT_END_USER,
        email: cleanEmail,
        role: detectedRole,
        full_name: cleanEmail.split('@')[0].toUpperCase().replace('.', ' '),
      };
    }

    setUser(loggedUser);
    setRole(detectedRole);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('patterns_user');
  };

  const switchRole = (newRole: UserRole, workerDetails?: Partial<UserProfile>) => {
    setRole(newRole);
    if (newRole === 'Super Admin') {
      setUser(DEFAULT_SUPER_ADMIN);
    } else {
      setUser({
        ...DEFAULT_END_USER,
        role: newRole,
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
      const liveRes = await createLiveCompany({
        name: createdComp.name,
        gstin: createdComp.gstin,
        pan: createdComp.pan,
        email: createdComp.email,
        phone: createdComp.phone,
        address: createdComp.address,
        bank_details: createdComp.bank_details,
        subscription_plan: createdComp.subscription_plan,
        subscription_status: createdComp.subscription_status,
        subscription_price: createdComp.subscription_price,
        admin_name: createdComp.admin_name,
        admin_email: createdComp.admin_email,
        max_workers: createdComp.max_workers,
        max_branches: createdComp.max_branches,
      });
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
        logout,
        switchRole,
        selectCompany,
        updateCompanySubscription,
        addCompany,
        addWorker,
        updateWorker,
        deleteWorker,
        hasPermission,
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
