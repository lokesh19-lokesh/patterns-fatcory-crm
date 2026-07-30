import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Clock,
  AlertTriangle,
  Users,
  Truck,
  Building,
  Plus,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  HardHat,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const salesData = [
    { month: 'Jan', revenue: 4200000, purchases: 2800000, profit: 1400000 },
    { month: 'Feb', revenue: 5800000, purchases: 3600000, profit: 2200000 },
    { month: 'Mar', revenue: 7100000, purchases: 4500000, profit: 2600000 },
    { month: 'Apr', revenue: 6400000, purchases: 4100000, profit: 2300000 },
    { month: 'May', revenue: 8900000, purchases: 5700000, profit: 3200000 },
    { month: 'Jun', revenue: 9500000, purchases: 6100000, profit: 3400000 },
    { month: 'Jul', revenue: 11200000, purchases: 7200000, profit: 4000000 },
  ];

  const topProducts = [
    { name: 'TMT Steel Bars Fe550D (12mm)', category: 'Steel', soldQty: '420 MT', revenue: 26460000, stock: '18 MT', status: 'Low' },
    { name: 'Ready Mix Concrete M30 Grade', category: 'Concrete', soldQty: '1,850 CuM', revenue: 8325000, stock: '850 CuM', status: 'Normal' },
    { name: 'UltraTech OPC 53 Grade Cement', category: 'Cement', soldQty: '5,400 Bags', revenue: 2106000, stock: '120 Bags', status: 'Low' },
    { name: 'Washed River Sand (Fine Aggregates)', category: 'Aggregates', soldQty: '980 CuM', revenue: 1764000, stock: '450 CuM', status: 'Normal' },
  ];

  const topCustomers = [
    { name: 'Larsen & Toubro Ltd (L&T Construction)', outstanding: 4520000, creditLimit: 10000000, status: 'Healthy' },
    { name: 'Shapoorji Pallonji Infra', outstanding: 2850000, creditLimit: 5000000, status: 'Healthy' },
    { name: 'Oberoi Realty Site-4', outstanding: 1940000, creditLimit: 2000000, status: 'Near Limit' },
    { name: 'K Raheja Corp Engineering', outstanding: 890000, creditLimit: 3000000, status: 'Healthy' },
  ];

  const recentActivities = [
    { id: 1, text: 'Sales Order #SO-8819 created for L&T (45 MT TMT Steel)', time: '12 mins ago', type: 'sales' },
    { id: 2, text: 'Challan #DC-9921 delivered with GPS & Customer OTP Signature', time: '28 mins ago', type: 'delivery' },
    { id: 3, text: 'Purchase Order #PO-4402 approved for UltraTech Cement supplier', time: '1 hr ago', type: 'purchase' },
    { id: 4, text: 'GST Invoice #INV-2024-912 generated with IRN & QR Code', time: '2 hrs ago', type: 'billing' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
              Live Operations
            </span>
            <span className="text-xs text-slate-400">Plant HQ: Mumbai Industrial Belt</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight mt-1">
            Executive Construction Dashboard
          </h1>
          <p className="text-xs text-slate-400">Real-time telemetry for Sales, Material Stock, Vehicles & Payments</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
            Export Excel
          </Button>
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            New Sales Order
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid (8 Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Sales"
          value={formatCurrency(1485000)}
          change="+18.4%"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Today's Dispatched Orders"
          value="24 Orders"
          change="+6 orders"
          isPositive={true}
          icon={<ShoppingCart className="w-5 h-5" />}
          color="sky"
        />
        <StatCard
          title="Monthly Gross Revenue"
          value={formatCurrency(11200000)}
          change="+24.2%"
          isPositive={true}
          icon={<TrendingUp className="w-5 h-5" />}
          color="purple"
        />
        <StatCard
          title="Pending Payments Due"
          value={formatCurrency(10200000)}
          change="-4.5%"
          isPositive={false}
          subtitle="4 Customer Invoices"
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Pending Deliveries In-Transit"
          value="8 Vehicles"
          subtitle="Live GPS Tracking"
          icon={<Truck className="w-5 h-5" />}
          color="sky"
        />
        <StatCard
          title="Low Stock Warning"
          value="3 Products"
          subtitle="TMT Steel & Cement"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="rose"
        />
        <StatCard
          title="Employees Present"
          value="84 / 92"
          change="91% Attendance"
          isPositive={true}
          icon={<Users className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Active Construction Sites"
          value="14 Sites"
          subtitle="L&T, Oberoi, Shapoorji"
          icon={<Building className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales & Purchase Financial Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Revenue vs Material Procurement Trend</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Monthly breakdown of gross sales vs supplier costs (FY 2024-25)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Revenue
              </span>
              <span className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Purchases
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-72 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `₹${val / 100000}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: number) => formatCurrency(val)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="purchases" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorPur)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Activity & Notifications Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Live Activity Stream</CardTitle>
            <Badge variant="info">Realtime</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg shrink-0 mt-0.5">
                  <HardHat className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-semibold text-slate-200 leading-snug">{act.text}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs text-sky-400">
              View All Logs <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Material Catalog</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              View Catalog
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3 text-right">Revenue</th>
                  <th className="p-3 text-center">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {topProducts.map((p) => (
                  <tr key={p.name} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-100">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3 text-right font-bold text-sky-400">{formatCurrency(p.revenue)}</td>
                    <td className="p-3 text-center">
                      <Badge variant={p.status === 'Low' ? 'danger' : 'success'}>{p.stock}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Key Customer Accounts & Credit Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Outstanding & Credit Limits</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              Manage Credit
            </Button>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-semibold">
                <tr>
                  <th className="p-3">Customer</th>
                  <th className="p-3 text-right">Outstanding</th>
                  <th className="p-3 text-right">Credit Limit</th>
                  <th className="p-3 text-center">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {topCustomers.map((c) => (
                  <tr key={c.name} className="hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-100">{c.name}</td>
                    <td className="p-3 text-right font-bold text-amber-400">{formatCurrency(c.outstanding)}</td>
                    <td className="p-3 text-right">{formatCurrency(c.creditLimit)}</td>
                    <td className="p-3 text-center">
                      <Badge variant={c.status === 'Near Limit' ? 'warning' : 'success'}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
