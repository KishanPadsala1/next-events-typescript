import React, { Fragment, ReactNode, useState } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "@/store/notification-context";
import { useContext } from "react";
import TransitionsModal from "../ui/modal";

const Layout = ({ children }: { children: ReactNode }) => {
  const notificationCtx = useContext(NotificationContext);
  const { notification } = notificationCtx;

  return (
    <Fragment>
      <MainHeader />     
      <TransitionsModal />
      <main>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
