import React, { useState, useEffect } from "react";
import {
  TbCalendarEvent,
  TbTag,
  TbUsers,
  TbAlignLeft,
  TbX,
  TbCheck,
  TbPlus,
  TbAlertTriangle,
} from "react-icons/tb";

const TaskForm = ({ task = null, onSave, onCancel }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "09:00",
    priority: "medium",
    category: "",
    assignedTo: "",
    completed: false,
  });

  const [errors, setErrors] = useState({});
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  // Predefined categories for the insurance management context
  const predefinedCategories = [
    "Client Follow-up",
    "Policy Renewal",
    "Claims Processing",
    "Quote Preparation",
    "Documentation",
    "Meeting",
    "Marketing",
    "Partner Outreach",
  ];

  // Update form when editing a task
  useEffect(() => {
    if (task) {
      // Extract time from dueDate if it exists
      let dueDate = "";
      let dueTime = "09:00";

      if (task.dueDate) {
        const date = new Date(task.dueDate);
        dueDate = date.toISOString().split("T")[0];
        dueTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }

      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate,
        dueTime,
        priority: task.priority || "medium",
        category: task.category || "",
        assignedTo: task.assignedTo || "",
        completed: task.completed || false,
      });
    }
  }, [task]);

  // Handle input changes
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

  // Handle category selection
  const handleCategorySelect = (category) => {
    setFormData({
      ...formData,
      category,
    });
    setShowCategoryOptions(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Combine date and time for dueDate
    let taskDueDate = null;
    if (formData.dueDate) {
      taskDueDate = new Date(`${formData.dueDate}T${formData.dueTime}`);
    }

    // Prepare task data
    const taskData = {
      ...formData,
      dueDate: taskDueDate ? taskDueDate.toISOString() : null,
    };

    // Remove dueTime from final data
    delete taskData.dueTime;

    // If editing, preserve the ID
    if (task && task.id) {
      taskData.id = task.id;
    }

    // Save the task
    onSave(taskData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-neutral-200 px-5 py-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-neutral-900">
          {task ? "Edit Task" : "Create New Task"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-neutral-500 hover:text-neutral-700"
        >
          <TbX className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`block w-full rounded-md border ${
              errors.title ? "border-red-300" : "border-neutral-300"
            } focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5`}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <TbAlertTriangle className="h-4 w-4 mr-1" /> {errors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Description
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 text-neutral-400">
              <TbAlignLeft className="h-5 w-5" />
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="block w-full rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5"
              placeholder="Enter task description"
            ></textarea>
          </div>
        </div>

        {/* Due Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Due Date
            </label>
            <div className="relative">
              <div className="absolute top-2.5 left-3 text-neutral-400">
                <TbCalendarEvent className="h-5 w-5" />
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="block w-full rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="dueTime"
              className="block text-sm font-medium text-neutral-700 mb-1"
            >
              Due Time
            </label>
            <input
              type="time"
              id="dueTime"
              name="dueTime"
              value={formData.dueTime}
              onChange={handleChange}
              className="block w-full rounded-md border border-neutral-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5"
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
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={formData.priority === priority}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
                />
                <span className="ml-2 text-sm text-neutral-700 capitalize">
                  {priority}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Category
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 text-neutral-400">
              <TbTag className="h-5 w-5" />
            </div>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onFocus={() => setShowCategoryOptions(true)}
              className="block w-full rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5"
              placeholder="Select or enter a category"
            />
            {showCategoryOptions && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-neutral-200">
                {predefinedCategories.map((category) => (
                  <div
                    key={category}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-neutral-900 hover:bg-neutral-100"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="block truncate">{category}</span>
                    {formData.category === category && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                        <TbCheck className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Assigned To */}
        <div>
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Assigned To
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 text-neutral-400">
              <TbUsers className="h-5 w-5" />
            </div>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="block w-full rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2.5"
              placeholder="Who should complete this task?"
            />
          </div>
        </div>

        {/* Completed Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
          />
          <label
            htmlFor="completed"
            className="ml-2 block text-sm text-neutral-700"
          >
            Mark as completed
          </label>
        </div>

        {/* Form Buttons */}
        <div className="pt-2 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-4 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
