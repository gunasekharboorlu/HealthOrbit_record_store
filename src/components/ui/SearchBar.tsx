import React from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = React.memo(function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}: SearchBarProps) {
  return (
    <div className={`relative flex-1 ${className}`}>
      <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#86868B]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] text-xs font-normal text-[#1D1D1F] placeholder-[#86868B] focus:outline-none focus:border-[#0071E3] focus:bg-white focus:ring-2 focus:ring-[#0071E3]/15 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-2.5 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});

interface FilterBarProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  className?: string;
}

export const FilterBar = React.memo(function FilterBar({
  options,
  selectedOption,
  onSelect,
  className = '',
}: FilterBarProps) {
  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none ${className}`}>
      <Filter className="w-3.5 h-3.5 text-[#86868B] shrink-0 mr-1" />
      {options.map((option) => {
        const isSelected = selectedOption === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              isSelected
                ? 'bg-[#1D1D1F] text-white shadow-xs'
                : 'bg-[#F5F5F7] border border-[#E5E5E7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E8E8ED]'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
});
