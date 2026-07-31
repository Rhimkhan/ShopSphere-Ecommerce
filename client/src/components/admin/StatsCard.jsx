import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color = 'indigo', subtext }) => {
  const colorMap = {
    indigo: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </span>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white font-sans">
          {value}
        </h3>
        {subtext && <p className="text-[11px] text-gray-400">{subtext}</p>}
      </div>

      <div className={`p-4 rounded-2xl border ${colorMap[color]} shadow-sm`}>
        <Icon className="text-2xl" />
      </div>
    </div>
  );
};

export default StatsCard;
