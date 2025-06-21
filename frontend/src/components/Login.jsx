import React, { useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User, Loader } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

const Login = ({ setIsModalOpen }) => {
  const { login, signup, userLoading } = useAuthStore();

  const [isSignupMode, setIsSignupMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "demouser@gmail.com",
    password: "12345",
    fullName: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    {
      isSignupMode
        ? await signup(formData.fullName,formData.email, formData.password)
        : await login(formData.email, formData.password);
    }
    setIsModalOpen(false);
  };

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSignupMode(false);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm">
      <div className="inline-block align-middle bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all duration-300 sm:my-8 sm:w-full sm:max-w-md relative mx-auto">
        <div className="absolute top-4 right-4">
          <button
            onClick={closeModal}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="px-10 pt-6 pb-8 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignupMode ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {isSignupMode
                ? "Join Dresser and start your fashion journey"
                : "Sign in to your Dresser account"}
            </p>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            {isSignupMode && (
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={isSignupMode}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 outline-indigo-500 rounded-lg transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 outline-indigo-500 rounded-lg transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 outline-indigo-500 rounded-lg transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
            >
              {userLoading ? <Loader className="animate-spin"/> : (isSignupMode ? "Create Account" : "Sign In")}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {isSignupMode
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  {isSignupMode ? "Sign in" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
