# Weather App

## Overview
This is a **React Native Weather App** that allows users to search for weather details of any city. The app fetches data from the **VisualCrossing Weather API**, displays key weather information, supports **offline caching**, and offers **dark mode** support.

## Features
- 🌦 **Search**: Enter a city name to get real-time weather information.
- 🔄 **Pull-to-Refresh**: Swipe down to refresh and get updated weather data.
- 🌙 **Dark Mode**: The app automatically switches between light and dark themes based on system settings.
- 📡 **Offline Mode**: The last searched city's weather data is cached and accessible without an internet connection.
- 📍 **Weather Details**: Displays temperature, humidity, wind speed, and weather conditions.

---

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **React Native CLI**
- **Android Studio / Xcode** (for running on emulator/simulator)
- **VisualCrossing API Key** (Get it from [VisualCrossing](https://www.visualcrossing.com/))

### Steps to Install
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies**
   ```sh
   npm install
   # OR
   yarn install
   ```

3. **Setup API Key**
   - Create a `.env` file in the root directory.
   - Add your VisualCrossing API Key:
   ```env
   WEATHER_API_KEY=your_api_key_here
   ```

4. **Run Metro Server**
   ```sh
   npm start
   # OR
   yarn start
   ```

5. **Run the App**
   - **Android**:
     ```sh
     npm run android
     ```
   - **iOS** (requires macOS):
     ```sh
     cd ios && pod install && cd ..
     npm run ios
     ```

---

## How to Use the App

### 🔎 Search for a City
1. Tap the **search bar** at the top.
2. Type a **city name** and press enter.
3. The app will fetch and display the weather details for that city.

### 🔄 Pull-to-Refresh
- **Android & iOS**: Swipe **down** on the screen to refresh and fetch the latest weather data.

### 🌙 Enable Dark Mode
- The app automatically switches between **light and dark mode** based on your **device settings**.
- You can change your system theme to see the effect:
  - **Android**: Settings → Display → Dark Theme
  - **iOS**: Settings → Display & Brightness → Dark Mode

### 📡 Offline Mode
- The last searched city’s weather data is **saved automatically**.
- If you **lose internet connection**, the app will display **cached weather data**.

---

## API Reference
The app fetches weather data using the **VisualCrossing Weather API**:
```sh
GET https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{CITY_NAME}?unitGroup=metric&key={WEATHER_API_KEY}&contentType=json
```

Example Response:
```json
{
  "address": "New York",
  "days": [
    {
      "temp": 15.2,
      "humidity": 72,
      "windspeed": 5.4,
      "conditions": "Clear",
    }
  ]
}
```

---

## Troubleshooting
- **Metro Bundler stuck?** Run:
  ```sh
  npx react-native start --reset-cache
  ```
- **Android build failed?** Try:
  ```sh
  cd android && ./gradlew clean && cd ..
  ```
- **iOS build issues?** Run:
  ```sh
  cd ios && pod install && cd ..
  ```

---

## Future Enhancements
- 🌡 **Hourly Weather Forecast**
- 🌍 **GPS-based Location Weather**
- 🔔 **Push Notifications for Weather Alerts**

---

## Author
Developed by **Sagar Yadav**

---

## License
This project is licensed under the **MIT License**.

---

Enjoy the Weather App! 🌤️🚀

