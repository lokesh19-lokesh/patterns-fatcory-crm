import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { StatCard } from '../../components/ui/StatCard';
import { formatCurrency, formatDate } from '../../lib/utils';
import {
  HardHat,
  Plus,
  Users,
  Download,
  IndianRupee,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  TrendingUp,
} from 'lucide-react';

interface LabourGang {
  id: string;
  gang_leader: string;
  gang_type: 'Brick Molding (Pathai)' | 'Stacking & Loading (Nikasi)' | 'Kiln Firemen (Jhalai)' | 'Daily Maintenance';
  workers_count: number;
  rate_per_thousand: number;
  weekly_bricks_count: number;
  gross_earnings: number;
  advances_deducted: number;
  net_payable: number;
  payment_status: 'Paid' | 'Pending Approval' | 'Processing';
}

export const LabourWagesPage: React.FC = () => {
  const [isAddGangOpen, setIsAddGangOpen] = useState(false);

  const [gangs, setGangs] = useState<LabourGang[]>([
    {
      id: 'gang_1',
      gang_leader: 'Ramvilas & Gang (12 Workers)',
      gang_type: 'Brick Molding (Pathai)',
      workers_count: 12,
      rate_per_thousand: 750,
      weekly_bricks_count: 140000,
      gross_earnings: 105000,
      advances_deducted: 15000,
      net_payable: 90000,
      payment_status: 'Paid',
    },
    {
      id: 'gang_2',
      gang_leader: 'Chhotu Lal & Team (8 Workers)',
      gang_type: 'Stacking & Loading (Nikasi)',
      workers_count: 8,
      rate_per_thousand: 350,
      weekly_bricks_count: 180000,
      gross_earnings: 63000,
      advances_deducted: 8000,
      net_payable: 55000,
      payment_status: 'Paid',
    },
    {
      id: 'gang_3',
      gang_leader: 'Dharampal Kiln Team (6 Firemen)',
      gang_type: 'Kiln Firemen (Jhalai)',
      workers_count: 6,
      rate_per_thousand: 450,
      weekly_bricks_count: 120000,
      gross_earnings: 54000,
      advances_deducted: 5000,
      net_payable: 49000,
      payment_status: 'Processing',
    },
    {
      id: 'gang_4',
      gang_leader: 'Santosh Kumar & Gang (10 Workers)',
      gang_type: 'Brick Molding (Pathai)',
      workers_count: 10,
      rate_per_thousand: 750,
      weekly_bricks_count: 115000,
      gross_earnings: 86250,
      advances_deducted: 12000,
      net_payable: 74250,
      payment_status: 'Pending Approval',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-[#D8232A] border border-red-200">
              BrickOS Core Service 03
            </span>
            <span className="text-xs text-slate-500 font-semibold">Piece-Rate & Daily Wages</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight mt-1 font-heading">
            Labour & Wages Management
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Pathai (Molding) rate per 1,000 bricks, Nikasi (Loading) gang ledgers, weekly wage registers & advance deductions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
            Export Wages Excel
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddGangOpen(true)}>
            Record Gang Output
          </Button>
        </div>
      </div>

      {/* Labour & Wage KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Factory Workforce"
          value="86 Workers"
          change="6 Active Gangs"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          color="brand"
        />
        <StatCard
          title="Weekly Bricks Molded"
          value="5,55,000"
          change="+8.4% vs last week"
          isPositive={true}
          icon={<HardHat className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Total Weekly Wages"
          value={formatCurrency(308250)}
          subtitle="Net after advances"
          icon={<IndianRupee className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Advances Recovered"
          value={formatCurrency(40000)}
          subtitle="This week's recovery"
          icon={<TrendingUp className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Weekly Gang Wage Register Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Week Piece-Rate Gang Wage Register (24 Jul - 30 Jul)</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Gang / Contractor Leader</th>
                <th className="p-3.5">Operation Type</th>
                <th className="p-3.5 text-center">Team Size</th>
                <th className="p-3.5 text-right">Piece Rate (₹/1k)</th>
                <th className="p-3.5 text-right">Bricks Molded/Handled</th>
                <th className="p-3.5 text-right">Gross Wages</th>
                <th className="p-3.5 text-right">Advances Deducted</th>
                <th className="p-3.5 text-right">Net Payable</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gangs.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">{g.gang_leader}</td>
                  <td className="p-3.5"><Badge variant="info">{g.gang_type}</Badge></td>
                  <td className="p-3.5 text-center font-bold text-slate-800">{g.workers_count}</td>
                  <td className="p-3.5 text-right font-semibold text-slate-700">₹{g.rate_per_thousand} / 1k</td>
                  <td className="p-3.5 text-right font-black text-slate-950">{g.weekly_bricks_count.toLocaleString()}</td>
                  <td className="p-3.5 text-right font-bold text-slate-800">{formatCurrency(g.gross_earnings)}</td>
                  <td className="p-3.5 text-right font-semibold text-rose-600">-{formatCurrency(g.advances_deducted)}</td>
                  <td className="p-3.5 text-right font-black text-emerald-700">{formatCurrency(g.net_payable)}</td>
                  <td className="p-3.5 text-center">
                    <Badge variant={g.payment_status === 'Paid' ? 'success' : g.payment_status === 'Processing' ? 'warning' : 'neutral'}>
                      {g.payment_status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => alert(`Wage slip downloaded for ${g.gang_leader}`)}
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

      {/* Record Gang Output Modal */}
      <Modal isOpen={isAddGangOpen} onClose={() => setIsAddGangOpen(false)} title="Record Gang Piece-Rate Output & Wages">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddGangOpen(false);
          }}
        >
          <Input label="Gang / Contractor Leader Name" placeholder="e.g. Ramvilas & Gang" required />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Labour Operation</label>
              <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A]">
                <option value="Brick Molding (Pathai)">Brick Molding (Pathai)</option>
                <option value="Stacking & Loading (Nikasi)">Stacking & Loading (Nikasi)</option>
                <option value="Kiln Firemen (Jhalai)">Kiln Firemen (Jhalai)</option>
                <option value="Daily Maintenance">Daily Plant Maintenance</option>
              </select>
            </div>
            <Input label="Total Workers in Gang" type="number" placeholder="12" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Piece Rate (₹ per 1,000 Bricks)" type="number" placeholder="750" required />
            <Input label="Total Bricks Count Produced" type="number" placeholder="140000" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Advance Kharcha Deductions (₹)" type="number" placeholder="15000" />
            <Input label="Wage Period Ending Date" type="date" defaultValue="2024-07-30" required />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddGangOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Wage Record
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
