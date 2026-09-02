import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../contexts/AuthContext';
import {
  ShieldAlert,
  Building2,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Settings2,
  Calendar,
  Sparkles,
  RefreshCw,
  Eye,
  Sliders,
} from 'lucide-react';
import { Company, SubscriptionPlan, SubscriptionStatus } from '../../types';

export const SuperAdminPage: React.FC = () => {
  const {
    companies,
    workers,
    updateCompanySubscription,
    addCompany,
    selectCompany,
    refreshLiveData,
    company: activeCompany,
  } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);

  // Form states for modifying subscription
  const [editPlan, setEditPlan] = useState<SubscriptionPlan>('Enterprise');
  const [editStatus, setEditStatus] = useState<SubscriptionStatus>('Active');
  const [editDurationMonths, setEditDurationMonths] = useState(12);
  const [editPrice, setEditPrice] = useState(49999);
  const [editMaxWorkers, setEditMaxWorkers] = useState(100);

  // Form states for new company
  const [newCompName, setNewCompName] = useState('');
  const [newCompGstin, setNewCompGstin] = useState('');
  const [newCompEmail, setNewCompEmail] = useState('');
  const [newCompPhone, setNewCompPhone] = useState('');
  const [newCompCity, setNewCompCity] = useState('');
  const [newCompPlan, setNewCompPlan] = useState<SubscriptionPlan>('Professional');

  // Filtered companies
  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.admin_email && c.admin_email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' || c.subscription_status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Calculate platform statistics
  const totalCompanies = companies.length;
  const activeSubscriptions = companies.filter((c) => c.subscription_status === 'Active').length;
  const trialSubscriptions = companies.filter((c) => c.subscription_status === 'Trial').length;
  const suspendedOrCancelled = companies.filter(
    (c) => c.subscription_status === 'Suspended' || c.subscription_status === 'Cancelled'
  ).length;

  const totalRevenue = companies
    .filter((c) => c.subscription_status === 'Active')
    .reduce((sum, c) => sum + (c.subscription_price || 0), 0);

  const handleOpenSubscriptionModal = (comp: Company) => {
    setSelectedCompany(comp);
    setEditPlan(comp.subscription_plan);
    setEditStatus(comp.subscription_status);
    setEditPrice(comp.subscription_price || 49999);
    setEditMaxWorkers(comp.max_workers || 50);
    setIsSubModalOpen(true);
  };

  const handleSaveSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) return;

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + editDurationMonths);

    updateCompanySubscription(
      selectedCompany.id,
      editStatus,
      editPlan,
      expiryDate.toISOString(),
      editPrice,
      editMaxWorkers
    );

    setIsSubModalOpen(false);
  };

  const handleQuickStatusChange = (
    comp: Company,
    newStatus: SubscriptionStatus,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    updateCompanySubscription(comp.id, newStatus);
  };

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    addCompany({
      name: newCompName,
      gstin: newCompGstin,
      pan: newCompGstin.substring(2, 12) || 'ABCDE1234F',
      email: newCompEmail,
      phone: newCompPhone,
      address: {
        street: 'Industrial Area',
        city: newCompCity || 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India',
      },
      subscription_plan: newCompPlan,
      subscription_status: 'Active',
      subscription_price: newCompPlan === 'Enterprise' ? 49999 : newCompPlan === 'Professional' ? 24999 : 9999,
      admin_email: newCompEmail,
      admin_name: newCompName.split(' ')[0] + ' Owner',
    });

    setIsAddCompanyModalOpen(false);
    setNewCompName('');
    setNewCompGstin('');
    setNewCompEmail('');
    setNewCompPhone('');
    setNewCompCity('');
  };

  return (
    <div className="space-y-6">
      {/* Super Admin Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-neutral-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-red-400" /> Platform Owner Mode
              </span>
              <span className="text-xs text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Master Account: brickserpsoftware@gmail.com
              </span>
            </div>
            <h1 className="text-2xl font-black font-heading tracking-tight text-white flex items-center gap-2">
              Super Admin SaaS Command Center
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Global control over all registered manufacturing & factory tenants. Grant, renew, modify, or cancel
              client subscriptions, configure plan worker limits, and inspect company databases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              icon={<RefreshCw className={`w-4 h-4 text-slate-300 ${isRefreshing ? 'animate-spin' : ''}`} />}
              onClick={async () => {
                setIsRefreshing(true);
                await refreshLiveData();
                setTimeout(() => setIsRefreshing(false), 500);
              }}
              className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700"
            >
              Sync Live DB
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddCompanyModalOpen(true)}
              className="shadow-lg shadow-red-600/30"
            >
              Onboard New Tenant
            </Button>
          </div>
        </div>
      </div>

      {/* Platform Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Companies</p>
              <h3 className="text-2xl font-black text-slate-950 font-heading mt-0.5">{totalCompanies}</h3>
              <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Multi-tenant Network
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Building2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Subscriptions</p>
              <h3 className="text-2xl font-black text-emerald-600 font-heading mt-0.5">{activeSubscriptions}</h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                {trialSubscriptions} in Free Trial status
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Annual Run Rate</p>
              <h3 className="text-2xl font-black text-slate-950 font-heading mt-0.5">
                ₹{(totalRevenue / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-500">/yr</span>
              </h3>
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                From {activeSubscriptions} active billing accounts
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <CreditCard className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Suspended / Cancelled</p>
              <h3 className="text-2xl font-black text-rose-600 font-heading mt-0.5">{suspendedOrCancelled}</h3>
              <p className="text-[10px] text-rose-500 font-semibold mt-1">
                Requires renewal or intervention
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
              <XCircle className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies & Subscription Management Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <CardTitle className="text-base font-black">Registered Companies & Subscription Directory</CardTitle>
            <p className="text-xs text-slate-500">
              Select any company to grant, renew, suspend, or cancel their application license
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search company, GSTIN, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#D8232A] w-56"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-[#D8232A]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Subscriptions</option>
              <option value="trial">Free Trial</option>
              <option value="suspended">Suspended</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Company & GSTIN</th>
                <th className="p-3.5">Admin Contact</th>
                <th className="p-3.5">Subscription Plan</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Valid Until</th>
                <th className="p-3.5">Workers Limit</th>
                <th className="p-3.5 text-right">Subscription Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No companies match your search filter.
                  </td>
                </tr>
              ) : (
                filteredCompanies.map((c) => {
                  const isActiveTenant = activeCompany?.id === c.id;
                  const expiryDate = new Date(c.subscription_expires_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  });

                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isActiveTenant ? 'bg-red-50/30 font-medium' : ''
                      }`}
                    >
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-800 text-xs shrink-0">
                            {c.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              {c.name}
                              {isActiveTenant && (
                                <span className="text-[9px] px-1.5 py-0.2 bg-red-100 text-[#D8232A] font-bold rounded">
                                  Viewing
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <span>GSTIN: {c.gstin}</span>
                              <span>•</span>
                              <span>{c.address.city}, {c.address.state}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">{c.admin_name || 'Admin'}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{c.admin_email || c.email}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{c.subscription_plan} Plan</div>
                        <div className="text-[10px] font-mono text-slate-500">
                          ₹{c.subscription_price?.toLocaleString('en-IN') || 0} / {c.billing_cycle || 'Annual'}
                        </div>
                      </td>

                      <td className="p-3.5">
                        {c.subscription_status === 'Active' && (
                          <Badge variant="success" className="px-2 py-0.5">
                            <CheckCircle2 className="w-3 h-3 mr-1 inline" /> Active
                          </Badge>
                        )}
                        {c.subscription_status === 'Trial' && (
                          <Badge variant="warning" className="px-2 py-0.5">
                            <Clock className="w-3 h-3 mr-1 inline" /> Free Trial
                          </Badge>
                        )}
                        {c.subscription_status === 'Suspended' && (
                          <Badge variant="danger" className="px-2 py-0.5">
                            <AlertTriangle className="w-3 h-3 mr-1 inline" /> Suspended
                          </Badge>
                        )}
                        {c.subscription_status === 'Cancelled' && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-full inline-flex items-center">
                            <XCircle className="w-3 h-3 mr-1 inline text-slate-400" /> Cancelled
                          </span>
                        )}
                      </td>

                      <td className="p-3.5 font-mono text-xs">
                        <div className="text-slate-900 font-semibold">{expiryDate}</div>
                      </td>

                      <td className="p-3.5">
                        <div className="text-slate-800 font-semibold">{c.max_workers || 50} Max Workers</div>
                        <div className="text-[10px] text-slate-500">{c.max_branches || 5} Plant Branches</div>
                      </td>

                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Subscription Manage Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs font-bold py-1 px-2.5 h-8 border-slate-300"
                            onClick={() => handleOpenSubscriptionModal(c)}
                          >
                            <Sliders className="w-3.5 h-3.5 mr-1 text-[#D8232A]" /> Manage Subscription
                          </Button>

                          {/* Quick Toggle Active / Cancel */}
                          {c.subscription_status === 'Active' ? (
                            <button
                              onClick={(e) => handleQuickStatusChange(c, 'Cancelled', e)}
                              title="Cancel Subscription immediately"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <XCircle className="w-4 h-4 text-rose-500" />
                            </button>
                          ) : (
                            <button
                              onClick={(e) => handleQuickStatusChange(c, 'Active', e)}
                              title="Activate / Renew Subscription"
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </button>
                          )}

                          {/* View Workspace / Impersonate */}
                          <button
                            onClick={() => selectCompany(c.id)}
                            title="Inspect Tenant Data"
                            className={`p-1.5 rounded-lg transition-colors ${
                              isActiveTenant
                                ? 'bg-red-500 text-white'
                                : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* MODAL: Manage / Modify Company Subscription */}
      <Modal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        title={`Subscription License — ${selectedCompany?.name || ''}`}
      >
        <form onSubmit={handleSaveSubscription} className="space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <p className="text-[10px] uppercase font-bold text-slate-500">Tenant Identity</p>
            <p className="text-xs font-bold text-slate-900">{selectedCompany?.name}</p>
            <p className="text-[10px] text-slate-500 font-mono">
              GSTIN: {selectedCompany?.gstin} | Admin: {selectedCompany?.admin_email}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Subscription Status
              </label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as SubscriptionStatus)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Active">🟢 Active (Full Access)</option>
                <option value="Trial">🟡 Free Trial</option>
                <option value="Suspended">🔴 Suspended (Payment Overdue)</option>
                <option value="Cancelled">⚫ Cancelled (No Access)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Plan Tier
              </label>
              <select
                value={editPlan}
                onChange={(e) => setEditPlan(e.target.value as SubscriptionPlan)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Starter">Starter (1-2 Plants, 10 Workers)</option>
                <option value="Professional">Professional (3-5 Plants, 30 Workers)</option>
                <option value="Enterprise">Enterprise (Unlimited Plants, 100+ Workers)</option>
                <option value="Custom">Custom Enterprise Tier</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Extend Duration (Months)
              </label>
              <select
                value={editDurationMonths}
                onChange={(e) => setEditDurationMonths(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value={1}>1 Month (Monthly Cycle)</option>
                <option value={3}>3 Months (Quarterly)</option>
                <option value={6}>6 Months (Half-Yearly)</option>
                <option value={12}>12 Months (1 Year Full License)</option>
                <option value={24}>24 Months (2 Years Enterprise)</option>
                <option value={36}>36 Months (3 Years Long Term)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Subscription Price (₹)
              </label>
              <Input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Max Workers / Staff Allowed
            </label>
            <Input
              type="number"
              value={editMaxWorkers}
              onChange={(e) => setEditMaxWorkers(Number(e.target.value))}
              placeholder="e.g. 50"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                if (selectedCompany) {
                  updateCompanySubscription(selectedCompany.id, 'Cancelled');
                  setIsSubModalOpen(false);
                }
              }}
              className="text-rose-600 hover:bg-rose-50 border-rose-200 text-xs"
            >
              Cancel Subscription
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" type="button" onClick={() => setIsSubModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Apply Subscription Changes
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* MODAL: Onboard New Factory / Tenant */}
      <Modal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
        title="Onboard New Company & Issue Subscription"
      >
        <form onSubmit={handleCreateCompany} className="space-y-4">
          <Input
            label="Company / Factory Name"
            placeholder="e.g. Maharastra Precast Concrete Ltd"
            value={newCompName}
            onChange={(e) => setNewCompName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="GSTIN Number"
              placeholder="27AAACM99881Z1"
              value={newCompGstin}
              onChange={(e) => setNewCompGstin(e.target.value)}
              required
            />
            <Input
              label="City / Location"
              placeholder="Pune, Maharashtra"
              value={newCompCity}
              onChange={(e) => setNewCompCity(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Admin Official Email"
              type="email"
              placeholder="owner@precast.com"
              value={newCompEmail}
              onChange={(e) => setNewCompEmail(e.target.value)}
              required
            />
            <Input
              label="Phone Contact"
              placeholder="+91 98200 00000"
              value={newCompPhone}
              onChange={(e) => setNewCompPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Initial Subscription Plan
            </label>
            <select
              value={newCompPlan}
              onChange={(e) => setNewCompPlan(e.target.value as SubscriptionPlan)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
            >
              <option value="Starter">Starter Plan (₹9,999/mo)</option>
              <option value="Professional">Professional Plan (₹24,999/yr)</option>
              <option value="Enterprise">Enterprise Full Plant (₹49,999/yr)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddCompanyModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register & Activate License
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
