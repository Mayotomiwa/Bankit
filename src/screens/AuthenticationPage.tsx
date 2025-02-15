// AuthPage.tsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Bars } from "react-loading-icons";
import "react-toastify/dist/ReactToastify.css";
import { CardView } from "../components/AuthCard";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { Auth } from "../types/authTypes";

interface AuthPageProps extends Auth {
  onFormSwitch: (isRegister: boolean) => void;
  onLoginSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  isDarkMode,
  onFormSwitch,
  onLoginSuccess,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSwitch = (toRegister: boolean) => {
    setIsLogin(!toRegister);
    onFormSwitch(toRegister);
  };

  const handleLoginSuccess = async () => {
    setIsLoading(true);
    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onLoginSuccess();
  };

  const transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 0.4,
  };

  const fadeTransition = {
    duration: 0.3,
  };

  const formVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: fadeTransition },
    exit: { x: isLogin ? "-100%" : "100%", opacity: 0, transition },
  };

  const cardVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: fadeTransition },
    exit: { x: isLogin ? "100%" : "-100%", opacity: 0, transition },
  };

  return (
    <motion.div
      className="h-screen flex overflow-hidden"
      animate={{
        backgroundColor: isDarkMode ? "#1A202C" : "#FFFFFF",
        color: isDarkMode ? "#FFFFFF" : "#1A202C",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
              <Bars width={32} height={32} strokeWidth={"100%"} stroke="#2563EB" fill='#2563EB' />
              <p className="text-gray-900 font-medium">Logging you in...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Form Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login-form" : "register-form"}
            className={`w-full md:w-1/2 h-full flex items-center justify-center p-12 transition-colors ${
              isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            } ${isLogin ? "order-2" : "order-1"}`}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="w-full max-w-md">
              {isLogin ? (
                <LoginForm
                  isDarkMode={isDarkMode}
                  onSwitchToRegister={() => handleFormSwitch(true)}
                  onLoginSuccess={handleLoginSuccess}
                />
              ) : (
                <RegisterForm
                  isDarkMode={isDarkMode}
                  onSwitchToLogin={() => handleFormSwitch(false)}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CardView - Hidden on small screens */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login-card" : "register-card"}
            className={`hidden md:flex w-1/2 h-full ${
              isLogin ? "order-1" : "order-2"
            }`}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CardView />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AuthPage;
