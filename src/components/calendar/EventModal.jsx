import React, { useState, useEffect, useRef } from "react";
import {
  TbX,
  TbCalendarEvent,
  TbClock,
  TbUser,
  TbUsers,
  TbTag,
  TbStar,
  TbAlignLeft,
  TbCheck,
  TbEdit,
  TbTrash,
  TbMailForward,
  TbAlertCircle,
  TbAlertTriangle,
  TbExternalLink,
  TbClipboardCheck,
  TbMapPin,
  TbSearch,
  TbLoader,
  TbLoader2,
} from "react-icons/tb";
import userService from "../../services/userService";
import { PiUsersDuotone } from "react-icons/pi";
import { motion } from "framer-motion";

const EventModal = ({
  event,
  slot,
  onClose,
  onSave,
  onDelete,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    type: "meeting",
    priority: "medium",
    assignedTo: "",
    assignedToId: "", // Store the user ID
    location: "",
    isCompleted: false,
  });

  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState(event && !isEditing ? "view" : "edit");
  
  // User search state
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [showUserResults, setShowUserResults] = useState(false);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const userSearchRef = useRef(null);

  useEffect(() => {
    if (event) {
      // Extract assignee information if present
      let assignedToValue = "";
      let assignedToIdValue = "";
      let selectedUserValue = null;
      
      if (event.assignedTo && event.creator) {
        assignedToValue = `${event.creator.firstName} ${event.creator.lastName}`;
        assignedToIdValue = event.creator.id;
        selectedUserValue = event.creator;
      }
      
      setFormData({
        ...event,
        assignedTo: assignedToValue,
        assignedToId: assignedToIdValue,
      });
      
      setSelectedUser(selectedUserValue);
      setUserSearchQuery(assignedToValue);
      setMode(isEditing ? "edit" : "view");
    } else if (slot) {
      const slotDate = new Date(slot);
      setFormData((prev) => ({
        ...prev,
        start: slotDate,
        end: new Date(slotDate.getTime() + 60 * 60 * 1000), // 1 hour later
      }));
      setMode("edit");
    }
  }, [event, slot, isEditing]);

  // Handle user search
  const searchUsers = async (query) => {
    if (!query || query.trim() === "") {
      setUserSearchResults([]);
      return;
    }
    
    setSearchingUsers(true);
    try {
      const response = await userService.searchUsers(query);
      if (response.success) {
        setUserSearchResults(response.data);
      } else {
        console.error("Failed to search users:", response.message);
        setUserSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setUserSearchResults([]);
    } finally {
      setSearchingUsers(false);
    }
  };
  
  // Debounce user search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (userSearchQuery) {
        searchUsers(userSearchQuery);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [userSearchQuery]);
  
  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserSearchQuery(`${user.firstName} ${user.lastName}`);
    setFormData({
      ...formData,
      assignedTo: user.id,
      assignedToId: user.id,
    });
    setShowUserResults(false);
  };
  
  // Handle user search input change
  const handleUserSearchChange = (e) => {
    const query = e.target.value;
    setUserSearchQuery(query);
    setShowUserResults(true);
    
    // If search is cleared, clear the selected user
    if (!query) {
      setSelectedUser(null);
      setFormData({
        ...formData,
        assignedTo: "",
        assignedToId: "",
      });
    }
  };
  
  // Close user results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userSearchRef.current && !userSearchRef.current.contains(event.target)) {
        setShowUserResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";

    if (!formData.start) {
      newErrors.start = "Start date is required";
    }

    if (!formData.end) {
      newErrors.end = "End date is required";
    } else if (new Date(formData.end) <= new Date(formData.start)) {
      newErrors.end = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handlePriorityChange = (priority) => {
    setFormData((prev) => ({ ...prev, priority }));
  };

  const handleToggleCompletion = () => {
    setFormData((prev) => ({ ...prev, isCompleted: !prev.isCompleted }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return "";

    const date = new Date(dateObj);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  const formatTimeOnly = (dateObj) => {
    if (!dateObj) return "";

    const date = new Date(dateObj);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

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

  const getTypeIcon = (type) => {
    switch (type) {
      case "meeting":
        return <TbUser className="text-blue-600" />;
      case "task":
        return <TbClipboardCheck className="text-green-600" />;
      case "reminder":
        return <TbClock className="text-yellow-600" />;
      case "appointment":
        return <TbCalendarEvent className="text-purple-600" />;
      default:
        return <TbCalendarEvent className="text-gray-600" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "meeting":
        return "Meeting";
      case "task":
        return "Task";
      case "reminder":
        return "Reminder";
      case "appointment":
        return "Appointment";
      default:
        return "Event";
    }
  };

  const renderViewMode = () => (
    <div className="overflow-y-auto h-[calc(100vh-84px)]">
      {/* Event Summary */}
      <div className="py-5 px-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-primary-100">
                {getTypeIcon(formData.type)}
              </div>
              <div>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    getPriorityInfo(formData.priority).bgColor
                  } ${getPriorityInfo(formData.priority).textColor}`}
                >
                  {getPriorityInfo(formData.priority).label}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 ml-2">
                  {getTypeLabel(formData.type)}
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {formData.title}
            </h2>
            {formData.isCompleted && (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-md font-medium">
                Completed
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-700">
            <TbClock className="mr-2 text-gray-500" />
            <div>
              <div>{formatDate(formData.start)}</div>
              <div className="text-gray-500 text-xs">
                to {formatTimeOnly(formData.end)}
              </div>
            </div>
          </div>

          {formData.location && (
            <div className="flex items-center text-sm text-gray-700">
              <TbExternalLink className="mr-2 text-gray-500" />
              <span>{formData.location}</span>
            </div>
          )}

          {formData.assignedTo && (
            <div className="flex items-center text-sm text-gray-700">
              <TbUser className="mr-2 text-gray-500" />
              <span>Assigned to: {formData.assignedTo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {formData.description && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
            <TbAlignLeft className="mr-2" /> Description
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-line">
            {formData.description}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="mb-2 text-sm text-gray-500">Actions</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMode("edit")}
            className="border hover:bg-primary-50 text-primary-600 px-4 py-1.5 rounded-md flex items-center transition-colors text-sm"
          >
            <TbEdit className="mr-1.5 w-4 h-4" /> Edit
          </button>

          <button
            onClick={handleToggleCompletion}
            className={`border px-4 py-1.5 rounded-md flex items-center transition-colors text-sm ${
              formData.isCompleted
                ? "hover:bg-red-50 text-red-600"
                : "hover:bg-green-50 text-green-600"
            }`}
          >
            <TbCheck className="mr-1.5 w-4 h-4" />
            {formData.isCompleted ? "Mark Incomplete" : "Mark Complete"}
          </button>

          <button
            onClick={() => onDelete && onDelete(formData.id)}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-1.5 rounded-md flex items-center transition-colors text-sm"
          >
            <TbTrash className="mr-1.5 w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );

  const renderEditMode = () => (
    <form onSubmit={handleSubmit} className="relative overflow-y-auto h-[calc(100vh-84px)]">
      <div className="p-5 space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border placeholder:text-gray-400 placeholder:font-normal ${errors.title ? "border-red-300" : "border-neutral-300"} focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5`}
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertTriangle className="h-4 w-4 mr-1" /> {errors.title}
            </p>
          )}
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="start" className="block text-sm font-medium text-neutral-700 mb-1">
              Start Date & Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-2.5 left-3 text-neutral-600">
                <TbCalendarEvent className="h-5 w-5" />
              </div>
              <input
                type="datetime-local"
                id="start"
                name="start"
                value={
                  formData.start instanceof Date
                    ? formData.start.toISOString().slice(0, 16)
                    : formData.start
                }
                onChange={handleChange}
                className={`block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border pl-10 ${errors.start ? "border-red-300" : "border-neutral-300"} focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5`}
              />
            </div>
            {errors.start && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <TbAlertTriangle className="h-4 w-4 mr-1" /> {errors.start}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="end" className="block text-sm font-medium text-neutral-700 mb-1">
              End Date & Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-2.5 left-3 text-neutral-600">
                <TbClock className="h-5 w-5" />
              </div>
              <input
                type="datetime-local"
                id="end"
                name="end"
                value={
                  formData.end instanceof Date
                    ? formData.end.toISOString().slice(0, 16)
                    : formData.end
                }
                onChange={handleChange}
                className={`block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border pl-10 ${errors.end ? "border-red-300" : "border-neutral-300"} focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5`}
              />
            </div>
            {errors.end && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <TbAlertTriangle className="h-4 w-4 mr-1" /> {errors.end}
              </p>
            )}
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-neutral-700 mb-1">
            Event Type
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 text-neutral-600">
              <TbTag className="h-5 w-5" />
            </div>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5"
            >
              <option value="meeting">Meeting</option>
              <option value="task">Task</option>
              <option value="reminder">Reminder</option>
              <option value="appointment">Appointment</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
            Location
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 text-neutral-600">
              <TbMapPin className="h-5 w-5" />
            </div>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5 placeholder:text-gray-400 placeholder:font-normal"
              placeholder="Add location (optional)"
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Priority
          </label>
          <div className="flex space-x-4">
            {["low", "medium", "high"].map((priority) => (
              <label key={priority} className="flex items-center">
                <div className={`relative flex items-center justify-center h-[1.1rem] w-[1.1rem] rounded-md border ${formData.priority === priority ? 'border-primary-500 bg-primary-50' : 'border-neutral-400'}`}>
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                    className="absolute opacity-0 h-full w-full cursor-pointer"
                  />
                  {formData.priority === priority && (
                    <div className="h-2 w-2 rounded-sm bg-primary-500"></div>
                  )}
                </div>
                <span className={`ml-2 text-sm ${formData.priority === priority ? 'text-primary-700 font-medium' : 'text-neutral-700'} capitalize`}>
                  {priority}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Assigned To - User Search */}
        <div ref={userSearchRef}>
          <label htmlFor="userSearch" className="block text-sm font-medium text-neutral-700 mb-1">
            Assigned To
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 text-neutral-600">
              {searchingUsers ? (
                <TbLoader2 className="h-5 w-5 animate-spin" />
              ) : (
                <PiUsersDuotone className="h-5 w-5" />
              )}
            </div>
            <input
              type="text"
              id="userSearch"
              value={userSearchQuery}
              onChange={handleUserSearchChange}
              onFocus={() => setShowUserResults(true)}
              className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5 placeholder:text-gray-400 placeholder:font-normal"
              placeholder="Search for a user by name or email"
              autoComplete="off"
            />
            
            {/* User search results dropdown */}
            {showUserResults && userSearchQuery && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-neutral-200">
                {userSearchResults.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    {searchingUsers ? "Searching..." : "No users found"}
                  </div>
                ) : (
                  userSearchResults.map((user) => (
                    <div
                      key={user.id}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-neutral-100"
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          {user.firstName.charAt(0)}
                        </div>
                        <span className="ml-3 block font-medium truncate">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="ml-2 truncate text-gray-500">{user.email}</span>
                      </div>
                      {selectedUser && selectedUser.id === user.id && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                          <TbCheck className="h-5 w-5" />
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 text-neutral-600">
              <TbAlignLeft className="h-5 w-5" />
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows="5"
              className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5 placeholder:text-gray-400 placeholder:font-normal"
              placeholder="Enter event description"
            ></textarea>
          </div>
        </div>

        {/* Completion Status */}
        {formData.type === "task" && (
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              checked={formData.isCompleted || false}
              onChange={handleToggleCompletion}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor="isCompleted"
              className="ml-2 block text-sm text-gray-700"
            >
              Mark as completed
            </label>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="mt-auto border-t border-gray-200 py-4 px-5 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700 transition-colors flex items-center text-sm font-medium"
        >
          <TbCheck className="mr-1.5 h-4 w-4" />
          {event ? "Update Event" : "Add Event"}
        </button>
      </div>
    </form>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 bg-black/50 backdrop-blur-[1.5px] flex items-start justify-end z-50 p-3 font-outfit"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-[650px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-xl border border-gray-200"
      >
        {/* Header */}
        <div className={` px-6 py-4 flex justify-between items-center relative ${mode === "edit" ? "bg-gradient-to-r from-secondary-600 to-secondary-700" : "bg-gradient-to-r from-primary-600 to-primary-700"}`}>
           <h2 className="text-lg font-semibold text-white">
            {!event
              ? "Add New Event"
              : mode === "edit"
              ? "Edit Event"
              : getTypeLabel(formData.type)}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-500 transition-colors rounded-full p-1"
          >
            <TbX className="w-5 h-5" />
          </button>
          </div>

        {/* Content area - toggle between view and edit modes */}
        {mode === "view" ? renderViewMode() : renderEditMode()}
      </motion.div>

      
    </motion.div>
  );
};

export default EventModal;
