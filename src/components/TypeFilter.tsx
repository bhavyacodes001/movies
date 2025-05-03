import React from 'react';
import { motion } from 'framer-motion';

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType, onTypeChange }) => {
  const types = ['all', 'movie', 'series'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap justify-center gap-2 py-4"
    >
      {types.map((type) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTypeChange(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedType === type
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-pressed={selectedType === type}
          aria-label={`Filter by ${type}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default React.memo(TypeFilter); 