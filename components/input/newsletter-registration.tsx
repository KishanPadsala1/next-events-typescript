import { FormEvent, use, useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";
import { useContext } from "react";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const { showNotification } = notificationCtx;
  const emailRef = useRef<HTMLInputElement>(null);

  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    const enteredEmail = emailRef.current?.value;

    if (enteredEmail) {
      showNotification({
        title: "Signing up...",
        message: "Registering for newsletter.",
        status: "pending",
      });
      fetch("/api/newsletter-registration", {
        method: "POST",
        body: JSON.stringify({ email: enteredEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (response.ok) {
            return response.json();
          }

          const data = await response.json();
          throw new Error(data.message || "Something went wrong!");
        })
        .then((data) => {
          if (data.message === "Valid email!") {
            showNotification({
              title: "Success!",
              message: "Successfull registered for newsletter!",
              status: "success",
            });
          }
        })
        .catch((error) => {
          showNotification({
            title: "Error!",
            message: error.message || "Something went wrong!",
            status: "error",
          });
        });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
