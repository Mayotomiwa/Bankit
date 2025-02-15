import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Bars } from "react-loading-icons";
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schemas/authSchema";
import { Auth, LoginFormValues } from "../types/authTypes";
import { showToast } from "../utils/showToast";

export const LoginForm: React.FC<Auth> = ({
  isDarkMode,
  onSwitchToRegister,
  onLoginSuccess,
}) => {
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await loginMutation.mutateAsync(values);
        showToast.success("Login successful!");
        if (response && onLoginSuccess) {
          onLoginSuccess();
        }
      } catch (error) {
        showToast.error(
          error instanceof Error ? error.message : "Login failed"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className={`max-w-md w-full ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6">Log In</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Email Address</label>
          <input
            type="email"
            id="email"
            {...formik.getFieldProps("email")}
            className={`w-full px-3 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-200"
            } border ${
              formik.errors.email && formik.touched.email
                ? "border-red-500"
                : ""
            }`}
            placeholder="Random@gmail.com"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...formik.getFieldProps("password")}
              className={`w-full px-3 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-200"
              } border ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              {...formik.getFieldProps("rememberMe")}
              className="rounded border-gray-300"
            />
            <span className="ml-2 text-sm">Remember me</span>
          </label>
          <a href="#" className="text-blue-500 text-sm">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Bars className="w-5 h-5" /> : "Login"}
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};
