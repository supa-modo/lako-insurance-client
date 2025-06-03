import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TbUser,
  TbSettings,
  TbShield,
  TbBell,
  TbBrush,
  TbDevices,
  TbGlobe,
  TbKey,
  TbCreditCard,
  TbBuilding,
  TbPhotoUp,
  TbCheck,
  TbEdit,
  TbTrash,
  TbRefresh,
  TbColorSwatch,
  TbEye,
  TbEyeOff,
  TbMail,
  TbPhone,
  TbMapPin,
  TbX,
  TbChevronRight,
  TbShieldCheck,
  TbDatabase,
  TbDownload,
  TbUpload,
} from "react-icons/tb";
import { FaSave } from "react-icons/fa";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Anderson",
    email: "john.anderson@lakoinsurance.com",
    phone: "+254 123 456 789",
    role: "Administrator",
    avatar: null,
    companyName: "Lako Insurance Brokers",
    address: "Westlands Business Park, Tower B, 14th Floor\nNairobi, Kenya",
    language: "English",
    timeZone: "Africa/Nairobi",
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: true,
    },
    theme: "light",
    twoFactor: false,
  });

  const [editedUserData, setEditedUserData] = useState(userData);

  // Settings tabs with modern design
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: TbUser,
      description: "Personal information and preferences",
    },
    {
      id: "company",
      label: "Company",
      icon: TbBuilding,
      description: "Business details and branding",
    },
    {
      id: "security",
      label: "Security",
      icon: TbShield,
      description: "Password and authentication settings",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: TbBell,
      description: "Communication preferences",
    },
    {
      id: "system",
      label: "System",
      icon: TbSettings,
      description: "Application settings and data",
    },
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setEditedUserData({
        ...editedUserData,
        [parent]: {
          ...editedUserData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setEditedUserData({
        ...editedUserData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle save with animation
  const handleSaveChanges = async () => {
    setSaveStatus("saving");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUserData(editedUserData);
    setIsEditing(false);
    setSaveStatus("success");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedUserData(userData);
    setIsEditing(false);
    setSaveStatus(null);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Settings
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your account and system preferences
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            {/* Save Status Indicator */}
            <AnimatePresence>
              {saveStatus && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`flex items-center px-4 py-2 rounded-lg mr-2 ${
                    saveStatus === "saving"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {saveStatus === "saving" ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-700 border-t-transparent mr-2"></div>
                  ) : (
                    <TbCheck className="w-4 h-4 mr-2" />
                  )}
                  <span className="text-sm font-medium">
                    {saveStatus === "saving"
                      ? "Saving changes..."
                      : "Changes saved successfully"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-6 py-4">
        {/* Main Container */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {/* User Profile Card */}
              <div className="p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                    {userData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{userData.name}</h3>
                    <p className="text-primary-100 text-sm">{userData.role}</p>
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
                <div className="flex items-center justify-between">
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
                        {tabs.find((tab) => tab.id === activeTab)?.label}{" "}
                        Settings
                      </h2>
                      <p className="text-slate-600 text-sm">
                        {tabs.find((tab) => tab.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveChanges}
                          disabled={saveStatus === "saving"}
                          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                        >
                          <FaSave className="w-4 h-4" />
                          <span>
                            {saveStatus === "saving"
                              ? "Saving..."
                              : "Save Changes"}
                          </span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                      >
                        <TbEdit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
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
                      <div className="space-y-8">
                        {/* Personal Information */}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <TbUser className="w-5 h-5 mr-2 text-primary-600" />
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name
                              </label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="name"
                                  value={editedUserData.name}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                                  {userData.name}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                              </label>
                              {isEditing ? (
                                <input
                                  type="email"
                                  name="email"
                                  value={editedUserData.email}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 flex items-center">
                                  <TbMail className="w-4 h-4 mr-2 text-slate-500" />
                                  {userData.email}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Phone Number
                              </label>
                              {isEditing ? (
                                <input
                                  type="tel"
                                  name="phone"
                                  value={editedUserData.phone}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 flex items-center">
                                  <TbPhone className="w-4 h-4 mr-2 text-slate-500" />
                                  {userData.phone}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Role
                              </label>
                              {isEditing ? (
                                <select
                                  name="role"
                                  value={editedUserData.role}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                >
                                  <option value="Administrator">
                                    Administrator
                                  </option>
                                  <option value="Manager">Manager</option>
                                  <option value="Agent">Agent</option>
                                </select>
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                                  {userData.role}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Profile Picture */}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            Profile Picture
                          </h3>
                          <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                              {userData.name.charAt(0)}
                            </div>
                            {isEditing && (
                              <div className="space-y-2">
                                <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                  <TbUpload className="w-4 h-4 mr-2" />
                                  Upload Photo
                                </button>
                                <button className="flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                                  <TbTrash className="w-4 h-4 mr-2" />
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Company Tab */}
                    {activeTab === "company" && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <TbBuilding className="w-5 h-5 mr-2 text-primary-600" />
                            Company Details
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Company Name
                              </label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  name="companyName"
                                  value={editedUserData.companyName}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                                  {userData.companyName}
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Business Address
                              </label>
                              {isEditing ? (
                                <textarea
                                  name="address"
                                  value={editedUserData.address}
                                  onChange={handleInputChange}
                                  rows="3"
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                />
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 flex items-start">
                                  <TbMapPin className="w-4 h-4 mr-2 text-slate-500 mt-0.5" />
                                  <span className="whitespace-pre-line">
                                    {userData.address}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === "security" && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <TbShieldCheck className="w-5 h-5 mr-2 text-primary-600" />
                            Security Settings
                          </h3>
                          <div className="space-y-6">
                            <div className="p-6 border border-slate-200 rounded-lg">
                              <h4 className="font-medium text-slate-900 mb-2">
                                Change Password
                              </h4>
                              <p className="text-sm text-slate-600 mb-4">
                                Update your password to keep your account secure
                              </p>
                              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                Change Password
                              </button>
                            </div>

                            <div className="p-6 border border-slate-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-slate-900">
                                    Two-Factor Authentication
                                  </h4>
                                  <p className="text-sm text-slate-600 mt-1">
                                    Add an extra layer of security to your
                                    account
                                  </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    name="twoFactor"
                                    checked={
                                      isEditing
                                        ? editedUserData.twoFactor
                                        : userData.twoFactor
                                    }
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === "notifications" && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <TbBell className="w-5 h-5 mr-2 text-primary-600" />
                            Notification Preferences
                          </h3>
                          <div className="space-y-4">
                            {[
                              {
                                key: "email",
                                label: "Email Notifications",
                                description: "Receive notifications via email",
                              },
                              {
                                key: "push",
                                label: "Push Notifications",
                                description:
                                  "Browser and mobile push notifications",
                              },
                              {
                                key: "sms",
                                label: "SMS Notifications",
                                description:
                                  "Text message notifications for urgent matters",
                              },
                              {
                                key: "marketing",
                                label: "Marketing Communications",
                                description:
                                  "Product updates and marketing content",
                              },
                            ].map((item) => (
                              <div
                                key={item.key}
                                className="p-6 border border-slate-200 rounded-lg"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-medium text-slate-900">
                                      {item.label}
                                    </h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                      {item.description}
                                    </p>
                                  </div>
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      name={`notifications.${item.key}`}
                                      checked={
                                        isEditing
                                          ? editedUserData.notifications[
                                              item.key
                                            ]
                                          : userData.notifications[item.key]
                                      }
                                      onChange={handleInputChange}
                                      disabled={!isEditing}
                                      className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* System Tab */}
                    {activeTab === "system" && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <TbDatabase className="w-5 h-5 mr-2 text-primary-600" />
                            System Preferences
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Language
                              </label>
                              {isEditing ? (
                                <select
                                  name="language"
                                  value={editedUserData.language}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                >
                                  <option value="English">English</option>
                                  <option value="Swahili">Swahili</option>
                                  <option value="French">French</option>
                                </select>
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                                  {userData.language}
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Time Zone
                              </label>
                              {isEditing ? (
                                <select
                                  name="timeZone"
                                  value={editedUserData.timeZone}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                >
                                  <option value="Africa/Nairobi">
                                    East Africa Time (EAT)
                                  </option>
                                  <option value="Africa/Lagos">
                                    West Africa Time (WAT)
                                  </option>
                                  <option value="Africa/Cairo">
                                    Eastern European Time (EET)
                                  </option>
                                </select>
                              ) : (
                                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                                  {userData.timeZone}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            Data Management
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left">
                              <div className="flex items-center space-x-3">
                                <TbDownload className="w-5 h-5 text-primary-600" />
                                <div>
                                  <div className="font-medium text-slate-900">
                                    Export Data
                                  </div>
                                  <div className="text-sm text-slate-600">
                                    Download your account data
                                  </div>
                                </div>
                              </div>
                            </button>

                            <button className="p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left">
                              <div className="flex items-center space-x-3">
                                <TbTrash className="w-5 h-5 text-red-600" />
                                <div>
                                  <div className="font-medium text-red-900">
                                    Delete Account
                                  </div>
                                  <div className="text-sm text-red-600">
                                    Permanently delete your account
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
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
