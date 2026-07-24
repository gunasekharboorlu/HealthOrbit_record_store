import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-8 text-slate-300 text-xs leading-relaxed">
      <h1 className="font-display text-3xl font-bold text-white">Terms of Service</h1>
      <p className="text-slate-400">Effective Date: July 2026</p>
      
      <section className="space-y-2">
        <h2 className="font-display text-lg font-bold text-white">1. Introduction</h2>
        <p>
          Welcome to HealthOrbit. By accessing or using our clinical ledger SaaS platform, you agree to comply with and be bound by these Terms of Service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg font-bold text-white">2. Patient Data Ownership</h2>
        <p>
          HealthOrbit acknowledges that patients maintain absolute ownership over their medical diagnostic records. Our platform acts strictly as a zero-knowledge cryptographic protocol layer for record transmission and access verification.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-lg font-bold text-white">3. Practitioner Responsibilities</h2>
        <p>
          Healthcare practitioners using HealthOrbit certify that they hold valid medical licenses and agree to request record access solely for legitimate patient care purposes.
        </p>
      </section>
    </div>
  );
}
