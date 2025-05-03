import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search movies...',
  debounceTime = 500
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce utility function
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, debounceTime),
    [onSearch, debounceTime, debounce]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      if (typeof debouncedSearch === 'function' && 'cancel' in debouncedSearch) {
        (debouncedSearch as any).cancel();
      }
    };
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`relative flex items-center px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
          isFocused
            ? 'border-indigo-500 bg-white dark:bg-gray-800 shadow-lg'
            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
        }`}
      >
        <MagnifyingGlassIcon
          className={`h-5 w-5 transition-colors duration-200 ${
            isFocused
              ? 'text-indigo-500'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full ml-3 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Clear search"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default React.memo(SearchBar); 