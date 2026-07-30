import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Receipt, Download, Printer, Share2, Mail, Send, CheckCircle2, QrCode, FileText, Plus } from 'lucide-react';
import { Invoice } from '../../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const BillingPage: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'inv_1',
      company_id: 'comp_77283',
      invoice_number: 'INV/2024-25/0912',
      customer_id: 'cust_101',
      customer_name: 'Larsen & Toubro Ltd (L&T Construction)',
      customer_gstin: '27AAACL1234F1Z1',
      invoice_date: '2024-07-29',
      due_date: '2024-09-12',
      subtotal: 2835000,
      cgst: 255150,
      sgst: 255150,
      igst: 0,
      grand_total: 3345300,
      amount_paid: 1000000,
      balance_due: 2345300,
      status: 'Partially Paid',
      irn_qr_code: '4592a8819c991823901238912389a00912',
    },
    {
      id: 'inv_2',
      company_id: 'comp_77283',
      invoice_number: 'INV/2024-25/0913',
      customer_id: 'cust_102',
      customer_name: 'Shapoorji Pallonji Real Estate',
      customer_gstin: '27AAACS9876K1Z9',
      invoice_date: '2024-07-30',
      due_date: '2024-08-30',
      subtotal: 1800000,
      cgst: 45000,
      sgst: 45000,
      igst: 0,
      grand_total: 1890000,
      amount_paid: 1890000,
      balance_due: 0,
      status: 'Paid',
      irn_qr_code: '9921b7738c1129038192309182309b1123',
    },
  ]);

  const generatePdf = (inv: Invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(2, 132, 199);
    doc.text('Apex Construction Materials Pvt Ltd', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('GSTIN: 27AAACA12341Z5 | PAN: AAACA12341', 14, 26);
    doc.text('TAX INVOICE - GST COMPLIANT', 14, 32);

    doc.setLineWidth(0.5);
    doc.setDrawColor(200);
    doc.line(14, 36, 196, 36);

    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text(`Invoice No: ${inv.invoice_number}`, 14, 44);
    doc.text(`Invoice Date: ${inv.invoice_date}`, 14, 50);
    doc.text(`Customer: ${inv.customer_name}`, 110, 44);
    doc.text(`Customer GSTIN: ${inv.customer_gstin}`, 110, 50);

    autoTable(doc, {
      startY: 58,
      head: [['Item Description', 'HSN Code', 'Qty', 'Unit Price (INR)', 'GST %', 'Total Amount (INR)']],
      body: [
        ['TMT Steel Bars Fe550D (12mm)', '72142090', '45 MT', '₹63,000', '18%', `₹${inv.grand_total.toLocaleString('en-IN')}`],
      ],
      headStyles: { fillColor: [2, 132, 199] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.text(`Subtotal: ₹${inv.subtotal.toLocaleString('en-IN')}`, 130, finalY + 15);
    doc.text(`CGST (9%): ₹${inv.cgst.toLocaleString('en-IN')}`, 130, finalY + 22);
    doc.text(`SGST (9%): ₹${inv.sgst.toLocaleString('en-IN')}`, 130, finalY + 29);
    doc.setFontSize(12);
    doc.setTextColor(2, 132, 199);
    doc.text(`Grand Total: ₹${inv.grand_total.toLocaleString('en-IN')}`, 130, finalY + 38);

    doc.save(`${inv.invoice_number.replace(/\//g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">GST Billing & Tax Invoice Engine</h1>
          <p className="text-xs text-slate-400">Generate e-Invoices with IRN, CGST/SGST/IGST split, PDF generation & WhatsApp sharing</p>
        </div>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle>Issued GST Tax Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="p-3">Invoice No & IRN</th>
                <th className="p-3">Customer & GSTIN</th>
                <th className="p-3">Date / Due</th>
                <th className="p-3 text-right">Subtotal</th>
                <th className="p-3 text-right">GST Total</th>
                <th className="p-3 text-right">Grand Total</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-semibold text-slate-100">
                    <div className="font-mono text-sky-400 font-bold">{inv.invoice_number}</div>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <QrCode className="w-3 h-3 text-amber-400" /> IRN Verified
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-200">{inv.customer_name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{inv.customer_gstin}</div>
                  </td>
                  <td className="p-3">
                    <div>{formatDate(inv.invoice_date)}</div>
                    <div className="text-[10px] text-amber-400 font-medium">Due: {formatDate(inv.due_date)}</div>
                  </td>
                  <td className="p-3 text-right text-slate-300">{formatCurrency(inv.subtotal)}</td>
                  <td className="p-3 text-right text-sky-400 font-semibold">{formatCurrency(inv.cgst + inv.sgst + inv.igst)}</td>
                  <td className="p-3 text-right font-extrabold text-emerald-400">{formatCurrency(inv.grand_total)}</td>
                  <td className="p-3 text-center">
                    <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'}>{inv.status}</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => generatePdf(inv)}
                        title="Download PDF Invoice"
                        className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`WhatsApp Invoice link sent to ${inv.customer_name}`)}
                        title="Share via WhatsApp"
                        className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
