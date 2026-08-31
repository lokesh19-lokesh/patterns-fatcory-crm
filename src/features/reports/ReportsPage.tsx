import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { formatCurrency } from '../../lib/utils';
import { FileSpreadsheet, Download } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sales');

  const reportTabs = [
    { id: 'sales', label: 'Sales & Client Analytics' },
    { id: 'inventory', label: 'Inventory Valuation' },
    { id: 'tax', label: 'GST & Tax Reports' },
    { id: 'delivery', label: 'Logistics & GPS Metrics' },
  ];

  const salesReportData = [
    { month: 'Jan', revenue: 4200000 },
    { month: 'Feb', revenue: 5800000 },
    { month: 'Mar', revenue: 7100000 },
    { month: 'Apr', revenue: 6400000 },
    { month: 'May', revenue: 8900000 },
    { month: 'Jun', revenue: 9500000 },
    { month: 'Jul', revenue: 11200000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 font-heading">Multi-Dimensional Enterprise Reporting</h1>
          <p className="text-xs text-slate-500 font-medium">Executive analytics, GST tax filings, inventory turnover and delivery SLA metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
            Export Excel
          </Button>
          <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />}>
            Download Full Audit PDF
          </Button>
        </div>
      </div>

      <Tabs tabs={reportTabs} activeTab={activeTab} onChange={setActiveTab} />

      <Card>
        <CardHeader>
          <CardTitle>FY 2024-25 Revenue Trend Report</CardTitle>
        </CardHeader>
        <CardContent className="h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesReportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `₹${val / 100000}L`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                formatter={(val: number) => formatCurrency(val)}
              />
              <Bar dataKey="revenue" fill="#D8232A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
