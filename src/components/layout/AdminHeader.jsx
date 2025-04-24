import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TbBell,
  TbUser,
  TbLogout,
  TbSettings,
  TbChevronDown,
  TbSearch,
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
  TbMessageDots,
  TbCalendarEvent,
  TbChartLine,
  TbShield,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { PiSignOutBold, PiUserDuotone } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const AdminHeader = ({ toggleSidebarCollapse, sidebarCollapsed }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userData = user?.user || {};
  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const username = firstName && lastName ? `${firstName} ${lastName}` : "Admin";

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New query received",
      message: "John Mwangi submitted a new insurance quote request",
      time: "5 minutes ago",
      read: false,
      type: "query",
      priority: "high",
    },
    {
      id: 2,
      title: "Renewal alert",
      message: "Mary Kamau's policy #KS-243 expires in 14 days",
      time: "1 hour ago",
      read: false,
      type: "renewal",
      priority: "medium",
    },
    {
      id: 3,
      title: "Lead converted",
      message: "David Otieno has subscribed to Senior Gold Plan",
      time: "2 hours ago",
      read: false,
      type: "conversion",
      priority: "low",
    },
    {
      id: 4,
      title: "System update",
      message: "CRM will undergo scheduled maintenance tonight",
      time: "3 hours ago",
      read: true,
      type: "system",
      priority: "medium",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "query":
        return <TbMessageDots className="text-secondary-400" />;
      case "renewal":
        return <TbCalendarEvent className="text-yellow-500" />;
      case "conversion":
        return <TbChartLine className="text-green-500" />;
      case "system":
        return <TbSettings className="text-blue-400" />;
      default:
        return <TbBell className="text-white/70" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <header className="h-16 z-30 relative">
      <div className="absolute inset-0 backdrop-blur-md bg-white/5 border-b border-white/10"></div>
      <div className="relative flex items-center justify-between h-full px-4 pr-6">
        {/* Left section with logo and toggle */}
        <div className="flex items-center space-x-4">
          {/* Collapse/Expand sidebar toggle */}
          <button
            onClick={toggleSidebarCollapse}
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? (
              <TbLayoutSidebarRightCollapse size={28} />
            ) : (
              <TbLayoutSidebarLeftCollapse size={28} />
            )}
          </button>

          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <img
              src="/lako-logo.png"
              alt="Lako Insurance CRM"
              className="w-24 h-16"
            />
            <span className="text-secondary-500 font-paytone text-[2.05rem] leading-none tracking-wide mb-3 font-bold">
              admin
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
              text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary-400 font-lexend text-sm"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-white/30 font-lexend">
              Press / to search
            </div>
          </div>
        </div>

        {/* Right section with notification and profile */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/20"
              aria-label="Notifications"
            >
              <TbBell size={25} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2.5 bg-secondary-500  text-sm font-bold rounded-full h-2.5 w-2.5 flex items-center justify-center shadow-lg"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-3 w-[360px] bg-gray-600 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-medium text-white font-lexend text-sm tracking-wide">
                      Notifications
                    </h3>
                    <button className="text-xs text-secondary-400 hover:text-secondary-300 font-lexend transition-colors">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                            notification.read ? "opacity-60" : ""
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="relative flex-shrink-0">
                              <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center mr-3">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <span
                                className={`absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ${getPriorityColor(
                                  notification.priority
                                )} ring-2 ring-neutral-800`}
                              ></span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-medium text-white font-lexend truncate pr-2">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <span className="h-2 w-2 rounded-full bg-secondary-500 mt-1 flex-shrink-0"></span>
                                )}
                              </div>
                              <p className="text-xs text-white/70 mb-1 font-lexend line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-white/50 font-lexend">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-sm text-white/60 font-lexend">
                          No notifications
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2.5 border-t border-white/10">
                    <Link
                      to="/admin/notifications"
                      className="text-xs text-secondary-400 hover:text-secondary-300 flex justify-center font-lexend transition-colors"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-1 px-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg overflow-hidden">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user?.username || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PiUserDuotone className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium">{username}</div>
              </div>
              <TbChevronDown
                className={`h-4 w-4 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile dropdown menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 mt-1 w-60 bg-primary-800/95 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                >
                  <div className="py-1.5">
                    <Link
                      to="/admin/profile"
                      className=" px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center font-lexend"
                    >
                      <TbUser className="mr-2.5 h-4 w-4 text-secondary-400" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/admin/settings"
                      className=" px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors flex items-center font-lexend"
                    >
                      <TbSettings className="mr-2.5 h-4 w-4 text-secondary-400" />
                      System Settings
                    </Link>
                  </div>

                  <div className="border-t border-white/10 mt-1 p-2">
                    <Link
                      // to="/admin"
                      onClick={handleLogout}
                      className=" px-3 py-2 text-sm text-white/90 bg-white/10 hover:bg-red-500/60 group rounded-lg transition-colors flex items-center font-lexend"
                    >
                      <FiLogOut className="mr-2.5 h-5 w-5 text-red-400 group-hover:text-white/90" />
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
