import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { useAuth } from '../../contexts/AuthContext';
import {
  Building2,
  MapPin,
  Users,
  Landmark,
  FileText,
  Plus,
  Edit,
  ShieldCheck,
  Mail,
  Phone,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles,
  KeyRound,
  Sliders,
  Trash2,
  UserCheck,
  UserX,
  Clock,
  Layers,
  Boxes,
  Truck,
  HardHat,
  IndianRupee,
  BarChart3,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import { Branch, UserProfile } from '../../types';
import { AVAILABLE_WORKER_PERMISSIONS, PermissionAction } from '../../lib/permissions';

export const CompanyPage: React.FC = () => {
  const { company, workers, addWorker, updateWorker, deleteWorker, switchRole, user } = useAuth();
  const [activeTab, setActiveTab] = useState('workers');
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<UserProfile | null>(null);

  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 'br_1',
      company_id: company?.id || 'comp_77283',
      name: 'Mumbai Central Plant (HQ)',
      code: 'MUM-01',
      gstin: company?.gstin || '27AAACA12341Z5',
      address: 'Plot 45-B, MIDC Industrial Zone, Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      is_headquarters: true,
      phone: '+91 98200 11223',
      email: 'mumbai@apexmaterials.com',
    },
    {
      id: 'br_2',
      company_id: company?.id || 'comp_77283',
      name: 'Pune Aggregate Depot',
      code: 'PUN-02',
      gstin: company?.gstin || '27AAACA12341Z5',
      address: 'Gate No 112, Chakan Industrial Area',
      city: 'Pune',
      state: 'Maharashtra',
      is_headquarters: false,
      phone: '+91 98211 44556',
      email: 'pune@apexmaterials.com',
    },
    {
      id: 'br_3',
      company_id: company?.id || 'comp_77283',
      name: 'Navi Mumbai RMC Plant',
      code: 'NVM-03',
      gstin: company?.gstin || '27AAACA12341Z5',
      address: 'Taloja Industrial Estate, Phase II',
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      is_headquarters: false,
      phone: '+91 98333 77889',
      email: 'taloja@apexmaterials.com',
    },
  ]);

  // Form states for adding worker
  const [workerName, setWorkerName] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');
  const [workerPhone, setWorkerPhone] = useState('');
  const [workerBranch, setWorkerBranch] = useState('br_1');
  const [workerDepartment, setWorkerDepartment] = useState('Plant Operations');
  const [workerDesignation, setWorkerDesignation] = useState('Production Machine Operator');
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionAction[]>([
    'view_dashboard',
    'view_production',
    'manage_production',
    'view_inventory',
    'view_attendance',
  ]);

  // Quick Preset Templates for Worker Permissions
  const handleApplyPreset = (presetType: string) => {
    switch (presetType) {
      case 'production':
        setWorkerDepartment('Plant Operations');
        setWorkerDesignation('Plant Machine & Batch Operator');
        setSelectedPermissions([
          'view_dashboard',
          'view_production',
          'manage_production',
          'view_inventory',
          'manage_inventory',
          'view_attendance',
        ]);
        break;
      case 'dispatch':
        setWorkerDepartment('Logistics & Fleet');
        setWorkerDesignation('Weighbridge & Dispatch Officer');
        setSelectedPermissions([
          'view_dashboard',
          'view_delivery',
          'manage_delivery',
          'view_inventory',
          'view_attendance',
        ]);
        break;
      case 'sales':
        setWorkerDepartment('Sales & Commercial');
        setWorkerDesignation('Sales Executive');
        setSelectedPermissions([
          'view_dashboard',
          'view_sales',
          'manage_sales',
          'view_customers',
          'manage_customers',
          'view_products',
          'view_crm',
          'view_attendance',
        ]);
        break;
      case 'wages':
        setWorkerDepartment('Factory Administration');
        setWorkerDesignation('Labour Wages Supervisor');
        setSelectedPermissions([
          'view_dashboard',
          'view_labour_wages',
          'manage_labour_wages',
          'view_attendance',
          'manage_attendance',
        ]);
        break;
      case 'warehouse':
        setWorkerDepartment('Stores & Inventory');
        setWorkerDesignation('Warehouse Storekeeper');
        setSelectedPermissions([
          'view_dashboard',
          'view_inventory',
          'manage_inventory',
          'view_products',
          'view_purchase',
          'view_attendance',
        ]);
        break;
      case 'all':
        setSelectedPermissions(AVAILABLE_WORKER_PERMISSIONS.map((p) => p.action));
        break;
      case 'clear':
        setSelectedPermissions(['view_dashboard', 'view_attendance']);
        break;
      default:
        break;
    }
  };

  const togglePermission = (action: PermissionAction) => {
    if (selectedPermissions.includes(action)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== action));
    } else {
      setSelectedPermissions([...selectedPermissions, action]);
    }
  };

  const handleCreateWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    addWorker({
      company_id: company.id,
      branch_id: workerBranch,
      email: workerEmail,
      full_name: workerName,
      phone: workerPhone,
      role: 'Worker',
      worker_designation: workerDesignation,
      department: workerDepartment,
      designation: workerDesignation,
      status: 'Active',
      permissions: selectedPermissions,
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    });

    setIsAddWorkerOpen(false);
    setWorkerName('');
    setWorkerEmail('');
    setWorkerPhone('');
  };

  const handleSaveEditWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorker) return;

    updateWorker(editingWorker.id, {
      full_name: editingWorker.full_name,
      phone: editingWorker.phone,
      department: editingWorker.department,
      designation: editingWorker.designation,
      worker_designation: editingWorker.worker_designation,
      status: editingWorker.status,
      permissions: editingWorker.permissions,
    });

    setEditingWorker(null);
  };

  const handleSimulateLogin = (worker: UserProfile) => {
    switchRole('Worker', worker);
  };

  const tabs = [
    { id: 'workers', label: 'Workers & Role Access', count: workers.length, icon: <Users className="w-4 h-4" /> },
    { id: 'subscription', label: 'Subscription & License', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'branches', label: 'Plant Branches', count: branches.length, icon: <MapPin className="w-4 h-4" /> },
    { id: 'profile', label: 'Company Profile & Taxes', icon: <Building2 className="w-4 h-4" /> },
  ];

  const expiryFormatted = company?.subscription_expires_at
    ? new Date(company.subscription_expires_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '2027-08-31';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-950 font-heading">
              Company & Worker Access Management
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-red-50 text-[#D8232A] border border-red-100 rounded-md">
              Admin Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Manage worker profiles, assign module access permissions, check plant branches & subscription status
          </p>
        </div>

        {activeTab === 'workers' && (
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddWorkerOpen(true)}
            className="shadow-md shadow-[#D8232A]/20"
          >
            Create Worker Profile
          </Button>
        )}

        {activeTab === 'branches' && (
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddBranchOpen(true)}
          >
            Add New Branch
          </Button>
        )}
      </div>

      {/* Subscription Alert / Status Banner */}
      {company && (
        <div
          className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            company.subscription_status === 'Active'
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : company.subscription_status === 'Trial'
              ? 'bg-amber-50/70 border-amber-200 text-amber-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                company.subscription_status === 'Active'
                  ? 'bg-emerald-600 text-white'
                  : company.subscription_status === 'Trial'
                  ? 'bg-amber-600 text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              {company.subscription_status === 'Active' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : company.subscription_status === 'Trial' ? (
                <Clock className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">
                {company.name} — {company.subscription_plan} License ({company.subscription_status})
              </p>
              <p className="text-xs opacity-80">
                Valid until <span className="font-semibold">{expiryFormatted}</span> • Capacity:{' '}
                <span className="font-semibold">
                  {workers.length} / {company.max_workers || 50} Workers Active
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-1 bg-white/80 rounded-md border border-slate-200 text-slate-700">
              Managed by Super Admin
            </span>
          </div>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* TAB 1: WORKERS & ROLE ACCESS (MAIN REQUIREMENT) */}
      {activeTab === 'workers' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <CardTitle className="text-base font-black">
                  Worker Accounts & Access Permissions
                </CardTitle>
                <p className="text-xs text-slate-500">
                  As the Company Admin, you create worker profiles and give exact permission to what they can access in your ERP.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => setIsAddWorkerOpen(true)}
              >
                Add Worker Profile
              </Button>
            </CardHeader>

            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                  <tr>
                    <th className="p-3.5">Worker Name & Email</th>
                    <th className="p-3.5">Designation & Department</th>
                    <th className="p-3.5">Allowed ERP Modules</th>
                    <th className="p-3.5">Assigned By</th>
                    <th className="p-3.5 text-center">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {workers.map((w) => {
                    const assignedList = w.permissions || [];
                    return (
                      <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-red-50 text-[#D8232A] font-black flex items-center justify-center border border-red-200 shrink-0">
                              {w.full_name[0]}
                            </div>
                            <div>
                              <div>{w.full_name}</div>
                              <div className="text-[10px] text-slate-500 font-normal font-mono">{w.email}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{w.phone}</div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-slate-800">{w.worker_designation || w.designation}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{w.department}</div>
                        </td>

                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1 max-w-md">
                            {assignedList.slice(0, 4).map((perm) => (
                              <span
                                key={perm}
                                className="px-2 py-0.5 text-[9px] font-bold bg-slate-100 text-slate-700 rounded border border-slate-200"
                              >
                                {perm.replace('view_', '').replace('manage_', '').replace('_', ' ').toUpperCase()}
                              </span>
                            ))}
                            {assignedList.length > 4 && (
                              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-red-50 text-[#D8232A] rounded border border-red-100">
                                +{assignedList.length - 4} more
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-3.5 text-slate-500 text-[11px] font-medium">
                          {w.assigned_by || 'Company Admin'}
                        </td>

                        <td className="p-3.5 text-center">
                          <Badge variant={w.status === 'Active' ? 'success' : 'danger'}>
                            {w.status}
                          </Badge>
                        </td>

                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Simulate Login as this worker */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[10px] font-bold h-7 px-2 border-slate-300 hover:border-[#D8232A]"
                              onClick={() => handleSimulateLogin(w)}
                              title="Test how worker sees the CRM"
                            >
                              <KeyRound className="w-3 h-3 mr-1 text-[#D8232A]" /> Test Access View
                            </Button>

                            {/* Edit Worker */}
                            <button
                              onClick={() => setEditingWorker(w)}
                              className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                              title="Edit Worker Permissions"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Worker */}
                            <button
                              onClick={() => deleteWorker(w.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Delete Worker Profile"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: SUBSCRIPTION & LICENSE INFORMATION */}
      {activeTab === 'subscription' && company && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Current SaaS Subscription Plan</CardTitle>
              <Badge variant={company.subscription_status === 'Active' ? 'success' : 'warning'}>
                {company.subscription_status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50/50 rounded-2xl border border-red-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-black text-[#D8232A] tracking-wider">Active Tier</span>
                  <h3 className="text-2xl font-black text-slate-950 font-heading">
                    {company.subscription_plan} Enterprise Edition
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    Licensed to {company.name} for Multi-plant Operations
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 font-mono">
                    ₹{company.subscription_price?.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">
                    per {company.billing_cycle || 'Annual'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500">License Validity</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">{expiryFormatted}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Staff Worker Quota</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">
                    {workers.length} / {company.max_workers || 50} Used
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Authorized Plants</span>
                  <p className="text-xs font-bold text-slate-900 mt-1">
                    {branches.length} / {company.max_branches || 10} Plants
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Platform Licensing Policy:
                </p>
                <p className="leading-relaxed">
                  Your subscription status and access tiers are managed by the Patterns ERP Cloud Platform Super Admin.
                  To renew or change your plan tier, contact the platform support or billing representative.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Features & Limits</CardTitle>
              <CreditCard className="w-4 h-4 text-[#D8232A]" />
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">Core Factory Modules:</span>
                <span className="font-bold text-emerald-600">Included (6/6)</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">Geofenced GPS Attendance:</span>
                <span className="font-bold text-emerald-600">Enabled</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">GST Invoicing & e-Way Bill:</span>
                <span className="font-bold text-emerald-600">Unlimited</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">Worker Role Provisioning:</span>
                <span className="font-bold text-emerald-600">Granular</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-600">Direct Super Admin Support:</span>
                <span className="font-bold text-slate-900">24/7 SLA</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: BRANCHES */}
      {activeTab === 'branches' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b) => (
            <Card key={b.id} className="hover:border-slate-300 hover:shadow-md transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D8232A]" />
                  <CardTitle>{b.name}</CardTitle>
                </div>
                {b.is_headquarters && <Badge variant="brand">Headquarters</Badge>}
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Branch Code:</span>
                  <span className="font-mono font-bold text-slate-900">{b.code}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">City / State:</span>
                  <span className="font-semibold text-slate-800">{b.city}, {b.state}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Phone:</span>
                  <span className="font-semibold text-slate-800">{b.phone}</span>
                </div>
                <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-2">{b.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* TAB 4: COMPANY PROFILE */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Organization Master Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs shrink-0">
                  <svg width="34" height="25" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M34.5 28H10C5.58172 28 2 24.4183 2 20C2 15.9329 5.03457 12.5746 8.97495 12.0628C10.4282 6.32626 15.6517 2 21.8571 2C28.7844 2 34.524 7.21319 35.3211 13.9317C39.6384 14.8052 42.8571 18.636 42.8571 23.2C42.8571 28.0601 38.9172 32 34.0571 32"
                      stroke="#D8232A"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950 font-heading">{company?.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">Construction Material Supplier & Ready Mix Concrete Producer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="GSTIN Number" value={company?.gstin} readOnly icon={<FileText className="w-4 h-4 text-[#D8232A]" />} />
                <Input label="PAN Number" value={company?.pan} readOnly icon={<ShieldCheck className="w-4 h-4 text-[#D8232A]" />} />
                <Input label="Official Email" value={company?.email} readOnly icon={<Mail className="w-4 h-4 text-[#D8232A]" />} />
                <Input label="Phone Contact" value={company?.phone} readOnly icon={<Phone className="w-4 h-4 text-[#D8232A]" />} />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Registered Corporate Address</h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {company?.address.street}, {company?.address.city}, {company?.address.state} - {company?.address.pincode}, {company?.address.country}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
              <Landmark className="w-5 h-5 text-[#D8232A]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50/40 rounded-2xl border border-red-100 space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Bank Name</span>
                  <p className="text-sm font-black text-slate-950">{company?.bank_details.bank_name}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Account Number</span>
                  <p className="text-sm font-mono font-bold text-[#D8232A]">{company?.bank_details.account_number}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">IFSC Code</span>
                    <p className="text-xs font-mono font-bold text-slate-800">{company?.bank_details.ifsc}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">Branch</span>
                    <p className="text-xs font-semibold text-slate-800">{company?.bank_details.branch}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* MODAL: ADD WORKER PROFILE & CONFIGURE ACCESS PERMISSIONS */}
      <Modal
        isOpen={isAddWorkerOpen}
        onClose={() => setIsAddWorkerOpen(false)}
        title="Create Worker Profile & Assign Access"
      >
        <form onSubmit={handleCreateWorker} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Worker Full Name"
              placeholder="e.g. Sunil Kumar"
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
              required
            />
            <Input
              label="Official Email / Login ID"
              type="email"
              placeholder="sunil@apexmaterials.com"
              value={workerEmail}
              onChange={(e) => setWorkerEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone Contact"
              placeholder="+91 98000 11223"
              value={workerPhone}
              onChange={(e) => setWorkerPhone(e.target.value)}
              required
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Assigned Plant / Branch
              </label>
              <select
                value={workerBranch}
                onChange={(e) => setWorkerBranch(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Department"
              value={workerDepartment}
              onChange={(e) => setWorkerDepartment(e.target.value)}
              required
            />
            <Input
              label="Worker Designation"
              value={workerDesignation}
              onChange={(e) => setWorkerDesignation(e.target.value)}
              required
            />
          </div>

          {/* Quick Access Presets */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Quick Role Presets
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleApplyPreset('production')}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-red-50 hover:text-[#D8232A] rounded-lg border border-slate-200 transition-colors"
              >
                🏭 Production Operator
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('dispatch')}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-red-50 hover:text-[#D8232A] rounded-lg border border-slate-200 transition-colors"
              >
                🚛 Dispatch & Gate Pass
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('sales')}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-red-50 hover:text-[#D8232A] rounded-lg border border-slate-200 transition-colors"
              >
                💼 Sales Rep
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('wages')}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-red-50 hover:text-[#D8232A] rounded-lg border border-slate-200 transition-colors"
              >
                👷 Labour Supervisor
              </button>
              <button
                type="button"
                onClick={() => handleApplyPreset('warehouse')}
                className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-red-50 hover:text-[#D8232A] rounded-lg border border-slate-200 transition-colors"
              >
                📦 Storekeeper
              </button>
            </div>
          </div>

          {/* Granular Checkbox Permissions Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Granular Module Permissions ({selectedPermissions.length} selected)
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('all')}
                  className="text-[10px] text-[#D8232A] font-bold hover:underline"
                >
                  Select All
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('clear')}
                  className="text-[10px] text-slate-500 font-bold hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 scrollbar-thin">
              {AVAILABLE_WORKER_PERMISSIONS.map((p) => {
                const isChecked = selectedPermissions.includes(p.action);
                return (
                  <label
                    key={p.action}
                    className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-red-50/70 border-red-200 text-slate-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePermission(p.action)}
                      className="mt-0.5 rounded text-[#D8232A] focus:ring-[#D8232A]"
                    />
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-bold leading-tight">{p.name}</div>
                      <div className="text-[9px] text-slate-500 font-normal leading-tight truncate">
                        {p.description}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddWorkerOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Worker & Grant Access
            </Button>
          </div>
        </form>
      </Modal>

      {/* MODAL: EDIT WORKER ACCESS */}
      {editingWorker && (
        <Modal
          isOpen={!!editingWorker}
          onClose={() => setEditingWorker(null)}
          title={`Edit Permissions — ${editingWorker.full_name}`}
        >
          <form onSubmit={handleSaveEditWorker} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Full Name"
                value={editingWorker.full_name}
                onChange={(e) =>
                  setEditingWorker({ ...editingWorker, full_name: e.target.value })
                }
                required
              />
              <Input
                label="Phone"
                value={editingWorker.phone}
                onChange={(e) =>
                  setEditingWorker({ ...editingWorker, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Worker Designation"
                value={editingWorker.worker_designation || editingWorker.designation || ''}
                onChange={(e) =>
                  setEditingWorker({
                    ...editingWorker,
                    worker_designation: e.target.value,
                    designation: e.target.value,
                  })
                }
                required
              />
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Worker Status
                </label>
                <select
                  value={editingWorker.status}
                  onChange={(e) =>
                    setEditingWorker({
                      ...editingWorker,
                      status: e.target.value as 'Active' | 'Inactive' | 'Suspended',
                    })
                  }
                  className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
                >
                  <option value="Active">🟢 Active (Access Enabled)</option>
                  <option value="Suspended">🔴 Suspended (Access Disabled)</option>
                </select>
              </div>
            </div>

            {/* Checkbox Permissions for Editing Worker */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                Assigned Module Access Checkboxes ({editingWorker.permissions?.length || 0} active)
              </label>

              <div className="max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 scrollbar-thin">
                {AVAILABLE_WORKER_PERMISSIONS.map((p) => {
                  const isChecked = (editingWorker.permissions || []).includes(p.action);
                  return (
                    <label
                      key={p.action}
                      className={`flex items-start gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-red-50/70 border-red-200 text-slate-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          const current = editingWorker.permissions || [];
                          const updated = isChecked
                            ? current.filter((item) => item !== p.action)
                            : [...current, p.action];
                          setEditingWorker({ ...editingWorker, permissions: updated });
                        }}
                        className="mt-0.5 rounded text-[#D8232A] focus:ring-[#D8232A]"
                      />
                      <div className="overflow-hidden">
                        <div className="text-[11px] font-bold leading-tight">{p.name}</div>
                        <div className="text-[9px] text-slate-500 font-normal leading-tight truncate">
                          {p.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="outline" type="button" onClick={() => setEditingWorker(null)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Worker Permissions
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL: ADD BRANCH */}
      <Modal isOpen={isAddBranchOpen} onClose={() => setIsAddBranchOpen(false)} title="Register New Plant / Branch">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddBranchOpen(false); }}>
          <Input label="Branch / Plant Name" placeholder="e.g. Navi Mumbai Depot" required />
          <Input label="Branch Code" placeholder="NVM-04" required />
          <Input label="GSTIN" placeholder={company?.gstin || '27AAACA12341Z5'} />
          <Input label="City" placeholder="Navi Mumbai" required />
          <Input label="Full Address" placeholder="Plot No 88, Industrial Belt" required />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddBranchOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Branch</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
