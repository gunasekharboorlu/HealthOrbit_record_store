import React from 'react';
import { motion } from 'motion/react';
import PageHeader from './PageHeader';

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
      <PageHeader
        portalName={portalName}
        activeTab={activeTab}
        tabLabel={tabLabel}
        title={title}
        subtitle={subtitle}
        actions={actions}
        onNavigateHome={onNavigateHome}
      />

      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );
}
