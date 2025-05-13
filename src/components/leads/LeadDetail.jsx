import React, { useState, useEffect } from "react";
import { PiCaretDownDuotone, PiInfo, PiInfoBold, PiUserDuotone, PiUserListDuotone } from "react-icons/pi";
import leadActivityService from "../../services/leadActivityService";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
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
  TbInfoCircle,
  TbArrowsDown,
  TbArrowsDownUp,
  TbMailFilled,
  TbPhoneCall,
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
        borderColor: "border-blue-300",
      };
    case "proposal":
      return {
        bgColor: "bg-purple-100",
        textColor: "text-purple-800",
        label: "Proposal",
        borderColor: "border-purple-300",
      };
    case "negotiation":
      return {
        bgColor: "bg-pink-100",
        textColor: "text-pink-800",
        label: "Negotiation",
        borderColor: "border-pink-300",
      };
    case "converted":
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        label: "Converted",
        borderColor: "border-green-300",
      };
    default:
      return {
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
        label: "Unknown",
        borderColor: "border-gray-300",
      };
  }
};

const LeadDetail = ({ lead, onClose, onEdit, onDelete }) => {
  if (!lead) return null;

  const { user } = useAuth();
  const priorityInfo = getPriorityInfo(lead.priority);
  const statusInfo = getStatusInfo(lead.status);

  const [activityHistory, setActivityHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newActivity, setNewActivity] = useState({
    type: "note",
    content: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [userMap, setUserMap] = useState({});

  // Fetch lead activities and user data
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await leadActivityService.getLeadActivities(lead.id);
        if (response.success) {
          // Activities should already have userName from backend
          setActivityHistory(response.data);
          
          // But as a fallback, we'll still maintain the userMap for any activities without userName
          // We won't need to make a separate API call as the backend should already provide this info
        } else {
          setError("Failed to load activities");
        }
      } catch (err) {
        setError("An error occurred while fetching activities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (lead?.id) {
      fetchActivities();
    }
  }, [lead?.id]);

  // Handle adding a new activity
  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!newActivity.content.trim()) return;

    try {
      setSubmitting(true);
      
      // Get current user information
      let userIdentifier = "System";
      
      if (user?.id) {
        // If we have a user ID, use it regardless of format
        // The backend will handle validation
        userIdentifier = user.id;
      } else if (user?.firstName && user?.lastName) {
        // If no ID but we have a name, use that
        userIdentifier = `${user.firstName} ${user.lastName}`;
      }
      
      const activityData = {
        ...newActivity,
        date: new Date().toISOString(),
        user: userIdentifier
      };

      const response = await leadActivityService.addLeadActivity(lead.id, activityData);
      
      if (response.success) {
        // Add the new activity to the list
        setActivityHistory([response.data, ...activityHistory]);
        // Reset the form
        setNewActivity({
          type: "note",
          content: ""
        });
      } else {
        setError("Failed to add activity");
      }
    } catch (err) {
      setError("An error occurred while adding activity");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

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
                    <span className="mr-3">Age: {lead.age} years</span>
                    <span
                      className={`${statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor} border px-3 py-0.5 rounded-full text-xs font-medium`}
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
                    {lead.assignedToName || "Not Assigned"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4 text-sm">
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
              <button className="border hover:bg-blue-200 text-blue-600 px-5 py-1.5 rounded-md flex items-center transition-colors text-sm">
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
              <TbMessage2Star className="mr-2" /> Client Notes
            </h3>
            <div className="bg-neutral-200 rounded-md px-4 py-2 min-h-[100px]">
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {lead.notes || "No notes available for this lead."}
              </p>
            </div>
          </div>

          {/* Add New Activity */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <TbMessageCircle className="mr-2" /> Add Activity
            </h3>
            <form onSubmit={handleAddActivity} className="mb-6">
              <div className="flex mb-2">
                <div className="relative">
                <select
                  value={newActivity.type}
                  onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
                  className="relative mr-2 pr-7 pl-2 py-2 bg-neutral-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="note">Note</option>
                  <option value="email">Email</option>
                  <option value="call">Call</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
                <PiCaretDownDuotone className="absolute right-4 top-0 bottom-0 my-auto h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                <input
                  type="text"
                  value={newActivity.content}
                  onChange={(e) => setNewActivity({...newActivity, content: e.target.value})}
                  placeholder="Add a note, email summary, call details..."
                  className="flex-1 p-2 bg-neutral-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting || !newActivity.content.trim()}
                  className="ml-2 bg-primary-600 text-white py-2 px-2.5 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TbSend className="w-5 h-5" />
                </button>
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </form>

            {/* Activity History */}
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <TbHistory className="mr-2" /> Activity History
            </h3>
            
            {loading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-600"></div>
                <p className="mt-2 text-sm text-gray-500">Loading activities...</p>
              </div>
            ) : activityHistory.length === 0 ? (
              <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500">No activities recorded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activityHistory.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-2 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center">
                        <span
                          className={`w-8 h-8 rounded-full mr-2 flex items-center justify-center ${
                            activity.type === "note"
                              ? "bg-primary-200 text-primary-600"
                              : activity.type === "email"
                              ? "bg-purple-200 text-purple-600"
                              : activity.type === "call"
                              ? "bg-green-200 text-green-600"
                              : activity.type === "whatsapp"
                              ? "bg-green-200 text-green-600"
                              : activity.type === "statusChange"
                              ? "bg-blue-200 text-blue-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {activity.type === "note" ? (
                            <TbMessageCircle />
                          ) : activity.type === "email" ? (
                            <TbMailFilled />
                          ) : activity.type === "call" ? (
                            <TbPhoneCall />
                          ) : activity.type === "whatsapp" ? (
                            <TbBrandWhatsapp />
                          ) : (
                            <TbArrowsDownUp size={14} className="rotate-90" />
                          )}
                        </span>
                        <p className="text-sm text-gray-600">
                      {activity.content}
                    </p>
                      </div>
                    </div>
                    
                    <div className=" ml-10">
                          <span className="text-sm font-medium text-gray-700">
                            {activity.userName || userMap[activity.user] || activity.user || "System"}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {formatDate(activity.date)}
                          </span>
                        </div>
                  </div>
                ))}
              </div>
            )}
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
    </div>
  );
};

export default LeadDetail;
