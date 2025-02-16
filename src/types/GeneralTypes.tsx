import { ReactNode } from "react";

export interface DarkMode{
    isDarkMode: boolean;
}
export interface Routes{
    isAuthenticated: boolean;
    children: ReactNode;
}
export interface NotificationsProps extends DarkMode {
  isOpen: boolean;
  onClose: () => void;
}