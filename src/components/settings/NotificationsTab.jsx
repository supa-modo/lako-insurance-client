import React from "react";
import { motion } from "framer-motion";
import {
  TbBell,
  TbMail,
  TbDeviceMobile,
  TbMessage,
  TbShieldCheck,
} from "react-icons/tb";
import { FaSave } from "react-icons/fa";

const NotificationsTab = ({
  notificationSettings,
  handleNotificationChange,
  showSuccess,
}) => {
  const notificationTypes = [
    {
      key: "emailNotifications",
      label: "Email Notifications",
      description: "Receive general notifications and updates via email",
      icon: TbMail,
      color: "blue",
    },
    {
      key: "pushNotifications",
      label: "Push Notifications",
      description:
        "Browser and mobile push notifications for real-time updates",
      icon: TbDeviceMobile,
      color: "green",
    },
    {
      key: "smsNotifications",
      label: "SMS Notifications",
      description: "Text message notifications for urgent matters and alerts",
      icon: TbMessage,
      color: "purple",
    },
    {
      key: "securityAlerts",
      label: "Security Alerts",
      description: "Important security-related notifications and warnings",
      icon: TbShieldCheck,
      color: "red",
    },
  ];

  const getColorClasses = (color, enabled) => {
    const colors = {
      blue: enabled
        ? "bg-blue-50 border-blue-200 text-blue-800"
        : "bg-slate-50 border-slate-200 text-slate-700",
      green: enabled
        ? "bg-green-50 border-green-200 text-green-800"
        : "bg-slate-50 border-slate-200 text-slate-700",
      purple: enabled
        ? "bg-purple-50 border-purple-200 text-purple-800"
        : "bg-slate-50 border-slate-200 text-slate-700",
      red: enabled
        ? "bg-red-50 border-red-200 text-red-800"
        : "bg-slate-50 border-slate-200 text-slate-700",
    };
    return colors[color];
  };

  const getIconColorClass = (color, enabled) => {
    const colors = {
      blue: enabled ? "text-blue-600" : "text-slate-400",
      green: enabled ? "text-green-600" : "text-slate-400",
      purple: enabled ? "text-purple-600" : "text-slate-400",
      red: enabled ? "text-red-600" : "text-slate-400",
    };
    return colors[color];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Notification Settings */}
      <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {notificationTypes.map((item, index) => {
            const isEnabled = notificationSettings[item.key];
            const IconComponent = item.icon;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${getColorClasses(
                  item.color,
                  isEnabled
                )}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <IconComponent
                        className={`w-6 h-6 ${getIconColorClass(
                          item.color,
                          isEnabled
                        )}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{item.label}</h4>
                      <p className="text-sm mt-1 opacity-80">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name={item.key}
                      checked={isEnabled}
                      onChange={handleNotificationChange}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-600 shadow-sm"></div>
                  </label>
                </div>

                {/* Status Indicator */}
                <div className="mt-4 pt-4 border-t border-current border-opacity-20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isEnabled ? "bg-current" : "bg-slate-400"
                        }`}
                      ></div>
                      <span className="text-sm font-medium">
                        {isEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    {isEnabled && (
                      <span className="text-xs px-2 py-1 bg-current bg-opacity-20 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-8 pt-6 border-t border-slate-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              showSuccess("Notification preferences saved successfully")
            }
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
          >
            <FaSave className="w-5 h-5" />
            <span>Save Preferences</span>
          </motion.button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <TbBell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">
              About Notifications
            </h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                Email notifications are sent to your registered email address
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                Push notifications require browser permission
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                Security alerts are highly recommended and cannot be disabled
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                You can change these settings anytime
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationsTab;
