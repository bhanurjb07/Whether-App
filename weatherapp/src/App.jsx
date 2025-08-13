import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "c0a2d2e96dc137dc2e42a5808671e91b";


  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }
      setWeather(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>
      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;