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
      <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] focus:bg-white/10 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
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
      <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
      {options.map((option) => {
        const isSelected = selectedOption === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              isSelected
                ? 'bg-[#38bdf8] text-slate-950 shadow-md shadow-[#38bdf8]/20'
                : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
});
