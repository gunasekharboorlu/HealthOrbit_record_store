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
    <header className="sticky top-0 z-40 w-full h-18 border-b border-white/10 bg-[#020617]/85 backdrop-blur-xl px-6 lg:px-10 flex items-center justify-between gap-6">
      
      {/* Left: Brand & Mobile Menu Drawer Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to={getPortalHome()} className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 shadow-md shadow-[#38bdf8]/20 transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] bg-clip-text text-transparent">
              HealthOrbit
            </span>
            <span className="block font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest">
              SaaS Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-lg mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery && setGlobalSearchQuery(e.target.value)}
            placeholder="Search records, patients, ID (e.g. PAT-80924)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions, Emergency Link, Notifications, Profile */}
      <div className="flex items-center gap-3.5 sm:gap-5">
        
        {/* Emergency Portal Shortcut */}
        <Link
          to="/app/emergency"
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all text-xs font-bold"
        >
          <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
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
