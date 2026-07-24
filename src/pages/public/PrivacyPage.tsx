import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-8 text-slate-300 text-xs leading-relaxed">
      <h1 className="font-display text-3xl font-bold text-white">Privacy Policy</h1>
      <p className="text-slate-400">Effective Date: July 2026</p>

      <section className="space-y-2">
        <h2 className="font-display text-lg font-bold text-white">1. Zero-Knowledge Commitment</h2>
        <p>
          HealthOrbit is built on privacy-first principles. We do not sell, license, or monetize patient healthcare information.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg font-bold text-white">2. Cryptographic Access Verification</h2>
        <p>
          Medical reports marked as Sensitive are locked. Access is granted only when the patient approves a 24-hour decaying access key.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg font-bold text-white">3. Emergency Profile Vitals</h2>
        <p>
          Critical emergency rescue details (blood group, chronic allergies, emergency contact phone numbers) are formatted for instant access during medical rescue situations.
        </p>
      </section>
    </div>
  );
}
