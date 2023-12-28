import * as React from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { usePathname } from 'next/navigation';
import NotificationContext from '@/store/notification-context';
import { useContext } from 'react';
import classes from "./modal.module.css";
import Link from 'next/link';

export default function TransitionsModal() {
  const [showLoader, setShowLoader] = React.useState(false);
  const notificationCtx = useContext(NotificationContext);
  const {showNotification, showModal, closeModal, eventId} = notificationCtx;
  const handleClose = () => closeModal();

  let error = false;
  function deleteEventHandler() {
    closeModal();
    setShowLoader(true);    
    fetch("/api/deleteEvent", {
      method: "POST",
      body: JSON.stringify({ eventId }),
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
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        showNotification({
          title: "Error!",
          message:
            "unable to delete event at this moment please try after some time.",
          status: "error",
        });
      });
  }

  const currentPath = usePathname();

  return (
    <div>
      {!showLoader ? (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showModal}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showModal}>
            <div className={classes.modal}>
              <div className={classes.modalheader}>
                <div className={classes.modaltitle}>Delete Event</div>
                <div>
                  <span className={classes.closebutton} onClick={handleClose}>
                    x
                  </span>
                </div>
              </div>
              <div className={classes.modaldesc}>
                <p>Are you sure you want to delete Event?</p>
              </div>
              <div className={classes.modalfooter}>
                <button
                  className={`${classes.secondarybutton} ${classes.btn}`}
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <Link href={currentPath} scroll={false}>
                  <button
                    className={`${classes.primarybutton} ${classes.btn}`}
                    onClick={deleteEventHandler}
                  >
                    Confirm
                  </button>
                </Link>
              </div>
            </div>
          </Fade>
        </Modal>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}