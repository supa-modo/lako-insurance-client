import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  TbClock,
  TbUser,
  TbCalendarEvent,
  TbGripVertical,
} from "react-icons/tb";

const MonthView = ({ currentDate, events, onSlotClick }) => {
  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  // Get array of week day names
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get days in current month
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);

  // Get events for a specific day
  const getEventsForDay = (dayDate) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === dayDate.getDate() &&
        eventDate.getMonth() === dayDate.getMonth() &&
        eventDate.getFullYear() === dayDate.getFullYear()
      );
    });
  };

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get event color based on type
  const getEventColor = (type) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "task":
        return "bg-green-100 text-green-800 border-green-200";
      case "reminder":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "appointment":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Generate calendar grid
  const generateCalendarGrid = () => {
    const totalDays = 42; // 6 weeks * 7 days
    const grid = [];
    let dayCounter = 1;
    let nextMonthCounter = 1;

    // Get last day of previous month
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    let prevMonthDay = lastMonth.getDate() - firstDayOfMonth + 1;

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const dayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        dayNumber
      );

      if (dayNumber <= 0) {
        // Previous month days
        const prevMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          prevMonthDay
        );
        grid.push({
          date: prevMonthDate,
          dayNumber: prevMonthDay,
          isCurrentMonth: false,
        });
        prevMonthDay++;
      } else if (dayNumber > daysInMonth) {
        // Next month days
        const nextMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          nextMonthCounter
        );
        grid.push({
          date: nextMonthDate,
          dayNumber: nextMonthCounter,
          isCurrentMonth: false,
        });
        nextMonthCounter++;
      } else {
        // Current month days
        grid.push({
          date: dayDate,
          dayNumber,
          isCurrentMonth: true,
        });
      }
    }

    return grid;
  };

  const calendarGrid = generateCalendarGrid();

  return (
    <div className="flex flex-col h-full">
      {/* Week day headers */}
      <div className="grid grid-cols-7 bg-neutral-50 border-b border-neutral-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-neutral-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6 divide-x divide-y divide-neutral-200">
        {calendarGrid.map((day, index) => (
          <Droppable
            key={`${day.date.toISOString()}-${index}`}
            droppableId={`${day.date.toISOString()}`}
            type="event"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[120px] p-1 ${
                  day.isCurrentMonth
                    ? "bg-white"
                    : "bg-neutral-50 text-neutral-400"
                } ${snapshot.isDraggingOver ? "bg-primary-50" : ""} relative`}
                onClick={() => onSlotClick(day.date)}
              >
                <div
                  className={`text-sm p-1 ${
                    day.isCurrentMonth ? "text-neutral-900" : "text-neutral-400"
                  }`}
                >
                  {day.dayNumber}
                </div>

                <div className="space-y-1">
                  {getEventsForDay(day.date).map((event, eventIndex) => (
                    <Draggable
                      key={event.id}
                      draggableId={event.id}
                      index={eventIndex}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`${getEventColor(
                            event.type
                          )} p-1 rounded-md text-xs border shadow-sm ${
                            snapshot.isDragging ? "shadow-lg" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              {...provided.dragHandleProps}
                              className="mr-1 cursor-grab"
                            >
                              <TbGripVertical className="h-3 w-3" />
                            </div>
                            <div className="flex-1 truncate">
                              <div className="font-medium truncate">
                                {event.title}
                              </div>
                              <div className="flex items-center space-x-1 text-[10px]">
                                <TbClock className="h-3 w-3" />
                                <span>{formatTime(event.start)}</span>
                                {event.assignedTo && (
                                  <>
                                    <TbUser className="h-3 w-3 ml-1" />
                                    <span>{event.assignedTo}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
