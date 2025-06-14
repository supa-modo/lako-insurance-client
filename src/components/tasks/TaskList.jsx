import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCaretDownDuotone, PiUsersDuotone } from "react-icons/pi";
import {
  TbStar,
  TbStarFilled,
  TbCheck,
  TbTag,
  TbEdit,
  TbTrash,
  TbArrowUp,
  TbArrowDown,
  TbArrowsSort,
  TbSearch,
  TbCalendarDot,
} from "react-icons/tb";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";

const TaskList = ({
  tasks = [],
  onTaskSelect,
  onToggleComplete,
  onTogglePriority,
  onDeleteTask,
  onEditTask,
  searchQuery,
  setSearchQuery,
}) => {
  const [sortField, setSortField] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const [viewMode, setViewMode] = useState("all"); // all, active, completed
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, task: null });

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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-[calc(100vh-16rem)]">
      {/* Toolbar - Fixed */}
      <div className="bg-primary-600 px-4 py-3 border-b border-neutral-200 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              className="flex items-center px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-700 focus:outline-none focus:ring-0.5 focus:ring-secondary-500 focus:border-secondary-500"
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
              <PiCaretDownDuotone className="ml-3 h-4 w-4 pointer-events-none" />
            </button>

            {/* View mode dropdown */}
            {showActionMenu === "viewMode" && (
              <div className="absolute left-0 top-full mt-1 w-36 bg-white rounded-md shadow-lg border border-neutral-200 z-10">
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    viewMode === "all"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-secondary-50"
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
                      : "text-neutral-700 hover:bg-secondary-50"
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
                      : "text-neutral-700 hover:bg-secondary-50"
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
              className="flex items-center px-3 py-1.5 bg-white border border-neutral-300 rounded-md text-sm text-neutral-700 focus:outline-none focus:ring-0.5 focus:ring-secondary-500 focus:border-secondary-500"
              onClick={() =>
                setShowActionMenu(showActionMenu === "sort" ? null : "sort")
              }
            >
              <TbArrowsSort className="mr-1 h-4 w-4" />
              Sort by
              <PiCaretDownDuotone className="ml-3 h-4 w-4 pointer-events-none" />
            </button>

            {/* Sort dropdown */}
            {showActionMenu === "sort" && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-neutral-200 z-10">
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${
                    sortField === "dueDate"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-700 hover:bg-secondary-50"
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
                      : "text-neutral-700 hover:bg-secondary-50"
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
                      : "text-neutral-700 hover:bg-secondary-50"
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

        <div className="flex items-center gap-2">
          <div className="text-sm text-secondary-500">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
          </div>
          <form
            onSubmit={(e) => setSearchQuery(e.target.value)}
            className="flex max-w-md"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TbSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 bg-white text-gray-500 font-medium border border-neutral-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary-500 focus:border-secondary-500 text-sm"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-gray-300 text-primary-600 font-semibold px-4 py-2 rounded-r-md hover:bg-gray-200 text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Task list - Scrollable */}
      <div
        className="overflow-y-auto"
        style={{ height: "calc(100vh - 280px)", minHeight: "300px" }}
      >
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
                  className={`p-4 hover:bg-secondary-50 transition-colors duration-200 ${
                    task.completed ? "opacity-70" : ""
                  } cursor-pointer`}
                  onClick={() => onTaskSelect(task)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleComplete(task.id);
                        }}
                        className={`h-[1.3rem] w-[1.3rem] rounded-md flex items-center justify-center mr-3 ${
                          task.completed
                            ? "bg-green-600 text-white"
                            : "border border-neutral-400 hover:border-neutral-600"
                        }`}
                      >
                        {task.completed && <FaCheck className="h-3 w-3.5" />}
                      </button>

                      <div>
                        <div
                          className={`font-medium text-[0.94rem] ${
                            task.completed
                              ? "line-through text-neutral-700"
                              : "text-primary-700 "
                          }`}
                        >
                          {task.title}
                        </div>

                        <div className="flex items-center mt-1 space-x-2">
                          {/* <span
                            className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}
                          >
                            {statusInfo.text}
                          </span> */}

                          {task.priority && (
                            <span
                              className={`text-[0.7rem] px-2 py-0.5 rounded-md ${
                                task.priority === "high"
                                  ? "bg-red-200 text-red-800"
                                  : task.priority === "medium"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-blue-200 text-blue-800"
                              }`}
                            >
                              {task.priority.charAt(0).toUpperCase() +
                                task.priority.slice(1)}{" "}
                              Priority
                            </span>
                          )}

                          {task.category && (
                            <span className="text-xs text-neutral-600 flex items-center">
                              <TbTag className="h-3.5 w-3.5 mr-1" />
                              {task.category}
                            </span>
                          )}

                          {task.dueDate && (
                            <span
                              className={`text-xs font-medium flex items-center ${
                                isOverdue(task.dueDate) && !task.completed
                                  ? "text-red-600"
                                  : "text-primary-600"
                              }`}
                            >
                              <TbCalendarDot className="h-3.5 w-3.5 mr-1" />
                              {formatDueDate(task.dueDate)}
                            </span>
                          )}

                          {task.assignee && (
                            <span className="text-xs text-neutral-600 flex items-center">
                              <PiUsersDuotone className="h-3.5 w-3.5 mr-1" />
                              {task.assignee.firstName} {task.assignee.lastName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePriority(task.id);
                        }}
                        title={
                          task.priority
                            ? `${task.priority} priority`
                            : "Set priority"
                        }
                        className="text-neutral-600 hover:text-yellow-500"
                      >
                        {task.priority === "high" ? (
                          <TbStarFilled className="h-5 w-5 text-yellow-500" />
                        ) : task.priority === "medium" ? (
                          <TbStar className="h-5 w-5 text-amber-500" />
                        ) : (
                          <TbStar className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditTask(task);
                        }}
                        title="Edit task"
                        className="text-neutral-600 hover:text-neutral-800"
                      >
                        <TbEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteModal({ isOpen: true, task });
                        }}
                        title="Delete task"
                        className="text-red-400 hover:text-red-600"
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, task: null })}
        onConfirm={() => {
          onDeleteTask(deleteModal.task.id);
          setDeleteModal({ isOpen: false, task: null });
        }}
        title="Delete Task"
        itemName={deleteModal.task?.title}
        message={`Are you sure you want to delete the task "${deleteModal.task?.title}"? This action cannot be undone.`}
        confirmButtonText="Delete Task"
      />
    </div>
  );
};

export default TaskList;
