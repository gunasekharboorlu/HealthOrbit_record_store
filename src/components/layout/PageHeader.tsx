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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6 mb-2 border-b border-white/10">
      <div className="space-y-2.5">
        <Breadcrumb
          portalName={portalName}
          activeTab={activeTab}
          tabLabel={tabLabel}
          onNavigateHome={onNavigateHome}
        />
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-4 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
