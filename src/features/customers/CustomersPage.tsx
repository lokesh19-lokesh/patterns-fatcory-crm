import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Plus, Search, Phone, Trash2, Users, RefreshCw, Mail } from 'lucide-react';
import { Customer } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveCustomers, createLiveCustomer, deleteLiveCustomer } from '../../lib/api';

export const CustomersPage: React.FC = () => {
  const { company } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  // Form states for new customer
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');
  const [creditLimit, setCreditLimit] = useState<number>(1000000);
  const [paymentTerms, setPaymentTerms] = useState<number>(30);
  const [category, setCategory] = useState<'Developer' | 'Contractor' | 'Retailer' | 'Individual'>('Contractor');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');

  const loadCustomers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLiveCustomers(company?.id);
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching live customers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [company?.id]);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.contact_person && c.contact_person.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.gstin && c.gstin.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const newCust = await createLiveCustomer({
      company_id: company.id,
      name,
      contact_person: contactPerson,
      email,
      phone,
      gstin,
      pan: pan || (gstin ? gstin.substring(2, 12) : 'ABCDE1234F'),
      credit_limit: creditLimit,
      current_outstanding: 0,
      payment_terms_days: paymentTerms,
      category,
      address,
      city: city || 'Mumbai',
      state,
      pincode: '400001',
      status: 'Active',
    });

    if (newCust) {
      setCustomers((prev) => [newCust, ...prev]);
    } else {
      loadCustomers();
    }

    setIsAddCustomerOpen(false);
    setName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setGstin('');
    setAddress('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    await deleteLiveCustomer(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Customers & Accounts Directory</h1>
          <p className="text-xs text-slate-500 font-medium">
            Live database of developers, contractors, credit limits & payment terms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadCustomers}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddCustomerOpen(true)}
          >
            Add New Customer
          </Button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company name, contact, GSTIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-[#D8232A] focus:bg-white"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold hidden sm:block">
          Showing {filteredCustomers.length} active clients
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Customer Name & Contact</th>
                <th className="p-3.5">Tax / GSTIN & City</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5 text-right">Credit Limit</th>
                <th className="p-3.5 text-right">Current Outstanding</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="w-8 h-8 text-slate-300" />
                      <p className="text-sm font-bold text-slate-700">No customers found</p>
                      <p className="text-xs text-slate-500">
                        {searchTerm ? 'No clients match your search' : 'Register your first customer or developer account'}
                      </p>
                      {!searchTerm && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => setIsAddCustomerOpen(true)}
                        >
                          Add First Customer
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {c.name[0]}
                        </div>
                        <div>
                          <div>{c.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {c.contact_person} • {c.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-mono text-slate-800 font-semibold">{c.gstin || 'Unregistered'}</div>
                      <div className="text-[10px] text-slate-500">{c.city}, {c.state}</div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{c.category}</td>
                    <td className="p-3.5 text-right font-mono font-medium text-slate-700">
                      {formatCurrency(c.credit_limit)}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-[#D8232A]">
                      {formatCurrency(c.current_outstanding)}
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge variant={c.status === 'Active' ? 'success' : 'danger'}>
                        {c.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Customer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Customer Modal */}
      <Modal isOpen={isAddCustomerOpen} onClose={() => setIsAddCustomerOpen(false)} title="Register Customer Account">
        <form className="space-y-4" onSubmit={handleAddCustomer}>
          <Input
            label="Company / Client Name"
            placeholder="e.g. Shapoorji Pallonji Real Estate"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Person Name"
              placeholder="e.g. Er. Rajesh Varma"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              placeholder="+91 98200 55443"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Email Address"
              type="email"
              placeholder="contact@client.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Contractor">Contractor / Builder</option>
                <option value="Developer">Real Estate Developer</option>
                <option value="Retailer">Retail Dealer</option>
                <option value="Individual">Individual Buyer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="GSTIN Number"
              placeholder="27AAACL1234F1Z1"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
            <Input
              label="City"
              placeholder="Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <Input
            label="Billing & Site Address"
            placeholder="Plot No 45, Site Office"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Credit Limit (₹)"
              type="number"
              value={creditLimit}
              onChange={(e) => setCreditLimit(Number(e.target.value))}
            />
            <Input
              label="Payment Terms (Days)"
              type="number"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(Number(e.target.value))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddCustomerOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Customer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
