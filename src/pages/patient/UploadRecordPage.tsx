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
    <div className="space-y-6 animate-fade-in pb-12 max-w-3xl mx-auto">
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
      <div className="grid grid-cols-3 gap-3 font-mono text-[10px]">
        <div className={`p-3 rounded-xl border ${uploadSuccess ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : isUploading ? 'bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]' : 'bg-white/5 border-white/10 text-slate-300'} flex items-center gap-2`}>
          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold">1</span>
          <span className="font-bold">Record Details</span>
        </div>
        <div className={`p-3 rounded-xl border ${uploadSuccess ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : isUploading ? 'bg-[#38bdf8]/10 border-[#38bdf8]/30 text-[#38bdf8]' : 'bg-white/5 border-white/10 text-slate-300'} flex items-center gap-2`}>
          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold">2</span>
          <span className="font-bold">File Verification</span>
        </div>
        <div className={`p-3 rounded-xl border ${uploadSuccess ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400'} flex items-center gap-2`}>
          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold">3</span>
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
            <GlassCard className="text-center p-8 space-y-6 border-emerald-500/30 bg-emerald-950/20 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-white">
                  Document Ingested Successfully!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Document Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g. LabCorp Comprehensive Metabolic Panel"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs font-semibold outline-none focus:border-[#38bdf8] text-white placeholder-slate-500"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Category Type <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs font-semibold outline-none focus:border-[#38bdf8] text-white cursor-pointer"
                  >
                    <option value="Lab Report" className="bg-[#020617]">
                      Lab Report
                    </option>
                    <option value="Prescription" className="bg-[#020617]">
                      Prescription
                    </option>
                    <option value="Scan" className="bg-[#020617]">
                      Scan / Imaging (X-Ray, MRI, CT)
                    </option>
                    <option value="Discharge Summary" className="bg-[#020617]">
                      Discharge Summary
                    </option>
                    <option value="Other" className="bg-[#020617]">
                      Other Medical Document
                    </option>
                  </select>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Physician or Diagnostic Notes
                  </label>
                  <textarea
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    placeholder="e.g. Fasting glucose level 92 mg/dL. Normal range."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs font-semibold outline-none focus:border-[#38bdf8] resize-none text-white placeholder-slate-500"
                  />
                </div>

                {/* Sensitivity Toggle */}
                <div className="bg-slate-950/60 border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-white flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-amber-400" /> Apply Sensitivity Lock
                    </span>
                    <p className="text-[10px] text-slate-400">
                      Requires explicit patient clearance before doctors can inspect this record.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={uploadIsSensitive}
                    onChange={(e) => setUploadIsSensitive(e.target.checked)}
                    className="w-5 h-5 text-[#38bdf8] accent-[#38bdf8] rounded border-white/10 bg-[#020617] cursor-pointer"
                  />
                </div>

                {/* File Upload Box */}
                <div className="border-2 border-dashed border-white/15 hover:border-[#38bdf8] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#38bdf8]/5 transition relative group">
                  <input
                    type="file"
                    required
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#38bdf8] group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <span className="block text-xs font-bold text-white">
                      {uploadFile ? uploadFile.name : 'Click or drop document file here'}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono uppercase">
                      {uploadFile ? uploadFile.size : 'Supports PDF, PNG, JPG up to 10MB'}
                    </span>
                  </div>
                </div>

                {/* Duplicate Warning */}
                {duplicateWarning && (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-xs font-bold text-amber-300 font-mono">
                    ⚠️ {duplicateWarning}
                  </div>
                )}

                {/* Upload Progress Bar */}
                {isUploading && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono text-slate-300">
                      <span>Encrypting & Ingesting...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/10">
                      <div
                        className="bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] h-full transition-all duration-300"
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
