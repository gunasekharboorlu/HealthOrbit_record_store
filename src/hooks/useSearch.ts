import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch<T>(
  items: T[],
  searchFilter: (item: T, query: string) => boolean,
  debounceMs: number = 200
) {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(query, debounceMs);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    return items.filter((item) => searchFilter(item, debouncedQuery));
  }, [items, debouncedQuery, searchFilter]);

  const clearQuery = useCallback(() => setQuery(''), []);

  return {
    query,
    setQuery,
    debouncedQuery,
    filteredItems,
    clearQuery,
  };
}
