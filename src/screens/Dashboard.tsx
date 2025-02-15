import { DarkMode } from "../types/GeneralTypes";

export default function Dashboard({isDarkMode}: DarkMode) {
  return <div className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>DashBoard</div>;
}
