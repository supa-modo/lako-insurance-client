import React from "react";
import { motion } from "framer-motion";
import {
  TbDownload,
  TbFileSpreadsheet,
  TbFileText,
  TbChevronRight,
  TbCheck,
  TbX,
  TbArrowRight,
} from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa6";

const DownloadReport = ({
  onDownloadPdf,
  onDownloadCsv,
  onDownloadText,
  downloadStatus,
}) => {
  // Status messages for different download states
  const statusMessages = {
    loading: "Preparing your download...",
    success: "Download complete!",
    error: "Download failed. Please try again.",
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 relative"
    >
  
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-5 py-4 relative z-10">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <TbDownload className="mr-2" /> Download Comparison Report
        </h3>
      </div>

      <div className="p-5 relative z-10">
        <p className="text-gray-700 text-sm mb-5 font-outfit">
          Download this comparison in your preferred format for future reference
          or to share with others.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <DownloadButton
            icon={<FaFilePdf size={20} />}
            label="PDF Report"
            description="Complete report with all details"
            onClick={onDownloadPdf}
            isLoading={downloadStatus === "pdf-loading"}
            isSuccess={downloadStatus === "pdf-success"}
            variants={itemVariants}
          />

          <DownloadButton
            icon={<TbFileSpreadsheet size={20} />}
            label="Excel/CSV"
            description="Spreadsheet format for analysis"
            onClick={onDownloadCsv}
            isLoading={downloadStatus === "csv-loading"}
            isSuccess={downloadStatus === "csv-success"}
            variants={itemVariants}
          />

          <DownloadButton
            icon={<TbFileText size={20} />}
            label="Plain Text"
            description="Simple text format"
            onClick={onDownloadText}
            isLoading={downloadStatus === "text-loading"}
            isSuccess={downloadStatus === "text-success"}
            variants={itemVariants}
          />
        </div>

        {downloadStatus && downloadStatus.includes("loading") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-blue-50 text-blue-700 px-4 py-2.5 rounded-lg text-sm flex items-center border border-blue-100"
          >
            <div className="w-4 h-4 mr-2 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            {statusMessages.loading}
          </motion.div>
        )}

        {downloadStatus && downloadStatus.includes("success") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-green-50 text-green-700 px-4 py-2.5 rounded-lg text-sm flex items-center border border-green-100"
          >
            <TbCheck className="mr-2" />
            {statusMessages.success}
          </motion.div>
        )}

        {downloadStatus && downloadStatus.includes("error") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-50 text-red-700 px-4 py-2.5 rounded-lg text-sm flex items-center border border-red-100"
          >
            <TbX className="mr-2" />
            {statusMessages.error}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Button component for each download option
const DownloadButton = ({
  icon,
  label,
  description,
  onClick,
  isLoading,
  isSuccess,
  variants,
}) => {
  return (
    <motion.button
      variants={variants}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      disabled={isLoading}
      className={`relative flex items-center justify-between p-3.5 rounded-lg border text-left transition-all duration-300 overflow-hidden group ${
        isLoading
          ? "bg-gray-50 border-gray-300 cursor-wait"
          : isSuccess
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-white border-gray-200 hover:border-primary-400 hover:bg-primary-50 hover:shadow-md"
      }`}
    >
      {/* Background decoration for success state */}
      {isSuccess && <div className="absolute inset-0 bg-green-500/10"></div>}

      <div className="flex items-center relative z-10">
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center mr-3 ${
            isLoading
              ? "bg-gray-200"
              : isSuccess
              ? "bg-green-100 text-green-600"
              : "bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600"
          }`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : isSuccess ? (
            <TbCheck size={20} />
          ) : (
            icon
          )}
        </div>
        <div>
          <div
            className={`font-medium ${
              isSuccess ? "text-green-700" : "text-gray-800"
            }`}
          >
            {label}
          </div>
          <div
            className={`text-xs ${
              isSuccess ? "text-green-600" : "text-gray-500"
            }`}
          >
            {description}
          </div>
        </div>
      </div>

      {!isLoading && !isSuccess && (
        <TbArrowRight className="text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
      )}

      {isSuccess && (
        <div className="bg-green-100 h-6 w-6 rounded-full flex items-center justify-center">
          <TbCheck className="text-green-600" size={14} />
        </div>
      )}
    </motion.button>
  );
};

export default DownloadReport;
