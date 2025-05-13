import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size and manage sidebar state accordingly
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-primary-800 via-primary-800 to-primary-900  text-white font-lexend">
      {/* Header */}
      <AdminHeader
        toggleSidebarCollapse={toggleSidebarCollapse}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed position */}
        <motion.div
          initial={{ width: isMobile ? 80 : 280 }}
          animate={{
            width: sidebarCollapsed ? 80 : 280,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="z-20 h-[calc(100vh-54px)] fixed top-14"
        >
          <AdminSidebar collapsed={sidebarCollapsed} />
        </motion.div>

        {/* Main content - scrollable */}
        <motion.main
          className="flex-1 overflow-y-auto bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100"
          animate={{
            marginLeft: isMobile ? 0 : sidebarCollapsed ? "80px" : "280px",
            width: isMobile
              ? "100%"
              : sidebarCollapsed
              ? "calc(100% - 80px)"
              : "calc(100% - 280px)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className=" min-h-[calc(100vh-4rem)]">
            {/* Main content */}
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default AdminLayout;
