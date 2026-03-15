const API_BASE = "https://production.lorri.in/api/apilorri/screen_zero";

export interface LocationSuggestion {
  name: string;
}

export interface RouteData {
  location: string;
  center: [number, number] | null;
  metrics: {
    inbound_count: number;
    outbound_count: number;
  };
  inflow: Array<{
    origin_coordinates: [number, number];
    volume: number;
  }>;
  outflow: Array<{
    destination_coordinates: [number, number];
    volume: number;
  }>;
}

export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  if (!query || query.length < 2) return [];
  const res = await fetch(`${API_BASE}/api/locations?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return (data.locations || []).map((city: string) => ({ name: city }));
}

export async function getRoutes(locationName: string): Promise<RouteData> {
  const res = await fetch(`${API_BASE}/api/routes/${encodeURIComponent(locationName)}`);
  return res.json();
}
