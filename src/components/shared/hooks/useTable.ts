import { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

interface UseTableProps {
  fetchData: (page: number, search?: string) => Promise<any>;
  queryKey: string;
}

export function useTable({ fetchData, queryKey }: UseTableProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return {
    page,
    setPage,
    search,
    setSearch,
    debouncedSearch,
  };
}