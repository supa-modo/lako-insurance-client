import React from "react";
import {
  TbEye,
  TbEdit,
  TbUserPlus,
  TbTrash,
  TbCheck,
  TbMail,
  TbPhone,
  TbBrandWhatsapp,
  TbArrowUp,
  TbArrowDown,
  TbStarFilled,
  TbInfoCircle,
  TbMessageCircle,
  TbClock,
  TbMessage,
} from "react-icons/tb";
import { RiUserFollowLine } from "react-icons/ri";

const QueryTable = ({
  queries,
  onView,
  onEdit,
  onDelete,
  onProcessQuery,
  onConvertToLead,
  sortField,
  sortOrder,
  onSort,
}) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

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

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return (
          <div className="px-4 py-1 w-fit flex items-center rounded-full text-xs font-medium bg-blue-100 border border-blue-300 text-blue-800">
            <TbMessage className="h-4 w-4 mr-1" />
            <span className="">New</span>
          </div>
        );
      case "processing":
        return (
          <div className="px-4 py-1 w-fit flex items-center rounded-full text-xs font-medium bg-yellow-100 border border-yellow-300 text-yellow-800">
            <TbClock className="h-4 w-4 mr-1" />
            <span className="">Processing</span>
          </div>
        );
      case "processed":
        return (
          <div className="px-4 py-1 w-fit flex items-center rounded-full text-xs font-medium bg-green-100 border border-green-300 text-green-800">
            <TbCheck className="h-4 w-4 mr-1" />
            <span className="">Processed</span>
          </div>
        );
      case "converted":
        return (
              <div className="px-3 py-1 w-fit flex items-center rounded-full text-xs font-medium bg-primary-100 border border-primary-300 text-primary-800">
            <RiUserFollowLine className="h-4 w-4 mr-1" />
            <span className="">Converted to Lead</span>
          </div>
        );
      default:
        return (
          <div className="px-4 py-1 w-fit flex items-center rounded-full text-xs font-medium bg-neutral-100 border border-neutral-300 text-neutral-800">
            <TbInfoCircle className="h-4 w-4 mr-1" />
            <span className="">{status}</span>
          </div>
        );
    }
  };

  return (
    <div className="overflow-x-auto rounded-t-lg">
      <table className="min-w-full divide-y divide-gray-200 rounded-t-lg">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("clientName")}
            >
              <div className="flex items-center">
                <span>Client</span>
                {sortField === "clientName" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <TbArrowUp className="h-4 w-4" />
                    ) : (
                      <TbArrowDown className="h-4 w-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("coverageType")}
            >
              <div className="flex items-center">
                <span>Coverage Type</span>
                {sortField === "coverageType" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <TbArrowUp className="h-4 w-4" />
                    ) : (
                      <TbArrowDown className="h-4 w-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("budget")}
            >
              <div className="flex items-center">
                <span>Budget</span>
                {sortField === "budget" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <TbArrowUp className="h-4 w-4" />
                    ) : (
                      <TbArrowDown className="h-4 w-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("date")}
            >
              <div className="flex items-center">
                <span>Date</span>
                {sortField === "date" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <TbArrowUp className="h-4 w-4" />
                    ) : (
                      <TbArrowDown className="h-4 w-4" />
                    )}
                  </span>
                )}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => onSort("status")}
            >
              <div className="flex items-center">
                <span>Status</span>
                {sortField === "status" && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? (
                      <TbArrowUp className="h-4 w-4" />
                    ) : (
                      <TbArrowDown className="h-4 w-4" />
                    )}
                  </span>
                )}
              </div>
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
          {queries.map((query) => (
            <tr key={query.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                      {query.clientName?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {query.clientName}
                      </div>
                      {query.isPriority && (
                        <TbStarFilled className="ml-1 h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{query.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {query.coverageType}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-xs">
                  {query.summary}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {query.budget
                    ? formatCurrency(query.budget)
                    : "Not specified"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatDate(query.date)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(query.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onView(query)}
                    className="text-gray-400 hover:text-primary-600"
                    title="View details"
                  >
                    <TbEye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onEdit(query)}
                    className="text-gray-400 hover:text-primary-600"
                    title="Edit query"
                  >
                    <TbEdit className="h-5 w-5" />
                  </button>
                  {query.status !== "processed" &&
                    query.status !== "converted" && (
                      <button
                        onClick={() => onProcessQuery(query)}
                        className="text-gray-400 hover:text-green-600"
                        title="Mark as processed"
                      >
                        <TbCheck className="h-5 w-5" />
                      </button>
                    )}
                  {query.status !== "converted" && (
                    <button
                      onClick={() => onConvertToLead(query)}
                      className="text-gray-400 hover:text-secondary-600"
                      title="Convert to lead"
                    >
                      <TbUserPlus className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(query.id)}
                    className="text-gray-400 hover:text-red-600"
                    title="Delete query"
                  >
                    <TbTrash className="h-5 w-5" />
                  </button>
                  <div className="border-l border-gray-200 pl-2 flex space-x-2">
                    {query.phone && (
                      <button
                        className="text-gray-400 hover:text-primary-600"
                        title="Call client"
                      >
                        <TbPhone className="h-5 w-5" />
                      </button>
                    )}
                    {query.email && (
                      <button
                        className="text-gray-400 hover:text-primary-600"
                        title="Send email"
                      >
                        <TbMail className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      className="text-gray-400 hover:text-green-600"
                      title="Send WhatsApp message"
                    >
                      <TbBrandWhatsapp className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable;
