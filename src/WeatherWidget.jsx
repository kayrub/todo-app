import { useEffect, useState } from 'react';
import './App.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState("loading");
  const [weatherUrl, setWeatherUrl] = useState('https://wttr.in/?format=j1');

  useEffect(() => {
  setTimeout(() => {
  const fetchWeather = async () => {
    try {
      const res = await fetch(weatherUrl);
      const data = await res.json();
      // console.log("weather data: ", data);
      setWeather({
        condition: data.current_condition[0],
        temperature: data.weather[0]
      });
      setIsLoadingWeather("loaded");
    } catch (err) {
      console.log("error beepp boop: ", err);
      setIsLoadingWeather("failed");
    }
  };
  fetchWeather();
  }, 2000)
}, [weatherUrl]);

const breakWeather = () => {
    setWeatherUrl('https://beepboopsuckstosuck/');
    setIsLoadingWeather('failed');
    console.log(isLoadingWeather);
  }
    return(
       <div>
        <button onClick = {() => breakWeather()}>breakWeather</button>
        {isLoadingWeather === "failed" && <div> failed to connect to {weatherUrl} </div>}
        {isLoadingWeather === "loading" && <div>Weather is Loading...setTimeOut to replicate</div>}
        {isLoadingWeather === "loaded" && <div className='weather-row'>Temperature: {weather.condition.temp_F}F   Condition: {weather.condition.weatherDesc[0].value}</div>}
        </div> 
    )
}

export default WeatherWidget
