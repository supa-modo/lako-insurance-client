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
  TbAlertTriangle,
} from "react-icons/tb";
import taskService from "../../services/taskService";
import { PiUserDuotone } from "react-icons/pi";

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
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200 flex flex-col h-[calc(100vh-16rem)]" >
      {/* Header - fixed */}
      <div className="bg-white border-b border-neutral-200 px-6 py-3 flex justify-between items-center z-10 flex-shrink-0">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 h-9 w-9 flex items-center justify-center text-neutral-600 hover:text-primary-600 rounded-full transition-all duration-200"
            title="Back to tasks"
          >
            <TbArrowLeft className="h-5 w-5" />
          </button>
          
          <div>
            <h1 className=" font-medium text-neutral-600 flex items-center">
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
            className="h-9 w-9 flex items-center justify-center text-neutral-600 hover:text-primary-600 rounded-full transition-colors duration-200"
            title="Edit task"
          >
            <TbEdit className="h-5 w-5" />
          </button>

          
        </div>
      </div>

      {/* Task details container */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Task title section - fixed */}
        <div className="bg-white border-b border-neutral-200 flex-shrink-0">
          <div className="px-6 py-4">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex items-center max-w-3xl">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`h-6 w-6 rounded-md flex items-center justify-center mr-3 transition-all duration-200 ${
                    task.completed
                      ? "bg-green-500 text-white"
                      : "border border-neutral-300 hover:border-primary-500"
                  }`}
                >
                  {task.completed && <TbCheck className="h-4 w-4" />}
                </button>

                <h2
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "line-through text-neutral-500"
                      : "text-neutral-800"
                  }`}
                >
                  {task.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center ${priorityInfo.bgColor} ${priorityInfo.color} ${priorityInfo.borderColor} border`}
                >
                  <TbStar className="mr-1 h-3.5 w-3.5" />
                  {priorityInfo.label}
                </div>
                
                <div
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center border ${
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
                    <TbCircleCheck className="mr-1 h-3.5 w-3.5" />
                  ) : isOverdue(task.dueDate) ? (
                    <TbCalendarDue className="mr-1 h-3.5 w-3.5" />
                  ) : task.dueDate ? (
                    <TbCalendarTime className="mr-1 h-3.5 w-3.5" />
                  ) : (
                    <TbCalendarEvent className="mr-1 h-3.5 w-3.5" />
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
            
            {/* Task metadata */}
            <div className="mt-5 border-t border-neutral-100 pt-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <div className="flex items-center">
                    <TbCalendarTime className="text-neutral-500 h-5 w-5 mr-2" />
                    <span className={`text-sm ${isOverdue(task.dueDate) && !task.completed ? "text-red-600" : "text-neutral-700"}`}>
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                  {isOverdue(task.dueDate) && !task.completed && (
                    <div className="text-xs text-red-500 mt-1 ml-6 flex items-center">
                      <TbAlertTriangle className="h-4 w-4 mr-1" /> Overdue
                    </div>
                  )}
                </div>
                
                {task.category && (
                  <div>
                    <div className=" flex items-center">
                      <TbTag className="text-neutral-500 h-5 w-5 mr-2" />
                      <span className="text-[0.8rem] text-neutral-700 bg-neutral-200 px-2 py-0.5 rounded">
                        {task.category}
                      </span>
                    </div>
                  </div>
                )}
                
                {task.assignee && (
                  <div>
                    <div className="flex items-center">
                      <PiUserDuotone className="h-5 w-5 mr-1.5 text-primary-600" />
                      <span className="text-sm text-neutral-700">
                        Assignee - <span className="font-semibold">{task.assignee.firstName} {task.assignee.lastName}</span>
                      </span>
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center">
                    <TbHistory className="text-neutral-500 h-5 w-5 mr-2" />
                    <span className="text-sm text-neutral-700">
                      Created on {new Date(task.createdAt).toLocaleDateString()} - <span className="font-semibold">{task.creator?.firstName || "System"}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1" style={{ overflowY: 'auto' }}>
          {/* Description */}
          {task.description && (
            <div className="bg-white ">
                <h3 className="font-semibold pb-2 border-b border-neutral-200 text-primary-600">Description</h3>
             
              <div className="p-2 min-h-[150px] rounded-lg text-neutral-700 whitespace-pre-wrap leading-relaxed bg-neutral-300">
                {task.description}
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          <div className="bg-white ">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <h3 className=" font-semibold text-primary-600">Activity Timeline</h3>
              
              {loadingActivity && (
                <div className="flex items-center text-neutral-500 text-xs">
                  <TbLoader className="h-3 w-3 mr-2 animate-spin" />
                  Loading activity...
                </div>
              )}
            </div>

            <div className="">
              {activityHistory.length === 0 ? (
                <div className="text-center py-6 bg-white rounded-md border border-neutral-100">
                  <div className="text-neutral-300 mb-3">
                    <TbHistory className="h-8 w-8 mx-auto" />
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
                      bgColor = "bg-blue-100";
                      textColor = "text-blue-600";
                    } else if (activity.action === "updated") {
                      icon = <TbPencil className="h-4 w-4" />;
                      bgColor = "bg-amber-100";
                      textColor = "text-amber-600";
                    } else if (activity.action === "completed") {
                      icon = <TbCheck className="h-4 w-4" />;
                      bgColor = "bg-green-100";
                      textColor = "text-green-600";
                    } else if (activity.action === "reopened") {
                      icon = <TbX className="h-4 w-4" />;
                      bgColor = "bg-orange-100";
                      textColor = "text-orange-600";
                    } else if (activity.action === "deleted") {
                      icon = <TbTrash className="h-4 w-4" />;
                      bgColor = "bg-red-100";
                      textColor = "text-red-600";
                    }
                    
                    // Format timestamp
                    const timestamp = new Date(activity.timestamp);
                    const formattedDate = timestamp.toLocaleDateString();
                    const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    return (
                      <div key={activity.id} className="flex items-start relative z-10">
                        <div className={`h-7 w-7 rounded-full ${bgColor} flex items-center justify-center mr-3 ${textColor} border border-white shadow-sm`}>
                          {icon}
                        </div>
                        <div className="bg-white p-3 rounded-md border border-neutral-100 flex-1 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-medium text-neutral-700">
                              {activity.action === "created" && "Task created"}
                              {activity.action === "updated" && "Task updated"}
                              {activity.action === "completed" && "Marked as completed"}
                              {activity.action === "reopened" && "Marked as incomplete"}
                              {activity.action === "deleted" && "Task deleted"}
                            </div>
                            <div className="text-xs text-neutral-500 bg-neutral-50 px-1.5 py-0.5 rounded">
                              {formattedDate} • {formattedTime}
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center">
                           <PiUserDuotone className="h-3.5 w-3.5 mr-1.5 text-primary-600" />
                            
                            {activity.userName || "Unknown User"}
                          </div>
                          
                          {/* Show details for updates */}
                          {activity.action === "updated" && activity.details && Object.keys(activity.details).length > 0 && (
                            <div className="mt-2 text-xs bg-gray-200 p-2 rounded border border-neutral-200">
                              {Object.entries(activity.details).map(([field, values]) => (
                                <div key={field} className="text-gray-400 mb-1 last:mb-0 flex items-center">
                                  <span className="font-medium capitalize min-w-[80px]">{field}:</span> 
                                  <div className="flex items-center flex-1">
                                    <span className="line-through text-red-500">{String(values.from || '-')}</span> 
                                    <span className="mx-1 text-neutral-600">
                                      <TbArrowNarrowRight className="inline h-3.5 w-3.5" />
                                    </span>
                                    <span className="text-green-600 font-medium">{String(values.to || '-')}</span>
                                  </div>
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

      {/* Footer actions - fixed */}
      <div className="border-t border-neutral-200 p-4 bg-white z-10 flex-shrink-0">
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
              className="px-4 py-2 bg-white text-red-600 rounded-md flex items-center hover:bg-red-50 text-sm font-medium border border-red-200 transition-all duration-200"
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