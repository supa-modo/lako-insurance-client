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
  TbEdit,
  TbTrash,
  TbSend,
  TbBrandWhatsapp,
  TbCalendarPlus,
  TbMessage2Star,
} from "react-icons/tb";

const CompanyDetailModal = ({ company, onClose, onEdit, onDelete }) => {
  const renderStarRating = (rating) => {
    // Ensure rating is a valid number
    const numericRating =
      typeof rating === "number" ? rating : parseFloat(rating);
    if (isNaN(numericRating)) {
      return (
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <TbStar key={i} className="h-4 w-4 text-gray-300" />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">No rating</span>
        </div>
      );
    }

    const stars = [];
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 !== 0;

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
          ({numericRating.toFixed(1)})
        </span>
      </div>
    );
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
          </div>
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbInfoCircle className="h-6 w-6 text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Company Details
                </h2>
                <p className="text-white/80 text-sm">
                  View complete company information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
            >
              <TbX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-84px)]">
          {/* Company Summary */}
          <div className="py-5 px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      <TbBuilding className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-primary-700 mb-1">
                    {company.name}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="mr-4">Insurance Company</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                  {company.rating && (
                    <div className="flex items-center">
                      {renderStarRating(company.rating)}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-neutral-100 rounded-lg px-6 py-3">
                <p className="text-xs text-gray-500 mb-1">Total Plans</p>
                <div className="text-lg font-bold text-gray-700">
                  {company.plansCount || 0}
                  <span className="block text-xs font-normal text-gray-500">
                    Insurance Plans
                  </span>
                </div>
              </div>
            </div>

            {company.description && (
              <div className="mt-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {company.description}
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="py-5 px-6 border-b border-gray-200">
            <h3 className="font-semibold text-primary-700 mb-4 flex items-center">
              <TbMail className="mr-2 h-5 w-5" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="flex items-start">
                <div className="mt-0.5 text-gray-400">
                  <TbMail className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Email Address</div>
                  <div className="text-gray-700 font-medium">
                    {company.contactEmail}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-0.5 text-gray-400">
                  <TbPhone className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Phone Number</div>
                  <div className="text-gray-700 font-medium">
                    {company.contactPhone}
                  </div>
                </div>
              </div>

              {company.website && (
                <div className="flex items-start">
                  <div className="mt-0.5 text-gray-400">
                    <TbWorld className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <div className="text-xs text-gray-500">Website</div>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Company Statistics */}
          <div className="py-5 px-6 border-b border-gray-200">
            <h3 className="font-semibold text-primary-700 mb-4 flex items-center">
              <TbList className="mr-2 h-5 w-5" />
              Company Statistics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <TbList className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-blue-900">
                  {company.plansCount || 0}
                </p>
                <p className="text-sm text-blue-700">Active Plans</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <TbStar className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-yellow-900">
                  {company.rating ? company.rating.toFixed(1) : "N/A"}
                </p>
                <p className="text-sm text-yellow-700">Rating</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <TbCalendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-green-900">
                  {new Date(company.createdAt).getFullYear()}
                </p>
                <p className="text-sm text-green-700">Year Added</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 border-b border-gray-200">
            <div className="py-3 text-sm text-gray-500">Quick Actions</div>
            <div className="pb-5 flex flex-wrap gap-2 font-medium">
              {onEdit && (
                <button
                  onClick={() => onEdit(company)}
                  className="border hover:bg-blue-50 text-blue-600 border-blue-200 px-6 py-2 rounded-lg flex items-center transition-colors text-sm"
                >
                  <TbEdit className="mr-2 w-4 h-4" /> Edit Company
                </button>
              )}
              <button className="border hover:bg-gray-50 text-gray-600 border-gray-200 px-6 py-2 rounded-lg flex items-center transition-colors text-sm">
                <TbSend className="mr-2 w-4 h-4" /> Send Email
              </button>
              <button className="border hover:bg-green-50 text-green-600 border-green-200 px-6 py-2 rounded-lg flex items-center transition-colors text-sm">
                <TbBrandWhatsapp className="mr-2 w-4 h-4" /> WhatsApp
              </button>
              <button className="border hover:bg-gray-50 text-gray-600 border-gray-200 px-6 py-2 rounded-lg flex items-center transition-colors text-sm">
                <TbPhone className="mr-2 w-4 h-4" /> Call
              </button>
              <button className="border hover:bg-yellow-50 text-yellow-600 border-yellow-200 px-6 py-2 rounded-lg flex items-center transition-colors text-sm">
                <TbCalendarPlus className="mr-2 w-4 h-4" /> Schedule Meeting
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(company.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 border border-red-200 px-6 py-2 rounded-lg flex items-center transition-colors text-sm"
                >
                  <TbTrash className="mr-2 w-4 h-4" /> Delete
                </button>
              )}
            </div>
          </div>

          {/* Company Notes */}
          <div className="py-5 px-6">
            <h3 className="font-semibold text-primary-700 mb-3 flex items-center">
              <TbMessage2Star className="mr-2 h-5 w-5" />
              Company Notes
            </h3>
            <div className="bg-neutral-100 rounded-lg px-4 py-3 min-h-[100px]">
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {company.description ||
                  "No additional notes available for this company."}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyDetailModal;
