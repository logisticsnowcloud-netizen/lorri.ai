import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import india from "./india.json";
import "./Map.css";
import { Urls } from "../../../Urls";

mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default; // eslint-disable-line

const Map = ({ inflow = [], outflow = [], searched = [] }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markerRef = useRef(null);
  const [showInbound, setShowInbound] = useState(true);
  const [showOutbound, setShowOutbound] = useState(true);
  const [showLegendPopup, setShowLegendPopup] = useState(false);

  const toggleLegendPopup = () => {
    setShowLegendPopup(!showLegendPopup);
  };

  useEffect(() => {
    if (map) return;

    const initialCenter =
      searched.length > 0 ? [searched[0], searched[1]] : [80, -13];
    const newMap = new mapboxgl.Map({
      accessToken: Urls.mapboxAccessToken,
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: initialCenter,
      zoom: 3.2,
      maxZoom: 6,
    });

    newMap.on("load", () => {
      newMap.addSource("india-outline", {
        type: "geojson",
        data: india,
      });

      newMap.addLayer({
        id: "india-outline",
        type: "line",
        source: "india-outline",
        paint: {
          "line-color": "#393185",
          "line-width": 1,
          "line-opacity": 0.4,
        },
      });

      setMap(newMap);
      setMapLoaded(true);
    });

    return () => {
      if (markerRef.current) markerRef.current.remove();
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || !mapLoaded) return;
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    const clearFlows = () => {
      ["inflow", "outflow"].forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
        if (map.getSource(id)) map.removeSource(id);
      });
    };
    clearFlows();
    if (searched && searched.length === 2) {
      const [longitude, latitude] = searched;

      map.flyTo({
        center: [longitude, latitude],
        essential: true,
        zoom: 3.5,
      });

      const newMarker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
      markerRef.current = newMarker;

      if (showInbound && inflow.length > 0) {
        const inboundData = {
          type: "FeatureCollection",
          features: inflow.map((item) => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [item.origin_coordinates, [longitude, latitude]],
            },
          })),
        };
        map.addSource("inflow", { type: "geojson", data: inboundData });
        map.addLayer({
          id: "inflow",
          type: "line",
          source: "inflow",
          paint: {
            "line-color": "#393185",
            "line-width": 1,
            "line-opacity": 0.8,
          },
        });
      }

      if (showOutbound && outflow.length > 0) {
        const outboundData = {
          type: "FeatureCollection",
          features: outflow.map((item) => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [[longitude, latitude], item.destination_coordinates],
            },
          })),
        };
        map.addSource("outflow", { type: "geojson", data: outboundData });
        map.addLayer({
          id: "outflow",
          type: "line",
          source: "outflow",
          paint: {
            "line-color": "#54AF3A",
            "line-width": 1,
            "line-opacity": 0.8,
          },
        });
      }
    }
    map.resize();
  }, [inflow, outflow, searched, map, mapLoaded, showInbound, showOutbound]);

  return (
    <>
      <div ref={mapContainerRef} className="map-container">
        <div className="legend-popup-icon" onClick={toggleLegendPopup}>
          &#9776;
        </div>
        {showLegendPopup && (
          <div className="legend-popup-content">
            <div className="legend-title">Locations</div>
            <hr />
            <div>
              <input
                type="checkbox"
                id="inbound"
                checked={showInbound}
                onChange={(e) => setShowInbound(e.target.checked)}
              />
              <label
                htmlFor="inbound"
                style={{ color: "#393185", cursor: "pointer" }}
              >
                Inbound Movement
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="outbound"
                checked={showOutbound}
                onChange={(e) => setShowOutbound(e.target.checked)}
              />
              <label
                htmlFor="outbound"
                style={{ color: "#54AF3A", cursor: "pointer" }}
              >
                Outbound Movement
              </label>
            </div>
          </div>
        )}

        <div className="legend-box">
          <div className="legend-title">Locations</div>
          <hr></hr>
          <div>
            <input
              type="checkbox"
              id="inbound"
              checked={showInbound}
              onChange={(e) => setShowInbound(e.target.checked)}
            />
            <label
              htmlFor="inbound"
              style={{ color: "#393185", cursor: "pointer" }}
            >
              Inbound Movement
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="outbound"
              checked={showOutbound}
              onChange={(e) => setShowOutbound(e.target.checked)}
            />
            <label
              htmlFor="outbound"
              style={{ color: "#54AF3A", cursor: "pointer" }}
            >
              Outbound Movement
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default Map;