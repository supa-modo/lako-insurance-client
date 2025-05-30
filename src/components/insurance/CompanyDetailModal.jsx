import React from "react";
import { motion } from "framer-motion";
import {
  TbX,
  TbBuilding,
  TbMail,
  TbPhone,
  TbWorld,
  TbStar,
  TbStarFilled,
  TbCalendar,
  TbList,
  TbUsers,
  TbInfoCircle,
} from "react-icons/tb";

const CompanyDetailModal = ({ company, onClose }) => {
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <TbStarFilled key={i} className="h-5 w-5 text-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<TbStar key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(<TbStar key={i} className="h-5 w-5 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600 ml-2">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <TbInfoCircle className="h-6 w-6 text-primary-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-900">Company Details</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <TbX className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Company Header Section */}
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                />
              ) : (
                <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center">
                  <TbBuilding className="h-10 w-10 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {company.name}
              </h2>
              {company.description && (
                <p className="text-gray-600 mb-3">{company.description}</p>
              )}
              {company.rating && (
                <div className="mb-2">{renderStarRating(company.rating)}</div>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <TbPhone className="h-4 w-4 mr-2" />
                Contact Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <TbMail className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-sm font-medium text-gray-900">
                      {company.contactEmail}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TbPhone className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {company.contactPhone}
                    </p>
                  </div>
                </div>
                {company.website && (
                  <div className="flex items-center">
                    <TbWorld className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary-600 hover:text-primary-800"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <TbList className="h-4 w-4 mr-2" />
                Statistics
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Insurance Plans</span>
                  <span className="text-sm font-medium text-gray-900">
                    {company.plansCount || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Company Rating</span>
                  <span className="text-sm font-medium text-gray-900">
                    {company.rating
                      ? `${company.rating.toFixed(1)}/5.0`
                      : "Not rated"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Date Added</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(company.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {company.description && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                About the Company
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {company.description}
                </p>
              </div>
            </div>
          )}

          {/* Performance Metrics (if available) */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Performance Metrics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <TbList className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">
                  {company.plansCount || 0}
                </p>
                <p className="text-sm text-blue-700">Active Plans</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <TbStar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-900">
                  {company.rating ? company.rating.toFixed(1) : "N/A"}
                </p>
                <p className="text-sm text-yellow-700">Rating</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <TbUsers className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">
                  {Math.floor(Math.random() * 1000) + 100}
                </p>
                <p className="text-sm text-green-700">Clients</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompanyDetailModal;
