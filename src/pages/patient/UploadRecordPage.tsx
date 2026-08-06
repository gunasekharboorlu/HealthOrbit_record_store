import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, FileText, CheckCircle, ShieldAlert, 
  ArrowRight, FileUp, Sparkles, RefreshCw, Lock
} from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import { GlassCard, PrimaryButton, SecondaryButton } from '../../components/ui';

interface UploadRecordPageProps {
  uploadTitle: string;
  setUploadTitle: (val: string) => void;
  uploadCategory: 'Lab Report' | 'Prescription' | 'Scan' | 'Discharge Summary' | 'Other';
  setUploadCategory: (val: any) => void;
  uploadDesc: string;
  setUploadDesc: (val: string) => void;
  uploadIsSensitive: boolean;
  setUploadIsSensitive: (val: boolean) => void;
  uploadFile: { name: string; size: string; content: string } | null;
  duplicateWarning: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadRecord: (e: React.FormEvent) => void;
  onNavigateTab: (tab: string) => void;
}

export default function UploadRecordPage({
  uploadTitle,
  setUploadTitle,
  uploadCategory,
  setUploadCategory,
  uploadDesc,
  setUploadDesc,
  uploadIsSensitive,
  setUploadIsSensitive,
  uploadFile,
  duplicateWarning,
  handleFileChange,
  handleUploadRecord,
  onNavigateTab,
}: UploadRecordPageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadFile) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      handleUploadRecord(e);
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1200);
  };

  const handleResetUpload = () => {
    setUploadTitle('');
    setUploadDesc('');
    setUploadSuccess(false);
    setUploadProgress(0);
  };

  return (
    <div className="space-y-8 md:space-y-10 animate-fade-in pb-12 max-w-3xl mx-auto">
      {/* Page Header */}
      <PageHeader
        portalName="Patient Portal"
        activeTab="upload"
        tabLabel="Upload Record"
        title="Ingest Medical Record"
        subtitle="Upload certified diagnostic reports, lab panels, prescriptions, or discharge summaries directly to your encrypted health ledger."
        onNavigateHome={() => onNavigateTab('dashboard')}
      />

      {/* Upload Flow Stepper */}
      <div className="grid grid-cols-3 gap-4 font-mono text-[10px]">
        <div className={`p-3 rounded-xl border ${uploadSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : isUploading ? 'bg-[#1D1D1F] border-[#1D1D1F] text-white' : 'bg-[#F5F5F7] border-[#E5E5E7] text-[#1D1D1F]'} flex items-center gap-2`}>
          <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center font-bold">1</span>
          <span className="font-bold">Record Details</span>
        </div>
        <div className={`p-3 rounded-xl border ${uploadSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : isUploading ? 'bg-[#1D1D1F] border-[#1D1D1F] text-white' : 'bg-[#F5F5F7] border-[#E5E5E7] text-[#1D1D1F]'} flex items-center gap-2`}>
          <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center font-bold">2</span>
          <span className="font-bold">File Verification</span>
        </div>
        <div className={`p-3 rounded-xl border ${uploadSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-[#F5F5F7] border-[#E5E5E7] text-[#6E6E73]'} flex items-center gap-2`}>
          <span className="w-5 h-5 rounded-full bg-black/5 flex items-center justify-center font-bold">3</span>
          <span className="font-bold">Ledger Sync</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {uploadSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GlassCard className="text-center p-8 space-y-6 border-emerald-200 bg-emerald-50/50 shadow-md">
              <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-700 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-[#1D1D1F]">
                  Document Ingested Successfully!
                </h3>
                <p className="text-xs text-[#6E6E73] max-w-md mx-auto leading-relaxed">
                  Your document has been verified with SHA-256 integrity checks and indexed into your medical record vault.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <PrimaryButton
                  icon={FileText}
                  onClick={() => onNavigateTab('records')}
                >
                  View Records Library
                </PrimaryButton>
                <SecondaryButton
                  icon={RefreshCw}
                  onClick={handleResetUpload}
                >
                  Upload Another Document
                </SecondaryButton>
              </div>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <GlassCard className="p-6 sm:p-8 space-y-6">
              <form onSubmit={onSubmitForm} className="space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#6E6E73] uppercase tracking-widest font-mono">
                    Document Title <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. LabCorp Comprehensive Metabolic Panel"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D2D2D7] text-xs font-semibold outline-none focus:border-[#0071E3] text-[#1D1D1F] placeholder-[#86868B]"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#6E6E73] uppercase tracking-widest font-mono">
                    Category Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D2D2D7] text-xs font-semibold outline-none focus:border-[#0071E3] text-[#1D1D1F] cursor-pointer"
                  >
                    <option value="Lab Report">
                      Lab Report
                    </option>
                    <option value="Prescription">
                      Prescription
                    </option>
                    <option value="Scan">
                      Scan / Imaging (X-Ray, MRI, CT)
                    </option>
                    <option value="Discharge Summary">
                      Discharge Summary
                    </option>
                    <option value="Other">
                      Other Medical Document
                    </option>
                  </select>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-[#6E6E73] uppercase tracking-widest font-mono">
                    Physician or Diagnostic Notes
                  </label>
                  <textarea
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    placeholder="e.g. Fasting glucose level 92 mg/dL. Normal range."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#D2D2D7] text-xs font-semibold outline-none focus:border-[#0071E3] resize-none text-[#1D1D1F] placeholder-[#86868B]"
                  />
                </div>

                {/* Sensitivity Toggle */}
                <div className="bg-[#F5F5F7] border border-[#E5E5E7] p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-[#1D1D1F] flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-amber-600" /> Apply Sensitivity Lock
                    </span>
                    <p className="text-[10px] text-[#6E6E73]">
                      Requires explicit patient clearance before doctors can inspect this record.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={uploadIsSensitive}
                    onChange={(e) => setUploadIsSensitive(e.target.checked)}
                    className="w-5 h-5 text-[#0071E3] accent-[#0071E3] rounded border-[#D2D2D7] bg-white cursor-pointer"
                  />
                </div>

                {/* File Upload Box */}
                <div className="border-2 border-dashed border-[#D2D2D7] hover:border-[#0071E3] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#F5F5F7] transition relative group">
                  <input
                    type="file"
                    required
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center justify-center mx-auto text-[#0071E3] group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="block text-xs font-bold text-[#1D1D1F]">
                      {uploadFile ? uploadFile.name : 'Click or drop document file here'}
                    </span>
                    <span className="block text-[10px] text-[#6E6E73] font-mono uppercase">
                      {uploadFile ? uploadFile.size : 'Supports PDF, PNG, JPG up to 10MB'}
                    </span>
                  </div>
                </div>

                {/* Duplicate Warning */}
                {duplicateWarning && (
                  <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs font-bold text-amber-800 font-mono">
                    ⚠️ {duplicateWarning}
                  </div>
                )}

                {/* Upload Progress Bar */}
                {isUploading && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono text-[#6E6E73]">
                      <span>Encrypting & Ingesting...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-[#E5E5E7] rounded-full h-2 overflow-hidden border border-[#D2D2D7]">
                      <div
                        className="bg-[#1D1D1F] h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <PrimaryButton
                  type="submit"
                  icon={FileUp}
                  fullWidth
                  size="lg"
                  isLoading={isUploading}
                >
                  Ingest Document to Vault
                </PrimaryButton>
              </form>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
