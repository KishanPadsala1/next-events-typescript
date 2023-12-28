import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { DUMMY_EVENTS_TYPE } from "@/types";
import LinearBuffer from "@/components/ui/linearProgress";
import ErrorAlert from "@/components/ui/error-alert";
import { GetStaticProps } from "next/types";

const AllEvenetsPage = ({
  events,
  error,
}: {
  events: DUMMY_EVENTS_TYPE[];
  error: boolean;
}) => {
  // const [allEvents, setAllEvents] = useState<DUMMY_EVENTS_TYPE[]>([]);
  // const [eventsIsLoading, setEventsIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   setEventsIsLoading(true);
  //   fetch("/api/add-get-events")
  //   .then(async (response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }

  //     const data = await response.json();
  //     throw new Error(data.message || "Something went wrong!");
  //   })
  //   .then((data) => {
  //     setAllEvents(data.events);
  //     setEventsIsLoading(false);
  //   })
  //   .catch((error) => {
  //     setEventsIsLoading(false);
  //     setError(true);
  //   });
  // }, []);

  const router = useRouter();

  const findEventHandler = (selectedYear: string, selectedMonth: string) => {
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      {/* {eventsIsLoading && <LinearBuffer/>} */}
      <EventsSearch onSearch={findEventHandler} />
      {/* {eventsIsLoading && <p className="loading">Events Loading...</p>} */}
      {error && (
        <ErrorAlert>
          <p>Fetching Events Failed Please Try Again After Some Time!</p>
        </ErrorAlert>
      )}
      {!error && <EventList items={events} />} {/* !eventsIsLoading &&  */}
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let events;
  let error;
  try {
    const response = await fetch("http://localhost:3000/api/add-get-events");

    if (response.ok) {
      const data = await response.json();
      events = data.events;
      error = false;
    } else {
      const data = await response.json();
      throw new Error(data.message || "Something went wrong!");
    }
  } catch (e) {
    error = true;
  }

  return {
    props: {
      events: events || null,
      error: error,
    },
  };
};

export default AllEvenetsPage;
