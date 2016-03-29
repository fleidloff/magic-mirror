import "js/elements/skeleton.js";
import "js/elements/time.js";
import { getWeatherData } from "js/elements/weather.js";
import { getFroodleNotes } from "js/elements/notes.js";
import { getFroodleBirthdays } from "js/elements/birthdays.js";

import { props as p, Signal, render } from "js/stupidComponent.js";
import time from "js/time.js";

export default function main() {
  render(document.body, `<s-skeleton />`).then(skeleton => {

    const timestampSignal = Signal.create(0).every(time.second, (signal) => {
      signal.change(new Date().getTime());
    });

    render (
      skeleton.oneWithClass("time"), 
      `<s-time timestamp="${timestampSignal.attr}" />`
    );

    const weatherSignal = Signal.create({temp: 0, sunset: 0, sunrise: 0}).every(time.hour, (signal) => {
      return getWeatherData()
        .then(weather => {
          signal.change(weather);  
        })
        .catch(ex => console.error("something went wrong", ex));
    });

    render (
      skeleton.oneWithClass("weather"), 
      `<s-weather weather="${weatherSignal.attr}" />`
    );

    const notesSignal = Signal.create("").every (10*time.minute, (signal) => {
      return getFroodleNotes()
        .then(notes => {
          signal.change(notes);
        })
        .catch(ex => console.log("something went wrong"));
    });
    render (
      skeleton.oneWithClass("notes"), 
      `<s-notes notes="${notesSignal.attr}" />`
    );

    const birthdaysSignal = Signal.create("").every(time.day, (signal) => {
      return getFroodleBirthdays(skeleton)
        .then(birthdays => {
          signal.change(birthdays);
        })
        .catch(ex => console.log("something went wrong"));
    });
    render (
      skeleton.oneWithClass("birthdays"), 
      `<s-birthdays birthdays="${birthdaysSignal.attr}" />`
    );
    
  });
}
