import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OutlookLogo from "../../Content/images/outlookLogo.svg";
import IcsLogo from "../../Content/images/icsLogo.svg";
import GcalLogo from "../../Content/images/google-calendar-logo.svg";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhoneNumber } from "../Constants";
import { google, outlook, ics } from "calendar-link";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  menu: {
    border: `1px solid ${theme.palette.divider}`,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  outlookLogo: {
    height: "20px",
    marginRight: theme.spacing(1),
  },
  icsLogo: {
    height: "20px",
    marginRight: theme.spacing(1),
  },
  gcalLogo: {
    height: "20px",
    marginRight: theme.spacing(1),
  },
}));

const AddToCalendarButton = ({ userInput, sendMail }) => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const anchorRef = useRef(null);
  const mailingList = [
    "connect@logisticsnow.in",
    "raj@logisticsnow.in",
    "associate@logisticsnow.in",
  ];

  const [year, month, day] = userInput.date.split("-").map(Number);
  const [hour, minute] = userInput.time.split(":").map(Number);
  const jsDate = new Date(year, month - 1, day);
  jsDate.setHours(hour);
  jsDate.setMinutes(minute);

  const event = {
    title: "Lorri Demo",
    description:
      "Join the zoom meeting here - https://us02web.zoom.us/j/3115035961",
    start: `${jsDate}`,
    guests: mailingList,
    to: mailingList,
    location: "LogisticsNow",
    duration: [1, "hour"],
  };

  const downloadIcsFile = () => {
    const icsResponse = ics(event);
    const downloadLink = document.createElement("a");
    downloadLink.setAttribute("href", icsResponse);
    downloadLink.setAttribute("download", "Lorri-Demo.ics");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const openInOutlook = () => {
    const outlookResponse = outlook(event);
    const toParam = event.to
      .map((email) => encodeURIComponent(email))
      .join("%2C");
    const outlookLinkWithToParam = `${outlookResponse}&to=${toParam}&cc=${toParam}`;
    window.open(outlookLinkWithToParam, "_blank");
  };
  const openInGoogleCalendar = () => {
    const [year, month, day] = userInput.date.split("-").map(Number);
    const dateWithTime = new Date(year, month - 1, day, 11, 0, 0);
    const isoStartTime = dateWithTime.toISOString();

    event.start = isoStartTime;
    const googleResponse = google(event);
    // console.log(googleResponse);
    window.open(googleResponse, "_blank");
  };

  const toggleDropdown = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    let isValid = true;

    if (!userInput.email || !isValidEmail(userInput.email)) {
      toast.error("Please Enter Valid Email Address");
      isValid = false;
    }

    if (
      !userInput.contact_number ||
      !isValidPhoneNumber(userInput.contact_number)
    ) {
      toast.error("Please Enter Valid Phone Number");
      isValid = false;
    }

    if (!userInput.date || !userInput.time) {
      toast.error("Please select date and time for demo");
      isValid = false;
    }

    setIsButtonDisabled(!isValid);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleClickAway = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let isValid = true;

    if (!userInput.email || !isValidEmail(userInput.email)) {
      //   toast.error("Please Enter Valid Email Address");
      isValid = false;
    }

    if (
      !userInput.contact_number ||
      !isValidPhoneNumber(userInput.contact_number)
    ) {
      //   toast.error("Please Enter Valid Phone Number");
      isValid = false;
    }

    if (!userInput.date || !userInput.time) {
      //   toast.error("Please select date and time for demo");
      isValid = false;
    }

    setIsButtonDisabled(!isValid);
  }, [
    userInput.email,
    userInput.contact_number,
    userInput.date,
    userInput.time,
  ]);

  return (
    <>
      <Button
        ref={anchorRef}
        variant="contained"
        color="primary"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleDropdown}
        disabled={isButtonDisabled}
        fullWidth
      >
        <Icon className={classes.icon}>event</Icon>
        ADD TO CALENDAR
      </Button>
      <Popper
        open={isMenuOpen}
        anchorEl={anchorRef.current}
        placement={"top"}
        transition
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              className={classes.menu}
              style={{
                marginTop: "8px",
                marginBottom: "8px",
                width: "max-content",
              }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <MenuList>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={(e) => {
                      toggleDropdown();
                      downloadIcsFile();
                      sendMail(e);
                    }}
                  >
                    <img
                      src={IcsLogo}
                      alt="ICS Logo"
                      className={classes.icsLogo}
                    />
                    Download ICS File
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={(e) => {
                      toggleDropdown();
                      openInGoogleCalendar();
                      sendMail(e);
                    }}
                  >
                    <img
                      src={GcalLogo}
                      alt="Google Calendar Logo"
                      className={classes.gcalLogo}
                    />
                    Open in Google Calendar
                  </MenuItem>
                  <MenuItem
                    className={classes.menuItem}
                    onClick={(e) => {
                      toggleDropdown();
                      openInOutlook();
                      sendMail(e);
                    }}
                  >
                    <img
                      src={OutlookLogo}
                      alt="Outlook Logo"
                      className={classes.outlookLogo}
                    />
                    Open in Outlook
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default AddToCalendarButton;
