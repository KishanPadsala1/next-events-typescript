import React, { Fragment } from "react";
import Head from "next/head";
import AllNewEvents from "@/components/events/event-add-new";

const NewEvents = () => {
  return (
    <Fragment>
      <Head>
        <title>Add New Event</title>
        <meta
          name="description"
          content="Add a lot of great events that allow you to evolve..."
        />
      </Head>
      <AllNewEvents />
    </Fragment>
  );
};

export default NewEvents;
