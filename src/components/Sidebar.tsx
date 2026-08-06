import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, FileText, FileUp, Activity, Heart, Key, Bell, User, Settings,
  Search, UserCheck, FolderKanban, Pill, Users, Building2, BarChart3, ShieldCheck,
  FilePieChart, LogOut, ChevronRight, X, Sparkles, Stethoscope, Clock
} from 'lucide-react';
import { User as UserType } from '../types';

import Avatar from './Avatar';

interface SidebarProps {
  role: 'patient' | 'doctor' | 'admin';
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserType | null;
  unreadNotificationsCount?: number;
  pendingRequestsCount?: number;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  handleLogout?: () => void;
}

export default function Sidebar({
  role,
  activeTab,
  setActiveTab,
  currentUser,
  unreadNotificationsCount = 0,
  pendingRequestsCount = 0,
  mobileOpen = false,
  setMobileOpen,
  handleLogout,
}: SidebarProps) {

  const getMenuItems = () => {
    if (role === 'patient') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'records', label: 'Medical Records', icon: FileText },
        { id: 'upload', label: 'Upload Record', icon: FileUp },
        { id: 'timeline', label: 'Medical Timeline', icon: Activity },
        { id: 'emergency', label: 'Emergency Card', icon: Heart, highlight: true },
        { id: 'requests', label: 'Access Requests', icon: Key, badge: pendingRequestsCount },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else if (role === 'doctor') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'search', label: 'Patient Search', icon: Search },
        { id: 'details', label: 'Patient Details', icon: UserCheck },
        { id: 'records', label: 'Medical Records', icon: FolderKanban },
        { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
        { id: 'requests', label: 'Access Requests', icon: Key, badge: pendingRequestsCount },
        { id: 'recent', label: 'Recent Patients', icon: Clock },
        { id: 'profile', label: 'Profile', icon: Stethoscope },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    } else {
      // Admin
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'doctors', label: 'Doctors', icon: Stethoscope },
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'hospitals', label: 'Hospitals', icon: Building2 },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'audit', label: 'Audit Logs', icon: ShieldCheck },
        { id: 'reports', label: 'Reports', icon: FilePieChart },
        { id: 'settings', label: 'System Settings', icon: Settings },
      ];
    }
  };

  const menuItems = getMenuItems();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (setMobileOpen) setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-white/95 backdrop-blur-xl border-r border-[#E5E5E7] text-[#1D1D1F] w-64 select-none">
      
      {/* Upper Navigation Area */}
      <div className="space-y-6">
        
        {/* Header / Role Identifier */}
        <div className="px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#0071E3]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0071E3] uppercase">
              {role === 'patient' ? 'Patient Portal' : role === 'doctor' ? 'Clinical Portal' : 'Admin Console'}
            </span>
          </div>
          {setMobileOpen && (
            <button 
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-[#6E6E73] hover:text-[#1D1D1F] p-1 rounded-lg hover:bg-[#F5F5F7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Card */}
        <div className="bg-[#FBFBFD] border border-[#E5E5E7] rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
          <Avatar 
            name={currentUser?.name || 'User'} 
            src={currentUser?.profilePicture} 
            size="sm" 
          />
          <div className="overflow-hidden flex-1">
            <h4 className="text-xs font-bold text-[#1D1D1F] truncate leading-tight">
              {currentUser?.name || 'User'}
            </h4>
            <span className="text-[10px] text-[#6E6E73] font-mono capitalize truncate block">
              {role}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? item.highlight
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 font-bold shadow-2xs'
                      : 'bg-[#1D1D1F] text-white font-bold shadow-2xs'
                    : item.highlight
                      ? 'text-rose-600 hover:bg-rose-50 border border-transparent'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 ${isActive ? (item.highlight ? 'text-rose-700' : 'text-white') : (item.highlight ? 'text-rose-600' : 'text-[#86868B]')}`} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-600 text-white">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <ChevronRight className={`w-3.5 h-3.5 ${item.highlight ? 'text-rose-700' : 'text-white/80'}`} />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Quick Actions */}
      <div className="space-y-3 border-t border-[#E5E5E7] pt-4">
        {handleLogout && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#6E6E73] hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        )}
        <div className="px-3 py-1 flex items-center justify-between text-[9px] font-mono text-[#86868B]">
          <span>HealthOrbit v2.5</span>
          <span className="flex items-center gap-1 text-emerald-700 font-bold">
            <Sparkles className="w-2.5 h-2.5" /> HIPAA
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block fixed left-0 top-16 bottom-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 h-full"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
