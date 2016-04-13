import "js/elements/time.js";
import "js/elements/list.js";
import { getWeatherData } from "js/elements/weather.js";
import { getFroodleNotes } from "js/elements/notes.js";
import { getFroodleBirthdays } from "js/elements/birthdays.js";

import { getSignal } from "js/stupidComponent.js";
import time from "js/time.js";

export default function main() {
  const timestampSignal = getSignal("time").every(time.second, (signal) => {
    signal.set(new Date());
  });
  const weatherSignal = getSignal("weather", {temp: 0, sunset: 0, sunrise: 0}).every(time.hour, (signal) => {
    return getWeatherData()
      .then(weather => {
        signal.set(weather);  
      })
      .catch(ex => console.error("something went wrong => ", ex));
  });

  const notesSignal = getSignal("notes", "").every (10*time.minute, (signal) => {
    return getFroodleNotes()
      .then(notes => {
        signal.set(notes);
      })
      .catch(ex => console.log("something went wrong => ", ex));
  });

  const birthdaysSignal = getSignal("birthdays", "").every(time.day, (signal) => {
    return getFroodleBirthdays()
      .then(birthdays => {
        signal.set(birthdays);
      })
      .catch(ex => console.log("something went wrong => ", ex));
  });
}
