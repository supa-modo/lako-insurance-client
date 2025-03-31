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
} from "react-icons/tb";
import { BiStats } from "react-icons/bi";
import QueryList from "../../components/queries/QueryList";
import QueryDetail from "../../components/queries/QueryDetail";
import QueryForm from "../../components/queries/QueryForm";

const QueryManagementPage = () => {
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
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingQuery, setEditingQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("list"); // 'list', 'detail', 'form'
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    processing: 0,
    processed: 0,
    converted: 0,
    priority: 0,
  });

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
      priority: queriesData.filter((q) => q.isPriority).length,
    };
    setStats(newStats);
  };

  // Handle adding a new query
  const handleAddQuery = () => {
    setEditingQuery(null);
    setIsFormVisible(true);
    setCurrentView("form");
  };

  // Handle editing a query
  const handleEditQuery = (query) => {
    setEditingQuery(query);
    setIsFormVisible(true);
    setCurrentView("form");
  };

  // Handle viewing a query
  const handleViewQuery = (query) => {
    setSelectedQuery(query);
    setCurrentView("detail");
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

    setIsFormVisible(false);
    setEditingQuery(null);
    setCurrentView("list");
  };

  // Handle canceling the form
  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingQuery(null);
    setCurrentView(selectedQuery ? "detail" : "list");
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

      // If we were viewing this query, go back to the list
      if (selectedQuery && selectedQuery.id === queryId) {
        setSelectedQuery(null);
        setCurrentView("list");
      }
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
    setSelectedQuery(null);
    setCurrentView("list");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              Client Queries
            </h1>
            <p className="text-neutral-500 mt-1">
              Manage and respond to client inquiries
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbSearch className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={handleSearch}
                className="block pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>

            <button
              onClick={handleRefresh}
              className="p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              title="Refresh queries"
            >
              <TbRefresh className="h-5 w-5" />
            </button>

            <button
              onClick={handleAddQuery}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
            >
              <TbPlus className="mr-1.5 h-5 w-5" />
              New Query
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-6 pt-5 pb-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
            <div className="flex items-center">
              <div className="bg-primary-100 p-2 rounded-md text-primary-600 mr-3">
                <TbMessageCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Total Queries</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-md text-blue-600 mr-3">
                <TbMessageCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">New</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {stats.new}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-md text-yellow-600 mr-3">
                <TbLoader className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Processing</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {stats.processing}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-md text-green-600 mr-3">
                <TbCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Processed</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {stats.processed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
            <div className="flex items-center">
              <div className="bg-secondary-100 p-2 rounded-md text-secondary-600 mr-3">
                <TbUserPlus className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Converted</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {stats.converted}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
            <div className="flex items-center">
              <div className="bg-amber-100 p-2 rounded-md text-amber-600 mr-3">
                <TbAlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Priority</p>
                <p className="text-2xl font-semibold text-neutral-900">
                  {stats.priority}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden px-6 py-4">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-neutral-300 border-t-primary-600 mb-2"></div>
              <p className="text-neutral-600">Loading queries...</p>
            </div>
          </div>
        ) : (
          <div className="h-full rounded-lg shadow-sm overflow-hidden bg-white border border-neutral-200">
            {currentView === "list" && (
              <QueryList
                queries={queries}
                searchTerm={searchTerm}
                onView={handleViewQuery}
                onEdit={handleEditQuery}
                onDelete={handleDeleteQuery}
                onProcessQuery={handleProcessQuery}
                onConvertToLead={handleConvertToLead}
              />
            )}

            {currentView === "detail" && (
              <QueryDetail
                query={selectedQuery}
                onBack={handleBackToList}
                onEdit={handleEditQuery}
                onDelete={handleDeleteQuery}
                onProcessQuery={handleProcessQuery}
                onConvertToLead={handleConvertToLead}
              />
            )}

            {currentView === "form" && (
              <QueryForm
                query={editingQuery}
                onSubmit={handleSaveQuery}
                onCancel={handleCancelForm}
              />
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-neutral-200 px-6 py-3">
        <div className="flex flex-wrap justify-between items-center text-sm text-neutral-500">
          <div>Showing {queries.length} queries</div>
          <div className="flex space-x-4">
            <button className="flex items-center hover:text-primary-600">
              <BiStats className="mr-1 h-4 w-4" />
              Generate Report
            </button>
            <button className="flex items-center hover:text-primary-600">
              <TbDatabaseExport className="mr-1 h-4 w-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryManagementPage;
