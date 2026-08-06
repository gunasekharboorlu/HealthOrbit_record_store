import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Heart, Bell, LogOut, ClipboardList, Menu, X, ShieldAlert, Check } from 'lucide-react';
import { User, Notification } from '../types';

interface NavbarProps {
  currentUser: User | null;
  unreadCount: number;
  notifications: Notification[];
  view: string;
  setView: (view: any) => void;
  navigateToDashboard: (user: User) => void;
  handleLogout: () => void;
  handleMarkAllRead: () => void;
  handleMarkRead: (id: string) => void;
}

export default function Navbar({
  currentUser,
  unreadCount,
  notifications,
  view,
  setView,
  navigateToDashboard,
  handleLogout,
  handleMarkAllRead,
  handleMarkRead,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E5E7] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setView('landing')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-xs transition-transform duration-300 group-hover:scale-105">
              <img src="/icon.svg" alt="HealthOrbit Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-[#1D1D1F]">
                HealthOrbit
              </span>
              <span className="block font-mono text-[8px] font-semibold tracking-widest text-[#6E6E73] uppercase">
                Clinical Ledger
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {currentUser ? (
              <>
                <button 
                  onClick={() => navigateToDashboard(currentUser)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    ['patient-dashboard', 'doctor-dashboard', 'admin-dashboard'].includes(view)
                      ? 'bg-[#1D1D1F] text-white shadow-2xs' 
                      : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                  }`}
                >
                  <ClipboardList className="w-4 h-4" />
                  Dashboard
                </button>

                <button 
                  onClick={() => setView('emergency-view')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    view === 'emergency-view'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : 'text-[#6E6E73] hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-600" />
                  Emergency Profile
                </button>

                {/* Notifications Dropdown Trigger */}
                <div className="relative">
                  <button 
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                    className="relative p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl transition-all cursor-pointer"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white ring-2 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {notifDropdownOpen && (
                      <>
                        {/* Overlay backdrop to close */}
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setNotifDropdownOpen(false)} 
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2.5 w-80 overflow-hidden rounded-2xl border border-[#E5E5E7] bg-white shadow-xl z-50"
                        >
                          <div className="flex items-center justify-between border-b border-[#E5E5E7] bg-[#FBFBFD] px-4 py-3">
                            <span className="text-xs font-bold text-[#1D1D1F]">Notifications</span>
                            {unreadCount > 0 && (
                              <button 
                                onClick={() => { handleMarkAllRead(); setNotifDropdownOpen(false); }}
                                className="text-[10px] font-semibold text-[#0071E3] hover:underline"
                              >
                                Mark all read
                              </button>
                            )}
                          </div>

                          <div className="max-h-72 overflow-y-auto divide-y divide-[#E5E5E7]">
                            {notifications.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                                <Bell className="w-8 h-8 text-[#86868B] mb-2" />
                                <p className="text-[11px] font-medium text-[#6E6E73]">All caught up! No notifications.</p>
                              </div>
                            ) : (
                              notifications.map((n) => (
                                <div 
                                  key={n.id} 
                                  onClick={() => {
                                    if (!n.read) handleMarkRead(n.id);
                                  }}
                                  className={`p-3.5 text-left text-xs cursor-pointer hover:bg-[#F5F5F7] transition-colors ${
                                    !n.read ? 'bg-[#F5F5F7] border-l-2 border-[#0071E3]' : ''
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[11px] font-bold ${!n.read ? 'text-[#1D1D1F]' : 'text-[#6E6E73]'}`}>
                                      {n.title}
                                    </span>
                                    <span className="text-[9px] text-[#86868B] font-mono">
                                      {new Date(n.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-[#6E6E73] text-[10px] leading-normal">{n.message}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Widget */}
                <div className="flex items-center gap-3 pl-4 border-l border-[#E5E5E7]">
                  <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] text-xs font-bold text-[#1D1D1F] uppercase">
                    {currentUser.name.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-[#1D1D1F] leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="block text-[9px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                      {currentUser.role}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-[#6E6E73] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setView('emergency-view')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-[#6E6E73] hover:text-rose-600 transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-600" />
                  Emergency Lookup
                </button>
                <button 
                  onClick={() => { setView('login'); }}
                  className="text-xs font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-all cursor-pointer"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setView('register'); }}
                  className="bg-[#1D1D1F] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  Register Now
                </button>
              </>
            )}
          </nav>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            {currentUser && unreadCount > 0 && (
              <span className="h-2 w-2 rounded-full bg-rose-600 ring-2 ring-white animate-pulse" />
            )}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E5E5E7] bg-white px-4 py-4 space-y-3 shadow-lg overflow-hidden"
          >
            {currentUser ? (
              <>
                <div className="p-3 bg-[#FBFBFD] rounded-xl flex items-center gap-3 border border-[#E5E5E7]">
                  <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#1D1D1F] text-white font-bold text-xs uppercase">
                    {currentUser.name.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-[#1D1D1F] leading-tight">{currentUser.name}</p>
                    <p className="text-[9px] font-bold text-[#6E6E73] uppercase tracking-wide">{currentUser.role}</p>
                  </div>
                </div>

                <button 
                  onClick={() => { setMobileMenuOpen(false); navigateToDashboard(currentUser); }}
                  className="w-full text-left py-2.5 px-3 text-[#1D1D1F] font-semibold text-xs hover:bg-[#F5F5F7] rounded-xl flex items-center gap-2.5 transition-all"
                >
                  <ClipboardList className="w-4 h-4 text-[#0071E3]" /> Dashboard
                </button>

                <button 
                  onClick={() => { setMobileMenuOpen(false); setView('emergency-view'); }}
                  className="w-full text-left py-2.5 px-3 text-[#1D1D1F] font-semibold text-xs hover:text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2.5 transition-all"
                >
                  <Heart className="w-4 h-4 text-rose-600" /> Emergency Profile
                </button>

                <button 
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="w-full text-left py-2.5 px-3 text-rose-600 font-semibold text-xs hover:bg-rose-50 rounded-xl flex items-center gap-2.5 transition-all border-t border-[#E5E5E7] mt-2 pt-3"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setView('emergency-view'); }}
                  className="w-full text-left py-2.5 px-3 text-[#1D1D1F] font-semibold text-xs hover:text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2.5 transition-all"
                >
                  <Heart className="w-4 h-4 text-rose-600" /> Emergency Lookup
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setView('login'); }}
                  className="w-full text-left py-2.5 px-3 text-[#1D1D1F] font-semibold text-xs hover:bg-[#F5F5F7] rounded-xl transition-all"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setView('register'); }}
                  className="w-full bg-[#1D1D1F] hover:bg-black text-white text-center py-2.5 rounded-xl font-semibold text-xs shadow-2xs block"
                >
                  Get Started
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
