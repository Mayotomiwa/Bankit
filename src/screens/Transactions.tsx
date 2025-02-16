import {
    DotsHorizontalIcon,
    GearIcon,
    PersonIcon
} from "@radix-ui/react-icons";
import { DashboardHeader } from "../components/DashBoardHeader";
import Navigation from "../components/DashboardNav";
import { allTransactions } from "../data/transactions.json";
import { DarkMode } from "../types/GeneralTypes";

const Transactions: React.FC<DarkMode> = ({ isDarkMode }) => {

  return (
    <div className={`min-h-screen`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 p-6 shadow-sm ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <Navigation isDarkMode={isDarkMode}/>

        <div className="absolute bottom-6 left-6 space-y-4">
          <div className={`flex items-center gap-3 p-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            <PersonIcon className="h-5 w-5" />
            <span>Account</span>
          </div>

          <div className={`flex items-center gap-3 p-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            <GearIcon className="h-5 w-5" />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <DashboardHeader isDarkMode={isDarkMode}/>

        {/* Transactions Section */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300">
            Recent transactions
          </h3>
          <div className="space-y-4 mt-4">
            {allTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{transaction.icon}</span>
                  <div>
                    <div className="font-medium text-indigo-900 dark:text-indigo-300">
                      {transaction.type}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-indigo-900 dark:text-indigo-300">
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <DotsHorizontalIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
