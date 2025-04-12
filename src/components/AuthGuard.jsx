import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getAdminProfile } from "../services/adminService";
import { motion } from "framer-motion";
import { TbLock, TbLoader } from "react-icons/tb";

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);

        // Check if we have a valid token
        if (!isAuthenticated()) {
          setAuthenticated(false);
          return;
        }

        // Verify token is valid by getting user profile
        await getAdminProfile();
        setAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl max-w-md"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <TbLoader className="h-8 w-8 text-secondary-400 animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 font-outfit">
            Authenticating
          </h2>
          <p className="text-white/70 font-outfit">
            Verifying your access credentials...
          </p>

          <div className="mt-6 flex justify-center">
            <div className="bg-white/10 h-1.5 w-36 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-secondary-400 to-primary-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!authenticated) {
    // Redirect to login with return path
    return <Navigate to="/admin" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
