import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Heart, Shield, Sparkles, Menu, X, ArrowRight, Lock, CheckCircle2, ChevronRight, Smartphone, Download } from 'lucide-react';
import { User } from '../types';
import InstallHealthOrbitButton from '../components/common/InstallHealthOrbitButton';

interface WebsiteLayoutProps {
  currentUser: User | null;
  handleLogout?: () => void;
}

export default function WebsiteLayout({ currentUser, handleLogout }: WebsiteLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Security', path: '/security' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'patient') return '/app/patient/dashboard';
    if (currentUser.role === 'doctor') return '/app/doctor/dashboard';
    return '/app/admin/dashboard';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white selection:bg-[#38bdf8]/30 selection:text-white">
      
      {/* Public Header Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020617]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 shadow-md shadow-[#38bdf8]/20 transition-all duration-300 group-hover:scale-105">
                <Activity className="h-5.5 w-5.5 animate-pulse" />
              </div>
              <div>
                <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-[#38bdf8] via-[#5da9ff] to-[#22d3ee] bg-clip-text text-transparent">
                  HealthOrbit
                </span>
                <span className="block font-mono text-[8px] font-bold tracking-widest text-slate-400 uppercase">
                  Clinical Ledger
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs font-semibold tracking-wide transition-colors ${
                      isActive ? 'text-[#38bdf8] font-bold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <InstallHealthOrbitButton variant="navbar" />

              <Link
                to="/app/emergency"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
              >
                <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
                Emergency Lookup
              </Link>

              {currentUser ? (
                <button
                  onClick={() => navigate(getDashboardPath())}
                  className="bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Go to App Console
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs font-bold text-slate-300 hover:text-white px-3 py-2 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 bg-[#020617]/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-2xl overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="px-1 py-1">
                  <InstallHealthOrbitButton variant="footer" className="w-full justify-center" />
                </div>
                <Link
                  to="/app/emergency"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl"
                >
                  <Heart className="w-4 h-4 text-rose-400" /> Emergency Lookup
                </Link>
                {currentUser ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(getDashboardPath());
                    }}
                    className="w-full bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 font-bold py-2.5 rounded-xl text-xs text-center block"
                  >
                    Open App Console
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2 text-xs font-bold text-slate-300 border border-white/10 rounded-xl"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2 text-xs font-bold text-slate-950 bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] rounded-xl"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Public Pages Main Container */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="border-t border-white/10 bg-[#020617] pt-16 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Brand column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#22d3ee] text-slate-950 shadow-md">
                  <Activity className="h-5.5 w-5.5 animate-pulse" />
                </div>
                <div>
                  <span className="font-display text-xl font-bold bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] bg-clip-text text-transparent">
                    HealthOrbit
                  </span>
                  <span className="block font-mono text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    Clinical Ledger SaaS
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Decentralized patient-owned health timeline registry. Link clinics, verify records cryptographic integrity, and secure clinical clearances in real time.
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 font-bold">
                <Shield className="w-4 h-4 text-emerald-400" /> HIPAA Compliant Architecture
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security Architecture</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">F.A.Q.</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Hospital Onboarding</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Emergency & Access */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Mobile & Desktop Progressive Web App</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Install HealthOrbit on your mobile home screen or desktop launcher for zero-latency offline access.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <InstallHealthOrbitButton variant="footer" />
                <Link
                  to="/app/emergency"
                  className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
                  Emergency Portal
                </Link>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <p>© {new Date().getFullYear()} HealthOrbit Inc. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#38bdf8]" /> Cryptographic Medical Registry Protocol v2.5
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
