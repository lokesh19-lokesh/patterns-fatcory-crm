import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { formatDateTime } from '../../lib/utils';
import { History, Sliders } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('audit');

  const auditLogs = [
    { id: 1, user: 'admin@apexmaterials.com', action: 'Generated GST Invoice #INV-0912', entity: 'Invoice', ip: '103.44.112.5', time: '2024-07-30T10:14:00Z' },
    { id: 2, user: 'sales@apexmaterials.com', action: 'Approved Sales Order #SO-8819', entity: 'SalesOrder', ip: '103.44.112.9', time: '2024-07-30T09:45:00Z' },
    { id: 3, user: 'dispatch@apexmaterials.com', action: 'Recorded OTP Delivery Verification DC-9921', entity: 'DeliveryChallan', ip: '115.98.22.4', time: '2024-07-30T09:12:00Z' },
  ];

  const tabs = [
    { id: 'audit', label: 'Security & System Audit Logs', icon: <History className="w-4 h-4" /> },
    { id: 'general', label: 'Company Preferences', icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">System Settings & Audit Controls</h1>
          <p className="text-xs text-slate-500 font-medium">Security event logs, RLS policies verification, invoice formatting & system backups</p>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'audit' && (
        <Card>
          <CardHeader>
            <CardTitle>System Activity Audit Log</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">Action Description</th>
                  <th className="p-3.5">Entity</th>
                  <th className="p-3.5">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono text-slate-500 font-medium">{formatDateTime(log.time)}</td>
                    <td className="p-3.5 font-bold text-slate-900">{log.user}</td>
                    <td className="p-3.5 font-semibold text-[#D8232A]">{log.action}</td>
                    <td className="p-3.5"><Badge variant="info">{log.entity}</Badge></td>
                    <td className="p-3.5 font-mono text-slate-500">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'general' && (
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Invoice Prefix & Tax Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Tax Invoice Number Prefix" defaultValue="INV/2024-25/" />
            <Input label="Sales Order Number Prefix" defaultValue="SO-2024-" />
            <Input label="Purchase Order Number Prefix" defaultValue="PO-2024-" />
            <Button variant="primary">Save Configuration</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
