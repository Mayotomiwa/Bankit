import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Bars } from "react-loading-icons";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../schemas/authSchema";
import { Auth, RegisterFormValues } from "../types/authTypes";
import { showToast } from "../utils/showToast";

export const RegisterForm: React.FC<Auth> = ({
  isDarkMode,
  onSwitchToLogin,
  onLoginSuccess
}) => {
  const { registerMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await registerMutation.mutateAsync(values);
        showToast.success("Registration successful!");
        if (response && onLoginSuccess) {
            onLoginSuccess();
          }
      } catch (error) {
        showToast.error(
          error instanceof Error ? error.message : "Registration failed"
        );
      } finally{
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
      <h2 className="text-2xl font-semibold mb-6">Create Account</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...formik.getFieldProps("fullName")}
            className={`w-full px-3 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-200"
            } border ${
              formik.errors.fullName && formik.touched.fullName
                ? "border-red-500"
                : ""
            }`}
            placeholder="John Doe"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.fullName}
            </div>
          )}
        </div>

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
              placeholder="Create a strong password"
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

        <div>
          <label className="block mb-2 text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
              className={`w-full px-3 py-2 rounded-lg ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-200"
              } border ${
                formik.errors.confirmPassword && formik.touched.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...formik.getFieldProps("agreeToTerms")}
              className="rounded border-gray-300"
            />
            <span className="ml-2 text-sm">
              I agree to the Terms & Conditions
            </span>
          </label>
          {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.agreeToTerms}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Bars className="w-5 h-5" /> : "Create Account"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:text-blue-600"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};
