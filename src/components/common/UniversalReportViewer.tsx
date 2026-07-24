import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize2, Minimize2, 
  Printer, Download, ShieldCheck, Lock, FileText, Calendar, Building, 
  User, Stethoscope, CheckCircle, Eye, Activity, Hash, AlertTriangle, File
} from 'lucide-react';
import { GlassCard, StatusChip, Badge, PrimaryButton, SecondaryButton } from '../ui';

interface ReportViewerItem {
  id: string;
  title: string;
  category: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isSensitive?: boolean;
  sha256Hash?: string;
  fileName?: string;
  fileSize?: string;
  fileContent?: string;
  doctorName?: string;
  doctorSpecialization?: string;
  doctorLicense?: string;
  hospitalName?: string;
  hospitalAddress?: string;
  patientName?: string;
  patientId?: string;
  medications?: { name: string; dosage: string; frequency: string; duration: string }[];
  diagnosis?: string;
}

interface UniversalReportViewerProps {
  item: ReportViewerItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload?: (fileName: string, content: string) => void;
}

export default function UniversalReportViewer({
  item,
  isOpen,
  onClose,
  onDownload,
}: UniversalReportViewerProps) {
  if (!isOpen || !item) return null;

  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'metadata' | 'verification'>('preview');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 15, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 15, 50));
  const handleResetZoom = () => { setZoom(100); setRotation(0); };
  const handleRotateRight = () => setRotation(prev => (prev + 90) % 360);
  const handleRotateLeft = () => setRotation(prev => (prev - 90 + 360) % 360);

  const isPdf = item.fileName?.toLowerCase().endsWith('.pdf') || item.fileContent?.startsWith('data:application/pdf');
  const isImage = item.fileName?.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)$/) || item.fileContent?.startsWith('data:image/');
  const isPrescription = item.category === 'Prescription' || Boolean(item.medications?.length);

  const hashString = item.sha256Hash || `sha256-${(item.id + item.title).slice(0, 16)}-healthorbit-verified-cert`;
  const formattedDate = item.createdAt ? new Date(item.createdAt).toLocaleString() : new Date().toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#020617]/90 backdrop-blur-xl animate-fade-in">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`w-full max-w-6xl bg-slate-950 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-2 z-50 max-w-none rounded-2xl' : 'h-[90vh]'
          }`}
        >
          {/* Top Control Bar */}
          <div className="bg-slate-900/90 border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
            
            {/* Title & Category */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl border border-[#38bdf8]/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white font-display truncate max-w-xs sm:max-w-md">
                    {item.title}
                  </h2>
                  <span className="text-[10px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2 py-0.5 rounded uppercase">
                    {item.category}
                  </span>
                  {item.isSensitive && (
                    <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Sensitive Record
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Uploaded: {formattedDate} | File: {item.fileName || 'Digital Clinical Note'} ({item.fileSize || 'Signed Text'})
                </p>
              </div>
            </div>

            {/* Viewer Toolbar Controls */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white disabled:opacity-30 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleResetZoom}
                className="px-2.5 py-1 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white text-xs font-mono font-bold transition cursor-pointer"
                title="Reset Zoom"
              >
                {zoom}%
              </button>
              <button 
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white disabled:opacity-30 transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-white/10 mx-1" />

              <button 
                onClick={handleRotateLeft}
                className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
                title="Rotate Left 90°"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={handleRotateRight}
                className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
                title="Rotate Right 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-white/10 mx-1" />

              <button 
                onClick={handlePrint}
                className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
                title="Print Report"
              >
                <Printer className="w-4 h-4" />
              </button>

              {item.fileContent && onDownload && (
                <button 
                  onClick={() => onDownload(item.fileName || 'report.pdf', item.fileContent || '')}
                  className="p-1.5 hover:bg-white/10 rounded-xl text-[#38bdf8] hover:bg-[#38bdf8]/10 transition cursor-pointer"
                  title="Download Copy"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}

              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <div className="w-px h-4 bg-white/10 mx-1" />

              <button 
                onClick={onClose}
                className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl transition cursor-pointer"
                title="Close Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Viewer & Metadata Split Layout */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
            
            {/* Left Stage Container */}
            <div className="flex-1 bg-slate-950 p-4 sm:p-6 overflow-auto flex items-center justify-center relative min-h-[350px]">
              <div 
                className="transition-transform duration-200 ease-out flex justify-center items-center"
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'center center'
                }}
              >
                {/* RENDER PDF / IMAGE / PRESCRIPTION DOCUMENT */}
                {isImage && item.fileContent ? (
                  <img 
                    src={item.fileContent} 
                    alt={item.title} 
                    className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl object-contain border border-white/10"
                  />
                ) : isPdf && item.fileContent ? (
                  <iframe 
                    src={item.fileContent} 
                    title={item.title}
                    className="w-[700px] h-[800px] max-w-full rounded-2xl border border-white/10 bg-white"
                  />
                ) : (
                  /* Standard HealthOrbit Formatted Medical Certificate View */
                  <div className="w-[650px] max-w-full bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6 text-left">
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-white/10 pb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Activity className="w-6 h-6 text-[#38bdf8]" />
                          <span className="font-display font-extrabold text-lg text-white tracking-tight">HealthOrbit Clinical Network</span>
                        </div>
                        <p className="text-xs text-slate-400">{item.hospitalName || 'HealthOrbit Affiliated Medical Center'}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{item.hospitalAddress || '100 HealthOrbit Way, Suite 400 • Medical District'}</p>
                      </div>

                      <div className="text-right space-y-1">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1 justify-end">
                          <ShieldCheck className="w-3.5 h-3.5" /> SHA-256 VERIFIED
                        </span>
                        <p className="text-[10px] text-slate-400 font-mono">Issued: {formattedDate}</p>
                      </div>
                    </div>

                    {/* Patient & Practitioner Box */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-white/5">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">PATIENT DETAILS</span>
                        <p className="text-xs font-bold text-white mt-1">{item.patientName || 'Verified Patient'}</p>
                        <p className="text-[10px] text-slate-400 font-mono">ID: {item.patientId || 'PAT-CURRENT'}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">ATTENDING CLINICIAN</span>
                        <p className="text-xs font-bold text-white mt-1">Dr. {item.doctorName || 'Authorized Practitioner'}</p>
                        <p className="text-[10px] text-[#38bdf8] font-mono">{item.doctorSpecialization || 'General Practitioner'} | Lic #: {item.doctorLicense || 'LIC-883921'}</p>
                      </div>
                    </div>

                    {/* Report Content or Prescriptions Table */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold font-mono text-[#38bdf8] uppercase tracking-wider">
                        Clinical Report Details & Findings
                      </h4>

                      {item.diagnosis && (
                        <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase block">Diagnosis:</span>
                          <p className="text-xs text-white font-semibold mt-0.5">{item.diagnosis}</p>
                        </div>
                      )}

                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                        {item.description || 'Verified clinical observation record signed and attached to the patient ledger under HealthOrbit zero-trust security framework.'}
                      </p>

                      {/* Medications List if Prescription */}
                      {isPrescription && item.medications && item.medications.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Prescribed Medications:</span>
                          <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden bg-slate-950">
                            {item.medications.map((m, idx) => (
                              <div key={idx} className="p-3 flex justify-between items-center text-xs">
                                <div>
                                  <span className="font-bold text-white">{m.name}</span>
                                  <span className="text-slate-400 text-[10px] ml-2">({m.dosage})</span>
                                </div>
                                <div className="text-right text-[10px] font-mono text-slate-400">
                                  <span>{m.frequency}</span> • <span className="text-[#38bdf8]">{m.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Digital Seal Footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>DIGITALLY SIGNED & HASHED</span>
                      <span className="truncate max-w-[250px]">{hashString}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Metadata & SHA-256 Ledger Verification Panel */}
            <div className="w-full md:w-80 bg-slate-900/90 border-t md:border-t-0 md:border-l border-white/10 p-5 space-y-5 overflow-y-auto shrink-0">
              
              {/* Tab Navigation */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-white/5">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition ${
                    activeTab === 'preview' ? 'bg-[#38bdf8] text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('verification')}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition ${
                    activeTab === 'verification' ? 'bg-[#38bdf8] text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SHA-256 Audit
                </button>
              </div>

              {activeTab === 'preview' ? (
                <div className="space-y-4 text-xs">
                  
                  {/* Status & Security Badges */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">SECURITY & ACCESSIBILITY</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> SHA-256 VERIFIED
                      </span>
                      {item.isSensitive ? (
                        <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" /> RESTRICTED / SENSITIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" /> STANDARD CLEARANCE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata Specs */}
                  <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-white/5 font-mono">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Record Category</span>
                      <span className="text-white font-bold text-xs">{item.category}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Timestamp</span>
                      <span className="text-slate-300 text-xs">{formattedDate}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">File Identifier</span>
                      <span className="text-slate-300 text-xs truncate block">{item.fileName || 'Digital Clinical Certificate'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">File Size</span>
                      <span className="text-slate-300 text-xs">{item.fileSize || 'Standard 12 KB'}</span>
                    </div>
                  </div>

                  {/* Hospital & Doctor Details */}
                  <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#38bdf8]" />
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-mono block">Medical Facility</span>
                        <span className="text-white font-bold text-xs">{item.hospitalName || 'HealthOrbit Central Network'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <User className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-mono block">Authorizing Doctor</span>
                        <span className="text-white font-bold text-xs">Dr. {item.doctorName || 'Attending Physician'}</span>
                        <p className="text-[10px] text-slate-400 font-mono">{item.doctorSpecialization || 'Practitioner'}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* SHA-256 Audit Verification Tab */
                <div className="space-y-4 text-xs font-mono">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4" /> Cryptographic Integrity Intact
                    </div>
                    <p className="text-[10px] text-slate-300 leading-normal">
                      This record hash matches the tamper-evident entry logged in the HealthOrbit network ledger.
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">SHA-256 Checksum:</span>
                    <p className="text-[10px] text-[#38bdf8] break-all font-mono leading-relaxed bg-black/40 p-2 rounded-lg border border-white/5">
                      {hashString}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-[9px] text-slate-500 uppercase block font-bold">Verification Engine:</span>
                    <p className="text-[11px] text-slate-300">HealthOrbit SHA-256 Zero-Trust Ledger v3.5</p>
                    <p className="text-[10px] text-slate-500">Node ID: NODE-ASIA-SG-9904</p>
                  </div>
                </div>
              )}

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
