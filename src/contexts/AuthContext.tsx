import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Company, UserRole } from '../types';
import { hasRolePermission, PermissionAction } from '../lib/permissions';

interface AuthContextType {
  user: UserProfile | null;
  company: Company | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  hasPermission: (permission: PermissionAction) => boolean;
}

const DEFAULT_COMPANY: Company = {
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
  created_at: '2024-01-15T00:00:00Z',
};

const DEFAULT_USER: UserProfile = {
  id: 'usr_1001',
  company_id: 'comp_77283',
  branch_id: 'br_mumbai_hq',
  email: 'admin@apexmaterials.com',
  full_name: 'Vikramaditya Sharma',
  phone: '+91 98200 11223',
  role: 'Company Admin',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  department: 'Executive Management',
  designation: 'Managing Director & CEO',
  status: 'Active',
  created_at: '2024-01-15T00:00:00Z',
  permissions: ['all'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem('patterns_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [company, setCompany] = useState<Company | null>(() => {
     return localStorage.getItem('patterns_user') ? DEFAULT_COMPANY : null;
  });
  const [role, setRole] = useState<UserRole>(() => {
      const stored = localStorage.getItem('patterns_user');
      return stored ? JSON.parse(stored).role : 'Company Admin';
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('patterns_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('patterns_user');
    }
  }, [user]);

  const login = async (email: string, selectedRole: UserRole = 'Company Admin') => {
    setIsLoading(true);
    // Simulate auth latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const loggedUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      role: selectedRole,
      full_name: email.split('@')[0].toUpperCase().replace('.', ' '),
    };

    setUser(loggedUser);
    setRole(selectedRole);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('patterns_user');
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
    }
  };

  const hasPermission = (permission: PermissionAction): boolean => {
    if (!user) return false;
    return hasRolePermission(role, permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
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
