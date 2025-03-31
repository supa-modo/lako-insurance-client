import React from "react";
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
} from "react-icons/tb";

const QueryDetail = ({
  query,
  onBack,
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
            onClick={onBack}
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
          icon: TbMessageCircle,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        };
      case "processing":
        return {
          label: "Processing",
          icon: TbClock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        };
      case "processed":
        return {
          label: "Processed",
          icon: TbCheck,
          color: "text-green-600",
          bgColor: "bg-green-100",
        };
      case "converted":
        return {
          label: "Converted to Lead",
          icon: TbUserPlus,
          color: "text-primary-600",
          bgColor: "bg-primary-100",
        };
      default:
        return {
          label: status,
          icon: TbInfoCircle,
          color: "text-neutral-600",
          bgColor: "bg-neutral-100",
        };
    }
  };

  const statusInfo = getStatusInfo(query.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
          >
            <TbArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-medium text-neutral-900">
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
              <TbUserPlus className="h-5 w-5" />
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
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* Left column - Client details */}
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-4">
                  <TbUser className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-neutral-900">
                    {query.clientName}
                    {query.isPriority && (
                      <TbStarFilled className="ml-1 h-4 w-4 text-yellow-500 inline" />
                    )}
                  </h3>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
                  >
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusInfo.label}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <TbMail className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Email</div>
                    <div className="text-sm text-neutral-900">
                      {query.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <TbPhone className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Phone</div>
                    <div className="text-sm text-neutral-900">
                      {query.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <TbCalendarTime className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">
                      Date Submitted
                    </div>
                    <div className="text-sm text-neutral-900">
                      {formatDate(query.date)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <TbCurrencyDollar className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                  <div>
                    <div className="text-xs text-neutral-500 mb-1">Budget</div>
                    <div className="text-sm text-neutral-900">
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

                {query.age && (
                  <div className="flex items-start">
                    <TbInfoCircle className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-500 mb-1">Age</div>
                      <div className="text-sm text-neutral-900">
                        {query.age} years
                      </div>
                    </div>
                  </div>
                )}

                {query.coverageType && (
                  <div className="flex items-start">
                    <TbShieldCheck className="h-5 w-5 text-neutral-500 mt-0.5 mr-3" />
                    <div>
                      <div className="text-xs text-neutral-500 mb-1">
                        Coverage Type
                      </div>
                      <div className="text-sm text-neutral-900">
                        {query.coverageType}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Query details */}
          <div className="lg:w-2/3">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">
                Query Information
              </h3>

              <div className="mb-6 bg-white rounded-lg p-5 border border-neutral-200">
                <div className="text-xs text-neutral-500 mb-1">Summary</div>
                <div className="text-base text-neutral-900 font-medium mb-4">
                  {query.summary}
                </div>

                {query.details && (
                  <>
                    <div className="text-xs text-neutral-500 mb-1">Details</div>
                    <div className="text-sm text-neutral-800 whitespace-pre-wrap">
                      {query.details}
                    </div>
                  </>
                )}
              </div>

              {/* Additional sections based on query properties */}
              {query.preferredPlans && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-800 mb-2 flex items-center">
                    <TbClipboard className="mr-2 h-5 w-5 text-primary-500" />
                    Preferred Insurance Plans
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
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

              {query.requirements && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-800 mb-2 flex items-center">
                    <TbFiles className="mr-2 h-5 w-5 text-primary-500" />
                    Requirements
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-neutral-200">
                    <div className="text-sm whitespace-pre-wrap">
                      {query.requirements}
                    </div>
                  </div>
                </div>
              )}

              {/* Processing Notes/Comments */}
              {query.notes && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-800 mb-2 flex items-center">
                    <TbMessageCircle className="mr-2 h-5 w-5 text-primary-500" />
                    Processing Notes
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-dashed border-neutral-300">
                    <div className="text-sm whitespace-pre-wrap">
                      {query.notes}
                    </div>
                  </div>
                </div>
              )}

              {/* Only show if there are matching plans calculated */}
              {query.matchingPlans && query.matchingPlans.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 p-4">
        <div className="flex flex-wrap gap-3">
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
              <TbUserPlus className="mr-2 h-5 w-5" /> Convert to Lead
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
  );
};

export default QueryDetail;
