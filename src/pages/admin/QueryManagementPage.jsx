import React, { useState, useEffect } from "react";
import {
  TbSearch,
  TbPlus,
  TbFilter,
  TbMessageCircle,
  TbTable,
  TbAlertTriangle,
  TbCheck,
  TbLoader,
  TbChartBar,
  TbReport,
  TbUserPlus,
  TbTag,
  TbDatabaseExport,
  TbRefresh,
  TbLayoutGrid,
  TbLayoutList,
  TbX,
  TbChevronDown,
  TbListDetails,
  TbMessageDots,
  TbMessagePlus,
  TbClock,
} from "react-icons/tb";
import { BiStats } from "react-icons/bi";
import QueryList from "../../components/queries/QueryList";
import QueryDetail from "../../components/queries/QueryDetail";
import QueryForm from "../../components/queries/QueryForm";
import QueryTable from "../../components/queries/QueryTable";
import { RiUserAddLine } from "react-icons/ri";
import { PiCaretDownDuotone } from "react-icons/pi";

const QueryManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  // Generate mock query data
  const getMockQueries = () => {
    const statuses = ["new", "processing", "processed", "converted"];
    const coverageTypes = [
      "Health Insurance",
      "Life Insurance",
      "Auto Insurance",
      "Property Insurance",
      "Business Insurance",
      "Travel Insurance",
    ];

    const planNames = [
      "Comprehensive Health Cover",
      "Family Shield Plan",
      "Business Protection Plus",
      "Executive Health Package",
      "Travel Secure Gold",
      "Motor Comprehensive Plus",
      "Home & Property Secure",
      "Life Assurance Premium",
    ];

    const providers = [
      "Kenya Insurance Corp",
      "Jubilee Insurance",
      "Britam Insurance",
      "AAR Insurance",
      "Resolution Insurance",
      "CIC Insurance Group",
      "ICEA Lion",
    ];

    return Array(12)
      .fill()
      .map((_, i) => {
        const id = `QRY-${2023}-${1000 + i}`;
        const isPriority = Math.random() > 0.7;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const coverageType =
          coverageTypes[Math.floor(Math.random() * coverageTypes.length)];
        const budget =
          Math.random() > 0.5
            ? Math.floor(Math.random() * 100000) + 5000
            : {
                min: Math.floor(Math.random() * 50000) + 5000,
                max: Math.floor(Math.random() * 100000) + 60000,
              };

        // Generate matching plans for some queries
        const matchingPlans =
          Math.random() > 0.5
            ? Array(Math.floor(Math.random() * 3) + 1)
                .fill()
                .map(() => ({
                  name: planNames[Math.floor(Math.random() * planNames.length)],
                  provider:
                    providers[Math.floor(Math.random() * providers.length)],
                  premium: Math.floor(Math.random() * 50000) + 5000,
                  features: ["Coverage A", "Coverage B", "Benefit C"].slice(
                    0,
                    Math.floor(Math.random() * 3) + 1
                  ),
                }))
            : [];

        // Generate preferred plans for some queries
        const preferredPlans =
          Math.random() > 0.6
            ? Array(Math.floor(Math.random() * 3) + 1)
                .fill()
                .map(
                  () => planNames[Math.floor(Math.random() * planNames.length)]
                )
            : [];

        return {
          id,
          clientName: `Client ${i + 1}`,
          email: `client${i + 1}@example.com`,
          phone: `+254 7${Math.floor(Math.random() * 100000000)}`,
          summary: `Query about ${coverageType} options and pricing`,
          details:
            Math.random() > 0.3
              ? `Client is looking for ${coverageType} options that provide comprehensive coverage. They have specific requirements about the coverage period and benefits.`
              : "",
          budget,
          date: new Date(
            2023,
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
          ).toISOString(),
          status,
          coverageType,
          isPriority,
          age: Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 18 : null,
          requirements:
            Math.random() > 0.6
              ? "Coverage should include international options. Looking for both individual and family plans."
              : "",
          notes:
            status !== "new" && Math.random() > 0.5
              ? "Initial contact made. Client is interested in premium options and has requested a callback for detailed discussion."
              : "",
          preferredPlans,
          matchingPlans,
        };
      });
  };

  // State
  const [queries, setQueries] = useState([]);
  const [allQueries, setAllQueries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [editingQuery, setEditingQuery] = useState(null);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [showQueryDetail, setShowQueryDetail] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    processing: 0,
    processed: 0,
    converted: 0,
  });
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch queries on mount
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockQueries = getMockQueries();
      setQueries(mockQueries);
      updateStats(mockQueries);
      setIsLoading(false);
    }, 800);
  }, []);

  // Update statistics based on queries
  const updateStats = (queriesData) => {
    const newStats = {
      total: queriesData.length,
      new: queriesData.filter((q) => q.status === "new").length,
      processing: queriesData.filter((q) => q.status === "processing").length,
      processed: queriesData.filter((q) => q.status === "processed").length,
      converted: queriesData.filter((q) => q.status === "converted").length,
    };
    setStats(newStats);
  };

  // Handle adding a new query
  const handleAddQuery = () => {
    setEditingQuery(null);
    setShowQueryForm(true);
  };

  // Handle editing a query
  const handleEditQuery = (query) => {
    setEditingQuery(query);
    setShowQueryForm(true);
  };

  // Handle viewing a query
  const handleViewQuery = (query) => {
    setSelectedQuery(query);

    setShowQueryDetail(true);
  };

  // Handle submitting the query form
  const handleSaveQuery = (formData) => {
    if (editingQuery) {
      // Update existing query
      const updatedQueries = queries.map((q) =>
        q.id === editingQuery.id ? { ...formData, id: editingQuery.id } : q
      );
      setQueries(updatedQueries);
      updateStats(updatedQueries);

      // If we were viewing this query, update the selected query
      if (selectedQuery && selectedQuery.id === editingQuery.id) {
        setSelectedQuery({ ...formData, id: editingQuery.id });
      }
    } else {
      // Add new query with generated ID
      const newQuery = {
        ...formData,
        id: `QRY-${new Date().getFullYear()}-${1000 + queries.length}`,
        date: new Date().toISOString(),
        status: "new",
      };
      const updatedQueries = [...queries, newQuery];
      setQueries(updatedQueries);
      updateStats(updatedQueries);
    }

    setShowQueryForm(false);
    setEditingQuery(null);
  };

  // Handle canceling the form
  const handleCancelForm = () => {
    setShowQueryForm(false);
    setEditingQuery(null);
  };

  // Handle processing a query
  const handleProcessQuery = (query) => {
    const updatedQueries = queries.map((q) =>
      q.id === query.id ? { ...q, status: "processed" } : q
    );
    setQueries(updatedQueries);
    updateStats(updatedQueries);

    // Update selected query if applicable
    if (selectedQuery && selectedQuery.id === query.id) {
      setSelectedQuery({ ...query, status: "processed" });
    }
  };

  // Handle converting a query to a lead
  const handleConvertToLead = (query) => {
    const updatedQueries = queries.map((q) =>
      q.id === query.id ? { ...q, status: "converted" } : q
    );
    setQueries(updatedQueries);
    updateStats(updatedQueries);

    // Update selected query if applicable
    if (selectedQuery && selectedQuery.id === query.id) {
      setSelectedQuery({ ...query, status: "converted" });
    }

    // In a real app, you would also create a lead in the CRM system here
    alert(
      `Query ${query.id} has been converted to a lead. In a real application, this would create a lead in the CRM.`
    );
  };

  // Handle deleting a query
  const handleDeleteQuery = (queryId) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      const updatedQueries = queries.filter((q) => q.id !== queryId);
      setQueries(updatedQueries);
      updateStats(updatedQueries);

      // If the deleted query is the selected one, close the detail view
      if (selectedQuery && selectedQuery.id === queryId) {
        setShowQueryDetail(false);
        setSelectedQuery(null);
      }
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle refreshing queries
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const mockQueries = getMockQueries();
      setQueries(mockQueries);
      updateStats(mockQueries);
      setIsLoading(false);
    }, 800);
  };

  // Handle back button in detail view
  const handleBackToList = () => {
    setShowQueryDetail(false);
    setSelectedQuery(null);
  };

  // Handle sorting
  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-neutral-700">
              Insurance Query Management
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and process insurance query requests from clients
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button
              onClick={handleRefresh}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <TbRefresh
                className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>

            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search queries..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-96 bg-neutral-100 text-neutral-800 pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 min-w-[200px]"
                />
                <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>

            <div className="flex bg-neutral-300 rounded-lg p-[0.2rem]">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-700 hover:text-primary-600"
                }`}
                title="Grid view"
              >
                <TbLayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md ${
                  viewMode === "table"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-700 hover:text-primary-600"
                }`}
                title="Table view"
              >
                <TbListDetails className="h-5 w-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex relative gap-3">
              <select
                className="block w-full bg-neutral-100 text-neutral-800 py-2 pl-3 pr-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="processing">Processing</option>
                <option value="processed">Processed</option>
                <option value="converted">Converted to Lead</option>
              </select>

              <PiCaretDownDuotone className="absolute right-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-700 pointer-events-none" />
            </div>

            <button
              onClick={() => handleAddQuery()}
              className="bg-primary-600 text-white rounded-lg px-6 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
            >
              <TbPlus className="mr-2 h-5 w-5" />
              Add New Query
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* Total Queries */}
            <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-primary-500">
              <div className="flex items-center">
                <div className="p-3 bg-primary-100 rounded-lg mr-3">
                  <TbMessageDots className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-700">
                    Total Queries
                  </div>
                  <div className="text-2xl font-bold text-neutral-800">
                    {stats.total}
                  </div>
                </div>
              </div>
            </div>

            {/* New Queries */}
            <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-3">
                  <TbMessagePlus className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-700">
                    New Queries
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.new}
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Queries */}
            <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-200 rounded-lg mr-3">
                  <TbClock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-700">
                    Processing
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.processing}
                  </div>
                </div>
              </div>
            </div>

            {/* Processed Queries */}
            <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="p-3 bg-green-200 rounded-lg mr-3">
                  <TbCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-700">
                    Processed
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.processed}
                  </div>
                </div>
              </div>
            </div>

            {/* Converted Queries */}
            <div className="bg-white rounded-lg shadow-md p-3 border-l-4 border-secondary-500">
              <div className="flex items-center">
                <div className="p-3 bg-secondary-200 rounded-lg mr-3">
                  <RiUserAddLine className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-700">
                    Converted
                  </div>
                  <div className="text-2xl font-bold text-secondary-600">
                    {stats.converted}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="overflow-hidden">
            {/* Queries List */}
            <div className="overflow-auto h-[calc(100vh-263px)]">
              {isLoading ? (
                <div className="p-6 text-center text-gray-500">
                  Loading queries...
                </div>
              ) : queries.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No queries found. Create a new one to get started.
                </div>
              ) : (
                <div className="overflow-auto flex-1">
                  {viewMode === "grid" ? (
                    <QueryList
                      queries={queries}
                      searchTerm={searchQuery}
                      selectedStatus={selectedStatus}
                      onView={handleViewQuery}
                      onEdit={handleEditQuery}
                      onDelete={handleDeleteQuery}
                      onProcessQuery={handleProcessQuery}
                      onConvertToLead={handleConvertToLead}
                    />
                  ) : (
                    <QueryTable
                      queries={queries}
                      onView={handleViewQuery}
                      onEdit={handleEditQuery}
                      onDelete={handleDeleteQuery}
                      onProcessQuery={handleProcessQuery}
                      onConvertToLead={handleConvertToLead}
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Query Form Modal */}
      {showQueryForm && (
        <QueryForm
          query={editingQuery}
          onSubmit={handleSaveQuery}
          onCancel={handleCancelForm}
        />
      )}

      {/* Query Detail Modal */}
      {showQueryDetail && (
        <QueryDetail
          query={selectedQuery}
          onClose={handleBackToList}
          onEdit={handleEditQuery}
          onDelete={handleDeleteQuery}
          onProcessQuery={handleProcessQuery}
          onConvertToLead={handleConvertToLead}
        />
      )}
    </div>
  );
};

export default QueryManagementPage;
