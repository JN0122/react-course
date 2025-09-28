import { useRouteLoaderData, redirect, defer, Await } from "react-router-dom";

import EventItem from "../components/EventItem";
import { loadEvents } from "./Events";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <EventItem event={event} />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch details." }),
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

export async function loader({ params }) {
  const id = params.eventId;

  return defer({ event: await loadEvent(id), events: loadEvents() });
}

export async function action({ params, request }) {
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }), {
      status: 500,
    });
  }

  return redirect("/events");
}

