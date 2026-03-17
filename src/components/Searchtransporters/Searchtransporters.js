import { useEffect, useState } from "react";
// import Map from "./Map";
import Axios from "axios";
import M from "materialize-css";
import mixpanel from "mixpanel-browser";
import ReactGA from "react-ga";
// import Rating from "react-rating";
import {
  ENABLE_POPUPS,
  MAX_NUMBER_OF_SEARCHES,
  POP_APPEARS_IN_MINUTES,
  Urls,
} from "../../Urls";
import Loader from "../Loader";
import { Activity, currentRequestTimeStamp, encryptor } from "./../Constants";
import Map2 from "./Map/Map2";
import { CollectEmailModal, NoAccessModal, TransporterLists } from "./Modal";
import Searchbar from "./Searchbar";
import classes from "./Searchtransporters.module.css";
import Transporterlist from "./Transporterlist";
import { useHistory } from "react-router-dom";
const SearchTransporters = (props) => {
  const [searchedInput, setsearchedInput] = useState(
    props.history.location.state ? props.history.location.state : "",
  );
  const [transporterList, setTransporterList] = useState([]);
  const [network, setNetwork] = useState({});
  const [email, setEmail] = useState("");
  const [dashboard, setDashboard] = useState([]);
  const [searched, setSearched] = useState([]);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState("");
  const [showCollectEmail, setShowCollectEmail] = useState(false);
  const [showNoAccess, setShowNoAccess] = useState(false);
  const [showLsps, setShowLsps] = useState(false);
  // const [isNoAcsessModalClosable, setIsNoAcsessModalClosable] = useState(true)
  const [isCollectEmailModalClosable, setIsCollectEmailModalClosable] =
    useState(true);
  const [isSuperUser, setIsSuperUser] = useState(
    sessionStorage.getItem("isEmailExist") === "yes",
  );
  const history = useHistory();
  const submitHandler = () => {
    if (email === "" || !validateEmail(email)) {
      return false;
    }

    setShowNoAccess(false);
    setShowCollectEmail(false);
    sessionStorage.setItem("isEmailExist", "yes");
    setIsSuperUser(true);
    Activity([
      {
        screen: "Home",
        module: "Search Bar",
        user_activity: {
          type: "New User",
          value: `${email},${number}`,
        },
        timestamp: currentRequestTimeStamp(),
        ip: sessionStorage.getItem("ClientIP"),
      },
    ]);
    sendEmail(email);
    return true;
  };

  const searchLocation = (location) => {
    const totalSearches =
      parseInt(sessionStorage.getItem("totalSearches") || 0) + 1;

    sessionStorage.setItem("totalSearches", totalSearches);

    if (
      !isSuperUser &&
      totalSearches > MAX_NUMBER_OF_SEARCHES &&
      ENABLE_POPUPS
    ) {
      setIsCollectEmailModalClosable(false);
      setShowCollectEmail(true);
      return;
    }

    if (!location) return;

    setTransporterList([]);
    setNetwork({});
    setSearched([location.location.lon, location.location.lat]);
    setDashboard([]);
    setShow(true);

    // Fetch location data
    Axios.get(
      `${Urls.GetLocations}?lat=${location.location.lat}&lon=${location.location.lon}`,
    )
      .then((res) => {
        if (res.data) {
          setShow(false);
          setTransporterList(res.data.transporter_list);
          setNetwork(res.data.network);
          setSearched(res.data.searched_coordinates);
          setDashboard(res.data.dashboard);

          if (!isSuperUser) {
            setCount((prevCount) => prevCount + 1);
            if (count + 1 > MAX_NUMBER_OF_SEARCHES) {
              setShowNoAccess(true);
            }
          }
        }
      })
      .catch((err) => {
        setShow(false);
        console.error(err);
      });
  };

  const searchMyLocation = (value) => {
    setsearchedInput(value);
    const totalSearches =
      parseInt(sessionStorage.getItem("totalSearches") || 0) + 1;

    sessionStorage.setItem("totalSearches", totalSearches);

    if (
      !isSuperUser &&
      totalSearches > MAX_NUMBER_OF_SEARCHES &&
      ENABLE_POPUPS
    ) {
      setIsCollectEmailModalClosable(false);
      setShowCollectEmail(true);
      return;
    }

    searchLocation(value);
    Activity([
      {
        screen: "Search Transporter",
        module: "Search Bar",
        user_activity: value,
        timestamp: currentRequestTimeStamp(),
      },
    ]);

    mixpanel.track(`User has searched for a location`, {
      ApplicationName: `${Urls.mixpanelappname}`,
      ScreenName: "search_transporter_page",
      ModuleName: "search_transporter_page",
      ActivityLog: `userSearchedSearchBar`,
      Data: `${value.location_name}`,
      Definition: `User has searched for a location`,
      ActivityType: "event_view",
    });
  };

  const getEmailBody = function (user, newUser) {
    let emailBody = {
      from_email: `lorri@logisticsnow.in`,
      user_type: "company",
      subject: `New User on ScreenZero`,
      to_email: user,
      content: `<h4>Hello, </br></br>${newUser} has visited the LoRRI Home (ScreenZero)!</br>
            <div>
            Email ID is: ${email}<br/>
            Phone Number is:${number}
            </div></br>
            </br>Thanks</h4>`,
      email_status: "Pending",
      activity: "Email Request",
    };
    return emailBody;
  };

  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };

  const numberInputHandler = (event) => {
    setNumber(event.target.value);
  };

  const sendEmail = async (userEmail) => {
    const users = [
      "connect@logisticsnow.in",
      "raj@logisticsnow.in",
      "associate@logisticsnow.in",
      "smeet@thelogisticsnow.com",
    ];

    try {
      await Promise.all(
        users.map((user) =>
          Axios.post(Urls.log, getEmailBody(user, userEmail)),
        ),
      );
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  };

  function validateEmail(email) {
    // Regular expression for validating an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    ReactGA.pageview("SearchTransporter");
    document.title = "LoRRI - Search Transporter";
    const initialData = props.history.location.state;
  if (initialData && initialData.location) {
    searchLocation(initialData);
  }
    mixpanel.track(`User has viewed search transporter page`, {
      ApplicationName: `${Urls.mixpanelappname}`,
      ScreenName: "search_transporter_page",
      ModuleName: "search_transporter_page",
      ActivityLog: `userViewedSearchTransporterPage`,
      Data: `None`,
      Definition: `User has viewed search transporter page`,
      ActivityType: "page_view",
    });
    let elems2 = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems2);
  }, []);

  useEffect(() => {
    let intervalId;
    const totalSearches =
      parseInt(sessionStorage.getItem("totalSearches"), 10) || 0;

    // show popup if user is superuser and total searches is greater than MAX_NUMBER_OF_SEARCHES
    if (!isSuperUser && totalSearches > MAX_NUMBER_OF_SEARCHES) {
      setIsCollectEmailModalClosable(false);
      setShowCollectEmail(true);
    } else if (!isSuperUser) {
      intervalId = setInterval(
        () => {
          if (!isSuperUser) {
            setIsCollectEmailModalClosable(true);
            setShowCollectEmail(true);
          }
        },
        POP_APPEARS_IN_MINUTES * 60 * 1000,
      );
    }
    return () => clearInterval(intervalId);
  }, [isSuperUser]);

  const goBackToHomePage = () => {
    history.push("/");
  };
  
  return (
    <div>
      <div id="SearchContainer" className={`${classes["SearchContainer"]}`}>
        <Loader show={show} />
        {window.innerWidth >= 900 ? (
          <>
            <div className={`${classes["SearchBarContainer"]} my-2`}>
              <span>
                <button
                  className={`${classes["goBackButton"]}`}
                  onClick={goBackToHomePage}
                >
                  Go back to home page
                </button>
              </span>
              <span className={`${classes["searched_text"]}`}>
                Search your plant location here:
              </span>
              <Searchbar
                searchedInput={searchedInput}
                searchLocation={(value) => searchMyLocation(value)}
              />
            </div>
          </>
        ) : (
          <>
            <div className={classes["breadcrumbs"]}>
              <span
                className={classes["breadcrumbHome"]}
                onClick={() => props.history.push("/")}
              >
                Home
              </span>
              <span style={{ margin: "0 2px", fontSize: "18px" }}>{">"}</span>
              <span style={{ color: "#333", fontWeight: "bold" }}>
                Search Transporters
              </span>
            </div>

            <div
              className={`row ${classes["SearchBarContainer"]}`}
              style={{ display: "inline" }}
            >
              <center
              // style={{ marginTop: window.innerWidth > 600 ? "0%" : "18%" }}
              >
                <span
                  className={`${classes["searched_text"]}`}
                  style={{ marginLeft: 0 }}
                >
                  Search your plant location here:
                </span>
                <Searchbar
                  searchedInput={searchedInput}
                  searchLocation={(value) => searchMyLocation(value)}
                />
              </center>
            </div>
          </>
        )}

        <div className="row">
          <div className="col s12 m12 l7 xl7">
            <div className={classes.showOnMobile}>
              <ul>
                <li>
                  <div
                    style={{
                      justifyContent: "center",
                      display: "grid",
                      padding: "0%",
                    }}
                  >
                    {window.screen.width > 600 ? (
                      <>
                        <div
                          style={{
                            fontSize: "large",
                            color: "#393185",
                            textAlign: "center",
                          }}
                        >
                          <b>
                            {`Transporters in ${
                              searchedInput.location &&
                              searchedInput.location.label
                                ? searchedInput.location.label.split(",")[0]
                                : ""
                            }`}
                          </b>
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center ",
                          }}
                        >
                          <b>
                            Showing {transporterList.length} of{" "}
                            <span style={{ fontSize: "20px", fontWeight: 600 }}>
                              {dashboard && dashboard.length > 0
                                ? dashboard[0].value
                                : 0}
                            </span>{" "}
                            transporters
                          </b>
                          <i className="material-icons">arrow_drop_down</i>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            fontSize: "medium",
                            color: "#393185",
                            textAlign: "center",
                            textDecoration: "underline",
                          }}
                          onClick={(e) => {
                            setShowLsps(true);
                          }}
                        >
                          <b>
                            Show {transporterList.length} of{" "}
                            <span
                              style={{ fontSize: "18px", fontWeight: "bold" }}
                            >
                              {dashboard && dashboard.length > 0
                                ? dashboard[0].value
                                : 0}
                            </span>{" "}
                            Transporters in{" "}
                            {searchedInput.location &&
                            searchedInput.location.label
                              ? searchedInput.location.label.split(",")[0]
                              : ""}
                          </b>
                        </div>
                      </>
                    )}
                  </div>
                  <TransporterLists
                    show={showLsps}
                    handleClose={() => setShowLsps(false)}
                    transporterList={transporterList}
                    isClosable={true}
                    heading={
                      <p>
                        Showing {transporterList.length} of{" "}
                        <span
                          style={{ fontSize: "20px", fontWeight: "bolder" }}
                        >
                          {dashboard && dashboard.length > 0
                            ? dashboard[0].value
                            : 0}
                        </span>{" "}
                        Transporters in{" "}
                        {searchedInput.location && searchedInput.location.label
                          ? searchedInput.location.label.split(",")[0]
                          : ""}
                      </p>
                    }
                  />
                </li>
              </ul>
            </div>

            <Map2
              inflow={network.inflow}
              outflow={network.outflow}
              searched={searched}
            />
          </div>
          <div className={classes.showOnLargeScreen}>
            <div className="col s12 m12 l5 xl5">
              <Transporterlist
                transporters={transporterList}
                dashboard={dashboard}
                locationName={searchedInput}
                history={props.history}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTransporters;
