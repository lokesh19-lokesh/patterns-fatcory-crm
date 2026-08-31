import React from 'react';
import { Link } from 'react-router-dom';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';
import {
  Layers,
  Boxes,
  HardHat,
  Truck,
  IndianRupee,
  BarChart3,
  Clock,
  AlertTriangle,
  Users,
  Building,
  Plus,
  FileSpreadsheet,
  ChevronRight,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const salesData = [
    { month: 'Jan', production: 1250000, revenue: 4200000, cost: 2800000 },
    { month: 'Feb', production: 1480000, revenue: 5800000, cost: 3600000 },
    { month: 'Mar', production: 1720000, revenue: 7100000, cost: 4500000 },
    { month: 'Apr', production: 1650000, revenue: 6400000, cost: 4100000 },
    { month: 'May', production: 1950000, revenue: 8900000, cost: 5700000 },
    { month: 'Jun', production: 2100000, revenue: 9500000, cost: 6100000 },
    { month: 'Jul', production: 2450000, revenue: 11200000, cost: 7200000 },
  ];

  const topProducts = [
    { name: 'High-Density Fly Ash Bricks (Class 10)', category: 'Fly Ash Bricks', soldQty: '8,40,000 Pcs', revenue: 4620000, stock: '1,45,000 Pcs', status: 'Optimal' },
    { name: 'Heavy Duty Paver Blocks (80mm Zig-Zag)', category: 'Paver Blocks', soldQty: '1,20,000 Pcs', revenue: 2160000, stock: '18,500 Pcs', status: 'Low' },
    { name: 'Red Clay Wire-Cut Traditional Bricks', category: 'Clay Bricks', soldQty: '6,50,000 Pcs', revenue: 4875000, stock: '85,000 Pcs', status: 'Optimal' },
    { name: 'AAC Lightweight Aerated Blocks (6 inch)', category: 'AAC Blocks', soldQty: '45,000 Pcs', revenue: 2700000, stock: '9,200 Pcs', status: 'Low' },
  ];

  const topCustomers = [
    { name: 'Larsen & Toubro Ltd (L&T Construction)', outstanding: 4520000, creditLimit: 10000000, status: 'Healthy' },
    { name: 'Shapoorji Pallonji Real Estate', outstanding: 2850000, creditLimit: 5000000, status: 'Healthy' },
    { name: 'Oberoi Realty Site-4', outstanding: 1940000, creditLimit: 2000000, status: 'Near Limit' },
    { name: 'Godrej Properties Thane Project', outstanding: 890000, creditLimit: 3000000, status: 'Healthy' },
  ];

  const recentActivities = [
    { id: 1, text: 'Batch #BATCH-081 (48,500 Fly Ash Bricks) shifted to Curing Yard', time: '10 mins ago', type: 'production' },
    { id: 2, text: 'Challan #DC-9921 delivered 3,500 Bricks to L&T Coastal Site (OTP Verified)', time: '28 mins ago', type: 'dispatch' },
    { id: 3, text: 'Pathai Gang #1 (Ramvilas) logged 22,000 molded bricks today', time: '45 mins ago', type: 'labour' },
    { id: 4, text: 'Raw Material: 40 MT Fly Ash rake received at Mumbai Stockyard', time: '1 hr ago', type: 'stock' },
    { id: 5, text: 'GST Invoice #INV-0912 generated for Shapoorji Pallonji', time: '2 hrs ago', type: 'payment' },
  ];

  const coreServicesShortcuts = [
    { title: 'Production Management', path: '/app/production', icon: Layers, count: '72.5k Today', desc: 'Kiln output & batches' },
    { title: 'Stock & Raw Materials', path: '/app/inventory', icon: Boxes, count: '6 Raw Items', desc: 'Fly ash, coal, sand' },
    { title: 'Labour & Wages', path: '/app/labour-wages', icon: HardHat, count: '86 Workers', desc: 'Piece-rate & Gangs' },
    { title: 'Dispatch & Vehicles', path: '/app/delivery', icon: Truck, count: '18 Trips', desc: 'Live GPS & OTP POD' },
    { title: 'Payments & Outstanding', path: '/app/billing', icon: IndianRupee, count: '₹1.02 Cr Due', desc: 'Party ledgers & GST' },
    { title: 'Reports & Insights', path: '/app/reports', icon: BarChart3, count: '₹11.2M Rev', desc: 'Kiln & Profit audits' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-50 text-[#D8232A] border border-red-200">
              BrickOS Factory Operations HQ
            </span>
            <span className="text-xs text-slate-500 font-semibold">Plant HQ: Mumbai Kiln & Press Yard</span>
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight mt-1 font-heading">
            Executive Factory Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium">Real-time telemetry across Production, Stock, Labour, Dispatch, Payments & Insights</p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/app/reports">
            <Button variant="outline" size="sm" icon={<FileSpreadsheet className="w-4 h-4" />}>
              Audit Reports
            </Button>
          </Link>
          <Link to="/app/production">
            <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
              New Production Batch
            </Button>
          </Link>
        </div>
      </div>

      {/* 6 Core Services Quick Access Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {coreServicesShortcuts.map((serv) => (
          <Link
            key={serv.title}
            to={serv.path}
            className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-[#D8232A] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-[#D8232A] transition-colors">
                <serv.icon className="w-5 h-5 text-[#D8232A] group-hover:text-white transition-colors" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#D8232A] group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900 group-hover:text-[#D8232A] transition-colors leading-snug">
                {serv.title}
              </p>
              <p className="text-[10px] font-black text-[#D8232A] mt-0.5">{serv.count}</p>
              <p className="text-[10px] text-slate-500 truncate">{serv.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Primary KPI Grid (6 Factory Core KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Production Output"
          value="72,500 Bricks"
          change="+4.2% vs target"
          isPositive={true}
          subtitle="2.4% Breakage rate"
          icon={<Layers className="w-5 h-5" />}
          color="brand"
        />
        <StatCard
          title="Raw Material Available"
          value="450 MT Fly Ash"
          subtitle="Cement: 1,200 Bags | Coal: 85 MT"
          icon={<Boxes className="w-5 h-5" />}
          color="sky"
        />
        <StatCard
          title="Active Labour & Wages"
          value="86 Workers"
          change="₹3,08,250 Weekly"
          isPositive={true}
          subtitle="6 Gangs (Pathai & Nikasi)"
          icon={<HardHat className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Today's Dispatched Trips"
          value="18 Trips"
          subtitle="63,000 Bricks on Road"
          icon={<Truck className="w-5 h-5" />}
          color="brand"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Party Outstanding Ledger"
          value={formatCurrency(10200000)}
          change="-4.5%"
          isPositive={false}
          subtitle="4 Major Contractor Accounts"
          icon={<IndianRupee className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Today's Collections"
          value={formatCurrency(1485000)}
          change="+18.4%"
          isPositive={true}
          subtitle="Cash, UPI & NEFT"
          icon={<IndianRupee className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          title="Active Kiln Chambers"
          value="4 Firing / 2 Cooling"
          subtitle="Bull Trench Kiln continuous"
          icon={<Flame className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Monthly Gross Revenue"
          value={formatCurrency(11200000)}
          change="+24.2%"
          isPositive={true}
          icon={<BarChart3 className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production & Revenue Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Factory Production Output & Revenue Velocity</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Monthly brick production volume vs gross billed collections (FY 2024-25)</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-[#D8232A] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D8232A] inline-block" /> Revenue (₹)
              </span>
              <span className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Operating Costs (₹)
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-72 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D8232A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#D8232A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `₹${val / 100000}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(val: number) => formatCurrency(val)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#D8232A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Factory Activity Stream */}
        <Card>
          <CardHeader>
            <CardTitle>Live Plant Activity Stream</CardTitle>
            <Badge variant="info">Realtime</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
                <div className="p-2 bg-red-50 text-[#D8232A] rounded-lg shrink-0 mt-0.5 border border-red-100">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-semibold text-slate-800 leading-snug">{act.text}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium">{act.time}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs text-[#D8232A] font-bold">
              View Complete Audit Log <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Finished Goods Catalog Stock */}
        <Card>
          <CardHeader>
            <CardTitle>Finished Bricks & Blocks Inventory</CardTitle>
            <Link to="/app/products">
              <Button variant="ghost" size="sm" className="text-xs">
                View Price Master
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-right">Revenue</th>
                  <th className="p-3.5 text-center">Yard Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topProducts.map((p) => (
                  <tr key={p.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{p.name}</td>
                    <td className="p-3.5 text-slate-500 font-medium">{p.category}</td>
                    <td className="p-3.5 text-right font-black text-slate-950">{formatCurrency(p.revenue)}</td>
                    <td className="p-3.5 text-center">
                      <Badge variant={p.status === 'Low' ? 'danger' : 'success'}>{p.stock}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Contractor / Customer Outstanding Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Builder & Contractor Outstanding Ledgers</CardTitle>
            <Link to="/app/customers">
              <Button variant="ghost" size="sm" className="text-xs">
                Party Ledgers
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="p-3.5">Customer / Builder</th>
                  <th className="p-3.5 text-right">Outstanding</th>
                  <th className="p-3.5 text-right">Credit Limit</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topCustomers.map((c) => (
                  <tr key={c.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3.5 text-right font-bold text-amber-600">{formatCurrency(c.outstanding)}</td>
                    <td className="p-3.5 text-right text-slate-600 font-medium">{formatCurrency(c.creditLimit)}</td>
                    <td className="p-3.5 text-center">
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
