const API_BASE = "https://production.lorri.in/api/apilorri/screen_zero";
const AUTOCOMPLETE_BASE = "https://production.lorri.in/api/apiuser/autocomplete";

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
    `${AUTOCOMPLETE_BASE}?suggest=${encodeURIComponent(query)}&limit=20&searchFields=new_locations`
  );
  const data = await res.json();
  return (data.value || []).map((item: any) => ({
    name: item.location_name || item.location?.label || "",
    lat: item.location?.lat ?? item.coordinates?.[1] ?? 0,
    lon: item.location?.lon ?? item.coordinates?.[0] ?? 0,
  }));
}

export async function getScreenZeroData(lon: number, lat: number): Promise<ScreenZeroResponse> {
  const res = await fetch(`${API_BASE}?lon=${lon}&lat=${lat}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
