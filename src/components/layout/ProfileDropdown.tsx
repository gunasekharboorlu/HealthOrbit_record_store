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
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/95 backdrop-blur-xl shadow-2xl z-50 p-2 space-y-1"
            >
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
              </div>

              <div className="space-y-1">
                <button
                  onClick={handleProfileClick}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" /> My Profile
                </button>

                <button
                  onClick={handleSettingsClick}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-slate-400" /> Settings
                </button>
              </div>

              <div className="border-t border-white/5 pt-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
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
  );
}
