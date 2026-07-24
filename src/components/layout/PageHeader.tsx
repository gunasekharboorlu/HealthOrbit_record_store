import React from 'react';
import Breadcrumb from './Breadcrumb';

interface PageHeaderProps {
  portalName: string;
  activeTab: string;
  tabLabel?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onNavigateHome?: () => void;
}

export default function PageHeader({
  portalName,
  activeTab,
  tabLabel,
  title,
  subtitle,
  actions,
  onNavigateHome,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-white/10">
      <div className="space-y-2">
        <Breadcrumb
          portalName={portalName}
          activeTab={activeTab}
          tabLabel={tabLabel}
          onNavigateHome={onNavigateHome}
        />
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-400 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
