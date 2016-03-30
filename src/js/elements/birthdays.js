import register, { getSignal } from "../stupidComponent.js";

register("s-birthdays", ({ birthdays }) => `
  <div>${markdown.toHTML(birthdays)}</div>
`);

export function getFroodleBirthdays() {
  return fetch(getUrl(new Date().getMonth()))
    .then(res => res.text());
  
}

const months = [
  "56bc487f9efb32bb2d03e361", "56bc488c9efb32bb2d03e363", "56d695a0605e4d52509df221",
  "56fc13273318a37a3ab66f7e", "56fc141a3318a37a3ab66f80", "56fc14383318a37a3ab66f81",
  "56fc13483318a37a3ab66f7f", "56fc13483318a37a3ab66f7f", "56fc13483318a37a3ab66f7f",
  "56fc13483318a37a3ab66f7f", "56fc13483318a37a3ab66f7f", "56fc13483318a37a3ab66f7f"
]
function getUrl(month) {
  return `http://fleidlof.alnilam.uberspace.de/nodejs/froodle/api/v1/Tasks/${months[month]}.md?shared=true`;
}