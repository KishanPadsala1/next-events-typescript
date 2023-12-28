import { ObjectId } from "mongodb";

export type DUMMY_EVENTS_TYPE = {
  _id: ObjectId;
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type commentType = {
  _id: string;
  name: string;
  text: string;
};

export type contextValueType = {
  notification: notificationDataType | null;
  showNotification: (notificationData: notificationDataType) => void;
  hideNotification: () => void;
  showModal: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;
  eventId: string;
};

export type notificationDataType = {
  title: string;
  message: string;
  status: string;
};
