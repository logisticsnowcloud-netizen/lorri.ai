import React, { useEffect, useState, useRef } from "react";
import "./Scheduledemo.css";
import { isValidEmail, isValidPhoneNumber } from "../Constants";
import Axios from "axios";
import { Urls } from "../../Urls";
import Loader from "../Loader";
import { currentRequestTimeStamp } from "./../Constants";
import classes from "../Scheduledemo/Scheduledemo.module.css";
import ReactGA from "react-ga";
import mixpanel from "mixpanel-browser";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddToCalendarButton from "./addToCalendarButton";

const Scheduledemo = ({ setIsSuperUser }) => {
  const [show, setShow] = useState(false);
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const nextHour = (currentHour + 1) % 24; // to loop back to 0 after 23
  const heardFromOptions = [
    "Google Search",
    "Social Media",
    "Referral from an Existing Customer",
    "Industry Event",
    "Other",
  ];

  const defaultTime = `${nextHour.toString().padStart(2, "0")}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const unformattedDate = tomorrow
    .toLocaleDateString("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");

  const defaultDate = `${unformattedDate[2]}-${unformattedDate[0]}-${unformattedDate[1]}`;

  const [userInput, setUserInput] = useState({
    name: "",
    company_name: "",
    email: "",
    contact_number: "",
    designation: "",
    date: defaultDate,
    time: defaultTime,
    check: true,
    heardFrom: "",
  });

  const handleChange = (key, value) => {
    setUserInput((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const sendEmail = () => {
    const mailingList = [
      "connect@logisticsnow.in",
      "raj@logisticsnow.in",
      // "radhika@logisticsnow.in",
      "associate@logisticsnow.in",
      "sale@thelogisticsnow.com",
    ];

    const getEmailBody = (receiveremail) => {
      let email_body = {
        from_email: `lorri@logisticsnow.in`,
        user_type: "company",
        subject: `Demo Request for LoRRI ${userInput.name ? "( Name -" : ""} ${
          userInput.name ? userInput.name : ""
        } ${userInput.company_name ? "& Company Name-" : ""} ${
          userInput.company_name ? userInput.company_name : ""
          } ${userInput.company_name ? ")" : ""}`,
        to_email: receiveremail,
        content: `Demo Requested by ${userInput.name ? "Name - " : ""}  ${
          userInput.name ? userInput.name : ""
        } ${userInput.company_name ? "Company Name - " : ""} ${
          userInput.company_name ? userInput.company_name : ""
        } ${userInput.designation ? "Designation - " : ""} ${
          userInput.designation ? userInput.designation : ""
        }  Contact Email-${userInput.email} Contact Number - ${
          userInput.contact_number
        } Date - ${userInput.date} Time - ${userInput.time} Heard From - ${
          userInput.heardFrom
          }  Newsletter - ${userInput.check ? "Yes" : "NO"}`,
        email_status: "Pending",
        activity: "Email Request",
      };
      return email_body;
    };

    setShow(true);
    Promise.all(
      mailingList.map((mail) =>
        Axios.post(Urls.log, getEmailBody(mail)).catch((err) => {
          setShow(false);
          console.log(err);
        })
      )
    )
      .then(() => {
        setShow(false);
        setUserInput({
          name: "",
          company_name: "",
          email: "",
          contact_number: "",
          designation: "",
          date: defaultDate,
          time: defaultTime,
          check: false,
          heardFrom: "",
        });
      })
      .catch((err) => {
        setShow(false);
        console.log(err);
      });
    toast.success("Demo Request Sent Successfully");
  };

  const sendMeetingInvite = () => {
    const getEmailBody = () => {
      const cc_mail = [
        // "radhika@logisticsnow.in",
        "associate@logisticsnow.in",
        "raj@logisticsnow.in",
        "sales@thelogisticsnow.com",
        "smeet@thelogisticsnow.com",
        "partner@logisticsnow.in"
      ];
      return {
        type: "superlaunch",
        activity: "New Enquiry Email Request",
        mail_status: "Pending",
        from_email: "connect@logisticsnow.in",
        user_type: "company",
        subject: `LoRRI Demo scheduled`,
        timestamp: currentRequestTimeStamp,
        to_email: `${userInput.email}`,
        cc: cc_mail,
        content: `
          <div><span>Dear ${
            userInput.name ? userInput.name : "User"
          }</span></div>
          <br/>
          <div>
          <span>
          Team LoRRI is inviting you to a scheduled Zoom meeting.<br/>
          <br/>
          Topic: LoRRI SCHEDULE MEETING <br/>
          <br/>
          Scheduled Date and Time: Date-${
            userInput.date ? userInput.date : null
          }, Time-${userInput.time ? userInput.time : null}<br/>
          <br/>
          Join Zoom Meeting <br/>
          <br/>
          <a href="https://us02web.zoom.us/j/3115035961" target="_blank" rel="noopener noreferrer">https://us02web.zoom.us/j/3115035961</a> <br/>
          
          Meeting ID: 3115035961 <br/>
          </span>
          </div>
          <br/>
          Warm Regards,<br/> 
          Team LoRRI.
          <span></div>
          <br/>
          <div>
          The information contained in this electronic message and any attachments to this message are intended for
          the exclusive use of the addressee(s) and may contain proprietary, confidential or privileged information. 
          If you are not the intended recipient, you should not disseminate, distribute or copy this e-mail. 
          Please notify the sender immediately and destroy all copies of this message and any attachments contained in it.
          </div>          
          `,
      };
    };

    setShow(true);
    Axios.post(Urls.logURL, getEmailBody())
      .then((res) => {
        setShow(false);
      })
      .catch((err) => {
        setShow(false);
        console.log(err);
      });
  };

  const ValidateInputs = (e) => {
    e && e.preventDefault();

    if (!userInput.email || !isValidEmail(userInput.email)) {
      toast.error("Please Enter Valid Email Address");
      return false;
    }

    const restrictedDomains = [
      "gmail.com",
      "yahoo.com",
      "yahoo.co.in",
      "hotmail.com",
      "outlook.com",
      "rediffmail.com",
      "live.com",
      "msn.com",
      "aol.com",
      "icloud.com",
    ];
    const emailDomain = userInput.email.split("@")[1]?.toLowerCase();

    if (emailDomain && restrictedDomains.includes(emailDomain)) {
      toast.error("Please enter a company email address");
      return false;
    }
    if (
      !userInput.contact_number ||
      !isValidPhoneNumber(userInput.contact_number)
    ) {
      toast.error("Please Enter Valid Phone Number");
      return false;
    }
    if (!userInput.date || !userInput.time) {
      toast.error("Please select date and time for demo");
      return false;
    }

    ReactGA.event({
      category: "Schedule Demo",
      action: `Request Demo Submit button clicked`,
    });

    mixpanel.track(`User has requested a demo`, {
      ApplicationName: `${Urls.mixpanelappname}`,
      ScreenName: "home",
      ModuleName: "landing_page",
      ActivityLog: `userClickedRequestDemoButton`,
      Data: `${userInput.name}, ${userInput.company_name}, ${userInput.email}, ${userInput.contact_number}, ${userInput.designation}, ${userInput.date}, ${userInput.time}, ${userInput.heardFrom}`,
      Definition: `User has requested a demo`,
      ActivityType: "event_view",
    });

    sendEmail();
    sendMeetingInvite();
    sessionStorage.setItem("isEmailExist", "yes");
    setIsSuperUser(true);
  };

  // the code below is prevents materialize css to overwrite mui styles - DO NOT REMOVE
  const scheduleFormRef = useRef(null);

  useEffect(() => {
    if (scheduleFormRef.current) {
      const inputElements = scheduleFormRef.current.querySelectorAll("input"); // Get input fields within the component

      // Loop through each input element and add the class
      if (inputElements && inputElements.length > 0) {
        inputElements.forEach((input) => {
          input.classList.add("browser-default");
        });
      }
    }
  }, []);

  return (
    <div
      className={`row ${classes["schedule-form"]}`}
      id="schedule-form"
      ref={scheduleFormRef}
    >
      <Loader show={show} />
      <div className={classes["responsive-text"]}>
        SCHEDULE MEETING / DEMO NOW
      </div>
      <form
        className={classes["s-requestdemo-form"]}
        onSubmit={(e) => ValidateInputs(e)}
        style={{ marginTop: "30px" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={"browser-default"}
              placeholder="Name"
              value={userInput.name}
              onChange={(e) => handleChange("name", e.target.value)}
              id="Demo_First_Name"
              label="Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={"browser-default"}
              placeholder="Email"
              value={userInput.email}
              onChange={(e) => handleChange("email", e.target.value)}
              id="Demo_Email"
              label="Organization Email"
              type="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={"browser-default"}
              placeholder="Company Name"
              value={userInput.company_name}
              onChange={(e) => handleChange("company_name", e.target.value)}
              id="Demo_Company_Name"
              label="Company Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={"browser-default"}
              placeholder="Designation"
              value={userInput.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              id="Demo_Designation"
              label="Designation"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={"browser-default"}
              placeholder="Contact Number"
              value={userInput.contact_number}
              maxLength="10"
              onChange={(e) => handleChange("contact_number", e.target.value)}
              id="Demo_Contact_Number"
              label="Contact Number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="How did you hear about us?"
              value={userInput.heardFrom}
              onChange={(e) => handleChange("heardFrom", e.target.value)}
              variant="outlined"
              fullWidth
              menuprops={{
                getContentAnchorEl: null,
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
              }}
              InputProps={{
                classes: {
                  root: classes.outlinedInput,
                },
              }}
            >
              {heardFromOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              value={userInput.date}
              label="Date"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                inputProps: {
                  min: defaultDate,
                },
              }}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              className={`${classes["browser-default"]} ${classes["cursor-pointer"]}`}
              type="time"
              value={userInput.time}
              onInput={(e) => handleChange("time", e.target.value)}
              label="Time"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={userInput.check}
                  style={{ color: "#393185" }}
                  onChange={(e) => handleChange("check", e.target.checked)}
                />
              }
              label="I would like to receive updates on latest modules and news from LoRRI."
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginBottom: "12px",
              marginTop: "8px",
              display: "flex",
              justifyContent: "space-between",
              gap: "2%",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Schedule Demo
            </Button>
            <AddToCalendarButton
              userInput={userInput}
              sendMail={ValidateInputs}
            ></AddToCalendarButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Scheduledemo;
