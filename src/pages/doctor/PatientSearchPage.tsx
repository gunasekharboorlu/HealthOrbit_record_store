import React, { useState } from 'react';
import { 
  Search, Users, RefreshCw, UserCheck, Heart, Star, 
  Clock, ArrowRight, Filter, Phone, Calendar, User, Activity, Check
} from 'lucide-react';
import { 
  GlassCard, SearchBar, FilterBar, EmptyState, 
  PrimaryButton, SecondaryButton, Badge, Pagination 
} from '../../components/ui';
import Avatar from '../../components/Avatar';

interface PatientSearchPageProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  searchResults: any[];
  searchLoading: boolean;
  allPatients: any[];
  handleGeneralSearch: (e: React.FormEvent) => void;
  handleInspectPatient: (patientId: string) => void;
  pinnedPatients: string[];
  togglePinPatient: (patientId: string) => void;
}

export default function PatientSearchPage({
  searchQuery,
  setSearchQuery,
  searchResults,
  searchLoading,
  allPatients = [],
  handleGeneralSearch,
  handleInspectPatient,
  pinnedPatients = [],
  togglePinPatient,
}: PatientSearchPageProps) {
  const [filterGender, setFilterGender] = useState('All');
  const [filterBlood, setFilterBlood] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Combine search results or directory patients
  const displayList = searchResults.length > 0 ? searchResults : allPatients;

  // Filter directory
  const filteredList = displayList.filter(p => {
    const matchesGender = filterGender === 'All' || (p.gender || '').toLowerCase() === filterGender.toLowerCase();
    const matchesBlood = filterBlood === 'All' || (p.bloodGroup || '').toLowerCase().includes(filterBlood.toLowerCase());
    const matchesQuery = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.phone || '').includes(searchQuery);
    return matchesGender && matchesBlood && matchesQuery;
  });

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const quickSearchTags = ['PAT-100001', 'John Doe', 'Male', 'Blood O+', 'Emergency Vitals'];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Search Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-[#1D1D1F]">Universal Patient Search & Directory</h1>
        <p className="text-xs text-[#6E6E73] mt-1">
          Search the entire health network registry by Patient ID, Name, or Mobile number to inspect clinical histories and issue prescriptions.
        </p>
      </div>

      {/* Main Search Input Form */}
      <GlassCard className="p-6 space-y-4">
        <form onSubmit={handleGeneralSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Enter Patient ID (e.g. PAT-100001), Full Name, or Mobile..."
              onClear={() => setSearchQuery('')}
            />
          </div>
          <PrimaryButton
            type="submit"
            isLoading={searchLoading}
            icon={<Search className="w-4 h-4" />}
            className="sm:w-auto w-full"
          >
            Search Registry
          </PrimaryButton>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[10px] font-mono font-bold text-[#6E6E73] uppercase shrink-0">Quick Search:</span>
          {quickSearchTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchQuery(tag);
              }}
              className="px-2.5 py-1 bg-[#F5F5F7] hover:bg-[#E5E5E7] border border-[#E5E5E7] rounded-lg text-[10px] font-mono text-[#1D1D1F] transition shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#F5F5F7] p-4 border border-[#E5E5E7] rounded-2xl">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#0071E3]" />
          <span className="text-xs font-bold text-[#1D1D1F] font-mono uppercase">Directory Filters:</span>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <select
            value={filterGender}
            onChange={e => setFilterGender(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#D2D2D7] rounded-xl text-xs text-[#1D1D1F] outline-none cursor-pointer focus:border-[#0071E3]"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={filterBlood}
            onChange={e => setFilterBlood(e.target.value)}
            className="px-3 py-1.5 bg-white border border-[#D2D2D7] rounded-xl text-xs text-[#1D1D1F] outline-none cursor-pointer focus:border-[#0071E3]"
          >
            <option value="All">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          {(filterGender !== 'All' || filterBlood !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setFilterGender('All');
                setFilterBlood('All');
                setSearchQuery('');
              }}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Patient Cards Grid */}
      {paginatedList.length === 0 ? (
        <EmptyState
          title="No Patients Found"
          description="No registered patient records matched your search query or filter criteria."
          actionText="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setFilterGender('All');
            setFilterBlood('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedList.map((p: any) => {
            const isPinned = pinnedPatients.includes(p.patientId);

            return (
              <GlassCard
                key={p.patientId}
                className="p-5 space-y-4 hover:border-[#0071E3]/40 transition group relative"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={p.name} size="md" />
                    <div>
                      <h3 className="font-bold text-sm text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">{p.name}</h3>
                      <span className="text-[10px] font-mono font-bold text-[#0071E3] bg-[#0071E3]/10 px-2 py-0.5 rounded">
                        {p.patientId}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePinPatient(p.patientId)}
                    title={isPinned ? 'Unpin Patient' : 'Pin Patient'}
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      isPinned 
                        ? 'bg-amber-50 text-amber-700 border-amber-300' 
                        : 'bg-[#F5F5F7] text-[#6E6E73] border-[#E5E5E7] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${isPinned ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#1D1D1F] font-mono bg-[#F5F5F7] p-3 rounded-xl border border-[#E5E5E7]">
                  <div>
                    <span className="text-[#6E6E73] block text-[9px]">GENDER / AGE</span>
                    <span className="font-semibold text-[#1D1D1F]">{p.gender || 'N/A'} • {p.age || '32'} yrs</span>
                  </div>
                  <div>
                    <span className="text-[#6E6E73] block text-[9px]">BLOOD GROUP</span>
                    <span className="font-semibold text-rose-600">{p.bloodGroup || 'N/A'}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-[#E5E5E7] flex items-center justify-between">
                    <span className="text-[#6E6E73] text-[9px] flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#6E6E73]" /> {p.phone || 'N/A'}
                    </span>
                    <span className="text-[#6E6E73] text-[10px]">{p.lastVisit || 'Recent Visit'}</span>
                  </div>
                </div>

                <PrimaryButton
                  onClick={() => handleInspectPatient(p.patientId)}
                  icon={<UserCheck className="w-4 h-4" />}
                  className="w-full"
                >
                  Inspect Patient Workspace
                </PrimaryButton>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

    </div>
  );
}
