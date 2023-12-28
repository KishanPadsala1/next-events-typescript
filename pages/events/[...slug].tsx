import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { DUMMY_EVENTS_TYPE } from "@/types";
import LinearBuffer from "@/components/ui/linearProgress";
import { GetServerSideProps } from "next/types";
import { getFilteredEvents } from "@/helper/api-util";

type Props = {
  inValidFilter?: boolean;
  error?: boolean;
  filteredEvents?: DUMMY_EVENTS_TYPE[];
  noEventsFound?: boolean;
  numYear: number;
  numMonth: number;
};

const FilteredEventsPage = (props: Props) => {
  const {inValidFilter, error, filteredEvents, noEventsFound, numYear, numMonth} = props;
  // const [loadedEvents, setLoadedEvents] = useState<DUMMY_EVENTS_TYPE[]>();
  // const [allEvents, setAllEvents] = useState<DUMMY_EVENTS_TYPE[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false);

  // const router = useRouter();
  // const filterData = router.query.slug;

  // useEffect(() => {
  //   // setIsLoading(true);
  //   fetch("/api/add-get-events")
  //     .then(async (response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }

  //       const data = await response.json();
  //       throw new Error(data.message || "Something went wrong!");
  //     })
  //     .then((data) => {
  //       setLoadedEvents(data.events);
  //       // setAllEvents(data.events);
  //       // setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(true);
  //       // setIsLoading(false);
  //     });
  // }, []);

  // let pageHeadData = (
  //   <Head>
  //     <title>Featured Events</title>
  //     <meta name="description" content={"Display all featured events."} />
  //   </Head>
  // );

  // if (!filterData || !loadedEvents) {
  //   // || isLoading
  //   return (
  //     <Fragment>
  //       {pageHeadData}
  //       {/* {isLoading && <LinearBuffer />} */}
  //       <p className="loading" style={{ marginTop: "28px" }}>
  //         Events Loading...
  //       </p>
  //     </Fragment>
  //   );
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // pageHeadData = (
  //   <Head>
  //     <title>Featured Events</title>
  //     <meta
  //       name="description"
  //       content={`All events for ${numYear}/${numMonth}.`}
  //     />
  //   </Head>
  // );

  // if (
  //   isNaN(numYear) ||
  //   isNaN(numMonth) ||
  //   numYear > 2023 ||
  //   numYear < 2021 ||
  //   numMonth < 1 ||
  //   numMonth > 12
  // ) {
  //   return (
  //     <Fragment>
  //       {pageHeadData}
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your filter's values!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Fragment>
  //       {pageHeadData}
  //       <ErrorAlert>
  //         <p>Fetching Events Failed Please Try Again After Some Time!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // const filteredEvents = loadedEvents.filter((event) => {
  //   const eventDate = new Date(event.date);
  //   return (
  //     eventDate.getFullYear() === numYear &&
  //     eventDate.getMonth() === numMonth - 1
  //   );
  // });

  // if (!filteredEvents || filteredEvents.length === 0) {
  //   return (
  //     <Fragment>
  //       {pageHeadData}
  //       <ErrorAlert>
  //         <p>No events found for the chosen filters!</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  // const date = new Date(numYear, numMonth - 1);

  // return (
  //   <Fragment>
  //     {pageHeadData}
  //     <ResultsTitle date={date} />
  //     <EventList items={filteredEvents} />
  //   </Fragment>
  // );

  let pageHeadData = (
    <Head>
      <title>Featured Events</title>
      <meta name="description" content={"Display all featured events."} />
    </Head>
  );

  pageHeadData = (
    <Head>
      <title>Featured Events</title>
      <meta
        name="description"
        content={`All events for ${numYear}/${numMonth}.`}
      />
    </Head>
  );

  if (inValidFilter) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your filter's values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Fetching Events Failed Please Try Again After Some Time!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filters!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  const filterData = params!.slug;

  if (filterData) {
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2023 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12
    ) {
      return {
        props: { inValidFilter: true, numYear, numMonth },
      };
    }

    let events: DUMMY_EVENTS_TYPE[];
    let filteredEvents: DUMMY_EVENTS_TYPE[];
    let error: boolean;
    try {
      const response = await fetch("http://localhost:3000/api/add-get-events");

      if (response.ok) {
        const data = await response.json();
        events = data.events;
        error = false;

        filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
          );
        });

        if (filteredEvents) {
          return {
            props: {
              filteredEvents: filteredEvents || null,
              numYear,
              numMonth,
            },
          };
        } else {
          return {
            props: { noEventsFound: true, numYear, numMonth },
          };
        }
      } else {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (e) {
      return {
        props: { error: true, numYear, numMonth },
      };
    }
  } else {
    return {
      props: {},
    };
  }
};

export default FilteredEventsPage;
