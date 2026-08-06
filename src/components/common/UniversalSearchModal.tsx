import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Users, Stethoscope, FileText, Activity, 
  X, History, ArrowRight
} from 'lucide-react';
import { api } from '../../api';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: (type: string, item: any) => void;
}

export default function UniversalSearchModal({
  isOpen,
  onClose,
  onSelectResult,
}: UniversalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    patients: any[];
    doctors: any[];
    hospitals: any[];
    records: any[];
    prescriptions: any[];
    auditLogs: any[];
  }>({
    patients: [],
    doctors: [],
    hospitals: [],
    records: [],
    prescriptions: [],
    auditLogs: [],
  });

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('healthorbit_recent_searches');
      return stored ? JSON.parse(stored) : ['PAT-80924', 'Dr. Sarah', 'Lab Report', 'Cardiology'];
    } catch (e) {
      return ['PAT-80924', 'Cardiology'];
    }
  });

  // Global Keyboard Shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const btn = document.getElementById('trigger-universal-search');
          if (btn) btn.click();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Execute Search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ patients: [], doctors: [], hospitals: [], records: [], prescriptions: [], auditLogs: [] });
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      const searchFn = (api as any).universalSearch;
      if (searchFn) {
        searchFn(query)
          .then((res: any) => {
            setResults({
              patients: res?.patients || [],
              doctors: res?.doctors || [],
              hospitals: res?.hospitals || [],
              records: res?.records || [],
              prescriptions: res?.prescriptions || [],
              auditLogs: res?.auditLogs || [],
            });
          })
          .catch(err => console.error(err))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const saveRecentSearch = (q: string) => {
    if (!q.trim()) return;
    const updated = [q, ...recentSearches.filter(s => s.toLowerCase() !== q.toLowerCase())].slice(0, 8);
    setRecentSearches(updated);
    try {
      localStorage.setItem('healthorbit_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const removeRecentSearch = (q: string) => {
    const updated = recentSearches.filter(s => s !== q);
    setRecentSearches(updated);
    try {
      localStorage.setItem('healthorbit_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('healthorbit_recent_searches');
  };

  const totalResults = results.patients.length + results.doctors.length + results.hospitals.length + 
                       results.records.length + results.prescriptions.length + results.auditLogs.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/30 backdrop-blur-xs">
          
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="w-full max-w-3xl bg-white border border-[#E5E5E7] rounded-3xl shadow-xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Top Input Bar */}
            <div className="p-4 border-b border-[#E5E5E7] flex items-center gap-3 bg-[#F5F5F7]">
              <Search className="w-5 h-5 text-[#86868B] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search patients, doctors, hospitals, reports, prescriptions..."
                className="flex-1 bg-transparent text-sm sm:text-base font-normal text-[#1D1D1F] placeholder-[#86868B] outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-1 text-[#86868B] hover:text-[#1D1D1F]">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-white border border-[#E5E5E7] rounded-lg text-[10px] font-mono text-[#86868B]">
                ESC
              </kbd>
            </div>

            {/* Search Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Loading Indicator */}
              {loading && (
                <div className="flex items-center justify-center py-8 text-xs text-[#0071E3] font-mono gap-2">
                  <div className="w-4 h-4 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
                  Querying HealthOrbit Index...
                </div>
              )}

              {/* Empty state & Recent Searches */}
              {!query.trim() && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono font-medium text-[#86868B] uppercase">
                    <span className="flex items-center gap-1.5"><History className="w-4 h-4 text-[#1D1D1F]" /> Recent Searches</span>
                    {recentSearches.length > 0 && (
                      <button onClick={clearAllRecent} className="text-[10px] text-[#86868B] hover:text-rose-600 cursor-pointer">
                        Clear History
                      </button>
                    )}
                  </div>

                  {recentSearches.length === 0 ? (
                    <p className="text-xs text-[#86868B]">No recent search history.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s, idx) => (
                        <div
                          key={idx}
                          className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] text-xs text-[#1D1D1F] hover:bg-[#E8E8ED] transition cursor-pointer"
                        >
                          <span onClick={() => setQuery(s)}>{s}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); removeRecentSearch(s); }}
                            className="text-[#86868B] hover:text-rose-600 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Results Display */}
              {query.trim() && !loading && (
                <div className="space-y-6">
                  
                  {totalResults === 0 ? (
                    <div className="text-center py-12 space-y-2">
                      <Search className="w-8 h-8 text-[#86868B] mx-auto" />
                      <p className="text-sm font-bold text-[#1D1D1F]">No Matching Results</p>
                      <p className="text-xs text-[#6E6E73]">No entries matched "{query}". Try checking patient ID or doctor name.</p>
                    </div>
                  ) : (
                    <>
                      {/* Patients Section */}
                      {results.patients.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-medium text-[#6E6E73] uppercase flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" /> Patients ({results.patients.length})
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {results.patients.map(p => (
                              <div
                                key={p.patientId || p.id}
                                onClick={() => {
                                  saveRecentSearch(p.name || p.patientId);
                                  if (onSelectResult) onSelectResult('patient', p);
                                  onClose();
                                }}
                                className="p-3 bg-[#FBFBFD] hover:bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl transition cursor-pointer flex justify-between items-center"
                              >
                                <div>
                                  <h4 className="font-semibold text-[#1D1D1F] text-xs">{p.name}</h4>
                                  <p className="text-[10px] text-[#6E6E73] font-mono">ID: {p.patientId} • Blood: {p.bloodGroup} • Phone: {p.phone || 'N/A'}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#86868B]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Doctors Section */}
                      {results.doctors.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-medium text-[#6E6E73] uppercase flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5" /> Practitioners ({results.doctors.length})
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {results.doctors.map(d => (
                              <div
                                key={d.id}
                                onClick={() => {
                                  saveRecentSearch(d.name);
                                  if (onSelectResult) onSelectResult('doctor', d);
                                  onClose();
                                }}
                                className="p-3 bg-[#FBFBFD] hover:bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl transition cursor-pointer flex justify-between items-center"
                              >
                                <div>
                                  <h4 className="font-semibold text-[#1D1D1F] text-xs">Dr. {d.name}</h4>
                                  <p className="text-[10px] text-[#6E6E73] font-mono">{d.specialization} • Lic: {d.licenseNumber}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#86868B]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reports Section */}
                      {results.records.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-medium text-[#6E6E73] uppercase flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" /> Medical Reports ({results.records.length})
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {results.records.map(r => (
                              <div
                                key={r.id}
                                onClick={() => {
                                  saveRecentSearch(r.title);
                                  if (onSelectResult) onSelectResult('record', r);
                                  onClose();
                                }}
                                className="p-3 bg-[#FBFBFD] hover:bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl transition cursor-pointer flex justify-between items-center"
                              >
                                <div>
                                  <h4 className="font-semibold text-[#1D1D1F] text-xs">{r.title}</h4>
                                  <p className="text-[10px] text-[#6E6E73] font-mono">Category: {r.category} • File: {r.fileName || 'Document'}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#86868B]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Prescriptions Section */}
                      {results.prescriptions.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-medium text-[#6E6E73] uppercase flex items-center gap-1">
                            <Activity className="w-3.5 h-3.5" /> Prescriptions ({results.prescriptions.length})
                          </span>
                          <div className="grid grid-cols-1 gap-2">
                            {results.prescriptions.map(pr => (
                              <div
                                key={pr.id}
                                onClick={() => {
                                  saveRecentSearch(pr.diagnosis || 'Prescription');
                                  if (onSelectResult) onSelectResult('prescription', pr);
                                  onClose();
                                }}
                                className="p-3 bg-[#FBFBFD] hover:bg-[#F5F5F7] border border-[#E5E5E7] rounded-xl transition cursor-pointer flex justify-between items-center"
                              >
                                <div>
                                  <h4 className="font-semibold text-[#1D1D1F] text-xs">{pr.diagnosis || 'Prescription Script'}</h4>
                                  <p className="text-[10px] text-[#6E6E73] font-mono">Patient: {pr.patientId} • Meds: {pr.medications?.length || 0}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#86868B]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                </div>
              )}

            </div>

            {/* Footer Navigation Hints */}
            <div className="p-3 border-t border-[#E5E5E7] bg-[#F5F5F7] flex items-center justify-between text-[10px] text-[#86868B] font-mono">
              <span>HEALTHORBIT SEARCH</span>
              <span>PRESS ESC TO CLOSE</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
