import React, { useState, useEffect } from "react";
import {
  TbRefresh,
  TbSearch,
  TbFilter,
  TbChevronDown,
  TbCalendarEvent,
  TbClock,
  TbCheck,
  TbX,
  TbAlertTriangle,
  TbReport,
  TbDatabaseExport,
  TbMail,
  TbPhone,
  TbUserCheck,
  TbArrowUp,
  TbArrowDown,
  TbEdit,
  TbEye,
  TbPlus,
} from "react-icons/tb";

import RenewalModal from "../../components/renewals/RenewalModal";
import { useNotification } from "../../context/NotificationContext";

const RenewalsPage = () => {
  const { showConfirmation } = useNotification();

  // State management
  const [renewals, setRenewals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState({
    field: "dueDate",
    direction: "asc",
  });
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    overdue: 0,
    processed: 0,
  });
  const [selectedRenewal, setSelectedRenewal] = useState(null);
  const [showRenewalModal, setShowRenewalModal] = useState(false);

  // Mock data
  useEffect(() => {
    const mockRenewals = [
      {
        id: "RNW-2023-001",
        clientName: "John Mwangi",
        policyNumber: "POL-2023-1234",
        policyType: "Premium Senior Gold",
        currentPremium: "KES 48,000",
        dueDate: "2024-02-15",
        status: "upcoming",
        contactInfo: {
          phone: "+254 712 345678",
          email: "john.mwangi@example.com",
        },
        lastContact: "2024-01-20",
        notes: "Client expressed interest in upgrading coverage",
      },
      {
        id: "RNW-2023-002",
        clientName: "Sarah Njoroge",
        policyNumber: "POL-2023-5678",
        policyType: "Senior Comprehensive",
        currentPremium: "KES 65,000",
        dueDate: "2024-01-10",
        status: "overdue",
        contactInfo: {
          phone: "+254 734 567890",
          email: "sarah.njoroge@example.com",
        },
        lastContact: "2024-01-05",
        notes: "Multiple attempts to contact - no response",
      },
      {
        id: "RNW-2023-003",
        clientName: "Peter Odhiambo",
        policyNumber: "POL-2023-9012",
        policyType: "Senior Basic Plus",
        currentPremium: "KES 36,000",
        dueDate: "2024-02-20",
        status: "upcoming",
        contactInfo: {
          phone: "+254 756 789012",
          email: "peter.odhiambo@example.com",
        },
        lastContact: "2024-01-15",
        notes: "Requested callback for premium discussion",
      },
      {
        id: "RNW-2023-004",
        clientName: "Mary Wanjiku",
        policyNumber: "POL-2023-3456",
        policyType: "Senior Elite Care",
        currentPremium: "KES 85,000",
        dueDate: "2024-01-05",
        status: "processed",
        contactInfo: {
          phone: "+254 778 901234",
          email: "mary.wanjiku@example.com",
        },
        lastContact: "2024-01-02",
        notes: "Renewal processed - upgraded to Premium plan",
      },
    ];

    setRenewals(mockRenewals);
    updateStats(mockRenewals);
    setIsLoading(false);
  }, []);

  // Update statistics
  const updateStats = (renewalsList) => {
    const now = new Date();
    const stats = {
      total: renewalsList.length,
      upcoming: 0,
      overdue: 0,
      processed: 0,
    };

    renewalsList.forEach((renewal) => {
      const dueDate = new Date(renewal.dueDate);
      if (renewal.status === "processed") {
        stats.processed++;
      } else if (dueDate < now) {
        stats.overdue++;
      } else {
        stats.upcoming++;
      }
    });

    setStats(stats);
  };

  // Handle sorting
  const handleSort = (field) => {
    setSorting({
      field,
      direction:
        sorting.field === field && sorting.direction === "asc" ? "desc" : "asc",
    });
  };

  // Get sorted renewals
  const getSortedRenewals = () => {
    return [...renewals].sort((a, b) => {
      const aValue = a[sorting.field];
      const bValue = b[sorting.field];
      const direction = sorting.direction === "asc" ? 1 : -1;

      if (typeof aValue === "string") {
        return direction * aValue.localeCompare(bValue);
      }
      return direction * (aValue - bValue);
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "processed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // In a real app, would fetch fresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Handle view renewal
  const handleViewRenewal = (renewal) => {
    setSelectedRenewal(renewal);
    setShowRenewalModal(true);
  };

  // Handle create renewal
  const handleCreateRenewal = () => {
    setSelectedRenewal({
      id: `RNW-${Date.now()}`,
      clientName: "",
      policyNumber: "",
      policyType: "",
      currentPremium: "",
      dueDate: new Date().toISOString(),
      status: "upcoming",
      contactInfo: {
        phone: "",
        email: "",
      },
      lastContact: "",
      notes: "",
    });
    setShowRenewalModal(true);
  };

  // Handle save renewal
  const handleSaveRenewal = (renewalData) => {
    const isNewRenewal = !renewals.some((r) => r.id === renewalData.id);

    if (isNewRenewal) {
      // Add new renewal
      setRenewals((prev) => [...prev, renewalData]);
    } else {
      // Update existing renewal
      setRenewals((prev) =>
        prev.map((r) => (r.id === renewalData.id ? renewalData : r))
      );
    }

    // Update stats
    updateStats([
      ...renewals.filter((r) => r.id !== renewalData.id),
      renewalData,
    ]);
    setShowRenewalModal(false);
    setSelectedRenewal(null);
  };

  // Handle process renewal
  const handleProcessRenewal = (renewalData) => {
    handleSaveRenewal({
      ...renewalData,
      status: "processed",
    });
  };

  // Handle delete renewal
  const handleDeleteRenewal = (renewalId) => {
    showConfirmation(
      "Are you sure you want to delete this renewal from the system?",
      () => {
        const updatedRenewals = renewals.filter((r) => r.id !== renewalId);
        setRenewals(updatedRenewals);
        updateStats(updatedRenewals);
        setShowRenewalModal(false);
        setSelectedRenewal(null);
      },
      null,
      {
        type: "delete",
        title: "Delete Renewal",
        confirmButtonText: "Delete",
      }
    );
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowRenewalModal(false);
    setSelectedRenewal(null);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Policy Renewals
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and process policy renewal requests
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search renewals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-[200px]"
                />
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div className="relative">
              <button className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center">
                <TbFilter className="h-4 w-4 mr-2" />
                Filter
                <TbChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>

            <button
              onClick={handleCreateRenewal}
              className="bg-primary-600 text-white rounded-lg px-4 py-2 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center text-sm"
            >
              <TbPlus className="h-5 w-5 mr-2" />
              Add Renewal
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 flex-1 overflow-hidden flex flex-col">
        {/* Renewal Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <TbCalendarEvent className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Total Renewals
                </div>
                <div className="text-2xl font-bold text-secondary-700">
                  {stats.total}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <TbClock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Upcoming
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.upcoming}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <TbAlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Overdue
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.overdue}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <TbCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Processed
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {stats.processed}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Renewals Table */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("clientName")}
                  >
                    <div className="flex items-center">
                      <span>Client</span>
                      {sorting.field === "clientName" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("policyType")}
                  >
                    <div className="flex items-center">
                      <span>Policy Details</span>
                      {sorting.field === "policyType" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("dueDate")}
                  >
                    <div className="flex items-center">
                      <span>Due Date</span>
                      {sorting.field === "dueDate" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("currentPremium")}
                  >
                    <div className="flex items-center">
                      <span>Premium</span>
                      {sorting.field === "currentPremium" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      <span>Status</span>
                      {sorting.field === "status" && (
                        <span className="ml-1">
                          {sorting.direction === "asc" ? (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getSortedRenewals().map((renewal) => (
                  <tr key={renewal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                          {renewal.clientName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {renewal.clientName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {renewal.contactInfo.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {renewal.policyType}
                      </div>
                      <div className="text-sm text-gray-500">
                        {renewal.policyNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(renewal.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Last contact:{" "}
                        {new Date(renewal.lastContact).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {renewal.currentPremium}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                          renewal.status
                        )}`}
                      >
                        {renewal.status.charAt(0).toUpperCase() +
                          renewal.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-400 hover:text-blue-600"
                          onClick={() => handleViewRenewal(renewal)}
                          title="View renewal"
                        >
                          <TbEye className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-primary-600"
                          onClick={() => handleViewRenewal(renewal)}
                          title="Edit renewal"
                        >
                          <TbEdit className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-600">
                          <TbMail className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-green-600">
                          <TbPhone className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
          <div>Showing {renewals.length} renewals</div>
          <div className="flex space-x-4">
            <button className="flex items-center hover:text-primary-600">
              <TbReport className="mr-1 h-4 w-4" />
              Generate Report
            </button>
            <button className="flex items-center hover:text-primary-600">
              <TbDatabaseExport className="mr-1 h-4 w-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Renewal Modal */}
      {showRenewalModal && (
        <RenewalModal
          renewal={selectedRenewal}
          onClose={handleCloseModal}
          onSave={handleSaveRenewal}
          onDelete={handleDeleteRenewal}
          onProcess={handleProcessRenewal}
        />
      )}
    </div>
  );
};

export default RenewalsPage;
