import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiShield } from "react-icons/fi";
import {
  TbShieldLock,
  TbMail,
  TbLock,
  TbEye,
  TbEyeOff,
  TbChevronRight,
  TbAlertTriangle,
} from "react-icons/tb";
import { motion } from "framer-motion";
import { loginAdmin } from "../../services/adminService";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
          await loginAdmin({ email, password });
          navigate("/admin/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary-500/30 rounded-full filter blur-3xl opacity-20 transform translate-y-1/4 translate-x-[-30%]"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary-400/40 rounded-full filter blur-xl opacity-30 animate-float"></div>

      {/* Glass panels */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>

      <div className="max-w-xl w-full px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-1">
            <img
              src="/lako-logo.png"
              alt="Lako Insurance Logo"
              className="w-32 h-24 object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-white via-secondary-200 to-white bg-clip-text text-transparent mb-3 font-outfit">
            Admin Portal
          </h2>
          <p className="text-white/80 font-outfit">
            Sign in to access the Lako Insurance administration dashboard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 sm:p-9 shadow-2xl"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 bg-red-500/40 border border-red-500/50 text-red-200 px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <TbAlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-white/90 mb-2 font-medium text-sm font-outfit"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <TbMail className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full h-12 pl-14 pr-4 text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
                  duration-200 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:border-0
                  font-outfit placeholder-white/50 border-white/30"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-white/90 font-medium text-sm font-outfit"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-secondary-400 hover:text-secondary-300 transition-colors font-outfit"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <TbLock className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full h-12 pl-14 pr-12 text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
                  duration-200 focus:ring-2 focus:outline-none focus:ring-secondary-400 focus:border-0
                  font-outfit placeholder-white/50 border-white/30"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <TbEyeOff className="h-5 w-5 text-white/60 hover:text-white/90 transition-colors" />
                  ) : (
                    <TbEye className="h-5 w-5 text-white/60 hover:text-white/90 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-secondary-500 focus:ring-secondary-500 border-white/30 rounded bg-white/10"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-white/80 font-outfit"
              >
                Remember me
              </label>
            </div> */}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full h-12 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-lg
              shadow-lg hover:shadow-xl transition-all duration-300 transform font-outfit
              flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span>Sign in to Dashboard</span>
                    <TbChevronRight className="h-5 w-5" />
                  </div>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Demo credentials - outside the main form container */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-between"
        >
          <h3 className="text-white/90 text-sm font-semibold font-outfit">
            Demo credentials:
          </h3>
          <code className="bg-white/10 text-xs text-white/90 px-2 py-0.5 rounded">
            admin@lako.com / admin123
          </code>
        </motion.div> */}

        {/* Footer */}
        <div className="mt-6 text-center text-white/50 text-sm font-outfit">
          <p>
            © {new Date().getFullYear()} Lako Insurance Agency. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
