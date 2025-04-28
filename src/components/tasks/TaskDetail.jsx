import React, { useState, useEffect } from "react";
import {
  TbCalendarTime,
  TbTag,
  TbEdit,
  TbTrash,
  TbCheck,
  TbX,
  TbArrowLeft,
  TbStar,
  TbStarFilled,
  TbCalendarEvent,
  TbHistory,
  TbLoader,
  TbUserCircle,
  TbFileText,
  TbPencil,
  TbCalendarPlus,
  TbCircleCheck,
  TbCircleX,
  TbArrowNarrowRight,
  TbCalendarDue,
} from "react-icons/tb";
import { FiMoreVertical } from "react-icons/fi";
import taskService from "../../services/taskService";

const TaskDetail = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onTogglePriority,
  onBack,
}) => {
  const [activityHistory, setActivityHistory] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(false);
  
  // Fetch activity history when task changes
  useEffect(() => {
    if (task && task.id) {
      fetchActivityHistory(task.id);
    }
  }, [task]);
  
  // Function to fetch activity history
  const fetchActivityHistory = async (taskId) => {
    setLoadingActivity(true);
    try {
      const response = await taskService.getTaskActivityHistory(taskId);
      if (response.success) {
        setActivityHistory(response.data);
      } else {
        console.error("Failed to fetch activity history:", response.message);
        setActivityHistory([]);
      }
    } catch (error) {
      console.error("Error fetching activity history:", error);
      setActivityHistory([]);
    } finally {
      setLoadingActivity(false);
    }
  };

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white rounded-lg shadow-sm">
        <div className="bg-neutral-50 p-4 rounded-full mb-4">
          <TbCheck className="h-8 w-8 text-neutral-300" />
        </div>
        <h3 className="text-lg font-medium text-neutral-800 mb-2">
          No task selected
        </h3>
        <p className="text-neutral-500 max-w-md">
          Select a task from the list to view its details
        </p>
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 text-primary-600 hover:text-primary-700 flex items-center"
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
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-100"
        };
      case "medium":
        return {
          label: "Medium Priority",
          color: "text-amber-700",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-100"
        };
      case "low":
        return {
          label: "Low Priority",
          color: "text-blue-700",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-100"
        };
      default:
        return {
          label: "No Priority",
          color: "text-neutral-600",
          bgColor: "bg-neutral-50",
          borderColor: "border-neutral-100"
        };
    }
  };

  const priorityInfo = getPriorityInfo(task.priority);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-100 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 h-9 w-9 flex items-center justify-center text-neutral-400 hover:text-primary-600 rounded-full transition-all duration-200"
            title="Back to tasks"
          >
            <TbArrowLeft className="h-5 w-5" />
          </button>
          
          <div>
            <h1 className="text-lg font-medium text-neutral-800 flex items-center">
              Task Details
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onTogglePriority(task.id)}
            className={`h-9 w-9 flex items-center justify-center rounded-full transition-colors duration-200 ${task.priority === "high" ? "bg-amber-50 text-amber-500" : "text-neutral-400 hover:text-amber-500"}`}
            title={priorityInfo.label}
          >
            {task.priority === "high" ? (
              <TbStarFilled className="h-5 w-5" />
            ) : (
              <TbStar className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => onEdit(task)}
            className="h-9 w-9 flex items-center justify-center text-neutral-400 hover:text-primary-600 rounded-full transition-colors duration-200"
            title="Edit task"
          >
            <TbEdit className="h-5 w-5" />
          </button>

          <div className="relative group">
            <button
              className="h-9 w-9 flex items-center justify-center text-neutral-400 hover:text-neutral-700 rounded-full transition-colors duration-200"
              title="More options"
            >
              <FiMoreVertical className="h-5 w-5" />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md border border-neutral-100 py-1 hidden group-hover:block z-20">
              <button
                onClick={() => onToggleComplete(task.id)}
                className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center"
              >
                {task.completed ? (
                  <>
                    <TbCircleX className="h-4 w-4 mr-2 text-neutral-500" /> Mark as Incomplete
                  </>
                ) : (
                  <>
                    <TbCircleCheck className="h-4 w-4 mr-2 text-green-500" /> Mark as Complete
                  </>
                )}
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 flex items-center"
              >
                <TbTrash className="h-4 w-4 mr-2" /> Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task details */}
      <div className="flex-1 overflow-auto">
        {/* Task title section */}
        <div className="bg-neutral-50 border-b border-neutral-100">
          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center max-w-3xl">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`h-7 w-7 rounded-md flex items-center justify-center mr-4 transition-all duration-200 ${
                    task.completed
                      ? "bg-green-500 text-white"
                      : "border border-neutral-300 hover:border-primary-500"
                  }`}
                >
                  {task.completed && <TbCheck className="h-4 w-4" />}
                </button>

                <h2
                  className={`text-2xl font-medium ${
                    task.completed
                      ? "line-through text-neutral-400"
                      : "text-neutral-800"
                  }`}
                >
                  {task.title}
                </h2>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${priorityInfo.bgColor} ${priorityInfo.color} ${priorityInfo.borderColor} border`}
                >
                  <TbStar className="mr-1.5 h-4 w-4" />
                  {priorityInfo.label}
                </div>
                
                <div
                  className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center border ${
                    task.completed
                      ? "bg-green-50 text-green-700 border-green-100"
                      : isOverdue(task.dueDate)
                      ? "bg-red-50 text-red-700 border-red-100"
                      : task.dueDate
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-neutral-50 text-neutral-600 border-neutral-100"
                  }`}
                >
                  {task.completed ? (
                    <TbCircleCheck className="mr-1.5 h-4 w-4" />
                  ) : isOverdue(task.dueDate) ? (
                    <TbCalendarDue className="mr-1.5 h-4 w-4" />
                  ) : task.dueDate ? (
                    <TbCalendarTime className="mr-1.5 h-4 w-4" />
                  ) : (
                    <TbCalendarEvent className="mr-1.5 h-4 w-4" />
                  )}
                  {task.completed
                    ? "Completed"
                    : isOverdue(task.dueDate)
                    ? "Overdue"
                    : task.dueDate
                    ? "In Progress"
                    : "No Due Date"}
                </div>
              </div>
            </div>
            
            {/* Quick info bar */}
            <div className="flex flex-wrap items-center text-sm text-neutral-500 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <TbCalendarTime className="mr-2 h-4 w-4 text-neutral-400" />
                <span className="font-medium">Due:</span>
                <span className={`ml-1.5 ${isOverdue(task.dueDate) && !task.completed ? "text-red-600 font-medium" : ""}`}>
                  {formatDate(task.dueDate)}
                </span>
              </div>
              
              {task.category && (
                <div className="flex items-center">
                  <TbTag className="mr-2 h-4 w-4 text-neutral-400" />
                  <span className="font-medium">Category:</span>
                  <span className="ml-1.5 px-2 py-0.5 bg-neutral-100 text-neutral-700 rounded-md text-xs font-medium">
                    {task.category}
                  </span>
                </div>
              )}
              
              {task.assignee && (
                <div className="flex items-center">
                  <TbUserCircle className="mr-2 h-4 w-4 text-neutral-400" />
                  <span className="font-medium">Assigned to:</span>
                  <div className="ml-1.5 flex items-center">
                    <div className="h-5 w-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-1 text-xs font-bold">
                      {task.assignee.firstName.charAt(0)}{task.assignee.lastName.charAt(0)}
                    </div>
                    <span>{task.assignee.firstName} {task.assignee.lastName}</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <TbHistory className="mr-2 h-4 w-4 text-neutral-400" />
                <span className="font-medium">Created:</span>
                <span className="ml-1.5">
                  {new Date(task.createdAt).toLocaleDateString()} by {task.creator?.firstName || "System"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          {task.description && (
            <div className="bg-white rounded-lg border border-neutral-100">
              <div className="flex items-center px-5 py-4 border-b border-neutral-100">
                <div className="text-primary-600 mr-3">
                  <TbFileText className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-neutral-800">Description</h3>
              </div>
              <div className="p-5 text-neutral-700 whitespace-pre-wrap text-sm leading-relaxed">
                {task.description}
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg border border-neutral-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <div className="flex items-center">
                <div className="text-primary-600 mr-3">
                  <TbHistory className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-medium text-neutral-800">Activity Timeline</h3>
              </div>
              
              {loadingActivity && (
                <div className="flex items-center text-neutral-500 text-xs">
                  <TbLoader className="h-3 w-3 mr-2 animate-spin" />
                  Loading activity...
                </div>
              )}
            </div>

            <div className="p-5">
              {activityHistory.length === 0 ? (
                <div className="text-center py-8 bg-neutral-50 rounded-md">
                  <div className="text-neutral-300 mb-3">
                    <TbHistory className="h-10 w-10 mx-auto" />
                  </div>
                  <div className="text-neutral-600 text-sm font-medium">
                    No activity history available
                  </div>
                  <p className="text-neutral-500 text-xs mt-1 max-w-md mx-auto">
                    Activity will be recorded when changes are made to this task
                  </p>
                </div>
              ) : (
                <div className="space-y-3 relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-200 z-0"></div>
                  
                  {activityHistory.map((activity, index) => {
                    // Determine icon based on action type
                    let icon = <TbEdit className="h-4 w-4" />;
                    let bgColor = "bg-neutral-100";
                    let textColor = "text-neutral-600";
                    
                    if (activity.action === "created") {
                      icon = <TbCalendarPlus className="h-4 w-4" />;
                      bgColor = "bg-blue-50";
                      textColor = "text-blue-600";
                    } else if (activity.action === "updated") {
                      icon = <TbPencil className="h-4 w-4" />;
                      bgColor = "bg-amber-50";
                      textColor = "text-amber-600";
                    } else if (activity.action === "completed") {
                      icon = <TbCheck className="h-4 w-4" />;
                      bgColor = "bg-green-50";
                      textColor = "text-green-600";
                    } else if (activity.action === "reopened") {
                      icon = <TbX className="h-4 w-4" />;
                      bgColor = "bg-orange-50";
                      textColor = "text-orange-600";
                    } else if (activity.action === "deleted") {
                      icon = <TbTrash className="h-4 w-4" />;
                      bgColor = "bg-red-50";
                      textColor = "text-red-600";
                    }
                    
                    // Format timestamp
                    const timestamp = new Date(activity.timestamp);
                    const formattedDate = timestamp.toLocaleDateString();
                    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    return (
                      <div key={activity.id} className="flex items-start relative z-10">
                        <div className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center mr-4 ${textColor} border border-white`}>
                          {icon}
                        </div>
                        <div className="bg-white p-3 rounded-md border border-neutral-100 flex-1">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-medium text-neutral-800">
                              {activity.action === "created" && "Task created"}
                              {activity.action === "updated" && "Task updated"}
                              {activity.action === "completed" && "Marked as completed"}
                              {activity.action === "reopened" && "Marked as incomplete"}
                              {activity.action === "deleted" && "Task deleted"}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {formattedDate} • {formattedTime}
                            </div>
                          </div>
                          <div className="text-xs text-neutral-600 mt-1 flex items-center">
                            <div className="h-4 w-4 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center mr-1.5 text-xs font-medium">
                              {activity.userName ? activity.userName.split(' ').map(name => name.charAt(0)).join('') : 'U'}
                            </div>
                            {activity.userName || "Unknown User"}
                          </div>
                          
                          {/* Show details for updates */}
                          {activity.action === "updated" && activity.details && Object.keys(activity.details).length > 0 && (
                            <div className="mt-2 text-xs bg-neutral-50 p-2 rounded-md border border-neutral-100">
                              {Object.entries(activity.details).map(([field, values]) => (
                                <div key={field} className="mb-1 last:mb-0">
                                  <span className="font-medium capitalize">{field}:</span> 
                                  <span className="line-through text-red-500 mr-1">{String(values.from || '-')}</span> 
                                  <span className="text-green-600">
                                    <TbArrowNarrowRight className="inline h-3 w-3 mx-0.5" /> {String(values.to || '-')}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t border-neutral-100 p-4 bg-white sticky bottom-0 z-10">
        <div className="flex flex-wrap gap-3 justify-between">
          <div>
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all duration-200 ${
                task.completed
                  ? "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              {task.completed ? (
                <>
                  <TbCircleX className="mr-2 h-4 w-4" /> Mark as Incomplete
                </>
              ) : (
                <>
                  <TbCircleCheck className="mr-2 h-4 w-4" /> Mark as Complete
                </>
              )}
            </button>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(task)}
              className="px-4 py-2 bg-white text-primary-600 rounded-md flex items-center hover:bg-primary-50 text-sm font-medium border border-primary-200 transition-all duration-200"
            >
              <TbEdit className="mr-2 h-4 w-4" /> Edit Task
            </button>
            
            <button
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 bg-white text-neutral-600 rounded-md flex items-center hover:bg-neutral-50 text-sm font-medium border border-neutral-200 transition-all duration-200"
            >
              <TbTrash className="mr-2 h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;