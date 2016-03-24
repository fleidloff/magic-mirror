import "js/elements/skeleton.js";
import "js/elements/time.js";
import { getWeatherData } from "js/elements/weather.js";
import { getFroodleNotes } from "js/elements/notes.js";
import { getFroodleBirthdays } from "js/elements/birthdays.js";

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
        return getWeatherData()
        .then(weather => {
          return render (
            skeleton.oneWithClass("weather"), 
            `<s-weather props=${p(weather)} />`
          );
        })
        .catch(ex => console.error("something went wrong", ex));
      }
    );

    time.every (
      10*time.minute, 
      () => {
        return getFroodleNotes(skeleton)
          .then(notes => {
            return render (
              skeleton.oneWithClass("notes"), 
              `<s-notes props=${p({notes})} />`
            );
          })
          .catch(ex => console.log("something went wrong"));
      }
    );

    time.every (
      time.day, 
      () => {
        return getFroodleBirthdays(skeleton)
          .then(birthdays => {
            return render (
              skeleton.oneWithClass("birthdays"), 
              `<s-birthdays props=${p({birthdays})} />`
            );
          })
          .catch(ex => console.log("something went wrong"));
      }
    );
    
  });
}
