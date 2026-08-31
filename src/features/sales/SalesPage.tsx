import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Plus, MapPin } from 'lucide-react';
import { SalesOrder } from '../../types';

export const SalesPage: React.FC = () => {
  const [isCreateSoOpen, setIsCreateSoOpen] = useState(false);

  const [orders] = useState<SalesOrder[]>([
    {
      id: 'so_1',
      company_id: 'comp_77283',
      order_number: 'SO-2024-8819',
      customer_id: 'cust_101',
      customer_name: 'Larsen & Toubro Ltd (L&T Construction)',
      project_site_name: 'Coastal Road Project Site 4',
      order_date: '2024-07-29',
      delivery_date: '2024-07-31',
      total_amount: 2835000,
      gst_amount: 510300,
      grand_total: 3345300,
      status: 'Confirmed',
      payment_status: 'Partial',
      items: [
        { product_id: 'prod_1', product_name: 'TMT Steel Bars Fe550D (12mm)', quantity: 45, unit_price: 63000, gst_rate: 18, total: 3345300 },
      ],
    },
    {
      id: 'so_2',
      company_id: 'comp_77283',
      order_number: 'SO-2024-8820',
      customer_id: 'cust_102',
      customer_name: 'Shapoorji Pallonji Real Estate',
      project_site_name: 'Vicinia Tower Project',
      order_date: '2024-07-30',
      delivery_date: '2024-08-01',
      total_amount: 1800000,
      gst_amount: 90000,
      grand_total: 1890000,
      status: 'Dispatched',
      payment_status: 'Paid',
      items: [
        { product_id: 'prod_4', product_name: 'Washed River Sand (Zone II)', quantity: 1000, unit_price: 1800, gst_rate: 5, total: 1890000 },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Construction Sales & Site Orders</h1>
          <p className="text-xs text-slate-500 font-medium">Commercial estimates, sales orders, site dispatch schedules and payment terms</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsCreateSoOpen(true)}>
          New Sales Order
        </Button>
      </div>

      {/* Sales Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Confirmed Site Sales Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Order Number</th>
                <th className="p-3.5">Customer & Site Location</th>
                <th className="p-3.5">Order Date</th>
                <th className="p-3.5">Delivery Date</th>
                <th className="p-3.5 text-right">GST Tax</th>
                <th className="p-3.5 text-right">Grand Total</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((so) => (
                <tr key={so.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#D8232A]">{so.order_number}</td>
                  <td className="p-3.5 font-bold text-slate-900">
                    <div>{so.customer_name}</div>
                    <div className="text-[11px] text-amber-600 flex items-center gap-1 font-semibold mt-0.5">
                      <MapPin className="w-3 h-3" /> {so.project_site_name}
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-500 font-medium">{formatDate(so.order_date)}</td>
                  <td className="p-3.5 font-semibold text-slate-800">{formatDate(so.delivery_date)}</td>
                  <td className="p-3.5 text-right text-slate-500 font-medium">{formatCurrency(so.gst_amount)}</td>
                  <td className="p-3.5 text-right font-black text-slate-950">{formatCurrency(so.grand_total)}</td>
                  <td className="p-3.5 text-center">
                    <Badge variant={so.status === 'Dispatched' ? 'success' : 'info'}>{so.status}</Badge>
                  </td>
                  <td className="p-3.5 text-center">
                    <Badge variant={so.payment_status === 'Paid' ? 'success' : 'warning'}>{so.payment_status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Create Sales Order Modal */}
      <Modal isOpen={isCreateSoOpen} onClose={() => setIsCreateSoOpen(false)} title="Generate New Commercial Sales Order">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsCreateSoOpen(false); }}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Construction Client</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A] focus:ring-1 focus:ring-[#D8232A]">
              <option value="cust_101">Larsen & Toubro Ltd (L&T Construction)</option>
              <option value="cust_102">Shapoorji Pallonji Real Estate</option>
              <option value="cust_103">Oberoi Realty Site-4</option>
            </select>
          </div>
          <Input label="Project Site Name & Delivery Address" placeholder="e.g. Coastal Road Project Site 4" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Order Date" type="date" defaultValue="2024-07-30" required />
            <Input label="Target Delivery Date" type="date" defaultValue="2024-08-02" required />
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase">Material Items</h4>
            <div className="grid grid-cols-3 gap-3">
              <Input label="Quantity" type="number" placeholder="45" required />
              <Input label="Unit Selling Price (₹)" type="number" placeholder="63000" required />
              <Input label="GST %" type="number" placeholder="18" required />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsCreateSoOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Confirm Sales Order</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
