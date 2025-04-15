import React from "react";
import { PiUserDuotone } from "react-icons/pi";
import { RiUserAddLine, RiUserFollowLine } from "react-icons/ri";
import {
  TbUser,
  TbMail,
  TbPhone,
  TbCalendarTime,
  TbCurrencyDollar,
  TbShieldCheck,
  TbEdit,
  TbTrash,
  TbUserPlus,
  TbCheck,
  TbArrowLeft,
  TbMessageCircle,
  TbClock,
  TbLock,
  TbSettings,
  TbFiles,
  TbStarFilled,
  TbClipboard,
  TbInfoCircle,
  TbHeartHandshake,
  TbX,
  TbCoins,
  TbMessage,
} from "react-icons/tb";

const QueryDetail = ({
  query,
  onClose,
  onEdit,
  onDelete,
  onProcessQuery,
  onConvertToLead,
}) => {
  if (!query) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center bg-white rounded-lg shadow-sm">
        <div>
          <div className="bg-neutral-100 p-4 rounded-full mb-4 inline-flex">
            <TbMessageCircle className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No query selected
          </h3>
          <p className="text-neutral-500 max-w-md">
            Select a query from the list to view its details
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 flex items-center mx-auto"
          >
            <TbArrowLeft className="mr-2" /> Back to queries
          </button>
        </div>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-KE", options);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get status info
  const getStatusInfo = (status) => {
    switch (status) {
      case "new":
        return {
          label: "New Query",
          icon: TbMessage,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-300",
        };
      case "processing":
        return {
          label: "Processing",
          icon: TbClock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-300",
        };
      case "processed":
        return {
          label: "Processed",
          icon: TbCheck,
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-300",
        };
      case "converted":
        return {
          label: "Converted to Lead",
          icon: RiUserFollowLine,
          color: "text-primary-600",
          bgColor: "bg-primary-100",
          borderColor: "border-primary-300",
        };
      default:
        return {
          label: status,
          icon: TbInfoCircle,
          color: "text-neutral-600",
          bgColor: "bg-neutral-100",
          borderColor: "border-neutral-200",
        };
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const statusInfo = getStatusInfo(query.status);
  const StatusIcon = statusInfo.icon;

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
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-3 p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
            >
              <TbArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-primary-700">
              Query Details
            </h2>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(query)}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-md"
              title="Edit query"
            >
              <TbEdit className="h-5 w-5" />
            </button>

            {query.status !== "processed" && query.status !== "converted" && (
              <button
                onClick={() => onProcessQuery(query)}
                className="p-2 text-neutral-600 hover:text-green-600 hover:bg-neutral-100 rounded-md"
                title="Mark as processed"
              >
                <TbCheck className="h-5 w-5" />
              </button>
            )}

            {query.status !== "converted" && (
              <button
                onClick={() => onConvertToLead(query)}
                className="p-2 text-neutral-600 hover:text-secondary-600 hover:bg-neutral-100 rounded-md"
                title="Convert to lead"
              >
                <RiUserAddLine className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={() => onDelete(query.id)}
              className="p-2 text-neutral-600 hover:text-red-600 hover:bg-neutral-100 rounded-md"
              title="Delete query"
            >
              <TbTrash className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Query content */}
        <div className="flex-1 overflow-auto p-6 h-[calc(100vh-156px)]">
          <div className="">
            {/* Client details */}
            <div className=" mb-6">
              <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center mb-4">
                    <div className="h-[3.6rem] w-[3.8rem] bg-gradient-to-r from-primary-300 to-primary-200 rounded-[0.65rem] flex items-center justify-center text-primary-600 mr-4">
                      <PiUserDuotone className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900">
                        {query.clientName}
                        {query.isPriority && (
                          <TbStarFilled className="ml-2 h-4 w-4 text-yellow-500 inline" />
                        )}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.83rem] text-neutral-800">
                          Age: {query.age ? query.age : "N/A"} years
                        </span>
                        <div
                          className={`inline-flex items-center px-4 py-1 border ${statusInfo.borderColor} rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                        >
                          <StatusIcon className="mr-1 h-3.5 w-3.5" />
                          {statusInfo.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">
                        Submitted
                      </div>
                      <div className="text-[0.9rem] font-medium text-primary-600/90">
                        {formatDate(query.date)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <TbMail className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-neutral-600 mb-1">Email</div>
                      <div className="text-[0.9rem] font-lexend text-neutral-900">
                        {query.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <TbPhone className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-neutral-600 mb-1">Phone</div>
                      <div className="text-[0.9rem] font-lexend text-neutral-900">
                        {query.phone}
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex items-start">
                    <TbCoins className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-neutral-600 mb-1">
                        Budget
                      </div>
                      <div className="text-[0.9rem] font-lexend font-medium text-neutral-900">
                        {query.budget
                          ? typeof query.budget === "object"
                            ? `${formatCurrency(
                                query.budget.min
                              )} - ${formatCurrency(query.budget.max)}`
                            : formatCurrency(query.budget)
                          : "Not specified"}
                      </div>
                    </div>
                  </div>

                
                  {query.coverageType && (
                    <div className="flex items-start">
                      <TbShieldCheck className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                      <div>
                        <div className="text-sm text-neutral-600 mb-1">
                          Coverage Type
                        </div>
                        <div className="text-[0.9rem] font-lexend text-neutral-900">
                          {query.coverageType}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Query details */}
            <div className="">
              <div>
                <h3 className="text-lg font-semibold text-secondary-700 mb-3">
                  Query Information
                </h3>

                <div className="mb-6 bg-gray-200 rounded-lg p-5 border border-neutral-200">
                  <div className="text-sm text-primary-600 font-medium mb-1">
                    Summary
                  </div>
                  <div className="text-base text-neutral-900 font-medium mb-4">
                    {query.summary}
                  </div>

                  {query.details && (
                    <>
                      <div className="text-sm text-primary-600 font-medium mb-1">
                        Details
                      </div>
                      <div className="text-[0.95rem] text-neutral-800 whitespace-pre-wrap">
                        {query.details}
                      </div>
                    </>
                  )}
                </div>

                {/* Additional sections based on query properties */}
                {query.preferredPlans && (
                  <div className="mb-6">
                    <h4 className="text-[0.93rem] font-medium text-primary-700 mb-2 flex items-center">
                      <TbClipboard className="mr-2 h-5 w-5 text-primary-500" />
                      Preferred Insurance Plans
                    </h4>
                    <div className="bg-white text-neutral-700 rounded-lg p-4 border border-neutral-200">
                      <ul className="space-y-2">
                        {query.preferredPlans.map((plan, index) => (
                          <li key={index} className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-primary-500 mr-2"></span>
                            <span className="text-sm">{plan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Processing Notes/Comments */}
                {query.notes && (
                  <div className="mb-6">
                    <h4 className="text-[0.93rem] font-medium text-primary-700 mb-2 flex items-center">
                      <TbMessageCircle className="mr-2 h-5 w-5 text-primary-500" />
                      Processing Notes
                    </h4>
                    <div className="bg-white text-neutral-700 rounded-lg p-4 border border-dashed border-neutral-300">
                      <div className="text-sm whitespace-pre-wrap">
                        {query.notes}
                      </div>
                    </div>
                  </div>
                )}

                {/* Only show if there are matching plans calculated */}
                {/* {query.matchingPlans && query.matchingPlans.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-800 mb-2 flex items-center">
                      <TbHeartHandshake className="mr-2 h-5 w-5 text-primary-500" />
                      Matching Insurance Plans
                    </h4>
                    <div className="bg-white rounded-lg p-4 border border-neutral-200">
                      <ul className="space-y-4">
                        {query.matchingPlans.map((plan, index) => (
                          <li
                            key={index}
                            className="pb-4 border-b border-neutral-100 last:border-0 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{plan.name}</div>
                                <div className="text-sm text-neutral-500">
                                  {plan.provider}
                                </div>
                              </div>
                              <div className="text-primary-600 font-medium">
                                {formatCurrency(plan.premium)}
                              </div>
                            </div>
                            {plan.features && (
                              <div className="mt-2 text-xs text-neutral-600">
                                {plan.features.map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block mr-2 mb-1 px-2 py-1 bg-neutral-100 rounded-full"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 px-4 py-3">
          <div className="flex flex-wrap gap-3 text-sm">
            {query.status !== "processed" && query.status !== "converted" && (
              <button
                onClick={() => onProcessQuery(query)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <TbCheck className="mr-2 h-5 w-5" /> Mark as Processed
              </button>
            )}

            {query.status !== "converted" && (
              <button
                onClick={() => onConvertToLead(query)}
                className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 flex items-center"
              >
                <RiUserAddLine className="mr-2 h-5 w-5" /> Convert to Lead
              </button>
            )}

            <button
              onClick={() => onEdit(query)}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
            >
              <TbEdit className="mr-2 h-5 w-5" /> Edit Query
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

export default QueryDetail;
