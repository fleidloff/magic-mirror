import "js/elements/skeleton.js";
import "js/elements/time.js";
import { getWeatherData } from "js/elements/weather.js";
import { getFroodleNotes } from "js/elements/notes.js";
import { getFroodleBirthdays } from "js/elements/birthdays.js";

import { props as p, Signal, render } from "js/stupidComponent.js";
import time from "js/time.js";

export default function main() {
  render(document.body, `<s-skeleton />`).then(skeleton => {

    const timestampSignal = Signal.create({timestamp: 0});
    render (
      skeleton.oneWithClass("time"), 
      `<s-time props=${timestampSignal.attr} />`
    )
    time.every(time.second, () => {
      timestampSignal.change({timestamp: new Date().getTime()});
    });

    const weatherSignal = Signal.create({temp: 0});
    render (
      skeleton.oneWithClass("weather"), 
      `<s-weather props=${weatherSignal.attr} />`
    );
    time.every (time.hour, () => {
      return getWeatherData()
        .then(weather => {
          weatherSignal.change(weather);  
        })
        .catch(ex => console.error("something went wrong", ex));
    });

    const notesSignal = Signal.create({notes: ""});
    render (
      skeleton.oneWithClass("notes"), 
      `<s-notes props=${notesSignal.attr} />`
    );
    time.every (10*time.minute, () => {
      return getFroodleNotes()
        .then(notes => {
          notesSignal.change({notes});
        })
        .catch(ex => console.log("something went wrong"));
    });

    const birthdaysSignal = Signal.create({birthdays: ""});
    render (
      skeleton.oneWithClass("birthdays"), 
      `<s-birthdays props=${birthdaysSignal.attr} />`
    );
    time.every (time.day, () => {
      return getFroodleBirthdays(skeleton)
        .then(birthdays => {
          birthdaysSignal.change({birthdays});
        })
        .catch(ex => console.log("something went wrong"));
    });
    
  });
}
