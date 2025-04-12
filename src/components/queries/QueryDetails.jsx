import React from "react";
import {
  TbX,
  TbEdit,
  TbTrash,
  TbUserPlus,
  TbCheck,
  TbClock,
  TbUser,
  TbMail,
  TbPhone,
  TbCalendarTime,
  TbCurrencyDollar,
  TbTag,
  TbMessageCircle,
  TbBrandWhatsapp,
  TbStar,
  TbStarFilled,
  TbShieldCheck,
  TbNotes,
  TbArrowRight,
} from "react-icons/tb";

const QueryDetails = ({
  query,
  onClose,
  onEdit,
  onDelete,
  onProcessQuery,
  onConvertToLead,
}) => {
  if (!query) return null;

  // Format currency
  const formatCurrency = (amount) => {
    if (typeof amount === "object") {
      return `${formatCurrency(amount.min)} - ${formatCurrency(amount.max)}`;
    }
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return {
          color: "blue",
          label: "New Query",
        };
      case "processing":
        return {
          color: "yellow",
          label: "Processing",
        };
      case "processed":
        return {
          color: "green",
          label: "Processed",
        };
      case "converted":
        return {
          color: "primary",
          label: "Converted to Lead",
        };
      default:
        return {
          color: "neutral",
          label: status,
        };
    }
  };

  const statusInfo = getStatusBadge(query.status);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50">
      <div
        className="w-[70%] h-full bg-white shadow-2xl overflow-hidden animate-slide-left"
        style={{
          animation: "slide-left 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-200 to-secondary-100 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center text-primary-600 font-semibold text-lg shadow-sm">
              {query.clientName?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-primary-700 flex items-center">
                {query.clientName}
                {query.isPriority && (
                  <TbStarFilled className="ml-2 h-5 w-5 text-yellow-500" />
                )}
              </h2>
              <div className="text-sm text-primary-600/80">Query Details</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-primary-700 hover:text-white transition-colors"
          >
            <TbX className="w-6 h-6" />
          </button>
        </div>

        <div className="h-[calc(100vh-70px)] overflow-y-auto">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Query Summary */}
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Query Summary
                  </h3>
                  <p className="text-neutral-700">{query.summary}</p>
                  {query.details && (
                    <p className="mt-3 text-neutral-600 text-sm">
                      {query.details}
                    </p>
                  )}
                </div>

                {/* Coverage Requirements */}
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Coverage Requirements
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {query.coverageType && (
                      <div>
                        <div className="text-sm text-neutral-500">
                          Coverage Type
                        </div>
                        <div className="mt-1 text-neutral-900 font-medium">
                          {query.coverageType}
                        </div>
                      </div>
                    )}
                    {query.budget && (
                      <div>
                        <div className="text-sm text-neutral-500">Budget</div>
                        <div className="mt-1 text-neutral-900 font-medium">
                          {formatCurrency(query.budget)}
                        </div>
                      </div>
                    )}
                  </div>
                  {query.requirements && (
                    <div className="mt-4">
                      <div className="text-sm text-neutral-500">
                        Additional Requirements
                      </div>
                      <div className="mt-1 text-neutral-700">
                        {query.requirements}
                      </div>
                    </div>
                  )}
                </div>

                {/* Matching Plans */}
                {query.matchingPlans && query.matchingPlans.length > 0 && (
                  <div className="bg-white rounded-xl border border-neutral-200 p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      Matching Plans
                    </h3>
                    <div className="space-y-4">
                      {query.matchingPlans.map((plan, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 rounded-lg border border-neutral-200 hover:border-primary-300 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                            <TbShieldCheck className="h-5 w-5" />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="font-medium text-neutral-900">
                              {plan.name}
                            </div>
                            <div className="text-sm text-neutral-500 mt-1">
                              {plan.provider}
                            </div>
                            <div className="flex items-center mt-2">
                              <span className="text-sm font-medium text-primary-600">
                                {formatCurrency(plan.premium)}
                              </span>
                              {plan.features && (
                                <div className="ml-4 flex gap-2">
                                  {plan.features.map((feature, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 rounded-md text-xs bg-neutral-100 text-neutral-700"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {query.notes && (
                  <div className="bg-white rounded-xl border border-neutral-200 p-6">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                      Notes
                    </h3>
                    <p className="text-neutral-700 whitespace-pre-line">
                      {query.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <TbUser className="h-5 w-5 text-neutral-400" />
                      <div className="ml-3">
                        <div className="text-sm text-neutral-500">Name</div>
                        <div className="text-neutral-900">
                          {query.clientName}
                        </div>
                      </div>
                    </div>
                    {query.email && (
                      <div className="flex items-center">
                        <TbMail className="h-5 w-5 text-neutral-400" />
                        <div className="ml-3">
                          <div className="text-sm text-neutral-500">Email</div>
                          <div className="text-neutral-900">{query.email}</div>
                        </div>
                      </div>
                    )}
                    {query.phone && (
                      <div className="flex items-center">
                        <TbPhone className="h-5 w-5 text-neutral-400" />
                        <div className="ml-3">
                          <div className="text-sm text-neutral-500">Phone</div>
                          <div className="text-neutral-900">{query.phone}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="flex space-x-2">
                      {query.phone && (
                        <button className="flex-1 py-2 px-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center">
                          <TbPhone className="h-4 w-4 mr-2" />
                          Call
                        </button>
                      )}
                      {query.email && (
                        <button className="flex-1 py-2 px-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center">
                          <TbMail className="h-4 w-4 mr-2" />
                          Email
                        </button>
                      )}
                      <button className="flex-1 py-2 px-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center">
                        <TbBrandWhatsapp className="h-4 w-4 mr-2" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>

                {/* Query Status */}
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Query Status
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-neutral-500">Status</div>
                      <div
                        className={`mt-1 inline-flex px-3 py-1 rounded-full text-sm font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}
                      >
                        {statusInfo.label}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">
                        Date Submitted
                      </div>
                      <div className="mt-1 text-neutral-900">
                        {formatDate(query.date)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => onEdit(query)}
                      className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      <TbEdit className="h-5 w-5 mr-2" />
                      Edit Query
                    </button>
                    {query.status !== "processed" &&
                      query.status !== "converted" && (
                        <button
                          onClick={() => onProcessQuery(query)}
                          className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                          <TbCheck className="h-5 w-5 mr-2" />
                          Mark as Processed
                        </button>
                      )}
                    {query.status !== "converted" && (
                      <button
                        onClick={() => onConvertToLead(query)}
                        className="w-full py-2 px-4 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors flex items-center justify-center"
                      >
                        <TbUserPlus className="h-5 w-5 mr-2" />
                        Convert to Lead
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(query.id)}
                      className="w-full py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                    >
                      <TbTrash className="h-5 w-5 mr-2" />
                      Delete Query
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-left {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-left {
          animation: slide-left 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default QueryDetails;
