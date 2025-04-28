import React, { useState, useEffect, useRef } from "react";
import { PiUsersDuotone } from "react-icons/pi";
import {
  TbCalendarEvent,
  TbTag,
  TbUsers,
  TbAlignLeft,
  TbX,
  TbCheck,
  TbPlus,
  TbAlertTriangle,
  TbSearch,
  TbLoader,
} from "react-icons/tb";
import userService from "../../services/userService";

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
    assignedToId: "", // Store the user ID
    completed: false,
  });

  const [errors, setErrors] = useState({});
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  
  // User search state
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [showUserResults, setShowUserResults] = useState(false);
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const userSearchRef = useRef(null);

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
      
      // Handle assignee if present
      let assignedToValue = "";
      let assignedToIdValue = "";
      let selectedUserValue = null;
      
      if (task.assignee) {
        assignedToValue = `${task.assignee.firstName} ${task.assignee.lastName}`;
        assignedToIdValue = task.assignee.id;
        selectedUserValue = task.assignee;
      }

      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate,
        dueTime,
        priority: task.priority || "medium",
        category: task.category || "",
        assignedTo: assignedToValue,
        assignedToId: assignedToIdValue,
        completed: task.completed || false,
      });
      
      setSelectedUser(selectedUserValue);
      setUserSearchQuery(assignedToValue);
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
        <h3 className="text-lg font-semibold text-secondary-700">
          {task ? "Edit Task" : "Create a New Task"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-neutral-700 hover:text-neutral-700"
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
            className={`block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border placeholder:text-gray-400 placeholder:font-normal ${
              errors.title ? "border-red-300" : ""
            } focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5`}
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
            <div className="absolute top-3 left-3 text-neutral-600">
              <TbAlignLeft className="h-5 w-5" />
            </div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5 placeholder:text-gray-400 placeholder:font-normal"
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
              <div className="absolute top-2.5 left-3 text-neutral-600">
                <TbCalendarEvent className="h-5 w-5" />
              </div>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5 placeholder:text-gray-400 placeholder:font-normal"
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
              className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-5 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5 placeholder:text-gray-400 placeholder:font-normal"
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
                  className="h-[1.1rem] w-[1.1rem] bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
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
            <div className="absolute top-2.5 left-3 text-neutral-600">
              <TbTag className="h-5 w-5" />
            </div>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              onClick={() => setShowCategoryOptions(!showCategoryOptions)}
              className="block w-full bg-neutral-100 text-gray-600 font-medium rounded-md border border-neutral-300 pl-10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm p-2.5 placeholder:text-gray-400 placeholder:font-normal"
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

        {/* Assigned To - User Search */}
        <div ref={userSearchRef}>
          <label
            htmlFor="userSearch"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Assigned To
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 text-neutral-600">
              {searchingUsers ? (
                <TbLoader className="h-5 w-5 animate-spin" />
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
                {searchingUsers && (
                  <div className="flex items-center justify-center py-4">
                    <TbLoader className="h-5 w-5 animate-spin mr-2" />
                    <span className="text-neutral-600">Searching...</span>
                  </div>
                )}
                
                {!searchingUsers && userSearchResults.length === 0 && (
                  <div className="px-4 py-3 text-sm text-neutral-500">
                    No users found. Try a different search term.
                  </div>
                )}
                
                {!searchingUsers && userSearchResults.map((user) => (
                  <div
                    key={user.id}
                    className="cursor-pointer select-none relative py-2 pl-3 pr-9 text-neutral-900 hover:bg-neutral-100"
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-xs text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                    {selectedUser && selectedUser.id === user.id && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                        <TbCheck className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedUser && (
            <div className="mt-2 flex items-center bg-primary-50 text-primary-700 py-1.5 px-3 rounded-md text-sm">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs mr-2">
                {selectedUser.firstName.charAt(0)}{selectedUser.lastName.charAt(0)}
              </div>
              <span className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</span>
              <button 
                type="button" 
                className="ml-auto text-neutral-500 hover:text-neutral-700"
                onClick={() => {
                  setSelectedUser(null);
                  setUserSearchQuery("");
                  setFormData({
                    ...formData,
                    assignedTo: "",
                    assignedToId: "",
                  });
                }}
              >
                <TbX className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        

        {/* Form Buttons */}
        <div className="pt-2 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center py-2 px-8 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
