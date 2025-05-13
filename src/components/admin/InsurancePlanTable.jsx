import React from "react";
import {
  TbArrowUp,
  TbArrowDown,
  TbEye,
  TbEdit,
  TbTrash,
  TbLoader,
  TbShieldCheck,
  TbShieldX,
  TbLoader2,
} from "react-icons/tb";
import { motion } from "framer-motion";

const InsurancePlanTable = ({
  plans,
  loading,
  onView,
  onEdit,
  onDelete,
  sortField,
  sortDirection,
  onSort,
}) => {
  // Function to render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <TbArrowUp className="ml-1" />
      ) : (
        <TbArrowDown className="ml-1" />
      );
    }
    return null;
  };

  // Function to handle sort click
  const handleSortClick = (field) => {
    onSort(field);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <TbLoader2 size={26} className="animate-spin text-primary-500 mb-3" />
        <p className="text-gray-500 text-sm">Loading insurance plans...</p>
      </div>
    );
  }

  // Render empty state
  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <TbShieldX className="text-4xl text-gray-400 mb-3" />
        <p className="text-gray-500 font-medium">No insurance plans found</p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="pl-4 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSortClick("name")}
            >
              <div className="flex items-center">
                Plan Name {renderSortIndicator("name")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSortClick("category")}
            >
              <div className="flex items-center">
                Category {renderSortIndicator("category")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSortClick("ageRange")}
            >
              <div className="flex items-center">
                Age Range {renderSortIndicator("ageRange")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSortClick("monthlyCost")}
            >
              <div className="flex items-center">
                Base Premium {renderSortIndicator("annualPremium")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSortClick("subscribers")}
            >
              <div className="flex items-center">
                Subscribers {renderSortIndicator("subscribers")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSortClick("companyName")}
            >
              <div className="flex items-center">
                Company {renderSortIndicator("companyName")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {plans.map((plan, index) => (
            <motion.tr
              key={plan.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="hover:bg-primary-50 cursor-pointer"
              onClick={() => onView(plan)}
            >
              <td className="pl-4 py-3.5 text-[0.9rem] text-gray-500 whitespace-nowrap">{index + 1}.</td>
              <td className="px-6 py-3.5 whitespace-nowrap">
                <div className="flex items-center">
                  <TbShieldCheck className="flex-shrink-0 h-5 w-5 text-primary-500 mr-3" />
                  <div className="text-sm font-medium text-gray-900">
                    {plan.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 border border-blue-300 text-blue-800">
                  {plan.category}
                </span>
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-500">
                {plan.ageRange}
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-500">
                {plan.annualPremium}
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap text-sm text-gray-500">
                {plan.subscribers}
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap">
                <div className="flex items-center">
                  {plan.companyLogo ? (
                    <img
                      src={plan.companyLogo}
                      alt={plan.companyName}
                      className="h-7 w-10 rounded-full mr-2 object-contain bg-white"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs font-bold">
                      {plan.companyName?.charAt(0)}
                    </div>
                  )}
                  <div className="text-sm text-gray-900">
                    {plan.companyName}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    plan.status === "active"
                      ? "bg-green-100 border border-green-300 text-green-800"
                      : "bg-yellow-100 border border-yellow-300 text-yellow-800"
                  }`}
                >
                  {plan.status === "active" ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap text-right text-sm font-medium">
                <div
                  className="flex justify-end space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(plan);
                    }}
                  >
                    <TbEdit className="h-5 w-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(plan.id);
                    }}
                  >
                    <TbTrash className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InsurancePlanTable;
