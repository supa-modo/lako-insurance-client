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
} from "react-icons/tb";

const EventModal = ({ event, slot, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(),
    type: "meeting",
    priority: "medium",
    assignedTo: "",
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else if (slot) {
      const slotDate = new Date(slot);
      setFormData((prev) => ({
        ...prev,
        start: slotDate,
        end: new Date(slotDate.getTime() + 60 * 60 * 1000), // 1 hour later
      }));
    }
  }, [event, slot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        className="w-[500px] h-[calc(100vh-24px)] bg-white shadow-2xl overflow-hidden rounded-2xl"
        style={{
          animation: "slide-in 0.3s ease-out forwards",
        }}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-800">
            {event ? "Edit Event" : "Add New Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <TbX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto h-[calc(100vh-84px)]"
        >
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, priority }))
                    }
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
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Add event description"
              ></textarea>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-3">
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
          </div>
        </form>
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
