import React, { useState, useEffect, useMemo, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { isMobile } from "../../Constants";
import "./Map.css";
import india from "./india.json";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = ({ inflow = [], outflow = [], searched = [] }) => {
  const [map, setMap] = useState(null);
  const [markersLayer, setMarkersLayer] = useState(null);
  const [inflowLayer, setInflowLayer] = useState(null);
  const [outflowLayer, setOutflowLayer] = useState(null);

  const initializeMap = useCallback(() => {
    const newMap = L.map("map", {
      center: [24.5, 82.5],
      zoom: 5,
      maxZoom: 20,
      zoomSnap: 1.5,
      zoomControl: false,
      zoomDelta: 0.5,
      maxNativeZoom: 19,
      attributionControl: false,
    });

    const tileLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(newMap);

    const latLngs = L.GeoJSON.coordsToLatLngs(
      india.features[0].geometry.coordinates,
      2
    );
    L.polyline(latLngs, {
      color: "#393185",
      weight: 2,
      opacity: 0.4,
    }).addTo(newMap);

    const newMarkersLayer = new L.LayerGroup();
    const newInflowLayer = new L.LayerGroup();
    const newOutflowLayer = new L.LayerGroup();

    const layerControl = L.control
      .layers(
        { Locations: newMarkersLayer },
        {
          "Inbound Movement": newInflowLayer,
          "Outbound Movement": newOutflowLayer,
        },
        {
          collapsed: isMobile(),
          position: isMobile() ? "topright" : "bottomright",
        }
      )
      .addTo(newMap);

    // Keep both checkboxes checked by default
    layerControl
      .getContainer()
      .querySelectorAll("input")
      .map((input) => {
        input.checked = true;
      });

    newMarkersLayer.addTo(newMap);
    newInflowLayer.addTo(newMap);
    newOutflowLayer.addTo(newMap);

    setMap(newMap);
    setMarkersLayer(newMarkersLayer);
    setInflowLayer(newInflowLayer);
    setOutflowLayer(newOutflowLayer);
  }, []);

  const plotMarkers = useCallback(() => {
    if (markersLayer && searched.length > 0) {
      markersLayer.clearLayers();
      const marker = L.marker([searched[1], searched[0]]);
      markersLayer.addLayer(marker);
    }
  }, [markersLayer, searched]);

  const plotInflow = useCallback(() => {
    if (inflowLayer && inflow.length > 0 && searched.length > 0) {
      inflowLayer.clearLayers();
      inflow.map((item) => {
        const line = L.polyline(
          [
            [item.origin_coordinates[1], item.origin_coordinates[0]],
            [searched[1], searched[0]],
          ],
          { color: "#393185", weight: 1.25, opacity: 0.3 }
        );
        inflowLayer.addLayer(line);
      });
    }
  }, [inflowLayer, inflow, searched]);

  const plotOutflow = useCallback(() => {
    if (outflowLayer && outflow.length > 0 && searched.length > 0) {
      outflowLayer.clearLayers();
      outflow.map((item) => {
        const line = L.polyline(
          [
            [searched[1], searched[0]],
            [item.destination_coordinates[1], item.destination_coordinates[0]],
          ],
          { color: "#54AF3A", weight: 1.25, opacity: 0.3 }
        );
        outflowLayer.addLayer(line);
      });
    }
  }, [outflowLayer, outflow, searched]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  const memoizedPlotMarkers = useMemo(() => plotMarkers, [plotMarkers]);
  const memoizedPlotInflow = useMemo(() => plotInflow, [plotInflow]);
  const memoizedPlotOutflow = useMemo(() => plotOutflow, [plotOutflow]);

  useEffect(() => {
    memoizedPlotMarkers();
    memoizedPlotInflow();
    memoizedPlotOutflow();
  }, [memoizedPlotMarkers, memoizedPlotInflow, memoizedPlotOutflow]);

  return (
    <div
      id="map"
      className="map-container"
    />
  );
};

export default Map;
