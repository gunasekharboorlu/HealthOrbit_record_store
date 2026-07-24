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
    <div className="py-16 px-4 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4" />
          Partner Onboarding
        </div>
        <h1 className="font-display text-4xl font-black text-white tracking-tight">
          Connect With HealthOrbit.
        </h1>
        <p className="text-slate-300 text-sm">
          Are you a hospital administrator, clinic lead, or practitioner interested in network integration? Reach out to our technical team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 glass-card rounded-3xl p-8 border border-white/10 space-y-6">
          <h3 className="font-display text-xl font-bold text-white">Contact Information</h3>
          
          <div className="space-y-4 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#38bdf8] shrink-0" />
              <div>
                <p className="font-bold text-white">HealthOrbit Global Network</p>
                <p>100 Health Tech Way, Suite 400</p>
                <p>San Francisco, CA 94107</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#38bdf8] shrink-0" />
              <div>
                <p className="font-bold text-white">Clinical Support Email</p>
                <p>onboarding@healthorbit.org</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#38bdf8] shrink-0" />
              <div>
                <p className="font-bold text-white">Direct Line</p>
                <p>+1 (800) 555-ORBIT</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 glass-card rounded-3xl p-8 border border-white/10 space-y-6">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you for contacting HealthOrbit. Our clinical onboarding team will review your message and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-xl font-bold text-white">Hospital Onboarding Inquiry</h3>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl premium-input outline-none text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="s.jenkins@metropolishospital.org"
                  className="w-full px-4 py-3 rounded-xl premium-input outline-none text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono">Hospital / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={e => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Metropolis Medical Center"
                  className="w-full px-4 py-3 rounded-xl premium-input outline-none text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-mono">Message / Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your clinic capacity and integration timeline..."
                  className="w-full px-4 py-3 rounded-xl premium-input outline-none text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full premium-btn-primary py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
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
