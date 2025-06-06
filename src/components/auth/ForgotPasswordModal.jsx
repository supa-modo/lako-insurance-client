import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbX, TbMail, TbCheck, TbAlertTriangle, TbMailFilled } from "react-icons/tb";
import authService from "../../services/authService";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error("Forgot password failed:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white/90 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-secondary-700 font-outfit">
                Reset Account Password
              </h2>
              <button
                onClick={handleClose}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <TbX className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              {!success ? (
                <>
                  <div className="mb-6 text-center">
                    <p className="text-gray-600 font-outfit">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2"
                    >
                      <TbAlertTriangle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="reset-email"
                        className="block text-sm font-semibold text-primary-700 mb-2 font-outfit"
                      >
                        Account Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                          <TbMailFilled className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="reset-email"
                          type="email"
                          className="w-full pl-10 pr-4 py-3 bg-white text-gray-600 border border-gray-400 rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 focus:outline-none  transition-colors font-medium placeholder:font-normal"
                          placeholder="email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 border border-gray-400 hover:bg-gray-200 rounded-lg transition-colors font-outfit font-medium"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-outfit font-medium flex items-center justify-center gap-2"
                        disabled={loading || !email.trim()}
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
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
                            Sending...
                          </>
                        ) : (
                          "Send Reset Link"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-600 rounded-full flex items-center justify-center">
                    <TbCheck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-700 mb-2 font-outfit">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 mb-6 font-outfit">
                    If an account with that email exists, you will receive a
                    password reset link shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-outfit font-medium"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
