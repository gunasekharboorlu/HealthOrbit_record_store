import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto space-y-8 text-[#1D1D1F] text-xs leading-relaxed font-normal">
      <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Terms of Service</h1>
      <p className="text-[#6E6E73]">Effective Date: July 2026</p>
      
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#1D1D1F]">1. Introduction</h2>
        <p className="text-[#6E6E73] leading-relaxed">
          Welcome to HealthOrbit. By accessing or using our clinical ledger SaaS platform, you agree to comply with and be bound by these Terms of Service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#1D1D1F]">2. Patient Data Ownership</h2>
        <p className="text-[#6E6E73] leading-relaxed">
          HealthOrbit acknowledges that patients maintain absolute ownership over their medical diagnostic records. Our platform acts strictly as a zero-knowledge cryptographic protocol layer for record transmission and access verification.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#1D1D1F]">3. Practitioner Responsibilities</h2>
        <p className="text-[#6E6E73] leading-relaxed">
          Healthcare practitioners using HealthOrbit certify that they hold valid medical licenses and agree to request record access solely for legitimate patient care purposes.
        </p>
      </section>
    </div>
  );
}
