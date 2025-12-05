import React, { useState } from "react";
import axios from "axios";
import WeatherBox from "./WeatherBox";

const App = () => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // --- Fetch Weather Data ---
  const getWeatherData = async (cityName = city) => {
    if (!cityName.trim() || cityName.length < 3) {
      alert("Please enter a valid city name");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );

      setWeatherData(response.data);
      console.log(response.data);

      setCity("");
    } catch (error) {
      console.log("Error fetching weather data:", error.message);
      alert("City not found. Try another one.");
    }
  };

  // --- Handle Enter Key ---
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getWeatherData();
    }
  };

  return (
    <div className="relative flex justify-center items-center px-4 min-h-screen bg-weather-gradient">
      <div className="max-w-5xl w-full shadow-2xl p-8 bg-weather-gradient backdrop-blur-sm rounded-2xl space-y-6 border-white/20">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="font-bold text-4xl text-white tracking-wide">Weather Now</h1>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Enter a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress}
              className="px-4 py-2 w-full bg-white/20 placeholder-white text-white border-2 border-white 
              rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="p-1 cursor-pointer" onClick={() => getWeatherData()}>
              <i className="fa-solid fa-magnifying-glass text-white text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Weather Display */}
        {weatherData ? (
          <div className="flex flex-col md:flex-row justify-between items-center bg-weather-gradient backdrop-blur-sm rounded-xl p-6 shadow-xl space-y-4 md:space-y-0">

            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-start justify-center md:justify-start space-x-2">
                <h2 className="text-7xl md:text-8xl text-white font-bold">
                  {Math.round(weatherData.main.temp - 273.15)}
                </h2>
                <span className="text-3xl md:text-5xl text-white">°C</span>
              </div>

              <h3 className="text-white text-xl md:text-2xl font-medium">
                {`${weatherData.name}, ${weatherData.sys.country}`}
              </h3>

              <h4 className="text-white text-lg md:text-xl capitalize">
                {weatherData.weather[0].description}
              </h4>
            </div>

            <div className="text-white">
              <i className="fa-solid fa-cloud text-[80px]"></i>
            </div>
          </div>
        ) : (
          <div className="w-full bg-white/10 rounded-xl p-10 text-center text-white border border-white/20">
            <p className="text-2xl font-medium opacity-70">Search a city to view the weather 🌤️</p>
          </div>
        )}

        {/* Info Boxes */}
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white">
            <WeatherBox
              icon={<i className="fa-solid fa-droplet text-[32px]"></i>}
              title="Humidity"
              value={`${weatherData.main.humidity}%`}
            />

            <WeatherBox
              icon={<i className="fa-solid fa-glass-water text-[32px]"></i>}
              title="Pressure"
              value={`${weatherData.main.pressure} pHa`}
            />

            <WeatherBox
              icon={<i className="fa-solid fa-wind text-[32px]"></i>}
              title="Wind Speed"
              value={`${weatherData.wind.speed} km/h`}
            />

            <WeatherBox
              icon={<i className="fa-regular fa-sun text-[32px]"></i>}
              title="Feels Like"
              value={`${Math.round(weatherData.main.feels_like - 273.15)} °C`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
