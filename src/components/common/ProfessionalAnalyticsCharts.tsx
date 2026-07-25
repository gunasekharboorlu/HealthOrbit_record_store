import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { Activity, Heart, ShieldCheck, Lock, TrendingUp, Users, Stethoscope, FileText } from 'lucide-react';
import { GlassCard } from '../ui';

// Sample telemetry & clinical stats data
const vitalSignsData = [
  { month: 'Jan', bpSystolic: 122, bpDiastolic: 80, heartRate: 72, glucose: 95 },
  { month: 'Feb', bpSystolic: 120, bpDiastolic: 78, heartRate: 70, glucose: 92 },
  { month: 'Mar', bpSystolic: 125, bpDiastolic: 82, heartRate: 75, glucose: 98 },
  { month: 'Apr', bpSystolic: 118, bpDiastolic: 76, heartRate: 68, glucose: 90 },
  { month: 'May', bpSystolic: 121, bpDiastolic: 79, heartRate: 71, glucose: 94 },
  { month: 'Jun', bpSystolic: 119, bpDiastolic: 77, heartRate: 69, glucose: 91 },
  { month: 'Jul', bpSystolic: 120, bpDiastolic: 78, heartRate: 70, glucose: 93 },
];

const recordsDistributionData = [
  { name: 'Lab Reports', value: 42, color: '#38bdf8' },
  { name: 'Prescriptions', value: 28, color: '#10b981' },
  { name: 'Scans & Imaging', value: 18, color: '#c084fc' },
  { name: 'Discharge Summaries', value: 12, color: '#f59e0b' },
];

const doctorActivityData = [
  { day: 'Mon', consultations: 14, prescriptions: 10, clearancesApproved: 8 },
  { day: 'Tue', consultations: 18, prescriptions: 14, clearancesApproved: 12 },
  { day: 'Wed', consultations: 16, prescriptions: 12, clearancesApproved: 9 },
  { day: 'Thu', consultations: 22, prescriptions: 19, clearancesApproved: 15 },
  { day: 'Fri', consultations: 20, prescriptions: 16, clearancesApproved: 14 },
  { day: 'Sat', consultations: 8, prescriptions: 5, clearancesApproved: 4 },
  { day: 'Sun', consultations: 4, prescriptions: 2, clearancesApproved: 2 },
];

interface ProfessionalAnalyticsChartsProps {
  role?: 'patient' | 'doctor' | 'admin';
}

export default function ProfessionalAnalyticsCharts({ role = 'patient' }: ProfessionalAnalyticsChartsProps) {
  const [activeMetric, setActiveMetric] = useState<'vitals' | 'distribution' | 'activity'>('vitals');

  return (
    <div className="space-y-6">
      
      {/* Top Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-2xl border border-white/5">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#38bdf8]" />
          <span className="text-xs font-bold font-mono text-white uppercase">Clinical Analytics Engine</span>
        </div>

        <div className="flex rounded-xl bg-slate-900 p-1 border border-white/5">
          <button
            onClick={() => setActiveMetric('vitals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeMetric === 'vitals' ? 'bg-[#38bdf8] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Vital Signs Trend
          </button>
          <button
            onClick={() => setActiveMetric('distribution')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeMetric === 'distribution' ? 'bg-[#38bdf8] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ledger Distribution
          </button>
          {role !== 'patient' && (
            <button
              onClick={() => setActiveMetric('activity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeMetric === 'activity' ? 'bg-[#38bdf8] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Clinical Workflow
            </button>
          )}
        </div>
      </div>

      {/* Chart Views */}
      <GlassCard className="p-6 md:p-8">
        {activeMetric === 'vitals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" /> Patient Vital Signs & Biomarker Telemetry
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Blood Pressure (mmHg), Resting Heart Rate (BPM) & Fasting Glucose (mg/dL)</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                ● Normal Range Verified
              </span>
            </div>

            <div className="h-[340px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vitalSignsData}>
                  <defs>
                    <linearGradient id="bpColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="hrColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} 
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#cbd5e1' }} />
                  <Area type="monotone" dataKey="bpSystolic" name="Systolic BP (mmHg)" stroke="#38bdf8" fillOpacity={1} fill="url(#bpColor)" />
                  <Area type="monotone" dataKey="heartRate" name="Heart Rate (BPM)" stroke="#f43f5e" fillOpacity={1} fill="url(#hrColor)" />
                  <Line type="monotone" dataKey="glucose" name="Glucose (mg/dL)" stroke="#10b981" strokeWidth={2} dot={true} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeMetric === 'distribution' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#38bdf8]" /> Medical Record Category Breakdown
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Composition of clinical reports in patient encrypted store.</p>
              </div>
            </div>

            <div className="h-[340px] w-full flex flex-col md:flex-row items-center justify-center gap-8 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={recordsDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {recordsDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>

              <div className="w-full md:w-72 space-y-3 font-mono text-xs bg-slate-950 p-5 rounded-2xl border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Ledger Verification Summary</span>
                <div className="flex justify-between text-slate-300">
                  <span>Total Records:</span>
                  <span className="font-bold text-white">100 Records</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>SHA-256 Verified:</span>
                  <span className="font-bold">100% (100/100)</span>
                </div>
                <div className="flex justify-between text-rose-400">
                  <span>Sensitive Locked:</span>
                  <span className="font-bold">24 Records</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMetric === 'activity' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-emerald-400" /> Weekly Clinical Workload
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Daily breakdown of consultations, prescriptions issued, and access clearances granted.</p>
              </div>
            </div>

            <div className="h-[340px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={doctorActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="consultations" name="Consultations" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="prescriptions" name="Prescriptions" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="clearancesApproved" name="Clearances Granted" fill="#c084fc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </GlassCard>

    </div>
  );
}
