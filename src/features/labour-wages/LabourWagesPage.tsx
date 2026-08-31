import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { StatCard } from '../../components/ui/StatCard';
import { formatCurrency } from '../../lib/utils';
import {
  HardHat,
  Plus,
  Users,
  IndianRupee,
  Calendar,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLiveLabourWages, createLiveLabourWage, LabourWageRecord } from '../../lib/api';

export const LabourWagesPage: React.FC = () => {
  const { company } = useAuth();
  const [wages, setWages] = useState<LabourWageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddGangOpen, setIsAddGangOpen] = useState(false);

  // Form state
  const [workerName, setWorkerName] = useState('');
  const [taskType, setTaskType] = useState('Brick Molding (Pathai)');
  const [pieceRate, setPieceRate] = useState<number>(750);
  const [unitsCompleted, setUnitsCompleted] = useState<number>(10000);
  const [shift, setShift] = useState('Day');
  const [notes, setNotes] = useState('');

  const loadWages = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLiveLabourWages(company?.id);
      setWages(data);
    } catch (err) {
      console.error('Error fetching wages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWages();
  }, [company?.id]);

  const totalWageDisbursed = wages.reduce((acc, w) => acc + Number(w.total_wage || 0), 0);
  const totalUnits = wages.reduce((acc, w) => acc + Number(w.units_completed || 0), 0);

  const handleAddWage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    const computedTotal = (pieceRate / 1000) * unitsCompleted;
    const newWage = await createLiveLabourWage({
      company_id: company.id,
      worker_name: workerName,
      task_type: taskType,
      piece_rate: pieceRate,
      units_completed: unitsCompleted,
      total_wage: computedTotal,
      shift,
      status: 'Approved',
      notes,
    });

    if (newWage) {
      setWages((prev) => [newWage, ...prev]);
    } else {
      loadWages();
    }

    setIsAddGangOpen(false);
    setWorkerName('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-[#D8232A] border border-red-200">
              Contract & Piece-Rate
            </span>
            <span className="text-xs text-slate-500 font-semibold">Weekly Gang Settlement</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight mt-1 font-heading">
            Labour & Gang Wages
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Piece-rate calculations for brick molders, nikasi stackers, kiln jhalai firemen & kharcha settlements
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadWages}
          >
            Refresh
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddGangOpen(true)}>
            Record Gang Wage
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Wages Disbursed"
          value={formatCurrency(totalWageDisbursed)}
          change="Live calculated"
          trend="neutral"
          icon={<IndianRupee className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          title="Total Pieces Count"
          value={`${totalUnits.toLocaleString()} Units`}
          change="Molded & Handled"
          trend="up"
          icon={<HardHat className="w-5 h-5 text-amber-600" />}
        />
        <StatCard
          title="Active Contractor Gangs"
          value={wages.length.toString()}
          change="On live payroll"
          trend="up"
          icon={<Users className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          title="Settlement Status"
          value="100% Up to date"
          change="No disputed kharcha"
          trend="up"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        />
      </div>

      {/* Wages Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contractor Gang Wage Settlement Log</CardTitle>
            <Badge variant="brand">{wages.length} Wage Entries</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-3.5">Worker / Gang Lead</th>
                <th className="p-3.5">Operation Task</th>
                <th className="p-3.5 text-right">Piece Rate (₹/1000)</th>
                <th className="p-3.5 text-right">Units Completed</th>
                <th className="p-3.5 text-right">Total Net Wage</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {wages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400">
                    No labour wage records found. Click "Record Gang Wage" to enter a contractor piece-rate record.
                  </td>
                </tr>
              ) : (
                wages.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-red-50 text-[#D8232A] flex items-center justify-center font-bold text-xs shrink-0">
                          <HardHat className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div>{w.worker_name}</div>
                          <div className="text-[10px] text-slate-500">{w.shift} Shift • {w.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">{w.task_type}</td>
                    <td className="p-3.5 text-right font-mono font-medium text-slate-600">
                      {formatCurrency(w.piece_rate)} / 1k
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                      {Number(w.units_completed).toLocaleString()}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-emerald-700">
                      {formatCurrency(w.total_wage)}
                    </td>
                    <td className="p-3.5 text-center">
                      <Badge variant={w.status === 'Paid' ? 'success' : 'brand'}>
                        {w.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Gang Modal */}
      <Modal isOpen={isAddGangOpen} onClose={() => setIsAddGangOpen(false)} title="Record Contractor Gang Wage">
        <form className="space-y-4" onSubmit={handleAddWage}>
          <Input
            label="Worker / Gang Leader Name"
            placeholder="e.g. Ramvilas & Gang"
            value={workerName}
            onChange={(e) => setWorkerName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Operation Type</label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Brick Molding (Pathai)">Brick Molding (Pathai)</option>
                <option value="Stacking & Loading (Nikasi)">Stacking & Loading (Nikasi)</option>
                <option value="Kiln Firemen (Jhalai)">Kiln Firemen (Jhalai)</option>
                <option value="Machine Press Operator">Machine Press Operator</option>
                <option value="Daily Maintenance">Daily Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold text-slate-900 focus:border-[#D8232A]"
              >
                <option value="Day">Day Shift</option>
                <option value="Night">Night Shift</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Piece Rate (₹ per 1,000 units)"
              type="number"
              value={pieceRate}
              onChange={(e) => setPieceRate(Number(e.target.value))}
              required
            />
            <Input
              label="Units Completed Count"
              type="number"
              value={unitsCompleted}
              onChange={(e) => setUnitsCompleted(Number(e.target.value))}
              required
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex justify-between items-center">
            <span className="text-emerald-800 font-medium">Calculated Wage Amount:</span>
            <span className="text-emerald-900 font-bold text-base font-mono">
              {formatCurrency((pieceRate / 1000) * unitsCompleted)}
            </span>
          </div>

          <Input
            label="Notes / Advance Deduction Context"
            placeholder="e.g. Cleared for Week 32 batch"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddGangOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Wage Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
