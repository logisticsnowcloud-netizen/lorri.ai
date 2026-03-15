import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { searchLocations, getScreenZeroData, type LocationSuggestion, type ScreenZeroResponse } from "@/lib/map-api";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const INBOUND_COLOR = "#393185";
const OUTBOUND_COLOR = "#54AF3A";

function extractCoords(item: any): [number, number][] | null {
  // Handle GeoJSON LineString geometry
  if (item?.geometry?.type === "LineString" && item.geometry.coordinates) {
    return item.geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);
  }
  // Handle array of coordinate pairs [[lon,lat],[lon,lat]]
  if (Array.isArray(item) && item.length >= 2 && Array.isArray(item[0])) {
    return item.map((c: number[]) => [c[1], c[0]] as [number, number]);
  }
  // Handle object with origin/destination coordinates
  if (item?.origin_coordinates) {
    return [[item.origin_coordinates[1], item.origin_coordinates[0]]];
  }
  if (item?.destination_coordinates) {
    return [[item.destination_coordinates[1], item.destination_coordinates[0]]];
  }
  // Handle object with lat/lon or coordinates
  if (item?.coordinates) {
    if (Array.isArray(item.coordinates[0])) {
      return item.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);
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
  const userTypedRef = useRef(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);
  const [apiData, setApiData] = useState<ScreenZeroResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const inflowLayersRef = useRef<L.LayerGroup | null>(null);
  const outflowLayersRef = useRef<L.LayerGroup | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const worldBounds = L.latLngBounds(L.latLng(-85.0511, -180), L.latLng(85.0511, 180));

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
      const minZoomNeeded = Math.max(Math.log2(width / 256), Math.log2(height / 256));
      mapRef.current.setMinZoom(minZoomNeeded);
    };

    fitWorldExactly();
    window.addEventListener("resize", fitWorldExactly);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(mapRef.current);

    markersLayerRef.current = new L.LayerGroup().addTo(mapRef.current);
    inflowLayersRef.current = new L.LayerGroup().addTo(mapRef.current);
    outflowLayersRef.current = new L.LayerGroup().addTo(mapRef.current);

    const overlayMaps = {
      "Inbound Movement": inflowLayersRef.current,
      "Outbound Movement": outflowLayersRef.current,
    };

    L.control.layers({}, overlayMaps, {
      collapsed: window.innerWidth <= 600,
      position: window.innerWidth <= 600 ? "topright" : "bottomright",
    }).addTo(mapRef.current);

    return () => {
      window.removeEventListener("resize", fitWorldExactly);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Auto-search initial location from URL
  useEffect(() => {
    if (initialLocation && !selectedLocation) {
      searchLocations(initialLocation).then(results => {
        if (results.length > 0) {
          setSelectedLocation(results[0]);
          setQuery(results[0].name);
        }
      });
    }
  }, []);

  // Fetch screen_zero data when location selected
  useEffect(() => {
    if (!selectedLocation) {
      setApiData(null);
      return;
    }
    setLoading(true);
    getScreenZeroData(selectedLocation.lon, selectedLocation.lat)
      .then(data => {
        console.log("Screen zero response keys:", Object.keys(data));
        console.log("inflow_dashboard:", JSON.stringify(data.inflow_dashboard));
        console.log("outflow_dashboard:", JSON.stringify(data.outflow_dashboard));
        if (data.network?.inflow?.length > 0) {
          console.log("Sample inflow item:", JSON.stringify(data.network.inflow[0]).substring(0, 500));
        }
        if (data.network?.outflow?.length > 0) {
          console.log("Sample outflow item:", JSON.stringify(data.network.outflow[0]).substring(0, 500));
        }
        setApiData(data);
      })
      .catch(e => console.error("Error fetching screen_zero data:", e))
      .finally(() => setLoading(false));
  }, [selectedLocation]);

  // Draw routes on map
  useEffect(() => {
    if (!mapRef.current) return;

    markersLayerRef.current?.clearLayers();
    inflowLayersRef.current?.clearLayers();
    outflowLayersRef.current?.clearLayers();

    if (!selectedLocation) return;

    const centerLat = selectedLocation.lat;
    const centerLon = selectedLocation.lon;
    mapRef.current.flyTo([centerLat, centerLon], 4.5, { animate: true, duration: 1.5 });

    const marker = L.marker([centerLat, centerLon]);
    markersLayerRef.current?.addLayer(marker);

    if (!apiData?.network) return;

    // Draw inflow lines
    apiData.network.inflow.forEach((item) => {
      const coords = extractCoords(item);
      if (coords && coords.length >= 2) {
        // Multi-point line (GeoJSON LineString)
        const line = L.polyline(coords, { color: INBOUND_COLOR, weight: 2, opacity: 0.8 });
        inflowLayersRef.current?.addLayer(line);
      } else if (coords && coords.length === 1) {
        // Single point — draw line from that point to center
        const line = L.polyline([coords[0], [centerLat, centerLon]], { color: INBOUND_COLOR, weight: 2, opacity: 0.8 });
        inflowLayersRef.current?.addLayer(line);
      }
    });

    // Draw outflow lines
    apiData.network.outflow.forEach((item) => {
      const coords = extractCoords(item);
      if (coords && coords.length >= 2) {
        const line = L.polyline(coords, { color: OUTBOUND_COLOR, weight: 2, opacity: 0.8 });
        outflowLayersRef.current?.addLayer(line);
      } else if (coords && coords.length === 1) {
        const line = L.polyline([[centerLat, centerLon], coords[0]], { color: OUTBOUND_COLOR, weight: 2, opacity: 0.8 });
        outflowLayersRef.current?.addLayer(line);
      }
    });
  }, [apiData, selectedLocation]);

  // Autocomplete search with debounce
  useEffect(() => {
    if (!userTypedRef.current) return;
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(() => {
      searchLocations(query)
        .then(data => {
          setSuggestions(data);
          setShowSuggestions(true);
        })
        .catch(e => console.error("Search error:", e));
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback((loc: LocationSuggestion) => {
    setQuery(loc.name);
    setShowSuggestions(false);
    setSelectedLocation(loc);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (query.trim()) {
      searchLocations(query.trim()).then(results => {
        if (results.length > 0) {
          setSelectedLocation(results[0]);
          setQuery(results[0].name);
        }
      });
      setShowSuggestions(false);
    }
  }, [query]);

  const handleClear = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedLocation(null);
    setApiData(null);
    if (mapRef.current) {
      markersLayerRef.current?.clearLayers();
      inflowLayersRef.current?.clearLayers();
      outflowLayersRef.current?.clearLayers();
      mapRef.current.flyTo([22, 82], 4.5, { animate: true, duration: 1 });
    }
  }, []);

  const locationLabel = selectedLocation?.name?.split(",")[0] || "";
  const transporters = apiData?.transporter_list ?? [];
  const showPanel = selectedLocation && transporters.length > 0;

  // Invalidate map size when panel toggles
  useEffect(() => {
    setTimeout(() => mapRef.current?.invalidateSize(), 350);
  }, [showPanel]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: 12 }}>★</span>
      );
    }
    return stars;
  };

  return (
    <div style={{ height: "100vh", display: "flex", overflow: "hidden", backgroundColor: "#e2e8f0" }}>
      {/* Map area */}
      <div style={{ flex: 1, position: "relative", transition: "all 0.3s ease" }}>
        <main style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
          <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        </main>

      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(255,255,255,0.4)", backdropFilter: "blur(2px)",
          pointerEvents: "none",
        }}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
            background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
            padding: "28px 40px", borderRadius: 16,
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)",
            border: "1px solid rgba(255,255,255,0.5)",
            pointerEvents: "auto",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "3px solid #e2e8f0", borderTopColor: "#393185",
              animation: "spin 0.8s linear infinite",
            }} />
            <span style={{ fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 600, color: "#334155" }}>
              Loading routes for <strong>{locationLabel}</strong>...
            </span>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Floating Header */}
      <div style={{
        position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
        width: "calc(100% - 40px)", maxWidth: 1200, zIndex: 100,
        background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)", padding: "6px 20px", borderRadius: 10,
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em", marginBottom: 2, fontFamily: "Outfit, sans-serif" }}>
              LoRRI Global Grid
            </h1>
            <p style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 500, margin: 0 }}>
              Search another plant location here:
            </p>
          </div>

          {/* Search */}
          <div ref={wrapperRef} style={{ flexGrow: 1, maxWidth: 450, position: "relative" }}>
            <div style={{ display: "flex", gap: 8, position: "relative" }}>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  value={query}
                   onChange={e => {
                     userTypedRef.current = true;
                     setQuery(e.target.value);
                    if (e.target.value.length === 0) {
                      handleClear();
                    }
                  }}
                  onFocus={() => { if (query.length > 0 && suggestions.length > 0) setShowSuggestions(true); }}
                  onKeyDown={e => { if (e.key === "Enter") handleSearchSubmit(); }}
                  placeholder="Search a city (e.g. Mumbai, Delhi)..."
                  style={{
                    width: "100%", padding: "7px 36px 7px 14px", fontSize: "0.85rem", fontWeight: 500,
                    fontFamily: "Outfit, sans-serif", color: "#0f172a", backgroundColor: "#ffffff",
                    border: "1px solid #cbd5e1", borderRadius: 10, outline: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                  }}
                />
                {query && (
                  <button
                    onClick={handleClear}
                    style={{
                      position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer", fontSize: 18,
                      color: "#94a3b8", padding: 4, lineHeight: 1,
                    }}
                    title="Clear"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                onClick={handleSearchSubmit}
                style={{
                  background: "linear-gradient(135deg, #393185, #4D44A8)", border: "none",
                  borderRadius: 8, padding: "7px 18px", color: "white", fontFamily: "Outfit, sans-serif",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em", flexShrink: 0,
                  boxShadow: "0 4px 16px rgba(57,49,133,0.35)",
                }}
              >
                Search
              </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <ul style={{
                position: "absolute", top: "100%", left: 0, right: 0, marginTop: 8,
                backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(16px)",
                border: "1px solid #e2e8f0", borderRadius: 12, listStyle: "none",
                padding: "8px 0", maxHeight: 280, overflowY: "auto", zIndex: 1000,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              }}>
                {suggestions.map((loc, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(loc)}
                    style={{
                      padding: "12px 20px", cursor: "pointer", color: "#334155",
                      fontWeight: 500, transition: "all 0.15s ease", fontFamily: "Outfit, sans-serif",
                      fontSize: "0.9rem",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {loc.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            style={{
              background: "transparent", border: "1px solid #cbd5e1", borderRadius: 8,
              padding: "7px 16px", color: "#334155", fontFamily: "Outfit, sans-serif",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Floating Bottom Legend */}
      <div style={{
        position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", zIndex: 100,
        display: "flex", justifyContent: "center", alignItems: "center", gap: 12,
        padding: "5px 16px", background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)", borderRadius: 50,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.7rem", color: "#334155", fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block", backgroundColor: INBOUND_COLOR }} />
          Inbound
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.7rem", color: "#334155", fontWeight: 600 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block", backgroundColor: OUTBOUND_COLOR }} />
          Outbound
        </div>

        {selectedLocation && apiData && (
          <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: 14, marginLeft: 2, color: "#0f172a", fontFamily: "Outfit, sans-serif" }}>
            {loading ? (
              <span style={{ fontSize: "0.7rem" }}>Loading...</span>
            ) : (
              <>
                <span style={{ fontSize: "0.7rem" }}>
                  <strong>{locationLabel}</strong> — Total: {apiData.dashboard?.find((d: any) => d.label === "No. of Transporters")?.value ?? apiData.transporters_count ?? 0}
                </span>
                <span style={{ fontSize: "0.7rem", color: INBOUND_COLOR, fontWeight: 700 }}>
                  Inbound: {apiData.inflow_dashboard?.find((d: any) => d.label === "No. of Transporters")?.value ?? apiData.network?.inflow?.length ?? 0}
                </span>
                <span style={{ fontSize: "0.7rem", color: OUTBOUND_COLOR, fontWeight: 700 }}>
                  Outbound: {apiData.outflow_dashboard?.find((d: any) => d.label === "No. of Transporters")?.value ?? apiData.network?.outflow?.length ?? 0}
                </span>
              </>
            )}
          </div>
        )}
      </div>
      </div>

      {/* Transporter Panel */}
      {showPanel && (
        <div style={{
          width: 380, minWidth: 380, height: "100vh", overflowY: "auto",
          background: "#fff", borderLeft: "1px solid #e2e8f0",
          fontFamily: "Outfit, sans-serif", zIndex: 10,
        }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, background: "#fff", zIndex: 2 }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>
              Transporters in {locationLabel}
            </h2>
            <p style={{ fontSize: "0.7rem", color: "#64748b", margin: "2px 0 0" }}>
              Showing {transporters.length} of <strong>{apiData?.dashboard?.find((d: any) => d.label === "No. of Transporters")?.value ?? apiData?.transporters_count ?? 0}</strong> transporters
            </p>
          </div>
          <div>
            {transporters.map((t: any, i: number) => (
              <div key={t.transporter_id || i} style={{
                padding: "6px 14px", borderBottom: "1px solid #f1f5f9",
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 6, background: "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#393185", flexShrink: 0,
                }}>
                  {t.transporter_name?.charAt(0) || "T"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "0.72rem", fontWeight: 600, color: "#1e40af",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {t.transporter_name?.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 1 }}>
                    {renderStars(t.overall_rating ?? 0)}
                    {t.number_of_ratings > 0 && (
                      <span style={{ fontSize: "0.6rem", color: "#94a3b8", marginLeft: 2 }}>({t.number_of_ratings})</span>
                    )}
                    {t.account_type === "verified" && (
                      <span style={{ fontSize: "0.6rem", color: "#16a34a", fontWeight: 600, marginLeft: 6 }}>✓ Verified</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
