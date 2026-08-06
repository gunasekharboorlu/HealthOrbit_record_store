import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ShieldAlert, BadgeCheck, FileText, Download, Plus, X, 
  FilePlus, Lock, Unlock, ClipboardList, Shield, Activity, HelpCircle, User,
  Calendar, Phone, Mail, Award, Clock, ArrowLeft, RefreshCw, Trash2, Heart,
  Settings, CheckCircle, LayoutDashboard, ChevronRight, Eye, Edit3, UserCheck, 
  MapPin, BookOpen, AlertCircle, Sparkles, Building, Briefcase, FileSignature, Check,
  Key, ArrowRight, Stethoscope, Users
} from 'lucide-react';
import { MedicalRecord, Doctor } from '../types';
import { api } from '../api';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import DoctorOverviewPage from '../pages/doctor/DoctorOverviewPage';
import PatientSearchPage from '../pages/doctor/PatientSearchPage';
import PatientWorkspacePage from '../pages/doctor/PatientWorkspacePage';
import AccessRequestsPage from '../pages/doctor/AccessRequestsPage';
import DoctorProfilePage from '../pages/doctor/DoctorProfilePage';
import DoctorSettingsPage from '../pages/doctor/DoctorSettingsPage';

interface DoctorDashboardProps {
  doctorData: any;
  searchId: string;
  setSearchId: (val: string) => void;
  searchedPatient: any;
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
  handleSearchPatient: (e: React.FormEvent) => void;
  handleRequestAccess: (recordId: string) => void;
  handleAddPrescription: (e: React.FormEvent) => void;
  docUploadTitle: string;
  setDocUploadTitle: (val: string) => void;
  docUploadCategory: 'Lab Report' | 'Prescription' | 'Scan' | 'Discharge Summary' | 'Other';
  setDocUploadCategory: (val: any) => void;
  docUploadDesc: string;
  setDocUploadDesc: (val: string) => void;
  docUploadFile: { name: string; size: string; content: string } | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocUploadForPatient: (e: React.FormEvent) => void;
  downloadFile: (fileName: string, base64Content: string) => void;
  currentUser?: any;
  unreadCount?: number;
  handleLogout?: () => void;
  initialTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function DoctorDashboard({
  doctorData,
  searchId,
  setSearchId,
  searchedPatient,
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
  handleSearchPatient,
  handleRequestAccess,
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
  downloadFile,
  currentUser,
  unreadCount = 0,
  handleLogout,
  initialTab,
  onTabChange,
}: DoctorDashboardProps) {
  if (!doctorData) return null;

  // Tab navigation state
  const [internalTab, setInternalTab] = useState<string>('dashboard');

  useEffect(() => {
    if (initialTab) setInternalTab(initialTab);
  }, [initialTab]);

  const activeTab = initialTab || internalTab;
  const setActiveTab = (tab: string) => {
    setInternalTab(tab);
    if (onTabChange) onTabChange(tab);
  };
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search & Patient workspace states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState<any>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [pinnedPatients, setPinnedPatients] = useState<string[]>([]);

  // Profile Edit states
  const [profName, setProfName] = useState('');
  const [profPhone, setProfPhone] = useState('');
  const [profAbout, setProfAbout] = useState('');
  const [profPic, setProfPic] = useState('');
  const [profExp, setProfExp] = useState('');
  const [profDept, setProfDept] = useState('');
  const [profSpec, setProfSpec] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  // Settings states
  const [notifPref, setNotifPref] = useState(true);
  const [sigPin, setSigPin] = useState('****');

  // Notification Toast state
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const doctor: any = doctorData.doctor || {};
  const stats = doctorData.stats || {
    totalPatientsViewed: 0,
    pendingAccessRequests: 0,
    approvedAccessRequests: 0,
    todayPrescriptions: 0,
    recentActivity: []
  };

  // Sync profile values
  useEffect(() => {
    if (doctor) {
      setProfName(doctor.name || '');
      setProfPhone(doctor.phone || '');
      setProfAbout(doctor.about || '');
      setProfPic(doctor.profilePicture || '');
      setProfExp(doctor.experience || '8 years');
      setProfDept(doctor.department || 'General Medicine');
      setProfSpec(doctor.specialization || 'General Practitioner');
    }
  }, [doctorData]);

  // Sync outer searchedPatient state
  useEffect(() => {
    if (searchedPatient) {
      setSelectedPatientDetails(searchedPatient);
      setSelectedPatientId(searchedPatient.patient.patientId);
    }
  }, [searchedPatient]);

  // Search Patient in Registry
  const handleGeneralSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setSearchLoading(true);
    api.searchPatientByQuery(searchQuery)
      .then(res => {
        setSearchResults(res.matchedResults || []);
        if (res.patient) {
          setSelectedPatientDetails(res);
          setSelectedPatientId(res.patient.patientId);
          setSearchId(res.patient.patientId);
          setActiveTab('workspace');
        }
        api.logAction('PATIENT_SEARCH', `Searched registry query: "${searchQuery}"`);
      })
      .catch(err => {
        setSearchResults([]);
        showNotification(err.message || 'No patient matching search criteria.', 'error');
      })
      .finally(() => setSearchLoading(false));
  };

