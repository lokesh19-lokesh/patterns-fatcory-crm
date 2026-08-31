import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Plus } from 'lucide-react';
import { PurchaseOrder } from '../../types';

export const PurchasePage: React.FC = () => {
  const [isCreatePoOpen, setIsCreatePoOpen] = useState(false);

  const [orders] = useState<PurchaseOrder[]>([
    {
      id: 'po_1',
      company_id: 'comp_77283',
      po_number: 'PO-2024-4401',
      supplier_id: 'sup_201',
      supplier_name: 'Tata Steel Long Products Ltd',
      po_date: '2024-07-25',
      expected_delivery_date: '2024-08-02',
      total_amount: 5400000,
      tax_amount: 972000,
      grand_total: 6372000,
      status: 'Approved',
      items: [
        { product_id: 'prod_1', product_name: 'TMT Steel Bars Fe550D (12mm)', quantity: 100, unit_price: 54000, tax_rate: 18, amount: 6372000 },
      ],
    },
    {
      id: 'po_2',
      company_id: 'comp_77283',
      po_number: 'PO-2024-4402',
      supplier_id: 'sup_202',
      supplier_name: 'UltraTech Cement Trading Division',
      po_date: '2024-07-28',
      expected_delivery_date: '2024-08-01',
      total_amount: 660000,
      tax_amount: 184800,
      grand_total: 844800,
      status: 'Partially Received',
      items: [
        { product_id: 'prod_3', product_name: 'UltraTech OPC 53 Cement (Bags)', quantity: 2000, unit_price: 330, tax_rate: 28, amount: 844800 },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Procurement & Purchase Management</h1>
          <p className="text-xs text-slate-500 font-medium">Supplier purchase orders, Goods Received Notes (GRN) inspection and vendor bills</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsCreatePoOpen(true)}>
          Create Purchase Order
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Purchase Orders (PO)</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">PO Number</th>
                <th className="p-3.5">Supplier Name</th>
                <th className="p-3.5">PO Date</th>
                <th className="p-3.5">Expected Delivery</th>
                <th className="p-3.5 text-right">Tax Amount</th>
                <th className="p-3.5 text-right">Grand Total</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#D8232A]">{po.po_number}</td>
                  <td className="p-3.5 font-bold text-slate-900">{po.supplier_name}</td>
                  <td className="p-3.5 text-slate-500 font-medium">{formatDate(po.po_date)}</td>
                  <td className="p-3.5 text-amber-600 font-bold">{formatDate(po.expected_delivery_date)}</td>
                  <td className="p-3.5 text-right font-medium text-slate-600">{formatCurrency(po.tax_amount)}</td>
                  <td className="p-3.5 text-right font-black text-slate-950">{formatCurrency(po.grand_total)}</td>
                  <td className="p-3.5 text-center">
                    <Badge variant={po.status === 'Approved' ? 'success' : 'warning'}>{po.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Create PO Modal */}
      <Modal isOpen={isCreatePoOpen} onClose={() => setIsCreatePoOpen(false)} title="Issue New Purchase Order (PO)">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsCreatePoOpen(false); }}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Supplier</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A]">
              <option value="sup_201">Tata Steel Long Products Ltd</option>
              <option value="sup_202">UltraTech Cement Division</option>
              <option value="sup_203">Sahyadri Aggregate Crushers</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="PO Date" type="date" defaultValue="2024-07-30" required />
            <Input label="Expected Site Delivery Date" type="date" defaultValue="2024-08-05" required />
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase">Line Items</h4>
            <div className="grid grid-cols-3 gap-3">
              <Input label="Material Qty" type="number" placeholder="50" required />
              <Input label="Unit Price (₹)" type="number" placeholder="54000" required />
              <Input label="GST %" type="number" placeholder="18" required />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsCreatePoOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Issue Purchase Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
