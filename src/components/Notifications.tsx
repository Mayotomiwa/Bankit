import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from "lucide-react";
import React from 'react';
import { NotificationsProps } from '../types/GeneralTypes';

export const Notifications: React.FC<NotificationsProps> = ({
  isOpen,
  onClose,
  isDarkMode
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className={`fixed top-0 right-0 w-96 h-full shadow-lg p-6 z-50 ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Notifications
              </h2>
              <button 
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <XIcon className={`h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
              </button>
            </div>

            {/* Example Notifications */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  You received a payment of <strong>$200</strong>.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  Your salary has been processed.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-800'
                }`}>
                  You have an upcoming payment due tomorrow.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};