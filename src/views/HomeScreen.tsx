import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl, Appearance } from "react-native";
import { useWeatherViewModel } from "../viewModels/WeatherViewModel";
import { useTheme } from "../utils/ThemeContext";
import { darkTheme, lightTheme } from "../utils/themes";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CITY_STORAGE_KEY = '@WeatherApp:lastCity';

const HomeScreen = () => {
  const { weather, loading, error, searchWeather, loadCachedWeather } = useWeatherViewModel();
  const [city, setCity] = useState("");
  const [lastSearchedCity, setLastSearchedCity] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());

useEffect(() => {
  const initializeApp = async () => {
    const initialSystemTheme = Appearance.getColorScheme();
    setSystemTheme(initialSystemTheme);

    if (initialSystemTheme === 'dark' && theme === 'light') {
      toggleTheme();
    } else if (initialSystemTheme === 'light' && theme === 'dark') {
      toggleTheme();
    }

    await loadCachedWeather();
    await loadLastCity();
  };

  initializeApp();

  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    setSystemTheme(colorScheme);
    if (colorScheme === 'dark' && theme === 'light') {
      toggleTheme();
    } else if (colorScheme === 'light' && theme === 'dark') {
      toggleTheme();
    }
  });

  return () => subscription.remove();
}, []);

  const loadLastCity = async () => {
    try {
      const storedCity = await AsyncStorage.getItem(CITY_STORAGE_KEY);
      if (storedCity) {
        setLastSearchedCity(storedCity);
        setCity(storedCity);
      }
    } catch (e) {
      console.error('Failed to load the last searched city', e);
    }
  };

  const searchWeatherAndSave = useCallback(async (searchCity : any) => {
    if (searchCity.trim()) {
      await searchWeather(searchCity);
      setLastSearchedCity(searchCity);
      try {
        await AsyncStorage.setItem(CITY_STORAGE_KEY, searchCity);
      } catch (e) {
        console.error('Failed to save the city', e);
      }
    }
  }, [searchWeather]);

  const handleEndEditing = () => {
    searchWeatherAndSave(city);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (lastSearchedCity) {
      await searchWeather(lastSearchedCity);
    } else {
      await loadCachedWeather();
    }
    setRefreshing(false);
  }, [lastSearchedCity, searchWeather, loadCachedWeather]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[currentTheme.buttonColor]}
            tintColor={currentTheme.buttonColor}
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Icon 
              name={theme === 'light' ? 'moon-outline' : 'sunny-outline'} 
              size={24} 
              color={currentTheme.textColor} 
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: currentTheme.textColor }]}>Check Weather</Text>
        <TextInput
          style={[
            styles.input, 
            { 
              color: currentTheme.textColor, 
              borderBottomColor: currentTheme.textColor,
              backgroundColor: currentTheme.inputBackgroundColor
            }
          ]}
          placeholder="Enter city name here"
          value={city}
          onChangeText={setCity}
          onEndEditing={handleEndEditing}
          placeholderTextColor={currentTheme.placeholderColor}
        />
        {loading && <ActivityIndicator size="large" color={currentTheme.activityIndicatorColor} />}
        {error ? <Text style={[styles.error, { color: currentTheme.errorColor }]}>{error}</Text> : null}
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={[styles.cityName, { color: currentTheme.textColor }]}>
              Weather for {lastSearchedCity}
            </Text>
            <Text style={{ color: currentTheme.textColor }}>Temperature: {weather.temperature}°C</Text>
            <Text style={{ color: currentTheme.textColor }}>Humidity: {weather.humidity}%</Text>
            <Text style={{ color: currentTheme.textColor }}>Wind Speed: {weather.windSpeed} km/h</Text>
            <Text style={{ color: currentTheme.textColor }}>Condition: {weather.condition}</Text>
            {weather?.description && <Text style={{ color: currentTheme.textColor, marginVertical: 20 }}>{'\u2023  ' + weather.description}</Text>}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold",
    marginBottom: 20
  },
  themeToggle: {
    padding: 5,
  },
  input: { 
    height: 40, 
    borderBottomWidth: 1, 
    marginBottom: 20,
  },
  weatherContainer: { 
    marginTop: 20,
  },
  error: { 
    marginTop: 10,
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;