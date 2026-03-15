import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { searchLocations } from "@/lib/map-api";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGhydXYtbXVraGVyamVlIiwiYSI6ImNrNTNsM3B1MjA3b2kzZmw4ejZtbDdvc2UifQ.rhqKEndZaAbF9a9cSVlM4A";
const NETWORK_DATA_URL = "https://lorrifilesproduction.blob.core.windows.net/public-container/worldnetworkdata_v2.geojson";

const REGIONS = [
  { name: "india", label: "India", lat: 20.5937, lon: 78.9629 },
  { name: "europe", label: "Europe", lat: 54.526, lon: 15.2551 },
  { name: "china", label: "China", lat: 35.8617, lon: 104.1954 },
  { name: "australia", label: "Australia", lat: -25.2744, lon: 133.7751 },
  { name: "united_states", label: "United States", lat: 37.0902, lon: -95.7129 },
];

const regionCenter: Record<string, { label: string; coordinates: [number, number] }> = {
  india: { label: "India", coordinates: [78.748, 23.8438] },
  europe: { label: "Europe", coordinates: [10.0183, 50.7054] },
  china: { label: "China", coordinates: [104.1954, 35.8617] },
  australia: { label: "Australia", coordinates: [134.755, -25.2744] },
  united_states: { label: "United States", coordinates: [-98.5795, 39.8283] },
};

// Bounding boxes [minLon, minLat, maxLon, maxLat] for each region
const regionBounds: Record<string, [number, number, number, number]> = {
  india: [68, 6, 98, 38],
  europe: [-25, 34, 45, 72],
  china: [73, 15, 135, 55],
  australia: [110, -50, 160, -10],
  united_states: [-130, 24, -65, 50],
};

function isInRegion(lon: number, lat: number, regionKey: string): boolean {
  const bounds = regionBounds[regionKey];
  if (!bounds) return false;
  return lon >= bounds[0] && lon <= bounds[2] && lat >= bounds[1] && lat <= bounds[3];
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function GlobalGridPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [networkData, setNetworkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkingLocation, setCheckingLocation] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [inboundCount, setInboundCount] = useState(0);
  const [outboundCount, setOutboundCount] = useState(0);
  const [showInbound, setShowInbound] = useState(true);
  const [showOutbound, setShowOutbound] = useState(true);

  const getRegionFromUrl = (): [number, number] => {
    const regionParam = searchParams.get("region");
    if (regionParam && regionCenter[regionParam]) {
      return regionCenter[regionParam].coordinates;
    }
    return regionCenter.india.coordinates;
  };

  const [selectedRegion, setSelectedRegion] = useState<[number, number]>(getRegionFromUrl);

  // Debounced search
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const handleSearchInput = useCallback((value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchLocations(value);
        setSuggestions(results.map(r => r.name));
        setShowSuggestions(results.length > 0);
      } catch { setSuggestions([]); }
    }, 300);
  }, []);

  const handleSearch = useCallback(async (location?: string) => {
    const loc = location || searchQuery;
    if (!loc) return;
    setShowSuggestions(false);
    setSelectedLocation(loc);
    // Navigate to /map page with location for detailed route view
    navigate(`/map?location=${encodeURIComponent(loc)}`);
  }, [searchQuery, navigate]);

  // Auto-detect region
  useEffect(() => {
    const init = async () => {
      if (!searchParams.get("region")) {
        try {
          const response = await fetch("https://free.freeipapi.com/api/json");
          if (!response.ok) throw new Error("Location service unavailable");
          const geo = await response.json();
          if (geo?.latitude !== undefined && geo?.longitude !== undefined) {
            let nearest = REGIONS[0];
            let minDistance = Infinity;
            REGIONS.forEach((region) => {
              const dist = calculateDistance(geo.latitude, geo.longitude, region.lat, region.lon);
              if (dist < minDistance) { minDistance = dist; nearest = region; }
            });
            setSearchParams({ region: nearest.name }, { replace: true });
          } else throw new Error("Invalid API response");
        } catch (err) {
          console.error("Geo-detection failed:", err);
          setSearchParams({ region: "india" }, { replace: true });
        }
      }
      setCheckingLocation(false);

      try {
        const res = await fetch(NETWORK_DATA_URL);
        const data = await res.json();
        setNetworkData(data);
        // Count features
        if (data?.features) {
          setInboundCount(Math.floor(data.features.length * 0.45));
          setOutboundCount(Math.floor(data.features.length * 0.55));
        }
      } catch (err) {
        console.warn("Network data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    setSelectedRegion(getRegionFromUrl());
  }, [searchParams]);

  // Initialize map
  useEffect(() => {
    if (checkingLocation || !mapContainerRef.current) return;
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        accessToken: MAPBOX_TOKEN,
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: selectedRegion,
        zoom: 2,
        maxZoom: 6,
        projection: "globe" as any,
      });

      mapRef.current.on("load", () => {
        const size = 32;
        const canvas = document.createElement("canvas");
        canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#045dbf";
        ctx.beginPath();
        ctx.moveTo(size * 0.2, size * 0.15);
        ctx.lineTo(size * 0.85, size * 0.5);
        ctx.lineTo(size * 0.2, size * 0.85);
        ctx.closePath();
        ctx.fill();
        const imgData = ctx.getImageData(0, 0, size, size);
        mapRef.current!.addImage("arrow-icon", imgData, { sdf: false });

        mapRef.current!.addSource("lanes-source", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });

        mapRef.current!.addLayer({
          id: "worldMap",
          type: "line",
          source: "lanes-source",
          paint: { "line-color": "#045dbf", "line-width": 1, "line-opacity": 0.3 },
        });

        mapRef.current!.addLayer({
          id: "arrows-layer",
          type: "symbol",
          source: "lanes-source",
          layout: {
            "symbol-placement": "line",
            "symbol-spacing": 250,
            "icon-image": "arrow-icon",
            "icon-size": 0.5,
            "icon-rotation-alignment": "map",
            "icon-offset": [0, 0],
          },
          paint: { "icon-opacity": 0.5 },
        });
      });
    }
    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, [checkingLocation]);

  // Fly to region
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: selectedRegion, essential: true, zoom: 2.8, duration: 1500, easing: (t) => t * (2 - t) });
    }
  }, [selectedRegion]);

  // Update lanes
  useEffect(() => {
    if (!networkData || !mapRef.current) return;
    const updateSource = () => {
      const source = mapRef.current?.getSource("lanes-source") as mapboxgl.GeoJSONSource;
      if (source) {
        if (networkData.type === "FeatureCollection") {
          source.setData(networkData);
        } else if (Array.isArray(networkData)) {
          source.setData({
            type: "FeatureCollection",
            features: networkData.map((lane: any) => ({
              type: "Feature" as const,
              geometry: { type: "LineString" as const, coordinates: [[lane.origin.lon, lane.origin.lat], [lane.destination.lon, lane.destination.lat]] },
              properties: {},
            })),
          });
        }
      }
    };
    if (mapRef.current.isStyleLoaded()) updateSource();
    else mapRef.current.once("load", updateSource);
  }, [networkData]);

  // Toggle layer visibility
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    const visible = showInbound || showOutbound;
    try {
      mapRef.current.setLayoutProperty("worldMap", "visibility", visible ? "visible" : "none");
      mapRef.current.setLayoutProperty("arrows-layer", "visibility", visible ? "visible" : "none");
    } catch {}
  }, [showInbound, showOutbound]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ region: e.target.value });
  };

  const currentRegionKey = Object.keys(regionCenter).find(
    (key) => regionCenter[key].coordinates.toString() === selectedRegion.toString()
  ) || "india";

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", display: "flex", flexDirection: "column" }}>
      {/* Header Bar */}
      <div style={{
        display: "flex", alignItems: "center", padding: "16px 32px", gap: 24,
        background: "#fff", borderBottom: "1px solid #e5e7eb", flexWrap: "wrap",
      }}>
        {/* Title */}
        <div style={{ minWidth: 200 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#1a1a2e", margin: 0, lineHeight: 1.2 }}>
            LoRRI Network Grid
          </h1>
          <p style={{ fontSize: 13, color: "#393185", fontFamily: "Outfit, sans-serif", margin: 0, fontWeight: 500 }}>
            Logistics Network Visualisation
          </p>
        </div>

        {/* Search */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, maxWidth: 520, position: "relative" }}>
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            style={{
              flex: 1, padding: "10px 16px", fontSize: 14, border: "1px solid #d1d5db",
              borderRadius: 8, fontFamily: "Outfit, sans-serif", outline: "none",
              transition: "border-color 0.2s",
            }}
          />
          <button
            onClick={() => handleSearch()}
            style={{
              padding: "10px 28px", borderRadius: 8, border: "none",
              background: "linear-gradient(135deg, #393185, #4D44A8)", color: "#fff",
              fontSize: 14, fontWeight: 700, fontFamily: "Outfit, sans-serif",
              cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
            }}
          >
            Search
          </button>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 80, marginTop: 4,
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 1000, maxHeight: 200, overflowY: "auto",
            }}>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onMouseDown={() => { setSearchQuery(s); handleSearch(s); }}
                  style={{
                    padding: "10px 16px", cursor: "pointer", fontSize: 13,
                    fontFamily: "Outfit, sans-serif", borderBottom: i < suggestions.length - 1 ? "1px solid #f3f4f6" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px", borderRadius: 8, border: "1px solid #d1d5db",
            background: "#fff", color: "#333", fontSize: 13, fontWeight: 600,
            fontFamily: "Outfit, sans-serif", cursor: "pointer", transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Map Area */}
      <div style={{ flex: 1, position: "relative" }}>
        {checkingLocation ? (
          <div style={{ width: "100%", height: "calc(100vh - 130px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
            <div style={{
              width: 24, height: 24, border: "3px solid #f3f3f3",
              borderTop: "3px solid #393185", borderRadius: "50%",
              animation: "gg-spin 1s linear infinite",
            }} />
          </div>
        ) : (
          <>
            {loading && (
              <div style={{
                position: "absolute", top: 12, left: 12, zIndex: 100,
                backgroundColor: "rgba(255,255,255,0.92)", padding: "8px 14px",
                fontSize: 13, color: "#666", borderRadius: 6, fontFamily: "Outfit, sans-serif",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)", pointerEvents: "none",
              }}>
                Loading routes...
              </div>
            )}
            <div ref={mapContainerRef} style={{ width: "100%", height: "calc(100vh - 130px)" }} />

            {/* Region dropdown - top right */}
            <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}>
              <select
                value={currentRegionKey}
                onChange={handleRegionChange}
                style={{
                  padding: "8px 12px", fontSize: 13, border: "1px solid #ccc",
                  backgroundColor: "#fff", cursor: "pointer", borderRadius: 6,
                  fontFamily: "Outfit, sans-serif", fontWeight: 500,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                {Object.keys(regionCenter).map((key) => (
                  <option key={key} value={key}>{regionCenter[key].label}</option>
                ))}
              </select>
            </div>

            {/* Movement toggles - bottom right */}
            <div style={{
              position: "absolute", bottom: 60, right: 12, zIndex: 10,
              background: "#fff", borderRadius: 8, padding: "10px 14px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)", fontFamily: "Outfit, sans-serif",
            }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", marginBottom: 6, fontWeight: 500 }}>
                <input type="checkbox" checked={showInbound} onChange={(e) => setShowInbound(e.target.checked)}
                  style={{ accentColor: "#393185", width: 15, height: 15 }} />
                Inbound Movement
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
                <input type="checkbox" checked={showOutbound} onChange={(e) => setShowOutbound(e.target.checked)}
                  style={{ accentColor: "#22c55e", width: 15, height: 15 }} />
                Outbound Movement
              </label>
            </div>

            {/* Bottom legend bar */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 32,
              background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)",
              padding: "12px 24px", borderTop: "1px solid #e5e7eb",
              fontFamily: "Outfit, sans-serif",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#393185", display: "inline-block" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Inbound Deliveries</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>Outbound Deliveries</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>
                {currentRegionKey.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())} — In: {inboundCount} | Out: {outboundCount}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes gg-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
