import React from "react";
import Link from "next/link";
import classes from "./main-header.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvent</Link>
      </div>
      <nav className={classes.navigation}>
        <ul className={classes.ul}>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
          <li>
            <Link href="/events/add-new-event">Add New Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
