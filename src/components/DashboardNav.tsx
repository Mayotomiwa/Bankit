import {
    BarChartIcon,
    ChatBubbleIcon,
    DashboardIcon,
    GearIcon,
    PersonIcon,
    StarIcon,
} from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { CreditCardIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { Bars } from "react-loading-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthStore } from "../store/authStore";
import { Auth } from "../types/authTypes";
import { showToast } from "../utils/showToast";

const Navigation: React.FC<Auth> = ({ isDarkMode, onLogOut }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { signOutMutation } = useAuth();

  const isActiveLink = (path: string) => {
    // Handle root path for dashboard
    if (path === "/dashboard" && location.pathname === "/dashboard")
      return true;
    return location.pathname === path;
  };
  const handleSignOut = async () => {
    try {
        setIsLoading(true);
      await signOutMutation.mutateAsync();
      useAuthStore.getState().setUser(null); // Reset user in Zustand
      showToast.success("Sign out successful");
      if (onLogOut) {
        onLogOut();
      }
      navigate("/auth", { replace: true }); // Ensure navigation
    } catch (error) {
      showToast.error(
        error instanceof Error ? error.message : "Sign out failed"
      );
    } finally {
        setIsLoading(false);
    }
  };

  const navLinks = [
    {
      icon: <DashboardIcon className="h-5 w-5" />,
      text: "Overview",
      path: "/dashboard",
    },
    {
      icon: <ChatBubbleIcon className="h-5 w-5" />,
      text: "Messages",
      path: "/messages",
    },
    {
      icon: <PersonIcon className="h-5 w-5" />,
      text: "Community",
      path: "/community",
    },
    {
      icon: <CreditCardIcon className="h-5 w-5" />,
      text: "Transactions",
      path: "/transactions",
    },
    {
      icon: <BarChartIcon className="h-5 w-5" />,
      text: "Statistics",
      path: "/statistics",
    },
    {
      icon: <StarIcon className="h-5 w-5" />,
      text: "Referrals",
      path: "/referrals",
    },
  ];

  const bottomLinks = [
    {
      icon: <PersonIcon className="h-5 w-5" />,
      text: "Account",
      path: "/account",
    },
    {
      icon: <GearIcon className="h-5 w-5" />,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 p-6 shadow-sm ${
        isDarkMode ? "dark" : ""
      }`}
    >
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
              <p className="text-gray-900 font-medium">Logging you out...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mb-8 flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
        <span className="text-lg font-semibold text-blue-600">Bankit</span>
      </div>

      <nav className="space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.text}
            to={link.path}
            className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
              isActiveLink(link.path)
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
                : `text-gray-600 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-indigo-300`
            }`}
          >
            <span
              className={`${
                isActiveLink(link.path)
                  ? "text-indigo-600 dark:text-indigo-300"
                  : ""
              }`}
            >
              {link.icon}
            </span>
            <span className={isActiveLink(link.path) ? "font-medium" : ""}>
              {link.text}
            </span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 space-y-4">
        {bottomLinks.map((link) => (
          <Link
            key={link.text}
            to={link.path}
            className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
              isActiveLink(link.path)
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-300"
                : `text-gray-600 hover:bg-gray-50 hover:text-indigo-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-indigo-300`
            }`}
          >
            <span
              className={`${
                isActiveLink(link.path)
                  ? "text-indigo-600 dark:text-indigo-300"
                  : ""
              }`}
            >
              {link.icon}
            </span>
            <span className={isActiveLink(link.path) ? "font-medium" : ""}>
              {link.text}
            </span>
          </Link>
        ))}
      </div>
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 rounded-lg p-3 text-red-600 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <span className="shrink-0">
          <LogOutIcon className="h-5 w-5" />
        </span>
        <span className="whitespace-nowrap font-medium">Sign Out</span>
      </button>
    </div>
  );
};

export default Navigation;
