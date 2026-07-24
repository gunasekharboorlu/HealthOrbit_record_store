import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Bell, Search, Heart, LogOut, User, Menu, ShieldCheck, Sparkles, X, ChevronDown, Settings, Command } from 'lucide-react';
import { User as UserType, Notification } from '../../types';
import Avatar from '../Avatar';
import UniversalSearchModal from './UniversalSearchModal';
import NotificationCenterModal from './NotificationCenterModal';

interface AppTopNavProps {
  currentUser: UserType | null;
  unreadCount: number;
  notifications: Notification[];
  handleLogout: () => void;
  handleMarkAllRead: () => void;
  handleMarkRead: (id: string) => void;
  onToggleMobileSidebar: () => void;
  globalSearchQuery?: string;
  setGlobalSearchQuery?: (q: string) => void;
}

export default function AppTopNav({
  currentUser,
  unreadCount,
  notifications,
  handleLogout,
  handleMarkAllRead,
  handleMarkRead,
  onToggleMobileSidebar,
  globalSearchQuery = '',
  setGlobalSearchQuery,
}: AppTopNavProps) {
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const getPortalHome = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'patient') return '/app/patient/dashboard';
    if (currentUser.role === 'doctor') return '/app/doctor/dashboard';
    return '/app/admin/dashboard';
  };

  const handleSelectSearchResult = (type: string, item: any) => {
    if (type === 'patient') {
      if (currentUser?.role === 'doctor') navigate('/app/doctor/search');
    } else if (type === 'record' || type === 'prescription') {
      if (currentUser?.role === 'patient') navigate('/app/patient/records');
      else if (currentUser?.role === 'doctor') navigate('/app/doctor/search');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl px-4 lg:px-6 flex items-center justify-between gap-4">
      
      {/* Universal Search Modal */}
      <UniversalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Notification Center Modal */}
      <NotificationCenterModal
        isOpen={notifModalOpen}
        onClose={() => setNotifModalOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkRead={handleMarkRead}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Left: Brand / Mobile Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          title="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to={getPortalHome()} className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 shadow-md shadow-[#38bdf8]/20 transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5 animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-base font-bold tracking-tight bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] bg-clip-text text-transparent">
              HealthOrbit
            </span>
            <span className="block font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest">
              Enterprise Workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Global Search Bar Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <button
          id="trigger-universal-search"
          onClick={() => setSearchModalOpen(true)}
          className="w-full flex items-center justify-between pl-3.5 pr-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-[#38bdf8]" />
            <span>Search patients, doctors, reports, prescriptions...</span>
          </div>
          <kbd className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-white/10 rounded text-[10px] font-mono text-slate-400">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-2.5">
        
        {/* Mobile Search Button */}
        <button
          onClick={() => setSearchModalOpen(true)}
          className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          title="Search Workspace"
        >
          <Search className="w-5 h-5 text-[#38bdf8]" />
        </button>

        {/* Emergency Shortcut */}
        <Link
          to="/app/emergency"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all text-xs font-bold"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Emergency Profile</span>
        </Link>

        {/* Notifications Button */}
        <button
          onClick={() => setNotifModalOpen(true)}
          className="relative p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
          title="Notification Center"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-[#020617]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        {currentUser && (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
            >
              <Avatar name={currentUser.name} src={currentUser.profilePicture} size="sm" />
              <div className="hidden lg:block text-left">
                <span className="block text-xs font-bold text-white leading-tight">
                  {currentUser.name}
                </span>
                <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wide">
                  {currentUser.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/95 backdrop-blur-xl shadow-2xl z-50 p-2 space-y-1"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        if (currentUser.role === 'patient') navigate('/app/patient/profile');
                        else if (currentUser.role === 'doctor') navigate('/app/doctor/profile');
                        else navigate('/app/admin/settings');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" /> My Profile
                    </button>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        if (currentUser.role === 'patient') navigate('/app/patient/settings');
                        else if (currentUser.role === 'doctor') navigate('/app/doctor/settings');
                        else navigate('/app/admin/settings');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-slate-400" /> Settings
                    </button>

                    <div className="border-t border-white/5 pt-1">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </header>
  );
}
