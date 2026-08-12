import { memo } from 'react';
import { StatCard } from './StatCard';
import type { UserStats } from '../types';

interface ProfileStatsProps {
  stats: UserStats;
}

export const ProfileStats = memo(function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 px-4">
      <StatCard icon="☕" label="Orders" value={stats.totalOrders} />
      <StatCard
        icon="💰"
        label="Total Spent"
        value={`₹${(stats.totalSpent / 1000).toFixed(1)}k`}
      />
      <StatCard icon="⭐" label="Avg Order" value={`₹${stats.averageOrderValue}`} />
    </div>
  );
});
