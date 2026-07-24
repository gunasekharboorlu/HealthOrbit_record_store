import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the 24-hour sensitive access lock work?",
      a: "When a doctor requests permission to view a report marked as sensitive, you receive a real-time dashboard notification. Once you click 'Approve', a secure JWT link is validated for exactly 24 hours. After this period, the access token naturally decays and the report automatically relocks."
    },
    {
      q: "Who can see my Emergency Profile?",
      a: "Your Emergency Profile contains only critical rescue vitals (blood group, severe allergies, chronic conditions, and emergency contact numbers). It is designed to be accessible to emergency first responders without full account authentication, saving vital minutes during a crisis."
    },
    {
      q: "What is a Clinical Trust Badge?",
      a: "HealthOrbit separates patient-uploaded medical history from clinical records. Reports uploaded directly by verified practitioners at partner hospitals receive a 'Clinic Verified' stamp, whereas user-reported items receive a 'Patient Self-Report' indicator."
    },
    {
      q: "Is my medical data sold or exposed to advertisers?",
      a: "Absolutely not. HealthOrbit relies on a decentralized identity protocol. You hold the unique decryption keys. Without your explicit cryptographic approval, no doctor, clinic, or third party can access your medical records."
    },
    {
      q: "How can my hospital integrate with HealthOrbit?",
      a: "Hospitals can apply for administrator credentials through our Onboarding Portal. Our team provides API keys and FHIR/HL7 interoperability adapters to sync lab records and prescriptions automatically."
    }
  ];

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-4 py-1.5 rounded-full text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
          <Sparkles className="w-4 h-4" />
          Frequently Asked Questions
        </div>
        <h1 className="font-display text-4xl font-black text-white tracking-tight">
          Common Platform Inquiries.
        </h1>
        <p className="text-slate-300 text-sm">
          Everything you need to know about HealthOrbit features, security policies, and hospital workflows.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-white/5 transition-colors"
            >
              <span className="text-sm font-bold text-white pr-4">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openIdx === idx ? 'rotate-180 text-[#38bdf8]' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="p-6 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/20 font-sans">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
