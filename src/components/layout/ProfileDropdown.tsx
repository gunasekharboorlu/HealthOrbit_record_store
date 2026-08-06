import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';
import { User } from '../../types';
import Avatar from '../Avatar';

interface ProfileDropdownProps {
  currentUser: User | null;
  onLogout: () => void;
}

export default function ProfileDropdown({ currentUser, onLogout }: ProfileDropdownProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!currentUser) return null;

  const handleProfileClick = () => {
    setIsOpen(false);
    if (currentUser.role === 'patient') navigate('/app/patient/profile');
    else if (currentUser.role === 'doctor') navigate('/app/doctor/profile');
    else navigate('/app/admin/settings');
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    if (currentUser.role === 'patient') navigate('/app/patient/settings');
    else if (currentUser.role === 'doctor') navigate('/app/doctor/settings');
    else navigate('/app/admin/settings');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#F5F5F7] transition-all cursor-pointer"
      >
        <Avatar name={currentUser.name} src={currentUser.profilePicture} size="sm" />
        <div className="hidden lg:block text-left">
          <span className="block text-xs font-semibold text-[#1D1D1F] leading-tight">
            {currentUser.name}
          </span>
          <span className="block text-[9px] font-mono text-[#86868B] uppercase tracking-wide">
            {currentUser.role}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-[#86868B] hidden sm:block" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white shadow-xl z-50 p-2 space-y-1"
            >
              <div className="px-3 py-2 border-b border-[#F5F5F7] mb-1">
                <p className="text-xs font-semibold text-[#1D1D1F] truncate">{currentUser.name}</p>
                <p className="text-[10px] text-[#86868B] truncate">{currentUser.email}</p>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] flex items-center gap-2 cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-[#86868B]" /> My Profile
                </button>

                <button
                  onClick={handleSettingsClick}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-[#86868B]" /> Settings
                </button>
              </div>

              <div className="border-t border-[#F5F5F7] pt-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
