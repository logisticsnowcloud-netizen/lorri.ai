import React from "react";
import Rating from "react-rating";
import { getImageSrc, imageFallBack } from "../../Constants";
import { encryptor } from "../../Constants";
import { Activity, currentRequestTimeStamp } from "./../../Constants";
import "./Transporterlist.css"
import { Urls } from "../../../Urls";

const Transporterlist = ({
  transporters = [],
  dashboard = [],
  locationName = {},
  // history,
}) => {
  const Card = ({ transporter }) => {
    return (
      <div>
        <a
          href={`${Urls.ClientBaseUrl}tpmp/${encryptor(
            transporter.transporter_id,
            true
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            Activity([
              {
                screen: "Search Transporters",
                module: "Search Transporters",
                user_activity: `${transporter.transporter_name} Card Clicked`,
                timestamp: currentRequestTimeStamp(),
              },
            ]);
          }}
          className="transporter-container"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              className="transporter-container-contents"
            >
              <img
                alt="img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={getImageSrc(transporter.logo)}
                onError={(e) => imageFallBack(e)}
              />
            </div>
            <div>
              <div style={{ fontWeight: "bold", color: "#0F52BA", textTransform: "uppercase" }}>
                {transporter.transporter_name}
              </div>
              <hr style={{ margin: "5px 0" }} />
              <div>
                <Rating
                  initialRating={transporter.overall_rating}
                  fullSymbol={
                    <i style={{ color: "orange" }} className="material-icons">
                      star
                    </i>
                  }
                  emptySymbol={
                    <i style={{ color: "orange" }} className="material-icons">
                      star_border
                    </i>
                  }
                  readonly="true"
                />
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  };

  const ViewMore = () => {
    Activity([
      {
        screen: "Search Transporters",
        module: "Search Transporters",
        user_activity: "Sign Up Button Clicked",
        timestamp: currentRequestTimeStamp(),
      },
    ]);
  };

  // const ViewProfile = () => {
  //   Activity([
  //     {
  //       screen: "Search Transporters",
  //       module: "Search Transporters",
  //       user_activity: "View Sample Profile Button Clicked",
  //       timestamp: currentRequestTimeStamp(),
  //     },
  //   ]);
  //   history.push("/sampleProfile");
  // };

  return (
    <>
        <div className="showOnLargeScreen" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h5 style={{ margin: "10px 0" }}>
                Transporters in{" "}
                {locationName.location && locationName.location.label
                  ? locationName.location.label.split(",")[0]
                  : ""}
              </h5>
              <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                Showing {transporters.length} of{" "}
                <span style={{ fontSize: "20px", fontWeight: "600" }}>
                  {dashboard && dashboard.length > 0 ? dashboard[0].value : 0}
                </span>{" "}
                transporters
              </div>
            </div>
            <a
              href={Urls.ClientBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={ViewMore}
              className="master-signup-btn"
            >
              Sign Up
            </a>
          </div>
          <hr />
        </div>

        <div className="showOnMobile">
          <center>
            <a
              href={Urls.ClientBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={ViewMore}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Sign Up
            </a>
          </center>
        </div>
      <div
        style={{ maxHeight: "24.375rem", overflowY: "auto" }}
        className={`custom-scrollbar`}
      >
        {transporters.map((item) => (
          <Card transporter={item} />
        ))}
      </div>
    </>
  );
};

export default Transporterlist;
