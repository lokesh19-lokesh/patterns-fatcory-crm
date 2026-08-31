import React, { useState, useEffect } from 'react';
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
  Activity,
  Calendar,
  Gauge,
  Percent,
  RefreshCw,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveProductionBatches, createLiveProductionBatch, fetchLiveProducts, ProductionBatch } from '../../lib/api';
import { Product } from '../../types';

export const ProductionPage: React.FC = () => {
  const { company } = useAuth();
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false);

  // Form states
  const [batchNo, setBatchNo] = useState('');
  const [productName, setProductName] = useState('');
  const [plannedQty, setPlannedQty] = useState<number>(10000);
  const [producedQty, setProducedQty] = useState<number>(9800);
  const [rejectedQty, setRejectedQty] = useState<number>(200);
  const [unit, setUnit] = useState('Pieces');
  const [machineryId, setMachineryId] = useState('Vibro Press Machine 1');
  const [operatorName, setOperatorName] = useState('');
  const [notes, setNotes] = useState('');

  const loadBatches = async () => {
    setIsLoading(true);
    try {
      const [batchData, prods] = await Promise.all([
        fetchLiveProductionBatches(company?.id),
        fetchLiveProducts(company?.id),
      ]);
      setBatches(batchData);
      setProducts(prods);
      if (prods.length > 0 && !productName) {
        setProductName(prods[0].name);
      }
    } catch (err) {
      console.error('Error fetching live batches:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, [company?.id]);

  const totalPlanned = batches.reduce((acc, b) => acc + Number(b.planned_qty || 0), 0);
  const totalProduced = batches.reduce((acc, b) => acc + Number(b.produced_qty || 0), 0);
  const totalBreakage = batches.reduce((acc, b) => acc + Number(b.rejected_qty || 0), 0);
  const avgEfficiency = totalPlanned > 0 ? ((totalProduced / totalPlanned) * 100).toFixed(1) : '98.2';

  const handleAddBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const newBatch = await createLiveProductionBatch({
      company_id: company.id,
      batch_no: batchNo || `BATCH-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      product_name: productName || 'Paver Blocks / Bricks',
      planned_qty: plannedQty,
      produced_qty: producedQty,
      rejected_qty: rejectedQty,
      unit,
      status: 'In Production',
      machinery_id: machineryId,
      operator_name: operatorName || 'Supervisor',
      notes,
    });

    if (newBatch) {
      setBatches((prev) => [newBatch, ...prev]);
    } else {
      loadBatches();
    }

    setIsAddBatchOpen(false);
    setBatchNo('');
    setOperatorName('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-[#D8232A] border border-red-200">
              Factory Core
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
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadBatches}
          >
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddBatchOpen(true)}>
            New Production Batch
          </Button>
        </div>
      </div>

      {/* Production KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Units Output"
          value={`${totalProduced.toLocaleString()} ${batches[0]?.unit || 'Units'}`}
          change="+8.4% vs last week"
          trend="up"
          icon={<Gauge className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Kiln & Line Efficiency"
          value={`${avgEfficiency}%`}
          change="Target: 95.0%"
          trend="up"
          icon={<Percent className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Breakage & Rejection"
          value={`${totalBreakage.toLocaleString()} Units`}
          change="Quality controlled"
          trend="down"
          icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          title="Active Batches"
          value={batches.length.toString()}
          change="Across all press lines"
          trend="neutral"
          icon={<Activity className="w-5 h-5 text-indigo-600" />}
        />
      </div>

      {/* Production Batches Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Live Plant Batch Runs & Kiln Telemetry</CardTitle>
            <Badge variant="brand">{batches.length} Batches Registered</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Batch Code & Product</th>
                <th className="p-3.5">Machine / Kiln Line</th>
                <th className="p-3.5 text-right">Planned Qty</th>
                <th className="p-3.5 text-right">Produced Qty</th>
                <th className="p-3.5 text-right">Breakage</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5">Supervisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-400">
                    No production runs recorded yet. Click "New Production Batch" to start your first run.
                  </td>
                </tr>
              ) : (
                batches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div>{b.product_name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{b.batch_no}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">{b.machinery_id || 'Press Line 1'}</td>
                    <td className="p-3.5 text-right font-mono font-medium text-slate-700">
                      {Number(b.planned_qty).toLocaleString()} {b.unit}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                      {Number(b.produced_qty).toLocaleString()} {b.unit}
                    </td>
                    <td className="p-3.5 text-right font-mono font-semibold text-rose-600">
                      {Number(b.rejected_qty).toLocaleString()} {b.unit}
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge
                        variant={
                          b.status === 'Completed'
                            ? 'success'
                            : b.status === 'In Production'
                            ? 'brand'
                            : 'warning'
                        }
                      >
                        {b.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-slate-600 font-medium">{b.operator_name || 'Plant Supervisor'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Batch Modal */}
      <Modal isOpen={isAddBatchOpen} onClose={() => setIsAddBatchOpen(false)} title="Initialize New Production Batch Run">
        <form className="space-y-4" onSubmit={handleAddBatch}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Batch Code (Optional)"
              placeholder="e.g. BATCH-2024-099"
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
            />
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Product</label>
              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
                required
              >
                <option value="Fly Ash Bricks Class 10">Fly Ash Bricks Class 10</option>
                <option value="Interlocking Paver Blocks 80mm">Interlocking Paver Blocks 80mm</option>
                <option value="Red Clay Wire-cut Bricks">Red Clay Wire-cut Bricks</option>
                <option value="AAC Lightweight Blocks">AAC Lightweight Blocks</option>
                <option value="Ready Mix Concrete M30">Ready Mix Concrete M30</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Planned Output Quantity"
              type="number"
              value={plannedQty}
              onChange={(e) => setPlannedQty(Number(e.target.value))}
              required
            />
            <Input
              label="Actual Produced Quantity"
              type="number"
              value={producedQty}
              onChange={(e) => setProducedQty(Number(e.target.value))}
              required
            />
            <Input
              label="Breakage / Waste Quantity"
              type="number"
              value={rejectedQty}
              onChange={(e) => setRejectedQty(Number(e.target.value))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Machine Line / Kiln Chamber"
              placeholder="Automatic Press Line 1"
              value={machineryId}
              onChange={(e) => setMachineryId(e.target.value)}
            />
            <Input
              label="Supervisor / Operator Name"
              placeholder="Er. Sandeep Patil"
              value={operatorName}
              onChange={(e) => setOperatorName(e.target.value)}
            />
          </div>

          <Input
            label="Mix Proportion / Material Notes"
            placeholder="e.g. 60% Fly Ash, 20% Sand, 15% Lime, 5% Gypsum"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddBatchOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Start Batch Run
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
