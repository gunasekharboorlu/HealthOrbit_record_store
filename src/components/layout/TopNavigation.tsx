import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Search, Heart, Menu } from 'lucide-react';
import { User, Notification } from '../../types';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

interface TopNavigationProps {
  currentUser: User | null;
  unreadCount: number;
  notifications: Notification[];
  handleLogout: () => void;
  handleMarkAllRead: () => void;
  handleMarkRead: (id: string) => void;
  onToggleMobileSidebar: () => void;
  globalSearchQuery?: string;
  setGlobalSearchQuery?: (q: string) => void;
}

export default function TopNavigation({
  currentUser,
  unreadCount,
  notifications,
  handleLogout,
  handleMarkAllRead,
  handleMarkRead,
  onToggleMobileSidebar,
  globalSearchQuery = '',
  setGlobalSearchQuery,
}: TopNavigationProps) {

  const getPortalHome = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'patient') return '/app/patient/dashboard';
    if (currentUser.role === 'doctor') return '/app/doctor/dashboard';
    return '/app/admin/dashboard';
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-[#E5E5E7] bg-white/90 backdrop-blur-md px-6 lg:px-8 flex items-center justify-between gap-6">
      
      {/* Left: Brand & Mobile Menu Drawer Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to={getPortalHome()} className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1D1D1F] text-white shadow-xs transition-transform group-hover:scale-105">
            <Activity className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <span className="font-sans text-base font-semibold tracking-tight text-[#1D1D1F]">
              HealthOrbit
            </span>
            <span className="block font-mono text-[8px] font-medium text-[#6E6E73] uppercase tracking-wider">
              Console
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#86868B]" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery && setGlobalSearchQuery(e.target.value)}
            placeholder="Search records, patients, ID (e.g. PAT-80924)..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F5F5F7] border border-[#E5E5E7] text-xs font-normal text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white focus:ring-2 focus:ring-[#0071E3]/15 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions, Emergency Link, Notifications, Profile */}
      <div className="flex items-center gap-3">
        
        {/* Emergency Portal Shortcut */}
        <Link
          to="/app/emergency"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-all text-xs font-medium"
        >
          <Heart className="w-3.5 h-3.5 text-rose-600" />
          <span>Emergency Profile</span>
        </Link>

        {/* Reusable Notification Dropdown */}
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
        />

        {/* Reusable Profile Dropdown */}
        <ProfileDropdown
          currentUser={currentUser}
          onLogout={handleLogout}
        />

      </div>
    </header>
  );
}
