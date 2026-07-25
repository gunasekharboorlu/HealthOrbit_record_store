import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, FileText, UploadCloud, Shield, Lock, Clock, Heart, Bell,
  Settings, User, Users, Building, ClipboardList, LogOut, X, Sparkles, Activity, Stethoscope, Key 
} from 'lucide-react';
import { User as UserType } from '../../types';
import Avatar from '../Avatar';

interface SidebarProps {
  role: 'patient' | 'doctor' | 'admin';
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser?: UserType | null;
  unreadNotificationsCount?: number;
  pendingRequestsCount?: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  handleLogout?: () => void;
}

export default function Sidebar({
  role,
  activeTab,
  setActiveTab,
  currentUser,
  unreadNotificationsCount = 0,
  pendingRequestsCount = 0,
  mobileOpen,
  setMobileOpen,
  handleLogout,
}: SidebarProps) {

  // Role-specific Navigation Items
  const getNavItems = () => {
    if (role === 'patient') {
      return [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'records', label: 'Medical Records', icon: FileText },
        { id: 'upload', label: 'Upload Record', icon: UploadCloud },
        { id: 'doctors', label: 'Doctors & Clearances', icon: Lock, badge: pendingRequestsCount },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
        { id: 'profile', label: 'Medical Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else if (role === 'doctor') {
      return [
        { id: 'dashboard', label: 'Clinical Overview', icon: LayoutDashboard },
        { id: 'search', label: 'Patient Directory', icon: Users },
        { id: 'workspace', label: 'Patient Workspace', icon: Stethoscope },
        { id: 'requests', label: 'Access Clearances', icon: Key, badge: pendingRequestsCount },
        { id: 'profile', label: 'Doctor Credentials', icon: Shield },
        { id: 'settings', label: 'Practice Settings', icon: Settings },
      ];
    } else {
      return [
        { id: 'dashboard', label: 'Network Overview', icon: LayoutDashboard },
        { id: 'doctors', label: 'Practitioner Verifications', icon: Users },
        { id: 'hospitals', label: 'Partner Hospitals', icon: Building },
        { id: 'logs', label: 'System Audit Logs', icon: ClipboardList },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }
  };

  const navItems = getNavItems();

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-5 space-y-7">
      
      {/* Top Section */}
      <div className="space-y-7">
        
        {/* User Identity Card */}
        {currentUser && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5 shadow-sm">
            <Avatar name={currentUser.name} src={currentUser.profilePicture} size="md" />
            <div className="overflow-hidden space-y-0.5">
              <p className="text-xs font-bold text-white truncate font-display">{currentUser.name}</p>
              <span className="inline-block text-[9px] font-mono font-bold text-[#38bdf8] uppercase tracking-wider bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-2 py-0.5 rounded-md">
                {role} portal
              </span>
            </div>
          </div>
        )}

        {/* Navigation Section Title */}
        <div className="px-2">
          <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Portal Navigation
          </p>
        </div>

        {/* Links List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] text-slate-950 font-bold shadow-md shadow-[#38bdf8]/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-slate-950 text-[#38bdf8]'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3.5 pt-6 border-t border-white/10">
        
        {/* Emergency Shortcut */}
        <button
          onClick={() => {
            setActiveTab('emergency');
            setMobileOpen(false);
          }}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Emergency Profile</span>
          </div>
          <span className="text-[9px] font-mono uppercase bg-rose-500/20 px-1.5 py-0.5 rounded text-rose-300">
            ER
          </span>
        </button>

        {/* Sign Out Button */}
        {handleLogout && (
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        )}

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-white/10 bg-[#020617]/95 backdrop-blur-xl h-[calc(100vh-4.5rem)] sticky top-18 shrink-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Hamburger Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 md:hidden"
            />

            {/* Slide-over Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#020617] border-r border-white/10 shadow-2xl z-50 md:hidden flex flex-col justify-between"
            >
              {/* Header inside mobile drawer */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950">
                    <Activity className="h-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-sm text-white">HealthOrbit Menu</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
