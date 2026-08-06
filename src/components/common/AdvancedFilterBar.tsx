import React, { useState } from 'react';
import { 
  Search, Filter, X, Calendar, Building, Stethoscope, Lock, ShieldCheck, RefreshCw, ChevronDown
} from 'lucide-react';
import { GlassCard } from '../ui';

export interface FilterState {
  searchQuery: string;
  datePreset: 'all' | 'today' | '7days' | '30days' | 'year';
  category: string;
  status: string;
  hospital: string;
  doctor: string;
  sensitiveOnly: boolean;
  verifiedOnly: boolean;
}

interface AdvancedFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  categories?: string[];
  hospitals?: string[];
  doctors?: string[];
  placeholder?: string;
}

export default function AdvancedFilterBar({
  filters,
  onFilterChange,
  categories = ['Lab Report', 'Prescription', 'Scan', 'Discharge Summary', 'Clinical Note'],
  hospitals = ['HealthOrbit Central', 'Metro Care Hospital', 'St. Jude Medical Center'],
  doctors = ['Dr. Sarah Jenkins', 'Dr. Michael Chen', 'Dr. Robert Vance'],
  placeholder = 'Search by title, condition, patient ID...',
}: AdvancedFilterBarProps) {
  const [expanded, setExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      datePreset: 'all',
      category: 'all',
      status: 'all',
      hospital: 'all',
      doctor: 'all',
      sensitiveOnly: false,
      verifiedOnly: false,
    });
  };

  const activeCount = 
    (filters.searchQuery ? 1 : 0) +
    (filters.datePreset !== 'all' ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    (filters.status !== 'all' ? 1 : 0) +
    (filters.hospital !== 'all' ? 1 : 0) +
    (filters.doctor !== 'all' ? 1 : 0) +
    (filters.sensitiveOnly ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0);

  return (
    <GlassCard className="p-4 space-y-3">
      {/* Search Input & Expand Toggle */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#86868B]" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => updateFilter('searchQuery', e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] placeholder-[#86868B] focus:border-[#0071E3] outline-none transition"
          />
          {filters.searchQuery && (
            <button
              onClick={() => updateFilter('searchQuery', '')}
              className="absolute right-3 top-2.5 text-[#86868B] hover:text-[#1D1D1F]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition flex items-center gap-2 cursor-pointer ${
              expanded || activeCount > 0
                ? 'bg-[#1D1D1F] text-white shadow-xs'
                : 'bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5E7] hover:bg-[#E8E8ED]'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters {activeCount > 0 && `(${activeCount})`}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          {activeCount > 0 && (
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold font-mono transition cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {expanded && (
        <div className="pt-3 border-t border-[#E5E5E7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs animate-fade-in">
          
          {/* Date Preset */}
          <div>
            <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Date Range</label>
            <select
              value={filters.datePreset}
              onChange={e => updateFilter('datePreset', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none cursor-pointer focus:border-[#0071E3]"
            >
              <option value="all">All Time</option>
              <option value="today">Today Only</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="year">This Year (2026)</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Category</label>
            <select
              value={filters.category}
              onChange={e => updateFilter('category', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none cursor-pointer focus:border-[#0071E3]"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Clearance Status</label>
            <select
              value={filters.status}
              onChange={e => updateFilter('status', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none cursor-pointer focus:border-[#0071E3]"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Clearances</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="locked">Restricted / Locked</option>
            </select>
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-[10px] font-bold text-[#6E6E73] uppercase font-mono mb-1">Hospital Network</label>
            <select
              value={filters.hospital}
              onChange={e => updateFilter('hospital', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#D2D2D7] text-xs text-[#1D1D1F] outline-none cursor-pointer focus:border-[#0071E3]"
            >
              <option value="all">All Hospitals</option>
              {hospitals.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>

          {/* Toggles */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap items-center gap-4 pt-2 border-t border-[#E5E5E7]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1D1D1F] font-mono">
              <input
                type="checkbox"
                checked={filters.sensitiveOnly}
                onChange={e => updateFilter('sensitiveOnly', e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
              <span className="flex items-center gap-1 text-rose-700 font-bold"><Lock className="w-3.5 h-3.5" /> Sensitive Records Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1D1D1F] font-mono">
              <input
                type="checkbox"
                checked={filters.verifiedOnly}
                onChange={e => updateFilter('verifiedOnly', e.target.checked)}
                className="w-4 h-4 accent-[#0071E3] rounded cursor-pointer"
              />
              <span className="flex items-center gap-1 text-emerald-700 font-bold"><ShieldCheck className="w-3.5 h-3.5" /> SHA-256 Verified Only</span>
            </label>
          </div>

        </div>
      )}
    </GlassCard>
  );
}
