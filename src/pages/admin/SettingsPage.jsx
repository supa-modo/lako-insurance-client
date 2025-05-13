import React, { useState } from "react";
import { FaSave, FaSignOutAlt } from "react-icons/fa";
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
} from "react-icons/tb";

const SettingsPage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("profile");

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Admin User",
    email: "admin@lakoinsurance.com",
    phone: "+254 123 456 789",
    role: "Administrator",
    avatar: null,
    companyName: "Lako Insurance Brokers",
    address: "123 Nairobi Way, Nairobi, Kenya",
    language: "English",
    timeZone: "Africa/Nairobi",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    theme: "light",
  });

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);

  // Settings tabs
  const tabs = [
    { id: "profile", label: "Profile Settings", icon: TbUser },
    { id: "company", label: "Company Info", icon: TbBuilding },
    { id: "security", label: "Security", icon: TbShield },
    { id: "notifications", label: "Notifications", icon: TbBell },
    { id: "appearance", label: "Appearance", icon: TbBrush },
    { id: "system", label: "System", icon: TbSettings },
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      // Handle nested objects (like notifications.email)
      const [parent, child] = name.split(".");
      setEditedUserData({
        ...editedUserData,
        [parent]: {
          ...editedUserData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      // Handle regular fields
      setEditedUserData({
        ...editedUserData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle save
  const handleSaveChanges = () => {
    setUserData(editedUserData);
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedUserData(userData);
    setIsEditing(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-50 to-white px-8 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-primary-600">
              System Settings
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm">
              <TbRefresh />
            </button>

            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveChanges}
                  className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center shadow-sm"
                >
                  <FaSave className="mr-2 h-5 w-5" /> Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 flex items-center shadow-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg px-4 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center shadow-sm"
              >
                <TbEdit className="mr-2 h-5 w-5" /> Edit Settings
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden bg-neutral-50 px-8 py-4">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 pr-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-5 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-white">
              <div className="flex items-center">
                <div className="h-14 w-14 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full flex items-center justify-center font-semibold text-xl shadow-sm">
                  {userData.name ? userData.name.charAt(0) : "A"}
                </div>
                <div className="ml-3">
                  <div className="font-medium text-neutral-900 text-base">
                    {userData.name}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {userData.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary-50 text-primary-700 font-medium shadow-sm border border-primary-100"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <tab.icon
                        className={`h-5 w-5 mr-3 ${
                          activeTab === tab.id
                            ? "text-primary-600"
                            : "text-gray-500"
                        }`}
                      />
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Need Help?
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              If you need assistance with your settings, please contact our
              support team.
            </p>
            <button className="w-full bg-neutral-100 text-gray-600 rounded-lg py-2 text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center">
              <TbPhotoUp className="mr-2 h-4 w-4" /> Contact Support
            </button>
          </div>
        </div>

        {/* Main settings content */}
        <div className="flex-1 overflow-y-auto ml-2">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary-700 mb-4 flex items-center">
                  <TbUser className="mr-2 h-6 w-6 text-primary-600" /> Profile
                  Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-3 inline-block pb-1 border-b-2 border-primary-200">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            id="name"
                            type="text"
                            name="name"
                            className="mt-1 block w-full rounded-lg border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm">
                            {userData.name}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            id="email"
                            type="email"
                            name="email"
                            className="mt-1 block w-full rounded-lg border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.email}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm">
                            {userData.email}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            id="phone"
                            type="text"
                            name="phone"
                            className="mt-1 block w-full rounded-lg border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.phone}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm">
                            {userData.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-3 inline-block pb-1 border-b-2 border-primary-200">
                      User Preferences
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="role"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Role
                        </label>
                        {isEditing ? (
                          <select
                            id="role"
                            name="role"
                            className="mt-1 block w-full rounded-lg border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.role}
                            onChange={handleInputChange}
                          >
                            <option value="Administrator">Administrator</option>
                            <option value="Manager">Manager</option>
                            <option value="Agent">Agent</option>
                          </select>
                        ) : (
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm">
                            {userData.role}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="language"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Language
                        </label>
                        {isEditing ? (
                          <select
                            id="language"
                            name="language"
                            className="mt-1 block w-full rounded-lg border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.language}
                            onChange={handleInputChange}
                          >
                            <option value="English">English</option>
                            <option value="Swahili">Swahili</option>
                            <option value="French">French</option>
                          </select>
                        ) : (
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm">
                            {userData.language}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="timeZone"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Time Zone
                        </label>
                        {isEditing ? (
                          <select
                            id="timeZone"
                            name="timeZone"
                            className="mt-1 block w-full rounded-lg border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.timeZone}
                            onChange={handleInputChange}
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
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm">
                            {userData.timeZone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3 inline-block pb-1 border-b-2 border-primary-200">
                      Profile Photo
                    </h3>
                    <div className="flex items-center mt-4">
                      <div className="h-20 w-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full flex items-center justify-center font-semibold text-2xl shadow-md">
                        {userData.name ? userData.name.charAt(0) : "A"}
                      </div>
                      {isEditing && (
                        <div className="ml-5">
                          <div className="space-y-2">
                            <button
                              type="button"
                              className="bg-white border border-neutral-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                              <TbPhotoUp className="mr-2 h-4 w-4 inline" />
                              Upload Photo
                            </button>
                            <button
                              type="button"
                              className="bg-white border border-neutral-300 rounded-md shadow-sm py-2 px-3 text-sm font-medium text-red-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 block"
                            >
                              <TbTrash className="mr-2 h-4 w-4 inline" />
                              Remove Photo
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Company Tab */}
            {activeTab === "company" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary-700 mb-4">
                  Company Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Company Name
                        </label>
                        {isEditing ? (
                          <input
                            id="companyName"
                            type="text"
                            name="companyName"
                            className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.companyName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-md">
                            {userData.companyName}
                          </div>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-neutral-700 mb-1"
                        >
                          Business Address
                        </label>
                        {isEditing ? (
                          <textarea
                            id="address"
                            name="address"
                            rows="3"
                            className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            value={editedUserData.address}
                            onChange={handleInputChange}
                          ></textarea>
                        ) : (
                          <div className="text-neutral-900 py-2 px-3 bg-neutral-50 rounded-md">
                            {userData.address}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          Company Logo
                        </label>
                        <div className="border border-neutral-300 p-4 rounded-md">
                          <div className="h-32 w-full bg-neutral-100 rounded flex items-center justify-center text-neutral-400 mb-2">
                            <TbBuilding className="h-10 w-10" />
                          </div>
                          {isEditing && (
                            <button className="w-full px-3 py-2 bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 text-sm font-medium flex items-center justify-center">
                              <TbPhotoUp className="mr-2 h-5 w-5" /> Upload Logo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary-700 mb-4">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Password
                    </h3>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium flex items-center">
                      <TbKey className="mr-2 h-5 w-5" /> Change Password
                    </button>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </p>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm font-medium flex items-center">
                      <TbShield className="mr-2 h-5 w-5" /> Enable 2FA
                    </button>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Login Sessions
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      You're currently logged in on this device. If you notice
                      any suspicious activity, you can log out of all sessions.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium flex items-center">
                      <FaSignOutAlt className="mr-2 h-5 w-5" /> Logout From All
                      Devices
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary-700 mb-4">
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Email Notifications
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="email-notifications"
                          name="notifications.email"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          checked={
                            isEditing
                              ? editedUserData.notifications.email
                              : userData.notifications.email
                          }
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="email-notifications"
                          className="ml-2 block text-sm text-neutral-700"
                        >
                          Receive email notifications
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Push Notifications
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="push-notifications"
                          name="notifications.push"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          checked={
                            isEditing
                              ? editedUserData.notifications.push
                              : userData.notifications.push
                          }
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="push-notifications"
                          className="ml-2 block text-sm text-neutral-700"
                        >
                          Receive push notifications
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      SMS Notifications
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="sms-notifications"
                          name="notifications.sms"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          checked={
                            isEditing
                              ? editedUserData.notifications.sms
                              : userData.notifications.sms
                          }
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                        <label
                          htmlFor="sms-notifications"
                          className="ml-2 block text-sm text-neutral-700"
                        >
                          Receive SMS notifications
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary-700 mb-4">
                  Appearance Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Theme
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`border rounded-lg p-3 cursor-pointer ${
                          (isEditing
                            ? editedUserData.theme
                            : userData.theme) === "light"
                            ? "border-primary-500 ring-2 ring-primary-200"
                            : "border-neutral-200"
                        }`}
                        onClick={() =>
                          isEditing &&
                          setEditedUserData({
                            ...editedUserData,
                            theme: "light",
                          })
                        }
                      >
                        <div className="h-20 bg-white border border-neutral-200 rounded-md mb-2 flex items-center justify-center">
                          <TbColorSwatch className="h-8 w-8 text-primary-500" />
                        </div>
                        <div className="text-center text-sm font-medium">
                          Light
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-3 cursor-pointer ${
                          (isEditing
                            ? editedUserData.theme
                            : userData.theme) === "dark"
                            ? "border-primary-500 ring-2 ring-primary-200"
                            : "border-neutral-200"
                        }`}
                        onClick={() =>
                          isEditing &&
                          setEditedUserData({
                            ...editedUserData,
                            theme: "dark",
                          })
                        }
                      >
                        <div className="h-20 bg-neutral-800 border border-neutral-700 rounded-md mb-2 flex items-center justify-center">
                          <TbColorSwatch className="h-8 w-8 text-primary-400" />
                        </div>
                        <div className="text-center text-sm font-medium">
                          Dark
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-3 cursor-pointer ${
                          (isEditing
                            ? editedUserData.theme
                            : userData.theme) === "system"
                            ? "border-primary-500 ring-2 ring-primary-200"
                            : "border-neutral-200"
                        }`}
                        onClick={() =>
                          isEditing &&
                          setEditedUserData({
                            ...editedUserData,
                            theme: "system",
                          })
                        }
                      >
                        <div className="h-20 bg-gradient-to-r from-white to-neutral-800 border border-neutral-200 rounded-md mb-2 flex items-center justify-center">
                          <TbDevices className="h-8 w-8 text-primary-500" />
                        </div>
                        <div className="text-center text-sm font-medium">
                          System
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === "system" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary-700 mb-4">
                  System Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      System Information
                    </h3>
                    <div className="bg-neutral-50 rounded-md p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-500">
                            System Version:
                          </span>
                          <span className="text-neutral-900 ml-2">1.0.0</span>
                        </div>
                        <div>
                          <span className="text-neutral-500">
                            Last Updated:
                          </span>
                          <span className="text-neutral-900 ml-2">
                            August 15, 2023
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500">
                            Database Status:
                          </span>
                          <span className="text-green-600 ml-2 flex items-center">
                            <TbCheck className="h-4 w-4 mr-1" /> Connected
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500">
                            Email Service:
                          </span>
                          <span className="text-green-600 ml-2 flex items-center">
                            <TbCheck className="h-4 w-4 mr-1" /> Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Data Management
                    </h3>
                    <div className="space-y-3">
                      <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 text-sm font-medium flex items-center">
                        <TbRefresh className="mr-2 h-5 w-5" /> Sync Data
                      </button>
                      <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 text-sm font-medium flex items-center">
                        <TbTrash className="mr-2 h-5 w-5 text-red-500" /> Clear
                        Cache
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="text-sm font-medium text-neutral-900 mb-3">
                      Legal
                    </h3>
                    <div className="space-y-3">
                      <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 text-sm font-medium w-full text-left">
                        Terms of Service
                      </button>
                      <button className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 text-sm font-medium w-full text-left">
                        Privacy Policy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
