import { useState } from "react";
import { Link } from "react-router-dom";
import {
  TbBell,
  TbUser,
  TbLogout,
  TbSettings,
  TbHeartHandshake,
  TbMenu2,
  TbX,
  TbChevronDown,
  TbSearch,
  TbMoon,
  TbBrandGmail,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New query received",
      message: "John Mwangi submitted a new insurance query",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Report generated",
      message: "Generated report #5423 for Mary Kamau",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "System update",
      message: "The system will undergo maintenance tonight",
      time: "3 hours ago",
      read: true,
    },
  ];

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  return (
    <header className="h-16 z-30 relative">
      <div className="absolute inset-0 backdrop-blur-md bg-white/5 border-b border-white/10"></div>
      <div className="relative flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left section with logo and toggle */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
          </button>

          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-secondary-500/20 flex items-center justify-center">
              <TbHeartHandshake className="h-5 w-5 text-secondary-400" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block font-outfit">
              SeniorCare
              <span className="text-secondary-400 ml-1">Admin</span>
            </span>
          </Link>
        </div>

        {/* Center - search bar (hidden on small screens) */}
        <div className="hidden md:block max-w-xl w-full mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <TbSearch className="h-5 w-5 text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search clients, plans, reports..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 focus:bg-white/20 
              text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary-400 font-outfit text-sm"
            />
          </div>
        </div>

        {/* Right section with icons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Dark mode toggle (decorative for now) */}
          <button className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <TbMoon size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
              <TbBell size={20} />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 bg-secondary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-neutral-800 rounded-lg shadow-xl border border-white/10 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <button className="text-xs text-secondary-400 hover:text-secondary-300">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                          notification.read ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-white">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-secondary-500"></span>
                          )}
                        </div>
                        <p className="text-xs text-white/70 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-white/50 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-white/10">
                    <Link
                      to="/admin/notifications"
                      className="text-xs text-secondary-400 hover:text-secondary-300 flex justify-center"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center space-x-2 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Profile menu"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-secondary-500 to-primary-600 flex items-center justify-center shadow-md">
                <TbUser className="h-5 w-5 text-white" />
              </div>
              <span className="hidden md:block font-medium text-sm">Admin</span>
              <TbChevronDown className="h-4 w-4 hidden md:block" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-neutral-800 rounded-lg shadow-xl border border-white/10 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-medium text-white">Admin User</p>
                    <p className="text-xs text-white/60">
                      admin@seniorcare.com
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center"
                    >
                      <TbUser className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center"
                    >
                      <TbSettings className="mr-2 h-4 w-4" />
                      System Settings
                    </Link>
                    <Link
                      to="/admin/mail"
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center"
                    >
                      <TbBrandGmail className="mr-2 h-4 w-4" />
                      Email Center
                    </Link>
                  </div>

                  <div className="border-t border-white/10 mt-1 pt-1">
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors flex items-center"
                    >
                      <TbLogout className="mr-2 h-4 w-4" />
                      Sign Out
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
