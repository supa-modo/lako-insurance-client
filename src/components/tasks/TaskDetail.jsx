import React from "react";
import { PiUsersDuotone } from "react-icons/pi";
import {
  TbCalendarTime,
  TbTag,
  TbUsers,
  TbEdit,
  TbTrash,
  TbCheck,
  TbX,
  TbArrowLeft,
  TbStar,
  TbStarFilled,
  TbCalendarEvent,
  TbAlignLeft,
  TbChartLine,
  TbHistory,
} from "react-icons/tb";

const TaskDetail = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onTogglePriority,
  onBack,
}) => {
  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-lg shadow-sm">
        <div className="bg-neutral-100 p-4 rounded-full mb-4">
          <TbCheck className="h-8 w-8 text-neutral-400" />
        </div>
        <h3 className="text-lg font-medium text-neutral-900 mb-2">
          No task selected
        </h3>
        <p className="text-neutral-500 max-w-md">
          Select a task from the list to view its details
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 flex items-center"
        >
          <TbArrowLeft className="mr-2" /> Back to tasks
        </button>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "No due date";

    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if task is overdue
  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const now = new Date();
    const dueDate = new Date(dateString);
    return !task.completed && dueDate < now;
  };

  // Get priority label and color
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case "high":
        return {
          label: "High Priority",
          color: "text-red-600",
          bgColor: "bg-red-200",
        };
      case "medium":
        return {
          label: "Medium Priority",
          color: "text-yellow-600",
          bgColor: "bg-yellow-200",
        };
      case "low":
        return {
          label: "Low Priority",
          color: "text-blue-600",
          bgColor: "bg-blue-200",
        };
      default:
        return {
          label: "No Priority",
          color: "text-neutral-600",
          bgColor: "bg-neutral-200",
        };
    }
  };

  const priorityInfo = getPriorityInfo(task.priority);

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-neutral-200 px-4 py-2 flex justify-between items-center">
        <button
          onClick={onBack}
          className="p-2 flex items-center text-[0.9rem] font-medium text-primary-600 hover:text-neutral-900 hover:bg-neutral-1 00 rounded-md"
        >
          <TbArrowLeft className="h-6 w-6 mr-2" /> Back to tasks
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onTogglePriority(task.id)}
            className="p-2 text-neutral-600 hover:text-yellow-500 hover:bg-neutral-100 rounded-md"
            title={priorityInfo.label}
          >
            {task.priority === "high" ? (
              <TbStarFilled className="h-5 w-5 text-yellow-500" />
            ) : (
              <TbStar className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => onEdit(task)}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
            title="Edit task"
          >
            <TbEdit className="h-5 w-5" />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-neutral-600 hover:text-red-600 hover:bg-neutral-100 rounded-md"
            title="Delete task"
          >
            <TbTrash className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Task details */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`h-[1.3rem] w-[1.3rem] rounded-md flex items-center justify-center mr-3 ${
                task.completed
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "border-2 border-neutral-500 hover:border-neutral-600"
              }`}
            >
              {task.completed && <TbCheck className="h-4 w-4" />}
            </button>

            <h2
              className={`text-xl font-semibold ${
                task.completed
                  ? "line-through text-neutral-600"
                  : "text-neutral-800"
              }`}
            >
              {task.title}
            </h2>
          </div>

          <div
            className={`px-3 py-1 rounded-lg text-sm font-medium ${priorityInfo.bgColor} ${priorityInfo.color}`}
          >
            {priorityInfo.label}
          </div>
        </div>

        <div className="space-y-5">
          {/* Status and dates */}
          <div className="flex gap-3">
            <div className="bg-neutral-50 py-4 rounded-lg w-[30%]">
              <div className="text-sm font-medium text-neutral-500 mb-1">
                Status
              </div>
              <div
                className={`text-base font-medium ${
                  task.completed
                    ? "text-green-600"
                    : isOverdue(task.dueDate)
                    ? "text-red-600"
                    : task.dueDate
                    ? "text-blue-600"
                    : "text-neutral-600"
                }`}
              >
                {task.completed
                  ? "Completed"
                  : isOverdue(task.dueDate)
                  ? "Overdue"
                  : task.dueDate
                  ? "In Progress"
                  : "No Due Date"}
              </div>
            </div>

            <div className="bg-neutral-50 py-4 rounded-lg">
              <div className="text-sm font-medium text-neutral-500 mb-1">
                Due Date
              </div>
              <div
                className={`text-base font-medium flex items-center ${
                  isOverdue(task.dueDate) && !task.completed
                    ? "text-red-600"
                    : "text-neutral-700"
                }`}
              >
                <TbCalendarTime className="mr-2 h-5 w-5" />
                {formatDate(task.dueDate)}
              </div>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div className="border-t border-neutral-200 pt-4">
              <div className="flex items-center text-sm font-medium text-neutral-500 mb-2">
                <TbAlignLeft className="mr-2 h-5 w-5" />
                Description
              </div>
              <div className="text-neutral-700 whitespace-pre-wrap">
                {task.description}
              </div>
            </div>
          )}

          {/* Category and Assignment */}
          <div className="border-t border-neutral-200 pt-4 grid grid-cols-2 gap-4">
            {task.category && (
              <div>
                <div className="flex items-center text-sm font-medium text-neutral-500 mb-2">
                  <TbTag className="mr-2 h-5 w-5" />
                  Category
                </div>
                <div className="text-neutral-700">{task.category}</div>
              </div>
            )}

            {task.assignedTo && (
              <div>
                <div className="flex items-center text-sm font-medium text-neutral-500 mb-2">
                  <PiUsersDuotone className="mr-2 h-5 w-5" />
                  Assigned To
                </div>
                <div className="text-neutral-700">{task.assignedTo}</div>
              </div>
            )}
          </div>

          {/* Activity History (example/placeholder) */}
          <div className="border-t border-neutral-200 pt-4">
            <div className="flex items-center text-sm font-semibold text-primary-600 mb-3">
              <TbHistory className="mr-2 h-5 w-5" />
              Activity History
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-neutral-200 flex items-center justify-center mr-3 text-neutral-600">
                  <TbEdit className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-neutral-800">
                    Task created
                  </div>
                  <div className="text-xs text-neutral-500">
                    July 22, 2023 • 10:30 AM
                  </div>
                </div>
              </div>

              {task.completed && (
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600">
                    <TbCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-800">
                      Marked as completed
                    </div>
                    <div className="text-xs text-neutral-500">
                      July 25, 2023 • 2:45 PM
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t border-neutral-200 p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`px-4 py-2 rounded-md flex items-center ${
              task.completed
                ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {task.completed ? (
              <>
                <TbX className="mr-2 h-5 w-5" /> Mark as Incomplete
              </>
            ) : (
              <>
                <TbCheck className="mr-2 h-5 w-5" /> Mark as Complete
              </>
            )}
          </button>

          <button
            onClick={() => onEdit(task)}
            className="px-4 py-2 bg-primary-600 text-white rounded-md flex items-center hover:bg-primary-700"
          >
            <TbEdit className="mr-2 h-5 w-5" /> Edit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
