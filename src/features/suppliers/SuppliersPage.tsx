import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Truck, Plus, Search, Star, Phone, Mail, Landmark, ShieldCheck } from 'lucide-react';
import { Supplier } from '../../types';

export const SuppliersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 'sup_201',
      company_id: 'comp_77283',
      name: 'Tata Steel Long Products Ltd',
      contact_person: 'Venkatesh Rao',
      email: 'v.rao@tatasteel.com',
      phone: '+91 98200 99887',
      gstin: '27AAACT9988B1Z2',
      pan: 'AAACT9988B',
      categories: ['Steel', 'TMT Bars'],
      outstanding_balance: 7200000,
      rating: 5,
      address: 'Tata Centre, 43 Jawaharlal Nehru Road',
      bank_name: 'State Bank of India',
      account_number: '30045612389',
      ifsc: 'SBIN0000456',
      status: 'Active',
      created_at: '2024-01-10',
    },
    {
      id: 'sup_202',
      company_id: 'comp_77283',
      name: 'UltraTech Cement Trading Division',
      contact_person: 'Manish Pandey',
      email: 'manish.p@ultratech.com',
      phone: '+91 98333 44556',
      gstin: '27AAACU1122D1Z8',
      pan: 'AAACU1122D',
      categories: ['Cement', 'PPC/OPC'],
      outstanding_balance: 3450000,
      rating: 5,
      address: 'B-Wing, Ahura Centre, Mahakali Caves Road',
      bank_name: 'ICICI Bank Ltd',
      account_number: '000405012399',
      ifsc: 'ICIC0000004',
      status: 'Active',
      created_at: '2024-02-01',
    },
    {
      id: 'sup_203',
      company_id: 'comp_77283',
      name: 'Sahyadri Aggregate Crushers & Mining',
      contact_person: 'Ganesh Patil',
      email: 'sahyadri.crushers@gmail.com',
      phone: '+91 98900 12345',
      gstin: '27AAACS4455E1Z5',
      pan: 'AAACS4455E',
      categories: ['Aggregates', 'Grit', 'Crusher Dust'],
      outstanding_balance: 1120000,
      rating: 4,
      address: 'Quarry Site 12, Panvel Highway',
      bank_name: 'Bank of Baroda',
      account_number: '0987020000123',
      ifsc: 'BARB0PANVEL',
      status: 'Active',
      created_at: '2024-02-15',
    },
  ]);

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.contact_person.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Supplier & Vendor Management</h1>
          <p className="text-xs text-slate-400">Material supplier profiles, performance ratings, GSTIN and pending bills ledger</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddSupplierOpen(true)}>
          Add New Supplier
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="w-full sm:w-80">
          <Input
            icon={<Search className="w-4 h-4" />}
            placeholder="Search Supplier, Material, Contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSuppliers.map((s) => (
          <Card key={s.id} className="hover:border-slate-700 transition-all flex flex-col justify-between">
            <CardHeader>
              <div>
                <CardTitle>{s.name}</CardTitle>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex text-amber-400">
                    {Array.from({ length: s.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400">({s.rating}.0 Rating)</span>
                </div>
              </div>
              <Badge variant="info">{s.categories[0]}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Contact Person:</span>
                <span className="font-semibold text-slate-200">{s.contact_person}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Phone:</span>
                <span>{s.phone}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">GSTIN:</span>
                <span className="font-mono text-slate-200">{s.gstin}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Outstanding Bill:</span>
                <span className="font-bold text-amber-400 text-sm">{formatCurrency(s.outstanding_balance)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Supplier Modal */}
      <Modal isOpen={isAddSupplierOpen} onClose={() => setIsAddSupplierOpen(false)} title="Register Material Supplier">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddSupplierOpen(false); }}>
          <Input label="Supplier Company Name" placeholder="e.g. UltraTech Cement Division" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="GSTIN Number" placeholder="27AAACU1122D1Z8" required />
            <Input label="PAN Number" placeholder="AAACU1122D" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Contact Person Name" placeholder="Venkatesh Rao" required />
            <Input label="Phone Number" placeholder="+91 98200 99887" required />
          </div>
          <Input label="Bank Account Number" placeholder="30045612389" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Bank Name" placeholder="State Bank of India" required />
            <Input label="IFSC Code" placeholder="SBIN0000456" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddSupplierOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Supplier Master</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
