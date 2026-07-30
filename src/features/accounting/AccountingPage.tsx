import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Calculator, TrendingUp, TrendingDown, DollarSign, FileSpreadsheet, Scale, Receipt } from 'lucide-react';

export const AccountingPage: React.FC = () => {
  const ledgerEntries = [
    { id: 1, date: '2024-07-30', account: 'Sales Income - TMT Steel', ref: 'INV-0912', type: 'Credit', amount: 3345300, balance: 14200000 },
    { id: 2, date: '2024-07-29', account: 'Material Purchase - Cement', ref: 'PO-4402', type: 'Debit', amount: 844800, balance: 10854700 },
    { id: 3, date: '2024-07-28', account: 'Logistics & Diesel Expense', ref: 'EXP-1092', type: 'Debit', amount: 145000, balance: 11699500 },
    { id: 4, date: '2024-07-25', account: 'Customer Payment Received (L&T)', ref: 'REC-3310', type: 'Credit', amount: 4500000, balance: 11844500 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Financial Accounting & GST Ledger</h1>
          <p className="text-xs text-slate-400">Double-entry ledger, Cashbook, Profit & Loss statement and GSTR-1 tax compliance</p>
        </div>
        <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
          Export Tally / Excel
        </Button>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Gross Revenue" value={formatCurrency(48500000)} change="+22%" icon={<TrendingUp className="w-5 h-5" />} color="emerald" />
        <StatCard title="Material & Operating Expense" value={formatCurrency(31200000)} change="+14%" icon={<TrendingDown className="w-5 h-5" />} color="rose" />
        <StatCard title="Net Operating Profit" value={formatCurrency(17300000)} change="+31%" icon={<Scale className="w-5 h-5" />} color="purple" />
        <StatCard title="Output GST Liability" value={formatCurrency(4120000)} subtitle="GSTR-3B Pending" icon={<Receipt className="w-5 h-5" />} color="amber" />
      </div>

      {/* General Ledger Table */}
      <Card>
        <CardHeader>
          <CardTitle>General Accounts Ledger & Journal Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
              <tr>
                <th className="p-3">Posting Date</th>
                <th className="p-3">Account Head</th>
                <th className="p-3">Reference Voucher</th>
                <th className="p-3 text-center">Type</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3 text-right">Running Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ledgerEntries.map((l) => (
                <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-mono text-slate-400">{formatDate(l.date)}</td>
                  <td className="p-3 font-semibold text-slate-100">{l.account}</td>
                  <td className="p-3 font-mono text-sky-400">{l.ref}</td>
                  <td className="p-3 text-center">
                    <Badge variant={l.type === 'Credit' ? 'success' : 'danger'}>{l.type}</Badge>
                  </td>
                  <td className={`p-3 text-right font-bold ${l.type === 'Credit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {l.type === 'Credit' ? '+' : '-'}{formatCurrency(l.amount)}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-200">{formatCurrency(l.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
