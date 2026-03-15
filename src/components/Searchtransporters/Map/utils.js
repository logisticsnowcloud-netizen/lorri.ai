// Function to calculate the great-circle distance between two points (in km)
export const getDistance = (coord1, coord2) => {
  const R = 6371; // Radius of the Earth in km
  const lat1 = coord1[1] * (Math.PI / 180); // Convert degrees to radians
  const lon1 = coord1[0] * (Math.PI / 180);
  const lat2 = coord2[1] * (Math.PI / 180);
  const lon2 = coord2[0] * (Math.PI / 180);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

// Get the nearest country center based on searched coordinates
export const getClosestCountryCenter = (searchedCoords) => {
  let closestDistance = Infinity;
  let closestCenter = COUNTRY_CENTERS.INDIA; // Default to India

  Object.entries(COUNTRY_CENTERS).forEach(([country, centerCoords]) => {
    const distance = getDistance(searchedCoords, centerCoords);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCenter = centerCoords;
    }
  });

  return closestCenter;
};

export const COUNTRY_CENTERS = {
  INDIA: [78.748, 23.8438],
  // USA: [-98.5795, 39.8283],
  // BRAZIL: [-51.9253, -14.235],
  AUSTRALIA: [133.7751, -25.2744],
  // CHINA: [104.1954, 35.8617],
  EUROPE: [10.0183, 50.7054], // Europe - Germany area
};
