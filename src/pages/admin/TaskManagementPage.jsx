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
} from "react-icons/tb";

// Import task components
import TaskList from "../../components/tasks/TaskList";
import TaskForm from "../../components/tasks/TaskForm";
import TaskDetail from "../../components/tasks/TaskDetail";

// Mock task data service
const getMockTasks = () => {
  return [
    {
      id: "task1",
      title: "Follow up with John Mwangi regarding senior plan",
      description:
        "Call John to discuss his questions about the Premium Senior Gold plan and discuss additional benefits.",
      dueDate: "2023-10-20T10:00:00",
      priority: "high",
      category: "Client Follow-up",
      assignedTo: "Admin",
      completed: false,
    },
    {
      id: "task2",
      title: "Process Mary Kamau's policy renewal",
      description:
        "Mary's policy #KS-243 is due for renewal. Prepare the necessary documents and send renewal quote.",
      dueDate: "2023-10-18T14:30:00",
      priority: "high",
      category: "Policy Renewal",
      assignedTo: "Admin",
      completed: false,
    },
    {
      id: "task3",
      title: "Prepare meeting notes for AAR Insurance partnership",
      description:
        "Compile notes and action items from yesterday's meeting with Sarah from AAR Insurance.",
      dueDate: "2023-10-15T12:00:00",
      priority: "medium",
      category: "Meeting",
      assignedTo: "Admin",
      completed: true,
    },
    {
      id: "task4",
      title: "Send David Otieno's policy documentation",
      description:
        "Forward the Senior Gold Plan policy documents from CIC Insurance to David Otieno.",
      dueDate: "2023-10-16T09:00:00",
      priority: "medium",
      category: "Documentation",
      assignedTo: "Admin",
      completed: false,
    },
    {
      id: "task5",
      title: "Create new quote for Peter Kamau",
      description:
        "Peter needs a comprehensive quote for his parents. Prepare options from Jubilee, AAR, and CIC.",
      dueDate: "2023-10-19T11:00:00",
      priority: "medium",
      category: "Quote Preparation",
      assignedTo: "Admin",
      completed: false,
    },
    {
      id: "task6",
      title: "Call Joyce Omondi about policy renewal",
      description:
        "Joyce's policy is set to expire on November 1st. Call to discuss renewal options.",
      dueDate: "2025-10-25T15:00:00",
      priority: "low",
      category: "Client Follow-up",
      assignedTo: "Admin",
      completed: false,
    },
    {
      id: "task7",
      title: "Submit monthly sales report",
      description:
        "Compile and submit the monthly sales and conversion report to the management team.",
      dueDate: "2023-10-30T17:00:00",
      priority: "medium",
      category: "Documentation",
      assignedTo: "Admin",
      completed: false,
    },
    {
      id: "task8",
      title: "Update lead status in CRM",
      description:
        "Update status of all current leads in the CRM system and add notes from recent follow-ups.",
      dueDate: "2023-10-17T16:00:00",
      priority: "low",
      category: "Documentation",
      assignedTo: "Admin",
      completed: true,
    },
  ];
};

const TaskManagementPage = () => {
  const [tasks, setTasks] = useState([]);
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

  // Fetch tasks on component mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTasks = getMockTasks();
      setTasks(mockTasks);

      // Calculate task statistics
      calculateTaskStats(mockTasks);

      setLoading(false);
    }, 600);
  }, []);

  // Calculate task statistics
  const calculateTaskStats = (taskList) => {
    const now = new Date();
    const stats = {
      total: taskList.length,
      completed: taskList.filter((task) => task.completed).length,
      upcoming: 0,
      overdue: 0,
    };

    // Calculate upcoming and overdue tasks
    taskList.forEach((task) => {
      if (!task.completed && task.dueDate) {
        const dueDate = new Date(task.dueDate);
        if (dueDate < now) {
          stats.overdue++;
        } else {
          stats.upcoming++;
        }
      }
    });

    setTaskStats(stats);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter tasks from the API
    console.log("Searching for:", searchQuery);
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

  // Save a task (create or edit)
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map((task) =>
        task.id === taskData.id ? { ...taskData } : task
      );
      setTasks(updatedTasks);
      calculateTaskStats(updatedTasks);
    } else {
      // Create new task
      const newTask = {
        ...taskData,
        id: `task${Date.now()}`, // Generate a simple ID
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      calculateTaskStats(updatedTasks);
    }

    setShowForm(false);
    setEditingTask(null);
  };

  // Toggle task completion status
  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
    calculateTaskStats(updatedTasks);

    // Update selected task if it was toggled
    if (selectedTask && selectedTask.id === taskId) {
      const updatedTask = updatedTasks.find((task) => task.id === taskId);
      setSelectedTask(updatedTask);
    }
  };

  // Toggle task priority (cycles through low, medium, high)
  const handleTogglePriority = (taskId) => {
    const priorityOrder = { low: "medium", medium: "high", high: "low" };

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newPriority = priorityOrder[task.priority] || "medium";
        return { ...task, priority: newPriority };
      }
      return task;
    });

    setTasks(updatedTasks);

    // Update selected task if its priority was changed
    if (selectedTask && selectedTask.id === taskId) {
      const updatedTask = updatedTasks.find((task) => task.id === taskId);
      setSelectedTask(updatedTask);
    }
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    // In a real app, confirm before deletion
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      calculateTaskStats(updatedTasks);

      // Clear selected task if it was deleted
      if (selectedTask && selectedTask.id === taskId) {
        setSelectedTask(null);
      }
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
            <button className="bg-white border border-gray-200 rounded-lg p-2 text-gray-500 hover:text-primary-600 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <TbRefresh />
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
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-5 min-h-0 overflow-hidden">
          {/* Task list (larger on mobile, smaller on desktop) */}
          <div
            className={`${
              showForm || selectedTask
                ? "hidden lg:block lg:col-span-3"
                : "col-span-full"
            } overflow-hidden flex flex-col`}
          >
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="overflow-auto flex-1">
                <TaskList
                  tasks={filteredTasks}
                  onTaskSelect={handleViewTask}
                  onToggleComplete={handleToggleComplete}
                  onTogglePriority={handleTogglePriority}
                  onDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              </div>
            )}
          </div>

          {/* Task form or detail view */}
          {(showForm || selectedTask) && (
            <div className="col-span-full md:col-span-3 overflow-auto">
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
