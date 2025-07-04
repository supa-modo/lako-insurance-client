import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TbLock,
  TbLoader,
  TbShieldCheck,
  TbUserOff,
  TbArrowBackUp,
} from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import { RiUserUnfollowLine } from "react-icons/ri";

const SuperAdminGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user, loading: authLoading, initializeAuth } = useAuth();

  useEffect(() => {
    // Initialize auth when SuperAdminGuard is accessed
    const init = async () => {
      await initializeAuth();
      setLoading(false);
    };

    init();
  }, [initializeAuth]);

  useEffect(() => {
    // If auth context is done loading, update our local loading state
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-50 text-red-600">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 bg-red-600/20 backdrop-blur-md rounded-xl border border-red-600/20 shadow-2xl max-w-md"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-red-600 backdrop-blur-sm flex items-center justify-center">
              <TbLoader className="h-8 w-8 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-3 font-outfit">
            Verifying SuperAdmin Access
          </h2>
          <p className="text-gray-600 font-outfit">
            Checking administrative privileges...
          </p>

          <div className="mt-6 flex justify-center">
            <div className="bg-gray-100 h-1.5 w-36 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-red-400 to-red-600"
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    console.log("🛡️ SuperAdminGuard: No user found, redirecting to login");
    // Redirect to login with return path
    return (
      <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
    );
  }

  console.log("🛡️ SuperAdminGuard: User found:", {
    id: user?.id,
    email: user?.email,
    role: user?.role,
  });

  // Check if user has SuperAdmin role
  if (user.role !== "superadmin") {
    console.log("🛡️ SuperAdminGuard: Access denied - user role is:", user.role);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900  to-red-900 flex items-center justify-center p-4">
        {/* Security warning background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v2.5zm0 2.5v2H0v2h20v-2.5zm10 0V23H40v-2H30v2.5zM40 22H20v-2h20v2z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 bg-red-300 rounded-xl shadow-lg max-w-lg relative z-10"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <RiUserUnfollowLine className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-3 font-outfit">
            Access Denied !!
          </h2>
          <p className="text-gray-600 font-outfit mb-6">
            You don't have SuperAdmin privileges to access this page. Please
            contact your System Admin for assistance.
          </p>

          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="border border-red-700 text-red-700 font-medium px-6 py-2 rounded-lg hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <TbArrowBackUp size={22} className="" />
                <span>Go Back</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  console.log("🛡️ SuperAdminGuard: Access granted - user has superadmin role");
  return <>{children}</>;
};

export default SuperAdminGuard;
