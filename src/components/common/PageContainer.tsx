import React from 'react';
import { motion } from 'motion/react';
import Breadcrumbs from '../Breadcrumbs';

interface PageContainerProps {
  portalName: string;
  activeTab: string;
  tabLabel?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  onNavigateHome?: () => void;
}

export default function PageContainer({
  portalName,
  activeTab,
  tabLabel,
  title,
  subtitle,
  actions,
  children,
  onNavigateHome,
}: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 pb-12"
    >
      {/* Top Bar / Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-2">
          <Breadcrumbs 
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

      {/* Main Page Content */}
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
}
