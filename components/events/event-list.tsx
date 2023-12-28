import React from "react";
import { DUMMY_EVENTS_TYPE } from "@/types";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList = ({ items }: { items: DUMMY_EVENTS_TYPE[] }) => {
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
};

export default EventList;
