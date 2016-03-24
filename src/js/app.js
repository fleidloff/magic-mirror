import "js/elements/skeleton.js";
import "js/elements/time.js";
import { getWeatherData } from "js/elements/weather.js";

import { props as p, render } from "js/stupidComponent.js";
import time from "js/time.js";

export default function main() {
  render(document.body, `<s-skeleton />`).then(skeleton => {

    time.every (
      time.second, 
      () => render (
        skeleton.oneWithClass("time"), 
        `<s-time props=${p({timestamp: new Date().getTime()})} />`
      )
    );

    time.every (
      time.hour, 
      () => {
        return getWeatherData(skeleton);
      }
    );

    
  });
}
