import React, { useState } from 'react';
import { 
  Key, Shield, Clock, CheckCircle, ShieldAlert, AlertCircle, RefreshCw, XCircle, Search
} from 'lucide-react';
import { GlassCard, StatusChip, Badge, SearchBar, EmptyState } from '../../components/ui';

interface AccessRequestsPageProps {
  approvedAccessRequests: any[];
  pendingAccessRequests: any[];
  getAccessTimer: (respondedAt: string) => string;
}

export default function AccessRequestsPage({
  approvedAccessRequests = [],
  pendingAccessRequests = [],
  getAccessTimer,
}: AccessRequestsPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allRequests = [
    ...approvedAccessRequests.map(r => ({ ...r, status: 'approved' })),
    ...pendingAccessRequests.map(r => ({ ...r, status: 'pending' })),
  ];

  const filtered = allRequests.filter(req => {
    const matchesTab = activeFilter === 'all' || req.status === activeFilter;
    const matchesSearch = !searchQuery || 
      (req.patientId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.recordTitle || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-display font-bold text-[#1D1D1F]">Access Clearances Management</h1>
        <p className="text-xs text-[#6E6E73] mt-1">
          Monitor sensitive medical record clearance authorizations granted by patients across the HealthOrbit network.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <GlassCard className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
              activeFilter === 'all' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E5E5E7] border border-[#E5E5E7]'
            }`}
          >
            All Clearances ({allRequests.length})
          </button>
          <button
            onClick={() => setActiveFilter('approved')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
              activeFilter === 'approved' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E5E5E7] border border-[#E5E5E7]'
            }`}
          >
            Active 24-hr Clearances ({approvedAccessRequests.length})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
              activeFilter === 'pending' ? 'bg-amber-600 text-white shadow-xs' : 'bg-[#F5F5F7] text-[#6E6E73] hover:bg-[#E5E5E7] border border-[#E5E5E7]'
            }`}
          >
            Pending Requests ({pendingAccessRequests.length})
          </button>
        </div>

        <div className="w-full sm:w-64">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Filter requests..." onClear={() => setSearchQuery('')} />
        </div>
      </GlassCard>

      {/* Grid of Clearances */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Clearance Records"
          message="There are no clearance requests matching your current selection."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((req: any) => {
            const isApproved = req.status === 'approved';

            return (
              <GlassCard
                key={req.id}
                className={`p-5 space-y-3 border-l-4 ${
                  isApproved ? 'border-l-emerald-600 border-emerald-200' : 'border-l-amber-600 border-amber-200'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#0071E3]">PATIENT ID: {req.patientId}</span>
                    <h3 className="font-bold text-[#1D1D1F] text-sm">{req.recordTitle || 'Sensitive Record'}</h3>
                  </div>

                  <StatusChip status={isApproved ? 'Approved' : 'Pending'} />
                </div>

                <div className="bg-[#F5F5F7] p-3 rounded-xl border border-[#E5E5E7] flex items-center justify-between text-xs">
                  <span className="text-[#6E6E73] font-mono text-[10px]">TIME WINDOW STATUS:</span>
                  <span className={`font-mono font-bold ${isApproved ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {isApproved ? getAccessTimer(req.respondedAt) : 'Awaiting Patient Authorization'}
                  </span>
                </div>

                <p className="text-[11px] text-[#6E6E73] font-mono">
                  Requested on: {new Date(req.requestedAt || Date.now()).toLocaleString()}
                </p>
              </GlassCard>
            );
          })}
        </div>
      )}

    </div>
  );
}
