const API_KEY = "JVREARYS92MUTXM7LTN63VTUL";
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function fetchWeather(city: string) {
  try {
    if (!city) throw new Error("City name cannot be empty");

    // Encode city name (e.g., "New York" → "New%20York")
    const encodedCity = encodeURIComponent(city);

    const url = `${BASE_URL}/${encodedCity}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    console.log("Fetching weather from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Check if the response contains weather data
    if (!data || data.error) {
      throw new Error("Invalid city name or no data found.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    return null;
  }
}
