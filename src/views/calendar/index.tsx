
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createResizePlugin } from "@schedule-x/resize";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";

import CreateEventModal from "@/components/calendar/CreateEvent";
import EditEventModal from "@/components/calendar/EditModal";
import ViewEventModal from "@/components/calendar/EventViewModal";
import DeleteModal from "@/components/calendar/DeleteEvent";
import { useCreateEvent, useGetEvents } from "@/hooks/events";
import { Event } from "@/types/api";
import { convertTimeToHoursMinutes } from "@/utils/formatter";
import EventSkeleton from "@/skeleton/EventSkeleton";
import { useSelector } from "react-redux";

function CalendarApp() {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const { mutate: createEvent, isPending: isCreating } = useCreateEvent();
  const { data: allEvents, isLoading } = useGetEvents();
  const { user: loggedInUser } = useSelector((state: RootState) => state.auth);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (allEvents || loggedInUser?.profile?.interviews) {
      const mapEventData = (event) => ({
        id: event.id,
        title: event.title || event.company_name || "Untitled Event",
        location: event.location,
        date: event.start_date,
        start: `${event.start_date.split("T")[0]} ${convertTimeToHoursMinutes(
          event.start_time
        )}`,
        end: `${event.end_date.split("T")[0]} ${convertTimeToHoursMinutes(
          event.end_time
        )}`,
        description: event.description || "No description provided",
        candidates: event.candidates || [],
        status: event.status || "N/A",
        calendar: event.company_name ? "interview" : "event",
      });
      const mappedAllEvents = allEvents?.map(mapEventData) || [];
      const mappedInterviews =
        loggedInUser?.profile?.interviews?.map(mapEventData) || [];
      const combinedEvents = [...mappedAllEvents, ...mappedInterviews];
      setEvents(combinedEvents);
      eventsService.set(combinedEvents);
    }
  }, [allEvents, loggedInUser]);

  // Calendar app instance
  const calendar = useCalendarApp({
    views: [
      createViewMonthGrid(),
      createViewDay(),
      createViewWeek(),
      createViewMonthAgenda(),
    ],
    callbacks: {
      onEventClick(calendarEvent) {
        setSelectedEvent(calendarEvent);
        setIsViewModalOpen(true);
      },
    },
    // events,

    calendars: {
      interview: {
        colorName: "interview",
        lightColors: {
          main: "#f91c45",
          container: "#ffd2dc",
          onContainer: "#59000d",
        },
        darkColors: {
          main: "#ffc0cc",
          onContainer: "#ffdee6",
          container: "#a24258",
        },
      },
      event: {
        colorName: "event",
        lightColors: {
          main: "#1c7df9",
          container: "#d2e7ff",
          onContainer: "#002859",
        },
        darkColors: {
          main: "#c0dfff",
          onContainer: "#dee6ff",
          container: "#426aa2",
        },
      },
    },

    plugins: [eventsService, createResizePlugin(), createDragAndDropPlugin()],
  });

  // Controlled form state for event creation and updates
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    date: "",
    start: "",
    end: "",
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const shareEvent = () => {};

  // Create a new event
  const handleCreateEvent = async (formattedData: Event) => {
    try {
      await createEvent(formattedData);
      setEvents((prevEvents) => [...prevEvents, formattedData]);
      eventsService.set([...events, formattedData]);
      setEventData({
        title: "",
        location: "",
        date: "",
        start: "",
        end: "",
        description: "",
        candidates: [],
        status: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);
  const closeViewModal = () => setIsViewModalOpen(false);
  // Submit handler for creating/updating events
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Math.random(), // Generate a new ID if not editing
      title: eventData.title,
      location: eventData.location,
      start: `${eventData.date} ${eventData.start}`,
      end: `${eventData.date} ${eventData.end}`,
    };

    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? newEvent : event
        )
      );
    } else {
      // Create a new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    eventsService.set([...events, newEvent]); // Update calendar
    setEventData({
      title: "",
      location: "",
      date: "",
      start: "",
      end: "",
    });
    setSelectedEvent(null);
  };

  // Delete an event
  const deleteEvent = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== selectedEvent.id)
    );
    eventsService.set(events.filter((event) => event.id !== selectedEvent.id)); // Update calendar
    setSelectedEvent(null);
  };

  // Sync `eventData` with `selectedEvent`
  useEffect(() => {
    if (selectedEvent) {
      const [startDate, startTime] = selectedEvent.start?.split(" ") || [
        "",
        "",
      ];
      const [, endTime] = selectedEvent.end?.split(" ") || ["", ""];
      setEventData({
        title: selectedEvent.title,
        location: selectedEvent.location,
        date: startDate,
        start: startTime,
        end: endTime,
        description: selectedEvent.description,
        candidates: selectedEvent.candidates,
        status: selectedEvent.status,
      });
    }
  }, [selectedEvent]);

  if (isLoading) {
    return <EventSkeleton />;
  }

  return (
    <div className="pt-[30px]">
      <div className="mb-4 flex w-full justify-end">
        <button
          className="px-4 py-2 bg-brand-500 hover:scale-[1.02] text-white rounded-xl shadow hover:bg-brand-600-600"
          onClick={() => {
            setSelectedEvent(null);
            setEventData({
              title: "",
              location: "",
              date: "",
              start: "",
              end: "",
            });
            setIsCreateModalOpen(true);
          }}
        >
          Create Event
        </button>
      </div>
      {/* Modals */}
      {isCreateModalOpen && (
        <CreateEventModal
          loading={isCreating}
          eventData={eventData}
          handleChange={handleChange}
          handleSubmit={handleCreateEvent}
          closeModal={closeCreateModal}
        />
      )}
      {isEditModalOpen && (
        <EditEventModal
          eventData={selectedEvent}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeEditModal}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          handleSubmit={deleteEvent}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isViewModalOpen && (
        <ViewEventModal
          eventData={selectedEvent}
          shareEvent={shareEvent}
          onEditEvent={() => {
            console.log(selectedEvent);
            setIsEditModalOpen(true);
            setIsViewModalOpen(false);
          }}
          onDeleteEvent={() => {
            setIsDeleteModalOpen(true);
            setIsViewModalOpen(false);
          }}
          closeModal={closeViewModal}
        />
      )}
      {/* Calendar Component */}
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;
