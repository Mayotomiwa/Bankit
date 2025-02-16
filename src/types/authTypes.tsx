import { DarkMode } from "./GeneralTypes";

export interface Auth extends DarkMode{
    onSwitchToRegister?: () => void;
    onSwitchToLogin?: () => void;
    onLoginSuccess?: () => void;
    onFormSwitch?: (isRegister: boolean) => void;
    onLogOut?: () => void;
}
export interface AuthPageProps extends Auth {
    onFormSwitch: (isRegister: boolean) => void;
    onLoginSuccess: () => void;
  }
export interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface RegisterFormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }