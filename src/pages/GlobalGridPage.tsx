import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZGhydXYtbXVraGVyamVlIiwiYSI6ImNrNTNsM3B1MjA3b2kzZmw4ejZtbDdvc2UifQ.rhqKEndZaAbF9a9cSVlM4A";
const NETWORK_DATA_URL = "https://lorrifilesproduction.blob.core.windows.net/public-container/worldnetworkdata_v2.geojson";

const REGIONS: { name: string; label: string; lat: number; lon: number }[] = [
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
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [networkData, setNetworkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkingLocation, setCheckingLocation] = useState(true);

  const getRegionFromUrl = (): [number, number] => {
    const regionParam = searchParams.get("region");
    if (regionParam && regionCenter[regionParam]) {
      return regionCenter[regionParam].coordinates;
    }
    return regionCenter.india.coordinates;
  };

  const [selectedRegion, setSelectedRegion] = useState<[number, number]>(getRegionFromUrl);

  // Auto-detect region from IP if no region param
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
              if (dist < minDistance) {
                minDistance = dist;
                nearest = region;
              }
            });
            setSearchParams({ region: nearest.name }, { replace: true });
          } else {
            throw new Error("Invalid API response");
          }
        } catch (err) {
          console.error("Geo-detection failed, defaulting to India:", err);
          setSearchParams({ region: "india" }, { replace: true });
        }
      }
      setCheckingLocation(false);

      // Fetch network data
      try {
        const res = await fetch(NETWORK_DATA_URL);
        const data = await res.json();
        setNetworkData(data);
      } catch (err) {
        console.warn("Network data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Update selected region when URL changes
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
        // Create arrow image programmatically
        const size = 32;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
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
          paint: {
            "line-color": "#045dbf",
            "line-width": 1,
            "line-opacity": 0.3,
          },
        });

        // Arrow symbol layer along lanes
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
          paint: {
            "icon-opacity": 0.5,
          },
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [checkingLocation]);

  // Fly to selected region
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: selectedRegion,
        essential: true,
        zoom: 2.8,
        duration: 1500,
        easing: (t) => t * (2 - t),
      });
    }
  }, [selectedRegion]);

  // Update lanes data on map
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
              geometry: {
                type: "LineString" as const,
                coordinates: [
                  [lane.origin.lon, lane.origin.lat],
                  [lane.destination.lon, lane.destination.lat],
                ],
              },
              properties: {},
            })),
          });
        }
      }
    };

    if (mapRef.current.isStyleLoaded()) {
      updateSource();
    } else {
      mapRef.current.once("load", updateSource);
    }
  }, [networkData]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ region: e.target.value });
  };

  const currentRegionKey = Object.keys(regionCenter).find(
    (key) => regionCenter[key].coordinates.toString() === selectedRegion.toString()
  ) || "india";

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, padding: "12px 24px",
        background: "#fff", borderBottom: "1px solid #e5e7eb",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#393185", color: "white", border: "2px solid #393185",
            padding: "9px 14px", fontSize: 12, fontWeight: "bold", cursor: "pointer",
            borderRadius: 6, transition: "all 0.3s ease",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#393185";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#393185";
            e.currentTarget.style.color = "white";
          }}
        >
          ← Go back to home page
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, fontFamily: "Outfit, sans-serif", color: "#333", margin: 0 }}>
          Global Freight Grid
        </h1>
      </div>

      {/* Map area */}
      <div style={{ margin: "10px 64px", border: "1px solid black", position: "relative", padding: 6 }}>
        {checkingLocation ? (
          <div style={{ width: "100%", height: "76vh", position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, zIndex: 999,
              height: "100%", width: "100%", backgroundColor: "#ffffff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 20, height: 20, border: "2px solid #f3f3f3",
                borderTop: "2px solid #393185", borderRadius: "50%",
                animation: "gg-spin 1s linear infinite",
              }} />
            </div>
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            {loading && (
              <div style={{
                position: "absolute", top: 10, left: 10, zIndex: 100,
                backgroundColor: "rgba(255,255,255,0.9)", padding: "8px 12px",
                fontSize: "0.8rem", color: "#666", pointerEvents: "none",
                borderRadius: 4,
              }}>
                Loading routes...
              </div>
            )}
            <div ref={mapContainerRef} style={{ width: "100%", height: "76vh" }} />
            <div style={{
              position: "absolute", top: 10, right: 10, padding: 10, minWidth: 150,
            }}>
              <select
                value={currentRegionKey}
                onChange={handleRegionChange}
                style={{
                  width: "100%", padding: 8, fontSize: 14, border: "1px solid #ccc",
                  backgroundColor: "#fff", cursor: "pointer", height: 38,
                  transition: "border-color 0.3s ease-in-out", borderRadius: 4,
                }}
              >
                {Object.keys(regionCenter).map((key) => (
                  <option key={key} value={key}>
                    {regionCenter[key].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes gg-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          div[style*="margin: 10px 64px"] {
            margin: 18px 32px 32px 32px !important;
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
