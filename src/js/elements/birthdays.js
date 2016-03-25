import register, { render, props as p } from "js/stupidComponent.js";

register("s-birthdays", ({ birthdays }) => `
  <div>${markdown.toHTML(birthdays)}</div>
`);

export function getFroodleBirthdays() {
  return fetch(getUrl())
    .then(res => res.text());
}

function getUrl(month) {
  return "http://fleidlof.alnilam.uberspace.de/nodejs/froodle/api/v1/Tasks/56d695a0605e4d52509df221.md?shared=true";
}