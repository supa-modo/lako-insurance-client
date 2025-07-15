import React from "react";
import { motion } from "framer-motion";
import {
  TbMail,
  TbPhone,
  TbEdit,
  TbMailFilled,
  TbPhoneCall,
} from "react-icons/tb";
import { FaSave } from "react-icons/fa";

const ProfileTab = ({
  profileData,
  handleProfileChange,
  errors,
  isEditing,
  setIsEditing,
  handleSaveProfile,
  handleCancelEdit,
  loading,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Profile Form */}
      <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              First Name *
            </label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleProfileChange}
                className={`w-full px-4 py-3 border rounded-lg bg-neutral-200 focus:ring-1 text-slate-700 font-semibold focus:outline-none focus:ring-secondary-600 focus:border-secondary-600 transition-all duration-200 ${
                  errors.firstName
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="Enter your first name"
              />
            ) : (
              <div className="px-4 py-3 bg-slate-100 border-2 focus:outline-none border-slate-200 rounded-lg text-slate-700 font-medium">
                {profileData.firstName || "Not set"}
              </div>
            )}
            {!errors.firstName && (
              <p className="text-red-600 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.firstName} This is an example test error message display
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Last Name *
            </label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleProfileChange}
                className={`w-full px-4 py-3 border rounded-lg bg-neutral-200 focus:ring-1 text-slate-700 font-semibold focus:outline-none focus:ring-secondary-600 focus:border-secondary-600 transition-all duration-200 ${
                  errors.lastName
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="Enter your last name"
              />
            ) : (
              <div className="px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-lg text-slate-700 font-medium">
                {profileData.lastName || "Not set"}
              </div>
            )}
            {errors.lastName && (
              <p className="text-red-600 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2 hover:cursor-not-allowed">
            <label className="block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className="px-4 py-3 bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-200 rounded-lg text-slate-700 flex items-center">
              <TbMailFilled className="w-5 h-5 mr-3 text-secondary-600" />
              <span className="font-medium">{profileData.email}</span>
            </div>
            <p className="text-xs text-slate-500 flex items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
              Email cannot be changed. Contact administrator if needed.
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                className={`w-full px-4 py-3 border rounded-lg bg-neutral-200 focus:ring-1 text-slate-700 font-semibold focus:outline-none focus:ring-secondary-600 focus:border-secondary-600 transition-all duration-200 ${
                  errors.phone
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                placeholder="Enter your phone number"
              />
            ) : (
              <div className="px-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-lg text-slate-700 flex items-center">
                <TbPhoneCall className="w-5 h-5 mr-3 text-secondary-600" />
                <span className="font-medium">
                  {profileData.phone || "Not set"}
                </span>
              </div>
            )}
            {errors.phone && (
              <p className="text-red-600 text-sm flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                {errors.phone}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Account Role
            </label>
            <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200 rounded-xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-600 text-white capitalize">
                {profileData.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
              Role is managed by administrators.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-slate-200"
          >
            <button
              onClick={handleCancelEdit}
              disabled={loading}
              className="px-6 py-2.5 text-slate-600 border-2 border-slate-300 rounded-[0.7rem] focus:outline-none hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 disabled:opacity-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="px-8 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 border-2 border-primary-600 text-white rounded-[0.7rem] hover:from-primary-700 hover:to-primary-800 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <FaSave className="w-4 h-4" />
              )}
              <span>Save Changes</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileTab;
