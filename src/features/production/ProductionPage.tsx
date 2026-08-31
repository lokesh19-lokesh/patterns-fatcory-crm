import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { StatCard } from '../../components/ui/StatCard';
import { formatDate } from '../../lib/utils';
import {
  Layers,
  Plus,
  Flame,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Activity,
  Calendar,
  Gauge,
  Percent,
  TrendingUp,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface ProductionBatch {
  id: string;
  batch_no: string;
  date: string;
  product_name: string;
  target_qty: number;
  actual_produced_qty: number;
  breakage_qty: number;
  breakage_pct: number;
  unit: string;
  kiln_chamber: string;
  status: 'In Production' | 'Curing' | 'Firing (Kiln)' | 'Sorted & Stacked' | 'Completed';
  supervisor: string;
}

export const ProductionPage: React.FC = () => {
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);

  const [batches, setBatches] = useState<ProductionBatch[]>([
    {
      id: 'pb_1',
      batch_no: 'BATCH-2024-081',
      date: '2024-07-30',
      product_name: 'High-Density Fly Ash Bricks (Class 10)',
      target_qty: 50000,
      actual_produced_qty: 48500,
      breakage_qty: 1500,
      breakage_pct: 3.0,
      unit: 'Pieces',
      kiln_chamber: 'Automatic Press Line 1 & Yard C',
      status: 'Sorted & Stacked',
      supervisor: 'Mahesh Gaikwad',
    },
    {
      id: 'pb_2',
      batch_no: 'BATCH-2024-082',
      date: '2024-07-30',
      product_name: 'Heavy Duty Interlocking Paver Blocks (80mm)',
      target_qty: 15000,
      actual_produced_qty: 14750,
      breakage_qty: 250,
      breakage_pct: 1.6,
      unit: 'Pieces',
      kiln_chamber: 'Vibro Press Machine 2',
      status: 'Curing',
      supervisor: 'Ramesh Kale',
    },
    {
      id: 'pb_3',
      batch_no: 'BATCH-2024-083',
      date: '2024-07-29',
      product_name: 'Red Clay Traditional Kiln Bricks (Wire Cut)',
      target_qty: 100000,
      actual_produced_qty: 94200,
      breakage_qty: 5800,
      breakage_pct: 5.8,
      unit: 'Pieces',
      kiln_chamber: 'Continuous Bull Trench Kiln Chamber 4',
      status: 'Firing (Kiln)',
      supervisor: 'Shankar Shinde',
    },
    {
      id: 'pb_4',
      batch_no: 'BATCH-2024-084',
      date: '2024-07-28',
      product_name: 'Autoclaved Aerated Concrete (AAC) Lightweight Blocks',
      target_qty: 20000,
      actual_produced_qty: 19800,
      breakage_qty: 200,
      breakage_pct: 1.0,
      unit: 'Pieces',
      kiln_chamber: 'Steam Autoclave Chamber 1',
      status: 'Completed',
      supervisor: 'Er. Sandeep Patil',
    },
  ]);

  const outputChartData = [
    { day: 'Mon', produced: 68000, target: 70000 },
    { day: 'Tue', produced: 72500, target: 70000 },
    { day: 'Wed', produced: 69400, target: 70000 },
    { day: 'Thu', produced: 74200, target: 70000 },
    { day: 'Fri', produced: 71800, target: 70000 },
    { day: 'Sat', produced: 76000, target: 70000 },
    { day: 'Sun', produced: 63250, target: 70000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-[#D8232A] border border-red-200">
              BrickOS Core Service 01
            </span>
            <span className="text-xs text-slate-500 font-semibold">Kiln & Press Line Telemetry</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight mt-1 font-heading">
            Production Management
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Daily brick molding runs, kiln firing cycles, raw batch ratios, wastage rate & grade sorting
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
            Export Batch Log
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddBatchOpen(true)}>
            New Production Batch
          </Button>
        </div>
      </div>

      {/* Production KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Output"
          value="72,500 Bricks"
          change="+4.2%"
          isPositive={true}
          subtitle="98% of Daily Target"
          icon={<Layers className="w-5 h-5" />}
          color="brand"
        />
        <StatCard
          title="Average Breakage Rate"
          value="2.4%"
          change="-0.8%"
          isPositive={true}
          subtitle="Below 4% threshold"
          icon={<Percent className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Active Kiln Chambers"
          value="4 / 6 Firing"
          subtitle="Bull Trench Kiln Continuous"
          icon={<Flame className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Monthly Output Output"
          value="18.4 Lakh Bricks"
          change="+12.5%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Chart & Raw Mix Recipe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Output vs Target Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Daily Production Output vs Target (Weekly Cycle)</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Total molded & cured bricks per day across all press lines</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#D8232A] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D8232A] inline-block" /> Actual Produced
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Daily Target (70k)
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-72 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={outputChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(val: number) => `${val.toLocaleString()} Bricks`}
                />
                <Bar dataKey="produced" fill="#D8232A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Batch Mix Ratio Card */}
        <Card>
          <CardHeader>
            <CardTitle>Standard Raw Mix Formula</CardTitle>
            <Badge variant="brand">Fly Ash Class 10</Badge>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Fly Ash (Thermal Plant)</span>
                <span>55%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Crushed Sand / Stone Dust</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>OPC 53 Grade Cement</span>
                <span>12%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#D8232A] h-full rounded-full" style={{ width: '12%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Hydrated Lime & Gypsum</span>
                <span>8%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '8%' }} />
              </div>
            </div>

            <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 mt-2 text-[11px] text-slate-700 leading-snug">
              <span className="font-bold text-[#D8232A] block mb-0.5">Quality Check Benchmark:</span>
              Minimum compressive strength target: <strong>10.5 N/mm²</strong>. Water absorption under <strong>12%</strong>.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Batches Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Production Runs & Kiln Firing Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Batch No & Date</th>
                <th className="p-3.5">Product Specification</th>
                <th className="p-3.5">Machine / Kiln Location</th>
                <th className="p-3.5 text-right">Target Output</th>
                <th className="p-3.5 text-right">Actual Produced</th>
                <th className="p-3.5 text-right">Breakage %</th>
                <th className="p-3.5 text-center">Batch Status</th>
                <th className="p-3.5">Supervisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900">
                    <div className="font-mono text-[#D8232A]">{b.batch_no}</div>
                    <div className="text-[10px] text-slate-500 font-normal">{formatDate(b.date)}</div>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">{b.product_name}</td>
                  <td className="p-3.5 text-slate-600 font-medium">{b.kiln_chamber}</td>
                  <td className="p-3.5 text-right text-slate-500 font-medium">
                    {b.target_qty.toLocaleString()} {b.unit}
                  </td>
                  <td className="p-3.5 text-right font-black text-slate-950">
                    {b.actual_produced_qty.toLocaleString()} {b.unit}
                  </td>
                  <td className="p-3.5 text-right">
                    <span className={`font-bold ${b.breakage_pct > 4 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {b.breakage_pct}% ({b.breakage_qty.toLocaleString()})
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <Badge
                      variant={
                        b.status === 'Completed' || b.status === 'Sorted & Stacked'
                          ? 'success'
                          : b.status === 'Firing (Kiln)'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-slate-800 font-semibold">{b.supervisor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Production Batch Modal */}
      <Modal isOpen={isAddBatchOpen} onClose={() => setIsAddBatchOpen(false)} title="Log New Factory Production Batch">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsAddBatchOpen(false);
          }}
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Brick / Block Product</label>
            <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A]">
              <option value="Fly Ash Bricks Class 10">High-Density Fly Ash Bricks (Class 10)</option>
              <option value="Red Clay Bricks">Red Clay Wire Cut Traditional Kiln Bricks</option>
              <option value="Interlocking Pavers 80mm">Heavy Duty Interlocking Paver Blocks (80mm)</option>
              <option value="AAC Lightweight Blocks">Autoclaved Aerated Concrete (AAC) Blocks</option>
              <option value="Solid Concrete Blocks">Solid Concrete Masonry Blocks (6 inch)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Production Date" type="date" defaultValue="2024-07-30" required />
            <Input label="Kiln Chamber / Machine Line" placeholder="e.g. Press Line 1 / Kiln Chamber 4" required />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input label="Target Qty (Pieces)" type="number" placeholder="50000" required />
            <Input label="Actual Produced" type="number" placeholder="48500" required />
            <Input label="Breakage / Rejects" type="number" placeholder="1500" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Shift Supervisor Name" placeholder="e.g. Mahesh Gaikwad" required />
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Initial Batch Status</label>
              <select className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs font-semibold text-slate-900 focus:border-[#D8232A]">
                <option value="In Production">In Production</option>
                <option value="Curing">Curing</option>
                <option value="Firing (Kiln)">Firing (Kiln Chamber)</option>
                <option value="Sorted & Stacked">Sorted & Stacked</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddBatchOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Commit Production Batch
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
