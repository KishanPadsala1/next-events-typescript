import React, { FormEvent, useRef, useState } from "react";
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

const AddNewEvent = () => {
  const notificationCtx = useContext(NotificationContext);
  const { showNotification } = notificationCtx;
  const [eventImage, setEventImage] = useState("images/coding-event.jpg");
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventImage(e.target.value);
  };

  const formref = useRef<HTMLFormElement>(null);
  const title = useRef<HTMLInputElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const isFeatured = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const eventTitle = title.current?.value;
    const eventDate = date.current?.value;
    const eventLocation = location.current?.value;
    const eventDescription = description.current?.value;
    let eventIsFeatured: boolean | undefined = isFeatured.current?.checked;

    if (eventIsFeatured) {
      eventIsFeatured = true;
    } else {
      eventIsFeatured = false;
    }

    const id = Math.random().toString(36).substring(2, 7);
    const newEvent = {
      date: eventDate,
      description: eventDescription,
      id: id,
      image: eventImage,
      isFeatured: eventIsFeatured,
      location: eventLocation,
      title: eventTitle,
    };

    console.log(newEvent.title);
    showNotification({
      title: "Sending Event...",
      message: "Your event is currently being stored into a database. ",
      status: "pending",
    });
    fetch("/api/add-get-events", {
      method: "POST",
      body: JSON.stringify({ newEvent }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        showNotification({
          title: "Success!",
          message: "Your event was saved!",
          status: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });

    formref.current?.reset();
  };

  return (
    <div className="login-box">
      <h2>Add Event</h2>
      <form onSubmit={submitHandler} ref={formref}>
        <div className="user-box">
          <input type="text" name="" required ref={title} />
          <label>Title</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name=""
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            id="date"
            required
            ref={date}
          />
          <label>Date</label>
        </div>
        <div className="user-box">
          <input type="text" name="" required ref={location} />
          <label>Location</label>
        </div>
        <div className="user-box">
          <input type="text" name="" required ref={description} />
          <label>Description</label>
        </div>
        <div className="radio-group">
          <div className="radio-button">
            <input
              id="image1"
              type="radio"
              name="image"
              required
              value="images/coding-event.jpg"
              checked={eventImage === "images/coding-event.jpg"}
              onChange={onOptionChange}
            />
            <label className="image-radio" htmlFor="image1">
              Coding event image
            </label>
          </div>
          <div className="radio-button">
            <input
              id="image2"
              type="radio"
              name="image"
              required
              value="images/introvert-event.jpg"
              checked={eventImage === "images/introvert-event.jpg"}
              onChange={onOptionChange}
            />
            <label className="image-radio" htmlFor="image2">
              Introvert event image
            </label>
          </div>
          <div className="radio-button">
            <input
              id="image3"
              type="radio"
              name="image"
              required
              value="images/extrovert-event.jpg"
              checked={eventImage === "images/extrovert-event.jpg"}
              onChange={onOptionChange}
            />
            <label className="image-radio" htmlFor="image3">
              Extrovert event image
            </label>
          </div>
        </div>
        <div className="isfeatured">
          <input
            id="checkbox"
            type="checkbox"
            name="checkbox"
            ref={isFeatured}
          />
          <label htmlFor="checkbox">IsFeatured</label>
        </div>

        <button>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewEvent;
