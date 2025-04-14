import React, { useState, useEffect } from "react";
import {
  TbX,
  TbCalendarEvent,
  TbClock,
  TbUser,
  TbTag,
  TbStar,
  TbAlignLeft,
  TbCheck,
  TbEdit,
  TbTrash,
  TbMailForward,
  TbAlertCircle,
  TbExternalLink,
  TbClipboardCheck,
} from "react-icons/tb";

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
    location: "",
    isCompleted: false,
  });

  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState(event && !isEditing ? "view" : "edit");

  useEffect(() => {
    if (event) {
      setFormData(event);
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto h-[calc(100vh-84px)]"
        >
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
            className={`w-full px-4 py-2 bg-neutral-100 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
              errors.title ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
                placeholder="Enter event title"
              />
          {errors.title && (
            <div className="text-red-500 text-xs mt-1 flex items-center">
              <TbAlertCircle className="mr-1" /> {errors.title}
            </div>
          )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
              Start <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="start"
                  value={
                    formData.start instanceof Date
                      ? formData.start.toISOString().slice(0, 16)
                      : formData.start
                  }
                  onChange={handleChange}
              className={`w-full px-4 py-2 bg-neutral-100 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.start ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
                />
            {errors.start && (
              <div className="text-red-500 text-xs mt-1 flex items-center">
                <TbAlertCircle className="mr-1" /> {errors.start}
              </div>
            )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
              End <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="end"
                  value={
                    formData.end instanceof Date
                      ? formData.end.toISOString().slice(0, 16)
                      : formData.end
                  }
                  onChange={handleChange}
              className={`w-full px-4 py-2 bg-neutral-100 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                errors.end ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
                />
            {errors.end && (
              <div className="text-red-500 text-xs mt-1 flex items-center">
                <TbAlertCircle className="mr-1" /> {errors.end}
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Add location (optional)"
          />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="meeting">Meeting</option>
                <option value="task">Task</option>
                <option value="reminder">Reminder</option>
                <option value="appointment">Appointment</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <div className="flex space-x-2">
                {["low", "medium", "high"].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    className={`flex-1 py-2 px-3 rounded-lg border ${
                      formData.priority === priority
                        ? priority === "high"
                          ? "bg-red-100 border-red-300 text-red-800"
                          : priority === "medium"
                          ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                          : "bg-blue-100 border-blue-300 text-blue-800"
                        : "bg-white border-gray-300 text-gray-700"
                    } transition-colors`}
                onClick={() => handlePriorityChange(priority)}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned To
              </label>
              <select
                name="assignedTo"
            value={formData.assignedTo || ""}
                onChange={handleChange}
            className="w-full px-4 py-2 bg-neutral-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Not Assigned</option>
                <option value="Mary W.">Mary W.</option>
                <option value="James O.">James O.</option>
                <option value="Sarah N.">Sarah N.</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
            value={formData.description || ""}
                onChange={handleChange}
                rows="4"
            className="w-full px-4 py-2 bg-neutral-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add event description"
              ></textarea>
        </div>

        {/* Completion Status */}
        {formData.type === "task" && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isCompleted"
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
      <div className="border-t border-gray-200 py-4 px-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              >
                <TbCheck className="mr-2" />
                {event ? "Update Event" : "Add Event"}
              </button>
            </div>
    </form>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-end z-50 p-3"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[500px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-2xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-800">
            {!event
              ? "Add New Event"
              : mode === "edit"
              ? "Edit Event"
              : getTypeLabel(formData.type)}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <TbX className="w-5 h-5" />
          </button>
          </div>

        {/* Content area - toggle between view and edit modes */}
        {mode === "view" ? renderViewMode() : renderEditMode()}
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

export default EventModal;
