import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto space-y-8 text-[#1D1D1F] text-xs leading-relaxed font-normal">
      <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Privacy Policy</h1>
      <p className="text-[#6E6E73]">Effective Date: July 2026</p>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#1D1D1F]">1. Zero-Knowledge Commitment</h2>
        <p className="text-[#6E6E73] leading-relaxed">
          HealthOrbit is built on privacy-first principles. We do not sell, license, or monetize patient healthcare information.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#1D1D1F]">2. Cryptographic Access Verification</h2>
        <p className="text-[#6E6E73] leading-relaxed">
          Medical reports marked as Sensitive are locked. Access is granted only when the patient approves a 24-hour decaying access key.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#1D1D1F]">3. Emergency Profile Vitals</h2>
        <p className="text-[#6E6E73] leading-relaxed">
          Critical emergency rescue details (blood group, chronic allergies, emergency contact phone numbers) are formatted for instant access during medical rescue situations.
        </p>
      </section>
    </div>
  );
}
