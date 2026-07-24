import React, { useState } from 'react';
import { 
  UserCheck, FileText, Calendar, Lock, Unlock, Download, FilePlus, 
  Trash2, ShieldAlert, CheckCircle, Clock, Heart, AlertCircle, Plus, 
  Search, Stethoscope, ChevronRight, Edit3, Key, Shield, Printer, Sparkles, BookOpen, User
} from 'lucide-react';
import { 
  GlassCard, StatusChip, Badge, PrimaryButton, SecondaryButton, 
  DangerButton, SearchBar, EmptyState, Modal, ConfirmDialog 
} from '../../components/ui';
import Avatar from '../../components/Avatar';
import MedicalTimelineView from './components/MedicalTimelineView';
import DoctorNotesView from './components/DoctorNotesView';

interface PatientWorkspacePageProps {
  selectedPatientDetails: any;
  onNavigateSearch: () => void;
  // Prescription props
  diagnosis: string;
  setDiagnosis: (val: string) => void;
  medsList: { name: string; dosage: string; frequency: string; duration: string }[];
  addMedName: string;
  setAddMedName: (val: string) => void;
  addMedDosage: string;
  setAddMedDosage: (val: string) => void;
  addMedFreq: string;
  setAddMedFreq: (val: string) => void;
  addMedDur: string;
  setAddMedDur: (val: string) => void;
  handleAddMedication: (e: React.FormEvent) => void;
  handleRemoveMedication: (idx: number) => void;
  handleAddPrescription: (e: React.FormEvent) => void;
  // Upload record props
  docUploadTitle: string;
  setDocUploadTitle: (val: string) => void;
  docUploadCategory: 'Lab Report' | 'Prescription' | 'Scan' | 'Discharge Summary' | 'Other';
  setDocUploadCategory: (val: any) => void;
  docUploadDesc: string;
  setDocUploadDesc: (val: string) => void;
  docUploadFile: { name: string; size: string; content: string } | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocUploadForPatient: (e: React.FormEvent) => void;
  handleRequestAccess: (recordId: string, recordTitle: string) => void;
  downloadFile: (fileName: string, base64Content: string) => void;
  showNotification: (msg: string, type?: 'success' | 'error') => void;
}

