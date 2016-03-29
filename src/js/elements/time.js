import register from "js/stupidComponent.js";

const monthNames = [
  "Januar", "Februar", "März",
  "April", "Mai", "Juni", "Juli",
  "August", "September", "Oktober",
  "November", "Dezember"
];

const dayNames = [
  "Sonntag", "Montag", "Dienstag",
  "Mittwoch", "Donnerstag", "Freitag",
  "Samstag"
];

const leadingZero = n => n < 10 ? `0${n}` : n;

function timeObject(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const weekDayIndex = date.getDay();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return {
    date: `${dayNames[weekDayIndex]}, ${day}. ${monthNames[monthIndex]} ${year}`,
    time: `${hour}:${leadingZero(minute)}:${leadingZero(second)}`,
    simpleTime: `${hour}:${leadingZero(minute)}`
  };
}

register("s-time", ({ timestamp }) => {
  const dt = timeObject(timestamp);

  return `
    <div>${dt.date}</div>
    <div>${dt.time} Uhr</div>
`});
