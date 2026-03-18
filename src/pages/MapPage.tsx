import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  searchLocations,
  getScreenZeroData,
  type LocationSuggestion,
  type ScreenZeroResponse,
} from "@/lib/map-api";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const INBOUND_COLOR = "hsl(247 46% 36%)";
const OUTBOUND_COLOR = "hsl(112 53% 45%)";
const PANEL_BG = "hsl(0 0% 100%)";
const PANEL_BG_SOFT = "hsl(0 0% 100%)";
const PANEL_BORDER = "hsl(220 20% 86%)";
const TEXT_PRIMARY = "hsl(222 47% 11%)";
const TEXT_SECONDARY = "hsl(215 16% 47%)";
const INPUT_BG = "hsl(0 0% 100%)";
const INPUT_BORDER = "hsl(220 18% 80%)";

function extractCoords(item: any): [number, number][] | null {
  if (item?.geometry?.type === "LineString" && item.geometry.coordinates) {
    return item.geometry.coordinates.map(
      (c: number[]) => [c[1], c[0]] as [number, number],
    );
  }

  if (Array.isArray(item) && item.length >= 2 && Array.isArray(item[0])) {
    return item.map((c: number[]) => [c[1], c[0]] as [number, number]);
  }

  if (item?.origin_coordinates) {
    return [[item.origin_coordinates[1], item.origin_coordinates[0]]];
  }

  if (item?.destination_coordinates) {
    return [[item.destination_coordinates[1], item.destination_coordinates[0]]];
  }

  if (item?.coordinates) {
    if (Array.isArray(item.coordinates[0])) {
      return item.coordinates.map(
        (c: number[]) => [c[1], c[0]] as [number, number],
      );
    }

    return [[item.coordinates[1], item.coordinates[0]]];
  }

  return null;
}

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialLocation = searchParams.get("location") || "";

  const [query, setQuery] = useState(initialLocation);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);
  const [apiData, setApiData] = useState<ScreenZeroResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobileView, setIsMobileView] = useState(() => window.innerWidth <= 768);
  const [showInbound, setShowInbound] = useState(true);
  const [showOutbound, setShowOutbound] = useState(true);
  const [expandedTransporter, setExpandedTransporter] = useState<boolean>(false);

  const userTypedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const inflowLayersRef = useRef<L.LayerGroup | null>(null);
  const outflowLayersRef = useRef<L.LayerGroup | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const desktopLayerControlRef = useRef<L.Control.Layers | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const worldBounds = L.latLngBounds(
      L.latLng(-85.0511, -180),
      L.latLng(85.0511, 180),
    );

    mapRef.current = L.map(containerRef.current, {
      center: [22, 82],
      zoom: 4.5,
      maxZoom: 20,
      zoomSnap: 1.5,
      zoomControl: false,
      zoomDelta: 0.5,
      maxBounds: worldBounds,
      maxBoundsViscosity: 1.0,
    });

    const fitWorldExactly = () => {
      if (!containerRef.current || !mapRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const minZoomNeeded = Math.max(
        Math.log2(width / 256),
        Math.log2(height / 256),
      );
      mapRef.current.setMinZoom(minZoomNeeded);
      mapRef.current.invalidateSize();
    };

    fitWorldExactly();
    window.addEventListener("resize", fitWorldExactly);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(mapRef.current);

    markersLayerRef.current = new L.LayerGroup().addTo(mapRef.current);
    inflowLayersRef.current = new L.LayerGroup().addTo(mapRef.current);
    outflowLayersRef.current = new L.LayerGroup().addTo(mapRef.current);

    if (window.innerWidth > 768) {
      desktopLayerControlRef.current = L.control.layers(
        {},
        {
          "Inbound Movement": inflowLayersRef.current,
          "Outbound Movement": outflowLayersRef.current,
        },
        {
          collapsed: false,
          position: "bottomright",
        },
      ).addTo(mapRef.current);
    }

    return () => {
      window.removeEventListener("resize", fitWorldExactly);
      desktopLayerControlRef.current = null;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (initialLocation && !selectedLocation) {
      searchLocations(initialLocation).then((results) => {
        if (results.length > 0) {
          setSelectedLocation(results[0]);
          setQuery(results[0].name);
        }
      });
    }
  }, [initialLocation, selectedLocation]);

  useEffect(() => {
    if (!selectedLocation) {
      setApiData(null);
      setExpandedTransporter(false);
      return;
    }

    setLoading(true);
    getScreenZeroData(selectedLocation.lon, selectedLocation.lat)
      .then((data) => {
        setApiData(data);
        setExpandedTransporter(false);
      })
      .catch((error) => console.error("Error fetching screen_zero data:", error))
      .finally(() => setLoading(false));
  }, [selectedLocation]);

  useEffect(() => {
    if (!userTypedRef.current) return;

    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(() => {
      searchLocations(query)
        .then((data) => {
          setSuggestions(data);
          setShowSuggestions(true);
        })
        .catch((error) => console.error("Search error:", error));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersLayerRef.current?.clearLayers();
    inflowLayersRef.current?.clearLayers();
    outflowLayersRef.current?.clearLayers();

    if (!selectedLocation) return;

    const centerLat = selectedLocation.lat;
    const centerLon = selectedLocation.lon;

    mapRef.current.flyTo([centerLat, centerLon], isMobileView ? 4 : 4.5, {
      animate: true,
      duration: 1.5,
    });

    const marker = L.marker([centerLat, centerLon]);
    markersLayerRef.current?.addLayer(marker);

    if (!apiData?.network) return;

    apiData.network.inflow.forEach((item) => {
      const coords = extractCoords(item);
      if (coords && coords.length >= 2) {
        inflowLayersRef.current?.addLayer(
          L.polyline(coords, {
            color: INBOUND_COLOR,
            weight: isMobileView ? 1.2 : 1,
            opacity: 0.5,
          }),
        );
      } else if (coords && coords.length === 1) {
        inflowLayersRef.current?.addLayer(
          L.polyline([coords[0], [centerLat, centerLon]], {
            color: INBOUND_COLOR,
            weight: isMobileView ? 1.2 : 1,
            opacity: 0.5,
          }),
        );
      }
    });

    apiData.network.outflow.forEach((item) => {
      const coords = extractCoords(item);
      if (coords && coords.length >= 2) {
        outflowLayersRef.current?.addLayer(
          L.polyline(coords, {
            color: OUTBOUND_COLOR,
            weight: isMobileView ? 1.2 : 1,
            opacity: 0.5,
          }),
        );
      } else if (coords && coords.length === 1) {
        outflowLayersRef.current?.addLayer(
          L.polyline([[centerLat, centerLon], coords[0]], {
            color: OUTBOUND_COLOR,
            weight: isMobileView ? 1.2 : 1,
            opacity: 0.5,
          }),
        );
      }
    });
  }, [apiData, isMobileView, selectedLocation]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (inflowLayersRef.current) {
      if (showInbound && !map.hasLayer(inflowLayersRef.current)) {
        inflowLayersRef.current.addTo(map);
      }
      if (!showInbound && map.hasLayer(inflowLayersRef.current)) {
        map.removeLayer(inflowLayersRef.current);
      }
    }

    if (outflowLayersRef.current) {
      if (showOutbound && !map.hasLayer(outflowLayersRef.current)) {
        outflowLayersRef.current.addTo(map);
      }
      if (!showOutbound && map.hasLayer(outflowLayersRef.current)) {
        map.removeLayer(outflowLayersRef.current);
      }
    }
  }, [showInbound, showOutbound]);

  useEffect(() => {
    const timeout = setTimeout(() => mapRef.current?.invalidateSize(), 250);
    return () => clearTimeout(timeout);
  }, [apiData, expandedTransporter, isMobileView, showSuggestions]);

  const handleSelect = useCallback((location: LocationSuggestion) => {
    setQuery(location.name);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedLocation(location);
    userTypedRef.current = false;
  }, []);

  const handleSearchSubmit = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
      return;
    }

    searchLocations(trimmed)
      .then((results) => {
        if (results.length > 0) {
          handleSelect(results[0]);
        }
      })
      .catch((error) => console.error("Search error:", error));
  }, [handleSelect, query, suggestions]);

  const handleClear = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedLocation(null);
    setApiData(null);
    setExpandedTransporter(false);
    userTypedRef.current = false;

    if (mapRef.current) {
      markersLayerRef.current?.clearLayers();
      inflowLayersRef.current?.clearLayers();
      outflowLayersRef.current?.clearLayers();
      mapRef.current.flyTo([22, 82], 4.5, { animate: true, duration: 1 });
    }
  }, []);

  const toggleTransporter = useCallback(() => {
    setExpandedTransporter((current) => !current);
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i += 1) {
      stars.push(
        <span
          key={i}
          style={{
            color: i < Math.round(rating) ? "hsl(38 92% 50%)" : "hsl(215 16% 82%)",
            fontSize: 12,
          }}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  const locationLabel = selectedLocation?.name?.split(",")[0] || "";
  const transporters = apiData?.transporter_list ?? [];
  const totalTransporters =
    apiData?.dashboard?.find((item: any) => item.label === "No. of Transporters")
      ?.value ?? apiData?.transporters_count ?? 0;
  const inboundCount =
    apiData?.inflow_dashboard?.find((item: any) => item.label === "No. of Transporters")
      ?.value ?? apiData?.network?.inflow?.length ?? 0;
  const outboundCount =
    apiData?.outflow_dashboard?.find((item: any) => item.label === "No. of Transporters")
      ?.value ?? apiData?.network?.outflow?.length ?? 0;
  const showPanel = Boolean(selectedLocation && transporters.length > 0);

  const searchInput = (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <div style={{ position: "relative" }}>
        <input
          value={query}
          onChange={(event) => {
            userTypedRef.current = true;
            setQuery(event.target.value);
            if (event.target.value.length === 0) {
              handleClear();
            }
          }}
          onFocus={() => {
            if (query.length > 0 && suggestions.length > 0) setShowSuggestions(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSearchSubmit();
          }}
          placeholder="Search a location"
          style={{
            width: "100%",
            padding: isMobileView ? "12px 38px 12px 14px" : "10px 38px 10px 14px",
            fontSize: isMobileView ? "0.95rem" : "0.9rem",
            fontWeight: 500,
            fontFamily: "Outfit, sans-serif",
            color: TEXT_PRIMARY,
            backgroundColor: INPUT_BG,
            border: `1px solid ${INPUT_BORDER}`,
            borderRadius: 12,
            outline: "none",
            boxShadow: "0 8px 24px -16px rgba(15, 23, 42, 0.28)",
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
              color: TEXT_SECONDARY,
              padding: 4,
              lineHeight: 1,
            }}
            title="Clear"
          >
            ✕
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            margin: 0,
            padding: "8px 0",
            listStyle: "none",
            backgroundColor: PANEL_BG_SOFT,
            border: `1px solid ${PANEL_BORDER}`,
            borderRadius: 12,
            maxHeight: isMobileView ? 220 : 280,
            overflowY: "auto",
            zIndex: 200,
            boxShadow: "0 20px 30px -18px rgba(15, 23, 42, 0.25)",
          }}
        >
          {suggestions.map((location, index) => (
            <li
              key={`${location.name}-${index}`}
              onClick={() => handleSelect(location)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                color: TEXT_PRIMARY,
                fontWeight: 500,
                fontFamily: "Outfit, sans-serif",
                fontSize: "0.9rem",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.backgroundColor = "rgba(241, 245, 249, 0.9)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const getTransporterInitial = (name?: string) =>
    (name?.trim().charAt(0) || "?").toUpperCase();

  const renderTransporterRows = (compact = false) => {
    if (compact) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxHeight: "26vh",
            overflowY: "auto",
            paddingRight: 4,
          }}
        >
          {transporters.map((transporter: any, index: number) => {
            const transporterId = transporter.transporter_id ?? index;
            const ratingCount = transporter.number_of_ratings ?? 0;

            return (
              <div
                key={transporterId}
                style={{
                  border: `1px solid ${PANEL_BORDER}`,
                  borderRadius: 12,
                  backgroundColor: "hsla(0 0% 100% / 0.98)",
                  padding: "10px 12px",
                }}
              >
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  style={{
                    color: "hsl(221 83% 53%)",
                    textDecoration: "none",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    textTransform: "uppercase",
                    display: "inline-block",
                  }}
                >
                  {transporter.transporter_name}
                </a>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {renderStars(transporter.overall_rating ?? 0)}
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: TEXT_SECONDARY,
                      marginLeft: 2,
                    }}
                  >
                    ({ratingCount})
                  </span>
                  {transporter.account_type === "verified" && (
                    <span
                      style={{
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        color: "hsl(142 71% 35%)",
                        marginLeft: 8,
                      }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {transporters.map((transporter: any, index: number) => {
          const transporterId = transporter.transporter_id ?? index;
          const ratingCount = transporter.number_of_ratings ?? 0;

          return (
            <div
              key={transporterId}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 0",
                borderBottom: `1px solid ${PANEL_BORDER}`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: "hsl(220 25% 94%)",
                  color: INBOUND_COLOR,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                {getTransporterInitial(transporter.transporter_name)}
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  style={{
                    color: "hsl(226 70% 46%)",
                    textDecoration: "none",
                    fontSize: "0.94rem",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    textTransform: "uppercase",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={transporter.transporter_name}
                >
                  {transporter.transporter_name}
                </a>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {renderStars(transporter.overall_rating ?? 0)}
                  </div>
                  <span
                    style={{
                      fontSize: "0.82rem",
                      color: TEXT_SECONDARY,
                      lineHeight: 1,
                    }}
                  >
                    ({ratingCount})
                  </span>
                  {transporter.account_type === "verified" && (
                    <span
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "hsl(142 71% 35%)",
                        lineHeight: 1,
                        marginLeft: 8,
                      }}
                    >
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const transporterAccordion = (
    <div
      style={{
        border: `1px solid ${PANEL_BORDER}`,
        borderRadius: 16,
        backgroundColor: PANEL_BG,
        boxShadow: "0 18px 36px -24px hsla(222 47% 11% / 0.35)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={toggleTransporter}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "14px 16px",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontSize: "0.84rem",
              fontWeight: 700,
              color: TEXT_PRIMARY,
            }}
          >
            Showing {transporters.length} of {totalTransporters} transporters
          </span>
          <span
            style={{
              fontSize: "0.74rem",
              fontWeight: 500,
              color: TEXT_SECONDARY,
            }}
          >
            Tap to {expandedTransporter ? "hide" : "view"} transporter list
          </span>
        </div>
        <span
          style={{
            color: TEXT_SECONDARY,
            fontSize: 18,
            transform: expandedTransporter ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          ▾
        </span>
      </button>

      {expandedTransporter && (
        <div
          style={{
            padding: "0 12px 12px",
            borderTop: `1px solid ${PANEL_BORDER}`,
            backgroundColor: "hsla(210 40% 98% / 0.92)",
          }}
        >
          <div style={{ paddingTop: 12 }}>{renderTransporterRows(true)}</div>
        </div>
      )}
    </div>
  );

  const transporterDesktopList = renderTransporterRows(false);

  if (isMobileView) {
    return (
      <div
        style={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "hsl(210 40% 96%)",
        }}
      >
        <div
          style={{
            padding: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: PANEL_BG_SOFT,
            borderBottom: `1px solid ${PANEL_BORDER}`,
            position: "relative",
            zIndex: 120,
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              flexShrink: 0,
              background: "transparent",
              border: `1px solid ${PANEL_BORDER}`,
              borderRadius: 10,
              padding: "11px 12px",
              color: TEXT_PRIMARY,
              fontFamily: "Outfit, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            ← Back
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>{searchInput}</div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: 12,
          }}
        >
          {showPanel && !loading && transporterAccordion}

          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: selectedLocation ? 320 : 340,
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid ${PANEL_BORDER}`,
              boxShadow: "0 18px 36px -24px hsla(222 47% 11% / 0.2)",
              backgroundColor: "hsl(210 35% 92%)",
            }}
          >
            <div
              ref={containerRef}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            />

            {selectedLocation && apiData && !loading && (
              <div
                style={{
                  position: "absolute",
                  left: 10,
                  right: 10,
                  bottom: 10,
                  zIndex: 1200,
                  pointerEvents: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    padding: "12px 14px",
                    backgroundColor: "hsla(0 0% 100% / 0.96)",
                    border: `1px solid ${PANEL_BORDER}`,
                    borderRadius: 16,
                    boxShadow: "0 18px 36px -24px hsla(222 47% 11% / 0.35)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.76rem", fontWeight: 700, color: TEXT_PRIMARY }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: INBOUND_COLOR, display: "inline-block" }} />
                        Inbound
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.76rem", fontWeight: 700, color: TEXT_PRIMARY }}>
                        <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: OUTBOUND_COLOR, display: "inline-block" }} />
                        Outbound
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.76rem", fontWeight: 600, color: TEXT_PRIMARY }}>
                        <input type="checkbox" checked={showInbound} onChange={() => setShowInbound((current) => !current)} />
                        Inbound
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.76rem", fontWeight: 600, color: TEXT_PRIMARY }}>
                        <input type="checkbox" checked={showOutbound} onChange={() => setShowOutbound((current) => !current)} />
                        Outbound
                      </label>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) auto auto auto",
                      gap: 8,
                      alignItems: "end",
                    }}
                  >
                    <div style={{ fontSize: "0.74rem", fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.2 }}>
                      {locationLabel}
                    </div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: TEXT_SECONDARY }}>Total</div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: INBOUND_COLOR }}>Inbound</div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, color: OUTBOUND_COLOR }}>Outbound</div>
                    <div style={{ fontSize: "0.76rem", fontWeight: 600, color: TEXT_SECONDARY }}>
                      Transporters
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 800, color: TEXT_PRIMARY }}>{totalTransporters}</div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 800, color: INBOUND_COLOR }}>{inboundCount}</div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 800, color: OUTBOUND_COLOR }}>{outboundCount}</div>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "hsla(0 0% 100% / 0.45)",
                  backdropFilter: "blur(2px)",
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 14,
                    background: PANEL_BG_SOFT,
                    padding: "24px 28px",
                    borderRadius: 16,
                    boxShadow: "0 14px 28px -16px hsla(222 47% 11% / 0.25)",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      border: "3px solid hsl(215 28% 88%)",
                      borderTopColor: INBOUND_COLOR,
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Loading routes for <strong>{locationLabel}</strong>...
                  </span>
                </div>
              </div>
            )}
          </div>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        overflow: "visible",
        backgroundColor: "hsl(210 40% 96%)",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          transition: "all 0.3s ease",
        }}
      >
        <main
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        </main>

        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "hsla(0 0% 100% / 0.45)",
              backdropFilter: "blur(2px)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                background: PANEL_BG_SOFT,
                padding: "28px 40px",
                borderRadius: 16,
                boxShadow: "0 14px 28px -16px hsla(222 47% 11% / 0.25)",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "3px solid hsl(215 28% 88%)",
                  borderTopColor: INBOUND_COLOR,
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: TEXT_PRIMARY,
                }}
              >
                Loading routes for <strong>{locationLabel}</strong>...
              </span>
            </div>
          </div>
        )}

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 40px)",
            maxWidth: 1200,
            zIndex: 100,
            background: PANEL_BG,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "10px 20px",
            borderRadius: 12,
            boxShadow: "0 10px 30px -10px hsla(0 0% 0% / 0.15)",
            border: `1px solid hsla(0 0% 100% / 0.5)`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: TEXT_PRIMARY,
                  letterSpacing: "-0.01em",
                  marginBottom: 2,
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                LoRRI Global Grid
              </h1>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: TEXT_SECONDARY,
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Search your plant location here:
              </p>
            </div>

            <div style={{ flexGrow: 1, maxWidth: 480 }}>{searchInput}</div>

            <button
              onClick={() => navigate("/")}
              style={{
                background: "transparent",
                border: `1px solid ${INPUT_BORDER}`,
                borderRadius: 10,
                padding: "10px 16px",
                color: TEXT_PRIMARY,
                fontFamily: "Outfit, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              ← Back to Home
            </button>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "35%",
            transform: "translateX(-50%)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            padding: "8px 16px",
            background: "hsla(0 0% 100% / 0.92)",
            backdropFilter: "blur(16px)",
            borderRadius: 999,
            boxShadow: "0 10px 25px -5px hsla(0 0% 0% / 0.1)",
            border: `1px solid hsla(0 0% 100% / 0.5)`,
            width: "50%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: TEXT_PRIMARY, fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block", backgroundColor: INBOUND_COLOR }} />
            Inbound
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.72rem", color: TEXT_PRIMARY, fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block", backgroundColor: OUTBOUND_COLOR }} />
            Outbound
          </div>

          {selectedLocation && apiData && !loading && (
            <>
              <div style={{ width: 1, height: 14, background: "hsl(215 20% 78%)" }} />
              <span style={{ fontSize: "0.72rem", color: TEXT_PRIMARY, fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>
                {locationLabel} — Total: <strong>{totalTransporters}</strong>
              </span>
              <span style={{ fontSize: "0.72rem", color: INBOUND_COLOR, fontWeight: 700 }}>
                Inbound: {inboundCount}
              </span>
              <span style={{ fontSize: "0.72rem", color: OUTBOUND_COLOR, fontWeight: 700 }}>
                Outbound: {outboundCount}
              </span>
            </>
          )}
        </div>
      </div>

      {showPanel && (
        <div
          style={{
            width: 540,
            minWidth: 540,
            background: "hsla(0 0% 100% / 0.98)",
            borderLeft: `1px solid ${PANEL_BORDER}`,
            fontFamily: "Outfit, sans-serif",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "18px 20px 10px",
              background: "hsla(0 0% 100% / 0.98)",
              flexShrink: 0,
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: 800, color: TEXT_PRIMARY, margin: 0 }}>
              Transporters in {locationLabel}
            </h2>
            <p style={{ fontSize: "0.84rem", color: TEXT_SECONDARY, margin: "6px 0 0" }}>
              Showing {transporters.length} of <strong style={{ color: TEXT_PRIMARY }}>{totalTransporters}</strong> transporters
            </p>
          </div>
          <div style={{ padding: "0 20px 24px" }}>{transporterDesktopList}</div>
        </div>
      )}
    </div>
  );
}
