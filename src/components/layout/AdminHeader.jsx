import { FiHeart, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { useState } from "react";

const AdminHeader = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-soft h-16 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FiHeart className="h-7 w-7 text-primary-500" />
        <span className="text-lg font-heading font-bold text-gray-900">
          SeniorCare Admin
        </span>
      </div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            className="text-gray-600 hover:text-primary-500 transition-colors p-2"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="Profile menu"
          >
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
              <FiUser className="h-4 w-4 text-primary-500" />
            </div>
            <span className="font-medium hidden md:block">Admin User</span>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-card py-1 z-10">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Profile Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Help & Support
              </a>
              <div className="border-t border-gray-200 my-1"></div>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
