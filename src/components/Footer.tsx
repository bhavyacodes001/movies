import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 py-6 mt-12"
    >
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 MovieSearch. Created by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Bhavya code</span></p>
        </div>
      </div>
    </motion.footer>
  );
};

export default React.memo(Footer); 