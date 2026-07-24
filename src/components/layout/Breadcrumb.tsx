import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  portalName: string;
  activeTab: string;
  tabLabel?: string;
  onNavigateHome?: () => void;
}

export default function Breadcrumb({
  portalName,
  activeTab,
  tabLabel,
  onNavigateHome,
}: BreadcrumbProps) {
  const formattedTab = tabLabel || activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ');

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
      >
        <Home className="w-3.5 h-3.5 text-[#38bdf8]" />
        <span>{portalName}</span>
      </button>

      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

      <span className="text-slate-200 font-bold capitalize">
        {formattedTab}
      </span>
    </nav>
  );
}
