import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { TbLock, TbLoader } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

const AuthGuard = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { user, loading: authLoading, initializeAuth } = useAuth();

  useEffect(() => {
    // Initialize auth when AuthGuard is accessed (admin routes)
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 text-primary-600">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 bg-primary-600/20 backdrop-blur-md rounded-xl border border-primary-600/20 shadow-2xl max-w-md"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary-600 backdrop-blur-sm flex items-center justify-center">
              <TbLoader className="h-8 w-8 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary-600 mb-3 font-outfit">
            Authenticating
          </h2>
          <p className="text-gray-600 font-outfit">
            Verifying your access credentials...
          </p>

          <div className="mt-6 flex justify-center">
            <div className="bg-gray-100 h-1.5 w-36 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login with return path
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
