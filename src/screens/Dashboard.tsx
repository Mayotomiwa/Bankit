import {
  DotsHorizontalIcon,
  GearIcon,
  PersonIcon
} from "@radix-ui/react-icons";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardCard from "../components/DashboardCard";
import { DashboardHeader } from "../components/DashboardHeader";
import Navigation from "../components/DashboardNav";
import { spendingData, transactionData } from "../data/transactions.json";
import { Auth } from "../types/authTypes";

const Dashboard: React.FC<Auth> = ({ isDarkMode, onLogOut }) => {
  return (
    <div
      className={`$...
      } min-h-screen`}
    >
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 p-6 shadow-sm ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Navigation isDarkMode={isDarkMode} onLogOut={onLogOut} />

        <div className="absolute bottom-6 left-6 space-y-4">
          <div
            className={`flex items-center gap-3 p-3 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <PersonIcon className="h-5 w-5" />
            <span>Account</span>
          </div>

          <div
            className={`flex items-center gap-3 p-3 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <GearIcon className="h-5 w-5" />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <DashboardHeader isDarkMode={isDarkMode} />

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8">
            <h2
              className={`mb-6 text-xl font-semibold ${
                isDarkMode ? "text-indigo-300" : "text-indigo-900"
              }`}
            >
              Dashboard
            </h2>

            {/* Card Section */}
            <DashboardCard />

            {/* Recent Transactions */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300">
                  Recent transactions
                </h3>
                <select className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1 bg-white dark:bg-gray-800 text-black dark:text-white">
                  <option>Sort by</option>
                </select>
              </div>

              <div className="space-y-4">
                {transactionData.map((transaction) => (
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

          {/* Right Column */}
          <div className="col-span-4">
            <div
              className={`mb-6 rounded-lg p-6 shadow-sm ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-indigo-300" : "text-indigo-900"
                  }`}
                >
                  Spent this day
                </h3>
              </div>
              <div
                className={`mb-4 text-3xl font-semibold ${
                  isDarkMode ? "text-indigo-300" : "text-indigo-900"
                }`}
              >
                $259.75
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingData}>
                    <XAxis
                      dataKey="day"
                      stroke={isDarkMode ? "#ffffff" : "#000000"}
                    />
                    <YAxis hide />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke={isDarkMode ? "#6366f1" : "#312e81"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Available Cards */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300">
                  Available cards
                </h3>
                <button className="text-sm text-indigo-600 dark:text-indigo-400">
                  View all
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-indigo-900 dark:text-indigo-300">
                        98,500
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        USD
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ...4141
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-indigo-900 dark:text-indigo-300">
                        76,280
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        EUR
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ...8345
                      </div>
                      <div className="text-sm font-medium text-indigo-900 dark:text-indigo-300">
                        VISA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
