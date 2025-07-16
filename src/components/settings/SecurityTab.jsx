import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbKey,
  TbEye,
  TbEyeOff,
  TbShieldCheck,
  TbQrcode,
  TbCopy,
  TbX,
  TbShieldOff,
  TbLock,
  TbShield,
  TbAlertTriangle,
} from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi";

// Custom 6-digit verification input component
const VerificationCodeInput = ({ value, onChange, error, disabled }) => {
  const inputRefs = useRef([]);
  const [localValues, setLocalValues] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    // Update local values when prop value changes
    const digits = value
      ? value.padEnd(6, "").split("").slice(0, 6)
      : ["", "", "", "", "", ""];
    setLocalValues(digits);
  }, [value]);

  const handleInputChange = (index, inputValue) => {
    const newValue = inputValue.replace(/[^0-9]/g, "");

    if (newValue.length > 1) return; // Only allow single digit

    const newValues = [...localValues];
    newValues[index] = newValue;
    setLocalValues(newValues);

    // Call parent onChange with complete value
    onChange(newValues.join(""));

    // Auto-focus next input
    if (newValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!localValues[index] && index > 0) {
        // If current input is empty, go to previous and clear it
        const newValues = [...localValues];
        newValues[index - 1] = "";
        setLocalValues(newValues);
        onChange(newValues.join(""));
        inputRefs.current[index - 1]?.focus();
      } else if (localValues[index]) {
        // Clear current input
        const newValues = [...localValues];
        newValues[index] = "";
        setLocalValues(newValues);
        onChange(newValues.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);
    const newValues = pastedData.padEnd(6, "").split("").slice(0, 6);
    setLocalValues(newValues);
    onChange(pastedData);

    // Focus the last filled input or first empty one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center space-x-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="w-14 h-14"
          >
            <input
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={localValues[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              disabled={disabled}
              className={`w-full h-full text-center text-xl font-bold border-2 rounded-[0.7rem] transition-all duration-200 ${
                error
                  ? "border-red-400 bg-red-50 text-red-700"
                  : localValues[index]
                  ? "border-primary-500 bg-primary-50 text-primary-700 shadow-md"
                  : "border-slate-300 bg-white hover:border-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              maxLength="1"
              autoComplete="one-time-code"
            />
          </motion.div>
        ))}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm text-center flex items-center justify-center"
        >
          <TbAlertTriangle className="w-4 h-4 mr-2" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

const SecurityTab = ({
  passwordData,
  handlePasswordChange,
  showPasswords,
  setShowPasswords,
  handleChangePassword,
  twoFAData,
  setTwoFAData,
  handleSetup2FA,
  handleEnable2FA,
  handleDisable2FA,
  copyToClipboard,
  errors,
  setErrors,
  loading,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* Password Change Section */}
      <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl mr-4">
            <TbKey className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800">
              Change Password
            </h3>
            <p className="text-slate-600 text-sm">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 pr-12 ${
                  errors.currentPassword
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPasswords.current ? (
                  <TbEyeOff className="h-5 w-5" />
                ) : (
                  <TbEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-600 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 pr-12 ${
                  errors.newPassword
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPasswords.new ? (
                  <TbEyeOff className="h-5 w-5" />
                ) : (
                  <TbEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-600 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 lg:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Confirm New Password
            </label>
            <div className="relative max-w-md">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 pr-12 ${
                  errors.confirmPassword
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPasswords.confirm ? (
                  <TbEyeOff className="h-5 w-5" />
                ) : (
                  <TbEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={handleChangePassword}
            disabled={
              loading ||
              !passwordData.currentPassword ||
              !passwordData.newPassword ||
              !passwordData.confirmPassword
            }
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <TbLock className="w-5 h-5" />
            )}
            <span>Update Password</span>
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">
            Two-Factor Authentication
          </h3>
          <p className="text-slate-600 text-sm">
            Add an extra layer of security to your account
          </p>
        </div>

        {/* 2FA Status Card */}
        <div
          className={`p-6 rounded-xl border-2 mb-6 ${
            twoFAData.enabled
              ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
              : "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {twoFAData.enabled ? (
                <div className="p-2 bg-emerald-600 rounded-lg mr-4">
                  <TbShield className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="p-2 bg-amber-600 rounded-lg mr-4">
                  <TbShieldOff className="w-6 h-6 text-white" />
                </div>
              )}
              <div>
                <h4
                  className={`font-semibold text-lg ${
                    twoFAData.enabled ? "text-emerald-800" : "text-amber-800"
                  }`}
                >
                  {twoFAData.enabled ? "2FA is Active" : "2FA is Disabled"}
                </h4>
                <p
                  className={`text-sm ${
                    twoFAData.enabled ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {twoFAData.enabled
                    ? "Your account is protected with two-factor authentication"
                    : "Enable 2FA to add an extra layer of security"}
                </p>
              </div>
            </div>
            <div
              className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                twoFAData.enabled
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-600 text-white"
              }`}
            >
              {twoFAData.enabled ? (
                <>
                  <FiCheckCircle className="w-4 h-4 mr-2" />
                  Enabled
                </>
              ) : (
                <>
                  <TbAlertTriangle className="w-4 h-4 mr-2" />
                  Disabled
                </>
              )}
            </div>
          </div>
        </div>

        {/* 2FA Setup Flow */}
        <AnimatePresence mode="wait">
          {!twoFAData.enabled && !twoFAData.setupInProgress && (
            <motion.div
              key="setup-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <button
                onClick={handleSetup2FA}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 disabled:opacity-50 flex items-center space-x-3 shadow-lg hover:shadow-xl font-medium text-lg mx-auto"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                ) : (
                  <TbQrcode className="w-6 h-6" />
                )}
                <span>Setup Two-Factor Authentication</span>
              </button>
            </motion.div>
          )}

          {twoFAData.setupInProgress && (
            <motion.div
              key="setup-process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Step 1: QR Code */}
              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    1
                  </div>
                  <h5 className="font-semibold text-lg text-slate-800">
                    Scan QR Code
                  </h5>
                </div>
                <p className="text-slate-600 mb-6">
                  Open your authenticator app (Google Authenticator, Authy,
                  etc.) and scan this QR code:
                </p>

                {twoFAData.qrCodeUrl && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-white border-2 border-slate-200 rounded-xl shadow-sm">
                      <img
                        src={twoFAData.qrCodeUrl}
                        alt="2FA QR Code"
                        className="w-48 h-48"
                      />
                    </div>

                    {twoFAData.secret && (
                      <div className="w-full max-w-md">
                        <p className="text-xs text-slate-600 mb-2 text-center">
                          Can't scan? Enter this code manually:
                        </p>
                        <div className="flex items-center justify-between bg-slate-100 rounded-lg p-3 border">
                          <code className="text-sm font-mono text-slate-900 break-all">
                            {twoFAData.secret}
                          </code>
                          <button
                            onClick={() => copyToClipboard(twoFAData.secret)}
                            className="ml-3 p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Copy to clipboard"
                          >
                            <TbCopy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Step 2: Verification */}
              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <h5 className="font-semibold text-lg text-slate-800">
                    Enter Verification Code
                  </h5>
                </div>
                <p className="text-slate-600 mb-6">
                  Enter the 6-digit code from your authenticator app:
                </p>

                <VerificationCodeInput
                  value={twoFAData.verificationToken}
                  onChange={(value) => {
                    setTwoFAData((prev) => ({
                      ...prev,
                      verificationToken: value,
                    }));
                    if (errors.verificationToken) {
                      setErrors((prev) => ({
                        ...prev,
                        verificationToken: "",
                      }));
                    }
                  }}
                  error={errors.verificationToken}
                  disabled={loading}
                />

                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={() =>
                      setTwoFAData((prev) => ({
                        ...prev,
                        setupInProgress: false,
                        qrCodeUrl: null,
                        secret: null,
                        verificationToken: "",
                      }))
                    }
                    disabled={loading}
                    className="px-6 py-3 text-slate-600 border-2 border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 disabled:opacity-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEnable2FA}
                    disabled={
                      loading || twoFAData.verificationToken.length !== 6
                    }
                    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <FiCheckCircle className="w-5 h-5" />
                    )}
                    <span>Enable 2FA</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {twoFAData.enabled && (
            <motion.div
              key="manage-2fa"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Disable 2FA */}
              <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
                <h5 className="font-semibold text-lg text-gray-700 mb-3">
                  Disable Two-Factor Authentication
                </h5>
                <p className="text-slate-600 mb-6">
                  Enter a verification code from your authenticator app to
                  confirm disabling 2FA:
                </p>

                <VerificationCodeInput
                  value={twoFAData.verificationToken}
                  onChange={(value) => {
                    setTwoFAData((prev) => ({
                      ...prev,
                      verificationToken: value,
                    }));
                    if (errors.verificationToken) {
                      setErrors((prev) => ({
                        ...prev,
                        verificationToken: "",
                      }));
                    }
                  }}
                  error={errors.verificationToken}
                  disabled={loading}
                />

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleDisable2FA}
                    disabled={
                      loading || twoFAData.verificationToken.length !== 6
                    }
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-[0.7rem] hover:from-red-700 hover:to-red-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <TbX className="w-5 h-5" />
                    )}
                    <span>Disable 2FA</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SecurityTab;
