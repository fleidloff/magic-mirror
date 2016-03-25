import register, { render, props as p } from "js/stupidComponent.js";

register("s-notes", ({ notes }) => `
  <div>${markdown.toHTML(notes)}</div>
`);

export function getFroodleNotes() {
  return fetch("http://fleidlof.alnilam.uberspace.de/nodejs/froodle/api/v1/Tasks/56f07d98b5dd41487146d4c2.md?shared=true")
    .then(res => res.json())
    .then(mapNotes);
}

function mapNotes(json) {
  return json.froodle;
}


