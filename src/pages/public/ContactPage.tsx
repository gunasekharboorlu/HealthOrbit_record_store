import React, { useState } from 'react';
import { Mail, Building2, Phone, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 px-6 max-w-5xl mx-auto space-y-12 text-[#1D1D1F]">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#0071E3]">
          <Sparkles className="w-4 h-4 text-[#0071E3]" />
          Partner Onboarding
        </div>
        <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Connect With HealthOrbit.
        </h1>
        <p className="text-[#6E6E73] text-base leading-relaxed font-normal">
          Are you a hospital administrator, clinic lead, or practitioner interested in network integration? Reach out to our technical team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 rounded-[32px] bg-[#FBFBFD] p-8 border border-[#E5E5E7] space-y-6 shadow-2xs">
          <h3 className="text-xl font-bold text-[#1D1D1F]">Project Information</h3>
          
          <div className="space-y-4 text-xs text-[#6E6E73] leading-relaxed">
            <div className="p-4 bg-white border border-[#E5E5E7] rounded-2xl space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#0071E3] uppercase tracking-wider block">Academic & Research Notice</span>
              <p className="text-xs text-[#1D1D1F] font-normal">
                HealthOrbit is an academic and research project demonstrating secure digital healthcare record management.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#6E6E73]">
              <p><strong className="text-[#1D1D1F]">Demonstration Focus:</strong> Cryptographic ledger validation, role-based access control, and 24-hour decaying clearance keys.</p>
              <p><strong className="text-[#1D1D1F]">Inquiries:</strong> Submit the form to test project communication flows.</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 rounded-[32px] bg-white p-8 border border-[#E5E5E7] space-y-6 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1D1D1F]">Inquiry Received</h3>
              <p className="text-xs text-[#6E6E73] max-w-md mx-auto">
                Thank you for contacting HealthOrbit. Our clinical onboarding team will review your message and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-[#1D1D1F]">Hospital Onboarding Inquiry</h3>
              <div>
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase tracking-wider mb-1 font-mono">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl border border-[#D2D2D7] bg-white text-xs text-[#1D1D1F] focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase tracking-wider mb-1 font-mono">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="s.jenkins@metropolishospital.org"
                  className="w-full px-4 py-3 rounded-xl border border-[#D2D2D7] bg-white text-xs text-[#1D1D1F] focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase tracking-wider mb-1 font-mono">Hospital / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Metropolis Medical Center"
                  className="w-full px-4 py-3 rounded-xl border border-[#D2D2D7] bg-white text-xs text-[#1D1D1F] focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#6E6E73] uppercase tracking-wider mb-1 font-mono">Message / Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your clinic capacity and integration timeline..."
                  className="w-full px-4 py-3 rounded-xl border border-[#D2D2D7] bg-white text-xs text-[#1D1D1F] focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1D1D1F] hover:bg-black text-white py-3.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
