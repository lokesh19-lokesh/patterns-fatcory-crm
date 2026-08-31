import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency } from '../../lib/utils';
import { DollarSign, Download } from 'lucide-react';

export const PayrollPage: React.FC = () => {
  const payrolls = [
    {
      id: 1,
      emp_name: 'Suresh Patil',
      emp_code: 'EMP-101',
      month: 'July 2024',
      basic: 45000,
      hra: 15000,
      pf_deduction: 1800,
      pt_deduction: 200,
      net_salary: 58000,
      status: 'Processed',
    },
    {
      id: 2,
      emp_name: 'Rajesh Malhotra',
      emp_code: 'EMP-102',
      month: 'July 2024',
      basic: 55000,
      hra: 20000,
      pf_deduction: 1800,
      pt_deduction: 200,
      net_salary: 73000,
      status: 'Processed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Construction Payroll & Statutory Tax</h1>
          <p className="text-xs text-slate-500 font-medium">Monthly salary calculation, PF / ESI / Professional Tax compliance & Payslip PDFs</p>
        </div>
        <Button variant="primary" size="sm" icon={<DollarSign className="w-4 h-4" />}>
          Process Monthly Payroll
        </Button>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>July 2024 Salary Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Emp Code & Name</th>
                <th className="p-3.5 text-right">Basic Pay</th>
                <th className="p-3.5 text-right">Allowances (HRA)</th>
                <th className="p-3.5 text-right">PF Deduction</th>
                <th className="p-3.5 text-right">Prof. Tax</th>
                <th className="p-3.5 text-right">Net Payable</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payrolls.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">
                    <div>{p.emp_name}</div>
                    <div className="text-[10px] font-mono text-[#D8232A] font-bold">{p.emp_code}</div>
                  </td>
                  <td className="p-3.5 text-right text-slate-700">{formatCurrency(p.basic)}</td>
                  <td className="p-3.5 text-right text-slate-700">{formatCurrency(p.hra)}</td>
                  <td className="p-3.5 text-right text-rose-600 font-medium">-{formatCurrency(p.pf_deduction)}</td>
                  <td className="p-3.5 text-right text-rose-600 font-medium">-{formatCurrency(p.pt_deduction)}</td>
                  <td className="p-3.5 text-right font-black text-emerald-700">{formatCurrency(p.net_salary)}</td>
                  <td className="p-3.5 text-center"><Badge variant="success">{p.status}</Badge></td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => alert(`Payslip PDF downloaded for ${p.emp_name}`)}
                      className="p-1.5 text-slate-600 hover:text-[#D8232A] hover:bg-red-50 rounded-lg transition-colors border border-slate-200"
                    >
                      <Download className="w-4 h-4" />
                    </button>
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
