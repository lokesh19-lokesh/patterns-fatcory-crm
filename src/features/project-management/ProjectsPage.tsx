import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency, formatDate } from '../../lib/utils';
import { HardHat, Plus, MapPin, UserCheck, Calendar, DollarSign, Activity } from 'lucide-react';
import { Project } from '../../types';

export const ProjectsPage: React.FC = () => {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj_1',
      company_id: 'comp_77283',
      code: 'PRJ-LNT-01',
      name: 'Mumbai Coastal Road Extension Site 4',
      customer_id: 'cust_101',
      customer_name: 'Larsen & Toubro Ltd',
      location: 'Worli-Bandram Sea Link Alignment, Mumbai',
      budget: 150000000,
      material_spent_cost: 64200000,
      start_date: '2024-01-15',
      completion_date: '2025-06-30',
      progress_pct: 45,
      engineer_in_charge: 'Er. Rajesh Varma',
      status: 'In Progress',
    },
    {
      id: 'proj_2',
      company_id: 'comp_77283',
      code: 'PRJ-SP-02',
      name: 'Shapoorji Vicinia Luxury Residential Towers',
      customer_id: 'cust_102',
      customer_name: 'Shapoorji Pallonji Real Estate',
      location: 'Chandivali, Powai, Mumbai',
      budget: 80000000,
      material_spent_cost: 51000000,
      start_date: '2023-11-01',
      completion_date: '2024-12-31',
      progress_pct: 68,
      engineer_in_charge: 'Anil Deshmukh',
      status: 'In Progress',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Construction Project & BOQ Management</h1>
          <p className="text-xs text-slate-400">Job-site material allocation, Bill of Quantities (BOQ), site engineer logs & progress</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddProjectOpen(true)}>
          Add Construction Site
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <Card key={p.id} className="hover:border-slate-700 transition-all">
            <CardHeader>
              <div>
                <span className="text-[10px] font-mono text-sky-400 font-bold">{p.code}</span>
                <CardTitle className="text-base">{p.name}</CardTitle>
                <div className="flex items-center gap-1 text-xs text-amber-400 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {p.location}
                </div>
              </div>
              <Badge variant={p.status === 'In Progress' ? 'info' : 'success'}>{p.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-400">Site Work Completion</span>
                  <span className="text-emerald-400 font-bold">{p.progress_pct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${p.progress_pct}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Sanctioned Budget</span>
                  <p className="text-sm font-bold text-slate-100">{formatCurrency(p.budget)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Material Spent Cost</span>
                  <p className="text-sm font-bold text-sky-400">{formatCurrency(p.material_spent_cost)}</p>
                </div>
              </div>

              <div className="flex justify-between border-t border-slate-800 pt-3 text-slate-300">
                <span className="text-slate-400 flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-sky-400" /> Engineer:</span>
                <span className="font-semibold text-slate-200">{p.engineer_in_charge}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Project Modal */}
      <Modal isOpen={isAddProjectOpen} onClose={() => setIsAddProjectOpen(false)} title="Register Construction Job Site">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddProjectOpen(false); }}>
          <Input label="Project Name" placeholder="e.g. Metro Line 3 Extension Site" required />
          <Input label="Project Code" placeholder="PRJ-METRO-05" required />
          <Input label="Site Location Address" placeholder="Worli Naka, Mumbai" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Approved Project Budget (₹)" type="number" placeholder="100000000" required />
            <Input label="Engineer In-Charge" placeholder="Er. Suresh Menon" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" required />
            <Input label="Target Completion Date" type="date" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddProjectOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Create Project Master</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
