import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  TbClock,
  TbUser,
  TbGripVertical,
  TbCalendarEvent,
} from "react-icons/tb";

const WeekView = ({ currentDate, events, onSlotClick }) => {
  // Get week dates
  const getWeekDates = (date) => {
    const week = [];
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // Get hours array (24 hours)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Format hour
  const formatHour = (hour) => {
    return new Date(0, 0, 0, hour).toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    });
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Get events for a specific time slot
  const getEventsForTimeSlot = (date, hour) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getHours() === hour
      );
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

  const weekDates = getWeekDates(currentDate);

  return (
    <div className="flex flex-col h-full">
      {/* Time column header */}
      <div className="grid grid-cols-8 bg-neutral-50 border-b border-neutral-200">
        <div className="py-2 px-4 text-sm font-medium text-neutral-600">
          Time
        </div>
        {weekDates.map((date) => (
          <div
            key={date.toISOString()}
            className="py-2 text-center text-sm font-medium text-neutral-600"
          >
            {formatDate(date)}
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8 divide-x divide-neutral-200">
          {/* Time column */}
          <div className="divide-y divide-neutral-200">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-20 p-2 text-xs text-neutral-500 text-right pr-4"
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>

          {/* Days columns */}
          {weekDates.map((date) => (
            <div
              key={date.toISOString()}
              className="divide-y divide-neutral-200"
            >
              {hours.map((hour) => (
                <Droppable
                  key={`${date.toISOString()}-${hour}`}
                  droppableId={`${date.toISOString()}-${hour}`}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`h-20 p-1 ${
                        snapshot.isDraggingOver ? "bg-primary-50" : "bg-white"
                      }`}
                      onClick={() => {
                        const clickedDate = new Date(date);
                        clickedDate.setHours(hour);
                        onSlotClick(clickedDate);
                      }}
                    >
                      {getEventsForTimeSlot(date, hour).map(
                        (event, eventIndex) => (
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
                                )} p-1 rounded-md text-xs border shadow-sm mb-1 ${
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
                                    {event.assignedTo && (
                                      <div className="flex items-center text-[10px]">
                                        <TbUser className="h-3 w-3 mr-1" />
                                        <span>{event.assignedTo}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
