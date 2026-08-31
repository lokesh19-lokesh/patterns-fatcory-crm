import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Plus, Search, Phone, FileSpreadsheet } from 'lucide-react';
import { Customer } from '../../types';

export const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const [customers] = useState<Customer[]>([
    {
      id: 'cust_101',
      company_id: 'comp_77283',
      name: 'Larsen & Toubro Ltd (L&T Construction)',
      contact_person: 'Er. Rajesh Varma',
      email: 'r.varma@intecc.com',
      phone: '+91 98200 55443',
      gstin: '27AAACL1234F1Z1',
      pan: 'AAACL1234F',
      credit_limit: 10000000,
      current_outstanding: 4520000,
      payment_terms_days: 45,
      category: 'Contractor',
      address: 'L&T House, Ballard Estate',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      status: 'Active',
      created_at: '2024-01-20',
    },
    {
      id: 'cust_102',
      company_id: 'comp_77283',
      name: 'Shapoorji Pallonji Real Estate',
      contact_person: 'Anil Deshmukh',
      email: 'anil.d@shapoorji.com',
      phone: '+91 98333 11224',
      gstin: '27AAACS9876K1Z9',
      pan: 'AAACS9876K',
      credit_limit: 5000000,
      current_outstanding: 2850000,
      payment_terms_days: 30,
      category: 'Developer',
      address: 'SP Centre, 41/44 Minoo Desai Marg',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400005',
      status: 'Active',
      created_at: '2024-02-05',
    },
    {
      id: 'cust_103',
      company_id: 'comp_77283',
      name: 'Oberoi Realty Site-4 (Goregaon Project)',
      contact_person: 'Sanjay Kulkarni',
      email: 'sanjay.k@oberoirealty.com',
      phone: '+91 98111 88990',
      gstin: '27AAACO4321P1Z4',
      pan: 'AAACO4321P',
      credit_limit: 2000000,
      current_outstanding: 1940000,
      payment_terms_days: 15,
      category: 'Developer',
      address: 'Commerz II, International Business Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400063',
      status: 'Active',
      created_at: '2024-03-12',
    },
    {
      id: 'cust_104',
      company_id: 'comp_77283',
      name: 'K Raheja Corp Engineering',
      contact_person: 'Pankaj Mehta',
      email: 'pankaj@kraheja.com',
      phone: '+91 98700 33445',
      gstin: '27AAACK6543M1Z2',
      pan: 'AAACK6543M',
      credit_limit: 3000000,
      current_outstanding: 890000,
      payment_terms_days: 30,
      category: 'Contractor',
      address: 'Raheja Tower, BKC',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400051',
      status: 'Active',
      created_at: '2024-04-01',
    },
  ]);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contact_person.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Customer Management & Credit Control</h1>
          <p className="text-xs text-slate-500 font-medium">Master repository for construction clients, GSTIN validation, and credit limit tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
            Export Customers
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddCustomerOpen(true)}>
            Add New Customer
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="w-full sm:w-80">
          <Input
            icon={<Search className="w-4 h-4" />}
            placeholder="Search by Client Name, GSTIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Total Clients: {filteredCustomers.length}</span>
        </div>
      </div>

      {/* Customers Data Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Customer Company</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">GSTIN / PAN</th>
                <th className="p-3.5">Contact Person</th>
                <th className="p-3.5 text-right">Outstanding</th>
                <th className="p-3.5 text-right">Credit Limit</th>
                <th className="p-3.5 text-center">Credit Exposure</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((c) => {
                const creditUtilization = Math.round((c.current_outstanding / c.credit_limit) * 100);
                const isNearLimit = creditUtilization >= 85;

                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{c.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{c.city}, {c.state}</div>
                    </td>
                    <td className="p-3.5">
                      <Badge variant="info">{c.category}</Badge>
                    </td>
                    <td className="p-3.5 font-mono">
                      <div className="font-semibold text-slate-800">{c.gstin}</div>
                      <div className="text-[10px] text-slate-500">{c.pan}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{c.contact_person}</div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-[#D8232A]" /> {c.phone}
                      </div>
                    </td>
                    <td className="p-3.5 text-right font-bold text-amber-600">{formatCurrency(c.current_outstanding)}</td>
                    <td className="p-3.5 text-right font-semibold text-slate-700">{formatCurrency(c.credit_limit)}</td>
                    <td className="p-3.5">
                      <div className="w-28 mx-auto space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className={isNearLimit ? 'text-rose-600' : 'text-emerald-700'}>{creditUtilization}%</span>
                          <span className="text-slate-500">{c.payment_terms_days} days</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isNearLimit ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(creditUtilization, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge variant={c.status === 'Active' ? 'success' : 'danger'}>{c.status}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal Add Customer */}
      <Modal isOpen={isAddCustomerOpen} onClose={() => setIsAddCustomerOpen(false)} title="Register Construction Client">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddCustomerOpen(false);
          }}
        >
          <Input label="Customer Company Name" placeholder="e.g. Shapoorji Pallonji Infra" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="GSTIN Number" placeholder="27AAACS9876K1Z9" required />
            <Input label="PAN Number" placeholder="AAACS9876K" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Primary Contact Person" placeholder="Anil Deshmukh" required />
            <Input label="Phone Number" placeholder="+91 98333 11224" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Approved Credit Limit (₹)" type="number" placeholder="5000000" required />
            <Input label="Payment Credit Days" type="number" placeholder="30" required />
          </div>
          <Input label="Site / Billing Address" placeholder="Full address" required />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddCustomerOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Customer Master
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
