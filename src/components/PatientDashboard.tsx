import React, { useState, useEffect } from 'react';
import { MedicalRecord, Patient, Notification as NotificationType } from '../types';
import Sidebar from './layout/Sidebar';
import Breadcrumb from './layout/Breadcrumb';

// Import Modular Patient Pages
import PatientOverviewPage from '../pages/patient/PatientOverviewPage';
import MedicalRecordsPage from '../pages/patient/MedicalRecordsPage';
import UploadRecordPage from '../pages/patient/UploadRecordPage';
import DoctorsPage from '../pages/patient/DoctorsPage';
import EmergencyProfilePage from '../pages/patient/EmergencyProfilePage';
import NotificationsPage from '../pages/patient/NotificationsPage';
import ProfilePage from '../pages/patient/ProfilePage';
import SettingsPage from '../pages/patient/SettingsPage';

interface PatientDashboardProps {
  patientData: any;
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
  editDob: string;
  setEditDob: (val: string) => void;
  editGender: string;
  setEditGender: (val: string) => void;
  editBlood: string;
  setEditBlood: (val: string) => void;
  editAllergies: string;
  setEditAllergies: (val: string) => void;
  editDiseases: string;
  setEditDiseases: (val: string) => void;
  editContactName: string;
  setEditContactName: (val: string) => void;
  editContactPhone: string;
  setEditContactPhone: (val: string) => void;
  editContactRelation: string;
  setEditContactRelation: (val: string) => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (val: boolean) => void;
  handleUpdateProfile: (e: React.FormEvent) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadRecord: (e: React.FormEvent) => void;
  handleDeleteRecord: (id: string) => void;
  handleRespondAccess: (id: string, status: 'approved' | 'rejected') => void;
  downloadFile: (fileName: string, base64Content: string) => void;
  currentUser?: any;
  unreadCount?: number;
  notifications?: NotificationType[];
  handleMarkRead?: (id: string) => void;
  handleMarkAllRead?: () => void;
  handleLogout?: () => void;
  initialTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function PatientDashboard({
  patientData,
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
  editDob,
  setEditDob,
  editGender,
  setEditGender,
  editBlood,
  setEditBlood,
  editAllergies,
  setEditAllergies,
  editDiseases,
  setEditDiseases,
  editContactName,
  setEditContactName,
  editContactPhone,
  setEditContactPhone,
  editContactRelation,
  setEditContactRelation,
  isEditingProfile,
  setIsEditingProfile,
  handleUpdateProfile,
  handleFileChange,
  handleUploadRecord,
  handleDeleteRecord,
  handleRespondAccess,
  downloadFile,
  currentUser,
  unreadCount = 0,
  notifications = [],
  handleMarkRead,
  handleMarkAllRead,
  handleLogout,
  initialTab,
  onTabChange,
}: PatientDashboardProps) {
  if (!patientData) return null;

  const [internalTab, setInternalTab] = useState('dashboard');

  useEffect(() => {
    if (initialTab) {
      setInternalTab(initialTab);
    }
  }, [initialTab]);

  const activeTab = initialTab || internalTab;

  const handleTabNavigate = (tab: string) => {
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="w-full">
      {/* Route-Based Page Component Rendering */}
      {activeTab === 'dashboard' && (
        <PatientOverviewPage
          patientData={patientData}
          onNavigateTab={handleTabNavigate}
          handleRespondAccess={handleRespondAccess}
          downloadFile={downloadFile}
          unreadCount={unreadCount}
        />
      )}

      {activeTab === 'records' && (
        <MedicalRecordsPage
          records={patientData.records || []}
          onNavigateTab={handleTabNavigate}
          handleDeleteRecord={handleDeleteRecord}
          downloadFile={downloadFile}
        />
      )}

      {activeTab === 'upload' && (
        <UploadRecordPage
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
          handleFileChange={handleFileChange}
          handleUploadRecord={handleUploadRecord}
          onNavigateTab={handleTabNavigate}
        />
      )}

      {(activeTab === 'doctors' || activeTab === 'requests') && (
        <DoctorsPage
          pendingRequests={patientData.pendingRequests || []}
          accessHistory={patientData.accessHistory || []}
          handleRespondAccess={handleRespondAccess}
          onNavigateTab={handleTabNavigate}
        />
      )}

      {activeTab === 'emergency' && (
        <EmergencyProfilePage
          patient={patientData.patient}
          patientName={patientData.name || 'Patient'}
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
          onNavigateTab={handleTabNavigate}
        />
      )}

      {activeTab === 'notifications' && (
        <NotificationsPage
          notifications={notifications}
          unreadCount={unreadCount}
          handleMarkRead={handleMarkRead}
          handleMarkAllRead={handleMarkAllRead}
          onNavigateTab={handleTabNavigate}
        />
      )}

      {activeTab === 'profile' && (
        <ProfilePage
          patient={patientData.patient}
          patientName={patientData.name || 'Patient'}
          currentUser={currentUser}
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
          handleUpdateProfile={handleUpdateProfile}
          onNavigateTab={handleTabNavigate}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsPage onNavigateTab={handleTabNavigate} />
      )}
    </div>
  );
}
