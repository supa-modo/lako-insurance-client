import React from "react";
import { PiUserDuotone, PiUserListDuotone } from "react-icons/pi";
import { RiUserShared2Line } from "react-icons/ri";
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
  TbInfoCircleFilled,
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
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-secondary-700 flex items-center">
            <span>Lead Details - {lead.name}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-200"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-84px)] px-2">
          {/* Summary section */}
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between pr-10">
              <div className="flex items-center mb-4">
                <div className="h-14 w-14 rounded-[0.7rem] uppercase bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-semibold">
                  {lead.name.charAt(0)}
                  {lead.name.charAt(1)}
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-bold text-primary-700 mb-1">
                    {lead.name}
                  </h4>
                  <div className="flex items-center text-[0.83rem] text-gray-500">
                    <span className="mr-3">Age: {lead.age}</span>
                    <span
                      className={`${statusInfo.bgColor} ${statusInfo.textColor} px-3 py-0.5 rounded-md text-xs font-medium`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-md px-6 py-2">
                <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                <div className="flex items-center text-primary-700">
                  <RiUserShared2Line size={20} className="mr-2" />
                  <span className="text-sm font-medium text-primary-700">
                    {lead.assignedTo || "Not Assigned"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex  gap-3 mt-4 text-sm">
              <div className="border-r pr-6 w-[45%]">
                <p className="text-primary-700 font-semibold text-sm mb-1">
                  Contact Details
                </p>
                <div className="flex items-start">
                  <div className="mt-0.5 text-gray-400">
                    <TbMail className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <div className="text-gray-700 text-[0.9rem]">
                      {lead.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start mt-1">
                  <div className="mt-0.5 text-gray-400">
                    <TbPhone className="h-5 w-5" />
                  </div>
                  <div className="ml-2">
                    <div className="text-gray-600 font-medium">
                      {lead.phone}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between w-[55%] pr-10">
                <div>
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

                  <div className="flex items-start mt-1">
                    <div className="mt-0.5 text-gray-400">
                      <TbCurrencyDollar className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-500">Budget</div>
                      <div className="text-primary-700 font-medium font-outfit">
                        {lead.budget}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
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
            </div>

            {/* Tags */}
            {lead.tags && lead.tags.length > 0 && (
              <div className="mt-4 flex items-center space-x-4">
                <div className="text-xs text-gray-500">Tags -</div>
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

          {/* Actions */}
          <div className="px-5 border-b border-gray-200">
            <div className="py-3 text-sm text-gray-500">Actions</div>
            <div className="pb-5 flex flex-wrap gap-2 font-medium">
              <button
                onClick={() => onEdit(lead)}
                className="border hover:bg-primary-200 text-primary-600 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm"
              >
                <TbEdit className="mr-1.5 w-4 h-4" /> Edit
              </button>
              <button className="border hover:bg-blue-200 text-blue-600 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbSend className="mr-1.5 w-4 h-4" /> Email
              </button>
              <button className="border hover:bg-green-200 text-green-600 px-5 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbBrandWhatsapp className="mr-1.5 w-4 h-4" /> WhatsApp
              </button>
              <button className="border hover:bg-neutral-400 text-neutral-700 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbPhone className="mr-1.5 w-4 h-4" /> Call
              </button>
              <button className="border hover:bg-yellow-200 text-yellow-600 px-4 py-1.5 rounded-md flex items-center transition-colors text-sm">
                <TbCalendarPlus className="mr-1.5 w-4 h-4" /> Schedule
              </button>
              <button
                onClick={() => onDelete(lead.id)}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-1.5 rounded-md flex items-center transition-colors text-sm"
              >
                <TbTrash className="mr-1.5 w-4 h-4" /> Delete
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-semibold text-primary-700 mb-3 flex items-center">
              <TbMessage2Star className="mr-2 " /> Client Notes
            </h3>
            <div className="bg-neutral-200 rounded-md px-4 py-2 min-h-[100px]">
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {lead.notes || "No notes available for this lead."}
              </p>
            </div>
          </div>

          {/* Activity History */}
          <div className="p-5">
            <h3 className="font-semibold text-primary-700 mb-3 flex items-center">
              <TbHistory className="mr-2 " /> Activity History
            </h3>
            <div className="space-y-2">
              {activityHistory.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center bg-white rounded-lg p-2 border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <TbInfoCircleFilled className="h-5 w-5 text-primary-500" />

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
