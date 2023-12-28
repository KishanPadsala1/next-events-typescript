import { ReactNode, createContext, useState, useEffect } from "react";
import { contextValueType, notificationDataType } from "@/types";

const contextDefaultValue: contextValueType = {
  notification: null,
  showNotification: function (notificationData: notificationDataType) {},
  hideNotification: function () {},
  showModal: false,
  openModal: function (id) {},
  closeModal: function () {},
  eventId: ""
};

const NotificationContext = createContext(contextDefaultValue);

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeNotification, setActiveNotification] =
    useState<notificationDataType | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [eventId, setEventId] = useState<string>("");

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 2500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: notificationDataType) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const openModalHandler = (id: string) => {    
    setEventId(id);
    setShowModal(true);
  }

  const closeModalHandler = () => {
    setShowModal(false);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
    showModal: showModal,
    openModal: openModalHandler,
    closeModal: closeModalHandler,
    eventId: eventId
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