  // Select patient from directory/results
  const handleInspectPatient = (patientId: string) => {
    setSearchLoading(true);
    setSearchId(patientId);
    api.searchPatient(patientId)
      .then(res => {
        setSelectedPatientDetails(res);
        setSelectedPatientId(patientId);
        setActiveTab('workspace');
        api.logAction('RECORD_VIEW', `Inspected history for patient: ${patientId}`);
      })
      .catch(err => {
        showNotification(err.message || 'Could not load patient records.', 'error');
      })
      .finally(() => setSearchLoading(false));
  };

  // Request Access for sensitive record
  const handleRequestAccessLocal = (recordId: string, recordTitle: string) => {
    if (!selectedPatientId) return;
    setSearchLoading(true);
    api.requestAccess(selectedPatientId, recordId)
      .then(() => {
        showNotification('Clearance request sent! Patient will receive a permission notification.', 'success');
        api.logAction('ACCESS_REQUEST', `Requested clearance for "${recordTitle}" (${selectedPatientId})`);
        api.searchPatient(selectedPatientId).then(res => setSelectedPatientDetails(res));
      })
      .catch(err => showNotification(err.message, 'error'))
      .finally(() => setSearchLoading(false));
  };

  // Save Doctor Profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    api.updateDoctorProfile({
      name: profName,
      phone: profPhone,
      about: profAbout,
      profilePicture: profPic,
      experience: profExp,
      department: profDept,
      specialization: profSpec
    })
      .then(() => {
        showNotification('Doctor profile updated successfully!', 'success');
        if (doctor) doctor.profilePicture = profPic;
        if (currentUser) currentUser.profilePicture = profPic;
      })
      .catch(err => showNotification(err.message, 'error'))
      .finally(() => setSaveLoading(false));
  };

  // Calculate access clearance timer
  const getAccessTimer = (respondedAt: string) => {
    if (!respondedAt) return 'Valid';
    const expiresAt = new Date(respondedAt).getTime() + 24 * 60 * 60 * 1000;
    const diff = expiresAt - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  const togglePinPatient = (patientId: string) => {
    if (pinnedPatients.includes(patientId)) {
      setPinnedPatients(pinnedPatients.filter(id => id !== patientId));
      showNotification('Patient unpinned from priority list.', 'success');
    } else {
      setPinnedPatients([...pinnedPatients, patientId]);
      showNotification('Patient pinned to priority list.', 'success');
    }
  };

  const tabLabels: Record<string, string> = {
    dashboard: 'Clinical Overview',
    search: 'Patient Directory & Search',
    workspace: 'Patient Clinical Workspace',
    details: 'Patient Clinical Workspace',
    records: 'Patient Clinical Workspace',
    prescriptions: 'Patient Clinical Workspace',
    requests: 'Access Clearances',
    recent: 'Patient Directory & Search',
    profile: 'Clinician Credentials Profile',
    settings: 'Practice Settings',
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex">
      
      {/* Toast Notification Container */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md ${
              notification.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            {notification.type === 'error' ? <ShieldAlert className="w-4 h-4 text-rose-600" /> : <CheckCircle className="w-4 h-4 text-emerald-600" />}
            <span className="text-xs font-bold">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-80"><X className="w-3.5 h-3.5" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <Sidebar
        role="doctor"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser || { name: doctor.name || 'Doctor', role: 'doctor' }}
        unreadNotificationsCount={unreadCount}
        pendingRequestsCount={stats.pendingAccessRequests || 0}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Top Header / Breadcrumbs */}
        <div className="sticky top-16 z-20 bg-white/90 backdrop-blur-md border-b border-[#E5E5E7] px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-[#6E6E73] hover:text-[#1D1D1F] rounded-xl bg-[#F5F5F7] border border-[#E5E5E7]"
            >
              <Stethoscope className="w-5 h-5 text-[#0071E3]" />
            </button>
            <Breadcrumbs
              portalName="Doctor Portal"
              activeTab={activeTab}
              tabLabel={tabLabels[activeTab] || 'Clinical Workspace'}
              onNavigateHome={() => setActiveTab('dashboard')}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('search')}
              className="bg-[#1D1D1F] hover:bg-black text-white font-semibold px-3.5 py-1.5 rounded-xl text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" /> Patient Search
            </button>
          </div>
        </div>

        {/* Dynamic Modular Page Routing */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
          
          {/* OVERVIEW PAGE */}
          {activeTab === 'dashboard' && (
            <DoctorOverviewPage
              doctorData={doctorData}
              profName={profName}
              profPic={profPic}
              profSpec={profSpec}
              profExp={profExp}
              stats={stats}
              onNavigateTab={setActiveTab}
              onInspectPatient={handleInspectPatient}
            />
          )}

          {/* SEARCH PAGE */}
          {(activeTab === 'search' || activeTab === 'recent') && (
            <PatientSearchPage
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              searchLoading={searchLoading}
              allPatients={doctorData.allPatients || []}
              handleGeneralSearch={handleGeneralSearch}
              handleInspectPatient={handleInspectPatient}
              pinnedPatients={pinnedPatients}
              togglePinPatient={togglePinPatient}
            />
          )}

          {/* WORKSPACE PAGE */}
          {(activeTab === 'workspace' || activeTab === 'details' || activeTab === 'records' || activeTab === 'prescriptions') && (
            <PatientWorkspacePage
              selectedPatientDetails={selectedPatientDetails}
              onNavigateSearch={() => setActiveTab('search')}
              diagnosis={diagnosis}
              setDiagnosis={setDiagnosis}
              medsList={medsList}
              addMedName={addMedName}
              setAddMedName={setAddMedName}
              addMedDosage={addMedDosage}
              setAddMedDosage={setAddMedDosage}
              addMedFreq={addMedFreq}
              setAddMedFreq={setAddMedFreq}
              addMedDur={addMedDur}
              setAddMedDur={setAddMedDur}
              handleAddMedication={handleAddMedication}
              handleRemoveMedication={handleRemoveMedication}
              handleAddPrescription={handleAddPrescription}
              docUploadTitle={docUploadTitle}
              setDocUploadTitle={setDocUploadTitle}
              docUploadCategory={docUploadCategory}
              setDocUploadCategory={setDocUploadCategory}
              docUploadDesc={docUploadDesc}
              setDocUploadDesc={setDocUploadDesc}
              docUploadFile={docUploadFile}
              handleFileChange={handleFileChange}
              handleDocUploadForPatient={handleDocUploadForPatient}
              handleRequestAccess={handleRequestAccessLocal}
              downloadFile={downloadFile}
              showNotification={showNotification}
            />
          )}

          {/* REQUESTS PAGE */}
          {activeTab === 'requests' && (
            <AccessRequestsPage
              approvedAccessRequests={doctorData.approvedAccessRequests || []}
              pendingAccessRequests={doctorData.pendingAccessRequests || []}
              getAccessTimer={getAccessTimer}
            />
          )}

          {/* PROFILE PAGE */}
          {activeTab === 'profile' && (
            <DoctorProfilePage
              doctorData={doctorData}
              profName={profName}
              setProfName={setProfName}
              profPhone={profPhone}
              setProfPhone={setProfPhone}
              profAbout={profAbout}
              setProfAbout={setProfAbout}
              profPic={profPic}
              setProfPic={setProfPic}
              profExp={profExp}
              setProfExp={setProfExp}
              profDept={profDept}
              setProfDept={setProfDept}
              profSpec={profSpec}
              setProfSpec={setProfSpec}
              saveLoading={saveLoading}
              handleSaveProfile={handleSaveProfile}
              showNotification={showNotification}
            />
          )}

          {/* SETTINGS PAGE */}
          {activeTab === 'settings' && (
            <DoctorSettingsPage
              sigPin={sigPin}
              setSigPin={setSigPin}
              notifPref={notifPref}
              setNotifPref={setNotifPref}
              showNotification={showNotification}
            />
          )}

        </main>
      </div>
    </div>
  );
}
