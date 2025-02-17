import { BellIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { DarkMode } from "../types/GeneralTypes";
import { Notifications } from "./Notifications";

export const DashboardHeader: React.FC<DarkMode> = ({ isDarkMode }) => {
  const user = useAuthStore((state) => state.user);
  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : "BT";

  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div className="relative">
          <MagnifyingGlassIcon
            className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
              isDarkMode ? "text-gray-700" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search"
            className={`rounded-lg border py-2 pl-10 pr-4 focus:border-indigo-500 focus:outline-none ${
              isDarkMode
                ? "border-gray-700 bg-gray-900 text-white"
                : "border-gray-600 bg-white"
            }`}
          />
        </div>

        <div className="flex items-center gap-4 pr-8">
          <button
            className={`rounded-lg border px-3 py-1 ${
              isDarkMode ? "border-gray-700 text-white" : "border-gray-200"
            }`}
          >
            EN
          </button>
          <button
            className="relative"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <BellIcon
              className={`h-6 w-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          <div
            className={`h-8 w-8 flex items-center justify-center rounded-full font-bold ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {userInitial}
          </div>
        </div>
      </div>
      <Notifications
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
