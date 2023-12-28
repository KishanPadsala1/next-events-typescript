import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import EventList from "@/components/events/event-list";
import { DUMMY_EVENTS_TYPE } from "@/types";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import LinearBuffer from "@/components/ui/linearProgress";
import ErrorAlert from "@/components/ui/error-alert";

const HomePage = ({
  featuredEvents,
  error,
}: {
  featuredEvents: DUMMY_EVENTS_TYPE[];
  error: boolean;
}) => {
  // const [featuredEvents, setFeaturedEvents] = useState<DUMMY_EVENTS_TYPE[]>([]);
  // const [eventsIsLoading, setEventsIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   setEventsIsLoading(true);
  //   fetch("/api/getFeaturedEvents")
  //     .then(async (response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }

  //       const data = await response.json();
  //       throw new Error(data.message || "Something went wrong!");
  //     })
  //     .then((data) => {
  //       setFeaturedEvents(data.events);
  //       setEventsIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setEventsIsLoading(false);
  //       setError(true);
  //     });
  // }, []);

  // let featuredEvents: DUMMY_EVENTS_TYPE[] = [];
  // featuredEvents = allEvents.filter((event) => event.isFeatured === true);
  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      {/* {eventsIsLoading && <LinearBuffer />} */}
      <NewsletterRegistration />
      {error && (
        <ErrorAlert>
          <p>Fetching Events Failed Please Try Again After Some Time!</p>
        </ErrorAlert>
      )}
      {/* {eventsIsLoading && <p className="loading">Events Loading...</p>} */}
      {!error && <EventList items={featuredEvents} />} {/* !eventsIsLoading &&  */}
    </Fragment>
  );
};

export async function getStaticProps() {
  let featuredEvents;
  let error;
  try {
    const response = await fetch("http://localhost:3000/api/getFeaturedEvents");

    if (response.ok) {
      const data = await response.json();
      featuredEvents = data.events;
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
      featuredEvents: featuredEvents || null,
      error: error,
    },
    revalidate: 1800,
  };
}

export default HomePage;
