import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiAlertTriangle } from "react-icons/fi";
import Footer from "../../components/layout/Footer";
import { TbAlertTriangle, TbHomeDot } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <>
      <div className=" bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden font-outfit">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary-500/30 rounded-full filter blur-3xl opacity-20 transform translate-y-1/4 translate-x-[-30%]"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-400/40 rounded-full filter blur-xl opacity-30 animate-float"></div>

        {/* Glass panels */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hidden lg:block"></div>

        <div className="md:container-custom mx-auto px-4 sm:px-6 py-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-2 text-sm">
              <Link
                to="/"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <span className="text-neutral-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <span className="text-white font-medium">Page Not Found</span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center min-h-[65vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-xl p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/30 rounded-full mb-3">
                <TbAlertTriangle className="text-red-400 h-10 w-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                404 Error - Page Not Found
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base mb-8">
                We couldn't find the page you're looking for. The page might
                have been moved or doesn't exist.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white  text-sm sm:text-base font-medium rounded-lg shadow-md transition-all font-outfit"
                >
                  <TbHomeDot className="mr-2" size={20} /> Return Home
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Additional decorative elements for visual interest */}
        <div className="absolute bottom-20 right-40 w-64 h-1 bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent transform rotate-45 hidden lg:block"></div>
        <div className="absolute top-40 left-20 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform -rotate-45 hidden lg:block"></div>
      </div>

      <Footer />
    </>
  );
};

export default PageNotFound;
