import { useState } from "react";
import { fetchWeather } from "../api/WeatherService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeatherData } from "../models/WeatherModel";

export const useWeatherViewModel = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWeather(city);      
      const weatherData: WeatherData = {
        temperature: data?.currentConditions?.temp,
        humidity: data?.currentConditions?.humidity,
        windSpeed: data?.currentConditions?.windspeed,
        condition: data?.currentConditions?.conditions,
        description: data?.description,
      };
      setWeather(weatherData);
      await AsyncStorage.setItem("lastWeather", JSON.stringify(weatherData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCachedWeather = async () => {
    const cachedData = await AsyncStorage.getItem("lastWeather");
    if (cachedData) setWeather(JSON.parse(cachedData));
  };

  return { weather, loading, error, searchWeather, loadCachedWeather };
};
