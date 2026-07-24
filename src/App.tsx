import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { api } from './api';
import { Toast as ToastType, User } from './types';

// Layouts
import WebsiteLayout from './layouts/WebsiteLayout';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingSkeleton from './components/layout/LoadingSkeleton';

// Lazy Loaded Public Pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const FeaturesPage = lazy(() => import('./pages/public/FeaturesPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const HowItWorksPage = lazy(() => import('./pages/public/HowItWorksPage'));
const SecurityPage = lazy(() => import('./pages/public/SecurityPage'));
const FaqPage = lazy(() => import('./pages/public/FaqPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const TermsPage = lazy(() => import('./pages/public/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/public/PrivacyPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = lazy(() => import('./pages/public/RegisterPage'));

// Lazy Loaded SaaS Dashboards & Views
const PatientDashboard = lazy(() => import('./components/PatientDashboard'));
const DoctorDashboard = lazy(() => import('./components/DoctorDashboard'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const EmergencyView = lazy(() => import('./components/EmergencyView'));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authRole, setAuthRole] = useState<'patient' | 'doctor' | 'admin'>('patient');

  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O-Positive');
  const [specialization, setSpecialization] = useState('General Medicine');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [hospitalId, setHospitalId] = useState('HOSP-1');

  // App General State
  const [toast, setToast] = useState<ToastType | null>(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Patient Dashboard Data
  const [patientData, setPatientData] = useState<any>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'Lab Report' | 'Prescription' | 'Scan' | 'Discharge Summary' | 'Other'>('Lab Report');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadIsSensitive, setUploadIsSensitive] = useState(false);
  const [uploadFile, setUploadFile] = useState<{ name: string; size: string; content: string } | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Edit Patient Details
  const [editDob, setEditDob] = useState('');
  const [editGender, setEditGender] = useState('');
  const [editBlood, setEditBlood] = useState('');
  const [editAllergies, setEditAllergies] = useState('');
  const [editDiseases, setEditDiseases] = useState('');
  const [editContactName, setEditContactName] = useState('');
  const [editContactPhone, setEditContactPhone] = useState('');
  const [editContactRelation, setEditContactRelation] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Doctor Dashboard Data
  const [doctorData, setDoctorData] = useState<any>(null);
  const [searchId, setSearchId] = useState('');
  const [searchedPatient, setSearchedPatient] = useState<any>(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [medsList, setMedsList] = useState<{ name: string; dosage: string; frequency: string; duration: string }[]>([]);
  const [medName, setMedName] = useState('');
  const [medDosage, setMedDosage] = useState('');
  const [medFreq, setMedFreq] = useState('');
  const [medDur, setMedDur] = useState('');

  // Doctor Upload For Patient
  const [docUploadTitle, setDocUploadTitle] = useState('');
  const [docUploadCategory, setDocUploadCategory] = useState<'Lab Report' | 'Prescription' | 'Scan' | 'Discharge Summary' | 'Other'>('Lab Report');
  const [docUploadDesc, setDocUploadDesc] = useState('');
  const [docUploadFile, setDocUploadFile] = useState<{ name: string; size: string; content: string } | null>(null);

  // Admin Dashboard Data
  const [adminData, setAdminData] = useState<any>(null);
  const [newHospitalName, setNewHospitalName] = useState('');
  const [newHospitalAddress, setNewHospitalAddress] = useState('');

  // Emergency Look up State
  const [emergencyIdInput, setEmergencyIdInput] = useState('');
  const [emergencyProfile, setEmergencyProfile] = useState<any>(null);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Initialize Auth
  useEffect(() => {
    const token = localStorage.getItem('sihrms_token');
    if (token) {
      setLoading(true);
      api.me()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(() => {
          localStorage.removeItem('sihrms_token');
        })
        .finally(() => setLoading(false));
    }
  }, []);

  // Listen for global session expiration events
  useEffect(() => {
    const handleSessionExpired = () => {
      setCurrentUser(null);
      setNotifications([]);
      setUnreadCount(0);
      navigate('/login');
      showToast('Session expired. Please sign in again.', 'warning');
    };
    window.addEventListener('healthorbit-session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('healthorbit-session-expired', handleSessionExpired);
    };
  }, [navigate]);

  // Poll Notifications when logged in
  useEffect(() => {
    if (!currentUser) return;
    const fetchNotifications = () => {
      api.getNotifications()
        .then(res => {
          setNotifications(res);
          setUnreadCount(res.filter((n: any) => !n.read).length);
        })
        .catch(err => console.error('Failed to load notifications', err));
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const clearAuthForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setDob('');
    setGender('Male');
    setBloodGroup('O-Positive');
    setSpecialization('');
    setLicenseNumber('');
    setHospitalId('HOSP-1');
  };

  const handleLogout = () => {
    localStorage.removeItem('sihrms_token');
    setCurrentUser(null);
    clearAuthForm();
    navigate('/login');
    showToast('Logged out successfully', 'success');
  };

  const navigateToDashboard = (user: User) => {
    if (user.role === 'patient') {
      loadPatientDashboard();
      navigate('/app/patient/dashboard');
    } else if (user.role === 'doctor') {
      loadDoctorDashboard();
      navigate('/app/doctor/dashboard');
    } else if (user.role === 'admin') {
      loadAdminDashboard();
      navigate('/app/admin/dashboard');
    }
  };

  // LOAD DATA ACTIONS
  const loadPatientDashboard = () => {
    setLoading(true);
    api.getPatientDashboard()
      .then(data => {
        setPatientData(data);
        setEditDob(data.patient.dob || '');
        setEditGender(data.patient.gender || 'Male');
        setEditBlood(data.patient.bloodGroup || 'O-Positive');
        setEditAllergies(data.patient.allergies || '');
        setEditDiseases(data.patient.chronicDiseases || '');
        setEditContactName(data.patient.emergencyContactName || '');
        setEditContactPhone(data.patient.emergencyContactPhone || '');
        setEditContactRelation(data.patient.emergencyContactRelation || '');
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const loadDoctorDashboard = () => {
    setLoading(true);
    api.getDoctorDashboard()
      .then(data => setDoctorData(data))
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const loadAdminDashboard = () => {
    setLoading(true);
    api.getAdminDashboard()
      .then(data => setAdminData(data))
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  // Auto-fetch data on route load if currentUser exists
  useEffect(() => {
    if (currentUser?.role === 'patient' && !patientData) {
      loadPatientDashboard();
    } else if (currentUser?.role === 'doctor' && !doctorData) {
      loadDoctorDashboard();
    } else if (currentUser?.role === 'admin' && !adminData) {
      loadAdminDashboard();
    }
  }, [currentUser, location.pathname]);

  // AUTH ACTIONS
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return showToast('Please enter credentials', 'error');

    setLoading(true);
    api.login({ email, password, role: authRole })
      .then(res => {
        localStorage.setItem('sihrms_token', res.token);
        setCurrentUser(res.user);
        showToast(`Welcome back, ${res.user.name}!`, 'success');
        navigateToDashboard(res.user);
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) return showToast('All fields are required', 'error');

    if (password.length < 8) {
      return showToast('Password must be at least 8 characters long', 'error');
    }
    if (!/[A-Z]/.test(password)) {
      return showToast('Password must contain at least one uppercase letter (A-Z)', 'error');
    }
    if (!/[a-z]/.test(password)) {
      return showToast('Password must contain at least one lowercase letter (a-z)', 'error');
    }
    if (!/[0-9]/.test(password)) {
      return showToast('Password must contain at least one number (0-9)', 'error');
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      return showToast('Password must contain at least one special character (!@#$%^&*())', 'error');
    }

    setLoading(true);
    const extraData = authRole === 'patient' 
      ? { dob, gender, bloodGroup }
      : { specialization, licenseNumber, hospitalId };

    api.register({ email, password, role: authRole, name, extraData })
      .then(res => {
        localStorage.setItem('sihrms_token', res.token);
        setCurrentUser(res.user);
        showToast('Account registered successfully!', 'success');
        navigateToDashboard(res.user);
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  // PATIENT FEATURES
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    api.updateProfile({
      dob: editDob,
      gender: editGender,
      bloodGroup: editBlood,
      allergies: editAllergies,
      chronicDiseases: editDiseases,
      emergencyContactName: editContactName,
      emergencyContactPhone: editContactPhone,
      emergencyContactRelation: editContactRelation
    })
      .then(() => {
        showToast('Medical profile updated successfully', 'success');
        setIsEditingProfile(false);
        loadPatientDashboard();
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isDoc: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds 10MB limit', 'error');
      e.target.value = '';
      return;
    }

    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg'];
    const allowedMimes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    const fileMime = file.type ? file.type.toLowerCase() : '';

    if (!allowedExtensions.includes(fileExt) || !allowedMimes.includes(fileMime)) {
      showToast('Unsupported file type. Allowed: PDF, PNG, JPG', 'error');
      e.target.value = '';
      return;
    }

    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.\-_]/g, '-')
      .replace(/\.{2,}/g, '.')
      .slice(0, 80);

    const reader = new FileReader();
    reader.onload = () => {
      const base64Content = reader.result as string;
      const fileData = {
        name: sanitizedName,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        content: base64Content
      };

      if (isDoc) {
        setDocUploadFile(fileData);
      } else {
        setUploadFile(fileData);
        if (patientData?.records) {
          const isDup = patientData.records.some((r: any) => r.fileName === sanitizedName && r.fileSize === fileData.size);
          if (isDup) {
            setDuplicateWarning('Warning: A file with the exact same name and size already exists in your timeline!');
          } else {
            setDuplicateWarning(null);
          }
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadFile) return showToast('Please provide a title and select a report file', 'error');

    setLoading(true);
    api.uploadRecord({
      title: uploadTitle,
      description: uploadDesc,
      category: uploadCategory,
      fileName: uploadFile.name,
      fileSize: uploadFile.size,
      fileContent: uploadFile.content,
      isSensitive: uploadIsSensitive
    })
      .then(() => {
        showToast('Medical record uploaded successfully!', 'success');
        setUploadTitle('');
        setUploadDesc('');
        setUploadFile(null);
        setUploadIsSensitive(false);
        setDuplicateWarning(null);
        loadPatientDashboard();
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleDeleteRecord = (id: string) => {
    if (!confirm('Are you absolutely sure you want to delete this medical report? This action is irreversible.')) return;

    setLoading(true);
    api.deleteRecord(id)
      .then(() => {
        showToast('Medical record deleted successfully', 'success');
        loadPatientDashboard();
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleRespondAccess = (id: string, status: 'approved' | 'rejected') => {
    setLoading(true);
    api.respondAccess(id, status)
      .then(() => {
        showToast(`Access request ${status} successfully`, 'success');
        loadPatientDashboard();
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  // DOCTOR ACTIONS
  const handleSearchPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return showToast('Please enter a Patient ID', 'error');

    setLoading(true);
    setSearchedPatient(null);
    api.searchPatient(searchId)
      .then(res => {
        setSearchedPatient(res);
        showToast(`Found records for patient ${res.patient.name}`, 'success');
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleRequestAccess = (recordId: string) => {
    if (!searchedPatient) return;
    setLoading(true);
    api.requestAccess(searchedPatient.patient.patientId, recordId)
      .then(() => {
        showToast('Access request sent successfully! Awaiting patient approval.', 'success');
        api.searchPatient(searchedPatient.patient.patientId)
          .then(res => setSearchedPatient(res));
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !medDosage || !medFreq || !medDur) {
      return showToast('Please fill all medication fields', 'warning');
    }
    setMedsList([...medsList, { name: medName, dosage: medDosage, frequency: medFreq, duration: medDur }]);
    setMedName('');
    setMedDosage('');
    setMedFreq('');
    setMedDur('');
  };

  const handleRemoveMedication = (index: number) => {
    setMedsList(medsList.filter((_, i) => i !== index));
  };

  const handleAddPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedPatient) return;
    if (!diagnosis) return showToast('Please enter diagnosis', 'error');
    if (medsList.length === 0) return showToast('Please add at least one medication', 'error');

    setLoading(true);
    api.addPrescription({
      patientId: searchedPatient.patient.patientId,
      diagnosis,
      medications: medsList
    })
      .then(() => {
        showToast('Prescription added successfully!', 'success');
        setDiagnosis('');
        setMedsList([]);
        api.searchPatient(searchedPatient.patient.patientId)
          .then(res => setSearchedPatient(res));
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleDocUploadForPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedPatient) return;
    if (!docUploadTitle || !docUploadFile) return showToast('Please provide a title and select a report file', 'error');

    setLoading(true);
    api.uploadRecord({
      title: docUploadTitle,
      description: docUploadDesc,
      category: docUploadCategory,
      fileName: docUploadFile.name,
      fileSize: docUploadFile.size,
      fileContent: docUploadFile.content,
      isSensitive: false,
      targetPatientId: searchedPatient.patient.patientId
    })
      .then(() => {
        showToast('Medical record uploaded and linked directly to patient timeline!', 'success');
        setDocUploadTitle('');
        setDocUploadDesc('');
        setDocUploadFile(null);
        api.searchPatient(searchedPatient.patient.patientId)
          .then(res => setSearchedPatient(res));
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  // ADMIN ACTIONS
  const handleVerifyDoctor = (userId: string, verify: boolean) => {
    setLoading(true);
    api.verifyDoctor(userId, verify)
      .then(() => {
        showToast(`Doctor account status ${verify ? 'verified' : 'revoked'}`, 'success');
        loadAdminDashboard();
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHospitalName || !newHospitalAddress) return showToast('Please enter name and address', 'error');

    setLoading(true);
    api.addHospital({ name: newHospitalName, address: newHospitalAddress })
      .then(() => {
        showToast('New partner hospital registered successfully', 'success');
        setNewHospitalName('');
        setNewHospitalAddress('');
        loadAdminDashboard();
      })
      .catch(err => showToast(err.message, 'error'))
      .finally(() => setLoading(false));
  };

  // EMERGENCY VIEW
  const handleLookupEmergency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyIdInput) return showToast('Please enter Patient ID', 'error');

    setLoading(true);
    api.getEmergencyProfile(emergencyIdInput)
      .then(res => {
        if (res.error) {
          showToast(res.error, 'error');
          setEmergencyProfile(null);
        } else {
          setEmergencyProfile(res);
          showToast(`Emergency profile loaded for ${res.name}`, 'success');
        }
      })
      .catch(err => {
        showToast(err.message, 'error');
        setEmergencyProfile(null);
      })
      .finally(() => setLoading(false));
  };

  // NOTIFICATION UTILS
  const handleMarkRead = (id: string) => {
    api.markNotificationRead(id)
      .then(() => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      });
  };

  const handleMarkAllRead = () => {
    api.markAllNotificationsRead()
      .then(() => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
        showToast('All notifications marked as read', 'success');
      });
  };

  const downloadFile = (fileName: string, base64Content: string) => {
    const link = document.createElement('a');
    link.href = base64Content;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded: ${fileName}`, 'success');
  };

  // Shared props for auth forms
  const authFormProps = {
    authRole,
    setAuthRole,
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    dob,
    setDob,
    gender,
    setGender,
    bloodGroup,
    setBloodGroup,
    specialization,
    setSpecialization,
    licenseNumber,
    setLicenseNumber,
    hospitalId,
    setHospitalId,
    handleLogin,
    handleRegister,
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      
      {/* Global Syncing Loader */}
      {loading && (
        <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="glass-card max-w-sm w-full mx-4 p-8 rounded-3xl border border-[#38bdf8]/30 text-center space-y-4 shadow-2xl">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-[#38bdf8]/20 rounded-full"></div>
              <div className="absolute inset-0 border-2 border-t-[#38bdf8] border-r-transparent rounded-full animate-spin"></div>
              <Activity className="w-6 h-6 text-[#38bdf8] animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider font-display">HealthOrbit Engine</p>
              <p className="text-xs text-slate-400 mt-1">Synchronizing clinical ledger...</p>
            </div>
            <div className="w-full bg-slate-950/50 rounded-full h-1 overflow-hidden">
              <div className="bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] h-full w-[70%] rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          
          {/* PUBLIC WEBSITE ROUTES */}
          <Route element={<WebsiteLayout currentUser={currentUser} handleLogout={handleLogout} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/login" element={<LoginPage {...authFormProps} />} />
            <Route path="/register" element={<RegisterPage {...authFormProps} />} />
          </Route>

          {/* PROTECTED SAAS WEB APP ROUTES */}
          <Route
            path="/app"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <AppLayout
                  currentUser={currentUser}
                  unreadCount={unreadCount}
                  notifications={notifications}
                  handleLogout={handleLogout}
                  handleMarkAllRead={handleMarkAllRead}
                  handleMarkRead={handleMarkRead}
                  toast={toast}
                  onCloseToast={() => setToast(null)}
                  pendingRequestsCount={patientData?.pendingRequests?.length || 0}
                />
              </ProtectedRoute>
            }
          >
            {/* Base /app redirect */}
            <Route
              index
              element={
                currentUser?.role === 'patient' ? (
                  <Navigate to="/app/patient/dashboard" replace />
                ) : currentUser?.role === 'doctor' ? (
                  <Navigate to="/app/doctor/dashboard" replace />
                ) : (
                  <Navigate to="/app/admin/dashboard" replace />
                )
              }
            />

            {/* Patient Routes */}
            <Route path="patient" element={<Navigate to="/app/patient/dashboard" replace />} />
            <Route
              path="patient/:tab"
              element={
                <PatientTabWrapper
                  patientData={patientData}
                  uploadTitle={uploadTitle}
                  setUploadTitle={setUploadTitle}
                  uploadCategory={uploadCategory}
                  setUploadCategory={setUploadCategory}
                  uploadDesc={uploadDesc}
                  setUploadDesc={setUploadDesc}
                  uploadIsSensitive={uploadIsSensitive}
                  setUploadIsSensitive={setUploadIsSensitive}
                  uploadFile={uploadFile}
                  duplicateWarning={duplicateWarning}
                  editDob={editDob}
                  setEditDob={setEditDob}
                  editGender={editGender}
                  setEditGender={setEditGender}
                  editBlood={editBlood}
                  setEditBlood={setEditBlood}
                  editAllergies={editAllergies}
                  setEditAllergies={setEditAllergies}
                  editDiseases={editDiseases}
                  setEditDiseases={setEditDiseases}
                  editContactName={editContactName}
                  setEditContactName={setEditContactName}
                  editContactPhone={editContactPhone}
                  setEditContactPhone={setEditContactPhone}
                  editContactRelation={editContactRelation}
                  setEditContactRelation={setEditContactRelation}
                  isEditingProfile={isEditingProfile}
                  setIsEditingProfile={setIsEditingProfile}
                  handleUpdateProfile={handleUpdateProfile}
                  handleFileChange={handleFileChange}
                  handleUploadRecord={handleUploadRecord}
                  handleDeleteRecord={handleDeleteRecord}
                  handleRespondAccess={handleRespondAccess}
                  downloadFile={downloadFile}
                  currentUser={currentUser}
                  unreadCount={unreadCount}
                  notifications={notifications}
                  handleMarkRead={handleMarkRead}
                  handleMarkAllRead={handleMarkAllRead}
                  handleLogout={handleLogout}
                />
              }
            />

            {/* Doctor Routes */}
            <Route path="doctor" element={<Navigate to="/app/doctor/dashboard" replace />} />
            <Route
              path="doctor/:tab"
              element={
                <DoctorTabWrapper
                  doctorData={doctorData}
                  searchId={searchId}
                  setSearchId={setSearchId}
                  searchedPatient={searchedPatient}
                  diagnosis={diagnosis}
                  setDiagnosis={setDiagnosis}
                  medsList={medsList}
                  addMedName={medName}
                  setAddMedName={setMedName}
                  addMedDosage={medDosage}
                  setAddMedDosage={setMedDosage}
                  addMedFreq={medFreq}
                  setAddMedFreq={setMedFreq}
                  addMedDur={medDur}
                  setAddMedDur={setMedDur}
                  handleAddMedication={handleAddMedication}
                  handleRemoveMedication={handleRemoveMedication}
                  handleSearchPatient={handleSearchPatient}
                  handleRequestAccess={handleRequestAccess}
                  handleAddPrescription={handleAddPrescription}
                  docUploadTitle={docUploadTitle}
                  setDocUploadTitle={setDocUploadTitle}
                  docUploadCategory={docUploadCategory}
                  setDocUploadCategory={setDocUploadCategory}
                  docUploadDesc={docUploadDesc}
                  setDocUploadDesc={setDocUploadDesc}
                  docUploadFile={docUploadFile}
                  handleFileChange={(e) => handleFileChange(e, true)}
                  handleDocUploadForPatient={handleDocUploadForPatient}
                  downloadFile={downloadFile}
                  currentUser={currentUser}
                  unreadCount={unreadCount}
                  handleLogout={handleLogout}
                />
              }
            />

            {/* Admin Routes */}
            <Route path="admin" element={<Navigate to="/app/admin/dashboard" replace />} />
            <Route
              path="admin/:tab"
              element={
                <AdminTabWrapper
                  adminData={adminData}
                  newHospitalName={newHospitalName}
                  setNewHospitalName={setNewHospitalName}
                  newHospitalAddress={newHospitalAddress}
                  setNewHospitalAddress={setNewHospitalAddress}
                  handleVerifyDoctor={handleVerifyDoctor}
                  handleAddHospital={handleAddHospital}
                  currentUser={currentUser}
                  unreadCount={unreadCount}
                  handleLogout={handleLogout}
                />
              }
            />

            {/* Emergency Lookup inside SaaS */}
            <Route
              path="emergency"
              element={
                <EmergencyView
                  emergencyIdInput={emergencyIdInput}
                  setEmergencyIdInput={setEmergencyIdInput}
                  emergencyProfile={emergencyProfile}
                  handleLookupEmergency={handleLookupEmergency}
                />
              }
            />

          </Route>

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Suspense>

    </div>
  );
}

// Wrapper for Patient Dashboard tab sync
function PatientTabWrapper(props: any) {
  const { tab } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (newTab: string) => {
    navigate(`/app/patient/${newTab}`);
  };

  return (
    <PatientDashboard
      {...props}
      initialTab={tab || 'dashboard'}
      onTabChange={handleTabChange}
    />
  );
}

// Wrapper for Doctor Dashboard tab sync
function DoctorTabWrapper(props: any) {
  const { tab } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (newTab: string) => {
    navigate(`/app/doctor/${newTab}`);
  };

  return (
    <DoctorDashboard
      {...props}
      initialTab={tab || 'dashboard'}
      onTabChange={handleTabChange}
    />
  );
}

// Wrapper for Admin Dashboard tab sync
function AdminTabWrapper(props: any) {
  const { tab } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (newTab: string) => {
    navigate(`/app/admin/${newTab}`);
  };

  return (
    <AdminDashboard
      {...props}
      initialTab={tab || 'dashboard'}
      onTabChange={handleTabChange}
    />
  );
}
