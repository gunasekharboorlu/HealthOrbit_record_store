import React from 'react';
import { AlertTriangle, FileSearch, RefreshCw } from 'lucide-react';
import LoadingSkeleton from '../layout/LoadingSkeleton';

interface StateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = React.memo(function EmptyState({
  title = 'No Data Found',
  message = 'There are no items matching your criteria at this time.',
  action,
}: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-white/10 rounded-2xl bg-slate-900/40 text-center space-y-3">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400">
        <FileSearch className="w-8 h-8" />
      </div>
      <h4 className="text-sm font-bold font-display text-white">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-4 py-2 rounded-xl bg-[#38bdf8] text-slate-950 font-bold text-xs hover:brightness-110 cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
});

export const ErrorState = React.memo(function ErrorState({
  title = 'Unable to Load Data',
  message = 'An unexpected error occurred while processing request.',
  action,
}: StateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border border-rose-500/20 rounded-2xl bg-rose-500/5 text-center space-y-3">
      <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h4 className="text-sm font-bold font-display text-rose-200">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
});

export const LoadingState = React.memo(function LoadingState({
  type = 'page',
}: {
  type?: 'page' | 'card' | 'table';
}) {
  return <LoadingSkeleton type={type} />;
});
