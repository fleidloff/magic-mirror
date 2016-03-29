import "js/elements/skeleton.js";
import "js/elements/time.js";
import { getWeatherData } from "js/elements/weather.js";
import { getFroodleNotes } from "js/elements/notes.js";
import { getFroodleBirthdays } from "js/elements/birthdays.js";

import { props as p, Signal, render } from "js/stupidComponent.js";
import time from "js/time.js";

export default function main() {
  render(document.body, `<s-skeleton />`).then(skeleton => {

    const timestampSignal = Signal.create(0);
    render (
      skeleton.oneWithClass("time"), 
      `<s-time timestamp=${timestampSignal.attr} />`
    )
    time.every(time.second, () => {
      timestampSignal.change(new Date().getTime());
    });

    const weatherSignal = Signal.create({temp: 0});
    render (
      skeleton.oneWithClass("weather"), 
      `<s-weather weather=${weatherSignal.attr} />`
    );
    time.every (time.hour, () => {
      return getWeatherData()
        .then(weather => {
          weatherSignal.change(weather);  
        })
        .catch(ex => console.error("something went wrong", ex));
    });

    const notesSignal = Signal.create("");
    render (
      skeleton.oneWithClass("notes"), 
      `<s-notes notes=${notesSignal.attr} />`
    );
    time.every (10*time.minute, () => {
      return getFroodleNotes()
        .then(notes => {
          notesSignal.change(notes);
        })
        .catch(ex => console.log("something went wrong"));
    });

    const birthdaysSignal = Signal.create("");
    render (
      skeleton.oneWithClass("birthdays"), 
      `<s-birthdays birthdays=${birthdaysSignal.attr} />`
    );
    time.every (time.day, () => {
      return getFroodleBirthdays(skeleton)
        .then(birthdays => {
          birthdaysSignal.change(birthdays);
        })
        .catch(ex => console.log("something went wrong"));
    });
    
  });
}
