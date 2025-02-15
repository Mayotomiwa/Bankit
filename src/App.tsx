import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthPage from './screens/AuthenticationPage';
import Dashboard from './screens/Dashboard';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark' : 'light'}>
        {/* Theme toggle button */}
        <AnimatePresence>
          {!isAuthenticated && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleTheme}
              className={`absolute top-4 right-4 p-2 rounded-full z-50 shadow-lg transition-colors
                ${
                  isRegisterForm 
                    ? 'bg-blue-800 text-white'
                    : isDarkMode 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-white text-gray-900'
                }`}
            >
              {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </motion.button>
          )}
        </AnimatePresence>

        <Routes>
          <Route 
            path="/auth" 
            element={
              !isAuthenticated ? (
                <AuthPage 
                  isDarkMode={isDarkMode} 
                  onLoginSuccess={handleLoginSuccess} 
                  onFormSwitch={setIsRegisterForm}
                />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Dashboard isDarkMode={isDarkMode} />
                </motion.div>
              ) : (
                <Navigate to="/auth" replace />
              )
            } 
          />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;