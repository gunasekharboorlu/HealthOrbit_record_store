import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopNavigation from '../components/layout/TopNavigation';
import Sidebar from '../components/layout/Sidebar';
import Toast from '../components/Toast';
import { User, Notification, Toast as ToastType } from '../types';

interface AppLayoutProps {
  currentUser: User | null;
  unreadCount: number;
  notifications: Notification[];
  handleLogout: () => void;
  handleMarkAllRead: () => void;
  handleMarkRead: (id: string) => void;
  toast: ToastType | null;
  onCloseToast?: () => void;
  pendingRequestsCount?: number;
}

export default function AppLayout({
  currentUser,
  unreadCount,
  notifications,
  handleLogout,
  handleMarkAllRead,
  handleMarkRead,
  toast,
  onCloseToast,
  pendingRequestsCount = 0,
}: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Determine active tab from location pathname (e.g. /app/patient/records -> records)
  const pathParts = location.pathname.split('/').filter(Boolean);
  const activeTab = pathParts[2] || 'dashboard';

  const userRole = currentUser?.role || 'patient';

  const handleTabChange = (tabId: string) => {
    navigate(`/app/${userRole}/${tabId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 selection:bg-[#38bdf8]/30 selection:text-white relative">
      
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={onCloseToast || (() => {})} />

      {/* Fixed Top Navigation Bar */}
      <TopNavigation
        currentUser={currentUser}
        unreadCount={unreadCount}
        notifications={notifications}
        handleLogout={handleLogout}
        handleMarkAllRead={handleMarkAllRead}
        handleMarkRead={handleMarkRead}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        globalSearchQuery={globalSearch}
        setGlobalSearchQuery={setGlobalSearch}
      />

      {/* Body Container with Fixed Sidebar & Content Area */}
      <div className="flex flex-1 relative">
        
        {/* Sidebar (Desktop Permanent + Mobile Drawer) */}
        <Sidebar
          role={userRole}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          currentUser={currentUser}
          unreadNotificationsCount={unreadCount}
          pendingRequestsCount={pendingRequestsCount}
          mobileOpen={mobileSidebarOpen}
          setMobileOpen={setMobileSidebarOpen}
          handleLogout={handleLogout}
        />

        {/* Dynamic SaaS Application Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full min-h-[calc(100vh-4.5rem)]">
          <Outlet context={{ globalSearch, setGlobalSearch }} />
        </main>

      </div>
    </div>
  );
}
