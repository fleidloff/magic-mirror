import register, { render, props as p } from "js/stupidComponent.js";

register("s-weather", ({weather}) => `
  <div>Temperatur: ${weather.temp}°C</div>
  <br />
  <div><small>max: ${weather.tempMax}°C</small></div>
  <div><small>min: ${weather.tempMin}°C</small></div>
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
  const tempNow = json.list[0].main.temp;
  const temp = {
    max: tempNow,
    min: tempNow
  }
  json.list.splice(1,8).forEach(t => {
    if (t.main.temp > temp.max) {
      temp.max = t.main.temp;
    } 
    if (t.main.temp < temp.min) {
      temp.min = t.main.temp;
    } 
  })
  return {
    temp: kelvinToCelsius(json.list[0].main.temp),
    tempMax: kelvinToCelsius(temp.max),
    tempMin: kelvinToCelsius(temp.min)
  };
}
