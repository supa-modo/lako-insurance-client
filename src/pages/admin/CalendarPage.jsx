import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import {
  TbCalendarEvent,
  TbPlus,
  TbChevronLeft,
  TbChevronRight,
  TbCalendarTime,
  TbCalendarWeek,
  TbCalendarMonth,
  TbFilter,
  TbSearch,
  TbRefresh,
  TbInfoCircle,
  TbEdit,
  TbTrash,
  TbX,
  TbAlertCircle,
} from "react-icons/tb";

import MonthView from "../../components/calendar/MonthView";
import WeekView from "../../components/calendar/WeekView";
import DayView from "../../components/calendar/DayView";
import EventModal from "../../components/calendar/EventModal";
import eventService from "../../services/eventService";
import { useNotification } from "../../context/NotificationContext";
import taskService from "../../services/taskService";

const CalendarPage = () => {
  const { showSuccess, showError, showInfo, showConfirmation } = useNotification();
  const [view, setView] = useState("month"); // month, week, day
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [detailsPosition, setDetailsPosition] = useState({ x: 0, y: 0 });


  const fetchEventsAndTasks = async () => {
    try {
      setIsRefreshing(true);
      // Get current view's date range
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      
      if (view === "month") {
        startDate.setDate(1); // First day of month
        startDate.setHours(0, 0, 0, 0);
        endDate.setMonth(endDate.getMonth() + 1, 0); // Last day of month
        endDate.setHours(23, 59, 59, 999);
      } else if (view === "week") {
        const day = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
        startDate.setDate(currentDate.getDate() - day); // First day of week (Sunday)
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(startDate.getDate() + 6); // Last day of week (Saturday)
        endDate.setHours(23, 59, 59, 999);
      } else {
        // Day view
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
      }

      const dateParams = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      // Fetch events for the date range
      const [eventsResponse, tasksResponse] = await Promise.all([
        eventService.getAllEvents(dateParams),
        eventService.getTasksForCalendar(dateParams)
      ]);

      let allCalendarItems = [];

      if (eventsResponse.success) {
        // Transform dates from strings to Date objects
        const transformedEvents = eventsResponse.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        allCalendarItems = [...transformedEvents];
      } else {
        showError("Failed to load events");
      }

      if (tasksResponse.success) {
        // Tasks are already transformed in the service
        allCalendarItems = [...allCalendarItems, ...tasksResponse.data];
      }

      setEvents(allCalendarItems);
    } catch (error) {
      console.error("Error loading calendar items:", error);
      showError("Error loading calendar items");
    } finally {
      setIsRefreshing(false);
    }
  };


  // Load events and tasks from API
  useEffect(() => {
    
    
    fetchEventsAndTasks();
  }, [currentDate, view, showError]);

  // Navigation functions
  const navigateToToday = () => setCurrentDate(new Date());
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(currentDate.getMonth() - 1);
    else if (view === "week") newDate.setDate(currentDate.getDate() - 7);
    else newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === "month") newDate.setMonth(currentDate.getMonth() + 1);
    else if (view === "week") newDate.setDate(currentDate.getDate() + 7);
    else newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // Handle drag and drop
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const event = events.find((e) => e.id === draggableId);
    if (!event) return;

    console.log("Drop target ID:", destination.droppableId);

    // Parsing the new droppableId format
    let year, month, day, hour;
    

    if (destination.droppableId.startsWith('date:')) {
      const parts = destination.droppableId.split('-');
      // Format is 'date:YYYY-MM-DD' or 'date:YYYY-MM-DD-hour:HH'
      year = parseInt(parts[0].substring(5)); // Remove 'date:' prefix
      month = parseInt(parts[1]) - 1; // JS months are 0-indexed
      day = parseInt(parts[2]);
      
      
      if (parts.length > 3 && parts[3].startsWith('hour:')) {
        hour = parseInt(parts[3].substring(5)); 
      }
    } else {
      console.error("Invalid droppableId format:", destination.droppableId);
      showError("Error updating event: invalid drop target");
      return;
    }
    
    // Create the new date object
    const newDate = new Date(year, month, day);
    
    // Ensure the date is valid
    if (isNaN(newDate.getTime())) {
      console.error("Invalid date components:", { year, month, day });
      showError("Error updating event: invalid date");
      return;
    }

    console.log("Parsed date components:", { year, month, day, hour, newDate: newDate.toISOString() });

    // Get the original event time components
    const originalStart = new Date(event.start);
    const originalEnd = new Date(event.end);
    const duration = originalEnd.getTime() - originalStart.getTime();
    
    // Create new start date by combining the destination date with original time
    const newStart = new Date(newDate);
    
    if (hour !== undefined) {
      // If hour is specified (week/day view), use the hour from the drop target
      // but keep the original minutes
      newStart.setHours(hour, originalStart.getMinutes(), 0, 0);
    } else {
      // For month view, keep the original time
      newStart.setHours(
        originalStart.getHours(),
        originalStart.getMinutes(),
        0,
        0
      );
    }
    
    // Calculate the new end time by adding the original duration
    const newEnd = new Date(newStart.getTime() + duration);
    
    console.log("Event drag details:", {
      eventId: event.id,
      originalStart: originalStart.toISOString(),
      originalEnd: originalEnd.toISOString(),
      newStart: newStart.toISOString(),
      newEnd: newEnd.toISOString(),
      dropTarget: destination.droppableId
    });
    
    // Optimistically update UI
    const updatedEvent = {
      ...event,
      start: newStart,
      end: newEnd,
    };

    // Update events array in state
    const updatedEvents = events.map((e) =>
      e.id === draggableId ? updatedEvent : e
    );
    setEvents(updatedEvents);
    
    // Update in backend
    try {
      await eventService.updateEventTime(event.id, newStart, newEnd);
      showSuccess("Event time updated successfully");
    } catch (error) {
      console.error("Error updating event time:", error);
      showError("Failed to update event time");
      
      // Revert to original state on error
      setEvents(events);
    }
  };

  // Handle slot click
  const handleSlotClick = (date) => {
    closeEventDetails();
    setSelectedSlot(date);
    setSelectedEvent(null);
    setIsEditing(false);
    setShowEventModal(true);
  };

  // Handle event click
  const handleEventClick = (event, e) => {
    // If we're showing the click details, close them first
    closeEventDetails();

    // Stop propagation to prevent triggering slot click
    if (e) {
      e.stopPropagation();
    }

    // Set the selected event and open the modal in view mode
    setSelectedEvent(event);
    setIsEditing(false); // Ensure we're in view mode, not edit mode
    setSelectedSlot(null);
    setShowEventModal(true); // Open the modal instead of just showing details popup
  };

  // Close event details popup
  const closeEventDetails = () => {
    setShowEventDetails(false);
  };

  // Handle edit event from details popup
  const handleEditEvent = () => {
    setShowEventDetails(false);
    setIsEditing(true);
    setShowEventModal(true);
  };

  // Handle delete event
  const handleDeleteEvent = async (eventId) => {
    // Check if this is a task-based event
    const isTaskEvent = typeof eventId === 'string' && eventId.startsWith('task-');
    
    const confirmMessage = isTaskEvent 
      ? "This will only remove the task from the calendar view. To delete the task completely, please go to the Tasks page."
      : "Are you sure you want to delete this event?";

    showConfirmation(
      confirmMessage,
      async () => {
        // Optimistically update UI
        setEvents(events.filter((e) => e.id !== eventId));
        setShowEventDetails(false);

        // If we're also showing the modal for this event, close it
        if (selectedEvent && selectedEvent.id === eventId && showEventModal) {
          setShowEventModal(false);
        }
        
        // For task-based events, we don't actually delete the task
        if (!isTaskEvent) {
          // Delete from backend
          try {
            await eventService.deleteEvent(eventId);
            showSuccess("Event deleted successfully");
          } catch (error) {
            console.error("Error deleting event:", error);
            showError("Failed to delete event");
            
            // Refresh events to restore state
            handleRefresh();
          }
        } else {
          showSuccess("Task removed from calendar view");
        }
      },
      () => {
        // User canceled, do nothing
      },
      { title: isTaskEvent ? "Remove from Calendar" : "Confirm Deletion" }
    );
  };

  // Handle save event
  const handleSaveEvent = async (eventData) => {
    try {
      let response;
      
      // Check if this is a task-based event
      if (eventData.isTask && eventData.relatedTaskId) {
        // For task-based events, we need to update the task
        const taskId = eventData.relatedTaskId;
        const taskData = {
          title: eventData.title,
          description: eventData.description,
          dueDate: eventData.start,
          priority: eventData.priority,
          completed: eventData.isCompleted
        };
        

        response = await taskService.updateTask(taskId, taskData);
        fetchEventsAndTasks();
        showSuccess("Task updated successfully");
      } else if (eventData.id && !eventData.id.startsWith('task-')) {
        // Update existing event
        response = await eventService.updateEvent(eventData.id, eventData);
        if (response.success) {
          //TODO: Check on this to ensure event is saved to database and not local state
          // Update the event in the local state
          const updatedEvents = events.map((e) =>
            e.id === selectedEvent.id ? { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) } : e
          );
          setEvents(updatedEvents);
          showSuccess("Event updated successfully");
        } else {
          showError("Failed to update event");
        }
      } else {
        // Add new event
        response = await eventService.createEvent(eventData);
        if (response.success) {
          // Add the new event to the local state
          const newEvent = { ...response.data, start: new Date(response.data.start), end: new Date(response.data.end) };
          setEvents([...events, newEvent]);
          showSuccess("Event created successfully");
        } else {
          showError("Failed to create event");
        }
      }
      setShowEventModal(false);
      setSelectedEvent(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving event:", error);
      showError("An error occurred while saving the event");
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      
      // Get current view's date range
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      
      if (view === "month") {
        startDate.setDate(1); // First day of month
        startDate.setHours(0, 0, 0, 0);
        endDate.setMonth(endDate.getMonth() + 1, 0); // Last day of month
        endDate.setHours(23, 59, 59, 999);
      } else if (view === "week") {
        const day = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
        startDate.setDate(currentDate.getDate() - day); // First day of week (Sunday)
        startDate.setHours(0, 0, 0, 0);
        endDate.setDate(startDate.getDate() + 6); // Last day of week (Saturday)
        endDate.setHours(23, 59, 59, 999);
      } else {
        // Day view
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
      }

      const dateParams = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      // Fetch events and tasks for the date range
      const [eventsResponse, tasksResponse] = await Promise.all([
        eventService.getAllEvents(dateParams),
        eventService.getTasksForCalendar(dateParams)
      ]);

      let allCalendarItems = [];

      if (eventsResponse.success) {
        // Transform dates from strings to Date objects
        const transformedEvents = eventsResponse.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        allCalendarItems = [...transformedEvents];
      } else {
        showError("Failed to load events");
      }

      if (tasksResponse.success) {
        // Tasks are already transformed in the service
        allCalendarItems = [...allCalendarItems, ...tasksResponse.data];
      }

      setEvents(allCalendarItems);
    } catch (error) {
      console.error("Error refreshing calendar items:", error);
      showError("Error refreshing calendar items");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Format event time
  const formatEventTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Calendar Header */} 
      <div className="bg-white px-8 py-3 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-[1.3rem] font-bold text-primary-600">
              Calendar
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your schedule and appointments
            </p>
          </div>

          <div className="flex flex-wrap mt-4 md:mt-0 space-x-2">
            <div className="flex space-x-1 bg-neutral-200 rounded-lg p-1">
              <button
                onClick={() => setView("day")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  view === "day"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                <TbCalendarTime className="h-6 w-6" />
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  view === "week"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                <TbCalendarWeek className="h-6 w-6" />
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  view === "month"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                <TbCalendarMonth className="h-6 w-6" />
              </button>
            </div>

            <button
              onClick={navigateToToday}
              className="px-4 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50"
            >
              Today
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={navigatePrevious}
                className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-md"
              >
                <TbChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-sm font-medium text-neutral-900">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <button
                onClick={navigateNext}
                className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-md"
              >
                <TbChevronRight className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={handleRefresh}
              className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded-md"
            >
              <TbRefresh
                className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>

            <button
              onClick={() => handleSlotClick(new Date())}
              className="bg-primary-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
            >
              <TbPlus className="h-5 w-5 mr-2" />
              Add Event
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 overflow-hidden bg-white px-4 relative">
          {view === "month" && (
            <MonthView
              currentDate={currentDate}
              events={events}
              onSlotClick={handleSlotClick}
              onEventClick={handleEventClick}
            />
          )}
          {view === "week" && (
            <WeekView
              currentDate={currentDate}
              events={events}
              onSlotClick={handleSlotClick}
              onEventClick={handleEventClick}
            />
          )}
          {view === "day" && (
            <DayView
              currentDate={currentDate}
              events={events}
              onSlotClick={handleSlotClick}
              onEventClick={handleEventClick}
            />
          )}

          {/* Event Details Quick View */}
          {showEventDetails && selectedEvent && (
            <div
              className="absolute z-20 bg-white rounded-lg shadow-xl border border-gray-200 w-72"
              style={{
                top: `${detailsPosition.y}px`,
                left: `${detailsPosition.x}px`,
                transform: "translateY(8px)",
                maxWidth: "calc(100% - 32px)",
              }}
            >
              <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Event Details</h3>
                <button
                  onClick={closeEventDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <TbX size={18} />
                </button>
              </div>

              <div className="p-3">
                <div className="flex items-start mb-2">
                  <span
                    className={`w-3 h-3 rounded-full mt-1 ${
                      selectedEvent.priority === "high"
                        ? "bg-red-500"
                        : selectedEvent.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></span>
                  <h4 className="font-medium text-gray-800 ml-2">
                    {selectedEvent.title}
                  </h4>
                </div>

                <div className="text-xs text-gray-500 mb-3 ml-5">
                  {formatEventTime(selectedEvent.start)} -{" "}
                  {formatEventTime(selectedEvent.end)}
                </div>

                {selectedEvent.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {selectedEvent.description}
                  </p>
                )}

                {selectedEvent.assignedTo && (
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Assigned to:</span>{" "}
                    {selectedEvent.assignedTo}
                  </div>
                )}

                <div className="flex mt-3 justify-end gap-2">
                  <button
                    onClick={handleEditEvent}
                    className="px-3 py-1 bg-primary-50 text-primary-600 rounded text-xs flex items-center"
                  >
                    <TbEdit className="mr-1" size={14} /> Edit
                  </button>

                  <button
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded text-xs flex items-center"
                  >
                    <TbTrash className="mr-1" size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DragDropContext>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          slot={selectedSlot}
          isEditing={isEditing}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
            setSelectedSlot(null);
            setIsEditing(false);
          }}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
