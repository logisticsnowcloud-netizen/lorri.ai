const API_BASE = "https://production.lorri.in/api/apilorri/screen_zero";
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";

export interface LocationSuggestion {
  name: string;
  lat: number;
  lon: number;
}

export interface ScreenZeroResponse {
  network: {
    inflow: any[];
    outflow: any[];
  };
  searched_coordinates: [number, number]; // [lon, lat]
  transporters_count: number;
  transporter_list: any[];
  dashboard: Array<{ label: string; value: number; box_details: any[] }>;
}

export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  if (!query || query.length < 2) return [];
  const res = await fetch(
    `${NOMINATIM_BASE}/search?q=${encodeURIComponent(query)}&format=json&limit=8&countrycodes=in`
  );
  const data = await res.json();
  return data.map((item: any) => ({
    name: item.display_name,
    lat: parseFloat(item.lat),
    lon: parseFloat(item.lon),
  }));
}

export async function getScreenZeroData(lon: number, lat: number): Promise<ScreenZeroResponse> {
  const res = await fetch(`${API_BASE}?lon=${lon}&lat=${lat}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
