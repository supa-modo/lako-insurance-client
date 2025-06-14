import React, { useState, useEffect } from "react";
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
  TbExternalLink,
  TbBuildingBank,
  TbAddressBook,
  TbPhoneCall,
  TbMailFilled,
  TbShield,
  TbCurrencyDollar,
  TbClock,
  TbLoader,
  TbShieldHalfFilled,
  TbLoader2,
  TbShieldX,
} from "react-icons/tb";
import { PiUserDuotone } from "react-icons/pi";
import insuranceService from "../../services/insuranceService";

const CompanyDetailModal = ({ company, onClose, onEdit, onDelete }) => {
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [error, setError] = useState(null);

  // Fetch company plans
  const fetchCompanyPlans = async () => {
    try {
      setLoadingPlans(true);
      const response = await insuranceService.getCompanyPlans(company.id);

      if (response && response.success) {
        setPlans(response.data || []);
      } else {
        setError("Failed to fetch company plans");
      }
    } catch (err) {
      console.error("Error fetching company plans:", err);
      setError("Failed to fetch company plans");
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    if (company?.id) {
      fetchCompanyPlans();
    }
  }, [company?.id]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-[730px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4 relative">
          <div className="relative flex justify-between items-center z-10">
            <div className="flex items-center">
              <TbBuilding size={40} className=" text-white mr-3" />
              <div>
                <h2 className="text-white font-semibold text-lg font-lexend">
                  Insurance Company Details
                </h2>
                <p className="text-white/80 text-sm">
                  View complete Insurance companies' information and their plans
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
        <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-110px)] flex flex-col">
          <div className="overflow-y-auto  flex-1 px-3 md:px-6 py-5">
            <div className="space-y-6">
              {/* Company Summary */}
              <div className="">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbBuildingBank size={20} className="mr-2 text-primary-600" />
                  Company Overview
                </h3>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="h-14 md:h-20 w-48 overflow-hidden flex-shrink-0">
                        {company.logoUrl ? (
                          <img
                            src={company.logoUrl}
                            alt={company.name}
                            className="h-full w-full object-contain"
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
                          <span className="px-4 py-0.5 bg-green-100 border border-green-300 text-green-700 rounded-full text-xs font-medium">
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

                    <div className="bg-white rounded-lg px-6 py-3 border border-gray-200 shadow-sm">
                      <div className="text-lg text-center font-bold text-gray-700">
                        <span className="text-2xl font-bold text-green-600">
                          {company.plansCount || 0}
                        </span>
                        <span className="block text-xs font-normal text-gray-500">
                          Plans Avalilable
                        </span>
                      </div>
                    </div>
                  </div>

                  {company.description && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {company.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbAddressBook size={20} className="mr-2 text-primary-600" />
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 gap-3 text-sm bg-gray-50 rounded-xl px-8 border border-gray-200">
                  <div className="py-4 px-3 border-b border-gray-200">
                    <div className="flex items-start">
                      <div className="mt-0.5 text-gray-400">
                        <TbMailFilled className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-500">
                          Email Address
                        </div>
                        <div className="text-gray-700 font-medium">
                          {company.contactEmail}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pb-4 px-3 border-b border-gray-200">
                    <div className="flex items-start">
                      <div className="mt-0.5 text-gray-400">
                        <TbPhoneCall className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-500">
                          Phone Number
                        </div>
                        <div className="text-gray-700 font-medium">
                          {company.contactPhone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {company.website && (
                    <div className="pb-4 px-3">
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
                            className="text-primary-600 hover:text-primary-800 font-medium transition-colors flex items-center"
                          >
                            {company.website}
                            <TbExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Plans */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-neutral-700 mb-4 flex items-center">
                  <TbShieldHalfFilled
                    size={20}
                    className="mr-2 text-primary-600"
                  />
                  Company Plans ({plans.length})
                </h3>

                {loadingPlans ? (
                  <div className="flex items-center justify-center py-8">
                    <TbLoader2 className="h-6 w-6 animate-spin text-primary-600 mr-2" />
                    <span className="text-gray-600">Loading plans...</span>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                ) : plans.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                    <TbShieldX className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      No plans available for this company !
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-5 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="font-semibold text-secondary-600">
                                {plan.name}
                              </h4>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">
                                  Insurance Type:
                                </span>
                                <p className="font-semibold text-primary-600 capitalize">
                                  {plan.insuranceType?.replace("-", " ")}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">
                                  Cover Type:
                                </span>
                                <p className="font-semibold text-primary-600 capitalize">
                                  {plan.coverType}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">
                                  Age Range:
                                </span>
                                <p className="font-semibold text-primary-600">
                                  {plan.eligibilityAgeMin}-
                                  {plan.eligibilityAgeMax} years
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">Premium:</span>
                                <p className="font-semibold text-primary-600">
                                  {plan.annualPremium ? (
                                    <span className="flex items-center">
                                      <TbCurrencyDollar className="h-4 w-4 mr-1" />
                                      {typeof plan.annualPremium === "number"
                                        ? plan.annualPremium.toLocaleString()
                                        : plan.annualPremium}
                                    </span>
                                  ) : (
                                    "Variable"
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2 font-medium">
                              {plan.hasDental && (
                                <span className="px-4 py-1 bg-primary-100 border border-primary-300 text-primary-800  text-xs rounded-full">
                                  Dental
                                </span>
                              )}
                              {plan.hasOptical && (
                                <span className="px-4 py-1 bg-blue-100 border border-blue-300 text-blue-700  text-xs rounded-full">
                                  Optical
                                </span>
                              )}
                              {plan.hasMaternity && (
                                <span className="px-4 py-1 bg-pink-100 border border-pink-300 text-pink-700  text-xs rounded-full">
                                  Maternity
                                </span>
                              )}
                              <span className="px-3.5 py-1 bg-gray-100 border border-gray-300 text-gray-600 text-xs rounded-full">
                                Inpatient:{" "}
                                {plan.inpatientCoverageLimit?.toLocaleString() ||
                                  "N/A"}
                              </span>
                              <span className="px-3.5 py-1 bg-gray-100 border border-gray-300 text-gray-600 text-xs rounded-full">
                                Outpatient:{" "}
                                {plan.outpatientCoverageLimit?.toLocaleString() ||
                                  "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-3">
            <div className="flex justify-start">
              <button
                onClick={onClose}
                className="px-8 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-[0.93rem]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompanyDetailModal;
