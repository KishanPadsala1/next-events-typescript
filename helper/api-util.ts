import { DUMMY_EVENTS_TYPE } from "@/types";

export const getAllEvents = async () => {
  const response = await fetch(
    "https://react-http-10be4-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  let events: DUMMY_EVENTS_TYPE[] = [];

  for (const key in data) {
    events.push(data[key]);
  }
  return events;
};

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: {
  year: number;
  month: number;
}) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
