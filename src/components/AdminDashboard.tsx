import React, { useState, useEffect } from 'react';
import { Download, Shield } from 'lucide-react';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';

// Modular Admin Pages
import AdminOverviewPage from '../pages/admin/AdminOverviewPage';
import DoctorVerificationPage from '../pages/admin/DoctorVerificationPage';
import PatientManagementPage from '../pages/admin/PatientManagementPage';
import HospitalManagementPage from '../pages/admin/HospitalManagementPage';
import AuditLogsPage from '../pages/admin/AuditLogsPage';
import AdminAnalyticsPage from '../pages/admin/AdminAnalyticsPage';
import SystemSettingsPage from '../pages/admin/SystemSettingsPage';

interface AdminDashboardProps {
  adminData: any;
  newHospitalName: string;
  setNewHospitalName: (val: string) => void;
  newHospitalAddress: string;
  setNewHospitalAddress: (val: string) => void;
  handleVerifyDoctor: (userId: string, verify: boolean) => void;
  handleAddHospital: (e: React.FormEvent) => void;
  currentUser?: any;
  unreadCount?: number;
  handleLogout?: () => void;
  initialTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function AdminDashboard({
  adminData,
  newHospitalName,
  setNewHospitalName,
  newHospitalAddress,
  setNewHospitalAddress,
  handleVerifyDoctor,
  handleAddHospital,
  currentUser,
  unreadCount = 0,
  handleLogout,
  initialTab,
  onTabChange,
}: AdminDashboardProps) {
  if (!adminData) return null;

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

  // Download Audit CSV helper
  const downloadAuditCSV = () => {
    if (!adminData.auditLogs) return;
    const headers = "ID,Timestamp,User ID,User Name,Role,Action,Details\n";
    const rows = adminData.auditLogs.map((log: any) => 
      `"${log.id}","${log.timestamp}","${log.userId}","${log.userName}","${log.userRole}","${log.action}","${(log.details || '').replace(/"/g, '""')}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthOrbit_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const tabLabels: Record<string, string> = {
    dashboard: 'Executive Overview',
    doctors: 'Doctor Verification',
    patients: 'Patient Directory',
    hospitals: 'Whitelisted Hospitals',
    analytics: 'Network Analytics',
    audit: 'Compliance Audit Logs',
    reports: 'System Reports',
    settings: 'System Settings',
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      
      {/* Sidebar Navigation */}
      <Sidebar
        role="admin"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser || { name: 'Admin Console', role: 'admin' }}
        unreadNotificationsCount={unreadCount}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        
        {/* Top Header / Breadcrumbs */}
        <div className="sticky top-16 z-20 bg-[#020617]/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 border border-white/10"
            >
              <Shield className="w-5 h-5 text-[#38bdf8]" />
            </button>
            <Breadcrumbs
              portalName="Admin Console"
              activeTab={activeTab}
              tabLabel={tabLabels[activeTab]}
              onNavigateHome={() => setActiveTab('dashboard')}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadAuditCSV}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Audit CSV
            </button>
          </div>
        </div>

        {/* Dynamic Modular Page Views */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 flex-1 max-w-7xl w-full mx-auto">
          
          {activeTab === 'dashboard' && (
            <AdminOverviewPage
              adminData={adminData}
              onNavigateTab={setActiveTab}
              onVerifyDoctor={handleVerifyDoctor}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorVerificationPage
              doctors={adminData.doctors || []}
              users={adminData.users || []}
              hospitals={adminData.hospitals || []}
              onVerifyDoctor={handleVerifyDoctor}
            />
          )}

          {activeTab === 'patients' && (
            <PatientManagementPage
              patients={adminData.patients || []}
              users={adminData.users || []}
              auditLogs={adminData.auditLogs || []}
            />
          )}

          {activeTab === 'hospitals' && (
            <HospitalManagementPage
              hospitals={adminData.hospitals || []}
              doctors={adminData.doctors || []}
              newHospitalName={newHospitalName}
              setNewHospitalName={setNewHospitalName}
              newHospitalAddress={newHospitalAddress}
              setNewHospitalAddress={setNewHospitalAddress}
              handleAddHospital={handleAddHospital}
            />
          )}

          {activeTab === 'analytics' && (
            <AdminAnalyticsPage
              adminData={adminData}
            />
          )}

          {activeTab === 'reports' && (
            <AdminAnalyticsPage
              adminData={adminData}
            />
          )}

          {activeTab === 'audit' && (
            <AuditLogsPage
              auditLogs={adminData.auditLogs || []}
            />
          )}

          {activeTab === 'settings' && (
            <SystemSettingsPage />
          )}

        </main>
      </div>
    </div>
  );
}