export default function PatientWorkspacePage({
  selectedPatientDetails,
  onNavigateSearch,
  diagnosis,
  setDiagnosis,
  medsList,
  addMedName,
  setAddMedName,
  addMedDosage,
  setAddMedDosage,
  addMedFreq,
  setAddMedFreq,
  addMedDur,
  setAddMedDur,
  handleAddMedication,
  handleRemoveMedication,
  handleAddPrescription,
  docUploadTitle,
  setDocUploadTitle,
  docUploadCategory,
  setDocUploadCategory,
  docUploadDesc,
  setDocUploadDesc,
  docUploadFile,
  handleFileChange,
  handleDocUploadForPatient,
  handleRequestAccess,
  downloadFile,
  showNotification,
}: PatientWorkspacePageProps) {
  const [workspaceTab, setWorkspaceTab] = useState<
    'overview' | 'records' | 'timeline' | 'prescriptions' | 'notes' | 'access' | 'emergency'
  >('overview');

  // Record Filters inside workspace
  const [recordSearch, setRecordSearch] = useState('');
  const [recordCategoryFilter, setRecordCategoryFilter] = useState('All');
  const [previewRecord, setPreviewRecord] = useState<any>(null);

  if (!selectedPatientDetails) {
    return (
      <EmptyState
        title="No Patient Workspace Active"
        description="Select a patient from the universal search or directory to inspect their clinical profile."
        actionText="Search Patient Registry"
        onAction={onNavigateSearch}
      />
    );
  }

  const patient = selectedPatientDetails.patient;
  const records = selectedPatientDetails.records || [];
  const prescriptions = selectedPatientDetails.prescriptions || [];
  const accessRequests = selectedPatientDetails.accessRequests || [];

  // Filtered records
  const filteredRecords = records.filter((rec: any) => {
    const matchesCat = recordCategoryFilter === 'All' || rec.category === recordCategoryFilter;
    const matchesSearch = rec.title.toLowerCase().includes(recordSearch.toLowerCase()) ||
                          (rec.description || '').toLowerCase().includes(recordSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Workspace Top Header Header Card */}
      <GlassCard className="p-6 border-white/10 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={patient.name} size="lg" />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white">{patient.name}</h1>
                <span className="text-xs font-mono font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2.5 py-0.5 rounded-md">
                  {patient.patientId}
                </span>
                <StatusChip status="Approved" label="Verified Health ID" />
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Gender: <strong className="text-white">{patient.gender || 'N/A'}</strong> • DOB: <strong className="text-white">{patient.dob || 'N/A'}</strong> • Blood: <strong className="text-rose-400">{patient.bloodGroup || 'N/A'}</strong>
              </p>
              {patient.allergies && (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Allergy Alert: {patient.allergies}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <SecondaryButton onClick={onNavigateSearch}>
              Change Patient
            </SecondaryButton>
            <PrimaryButton onClick={() => setWorkspaceTab('prescriptions')}>
              Issue Script (Rx)
            </PrimaryButton>
          </div>
        </div>

        {/* Workspace Inner Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-white/5 pt-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Clinical Overview', icon: User },
            { id: 'records', label: `Medical Records (${records.length})`, icon: FileText },
            { id: 'timeline', label: 'Medical Timeline', icon: Calendar },
            { id: 'prescriptions', label: `Prescriptions (${prescriptions.length})`, icon: Stethoscope },
            { id: 'notes', label: 'Doctor Notes', icon: BookOpen },
            { id: 'access', label: 'Access Clearances', icon: Key },
            { id: 'emergency', label: 'Emergency Profile', icon: Heart },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setWorkspaceTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                workspaceTab === tab.id
                  ? 'bg-gradient-to-r from-[#38bdf8] to-[#4f8cff] text-slate-950 font-extrabold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* TAB CONTENT: 1. OVERVIEW */}
      {workspaceTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Clinical Baseline */}
            <GlassCard className="p-6 space-y-4">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" /> Clinical Baseline
              </h3>
              <div className="space-y-3 text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-mono text-[10px] block">KNOWN ALLERGIES</span>
                  <span className="font-bold text-rose-400">{patient.allergies || 'None declared'}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-mono text-[10px] block">CHRONIC CONDITIONS</span>
                  <span className="font-bold text-white">{patient.chronicDiseases || 'None declared'}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-mono text-[10px] block">BLOOD GROUP</span>
                  <span className="font-bold text-emerald-400">{patient.bloodGroup || 'N/A'}</span>
                </div>
              </div>
            </GlassCard>

            {/* Emergency Contact */}
            <GlassCard className="p-6 space-y-4">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> Emergency Contact
              </h3>
              <div className="space-y-3 text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-slate-400 font-mono text-[10px] block">PRIMARY CONTACT NAME</span>
                  <span className="font-bold text-white block">{patient.emergencyContactName || 'Not configured'}</span>
                  <span className="text-slate-400 text-[10px]">Relation: {patient.emergencyContactRelation || 'N/A'}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-mono text-[10px] block">EMERGENCY PHONE</span>
                  <span className="font-bold text-[#38bdf8] font-mono">{patient.emergencyContactPhone || 'N/A'}</span>
                </div>
              </div>
            </GlassCard>

            {/* Quick Stats Summary */}
            <GlassCard className="p-6 space-y-4">
              <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38bdf8]" /> Clinical Summary
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                  <span className="text-slate-400">Total Medical Records:</span>
                  <span className="font-bold text-white font-mono">{records.length}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                  <span className="text-slate-400">Prescriptions Issued:</span>
                  <span className="font-bold text-purple-400 font-mono">{prescriptions.length}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                  <span className="text-slate-400">Access Clearances:</span>
                  <span className="font-bold text-emerald-400 font-mono">{accessRequests.length}</span>
                </div>
              </div>
            </GlassCard>

          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. MEDICAL RECORDS */}
      {workspaceTab === 'records' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 w-full sm:w-auto">
              <SearchBar
                value={recordSearch}
                onChange={setRecordSearch}
                placeholder="Search patient records..."
                onClear={() => setRecordSearch('')}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto">
              {['All', 'Lab Report', 'Prescription', 'Scan', 'Discharge Summary', 'Other'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setRecordCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer shrink-0 ${
                    recordCategoryFilter === cat ? 'bg-[#38bdf8] text-slate-950' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <EmptyState
              title="No Medical Records Found"
              description="No medical documents match your filter criteria for this patient."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecords.map((rec: any) => (
                <GlassCard key={rec.id} className="p-5 space-y-3 relative hover:border-[#38bdf8]/30 transition">
                  <div className="flex justify-between items-start">
                    <Badge variant="cyan">{rec.category}</Badge>
                    {rec.isSensitive ? (
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Privacy Sensitive
                      </span>
                    ) : (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Unlocked
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base">{rec.title}</h3>

                  {rec.isLocked ? (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-300 space-y-2">
                      <span>Sensitive report is privacy locked. Request clearance authorization from the patient.</span>
                      <SecondaryButton
                        onClick={() => handleRequestAccess(rec.id, rec.title)}
                        className="w-full justify-center text-amber-300 border-amber-500/30"
                      >
                        Request Access Clearance
                      </SecondaryButton>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-slate-300">{rec.description || 'No description provided.'}</p>
                      <div className="flex gap-2 pt-2">
                        {rec.fileContent && (
                          <SecondaryButton
                            onClick={() => downloadFile(rec.fileName, rec.fileContent)}
                            icon={<Download className="w-3.5 h-3.5" />}
                            className="flex-1 justify-center text-xs"
                          >
                            Download ({rec.fileSize || 'File'})
                          </SecondaryButton>
                        )}
                      </div>
                    </>
                  )}
                </GlassCard>
              ))}
            </div>
          )}

          {/* Upload Record on behalf of patient */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <FilePlus className="w-4 h-4 text-[#38bdf8]" /> Ingest Record directly into Patient Timeline
            </h3>

            <form onSubmit={handleDocUploadForPatient} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    value={docUploadTitle}
                    onChange={e => setDocUploadTitle(e.target.value)}
                    placeholder="e.g. Chest X-Ray Scan"
                    className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Category</label>
                  <select
                    value={docUploadCategory}
                    onChange={e => setDocUploadCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="Lab Report">Lab Report</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Scan">Scan</option>
                    <option value="Discharge Summary">Discharge Summary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Clinical Notes / Comments</label>
                <textarea
                  value={docUploadDesc}
                  onChange={e => setDocUploadDesc(e.target.value)}
                  placeholder="Clinical notes regarding this document..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Select File</label>
                <input
                  type="file"
                  required
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-400"
                />
              </div>

              <PrimaryButton type="submit" className="w-full">
                Upload Document to Patient Ledger
              </PrimaryButton>
            </form>
          </GlassCard>

        </div>
      )}

      {/* TAB CONTENT: 3. TIMELINE */}
      {workspaceTab === 'timeline' && (
        <MedicalTimelineView records={records} prescriptions={prescriptions} />
      )}

      {/* TAB CONTENT: 4. PRESCRIPTIONS */}
      {workspaceTab === 'prescriptions' && (
        <div className="space-y-6 animate-fade-in">
          
          <GlassCard className="p-6 space-y-5">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-purple-400" /> Issue Digitally Signed Prescription
            </h2>

            <form onSubmit={handleAddPrescription} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">Clinical Diagnosis</label>
                <input
                  type="text"
                  required
                  value={diagnosis}
                  onChange={e => setDiagnosis(e.target.value)}
                  placeholder="e.g. Acute Upper Respiratory Infection"
                  className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none"
                />
              </div>

              {/* Medication List Builder */}
              <div className="space-y-3 border-t border-white/5 pt-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase font-mono">Medications Included</span>
                
                {medsList.map((m, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{m.name} ({m.dosage})</span>
                      <span className="text-[10px] text-slate-400 font-mono">{m.frequency} • {m.duration}</span>
                    </div>
                    <button type="button" onClick={() => handleRemoveMedication(idx)} className="text-rose-400 hover:opacity-80">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <input type="text" placeholder="Medication Name" value={addMedName} onChange={e => setAddMedName(e.target.value)} className="px-3 py-2 rounded-xl premium-input text-xs text-white outline-none" />
                  <input type="text" placeholder="Dosage (e.g. 500mg)" value={addMedDosage} onChange={e => setAddMedDosage(e.target.value)} className="px-3 py-2 rounded-xl premium-input text-xs text-white outline-none" />
                  <input type="text" placeholder="Frequency (e.g. 1-0-1)" value={addMedFreq} onChange={e => setAddMedFreq(e.target.value)} className="px-3 py-2 rounded-xl premium-input text-xs text-white outline-none" />
                  <input type="text" placeholder="Duration (e.g. 5 Days)" value={addMedDur} onChange={e => setAddMedDur(e.target.value)} className="px-3 py-2 rounded-xl premium-input text-xs text-white outline-none" />
                </div>

                <SecondaryButton type="button" onClick={handleAddMedication} className="w-full justify-center">
                  + Add Medication Line
                </SecondaryButton>
              </div>

              <PrimaryButton type="submit" className="w-full justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500">
                Issue Signed Prescription (Rx)
              </PrimaryButton>
            </form>
          </GlassCard>

          {/* Issued Prescriptions History */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-sm text-white">Prescription History ({prescriptions.length})</h3>
            {prescriptions.length === 0 ? (
              <EmptyState title="No Prescriptions Issued" description="No prescription forms have been issued for this patient yet." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.map((rx: any) => (
                  <GlassCard key={rx.id} className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="purple">Rx Prescribed</Badge>
                      <span className="text-[10px] font-mono text-slate-400">{new Date(rx.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm">Diagnosis: {rx.diagnosis}</h4>

                    <div className="space-y-1 bg-white/5 p-3 rounded-xl border border-white/5">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Medications:</span>
                      {rx.medications.map((m: any, i: number) => (
                        <div key={i} className="text-xs font-mono text-slate-200">
                          • {m.name} - {m.dosage} ({m.frequency}, {m.duration})
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 pt-1">
                      <CheckCircle className="w-3 h-3" /> Digitally Signed by Clinician
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB CONTENT: 5. DOCTOR NOTES */}
      {workspaceTab === 'notes' && (
        <DoctorNotesView patientId={patient.patientId} />
      )}

      {/* TAB CONTENT: 6. ACCESS CLEARANCES */}
      {workspaceTab === 'access' && (
        <div className="space-y-6 animate-fade-in">
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              Access Clearances Log ({accessRequests.length})
            </h3>

            {accessRequests.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No clearance requests have been initiated for this patient profile.
              </div>
            ) : (
              <div className="space-y-3">
                {accessRequests.map((req: any) => (
                  <div key={req.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-xs text-white block">Requested: "{req.recordTitle}"</span>
                      <span className="text-[10px] font-mono text-slate-400">Date: {new Date(req.requestedAt).toLocaleString()}</span>
                    </div>
                    <StatusChip status={req.status === 'approved' ? 'Approved' : req.status === 'rejected' ? 'Rejected' : 'Pending'} />
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* TAB CONTENT: 7. EMERGENCY PROFILE */}
      {workspaceTab === 'emergency' && (
        <div className="space-y-6 animate-fade-in">
          <GlassCard className="p-6 space-y-4 border-rose-500/20 bg-rose-500/5">
            <h2 className="text-lg font-display font-bold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> Emergency Profile Baseline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">ALLERGY WARNINGS</span>
                <p className="font-bold text-rose-400 text-sm">{patient.allergies || 'No severe allergies declared'}</p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">CHRONIC CONDITIONS</span>
                <p className="font-bold text-white text-sm">{patient.chronicDiseases || 'No chronic conditions declared'}</p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">EMERGENCY CONTACT</span>
                <p className="font-bold text-white">{patient.emergencyContactName} ({patient.emergencyContactRelation})</p>
                <p className="text-[#38bdf8] font-mono font-bold">{patient.emergencyContactPhone}</p>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">BLOOD GROUP & DEMOGRAPHICS</span>
                <p className="font-bold text-white">Blood: {patient.bloodGroup} | Gender: {patient.gender} | DOB: {patient.dob}</p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

    </div>
  );
}
