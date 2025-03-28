import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size and manage sidebar state accordingly
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Header */}
      <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - shown/hidden based on sidebarOpen state */}
        <motion.div
          initial={{ x: isMobile ? -280 : 0 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed lg:relative z-20 h-[calc(100vh-64px)]"
        >
          <AdminSidebar />
        </motion.div>

        {/* Mobile overlay - only visible when sidebar is open on mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <motion.main
          className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 transition-all duration-300 ${
            sidebarOpen && !isMobile ? "ml-0" : "ml-0"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 sm:p-6 md:p-8 shadow-2xl min-h-[calc(100vh-7rem)]">
            {/* Main content */}
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
