import { BarChartIcon, CreditCardIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function DashboardCard() {
  const user = useAuthStore((state) => state.user);
  const [isCardHidden, setIsCardHidden] = useState(true);

  const maskedCardNumber = "**** **** **** 4141";
  const cardNumber = "2984 5633 7859 4141";

  return (
    <div className="mb-6 flex gap-4 items-stretch">
      {/* Card */}
      <div className="relative w-1/2 h-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-800 p-6 text-white">
        <div className="mb-6 flex justify-between">
          <div className="h-8 w-12 rounded bg-gray-200/20"></div>
          <div className="flex items-center gap-2">
            <span className="text-sm">contactless</span>
            <div className="h-6 w-8 rounded bg-gray-200/20"></div>
          </div>
        </div>
        
        {/* Card Details */}
        <div className="mb-4 text-xl tracking-wider">
          {isCardHidden ? maskedCardNumber : cardNumber}
        </div> 
        <div className="text-sm">{user?.displayName || "Name"}</div>

        {/* Toggle Button */}
        <button
          className="absolute bottom-10 right-4 text-white hover:text-gray-300 transition"
          onClick={() => setIsCardHidden(!isCardHidden)}
        >
          {isCardHidden ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Upcoming Payments */}
      <div className="w-1/4 h-48 rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <CreditCardIcon className="h-6 w-6 text-indigo-900" />
        </div>
        <h3 className="mb-1 font-medium text-indigo-900">Freelance</h3>
        <p className="mb-2 text-sm text-gray-500">Unregular payment</p>
        <p className="text-lg font-semibold text-indigo-900">$1,500</p>
      </div>

      <div className="w-1/4 h-48 rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <BarChartIcon className="h-6 w-6 text-indigo-900" />
        </div>
        <h3 className="mb-1 font-medium text-indigo-900">Salary</h3>
        <p className="mb-2 text-sm text-gray-500">Regular payment</p>
        <p className="text-lg font-semibold text-indigo-900">$4,000</p>
      </div>
    </div>
  );
}
