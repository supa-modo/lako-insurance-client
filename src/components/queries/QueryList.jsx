import React, { useState, useEffect } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import {
  TbEye,
  TbEdit,
  TbUserPlus,
  TbTrash,
  TbMessageCircle,
  TbCheck,
  TbClock,
  TbX,
  TbArrowUp,
  TbArrowDown,
  TbSearch,
  TbFilter,
  TbCurrencyDollar,
  TbUserCircle,
  TbCalendarTime,
  TbChevronRight,
  TbStar,
  TbStarFilled,
  TbHeartHandshake,
  TbTag,
  TbBrandWhatsapp,
  TbMail,
  TbPhone,
  TbMessage,
} from "react-icons/tb";

const QueryList = ({
  queries = [],
  searchTerm,
  onView,
  onEdit,
  onDelete,
  onConvertToLead,
  onProcessQuery,
  selectedStatus,
}) => {
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  // Update local search when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm || "");
  }, [searchTerm]);

  // Handle sort change
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
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

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return (
          <span className="px-4 py-1 flex items-center rounded-full text-xs font-medium bg-blue-100 border border-blue-300 text-blue-800">
            <TbMessage className="h-4 w-4 mr-1" />
            New
          </span>
        );
      case "processing":
        return (
          <span className="px-4 py-1 flex items-center rounded-full text-xs font-medium bg-yellow-100 border border-yellow-300 text-yellow-800">
            <TbClock className="h-4 w-4 mr-1" />
            Processing
          </span>
        );
      case "processed":
        return (
          <span className="px-4 py-1 flex items-center rounded-full text-xs font-medium bg-green-100 border border-green-300 text-green-800">
            <TbCheck className="h-4 w-4 mr-1" />
            Processed
          </span>
        );
      case "converted":
        return (
          <span className="px-4 py-1 flex items-center rounded-full text-xs font-medium bg-primary-100 border border-primary-300 text-primary-800">
            <RiUserFollowLine className="h-4 w-4 mr-1" />
            Converted to Lead
          </span>
        );
      default:
        return (
          <span className="px-4 py-1 flex items-center rounded-full text-xs font-medium bg-neutral-100 border border-neutral-300 text-neutral-800">
            <TbInfoCircle className="h-4 w-4 mr-1" />
            {status}
          </span>
        );
    }
  };

  // Filter and sort queries
  const filteredQueries = queries
    .filter((query) => {
      // Filter by status
      if (selectedStatus !== "all" && query.status !== selectedStatus) {
        return false;
      }

      // Filter by search term
      const term = (localSearchTerm || searchTerm || "").toLowerCase();
      if (term) {
        return (
          query.clientName?.toLowerCase().includes(term) ||
          query.email?.toLowerCase().includes(term) ||
          query.phone?.toLowerCase().includes(term) ||
          query.summary?.toLowerCase().includes(term) ||
          query.coverageType?.toLowerCase().includes(term)
        );
      }

      return true;
    })
    .sort((a, b) => {
      // Sort queries
      if (sortField === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }

      if (sortField === "budget") {
        const aBudget =
          typeof a.budget === "object" ? a.budget.max || 0 : a.budget || 0;
        const bBudget =
          typeof b.budget === "object" ? b.budget.max || 0 : b.budget || 0;
        return sortOrder === "asc" ? aBudget - bBudget : bBudget - aBudget;
      }

      // Sort by string fields
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";

      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  return (
    <div className=" overflow-hidden">
      {/* Queries List */}
      <div className="overflow-x-auto">
        {filteredQueries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
              <TbMessageCircle className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              No queries found
            </h3>
            <p className="text-neutral-500">
              {localSearchTerm
                ? "No queries match your search criteria. Try different keywords."
                : selectedStatus !== "all"
                ? `No queries with status '${selectedStatus}'. Try selecting a different status.`
                : "There are no client queries available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
            {filteredQueries.map((query) => (
              <div
                key={query.id}
                className="bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-300 to-primary-400 flex items-center justify-center text-primary-600 font-medium">
                        {query.clientName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-semibold text-neutral-900">
                          {query.clientName}
                        </div>
                        <div className="text-xs text-neutral-700">
                          {query.email}
                        </div>
                      </div>
                    </div>
                    {query.isPriority && (
                      <TbStarFilled className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-neutral-800">
                      {query.summary}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {query.coverageType && (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-neutral-300 text-neutral-700">
                          {query.coverageType}
                        </span>
                      )}
                      {query.budget && (
                        <span className="px-2 py-1 rounded-md text-xs font-medium bg-green-200 text-green-700">
                          {formatCurrency(query.budget)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[0.78rem] font-medium text-neutral-700">
                      <div className="flex items-center text-primary-600">
                        <TbCalendarTime className="h-4 w-4 mr-1" />
                        {formatDate(query.date)}
                      </div>
                      {getStatusBadge(query.status)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-1 border-t border-neutral-200 flex items-center justify-between">
                  <div className="flex space-x-2">
                      {query.phone && (
                        <button className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md">
                          <TbPhone className="h-[1.3rem] w-[1.3rem]" />
                        </button>
                      )}
                      {query.email && (
                        <button className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md">
                          <TbMail className="h-[1.3rem] w-[1.3rem]" />
                        </button>
                      )}
                      <button className="p-1.5 text-neutral-600 hover:text-green-600 hover:bg-green-50 rounded-md">
                        <TbBrandWhatsapp className="h-[1.3rem] w-[1.3rem]" />
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => onView(query)}
                        className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                        title="View details"
                      >
                        <TbEye className="h-[1.3rem] w-[1.3rem]" />
                      </button>
                      <button
                        onClick={() => onEdit(query)}
                        className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                        title="Edit query"
                      >
                        <TbEdit className="h-[1.3rem] w-[1.3rem]" />
                      </button>
                      {query.status !== "processed" &&
                        query.status !== "converted" && (
                          <button
                            onClick={() => onProcessQuery(query)}
                            className="p-1.5 text-neutral-600 hover:text-green-600 hover:bg-green-50 rounded-md"
                            title="Mark as processed"
                          >
                            <TbCheck className="h-[1.3rem] w-[1.3rem]" />
                          </button>
                        )}
                      {query.status !== "converted" && (
                        <button
                          onClick={() => onConvertToLead(query)}
                          className="p-1.5 text-neutral-600 hover:text-secondary-600 hover:bg-secondary-50 rounded-md"
                          title="Convert to lead"
                        >
                          <TbUserPlus className="h-[1.3rem] w-[1.3rem]" />
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(query.id)}
                        className="p-1.5 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete query"
                      >
                        <TbTrash className="h-[1.3rem] w-[1.3rem]" />
                      </button>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-neutral-50 rounded-lg mx-1 py-3 mt-3 border-t border-neutral-200 sm:px-6 flex items-center justify-between">
        <div className="text-sm text-neutral-600">
          Showing <span className="">{filteredQueries.length}</span>{" "}
          of <span className="">{queries.length}</span> queries
        </div>

        <div>
          <button
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center text-sm"
            onClick={() => onEdit(null)} // Pass null to create a new query
          >
            <TbMessageCircle className="mr-2 h-4 w-4" /> Add New Query
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryList;
