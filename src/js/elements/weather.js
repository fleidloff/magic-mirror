import register, { render, props as p } from "js/stupidComponent.js";

register("s-weather", ({weather}) => `
  <div>Temperatur: ${weather.temp}°C</div>
  <div><small>in 12 Stunden: ${weather.temp12}°C</small></div>
  <div><small>in 1 Tag: ${weather.temp24}°C</small></div>
`);

export function getWeatherData() {
  return fetch("http://api.openweathermap.org/data/2.5/forecast?id=2848756&appid=1465be17ba0ad9f9f2801b5bcbb79e0f")
    .then(res => res.json())
    .then(mapWeather);
}

function kelvinToCelsius(k) {
  return Math.round(k - 273.15);
}

function mapWeather(json) {
  // 4 -> in 12; 8 -> in 24
  console.log(json);
  return {
    temp: kelvinToCelsius(json.list[0].main.temp),
    temp12: kelvinToCelsius(json.list[4].main.temp),
    temp24: kelvinToCelsius(json.list[8].main.temp)
  };
}
