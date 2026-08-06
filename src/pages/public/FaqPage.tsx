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
    <div className="py-16 px-6 max-w-4xl mx-auto space-y-12 text-[#1D1D1F]">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F5F5F7] border border-[#E5E5E7] px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#0071E3]">
          <Sparkles className="w-4 h-4 text-[#0071E3]" />
          Frequently Asked Questions
        </div>
        <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Common Platform Inquiries.
        </h1>
        <p className="text-[#6E6E73] text-base leading-relaxed font-normal">
          Everything you need to know about HealthOrbit features, security policies, and hospital workflows.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="rounded-2xl bg-white border border-[#E5E5E7] overflow-hidden transition-all shadow-2xs">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-[#F5F5F7] transition-colors"
            >
              <span className="text-sm font-bold text-[#1D1D1F] pr-4">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-[#86868B] shrink-0 transition-transform ${openIdx === idx ? 'rotate-180 text-[#0071E3]' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="p-6 pt-0 text-xs text-[#6E6E73] leading-relaxed border-t border-[#F5F5F7] bg-[#FBFBFD]">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
