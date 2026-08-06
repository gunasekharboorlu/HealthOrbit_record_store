import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Heart, Shield, Sparkles, Menu, X } from 'lucide-react';
import { User } from '../types';
import InstallHealthOrbitButton from '../components/common/InstallHealthOrbitButton';
import BrandLogoCenterpiece from '../components/common/BrandLogoCenterpiece';

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
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1D1D1F] selection:bg-[#0071E3]/20 selection:text-[#1D1D1F]">
      
      {/* Apple Minimalist Public Header Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E5E5E7] bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo Brand */}
            <Link to="/">
              <BrandLogoCenterpiece size="header" showTagline={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-[#1D1D1F] font-semibold' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all"
              >
                <Heart className="w-3.5 h-3.5 text-rose-600" />
                Emergency Lookup
              </Link>

              {currentUser ? (
                <button
                  onClick={() => navigate(getDashboardPath())}
                  className="bg-[#1D1D1F] hover:bg-black text-white px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-[0.98]"
                >
                  Go to App Console
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] px-3 py-2 transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#1D1D1F] hover:bg-black text-white px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-[0.98]"
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
                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="lg:hidden border-t border-[#E5E5E7] bg-white px-4 py-4 space-y-2 shadow-lg overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-3 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] rounded-xl"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#E5E5E7] space-y-2">
                <div className="px-1 py-1">
                  <InstallHealthOrbitButton variant="footer" className="w-full justify-center" />
                </div>
                <Link
                  to="/app/emergency"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-2 px-3 text-xs font-medium text-rose-700 bg-rose-50 rounded-xl"
                >
                  <Heart className="w-4 h-4 text-rose-600" /> Emergency Lookup
                </Link>
                {currentUser ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(getDashboardPath());
                    }}
                    className="w-full bg-[#1D1D1F] text-white font-medium py-2.5 rounded-full text-xs text-center block"
                  >
                    Open App Console
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2 text-xs font-medium text-[#1D1D1F] border border-[#E5E5E7] rounded-xl"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-center py-2 text-xs font-medium text-white bg-[#1D1D1F] rounded-xl"
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

      {/* Apple Minimalist Footer with 110px Top Padding to guarantee zero overlap */}
      <footer className="border-t border-[#E5E5E7] bg-[#F5F5F7] pt-[110px] pb-16 text-[#6E6E73] relative z-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Brand column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden shadow-xs">
                  <img src="/icon.svg" alt="HealthOrbit Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="font-sans text-lg font-bold text-[#1D1D1F]">
                    HealthOrbit
                  </span>
                  <span className="block font-mono text-[8px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                    Clinical Ledger Enterprise
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed max-w-sm">
                Decentralized patient-owned health timeline registry. Link clinics, verify record cryptographic integrity, and secure clinical clearances seamlessly.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-medium">
                <Shield className="w-4 h-4 text-emerald-600" /> HIPAA Compliant Architecture
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-semibold text-[#1D1D1F] uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-xs text-[#6E6E73]">
                <li><Link to="/features" className="hover:text-[#1D1D1F] transition-colors">Features</Link></li>
                <li><Link to="/how-it-works" className="hover:text-[#1D1D1F] transition-colors">How It Works</Link></li>
                <li><Link to="/security" className="hover:text-[#1D1D1F] transition-colors">Security Architecture</Link></li>
                <li><Link to="/faq" className="hover:text-[#1D1D1F] transition-colors">F.A.Q.</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-mono font-semibold text-[#1D1D1F] uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-xs text-[#6E6E73]">
                <li><Link to="/about" className="hover:text-[#1D1D1F] transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-[#1D1D1F] transition-colors">Contact Hospital Onboarding</Link></li>
                <li><Link to="/terms" className="hover:text-[#1D1D1F] transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-[#1D1D1F] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Emergency & Access */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-mono font-semibold text-[#1D1D1F] uppercase tracking-wider">Progressive Web App</h4>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Install HealthOrbit on your mobile home screen or desktop launcher for zero-latency access.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <InstallHealthOrbitButton variant="footer" />
                <Link
                  to="/app/emergency"
                  className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 px-4 py-2 rounded-full text-xs font-medium transition-all"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  Emergency Portal
                </Link>
              </div>
            </div>

          </div>

          <div className="border-t border-[#E5E5E7] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#86868B]">
            <p>HealthOrbit Academic & Research Platform. Built with React, TypeScript, Vite & Express.</p>
            <p className="flex items-center gap-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#1D1D1F]" /> Enterprise Ledger Protocol v2.5
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
