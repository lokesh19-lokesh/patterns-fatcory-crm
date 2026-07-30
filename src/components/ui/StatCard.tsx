import React from 'react';
import { Card } from './Card';
import { cn } from '../../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  subtitle?: string;
  color?: 'sky' | 'emerald' | 'amber' | 'purple' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  subtitle,
  color = 'sky',
}) => {
  const iconBg = {
    sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <Card className="hover:border-slate-700/80 transition-all">
      <div className="p-5 flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-extrabold text-slate-100">{value}</p>
          {change && (
            <div className="flex items-center gap-1.5 text-xs pt-1">
              {isPositive ? (
                <span className="flex items-center text-emerald-400 font-semibold gap-0.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {change}
                </span>
              ) : (
                <span className="flex items-center text-rose-400 font-semibold gap-0.5">
                  <TrendingDown className="w-3.5 h-3.5" />
                  {change}
                </span>
              )}
              <span className="text-slate-500">{subtitle || 'vs last month'}</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl border', iconBg[color])}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
