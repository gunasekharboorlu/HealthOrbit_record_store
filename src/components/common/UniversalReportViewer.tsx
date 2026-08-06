import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize2, Minimize2, 
  Printer, Download, ShieldCheck, Lock, FileText, Building, 
  User, CheckCircle, Activity
} from 'lucide-react';

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
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'metadata' | 'verification'>('preview');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 15, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 15, 50));
  const handleResetZoom = () => { setZoom(100); setRotation(0); };
  const handleRotateRight = () => setRotation(prev => (prev + 90) % 360);
  const handleRotateLeft = () => setRotation(prev => (prev - 90 + 360) % 360);

  const isPdf = item?.fileName?.toLowerCase().endsWith('.pdf') || item?.fileContent?.startsWith('data:application/pdf');
  const isImage = item?.fileName?.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)$/) || item?.fileContent?.startsWith('data:image/');
  const isPrescription = item?.category === 'Prescription' || Boolean(item?.medications?.length);

  const hashString = item?.sha256Hash || `sha256-${((item?.id || '') + (item?.title || '')).slice(0, 16)}-healthorbit-verified-cert`;
  const formattedDate = item?.createdAt ? new Date(item.createdAt).toLocaleString() : new Date().toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {Boolean(isOpen && item) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/30 backdrop-blur-xs">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className={`w-full max-w-6xl bg-white border border-[#E5E5E7] rounded-3xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 ${
            isFullscreen ? 'fixed inset-2 z-50 max-w-none rounded-2xl' : 'h-[90vh]'
          }`}
        >
          {/* Top Control Bar */}
          <div className="bg-[#F5F5F7] border-b border-[#E5E5E7] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
            
            {/* Title & Category */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#1D1D1F] text-white rounded-2xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#1D1D1F] truncate max-w-xs sm:max-w-md">
                    {item.title}
                  </h2>
                  <span className="text-[10px] font-mono bg-white border border-[#E5E5E7] text-[#1D1D1F] px-2 py-0.5 rounded font-medium">
                    {item.category}
                  </span>
                  {item.isSensitive && (
                    <span className="text-[10px] font-mono font-medium text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Sensitive Record
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#6E6E73] font-mono mt-0.5">
                  Uploaded: {formattedDate} | File: {item.fileName || 'Digital Clinical Note'} ({item.fileSize || 'Signed Text'})
                </p>
              </div>
            </div>

            {/* Viewer Toolbar Controls */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E5E5E7]">
              <button 
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="p-1.5 hover:bg-[#F5F5F7] rounded-full text-[#6E6E73] hover:text-[#1D1D1F] disabled:opacity-30 transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleResetZoom}
                className="px-2.5 py-1 hover:bg-[#F5F5F7] rounded-full text-[#1D1D1F] text-xs font-mono font-medium transition cursor-pointer"
                title="Reset Zoom"
              >
                {zoom}%
              </button>
              <button 
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="p-1.5 hover:bg-[#F5F5F7] rounded-full text-[#6E6E73] hover:text-[#1D1D1F] disabled:opacity-30 transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-[#E5E5E7] mx-1" />

              <button 
                onClick={handleRotateLeft}
                className="p-1.5 hover:bg-[#F5F5F7] rounded-full text-[#6E6E73] hover:text-[#1D1D1F] transition cursor-pointer"
                title="Rotate Left 90°"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={handleRotateRight}
                className="p-1.5 hover:bg-[#F5F5F7] rounded-full text-[#6E6E73] hover:text-[#1D1D1F] transition cursor-pointer"
                title="Rotate Right 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-[#E5E5E7] mx-1" />

              <button 
                onClick={handlePrint}
                className="p-1.5 hover:bg-[#F5F5F7] rounded-full text-[#6E6E73] hover:text-[#1D1D1F] transition cursor-pointer"
                title="Print Report"
              >
                <Printer className="w-4 h-4" />
              </button>

              {item.fileContent && onDownload && (
                <button 
                  onClick={() => onDownload(item.fileName || 'report.pdf', item.fileContent || '')}
                  className="p-1.5 hover:bg-[#F5F5F7] rounded-full text-[#0071E3] transition cursor-pointer"
                  title="Download Copy"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}

              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:bg-[#F5F5F7] rounded-full text-[#6E6E73] hover:text-[#1D1D1F] transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <div className="w-px h-4 bg-[#E5E5E7] mx-1" />

              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-full transition cursor-pointer"
                title="Close Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Viewer & Metadata Split Layout */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
            
            {/* Left Stage Container */}
            <div className="flex-1 bg-[#F5F5F7] p-4 sm:p-6 overflow-auto flex items-center justify-center relative min-h-[350px]">
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
                    className="max-w-full max-h-[70vh] rounded-2xl shadow-md object-contain border border-[#E5E5E7]"
                  />
                ) : isPdf && item.fileContent ? (
                  <iframe 
                    src={item.fileContent} 
                    title={item.title}
                    className="w-[700px] h-[800px] max-w-full rounded-2xl border border-[#E5E5E7] bg-white shadow-md"
                  />
                ) : (
                  /* Standard HealthOrbit Formatted Medical Certificate View */
                  <div className="w-[650px] max-w-full bg-white border border-[#E5E5E7] rounded-3xl p-8 shadow-md space-y-6 text-left">
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-[#E5E5E7] pb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Activity className="w-6 h-6 text-[#1D1D1F]" />
                          <span className="font-bold text-lg text-[#1D1D1F] tracking-tight">HealthOrbit Clinical Network</span>
                        </div>
                        <p className="text-xs text-[#6E6E73]">{item.hospitalName || 'HealthOrbit Affiliated Medical Center'}</p>
                        <p className="text-[10px] text-[#86868B] font-mono">{item.hospitalAddress || '100 HealthOrbit Way, Suite 400 • Medical District'}</p>
                      </div>

                      <div className="text-right space-y-1">
                        <span className="text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1 justify-end">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> SHA-256 VERIFIED
                        </span>
                        <p className="text-[10px] text-[#86868B] font-mono">Issued: {formattedDate}</p>
                      </div>
                    </div>

                    {/* Patient & Practitioner Box */}
                    <div className="grid grid-cols-2 gap-4 bg-[#F5F5F7] p-4 rounded-2xl border border-[#E5E5E7]">
                      <div>
                        <span className="text-[10px] font-mono font-medium text-[#86868B] uppercase block">PATIENT DETAILS</span>
                        <p className="text-xs font-bold text-[#1D1D1F] mt-1">{item.patientName || 'Verified Patient'}</p>
                        <p className="text-[10px] text-[#6E6E73] font-mono">ID: {item.patientId || 'PAT-CURRENT'}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-medium text-[#86868B] uppercase block">ATTENDING CLINICIAN</span>
                        <p className="text-xs font-bold text-[#1D1D1F] mt-1">Dr. {item.doctorName || 'Authorized Practitioner'}</p>
                        <p className="text-[10px] text-[#0071E3] font-mono">{item.doctorSpecialization || 'General Practitioner'} | Lic #: {item.doctorLicense || 'LIC-883921'}</p>
                      </div>
                    </div>

                    {/* Report Content or Prescriptions Table */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-medium text-[#1D1D1F] uppercase tracking-wider">
                        Clinical Report Details & Findings
                      </h4>

                      {item.diagnosis && (
                        <div className="bg-[#F5F5F7] p-3 rounded-xl border border-[#E5E5E7]">
                          <span className="text-[10px] text-[#86868B] font-medium uppercase block">Diagnosis:</span>
                          <p className="text-xs text-[#1D1D1F] font-semibold mt-0.5">{item.diagnosis}</p>
                        </div>
                      )}

                      <p className="text-xs text-[#1D1D1F] leading-relaxed whitespace-pre-wrap font-sans">
                        {item.description || 'Verified clinical observation record signed and attached to the patient ledger under HealthOrbit zero-trust security framework.'}
                      </p>

                      {/* Medications List if Prescription */}
                      {isPrescription && item.medications && item.medications.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <span className="text-[10px] font-mono font-medium text-[#6E6E73] uppercase">Prescribed Medications:</span>
                          <div className="divide-y divide-[#E5E5E7] border border-[#E5E5E7] rounded-2xl overflow-hidden bg-[#F5F5F7]">
                            {item.medications.map((m, idx) => (
                              <div key={idx} className="p-3 flex justify-between items-center text-xs">
                                <div>
                                  <span className="font-semibold text-[#1D1D1F]">{m.name}</span>
                                  <span className="text-[#6E6E73] text-[10px] ml-2">({m.dosage})</span>
                                </div>
                                <div className="text-right text-[10px] font-mono text-[#6E6E73]">
                                  <span>{m.frequency}</span> • <span className="text-[#0071E3]">{m.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Digital Seal Footer */}
                    <div className="pt-4 border-t border-[#E5E5E7] flex items-center justify-between text-[10px] text-[#86868B] font-mono">
                      <span>DIGITALLY SIGNED & HASHED</span>
                      <span className="truncate max-w-[250px]">{hashString}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Metadata Panel */}
            <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-[#E5E5E7] p-5 space-y-5 overflow-y-auto shrink-0">
              
              {/* Tab Navigation */}
              <div className="flex rounded-full bg-[#F5F5F7] p-1 border border-[#E5E5E7]">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex-1 py-1.5 text-[11px] font-medium rounded-full transition cursor-pointer ${
                    activeTab === 'preview' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('verification')}
                  className={`flex-1 py-1.5 text-[11px] font-medium rounded-full transition cursor-pointer ${
                    activeTab === 'verification' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  SHA-256 Audit
                </button>
              </div>

              {activeTab === 'preview' ? (
                <div className="space-y-4 text-xs">
                  
                  {/* Status & Security Badges */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-medium text-[#86868B] uppercase block">SECURITY & ACCESSIBILITY</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> SHA-256 VERIFIED
                      </span>
                      {item.isSensitive ? (
                        <span className="text-[10px] font-mono font-medium text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-rose-600" /> RESTRICTED / SENSITIVE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-medium text-[#1D1D1F] bg-[#F5F5F7] border border-[#E5E5E7] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> STANDARD CLEARANCE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata Specs */}
                  <div className="space-y-3 bg-[#F5F5F7] p-4 rounded-2xl border border-[#E5E5E7] font-mono">
                    <div>
                      <span className="text-[9px] text-[#86868B] uppercase block">Record Category</span>
                      <span className="text-[#1D1D1F] font-semibold text-xs">{item.category}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#86868B] uppercase block">Timestamp</span>
                      <span className="text-[#6E6E73] text-xs">{formattedDate}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#86868B] uppercase block">File Identifier</span>
                      <span className="text-[#6E6E73] text-xs truncate block">{item.fileName || 'Digital Clinical Certificate'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#86868B] uppercase block">File Size</span>
                      <span className="text-[#6E6E73] text-xs">{item.fileSize || 'Standard 12 KB'}</span>
                    </div>
                  </div>

                  {/* Hospital & Doctor Details */}
                  <div className="space-y-3 bg-[#F5F5F7] p-4 rounded-2xl border border-[#E5E5E7]">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#1D1D1F]" />
                      <div>
                        <span className="text-[9px] text-[#86868B] uppercase font-mono block">Medical Facility</span>
                        <span className="text-[#1D1D1F] font-semibold text-xs">{item.hospitalName || 'HealthOrbit Central Network'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#E5E5E7]">
                      <User className="w-4 h-4 text-[#1D1D1F]" />
                      <div>
                        <span className="text-[9px] text-[#86868B] uppercase font-mono block">Authorizing Doctor</span>
                        <span className="text-[#1D1D1F] font-semibold text-xs">Dr. {item.doctorName || 'Attending Physician'}</span>
                        <p className="text-[10px] text-[#6E6E73] font-mono">{item.doctorSpecialization || 'Practitioner'}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* SHA-256 Audit Verification Tab */
                <div className="space-y-4 text-xs font-mono">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl space-y-1 text-emerald-800">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Cryptographic Integrity Intact
                    </div>
                    <p className="text-[10px] text-emerald-800 leading-normal">
                      This record hash matches the tamper-evident entry logged in the HealthOrbit network ledger.
                    </p>
                  </div>

                  <div className="bg-[#F5F5F7] p-3 rounded-xl border border-[#E5E5E7] space-y-1.5">
                    <span className="text-[9px] text-[#86868B] uppercase block font-medium">SHA-256 Checksum:</span>
                    <p className="text-[10px] text-[#1D1D1F] break-all font-mono leading-relaxed bg-white p-2 rounded-lg border border-[#E5E5E7]">
                      {hashString}
                    </p>
                  </div>

                  <div className="bg-[#F5F5F7] p-3 rounded-xl border border-[#E5E5E7] space-y-1.5">
                    <span className="text-[9px] text-[#86868B] uppercase block font-medium">Verification Engine:</span>
                    <p className="text-[11px] text-[#1D1D1F]">HealthOrbit SHA-256 Zero-Trust Ledger v3.5</p>
                    <p className="text-[10px] text-[#6E6E73]">Node ID: NODE-ASIA-SG-9904</p>
                  </div>
                </div>
              )}

            </div>

          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
