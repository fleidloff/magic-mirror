import register, { render, props as p } from "js/stupidComponent.js";

register("s-weather", ({ weather }) => `
  <div>Temperatur: ${weather.temp}°C</div>
`);

export function getWeatherData(skeleton) {
  return fetch("http://api.openweathermap.org/data/2.5/weather?id=2848756&appid=1465be17ba0ad9f9f2801b5bcbb79e0f")
  //return fetch("/weather.json")
    .then(res => res.json())
    .then(json => mapWeather(json))
    .then(weather => {
      return render (
        skeleton.oneWithClass("weather"), 
        `<s-weather props=${p({weather})} />`
      );
    })
    .catch(ex => console.error("something went wrong", ex));
}

function kelvinToCelsius(k) {
  return Math.round(k - 273.15);
}

function mapWeather(json) {
  return {
    temp: kelvinToCelsius(json.main.temp)
  };
}
