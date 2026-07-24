import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, FileText, Activity, Stethoscope, Lock, ShieldCheck, 
  Eye, Download, ChevronRight, ChevronDown, Clock, Filter, Sparkles, Building, User
} from 'lucide-react';
import { GlassCard, StatusChip, Badge, PrimaryButton, SecondaryButton } from '../ui';

export interface TimelineRecordItem {
  id: string;
  type: 'record' | 'prescription' | 'note' | 'lab';
  title: string;
  category: string;
  description?: string;
  createdAt: string;
  isSensitive?: boolean;
  isLocked?: boolean;
  fileName?: string;
  fileSize?: string;
  fileContent?: string;
  doctorName?: string;
  doctorSpecialization?: string;
  hospitalName?: string;
  medications?: { name: string; dosage: string; frequency: string; duration: string }[];
  diagnosis?: string;
}

interface ProfessionalTimelineProps {
  items: TimelineRecordItem[];
  onOpenViewer?: (item: TimelineRecordItem) => void;
  onRequestAccess?: (recordId: string, title: string) => void;
  onDownload?: (fileName: string, content: string) => void;
}

export default function ProfessionalTimeline({
  items,
  onOpenViewer,
  onRequestAccess,
  onDownload,
}: ProfessionalTimelineProps) {
  const [collapsedYears, setCollapsedYears] = useState<Record<string, boolean>>({});
  const [collapsedMonths, setCollapsedMonths] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const toggleYear = (year: string) => {
    setCollapsedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleMonth = (monthKey: string) => {
    setCollapsedMonths(prev => ({ ...prev, [monthKey]: !prev[monthKey] }));
  };

  // Filter items
  const filteredItems = items.filter(item => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'sensitive') return item.isSensitive;
    return item.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  // Group hierarchically: Year -> Month -> Date -> Items
  const groupedTimeline = filteredItems.reduce((acc, item) => {
    const d = new Date(item.createdAt || Date.now());
    const year = d.getFullYear().toString();
    const month = d.toLocaleString('en-US', { month: 'long' });
    const monthKey = `${year}-${month}`;
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (!acc[year]) acc[year] = {};
    if (!acc[year][month]) acc[year][month] = {};
    if (!acc[year][month][dateStr]) acc[year][month][dateStr] = [];

    acc[year][month][dateStr].push(item);
    return acc;
  }, {} as Record<string, Record<string, Record<string, TimelineRecordItem[]>>>);

  const sortedYears = Object.keys(groupedTimeline).sort((a, b) => Number(b) - Number(a));

  const categories = ['all', 'sensitive', 'Lab Report', 'Prescription', 'Scan', 'Discharge Summary', 'General'];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#38bdf8]" />
          <span className="text-xs font-bold font-mono text-slate-300 uppercase">Timeline Filter:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#38bdf8] text-slate-950 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Records' : cat === 'sensitive' ? '🔒 Sensitive Only' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hierarchical Timeline Render */}
      {sortedYears.length === 0 ? (
        <GlassCard className="p-8 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Timeline Events Found</h3>
          <p className="text-xs text-slate-400">No medical records or prescriptions match your current filter criteria.</p>
        </GlassCard>
      ) : (
        <div className="space-y-8">
          {sortedYears.map(year => {
            const isYearCollapsed = collapsedYears[year];
            const monthsInYear = Object.keys(groupedTimeline[year]);

            return (
              <div key={year} className="space-y-4">
                
                {/* Year Header Accordion */}
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center justify-between bg-slate-900/80 hover:bg-slate-900 border border-white/10 px-5 py-3 rounded-2xl transition cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl border border-[#38bdf8]/20 group-hover:scale-105 transition">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="font-display font-extrabold text-lg text-white tracking-tight">
                      Year {year}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full">
                      {monthsInYear.reduce((acc, m) => acc + Object.values(groupedTimeline[year][m]).flat().length, 0)} records
                    </span>
                  </div>

                  <div className="p-1 text-slate-400 group-hover:text-white">
                    {isYearCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Year Content */}
                {!isYearCollapsed && (
                  <div className="pl-3 sm:pl-6 space-y-6 border-l-2 border-[#38bdf8]/20 ml-4">
                    {monthsInYear.map(month => {
                      const monthKey = `${year}-${month}`;
                      const isMonthCollapsed = collapsedMonths[monthKey];
                      const datesInMonth = Object.keys(groupedTimeline[year][month]);

                      return (
                        <div key={month} className="space-y-3">
                          
                          {/* Month Header */}
                          <button
                            onClick={() => toggleMonth(monthKey)}
                            className="flex items-center gap-2 text-xs font-bold font-mono text-[#38bdf8] uppercase tracking-wider hover:underline cursor-pointer"
                          >
                            {isMonthCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <span>{month}</span>
                          </button>

                          {/* Month Content */}
                          {!isMonthCollapsed && (
                            <div className="space-y-4 pl-4">
                              {datesInMonth.map(dateStr => (
                                <div key={dateStr} className="space-y-2">
                                  
                                  {/* Date Badge */}
                                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-white/5 text-[11px] font-mono text-slate-300 font-semibold">
                                    <Clock className="w-3 h-3 text-[#38bdf8]" /> {dateStr}
                                  </div>

                                  {/* Items on Date */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {groupedTimeline[year][month][dateStr].map(item => {
                                      const isPrescription = item.type === 'prescription' || item.category === 'Prescription';

                                      return (
                                        <motion.div
                                          key={item.id}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          className={`p-5 rounded-2xl border bg-slate-900/60 backdrop-blur-md space-y-3 relative hover:border-[#38bdf8]/40 transition group ${
                                            item.isLocked ? 'border-rose-500/30 bg-rose-950/10' : 'border-white/10'
                                          }`}
                                        >
                                          {/* Header Info */}
                                          <div className="flex justify-between items-start gap-2">
                                            <div className="flex items-center gap-2">
                                              <span className="p-2 rounded-xl bg-white/5 text-[#38bdf8] border border-white/5">
                                                {isPrescription ? <FileText className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                                              </span>
                                              <div>
                                                <h4 className="font-bold text-white text-sm group-hover:text-[#38bdf8] transition">
                                                  {item.title}
                                                </h4>
                                                <p className="text-[10px] text-slate-400 font-mono">
                                                  {item.hospitalName || 'HealthOrbit Network'} • Dr. {item.doctorName || 'Attending Physician'}
                                                </p>
                                              </div>
                                            </div>

                                            <span className="text-[10px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 px-2.5 py-0.5 rounded uppercase shrink-0">
                                              {item.category}
                                            </span>
                                          </div>

                                          {/* Description / Content Preview */}
                                          {item.isLocked ? (
                                            <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center justify-between text-xs text-rose-300">
                                              <span className="flex items-center gap-1.5">
                                                <Lock className="w-3.5 h-3.5" /> Confidential Record (Clearance Required)
                                              </span>
                                              {onRequestAccess && (
                                                <button
                                                  onClick={() => onRequestAccess(item.id, item.title)}
                                                  className="px-2.5 py-1 bg-rose-500 text-slate-950 rounded-lg font-bold text-[10px] hover:bg-rose-400 transition"
                                                >
                                                  Request Clearance
                                                </button>
                                              )}
                                            </div>
                                          ) : (
                                            <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                                              {item.description || item.diagnosis || 'Clinical evaluation record.'}
                                            </p>
                                          )}

                                          {/* Badges & Action Buttons */}
                                          <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                                            <div className="flex items-center gap-2">
                                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" /> Verified
                                              </span>
                                              {item.isSensitive && (
                                                <span className="text-[9px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                                                  <Lock className="w-3 h-3" /> Sensitive
                                                </span>
                                              )}
                                            </div>

                                            {!item.isLocked && (
                                              <div className="flex items-center gap-2">
                                                {onOpenViewer && (
                                                  <button
                                                    onClick={() => onOpenViewer(item)}
                                                    className="px-3 py-1.5 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 text-[#38bdf8] font-bold text-xs rounded-xl transition flex items-center gap-1 cursor-pointer"
                                                  >
                                                    <Eye className="w-3.5 h-3.5" /> Inspect Report
                                                  </button>
                                                )}
                                                {item.fileContent && onDownload && (
                                                  <button
                                                    onClick={() => onDownload(item.fileName || 'report.pdf', item.fileContent || '')}
                                                    className="p-1.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
                                                    title="Download Report"
                                                  >
                                                    <Download className="w-3.5 h-3.5" />
                                                  </button>
                                                )}
                                              </div>
                                            )}
                                          </div>

                                        </motion.div>
                                      );
                                    })}
                                  </div>

                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
