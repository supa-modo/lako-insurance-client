import React, { useState } from "react";
import {
  TbFileText,
  TbDownload,
  TbCalendar,
  TbFilter,
  TbRefresh,
  TbChevronDown,
  TbMail,
  TbEye,
  TbTrash,
  TbCheck,
  TbX,
  TbClock,
  TbChartBar,
  TbUsers,
  TbShieldCheck,
  TbCurrencyDollar,
} from "react-icons/tb";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState("month");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock report types
  const reportTypes = [
    {
      id: "revenue",
      name: "Revenue Report",
      description:
        "Detailed breakdown of revenue streams and financial metrics",
      icon: TbCurrencyDollar,
      color: "purple",
    },
    {
      id: "clients",
      name: "Client Analytics",
      description: "Client acquisition, retention, and demographic analysis",
      icon: TbUsers,
      color: "blue",
    },
    {
      id: "policies",
      name: "Policy Performance",
      description: "Policy sales, renewals, and performance metrics",
      icon: TbShieldCheck,
      color: "green",
    },
    {
      id: "conversion",
      name: "Conversion Analysis",
      description: "Lead to client conversion rates and funnel analysis",
      icon: TbChartBar,
      color: "orange",
    },
  ];

  // Mock generated reports
  const generatedReports = [
    {
      id: "1",
      name: "Monthly Revenue Report",
      type: "revenue",
      date: "2024-01-15",
      status: "completed",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Q4 Client Analytics",
      type: "clients",
      date: "2024-01-10",
      status: "completed",
      size: "3.1 MB",
    },
    {
      id: "3",
      name: "Annual Policy Review",
      type: "policies",
      date: "2024-01-01",
      status: "completed",
      size: "5.6 MB",
    },
    {
      id: "4",
      name: "Conversion Report - December",
      type: "conversion",
      date: "2023-12-31",
      status: "completed",
      size: "1.8 MB",
    },
  ];

  // Handle report generation
  const handleGenerateReport = () => {
    if (!selectedReport) return;

    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // Show success message or handle the generated report
    }, 2000);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-1">
            Generate and manage business reports
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>

          <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-lg">
            <TbRefresh className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-6 rounded-xl border ${
              selectedReport === report.id
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 bg-white hover:border-primary-300"
            } transition-colors`}
          >
            <div
              className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center mb-4`}
            >
              <report.icon className={`h-6 w-6 text-${report.color}-600`} />
            </div>
            <h3 className="text-gray-900 font-semibold mb-2">{report.name}</h3>
            <p className="text-sm text-gray-500">{report.description}</p>
          </button>
        ))}
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Generate Report
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <select
              value={selectedReport || ""}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a report type</option>
              {reportTypes.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleGenerateReport}
              disabled={!selectedReport || isGenerating}
              className={`px-6 py-2 rounded-lg text-white ${
                !selectedReport || isGenerating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700"
              } flex items-center`}
            >
              {isGenerating ? (
                <>
                  <TbClock className="animate-spin h-5 w-5 mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <TbFileText className="h-5 w-5 mr-2" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Generated Reports
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Generated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {generatedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {report.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {
                        reportTypes.find((type) => type.id === report.type)
                          ?.name
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {formatDate(report.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button className="text-gray-400 hover:text-primary-600">
                        <TbEye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-primary-600">
                        <TbDownload className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600">
                        <TbTrash className="h-5 w-5" />
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
  );
};

export default ReportsPage;
