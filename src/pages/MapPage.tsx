import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.motion/dist/leaflet.motion";
import { searchLocations, getRoutes, type LocationSuggestion, type RouteData } from "@/lib/map-api";

// Fix default marker icons for Vite bundling
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

export default function MapPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialLocation = searchParams.get("location") || "";

  const [query, setQuery] = useState(initialLocation);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(initialLocation || null);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
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
      center: [24.5, 82.5],
      zoom: 5,
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

  // Fetch routes when location selected
  useEffect(() => {
    if (!selectedLocation) {
      setRouteData(null);
      return;
    }
    setLoading(true);
    getRoutes(selectedLocation)
      .then(data => setRouteData(data))
      .catch(e => console.error("Error fetching route data:", e))
      .finally(() => setLoading(false));
  }, [selectedLocation]);

  // Draw routes on map
  useEffect(() => {
    if (!mapRef.current) return;

    markersLayerRef.current?.clearLayers();
    inflowLayersRef.current?.clearLayers();
    outflowLayersRef.current?.clearLayers();

    if (!routeData?.center || routeData.center.length < 2) return;

    const [lng, lat] = routeData.center;
    mapRef.current.flyTo([lat, lng], 5, { animate: true, duration: 1.5 });

    const marker = L.marker([lat, lng]);
    markersLayerRef.current?.addLayer(marker);

    routeData.inflow.forEach((item) => {
      if (!item.origin_coordinates) return;
      const line = L.polyline(
        [[item.origin_coordinates[1], item.origin_coordinates[0]], [lat, lng]],
        { color: INBOUND_COLOR, weight: 2, opacity: 0.8 }
      );
      inflowLayersRef.current?.addLayer(line);
    });

    routeData.outflow.forEach((item) => {
      if (!item.destination_coordinates) return;
      const line = L.polyline(
        [[lat, lng], [item.destination_coordinates[1], item.destination_coordinates[0]]],
        { color: OUTBOUND_COLOR, weight: 2, opacity: 0.8 }
      );
      outflowLayersRef.current?.addLayer(line);
    });
  }, [routeData]);

  // Autocomplete search with debounce
  useEffect(() => {
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
    setSelectedLocation(loc.name);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (query.trim()) {
      setSelectedLocation(query.trim());
      setShowSuggestions(false);
    }
  }, [query]);

  return (
    <div style={{ height: "100vh", position: "relative", overflow: "hidden", backgroundColor: "#e2e8f0" }}>
      {/* Full-screen map */}
      <main style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 1 }}>
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
              Loading routes for <strong>{selectedLocation}</strong>...
            </span>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Floating Header */}
      <div style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        width: "calc(100% - 40px)", maxWidth: 1200, zIndex: 100,
        background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)", padding: "18px 28px", borderRadius: 16,
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em", marginBottom: 2, fontFamily: "Outfit, sans-serif" }}>
              LoRRI Network Grid
            </h1>
            <p style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 500, margin: 0 }}>
              Logistics Network Visualisation
            </p>
          </div>

          {/* Search */}
          <div ref={wrapperRef} style={{ flexGrow: 1, maxWidth: 450, position: "relative" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  if (e.target.value.length === 0) {
                    setSuggestions([]);
                    setShowSuggestions(false);
                    setSelectedLocation(null);
                  }
                }}
                onFocus={() => { if (query.length > 0) setShowSuggestions(true); }}
                onKeyDown={e => { if (e.key === "Enter") handleSearchSubmit(); }}
                placeholder="Search a city (e.g. Mumbai, Delhi)..."
                style={{
                  width: "100%", padding: "14px 20px", fontSize: "1rem", fontWeight: 500,
                  fontFamily: "Outfit, sans-serif", color: "#0f172a", backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1", borderRadius: 12, outline: "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
                }}
              />
              <button
                onClick={handleSearchSubmit}
                style={{
                  background: "linear-gradient(135deg, #393185, #4D44A8)", border: "none",
                  borderRadius: 12, padding: "14px 24px", color: "white", fontFamily: "Outfit, sans-serif",
                  fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em", flexShrink: 0,
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
              background: "transparent", border: "1px solid #cbd5e1", borderRadius: 10,
              padding: "10px 20px", color: "#334155", fontFamily: "Outfit, sans-serif",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Floating Bottom Legend */}
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 100,
        display: "flex", justifyContent: "center", alignItems: "center", gap: 24,
        padding: "12px 24px", background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)", borderRadius: 50,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "#334155", fontWeight: 600 }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", display: "inline-block", backgroundColor: INBOUND_COLOR, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
          Inbound Deliveries
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "#334155", fontWeight: 600 }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", display: "inline-block", backgroundColor: OUTBOUND_COLOR, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} />
          Outbound Deliveries
        </div>

        {selectedLocation && (
          <div style={{ borderLeft: "2px solid #e2e8f0", paddingLeft: 20, marginLeft: 4, color: "#0f172a", fontFamily: "Outfit, sans-serif" }}>
            {loading ? (
              <span style={{ fontSize: "0.85rem" }}>Loading...</span>
            ) : (
              <span style={{ fontSize: "0.85rem" }}>
                <strong>{selectedLocation}</strong> — In: {routeData?.metrics?.inbound_count ?? 0} | Out: {routeData?.metrics?.outbound_count ?? 0}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
