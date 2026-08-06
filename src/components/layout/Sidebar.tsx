import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, FileText, UploadCloud, Shield, Lock, Bell,
  Settings, User, Users, Building, ClipboardList, LogOut, X, Heart, Stethoscope, Key, Activity
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
    <div className="flex flex-col h-full justify-between p-4 sm:p-5 space-y-6">
      
      {/* Top Section */}
      <div className="space-y-6">
        
        {/* User Identity Card */}
        {currentUser && (
          <div className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7] flex items-center gap-3 shadow-xs">
            <Avatar name={currentUser.name} src={currentUser.profilePicture} size="md" />
            <div className="overflow-hidden space-y-0.5">
              <p className="text-xs font-semibold text-[#1D1D1F] truncate">{currentUser.name}</p>
              <span className="inline-block text-[9px] font-mono font-medium text-[#6E6E73] uppercase tracking-wider bg-white border border-[#E5E5E7] px-2 py-0.5 rounded-md">
                {role} portal
              </span>
            </div>
          </div>
        )}

        {/* Navigation Section Title */}
        <div className="px-2">
          <p className="text-[10px] font-mono font-medium text-[#86868B] uppercase tracking-wider">
            Navigation
          </p>
        </div>

        {/* Links List */}
        <nav className="space-y-1">
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1D1D1F] text-white font-medium shadow-xs'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] font-normal'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#86868B]'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      isActive
                        ? 'bg-white text-[#1D1D1F]'
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
      <div className="space-y-2.5 pt-4 border-t border-[#E5E5E7]">
        
        {/* Emergency Shortcut */}
        <button
          onClick={() => {
            setActiveTab('emergency');
            setMobileOpen(false);
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-medium transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-rose-600" />
            <span>Emergency Profile</span>
          </div>
          <span className="text-[9px] font-mono uppercase bg-rose-100 px-1.5 py-0.5 rounded text-rose-800">
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
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#6E6E73] hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-[#86868B]" />
            <span>Sign Out</span>
          </button>
        )}

      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#E5E5E7] bg-white h-[calc(100vh-4rem)] sticky top-16 shrink-0 z-30">
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
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Slide-over Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E5E5E7] shadow-xl z-50 md:hidden flex flex-col justify-between"
            >
              {/* Header inside mobile drawer */}
              <div className="flex items-center justify-between p-4 border-b border-[#E5E5E7]">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg overflow-hidden shadow-xs">
                    <img src="/icon.svg" alt="HealthOrbit Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-sans font-semibold text-sm text-[#1D1D1F]">HealthOrbit Menu</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-[#6E6E73] hover:text-[#1D1D1F] rounded-lg hover:bg-[#F5F5F7] cursor-pointer"
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
