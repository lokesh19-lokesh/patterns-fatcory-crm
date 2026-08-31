import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Plus, Search, Star, Trash2, Truck, RefreshCw } from 'lucide-react';
import { Supplier } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveSuppliers, createLiveSupplier, deleteLiveSupplier } from '../../lib/api';

export const SuppliersPage: React.FC = () => {
  const { company } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);

  // Form states for new supplier
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [category, setCategory] = useState('Cement');
  const [outstandingBalance, setOutstandingBalance] = useState<number>(0);
  const [rating, setRating] = useState<number>(5);
  const [address, setAddress] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');

  const loadSuppliers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLiveSuppliers(company?.id);
      setSuppliers(data);
    } catch (err) {
      console.error('Error fetching live suppliers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, [company?.id]);

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.contact_person && s.contact_person.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.gstin && s.gstin.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const newSup = await createLiveSupplier({
      company_id: company.id,
      name,
      contact_person: contactPerson,
      email,
      phone,
      gstin,
      pan: gstin ? gstin.substring(2, 12) : 'ABCDE1234F',
      categories: [category],
      outstanding_balance: outstandingBalance,
      rating,
      address,
      bank_name: bankName || 'State Bank of India',
      account_number: accountNumber || '30000000000',
      ifsc: ifsc || 'SBIN0000123',
      status: 'Active',
    });

    if (newSup) {
      setSuppliers((prev) => [newSup, ...prev]);
    } else {
      loadSuppliers();
    }

    setIsAddSupplierOpen(false);
    setName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setGstin('');
    setAddress('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this supplier?')) return;
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    await deleteLiveSupplier(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Suppliers & Raw Material Vendors</h1>
          <p className="text-xs text-slate-500 font-medium">
            Live database of raw material suppliers (Cement, Steel, Aggregates, Sand) & payables
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadSuppliers}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddSupplierOpen(true)}
          >
            Add New Supplier
          </Button>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search vendor name, contact, GSTIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-[#D8232A] focus:bg-white"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold hidden sm:block">
          Showing {filteredSuppliers.length} active suppliers
        </div>
      </div>

      {/* Suppliers Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Supplier Name & Contact</th>
                <th className="p-3.5">Tax / GSTIN</th>
                <th className="p-3.5">Raw Material Supplies</th>
                <th className="p-3.5 text-center">Quality Rating</th>
                <th className="p-3.5 text-right">Outstanding Payables</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Truck className="w-8 h-8 text-slate-300" />
                      <p className="text-sm font-bold text-slate-700">No suppliers found</p>
                      <p className="text-xs text-slate-500">
                        {searchTerm ? 'No vendors match your search' : 'Register your first raw material supplier'}
                      </p>
                      {!searchTerm && (
                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-2 text-xs"
                          onClick={() => setIsAddSupplierOpen(true)}
                        >
                          Add First Supplier
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-[#D8232A] flex items-center justify-center font-bold text-xs shrink-0">
                          {s.name[0]}
                        </div>
                        <div>
                          <div>{s.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {s.contact_person} • {s.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-800 font-semibold">{s.gstin || 'Unregistered'}</td>
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        {s.categories?.map((cat) => (
                          <span key={cat} className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{s.rating || 5}.0</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(s.outstanding_balance || 0)}
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge variant={s.status === 'Active' ? 'success' : 'danger'}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Supplier"
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

      {/* Add Supplier Modal */}
      <Modal isOpen={isAddSupplierOpen} onClose={() => setIsAddSupplierOpen(false)} title="Register Raw Material Supplier">
        <form className="space-y-4" onSubmit={handleAddSupplier}>
          <Input
            label="Supplier / Vendor Name"
            placeholder="e.g. UltraTech Cement Trading Division"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contact Person Name"
              placeholder="e.g. Manish Pandey"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              required
            />
            <Input
              label="Phone Contact"
              placeholder="+91 98333 44556"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Official Email"
              type="email"
              placeholder="orders@vendor.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Supply Item</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Cement">Cement (OPC / PPC)</option>
                <option value="Steel">Steel & TMT Bars</option>
                <option value="Aggregates">Stone Aggregates & Gravel</option>
                <option value="Sand">River Sand / M-Sand</option>
                <option value="Fly Ash">Fly Ash & Micro-silica</option>
                <option value="Chemicals">Concrete Admixtures & Retarders</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="GSTIN Number"
              placeholder="27AAACU1122D1Z8"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
            <Input
              label="Initial Outstanding Balance (₹)"
              type="number"
              value={outstandingBalance || ''}
              onChange={(e) => setOutstandingBalance(Number(e.target.value))}
            />
          </div>

          <Input
            label="Plant / Office Address"
            placeholder="Plot No 12, Industrial Area"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Bank Name"
              placeholder="HDFC Bank"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
            <Input
              label="Account Number"
              placeholder="502000000000"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <Input
              label="IFSC Code"
              placeholder="HDFC0000123"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddSupplierOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Supplier
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
