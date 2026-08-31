import React from 'react';
import { Card } from './Card';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
  color?: 'sky' | 'emerald' | 'amber' | 'purple' | 'rose' | 'brand';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  trend,
  icon,
  subtitle,
  color = 'brand',
}) => {
  const isUp = trend ? trend === 'up' : isPositive;
  const iconBg = {
    brand: 'bg-red-50 text-[#D8232A] border-red-100',
    sky: 'bg-sky-50 text-sky-600 border-sky-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <Card className="hover:border-slate-300 hover:shadow-md transition-all">
      <div className="p-5 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-black text-slate-900 font-heading">{value}</p>
          {change && (
            <div className="flex items-center gap-1.5 text-xs pt-1">
              {isUp ? (
                <span className="flex items-center text-emerald-600 font-bold gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {change}
                </span>
              ) : (
                <span className="flex items-center text-rose-600 font-bold gap-0.5">
                  <TrendingDown className="w-3.5 h-3.5" />
                  {change}
                </span>
              )}
              <span className="text-slate-500">{subtitle || 'vs last month'}</span>
            </div>
          )}
          {!change && subtitle && (
            <p className="text-xs text-slate-500 pt-0.5">{subtitle}</p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl border', iconBg[color])}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
