import { useState, useRef, useEffect } from "react";
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
  TbMailFilled,
  TbArrowRight,
  TbShieldCheck,
  TbArrowLeft,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { PiPasswordBold, PiPasswordDuotone } from "react-icons/pi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";
import { LuLogIn } from "react-icons/lu";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [loginStep, setLoginStep] = useState("credentials"); // "credentials" | "2fa"
  const [tempLoginData, setTempLoginData] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Refs for 2FA inputs
  const inputRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // First attempt login to check if 2FA is required
      const result = await login({ email, password });

      if (result.requires2FA) {
        // User has 2FA enabled, show 2FA step
        setTempLoginData({ email, password });
        setLoginStep("2fa");
        // Focus on first 2FA input after a short delay
        setTimeout(() => {
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }, 300);
      } else {
        // No 2FA required, login successful - navigate to dashboard
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("AdminLoginPage: Login failed:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Please check your credentials & try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Complete login with 2FA code
      const code = twoFactorCode.join("");
      await login({
        email: tempLoginData.email,
        password: tempLoginData.password,
        twoFactorCode: code,
      });
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("2FA verification failed:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Invalid verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCredentials = () => {
    setLoginStep("credentials");
    setTempLoginData(null);
    setTwoFactorCode(["", "", "", "", "", ""]);
    setError("");
  };

  const handle2FAChange = (index, value) => {
    // Only allow single digits
    if (value.length > 1) return;

    // Only allow numbers
    if (value !== "" && !/^\d$/.test(value)) return;

    const newCode = [...twoFactorCode];
    newCode[index] = value;
    setTwoFactorCode(newCode);

    // Clear error when user starts typing
    if (error) setError("");

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handle2FAKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (twoFactorCode[index] === "" && index > 0) {
        // If current field is empty, focus previous field
        inputRefs.current[index - 1]?.focus();
      } else if (twoFactorCode[index] !== "") {
        // If current field has value, clear it
        const newCode = [...twoFactorCode];
        newCode[index] = "";
        setTwoFactorCode(newCode);
      }
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handle2FAPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    // Only allow digits
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = ["", "", "", "", "", ""];
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newCode[i] = pastedData[i];
    }
    setTwoFactorCode(newCode);

    // Focus last filled input or first empty input
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-700 via-primary-800 to-primary-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary-500/30 rounded-full filter blur-3xl opacity-20 transform translate-y-1/4 translate-x-[-30%]"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-400/40 rounded-full filter blur-xl opacity-30 animate-float"></div>

      {/* Glass panels */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>

      <div className="max-w-[38rem] w-full px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Lako Insurance Logo"
              className="w-32 md:w-36 object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-white via-primary-300 to-white bg-clip-text text-transparent -mt-1 mb-3 font-paytone">
            Admin Portal
          </h2>
          <p className="text-white/80 font-outfit">
            {loginStep === "credentials"
              ? "Sign in to access the Lako Insurance administration dashboard"
              : "Enter the verification code from your authenticator app"}
          </p>
        </motion.div>
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 bg-red-500/40 border border-red-500/50 text-red-200 text-[0.85rem] md:text-sm lg:text-[0.93rem] mx-2 lg:mx-10 px-3 md:px-4 py-2.5 md:py-3 rounded-lg flex items-center gap-2"
          >
            <TbAlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="px-2 lg:px-10"
        >
          <AnimatePresence mode="wait">
            {loginStep === "credentials" ? (
              <motion.form
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleCredentialsSubmit}
                className="space-y-4 lg:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-secondary-500 mb-2 tracking-wide text-sm font-outfit"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 z-10 left-4 flex items-center pointer-events-none">
                      <TbMailFilled className="h-6 w-6 text-primary-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className="w-full h-12 pl-12 lg:pl-14 pr-4 text-sm sm:text-base text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
                  duration-200 focus:ring-2 focus:outline-none focus:ring-primary-400 focus:border-0
                  font-lexend placeholder-white/50 border-white/30"
                      placeholder="email@example.com"
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
                      className="block text-secondary-500 tracking-wide text-sm font-outfit"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPasswordModal(true)}
                      className="text-sm text-neutral-500 hover:text-secondary-300 transition-colors font-outfit"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 z-10 left-4 flex items-center pointer-events-none">
                      <PiPasswordDuotone className="h-6 w-6 text-primary-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full h-12 pl-12 lg:pl-14 pr-12 text-sm sm:text-base text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm focus:bg-white/20
                  duration-200 focus:ring-2 focus:outline-none focus:ring-primary-400 focus:border-0
                  font-lexend placeholder-white/50 border-white/30"
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
                        <FaEyeSlash className="h-5 w-5 text-white/60 hover:text-white/90 transition-colors" />
                      ) : (
                        <FaEye className="h-5 w-5 text-white/60 hover:text-white/90 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full h-12 bg-secondary-600 hover:bg-secondary-500 text-white font-medium rounded-lg
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
                      Verifying...
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span>Continue</span>
                        <TbChevronRight className="h-5 w-5" />
                      </div>
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="2fa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handle2FASubmit}
                className="space-y-4 lg:space-y-6"
              >
                <div>
                  <label
                    htmlFor="twoFactorCode"
                    className="block text-secondary-500 mb-4 tracking-wide text-sm font-outfit text-center"
                  >
                    Enter 6-digit verification code
                  </label>
                  <div className="flex gap-3 justify-center">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        className="w-[2.9rem] md:w-14 h-[3.2rem] md:h-[3.8rem] text-center text-lg md:text-xl font-bold text-white rounded-lg border-2 bg-white/10 backdrop-blur-sm 
                                 focus:bg-white/20 focus:ring-1 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500
                                 transition-all duration-200 font-lexend border-white/30 hover:border-white/50"
                        value={twoFactorCode[index]}
                        onChange={(e) => handle2FAChange(index, e.target.value)}
                        onKeyDown={(e) => handle2FAKeyDown(index, e)}
                        onPaste={handle2FAPaste}
                        maxLength="1"
                        required
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-xs text-center mt-3 font-outfit">
                    Check your registered authenticator app for the code
                  </p>
                </div>

                <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full h-12 bg-secondary-600 hover:bg-secondary-500 text-white font-medium rounded-lg
                    shadow-lg hover:shadow-xl transition-all duration-300 transform font-outfit
                    flex items-center justify-center gap-2"
                    disabled={
                      loading || twoFactorCode.some((code) => code === "")
                    }
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
                        Verifying...
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <LuLogIn className="h-5 w-5" />
                          <span>Verify & Sign In</span>
                        </div>
                      </>
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={handleBackToCredentials}
                    className="w-full h-12 bg-white/10 hover:bg-white/20 text-white/80 font-medium rounded-lg
                    border border-white/30 hover:border-white/50 transition-all duration-300 font-outfit
                    flex items-center justify-center gap-2"
                  >
                    <TbArrowLeft className="h-4 w-4" />
                    <span>Back to Login</span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
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

        {/* Back to Homepage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 p-4 flex items-center justify-center"
        >
          <a
            href="/"
            className="flex items-center gap-1 text-secondary-300 text-[0.8rem] md:text-sm font-semibold font-outfit underline underline-offset-4 hover:text-secondary-500 transition-colors"
          >
            <span>Back to Homepage</span>
            <TbArrowRight />
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-6 text-center text-white/50 text-sm font-outfit">
          <p>
            © {new Date().getFullYear()} Lako Insurance Agency. All rights
            reserved.
          </p>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
        />
      </div>
    </div>
  );
};

export default AdminLoginPage;
