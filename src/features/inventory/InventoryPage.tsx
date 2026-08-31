import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Tabs } from '../../components/ui/Tabs';
import { formatDateTime } from '../../lib/utils';
import { Warehouse, Plus, FileText } from 'lucide-react';
import { InventoryMovement } from '../../types';

export const InventoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ledger');
  const [isRecordMovementOpen, setIsRecordMovementOpen] = useState(false);

  const warehouses = [
    { id: 'wh_1', name: 'Mumbai Central Stockyard', code: 'MUM-WH1', location: 'MIDC Andheri', occupancy: 78, manager: 'Suresh Patil' },
    { id: 'wh_2', name: 'Pune Aggregates Quarry Depot', code: 'PUN-WH2', location: 'Chakan Zone', occupancy: 42, manager: 'Ramesh Kale' },
    { id: 'wh_3', name: 'Taloja RMC Batching Yard', code: 'TAL-WH3', location: 'Taloja MIDC Phase 2', occupancy: 65, manager: 'Ganesh Naik' },
  ];

  const [movements] = useState<InventoryMovement[]>([
    {
      id: 'inv_1001',
      company_id: 'comp_77283',
      warehouse_id: 'wh_1',
      product_id: 'prod_1',
      product_name: 'TMT Steel Bars Fe550D (12mm)',
      type: 'Stock Out',
      quantity: 45,
      unit: 'MT',
      reference_no: 'SO-8819',
      notes: 'Dispatched to L&T Construction site via Truck MH-04-EY-1234',
      created_by: 'Suresh Patil',
      created_at: '2024-07-30T10:15:00Z',
    },
    {
      id: 'inv_1002',
      company_id: 'comp_77283',
      warehouse_id: 'wh_1',
      product_id: 'prod_3',
      product_name: 'UltraTech OPC 53 Grade Cement',
      type: 'Stock In',
      quantity: 500,
      unit: 'Bags',
      reference_no: 'GRN-4402',
      notes: 'Received from UltraTech Cement factory rake delivery',
      created_by: 'Suresh Patil',
      created_at: '2024-07-30T09:00:00Z',
    },
    {
      id: 'inv_1003',
      company_id: 'comp_77283',
      warehouse_id: 'wh_2',
      product_id: 'prod_4',
      product_name: 'Washed River Sand',
      type: 'Transfer',
      quantity: 120,
      unit: 'CuM',
      reference_no: 'ST-2201',
      notes: 'Transferred from Pune Quarry Depot to Mumbai Central',
      created_by: 'Ramesh Kale',
      created_at: '2024-07-29T16:30:00Z',
    },
  ]);

  const tabs = [
    { id: 'ledger', label: 'Inventory Ledger & Audit Trail', count: movements.length, icon: <FileText className="w-4 h-4" /> },
    { id: 'warehouses', label: 'Plant Warehouses & Yards', count: warehouses.length, icon: <Warehouse className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Multi-Warehouse Inventory & Ledger</h1>
          <p className="text-xs text-slate-500 font-medium">Stock audit logs, inter-warehouse stock transfers, stock-in/out and damage logs</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsRecordMovementOpen(true)}>
          Record Stock Entry
        </Button>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'ledger' && (
        <Card>
          <CardHeader>
            <CardTitle>Realtime Inventory Stock Ledger</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5 text-right">Quantity</th>
                  <th className="p-3.5">Reference No</th>
                  <th className="p-3.5">Log Details</th>
                  <th className="p-3.5">Recorded By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {movements.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] text-slate-500 font-medium">{formatDateTime(m.created_at)}</td>
                    <td className="p-3.5">
                      <Badge
                        variant={
                          m.type === 'Stock In' ? 'success' : m.type === 'Stock Out' ? 'danger' : 'info'
                        }
                      >
                        {m.type}
                      </Badge>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">{m.product_name}</td>
                    <td className="p-3.5 text-right font-black text-slate-950">
                      {m.type === 'Stock Out' ? '-' : '+'}{m.quantity} <span className="text-[10px] text-slate-500 font-medium">{m.unit}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-[#D8232A]">{m.reference_no}</td>
                    <td className="p-3.5 text-slate-600 max-w-xs truncate">{m.notes}</td>
                    <td className="p-3.5 font-semibold text-slate-800">{m.created_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warehouses.map((w) => (
            <Card key={w.id} className="hover:border-slate-300 hover:shadow-md transition-all">
              <CardHeader>
                <div>
                  <CardTitle>{w.name}</CardTitle>
                  <p className="text-[11px] text-slate-500 mt-0.5">{w.location}</p>
                </div>
                <Badge variant="neutral">{w.code}</Badge>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-500">Yards Occupancy</span>
                    <span className="text-[#D8232A] font-bold">{w.occupancy}% Capacity</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#D8232A] h-full rounded-full" style={{ width: `${w.occupancy}%` }} />
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-700">
                  <span className="text-slate-500 font-medium">Yard Manager:</span>
                  <span className="font-bold text-slate-900">{w.manager}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Record Movement Modal */}
      <Modal isOpen={isRecordMovementOpen} onClose={() => setIsRecordMovementOpen(false)} title="Record Stock Adjustment / Entry">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsRecordMovementOpen(false); }}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Transaction Type</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A]">
              <option value="Stock In">Stock In (Receipt / GRN)</option>
              <option value="Stock Out">Stock Out (Dispatch)</option>
              <option value="Transfer">Inter-Yard Stock Transfer</option>
              <option value="Damage">Damage / Spillage Loss</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Material Product</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A]">
              <option value="prod_1">TMT Steel Bars Fe550D (12mm)</option>
              <option value="prod_2">Ready Mix Concrete M30 Grade</option>
              <option value="prod_3">UltraTech OPC 53 Cement Bags</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Quantity" type="number" placeholder="50" required />
            <Input label="Reference Document No" placeholder="e.g. GRN-9912" required />
          </div>
          <Input label="Log Notes & Reasons" placeholder="e.g. Received via rake delivery" />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsRecordMovementOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Commit Stock Transaction</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
