import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { Download, Send, Plus, RefreshCw, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveInvoices, createLiveInvoice, fetchLiveCustomers, InvoiceRecord } from '../../lib/api';
import { Customer } from '../../types';

export const BillingPage: React.FC = () => {
  const { company } = useAuth();
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddInvoiceOpen, setIsAddInvoiceOpen] = useState(false);

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [subtotal, setSubtotal] = useState<number>(100000);
  const [taxRate, setTaxRate] = useState<number>(18);
  const [paidAmount, setPaidAmount] = useState<number>(0);

  const loadInvoices = async () => {
    setIsLoading(true);
    try {
      const [invData, custs] = await Promise.all([
        fetchLiveInvoices(company?.id),
        fetchLiveCustomers(company?.id),
      ]);
      setInvoices(invData);
      setCustomers(custs);
      if (custs.length > 0 && !customerName) {
        setCustomerName(custs[0].name);
        setCustomerGstin(custs[0].gstin || '27AAACL1234F1Z1');
      }
    } catch (err) {
      console.error('Error fetching invoices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, [company?.id]);

  const taxAmount = (subtotal * taxRate) / 100;
  const totalAmount = subtotal + taxAmount;

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const paymentStatus: any =
      paidAmount >= totalAmount
        ? 'Paid'
        : paidAmount > 0
        ? 'Partially Paid'
        : 'Pending';

    const newInv = await createLiveInvoice({
      company_id: company.id,
      invoice_no: `INV/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
      customer_name: customerName,
      customer_gstin: customerGstin,
      subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      paid_amount: paidAmount,
      payment_status: paymentStatus,
      due_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    });

    if (newInv) {
      setInvoices((prev) => [newInv, ...prev]);
    } else {
      loadInvoices();
    }

    setIsAddInvoiceOpen(false);
    setPaidAmount(0);
  };

  const generatePdf = (inv: InvoiceRecord) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(216, 35, 42);
    doc.text('Patterns ERP Cloud - GST Tax Invoice', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`${company?.name || 'Patterns Plant'} | GSTIN: ${company?.gstin || '27AAACA12341Z5'}`, 14, 26);

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`Invoice No: ${inv.invoice_no}`, 14, 38);
    doc.text(`Customer: ${inv.customer_name}`, 14, 44);
    doc.text(`GSTIN: ${inv.customer_gstin || 'Unregistered'}`, 14, 50);

    const tableData = [
      ['Description of Building Materials', 'Taxable Amt', 'GST', 'Total Amt'],
      ['Manufacturing Supplies & Logistics Batch', formatCurrency(inv.subtotal), formatCurrency(inv.tax_amount), formatCurrency(inv.total_amount)],
    ];

    autoTable(doc, {
      startY: 56,
      head: [tableData[0]],
      body: [tableData[1]],
      theme: 'grid',
      headStyles: { fillColor: [216, 35, 42] },
    });

    doc.save(`${inv.invoice_no}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">GST Invoicing & Billing Portal</h1>
          <p className="text-xs text-slate-500 font-medium">
            Live tax invoices, e-Way bills, payment reconciliation & PDF generation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadInvoices}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddInvoiceOpen(true)}
          >
            Generate Tax Invoice
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Live Client Tax Invoices</CardTitle>
            <Badge variant="brand">{invoices.length} Invoices Registered</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Invoice No</th>
                <th className="p-3.5">Customer & GSTIN</th>
                <th className="p-3.5 text-right">Taxable Subtotal</th>
                <th className="p-3.5 text-right">GST Tax</th>
                <th className="p-3.5 text-right">Grand Total</th>
                <th className="p-3.5 text-right">Balance Due</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-10 text-center text-slate-400">
                    <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-bold text-slate-700">No invoices issued yet</p>
                    <p className="text-xs text-slate-500 mb-2">Create your first client invoice with GST breakdown</p>
                    <Button variant="primary" size="sm" onClick={() => setIsAddInvoiceOpen(true)}>
                      Generate First Invoice
                    </Button>
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => {
                  const balanceDue = Number(inv.total_amount) - Number(inv.paid_amount);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-slate-900">{inv.invoice_no}</td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{inv.customer_name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{inv.customer_gstin || 'Unregistered'}</div>
                      </td>
                      <td className="p-3.5 text-right font-mono font-medium text-slate-700">
                        {formatCurrency(inv.subtotal)}
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-600">
                        {formatCurrency(inv.tax_amount)}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(inv.total_amount)}
                      </td>
                      <td className="p-3.5 text-right font-mono font-bold text-[#D8232A]">
                        {formatCurrency(balanceDue)}
                      </td>
                      <td className="p-3.5 text-center">
                        <Badge
                          variant={
                            inv.payment_status === 'Paid'
                              ? 'success'
                              : inv.payment_status === 'Partially Paid'
                              ? 'brand'
                              : 'warning'
                          }
                        >
                          {inv.payment_status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => generatePdf(inv)}
                          className="p-1.5 text-slate-500 hover:text-[#D8232A] hover:bg-red-50 rounded-lg transition-colors"
                          title="Download GST PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Invoice Modal */}
      <Modal isOpen={isAddInvoiceOpen} onClose={() => setIsAddInvoiceOpen(false)} title="Generate Client GST Tax Invoice">
        <form className="space-y-4" onSubmit={handleCreateInvoice}>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Customer</label>
            <select
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                const cust = customers.find((c) => c.name === e.target.value);
                if (cust?.gstin) setCustomerGstin(cust.gstin);
              }}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              required
            >
              {customers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Customer GSTIN"
            placeholder="27AAACL1234F1Z1"
            value={customerGstin}
            onChange={(e) => setCustomerGstin(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Taxable Subtotal (₹)"
              type="number"
              value={subtotal || ''}
              onChange={(e) => setSubtotal(Number(e.target.value))}
              required
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">GST Tax Rate</label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value={18}>18% GST (9% CGST + 9% SGST)</option>
                <option value={28}>28% GST (Cement / Heavy Blocks)</option>
                <option value={5}>5% GST (Aggregates & Sand)</option>
                <option value={12}>12% GST (Refractory Products)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 text-xs flex justify-between items-center">
            <div>
              <span className="text-slate-600">Tax: {formatCurrency(taxAmount)}</span>
              <div className="font-bold text-slate-900 text-sm">Total: {formatCurrency(totalAmount)}</div>
            </div>
            <Input
              label="Advance / Paid (₹)"
              type="number"
              value={paidAmount || ''}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              className="w-36"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddInvoiceOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Issue Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
