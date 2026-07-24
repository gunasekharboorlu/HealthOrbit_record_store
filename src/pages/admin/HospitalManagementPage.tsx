import React, { useState, useMemo } from 'react';
import { 
  Building2, Plus, Search, Edit2, Power, MapPin, Check, 
  X, CheckCircle2, AlertCircle, Building, Users, Stethoscope
} from 'lucide-react';
import { GlassCard, Badge, Modal, EmptyState, PrimaryButton, SecondaryButton } from '../../components/ui';

interface HospitalManagementPageProps {
  hospitals: any[];
  doctors?: any[];
  newHospitalName: string;
  setNewHospitalName: (val: string) => void;
  newHospitalAddress: string;
  setNewHospitalAddress: (val: string) => void;
  handleAddHospital: (e: React.FormEvent) => void;
}

export default function HospitalManagementPage({
  hospitals = [],
  doctors = [],
  newHospitalName,
  setNewHospitalName,
  newHospitalAddress,
  setNewHospitalAddress,
  handleAddHospital,
}: HospitalManagementPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'deactivated'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Local state for editing hospital & status toggling
  const [editingHospital, setEditingHospital] = useState<any | null>(null);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [deactivatedIds, setDeactivatedIds] = useState<string[]>([]);

  // Filtered Hospitals
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const isDeactivated = deactivatedIds.includes(h.id);
      if (statusFilter === 'active' && isDeactivated) return false;
      if (statusFilter === 'deactivated' && !isDeactivated) return false;

      const q = searchQuery.toLowerCase();
      if (q) {
        const matchesName = h.name.toLowerCase().includes(q);
        const matchesAddress = (h.address || '').toLowerCase().includes(q);
        const matchesId = h.id.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress && !matchesId) return false;
      }
      return true;
    });
  }, [hospitals, searchQuery, statusFilter, deactivatedIds]);

  const handleStartEdit = (h: any) => {
    setEditingHospital(h);
    setEditName(h.name);
    setEditAddress(h.address);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHospital) return;
    // Update local object
    editingHospital.name = editName;
    editingHospital.address = editAddress;
    setEditingHospital(null);
  };

  const handleToggleDeactivate = (id: string) => {
    if (deactivatedIds.includes(id)) {
      setDeactivatedIds(deactivatedIds.filter((i) => i !== id));
    } else {
      setDeactivatedIds([...deactivatedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-400" /> Whitelisted Hospital Network Registry
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage partner healthcare facilities, regional clinic networks, and hospital authorization status.
          </p>
        </div>

        <PrimaryButton
          icon={Plus}
          onClick={() => setIsAddModalOpen(true)}
        >
          Whitelist Partner Hospital
        </PrimaryButton>
      </div>

      {/* Toolbar: Search and Filters */}
      <GlassCard className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search hospital name, address, or ID..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-[#38bdf8]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Hospitals' },
            { id: 'active', label: 'Active Whitelist' },
            { id: 'deactivated', label: 'Deactivated' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer shrink-0 ${
                statusFilter === btn.id
                  ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/20'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Hospital Cards Grid */}
      {filteredHospitals.length === 0 ? (
        <EmptyState
          title="No Partner Hospitals Found"
          description="No hospital networks match your selected search or filter status."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((h) => {
            const isDeactivated = deactivatedIds.includes(h.id);
            const doctorsInHospital = doctors.filter(
              (d) => d.hospitalId === h.id || d.hospitalName === h.name
            );

            return (
              <GlassCard
                key={h.id}
                className={`p-6 space-y-4 transition ${
                  isDeactivated
                    ? 'border-rose-500/20 bg-rose-500/5 opacity-75'
                    : 'border-white/10 hover:border-teal-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-bold text-white text-base truncate">{h.name}</h3>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">ID: {h.id}</span>
                    </div>
                  </div>

                  {isDeactivated ? (
                    <Badge variant="rose">Deactivated</Badge>
                  ) : (
                    <Badge variant="teal">Whitelisted</Badge>
                  )}
                </div>

                <p className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed min-h-[36px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{h.address || 'Location Address Unspecified'}</span>
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                    <strong className="text-white">{doctorsInHospital.length}</strong> Affiliated Doctors
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleStartEdit(h)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition cursor-pointer"
                      title="Edit Hospital Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleDeactivate(h.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        isDeactivated
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20'
                      }`}
                      title={isDeactivated ? "Reactivate Hospital" : "Deactivate Hospital"}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Modal: Add Hospital */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register Partner Healthcare Facility"
        >
          <form
            onSubmit={(e) => {
              handleAddHospital(e);
              setIsAddModalOpen(false);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">
                Hospital / Clinic Name
              </label>
              <input
                type="text"
                required
                value={newHospitalName}
                onChange={(e) => setNewHospitalName(e.target.value)}
                placeholder="e.g. St. Jude Regional Medical Center"
                className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">
                Physical Location Address
              </label>
              <input
                type="text"
                required
                value={newHospitalAddress}
                onChange={(e) => setNewHospitalAddress(e.target.value)}
                placeholder="e.g. 500 Medical Center Blvd, Suite A"
                className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setIsAddModalOpen(false)}>Cancel</SecondaryButton>
              <PrimaryButton type="submit">Whitelist Facility</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Edit Hospital */}
      {editingHospital && (
        <Modal
          isOpen={!!editingHospital}
          onClose={() => setEditingHospital(null)}
          title={`Edit Hospital Entry (${editingHospital.id})`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">
                Hospital Name
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase font-mono mb-1">
                Physical Address
              </label>
              <input
                type="text"
                required
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl premium-input text-xs text-white outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setEditingHospital(null)}>Cancel</SecondaryButton>
              <PrimaryButton type="submit">Save Changes</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
