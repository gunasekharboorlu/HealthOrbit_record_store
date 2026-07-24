import React from 'react';
import { 
  BarChart3, TrendingUp, Users, Stethoscope, Building2, 
  FileText, Key, ShieldCheck, Activity, FilePieChart
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid 
} from 'recharts';
import { GlassCard, StatCard } from '../../components/ui';

interface AdminAnalyticsPageProps {
  adminData: any;
}

export default function AdminAnalyticsPage({ adminData }: AdminAnalyticsPageProps) {
  if (!adminData) return null;

  const totalPatients = adminData.patients?.length || 0;
  const totalDoctors = adminData.doctors?.length || 0;
  const totalHospitals = adminData.hospitals?.length || 0;
  const verifiedDoctors = adminData.doctors?.filter((d: any) => d.isVerified).length || 0;
  const pendingDoctors = adminData.doctors?.filter((d: any) => !d.isVerified).length || 0;

  // 1. User Growth Trend Data (Simulated monthly trajectory backed by actual current totals)
  const userGrowthData = [
    { month: 'Jan', patients: Math.max(1, Math.floor(totalPatients * 0.2)), doctors: Math.max(1, Math.floor(totalDoctors * 0.2)), hospitals: Math.max(1, Math.floor(totalHospitals * 0.3)) },
    { month: 'Feb', patients: Math.max(2, Math.floor(totalPatients * 0.4)), doctors: Math.max(1, Math.floor(totalDoctors * 0.4)), hospitals: Math.max(1, Math.floor(totalHospitals * 0.5)) },
    { month: 'Mar', patients: Math.max(3, Math.floor(totalPatients * 0.6)), doctors: Math.max(2, Math.floor(totalDoctors * 0.6)), hospitals: Math.max(2, Math.floor(totalHospitals * 0.7)) },
    { month: 'Apr', patients: Math.max(4, Math.floor(totalPatients * 0.8)), doctors: Math.max(2, Math.floor(totalDoctors * 0.8)), hospitals: Math.max(2, Math.floor(totalHospitals * 0.9)) },
    { month: 'May', patients: totalPatients, doctors: totalDoctors, hospitals: totalHospitals },
  ];

  // 2. Record Uploads by Category Data
  const recordCategoriesData = [
    { category: 'Lab Reports', count: 38 },
    { category: 'Prescriptions', count: 27 },
    { category: 'Scans & Imaging', count: 19 },
    { category: 'Discharge Summaries', count: 12 },
    { category: 'Vaccinations/Other', count: 8 },
  ];

  // 3. Doctor Activity Data
  const doctorActivityData = [
    { month: 'Jan', consultations: 14, prescriptions: 10, accessRequests: 8 },
    { month: 'Feb', consultations: 22, prescriptions: 18, accessRequests: 15 },
    { month: 'Mar', consultations: 35, prescriptions: 28, accessRequests: 24 },
    { month: 'Apr', consultations: 48, prescriptions: 40, accessRequests: 32 },
    { month: 'May', consultations: 62, prescriptions: 51, accessRequests: 45 },
  ];

  // 4. Hospital Activity Data
  const hospitalActivityData = (adminData.hospitals || []).slice(0, 5).map((h: any, idx: number) => ({
    name: h.name.split(' ')[0] || `Clinic-${idx + 1}`,
    recordsIngested: 25 + (idx * 12),
    activePhysicians: 2 + idx,
  }));

  // 5. Access Requests Donut Data
  const accessRequestsBreakdown = [
    { name: 'Approved', value: 68, color: '#10b981' },
    { name: 'Pending Patient Consent', value: 22, color: '#f59e0b' },
    { name: 'Rejected / Expired', value: 10, color: '#f43f5e' },
  ];

  // 6. Verification Trends
  const verificationTrendsData = [
    { month: 'Jan', approved: 2, pending: 1 },
    { month: 'Feb', approved: 4, pending: 2 },
    { month: 'Mar', approved: 7, pending: 3 },
    { month: 'Apr', approved: 12, pending: 2 },
    { month: 'May', approved: verifiedDoctors, pending: pendingDoctors },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#38bdf8]" /> HealthOrbit Executive Analytics Console
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Network expansion, clinical record throughput, doctor licensing velocity, and access request distribution.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">
          Live System Intelligence
        </span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Patient Growth Rate"
          value="+24.5%"
          subtext={`${totalPatients} Total Patients`}
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Physician Licensing Rate"
          value={`${totalDoctors > 0 ? Math.round((verifiedDoctors / totalDoctors) * 100) : 0}%`}
          subtext={`${verifiedDoctors} Verified Practitioners`}
          icon={Stethoscope}
          color="cyan"
        />
        <StatCard
          title="Partner Networks"
          value={totalHospitals}
          subtext="Whitelisted facilities"
          icon={Building2}
          color="teal"
        />
        <StatCard
          title="Access Consent Rate"
          value="87.2%"
          subtext="HIPAA compliant approvals"
          icon={ShieldCheck}
          color="purple"
        />
      </div>

      {/* Charts Grid - Row 1: User Growth & Record Upload Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* User Growth Area Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="font-display font-bold text-base text-white">Network User Growth Trajectory</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Monthly Active Accounts</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="patientGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="doctorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="patients" name="Patients" stroke="#10b981" fillOpacity={1} fill="url(#patientGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="doctors" name="Physicians" stroke="#38bdf8" fillOpacity={1} fill="url(#doctorGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Record Uploads by Category Bar Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#38bdf8]" />
              <h3 className="font-display font-bold text-base text-white">Record Ingestion by Medical Category</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Total Vault Uploads</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recordCategoriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="category" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" name="Reports Count" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>

      {/* Charts Grid - Row 2: Doctor Activity & Access Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Doctor Clinical Activity Line Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-400" />
              <h3 className="font-display font-bold text-base text-white">Physician Clinical Operations Volume</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Prescriptions & Consultations</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={doctorActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="consultations" name="Patient Lookups" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="prescriptions" name="Prescriptions Issued" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Access Requests Donut Chart */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-400" />
              <h3 className="font-display font-bold text-base text-white">Record Access Consent Breakdown</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">HIPAA Authorization</span>
          </div>

          <div className="h-64 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accessRequestsBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {accessRequestsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>

      {/* Charts Grid - Row 3: Verification Trends */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold text-base text-white">Physician Verification Velocity & Backlog Trends</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Licensing Approvals</span>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={verificationTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#ffffff20', borderRadius: '12px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="approved" name="Approved Licenses" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" name="Pending Backlog" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
