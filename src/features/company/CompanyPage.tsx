import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, MapPin, Users, Landmark, FileText, Plus, Edit, ShieldCheck, Mail, Phone } from 'lucide-react';
import { Branch, UserProfile } from '../../types';

export const CompanyPage: React.FC = () => {
  const { company } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const [branches] = useState<Branch[]>([
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

  const [users] = useState<UserProfile[]>([
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
          <h1 className="text-2xl font-black text-slate-950 font-heading">Company & Branch Management</h1>
          <p className="text-xs text-slate-500 font-medium">Manage tenant master records, multi-branch network, GSTIN & user authorizations</p>
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

          {/* Banking Details */}
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details (For GST Invoices)</CardTitle>
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

      {/* Branches Tab */}
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

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <CardTitle>Authorized Personnel & Role Assignments</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Department</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80">
                    <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-red-50 text-[#D8232A] font-black flex items-center justify-center border border-red-200">
                        {u.full_name[0]}
                      </div>
                      <div>
                        <div>{u.full_name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{u.email}</div>
                      </div>
                    </td>
                    <td className="p-3.5 font-bold text-[#D8232A]">{u.role}</td>
                    <td className="p-3.5 font-medium text-slate-700">{u.department}</td>
                    <td className="p-3.5 font-medium text-slate-700">{u.phone}</td>
                    <td className="p-3.5 text-center">
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
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assign User Role</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A]">
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
