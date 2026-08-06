import React, { useState, useMemo } from 'react';
import { 
  Plus, Download, Trash2, Eye, FileText, 
  ShieldAlert, ShieldCheck, Lock, ArrowUpDown
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { 
  GlassCard, PrimaryButton, SecondaryButton, DangerButton, 
  Table, Badge, EmptyState, Modal, ConfirmDialog, Pagination 
} from '../../components/ui';
import { MedicalRecord } from '../../types';
import AdvancedFilterBar, { FilterState } from '../../components/common/AdvancedFilterBar';
import UniversalReportViewer from '../../components/common/UniversalReportViewer';

interface MedicalRecordsPageProps {
  records: MedicalRecord[];
  onNavigateTab: (tab: string) => void;
  handleDeleteRecord: (id: string) => void;
  downloadFile: (fileName: string, base64Content: string) => void;
}

export default function MedicalRecordsPage({
  records = [],
  onNavigateTab,
  handleDeleteRecord,
  downloadFile,
}: MedicalRecordsPageProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    datePreset: 'all',
    category: 'all',
    status: 'all',
    hospital: 'all',
    doctor: 'all',
    sensitiveOnly: false,
    verifiedOnly: false,
  });
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'title'>('newest');

  // Preview Modal / Universal Viewer State
  const [selectedReport, setSelectedReport] = useState<MedicalRecord | null>(null);


  // Delete Confirmation Dialog State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered and sorted records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        if (filterState.category !== 'all' && rec.category !== filterState.category) return false;
        if (filterState.sensitiveOnly && !rec.isSensitive) return false;

        const q = filterState.searchQuery.toLowerCase();
        if (q) {
          const matchesTitle = rec.title.toLowerCase().includes(q);
          const matchesDesc = (rec.description || '').toLowerCase().includes(q);
          const matchesFile = (rec.fileName || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesFile) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortOrder === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        } else {
          return a.title.localeCompare(b.title);
        }
      });
  }, [records, filterState, sortOrder]);

  // Paginated records
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      handleDeleteRecord(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Universal Medical Report Viewer Modal */}
      <UniversalReportViewer
        item={selectedReport}
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        onDownload={downloadFile}
      />

      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="records"
        tabLabel="Medical Records"
        title="Medical Records Vault"
        subtitle="Secure repository of your diagnostic logs, lab reports, prescriptions, and imaging scans."
        actions={
          <PrimaryButton
            icon={Plus}
            size="sm"
            onClick={() => onNavigateTab('upload')}
          >
            Upload New Record
          </PrimaryButton>
        }
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* Advanced Filter Bar Toolbar */}
      <AdvancedFilterBar
        filters={filterState}
        onFilterChange={(newF) => {
          setFilterState(newF);
          setCurrentPage(1);
        }}
        placeholder="Search records by title, file name, or notes..."
      />



      {/* Main Records Content Area */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          title="No Matching Medical Records"
          message={
            filterState.searchQuery || filterState.category !== 'all' || filterState.sensitiveOnly
              ? 'No records match your selected category or search keywords.'
              : 'You have not ingested any medical documents into your vault yet.'
          }
          action={
            filterState.searchQuery || filterState.category !== 'all' || filterState.sensitiveOnly
              ? {
                  label: 'Clear Filters',
                  onClick: () => {
                    setFilterState({
                      searchQuery: '',
                      datePreset: 'all',
                      category: 'all',
                      status: 'all',
                      hospital: 'all',
                      doctor: 'all',
                      sensitiveOnly: false,
                      verifiedOnly: false,
                    });
                  },
                }
              : {
                  label: 'Upload Record Now',
                  onClick: () => onNavigateTab('upload'),
                }
          }
        />
      ) : (
        <>
          {/* Card Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedRecords.map((rec) => (
              <div
                key={rec.id}
                className="bg-[#FBFBFD] border border-[#E5E5E7] hover:border-[#0071E3]/50 rounded-2xl p-5 space-y-4 transition-all duration-200 flex flex-col justify-between group shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono bg-[#0071E3]/10 text-[#0071E3] border border-[#0071E3]/20">
                      {rec.category}
                    </span>
                    {rec.isSensitive && (
                      <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Sensitive
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-[#1D1D1F] text-base leading-snug group-hover:text-[#0071E3] transition-colors">
                    {rec.title}
                  </h3>

                  <p className="text-xs text-[#6E6E73] leading-relaxed line-clamp-2">
                    {rec.description || 'No physician notes provided.'}
                  </p>
                </div>

                <div className="border-t border-[#E5E5E7] pt-3.5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-[#6E6E73] font-mono">
                    <span className="truncate max-w-[150px]">{rec.fileName}</span>
                    <span>{new Date(rec.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => setSelectedReport(rec)}
                      className="p-2 text-[#1D1D1F] hover:text-[#0071E3] bg-[#F5F5F7] hover:bg-[#E5E5E7] rounded-xl border border-[#D2D2D7] transition cursor-pointer flex items-center gap-1 text-xs font-semibold px-3"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect
                    </button>

                    <button
                      onClick={() => downloadFile(rec.fileName, rec.fileContent)}
                      className="p-2 text-[#1D1D1F] hover:text-[#0071E3] bg-[#F5F5F7] hover:bg-[#E5E5E7] rounded-xl border border-[#D2D2D7] transition cursor-pointer"
                      title="Download File"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTargetId(rec.id)}
                      className="p-2 text-[#6E6E73] hover:text-rose-600 bg-[#F5F5F7] hover:bg-rose-50 rounded-xl border border-[#D2D2D7] transition cursor-pointer"
                      title="Delete Record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}



      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Medical Record"
        message="Are you sure you want to delete this record from your vault? This action cannot be undone."
        confirmText="Delete Permanently"
        danger
      />
    </div>
  );
}
