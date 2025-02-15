import { DarkMode } from "./GeneralTypes";

export interface Auth extends DarkMode{
    onSwitchToRegister?: () => void;
    onSwitchToLogin?: () => void;
    onLoginSuccess?: () => void;
    onFormSwitch?: (isRegister: boolean) => void;
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