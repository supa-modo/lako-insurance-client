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
} from "react-icons/tb";

import MonthView from "../../components/calendar/MonthView";
import WeekView from "../../components/calendar/WeekView";
import DayView from "../../components/calendar/DayView";
import EventModal from "../../components/calendar/EventModal";
import eventsData from "../../data/events.json";

const CalendarPage = () => {
  const [view, setView] = useState("month"); // month, week, day
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load events from JSON file
  useEffect(() => {
    // Transform dates from strings to Date objects
    const transformedEvents = eventsData.events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    setEvents(transformedEvents);
  }, []);

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
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const event = events.find((e) => e.id === draggableId);
    if (!event) return;

    // Parse the destination droppableId to get the new date and hour
    const [dateString, hourString] = destination.droppableId.split("-");
    const newDate = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(newDate.getTime())) return;

    // Get the original event time components
    const originalStart = new Date(event.start);
    const minutes = originalStart.getMinutes();
    const duration = event.end.getTime() - event.start.getTime();

    // Set the new start time
    if (hourString) {
      // If hour is specified (week/day view), use it
      newDate.setHours(parseInt(hourString), minutes);
    } else {
      // For month view, keep the original time
      newDate.setHours(originalStart.getHours(), minutes);
    }

    // Create the updated event with new times
    const updatedEvent = {
      ...event,
      start: newDate,
      end: new Date(newDate.getTime() + duration),
    };

    // Update events array
    const updatedEvents = events.map((e) =>
      e.id === draggableId ? updatedEvent : e
    );
    setEvents(updatedEvents);
  };

  // Handle slot click
  const handleSlotClick = (date) => {
    setSelectedSlot(date);
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setShowEventModal(true);
  };

  // Handle save event
  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      // Update existing event
      const updatedEvents = events.map((e) =>
        e.id === selectedEvent.id ? { ...eventData, id: selectedEvent.id } : e
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: `event-${Date.now()}`,
      };
      setEvents([...events, newEvent]);
    }
    setShowEventModal(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh by reloading events from JSON
    const transformedEvents = eventsData.events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
    setEvents(transformedEvents);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
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
            <div className="flex space-x-1 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setView("day")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  view === "day"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                <TbCalendarTime className="h-5 w-5" />
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  view === "week"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                <TbCalendarWeek className="h-5 w-5" />
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                  view === "month"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-neutral-600 hover:text-primary-600"
                }`}
              >
                <TbCalendarMonth className="h-5 w-5" />
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
        <div className="flex-1 overflow-hidden bg-white">
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
        </div>
      </DragDropContext>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          slot={selectedSlot}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
            setSelectedSlot(null);
          }}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
