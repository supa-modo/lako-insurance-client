import React, { useState } from "react";
import {
  TbStar,
  TbStarFilled,
  TbCheck,
  TbCalendarTime,
  TbUsers,
  TbTag,
  TbEye,
  TbEdit,
  TbTrash,
  TbDotsVertical,
  TbArrowUp,
  TbArrowDown,
  TbChevronDown,
  TbArrowsSort,
} from "react-icons/tb";

const TaskList = ({
  tasks = [],
  onTaskSelect,
  onToggleComplete,
  onTogglePriority,
  onDeleteTask,
  onEditTask,
}) => {
  const [sortField, setSortField] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [viewMode, setViewMode] = useState("all"); // all, active, completed
  const [showActionMenu, setShowActionMenu] = useState(null);

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Function to format due date
  const formatDueDate = (dateString) => {
    if (!dateString) return "No date";

    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Format date based on when it is
    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Function to check if task is overdue
  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const now = new Date();
    const dueDate = new Date(dateString);
    return !dateString.completed && dueDate < now;
  };

  // Get the status text and style
  const getStatusInfo = (task) => {
    if (task.completed) {
      return {
        text: "Completed",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
      };
    }

    if (!task.dueDate) {
      return {
        text: "No Due Date",
        bgColor: "bg-neutral-100",
        textColor: "text-neutral-800",
      };
    }

    if (isOverdue(task.dueDate)) {
      return {
        text: "Overdue",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    }

    return {
      text: "In Progress",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    };
  };

  // Sort tasks
  let sortedTasks = [...tasks];
  if (sortField) {
    sortedTasks.sort((a, b) => {
      // For due date, handle null values
      if (sortField === "dueDate") {
        if (!a.dueDate) return sortDirection === "asc" ? 1 : -1;
        if (!b.dueDate) return sortDirection === "asc" ? -1 : 1;
        return sortDirection === "asc"
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate);
      }

      // For priority (high, medium, low)
      if (sortField === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sortDirection === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      // For other fields
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Filter tasks based on view mode
  const filteredTasks =
    viewMode === "all"
      ? sortedTasks
      : viewMode === "active"
      ? sortedTasks.filter((task) => !task.completed)
      : sortedTasks.filter((task) => task.completed);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="bg-neutral-50 p-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              className="flex items-center px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              onClick={() =>
                setShowActionMenu(
                  showActionMenu === "viewMode" ? null : "viewMode"
                )
              }
            >
              {viewMode === "all"
                ? "All Tasks"
                : viewMode === "active"
                ? "Active Tasks"
                : "Completed Tasks"}
              <TbChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* View mode dropdown */}
            {showActionMenu === "viewMode" && (
              <div className="absolute left-0 top-full mt-1 w-36 bg-white rounded-md shadow-lg border border-neutral-200 z-10">
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    viewMode === "all"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    setViewMode("all");
                    setShowActionMenu(null);
                  }}
                >
                  All Tasks
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    viewMode === "active"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    setViewMode("active");
                    setShowActionMenu(null);
                  }}
                >
                  Active Tasks
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    viewMode === "completed"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    setViewMode("completed");
                    setShowActionMenu(null);
                  }}
                >
                  Completed Tasks
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="flex items-center px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              onClick={() =>
                setShowActionMenu(showActionMenu === "sort" ? null : "sort")
              }
            >
              <TbArrowsSort className="mr-1 h-4 w-4" />
              Sort by
              <TbChevronDown className="ml-1 h-4 w-4" />
            </button>

            {/* Sort dropdown */}
            {showActionMenu === "sort" && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-neutral-200 z-10">
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortField === "dueDate"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    handleSort("dueDate");
                    setShowActionMenu(null);
                  }}
                >
                  Due Date{" "}
                  {sortField === "dueDate" &&
                    (sortDirection === "asc" ? (
                      <TbArrowUp className="h-4 w-4 inline ml-1" />
                    ) : (
                      <TbArrowDown className="h-4 w-4 inline ml-1" />
                    ))}
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortField === "priority"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    handleSort("priority");
                    setShowActionMenu(null);
                  }}
                >
                  Priority{" "}
                  {sortField === "priority" &&
                    (sortDirection === "asc" ? (
                      <TbArrowUp className="h-4 w-4 inline ml-1" />
                    ) : (
                      <TbArrowDown className="h-4 w-4 inline ml-1" />
                    ))}
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortField === "title"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                  onClick={() => {
                    handleSort("title");
                    setShowActionMenu(null);
                  }}
                >
                  Title{" "}
                  {sortField === "title" &&
                    (sortDirection === "asc" ? (
                      <TbArrowUp className="h-4 w-4 inline ml-1" />
                    ) : (
                      <TbArrowDown className="h-4 w-4 inline ml-1" />
                    ))}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-neutral-500">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Task list */}
      <div className="divide-y divide-neutral-200">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
              <TbCheck className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">
              No tasks found
            </h3>
            <p className="text-neutral-500">
              {viewMode === "all"
                ? "You don't have any tasks yet. Create a new task to get started."
                : viewMode === "active"
                ? "You don't have any active tasks. All your tasks are completed."
                : "You don't have any completed tasks yet."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const statusInfo = getStatusInfo(task);

            return (
              <div
                key={task.id}
                className={`p-4 hover:bg-neutral-50 transition-colors ${
                  task.completed ? "opacity-70" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => onToggleComplete(task.id)}
                      className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                        task.completed
                          ? "bg-green-500 text-white"
                          : "border border-neutral-300 hover:border-neutral-400"
                      }`}
                    >
                      {task.completed && <TbCheck className="h-3 w-3" />}
                    </button>

                    <div>
                      <div
                        className={`font-medium ${
                          task.completed
                            ? "line-through text-neutral-500"
                            : "text-neutral-900"
                        }`}
                      >
                        {task.title}
                      </div>

                      <div className="flex items-center mt-1 space-x-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}
                        >
                          {statusInfo.text}
                        </span>

                        {task.priority && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}{" "}
                            Priority
                          </span>
                        )}

                        {task.category && (
                          <span className="text-xs text-neutral-500 flex items-center">
                            <TbTag className="h-3 w-3 mr-1" />
                            {task.category}
                          </span>
                        )}

                        {task.dueDate && (
                          <span
                            className={`text-xs flex items-center ${
                              isOverdue(task.dueDate) && !task.completed
                                ? "text-red-600"
                                : "text-neutral-500"
                            }`}
                          >
                            <TbCalendarTime className="h-3 w-3 mr-1" />
                            {formatDueDate(task.dueDate)}
                          </span>
                        )}

                        {task.assignedTo && (
                          <span className="text-xs text-neutral-500 flex items-center">
                            <TbUsers className="h-3 w-3 mr-1" />
                            {task.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onTogglePriority(task.id)}
                      title={
                        task.priority
                          ? `${task.priority} priority`
                          : "Set priority"
                      }
                      className="text-neutral-400 hover:text-yellow-500"
                    >
                      {task.priority === "high" ? (
                        <TbStarFilled className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <TbStar className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => onTaskSelect(task)}
                      title="View task"
                      className="text-neutral-400 hover:text-neutral-700"
                    >
                      <TbEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onEditTask(task)}
                      title="Edit task"
                      className="text-neutral-400 hover:text-neutral-700"
                    >
                      <TbEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      title="Delete task"
                      className="text-neutral-400 hover:text-red-600"
                    >
                      <TbTrash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TaskList;
