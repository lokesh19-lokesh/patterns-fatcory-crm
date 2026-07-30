import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { formatCurrency } from '../../lib/utils';
import { TrendingUp, Plus, Phone, Mail, Calendar, Building, UserCheck } from 'lucide-react';
import { Lead } from '../../types';

export const CrmPage: React.FC = () => {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 'lead_1',
      company_id: 'comp_77283',
      title: 'Godrej Properties Thane Tower Supply',
      contact_name: 'Vikram Mehta',
      company_name: 'Godrej Properties Ltd',
      phone: '+91 98200 77112',
      email: 'vikram.m@godrejproperties.com',
      source: 'Site Visit',
      stage: 'Quote Sent',
      estimated_value: 18500000,
      material_requirement: '300 MT TMT Steel Fe550D + 2,000 CuM RMC M35',
      assigned_to: 'Rajesh Malhotra',
      next_followup_date: '2024-08-01',
      created_at: '2024-07-26',
    },
    {
      id: 'lead_2',
      company_id: 'comp_77283',
      title: 'Kharghar Expressway Flyover Aggregates',
      contact_name: 'Pravin Shinde',
      company_name: 'CIDCO Infra Contractors',
      phone: '+91 98333 44112',
      email: 'pravin@cidco.gov.in',
      source: 'Referral',
      stage: 'Negotiation',
      estimated_value: 9200000,
      material_requirement: '5,000 CuM Washed River Sand & Crusher Dust',
      assigned_to: 'Rajesh Malhotra',
      next_followup_date: '2024-07-31',
      created_at: '2024-07-28',
    },
  ]);

  const stages = ['New', 'Contacted', 'Site Inspection', 'Quote Sent', 'Negotiation', 'Won'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Construction CRM & Lead Pipeline</h1>
          <p className="text-xs text-slate-400">Manage builder leads, site inspection requests, follow-ups & commercial deals</p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setIsAddLeadOpen(true)}>
          Capture New Lead
        </Button>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-2">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          return (
            <div key={stage} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-3 min-w-[200px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{stage}</span>
                <Badge variant="neutral">{stageLeads.length}</Badge>
              </div>

              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <Card key={lead.id} className="p-3 space-y-2 bg-slate-900 border-slate-800 hover:border-sky-500/50 transition-all">
                    <h4 className="text-xs font-bold text-slate-100 leading-snug">{lead.title}</h4>
                    <p className="text-[10px] text-sky-400 font-semibold">{lead.company_name}</p>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{lead.material_requirement}</p>
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                      <span className="text-emerald-400 font-bold">{formatCurrency(lead.estimated_value)}</span>
                      <span className="text-amber-400">{lead.next_followup_date}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} title="Capture Builder / Contractor Lead">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsAddLeadOpen(false); }}>
          <Input label="Lead Deal Title" placeholder="e.g. Lodha Palava Phase 4 Concrete Supply" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Builder / Client Name" placeholder="Lodha Group" required />
            <Input label="Contact Person" placeholder="Vikram Mehta" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone Number" placeholder="+91 98200 77112" required />
            <Input label="Email Address" type="email" placeholder="vikram@lodhagroup.com" required />
          </div>
          <Input label="Material Requirements & Spec" placeholder="e.g. 500 MT Steel Fe550D" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Estimated Contract Value (₹)" type="number" placeholder="18500000" required />
            <Input label="Next Follow-up Date" type="date" required />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsAddLeadOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Deal Lead</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
