import React, { useState } from "react";
import {
  TbX,
  TbEdit,
  TbShieldCheck,
  TbCurrencyDollar,
  TbUsers,
  TbCalendar,
  TbCheck,
  TbInfoCircle,
  TbBuildingHospital,
  TbHeartHandshake,
  TbChevronDown,
  TbChevronUp,
} from "react-icons/tb";

const InsurancePlanDetailsModal = ({ plan, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({
    coverage: true,
    premiums: true,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Handle backdrop click
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
      <div
        className="w-[750px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Modal Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <div className="flex items-center">
            <TbShieldCheck className="text-primary-500 text-2xl mr-3" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{plan.name}</h2>
              <p className="text-sm text-gray-500">
                {plan.companyName} • {plan.category} Plan
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-500 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-colors"
            >
              <TbEdit className="text-lg" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
            >
              <TbX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "overview"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "coverage"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("coverage")}
          >
            Coverage
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === "pricing"
                ? "text-primary-600 border-b-2 border-primary-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("pricing")}
          >
            Pricing
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto h-[calc(100vh-168px)] p-6">
          {activeTab === "overview" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plan Summary */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Plan Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <TbCurrencyDollar className="text-primary-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Premium Amount
                        </p>
                        <p className="text-sm text-gray-600">
                          Annual: {plan.annualCost}
                        </p>
                        <p className="text-sm text-gray-600">
                          Monthly: {plan.monthlyCost}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <TbCalendar className="text-primary-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Age Eligibility
                        </p>
                        <p className="text-sm text-gray-600">
                          {plan.ageRange} years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <TbUsers className="text-primary-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Current Subscribers
                        </p>
                        <p className="text-sm text-gray-600">
                          {plan.subscribers} active members
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Key Features
                  </h3>
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <TbCheck className="text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Information */}
                <div className="bg-gray-50 rounded-lg p-5 md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Provider Information
                  </h3>
                  <div className="flex items-center">
                    {plan.companyLogo ? (
                      <img
                        src={plan.companyLogo}
                        alt={plan.companyName}
                        className="h-12 w-12 rounded-full mr-4 object-contain bg-white p-1 border border-gray-200"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-primary-100 mr-4 flex items-center justify-center text-xl font-bold text-primary-600">
                        {plan.companyName?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-md font-medium text-gray-800">
                        {plan.companyName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Insurance Provider
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "coverage" && (
            <div>
              <div className="space-y-6">
                {/* Coverage Details Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleSection("coverage")}
                  >
                    <h3 className="text-md font-semibold text-gray-800">
                      Coverage Details
                    </h3>
                    {expandedSections.coverage ? (
                      <TbChevronUp className="text-gray-500" />
                    ) : (
                      <TbChevronDown className="text-gray-500" />
                    )}
                  </div>

                  {expandedSections.coverage && (
                    <div className="p-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Coverage Type
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Limit
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <TbBuildingHospital className="text-blue-500 mr-2" />
                                  <span className="text-sm text-gray-900">
                                    Inpatient Coverage
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                KES{" "}
                                {plan.inpatientCoverageLimit?.toLocaleString()}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <TbHeartHandshake className="text-green-500 mr-2" />
                                  <span className="text-sm text-gray-900">
                                    Outpatient Coverage
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">
                                KES{" "}
                                {plan.outpatientCoverageLimit?.toLocaleString()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div>
              <div className="space-y-6">
                {/* Premium Rates Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleSection("premiums")}
                  >
                    <h3 className="text-md font-semibold text-gray-800">
                      Premium Details
                    </h3>
                    {expandedSections.premiums ? (
                      <TbChevronUp className="text-gray-500" />
                    ) : (
                      <TbChevronDown className="text-gray-500" />
                    )}
                  </div>

                  {expandedSections.premiums && (
                    <div className="p-4">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Payment Frequency
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                Annual Premium
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {plan.annualCost}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                Monthly Premium
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {plan.monthlyCost}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4 bg-yellow-50 p-3 rounded-md">
                        <div className="flex items-start">
                          <TbInfoCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700">
                            Monthly payments are available with a 5% surcharge.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium transition-colors"
            >
              Edit Plan
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default InsurancePlanDetailsModal;
