import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbUser,
  TbShield,
  TbBell,
  TbCheck,
  TbX,
  TbChevronRight,
  TbEdit,
} from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { useNotification } from "../../context/NotificationContext";
import ProfileTab from "../../components/settings/ProfileTab";
import SecurityTab from "../../components/settings/SecurityTab";
import NotificationsTab from "../../components/settings/NotificationsTab";
import { PiUserDuotone } from "react-icons/pi";
import { GrSecure } from "react-icons/gr";

const SettingsPage = () => {
  const { user, updateUser } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // 2FA state
  const [twoFAData, setTwoFAData] = useState({
    enabled: false,
    hasSecret: false,
    qrCodeUrl: null,
    secret: null,
    backupCodes: [],
    verificationToken: "",
    setupInProgress: false,
  });

  // Notifications state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    securityAlerts: true,
  });

  const [errors, setErrors] = useState({});

  // Settings tabs
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: PiUserDuotone,
      description: "Personal information and contact details",
    },
    {
      id: "security",
      label: "Security",
      icon: GrSecure,
      description: "Password and two-factor authentication",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: TbBell,
      description: "Communication preferences",
    },
  ];

  // Load user profile on component mount
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    }
    loadUserProfile();
    load2FAStatus();
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const response = await userService.getProfile();
      if (response.success) {
        const userData = response.user;
        setProfileData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          phone: userData.phone || "",
          role: userData.role || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const load2FAStatus = async () => {
    try {
      const response = await userService.get2FAStatus();
      if (response.success) {
        setTwoFAData((prev) => ({
          ...prev,
          enabled: response.data.enabled,
          hasSecret: response.data.hasSecret,
        }));
      }
    } catch (error) {
      console.error("Error loading 2FA status:", error);
    }
  };

  // Handle profile input change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle notification settings change
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Validate profile data
  const validateProfileData = () => {
    const newErrors = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!profileData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (profileData.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(profileData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password data
  const validatePasswordData = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    if (!validateProfileData()) return;

    setSaveStatus("saving");
    setLoading(true);

    try {
      const response = await userService.updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
      });

      if (response.success) {
        // Update the auth context with new user data
        updateUser(response.user);
        setIsEditing(false);
        setSaveStatus("success");
        showSuccess("Profile changes saved successfully");
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        throw new Error(
          response.message || "Failed to save profile changes, please try again"
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveStatus("error");
      showError(
        error.message || "Failed to save profile changes, please try again"
      );
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (!validatePasswordData()) return;

    setLoading(true);
    try {
      const response = await userService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (response.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        showSuccess("Your account password has been changed successfully");
      } else {
        throw new Error(
          response.message ||
            "Failed to change password, please try again"
        );
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({ currentPassword: error.message });
      showError(
        error.message || "Failed to change password, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  // Setup 2FA
  const handleSetup2FA = async () => {
    setLoading(true);
    try {
      const response = await userService.setup2FA();
      if (response.success) {
        setTwoFAData((prev) => ({
          ...prev,
          qrCodeUrl: response.data.qrCodeUrl,
          secret: response.data.secret,
          backupCodes: response.data.backupCodes,
          setupInProgress: true,
        }));
      } else {
        throw new Error(
          response.message || "Failed to setup 2FA, please try again"
        );
      }
    } catch (error) {
      console.error("Error setting up 2FA:", error);
        showError(
        error.message || "Failed to setup 2FA, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  // Enable 2FA
  const handleEnable2FA = async () => {
    if (
      !twoFAData.verificationToken ||
      twoFAData.verificationToken.length !== 6
    ) {
      setErrors({
        verificationToken: "Please enter a 6-digit verification code",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await userService.enable2FA(twoFAData.verificationToken);
      if (response.success) {
        setTwoFAData((prev) => ({
          ...prev,
          enabled: true,
          setupInProgress: false,
          verificationToken: "",
          backupCodes: response.backupCodes,
        }));
        showSuccess(
          "Two-factor authentication for your account has been enabled successfully"
        );
      } else {
        throw new Error(
          response.message ||
            "Failed to enable 2FA, please try again with a valid verification code"
        );
      }
    } catch (error) {
      console.error("Error enabling 2FA:", error);
      setErrors({ verificationToken: error.message });
      showError(
        error.message ||
          "Failed to enable 2FA, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Disable 2FA
  const handleDisable2FA = async () => {
    if (
      !twoFAData.verificationToken ||
      twoFAData.verificationToken.length !== 6
    ) {
      setErrors({
        verificationToken: "Please enter a 6-digit verification code",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await userService.disable2FA(
        twoFAData.verificationToken
      );
      if (response.success) {
        setTwoFAData((prev) => ({
          ...prev,
          enabled: false,
          hasSecret: false,
          qrCodeUrl: null,
          secret: null,
          verificationToken: "",
          setupInProgress: false,
        }));
        showSuccess(
          "Two-factor authentication for your account has been disabled successfully"
        );
      } else {
        throw new Error(
          response.message ||
            "Failed to disable 2FA, please try again with a valid verification code"
        );
      }
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      setErrors({ verificationToken: error.message });
      showError(error.message || "Failed to disable 2FA, please try again");
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy:", error);
      showError("Failed to copy");
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    loadUserProfile();
    setIsEditing(false);
    setSaveStatus(null);
    setErrors({});
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Account Settings
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your profile, security, and notification preferences
            </p>
          </div>

          {/* Save Status Indicator */}
          <AnimatePresence>
            {saveStatus && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`flex items-center px-4 py-2 rounded-lg mt-4 md:mt-0 ${
                  saveStatus === "saving"
                    ? "bg-blue-100 text-blue-700"
                    : saveStatus === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {saveStatus === "saving" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-700 border-t-transparent mr-2"></div>
                ) : saveStatus === "success" ? (
                  <TbCheck className="w-4 h-4 mr-2" />
                ) : (
                  <TbX className="w-4 h-4 mr-2" />
                )}
                <span className="text-sm font-medium">
                  {saveStatus === "saving"
                    ? "Saving changes..."
                    : saveStatus === "success"
                    ? "Changes saved successfully"
                    : "Failed to save changes"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* User Profile Card */}
              <div className="p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                    {profileData.firstName.charAt(0)}
                    {profileData.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-secondary-200">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-primary-100 text-sm capitalize">
                      {profileData.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
                      activeTab === tab.id
                        ? "bg-primary-50 border border-primary-200 text-primary-700"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <tab.icon
                          className={`w-5 h-5 ${
                            activeTab === tab.id
                              ? "text-primary-600"
                              : "text-slate-500"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{tab.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {tab.description}
                          </div>
                        </div>
                      </div>
                      <TbChevronRight
                        className={`w-4 h-4 transition-transform ${
                          activeTab === tab.id
                            ? "rotate-90 text-primary-600"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              {/* Content Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    {(() => {
                      const currentTab = tabs.find(
                        (tab) => tab.id === activeTab
                      );
                      const IconComponent = currentTab?.icon;
                      return IconComponent ? (
                        <IconComponent className="w-6 h-6 text-primary-600" />
                      ) : null;
                    })()}
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {tabs.find((tab) => tab.id === activeTab)?.label}
                      </h2>
                      <p className="text-slate-600 text-sm">
                        {tabs.find((tab) => tab.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                  {/* Edit Profile Button in Header */}
                  {activeTab === "profile" && !isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
                    >
                      <span className="inline-block align-middle">
                        <TbEdit className="w-4 h-4" />
                      </span>
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                      <ProfileTab
                        profileData={profileData}
                        handleProfileChange={handleProfileChange}
                        errors={errors}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        handleSaveProfile={handleSaveProfile}
                        handleCancelEdit={handleCancelEdit}
                        loading={loading}
                      />
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                      <SecurityTab
                        passwordData={passwordData}
                        handlePasswordChange={handlePasswordChange}
                        showPasswords={showPasswords}
                        setShowPasswords={setShowPasswords}
                        handleChangePassword={handleChangePassword}
                        twoFAData={twoFAData}
                        setTwoFAData={setTwoFAData}
                        handleSetup2FA={handleSetup2FA}
                        handleEnable2FA={handleEnable2FA}
                        handleDisable2FA={handleDisable2FA}
                        copyToClipboard={copyToClipboard}
                        errors={errors}
                        setErrors={setErrors}
                        loading={loading}
                      />
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                      <NotificationsTab
                        notificationSettings={notificationSettings}
                        handleNotificationChange={handleNotificationChange}
                        showSuccess={showSuccess}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
