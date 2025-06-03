import React, { useState, useEffect } from "react";
import {
  TbPlus,
  TbListCheck,
  TbFilter,
  TbCalendarEvent,
  TbClipboardCheck,
  TbDeviceAnalytics,
  TbChartBar,
  TbSearch,
  TbRefresh,
  TbAlertCircle,
  TbMessageCircle,
  TbLoader2,
} from "react-icons/tb";

// Import task components
import TaskList from "../../components/tasks/TaskList";
import TaskForm from "../../components/tasks/TaskForm";
import TaskDetail from "../../components/tasks/TaskDetail";

// Import task service
import taskService from "../../services/taskService";

import { useToast } from "../../hooks/useToast";

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    overdue: 0,
  });

  const { toasts, toast, removeToast } = useToast();

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
    fetchTaskStats();
  }, []);
  
  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await taskService.getAllTasks();
      if (response.success) {
        setTasks(response.data);
      } else {
        console.error("Failed to fetch tasks:", response.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch task statistics from API
  const fetchTaskStats = async () => {
    try {
      const response = await taskService.getTaskStats();
      if (response.success) {
        setTaskStats(response.data);
      } else {
        console.error("Failed to fetch task statistics:", response.message);
      }
    } catch (error) {
      console.error("Error fetching task statistics:", error);
    }
  };

  // Create a new task
  const handleCreateTask = () => {
    setEditingTask(null);
    setSelectedTask(null);
    setShowForm(true);
  };

  // Edit a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setSelectedTask(null);
    setShowForm(true);
  };

  // View task details
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowForm(false);
  };

  // Refresh tasks data
  const refreshTasks = () => {
    setIsRefreshing(true);
    fetchTasks();
    fetchTaskStats();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Save a task (create or edit)
  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        // Update existing task
        const response = await taskService.updateTask(taskData.id, taskData);
        if (response.success) {
          toast.success("Task Saved successfully")
          // Refresh tasks to get the updated list
          await fetchTasks();
          await fetchTaskStats();
          setShowForm(false);
          setEditingTask(null);
        } else {
          console.error("Failed to update task:", response.message);
          
        }
      } else {
        // Create new task
        const response = await taskService.createTask(taskData);
        if (response.success) {
          // Refresh tasks to get the updated list
          await fetchTasks();
          await fetchTaskStats();
          setShowForm(false);
          setEditingTask(null);
        } else {
          console.error("Failed to create task:", response.message);
        }
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Toggle task completion status
  const handleToggleComplete = async (taskId) => {
    try {
      const response = await taskService.toggleTaskCompletion(taskId);
      if (response.success) {
        // Refresh tasks to get the updated list
        await fetchTasks();
        await fetchTaskStats();
        
        // Update selected task if it was toggled
        if (selectedTask && selectedTask.id === taskId) {
          const updatedTask = response.data;
          setSelectedTask(updatedTask);
        }
      } else {
        console.error("Failed to toggle task completion:", response.message);
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  // Toggle task priority (cycles through low, medium, high)
  const handleTogglePriority = async (taskId) => {
    try {
      // First get the current task to determine the next priority
      const taskResponse = await taskService.getTaskById(taskId);
      if (!taskResponse.success) {
        console.error("Failed to get task:", taskResponse.message);
        return;
      }
      
      const task = taskResponse.data;
      const priorityOrder = { low: "medium", medium: "high", high: "low" };
      const newPriority = priorityOrder[task.priority] || "medium";
      
      // Update the task with the new priority
      const response = await taskService.updateTask(taskId, { ...task, priority: newPriority });
      if (response.success) {
        // Refresh tasks to get the updated list
        await fetchTasks();
        
        // Update selected task if its priority was changed
        if (selectedTask && selectedTask.id === taskId) {
          const updatedTask = response.data;
          setSelectedTask(updatedTask);
        }
      } else {
        console.error("Failed to update task priority:", response.message);
      }
    } catch (error) {
      console.error("Error updating task priority:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    
      try {
        const response = await taskService.deleteTask(taskId);
        if (response.success) {
          // Refresh tasks to get the updated list
          await fetchTasks();
          await fetchTaskStats();
          
          // Clear selected task if it was deleted
          if (selectedTask && selectedTask.id === taskId) {
            setSelectedTask(null);
          }
        } else {
          console.error("Failed to delete task:", response.message);
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
  };

  // Go back to task list
  const handleBackToList = () => {
    setSelectedTask(null);
    setShowForm(false);
  };

  // Filter tasks by search query
  const filteredTasks = searchQuery
    ? tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description &&
            task.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (task.category &&
            task.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (task.assignedTo &&
            task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : tasks;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Page Header */}
      <div className="bg-white px-8 py-2.5 border-b border-gray-200 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-secondary-700">
              Task Management
            </h1>
            <p className="text-gray-500 text-sm">
              Organize and track your tasks to boost productivity
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <button 
              onClick={refreshTasks}
              className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all duration-200 hover:shadow-sm"
              title="Refresh tasks"
            >
              <TbRefresh className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleCreateTask}
              className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
            >
              <TbPlus className="mr-2 h-5 w-5" /> Create New Task
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-4 flex-1 overflow-hidden flex flex-col">
        {/* Task Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg mr-4">
                <TbListCheck className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Total Tasks
                </div>
                <div className="text-2xl font-bold text-secondary-700">
                  {taskStats.total}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <TbClipboardCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Completed
                </div>
                <div className="text-2xl font-bold text-primary-600">
                  {taskStats.completed}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <TbCalendarEvent className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Upcoming
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {taskStats.upcoming}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md py-2.5 pl-5 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <TbDeviceAnalytics className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-600">
                  Overdue
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {taskStats.overdue}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-4 pb-6">
          {/* Task list  */}
          <div
            className={`${
              showForm || selectedTask
                ? "hidden lg:block lg:col-span-3 "
                : "col-span-full "
            } flex flex-col `}
          >
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <TbLoader2 className="animate-spin text-primary-600 w-10 h-10 "/>
              </div>
            ) : (
              <div className="flex-1 ">
                <TaskList
                  tasks={filteredTasks}
                  onTaskSelect={handleViewTask}
                  onToggleComplete={handleToggleComplete}
                  onTogglePriority={handleTogglePriority}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </div>
            )}
          </div>

          {/* Task form or detail view */}
          {(showForm || selectedTask) && (
            <div className="col-span-full md:col-span-3 rounded-lg ">
              {showForm ? (
                <TaskForm
                  task={editingTask}
                  onSave={handleSaveTask}
                  onCancel={handleBackToList}
                />
              ) : selectedTask ? (
                <TaskDetail
                  task={selectedTask}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                  onTogglePriority={handleTogglePriority}
                  onBack={handleBackToList}
                />
              ) : null}
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
};

export default TaskManagementPage;
