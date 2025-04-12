import React from "react";
import { PiUserDuotone, PiUserListDuotone } from "react-icons/pi";
import {
  TbUser,
  TbPhone,
  TbMail,
  TbCalendar,
  TbClock,
  TbCurrencyDollar,
  TbChartBar,
  TbStar,
  TbEdit,
  TbTrash,
  TbX,
  TbMessageCircle,
  TbCheck,
  TbArrowRight,
  TbSend,
  TbHistory,
  TbBrandWhatsapp,
  TbCalendarPlus,
  TbMessage2Plus,
  TbMessage2Star,
} from "react-icons/tb";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Helper function to check if a date is overdue
const isOverdue = (dateString) => {
  if (!dateString) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(dateString);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

// Helper function to get priority color
const getPriorityInfo = (priority) => {
  switch (priority) {
    case "high":
      return {
        color: "red",
        label: "High Priority",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    case "medium":
      return {
        color: "yellow",
        label: "Medium Priority",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
      };
    case "low":
      return {
        color: "blue",
        label: "Low Priority",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      };
    default:
      return {
        color: "gray",
        label: "Not Set",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
      };
  }
};

// Helper function to get status info
const getStatusInfo = (status) => {
  switch (status) {
    case "new":
      return {
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        label: "New Lead",
      };
    case "proposal":
      return {
        bgColor: "bg-purple-100",
        textColor: "text-purple-800",
        label: "Proposal",
      };
    case "negotiation":
      return {
        bgColor: "bg-pink-100",
        textColor: "text-pink-800",
        label: "Negotiation",
      };
    case "converted":
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        label: "Converted",
      };
    default:
      return {
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        label: "Unknown",
      };
  }
};

const LeadDetail = ({ lead, onClose, onEdit, onDelete }) => {
  if (!lead) return null;

  const priorityInfo = getPriorityInfo(lead.priority);
  const statusInfo = getStatusInfo(lead.status);

  // Mock activity history
  const activityHistory = [
    {
      id: 1,
      type: "note",
      date: "2023-10-12T14:30:00",
      user: "Mary W.",
      content:
        "Client is interested in Senior Gold and Senior Premium plans. Follow up next week.",
    },
    {
      id: 2,
      type: "email",
      date: "2023-10-10T09:15:00",
      user: "System",
      content: "Initial welcome email sent to client.",
    },
    {
      id: 3,
      type: "call",
      date: "2023-10-08T11:20:00",
      user: "James O.",
      content:
        "Had an introductory call with client to discuss their insurance needs.",
    },
    {
      id: 4,
      type: "statusChange",
      date: "2023-10-05T08:00:00",
      user: "System",
      content: `Lead status changed from "New" to "${statusInfo.label}"`,
    },
  ];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50 p-3"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[550px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-2xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <span>Lead Details</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-84px)]">
          {/* Summary section */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold">
                {lead.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-semibold text-gray-800">
                  {lead.name}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-3">Age: {lead.age}</span>
                  <span
                    className={`${statusInfo.bgColor} ${statusInfo.textColor} px-2 py-0.5 rounded-full text-xs font-medium`}
                  >
                    {statusInfo.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-start">
                <div className="mt-0.5 text-gray-400">
                  <TbMail className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="text-gray-700">{lead.email}</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-0.5 text-gray-400">
                  <TbPhone className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Phone</div>
                  <div className="text-gray-700">{lead.phone}</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-0.5 text-gray-400">
                  <TbCurrencyDollar className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Budget</div>
                  <div className="text-gray-700">{lead.budget}</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className={`mt-0.5 text-${priorityInfo.color}-500`}>
                  <TbStar className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500">Priority</div>
                  <div className={`${priorityInfo.textColor} font-medium`}>
                    {priorityInfo.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {lead.tags && lead.tags.length > 0 && (
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Lead Status */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">Lead Status</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-500">Current Status</div>
                <span
                  className={`${statusInfo.bgColor} ${statusInfo.textColor} px-2 py-0.5 rounded-md text-xs font-medium mt-1 inline-block`}
                >
                  {statusInfo.label}
                </span>
              </div>

              <div>
                <div className="text-xs text-gray-500">Assigned To</div>
                <div className="text-gray-700">
                  {lead.assignedTo || "Not Assigned"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Last Contact</div>
                <div className="text-gray-700">
                  {lead.lastContact ? formatDate(lead.lastContact) : "—"}
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Next Follow-up</div>
                <div
                  className={
                    isOverdue(lead.nextFollowUp)
                      ? "text-red-600 font-medium"
                      : "text-gray-700"
                  }
                >
                  {lead.nextFollowUp ? formatDate(lead.nextFollowUp) : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onEdit(lead)}
                className="bg-primary-100 hover:bg-primary-200 text-primary-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm"
              >
                <TbEdit className="mr-1.5 w-4 h-4" /> Edit
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbSend className="mr-1.5 w-4 h-4" /> Email
              </button>
              <button className="bg-green-100 hover:bg-green-200 text-green-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbBrandWhatsapp className="mr-1.5 w-4 h-4" /> WhatsApp
              </button>
              <button className="bg-purple-100 hover:bg-purple-200 text-purple-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbPhone className="mr-1.5 w-4 h-4" /> Call
              </button>
              <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbCalendarPlus className="mr-1.5 w-4 h-4" /> Schedule
              </button>
            </div>
            <div className="mt-3">
              <button
                onClick={() => onDelete(lead.id)}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-md flex items-center transition-colors text-sm"
              >
                <TbTrash className="mr-1.5 w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <TbMessage2Star className="mr-2 text-yellow-600" /> Lead Notes
            </h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">
              {lead.notes || "No notes available for this lead."}
            </p>
          </div>

          {/* Activity History */}
          <div className="p-5">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <TbHistory className="mr-2 text-blue-600" /> Activity History
            </h3>
            <div className="space-y-3">
              {activityHistory.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start bg-white rounded-lg p-3 border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div
                    className={`p-2 rounded-full 
                      ${
                        activity.type === "email"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "call"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "note"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-purple-100 text-purple-600"
                      }
                    `}
                  >
                    {activity.type === "email" ? (
                      <TbMail className="h-4 w-4" />
                    ) : activity.type === "call" ? (
                      <TbPhone className="h-4 w-4" />
                    ) : activity.type === "note" ? (
                      <TbMessageCircle className="h-4 w-4" />
                    ) : (
                      <TbArrowRight className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-800">
                        {activity.user}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatDate(activity.date)}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">
                      {activity.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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

export default LeadDetail;
