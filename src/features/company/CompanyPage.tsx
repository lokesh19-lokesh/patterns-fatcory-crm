import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, MapPin, Users, Landmark, FileText, Plus, Edit, ShieldCheck, Mail, Phone, Check } from 'lucide-react';
import { Branch, UserProfile, UserRole } from '../../types';

export const CompanyPage: React.FC = () => {
  const { company } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 'br_1',
      company_id: 'comp_77283',
      name: 'Mumbai Central Plant (HQ)',
      code: 'MUM-01',
      gstin: '27AAACA12341Z5',
      address: 'Plot 45-B, MIDC Industrial Zone, Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      is_headquarters: true,
      phone: '+91 98200 11223',
      email: 'mumbai@apexmaterials.com',
    },
    {
      id: 'br_2',
      company_id: 'comp_77283',
      name: 'Pune Aggregate Depot',
      code: 'PUN-02',
      gstin: '27AAACA12341Z5',
      address: 'Gate No 112, Chakan Industrial Area',
      city: 'Pune',
      state: 'Maharashtra',
      is_headquarters: false,
      phone: '+91 98211 44556',
      email: 'pune@apexmaterials.com',
    },
    {
      id: 'br_3',
      company_id: 'comp_77283',
      name: 'Navi Mumbai RMC Plant',
      code: 'NVM-03',
      gstin: '27AAACA12341Z5',
      address: 'Taloja Industrial Estate, Phase II',
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      is_headquarters: false,
      phone: '+91 98333 77889',
      email: 'taloja@apexmaterials.com',
    },
  ]);

  const [users, setUsers] = useState<UserProfile[]>([
    {
      id: 'u_1',
      company_id: 'comp_77283',
      email: 'admin@apexmaterials.com',
      full_name: 'Vikramaditya Sharma',
      phone: '+91 98200 11223',
      role: 'Company Admin',
      department: 'Executive Management',
      designation: 'Managing Director',
      status: 'Active',
      created_at: '2024-01-15',
    },
    {
      id: 'u_2',
      company_id: 'comp_77283',
      email: 'sales@apexmaterials.com',
      full_name: 'Rajesh Malhotra',
      phone: '+91 98999 22334',
      role: 'Sales Executive',
      department: 'Commercial Sales',
      designation: 'Senior Sales Manager',
      status: 'Active',
      created_at: '2024-02-10',
    },
    {
      id: 'u_3',
      company_id: 'comp_77283',
      email: 'dispatch@apexmaterials.com',
      full_name: 'Suresh Patil',
      phone: '+91 97777 55443',
      role: 'Warehouse Manager',
      department: 'Logistics',
      designation: 'Plant Logistics Head',
      status: 'Active',
      created_at: '2024-03-01',
    },
  ]);

  const tabs = [
    { id: 'profile', label: 'Company Profile & Taxes', icon: <Building2 className="w-4 h-4" /> },
    { id: 'branches', label: 'Plant Branches', count: branches.length, icon: <MapPin className="w-4 h-4" /> },
    { id: 'users', label: 'System Users & Staff', count: users.length, icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Company & Branch Management</h1>
          <p className="text-xs text-slate-400">Manage tenant master records, multi-branch network, GSTIN & user authorizations</p>
        </div>
        {activeTab === 'branches' && (
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddBranchOpen(true)}>
            Add New Branch
          </Button>
        )}
        {activeTab === 'users' && (
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddUserOpen(true)}>
            Add Staff Member
          </Button>
        )}
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* General Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Organization Master Details</CardTitle>
              <Button variant="outline" size="sm" icon={<Edit className="w-3.5 h-3.5" />}>
                Edit Details
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                <img src="/assets/logo.png" alt="Company Logo" className="h-14 w-auto object-contain bg-slate-900 p-2 rounded-lg border border-slate-800" />
                <div>
                  <h3 className="text-base font-bold text-slate-100">{company?.name}</h3>
                  <p className="text-xs text-slate-400">Construction Material Supplier & Ready Mix Concrete Producer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="GSTIN Number" value={company?.gstin} readOnly icon={<FileText className="w-4 h-4" />} />
                <Input label="PAN Number" value={company?.pan} readOnly icon={<ShieldCheck className="w-4 h-4" />} />
                <Input label="Official Email" value={company?.email} readOnly icon={<Mail className="w-4 h-4" />} />
                <Input label="Phone Contact" value={company?.phone} readOnly icon={<Phone className="w-4 h-4" />} />
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Registered Corporate Address</h4>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {company?.address.street}, {company?.address.city}, {company?.address.state} - {company?.address.pincode}, {company?.address.country}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Banking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details (For GST Invoices)</CardTitle>
              <Landmark className="w-5 h-5 text-sky-400" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-sky-950/20 rounded-xl border border-sky-500/20 space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Bank Name</span>
                  <p className="text-sm font-bold text-slate-100">{company?.bank_details.bank_name}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Account Number</span>
                  <p className="text-sm font-mono font-bold text-sky-400">{company?.bank_details.account_number}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">IFSC Code</span>
                    <p className="text-xs font-mono text-slate-200">{company?.bank_details.ifsc}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Branch</span>
                    <p className="text-xs text-slate-200">{company?.bank_details.branch}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Branches Tab */}
      {activeTab === 'branches' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b) => (
            <Card key={b.id} className="hover:border-slate-700 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <CardTitle>{b.name}</CardTitle>
                </div>
                {b.is_headquarters && <Badge variant="success">Headquarters</Badge>}
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Branch Code:</span>
                  <span className="font-mono font-bold text-slate-200">{b.code}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">City / State:</span>
                  <span>{b.city}, {b.state}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Phone:</span>
                  <span>{b.phone}</span>
                </div>
                <p className="text-slate-400 bg-slate-950 p-2.5 rounded border border-slate-800 mt-2">{b.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <CardTitle>Authorized Personnel & Role Assignments</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-100 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center border border-sky-500/30">
                        {u.full_name[0]}
                      </div>
                      <div>
                        <div>{u.full_name}</div>
                        <div className="text-[10px] text-slate-400">{u.email}</div>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-sky-400">{u.role}</td>
                    <td className="p-3">{u.department}</td>
                    <td className="p-3">{u.phone}</td>
                    <td className="p-3 text-center">
                      <Badge variant={u.status === 'Active' ? 'success' : 'danger'}>{u.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Modal Add Branch */}
      <Modal isOpen={isAddBranchOpen} onClose={() => setIsAddBranchOpen(false)} title="Register New Plant / Branch">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddBranchOpen(false); }}>
          <Input label="Branch / Plant Name" placeholder="e.g. Navi Mumbai Depot" required />
          <Input label="Branch Code" placeholder="NVM-04" required />
          <Input label="GSTIN" placeholder="27AAACA12341Z5" />
          <Input label="City" placeholder="Navi Mumbai" required />
          <Input label="Full Address" placeholder="Plot No 88, Industrial Belt" required />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddBranchOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Branch</Button>
          </div>
        </form>
      </Modal>

      {/* Modal Add User */}
      <Modal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} title="Add Staff Member">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddUserOpen(false); }}>
          <Input label="Full Name" placeholder="Rahul Verma" required />
          <Input label="Official Email" type="email" placeholder="rahul@apexmaterials.com" required />
          <Input label="Phone Number" placeholder="+91 98765 00000" required />
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Assign User Role</label>
            <select className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100">
              <option value="Sales Executive">Sales Executive</option>
              <option value="Purchase Manager">Purchase Manager</option>
              <option value="Warehouse Manager">Warehouse Manager</option>
              <option value="Accountant">Accountant</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Account</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
