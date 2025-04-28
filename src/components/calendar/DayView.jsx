import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  TbClock,
  TbUser,
  TbGripVertical,
  TbCalendarEvent,
} from "react-icons/tb";

const DayView = ({ currentDate, events, onSlotClick, onEventClick }) => {
  // Get hours array (24 hours)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Format hour
  const formatHour = (hour) => {
    return new Date(0, 0, 0, hour).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get events for a specific hour
  const getEventsForHour = (hour) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear() &&
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

  // Format event time
  const formatEventTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Day header */}
      <div className="bg-neutral-200 border-b border-neutral-300 py-3 px-4">
        <div className="text-lg font-medium text-neutral-900">
          {currentDate.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[100px_1fr] divide-x divide-neutral-300">
          {/* Time column */}
          <div className="divide-y divide-neutral-300">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-24 p-2 text-xs text-neutral-500 text-right pr-4 sticky left-0 bg-white"
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>

          {/* Events column */}
          <div className="divide-y divide-neutral-300">
            {hours.map((hour) => (
              <Droppable
                key={`${currentDate.toISOString()}-${hour}`}
                droppableId={`date:${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}-hour:${hour}`}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`h-24 p-2 ${
                      snapshot.isDraggingOver ? "bg-primary-50" : "bg-white"
                    }`}
                    onClick={() => {
                      const clickedDate = new Date(currentDate);
                      clickedDate.setHours(hour);
                      onSlotClick(clickedDate);
                    }}
                  >
                    {getEventsForHour(hour).map((event, eventIndex) => (
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
                            )} p-2 rounded-md text-sm border shadow-sm mb-2 ${
                              snapshot.isDragging ? "shadow-lg" : ""
                            } cursor-pointer`}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the grid click
                              onEventClick(event, e);
                            }}
                          >
                            <div className="flex items-start">
                              <div
                                {...provided.dragHandleProps}
                                className="mr-2 cursor-grab mt-1"
                                onClick={(e) => e.stopPropagation()} // Prevent triggering event click when using drag handle
                              >
                                <TbGripVertical className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{event.title}</div>
                                <div className="flex items-center mt-1 text-xs space-x-3">
                                  <div className="flex items-center">
                                    <TbClock className="h-3.5 w-3.5 mr-1" />
                                    <span>
                                      {formatEventTime(event.start)} -{" "}
                                      {formatEventTime(event.end)}
                                    </span>
                                  </div>
                                  {event.assignedTo && (
                                    <div className="flex items-center">
                                      <TbUser className="h-3.5 w-3.5 mr-1" />
                                      <span>{event.assignedTo}</span>
                                    </div>
                                  )}
                                </div>
                                {event.description && (
                                  <div className="mt-1 text-xs text-neutral-600">
                                    {event.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayView;
