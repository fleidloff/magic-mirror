import register from "js/stupidComponent.js";

register("s-time", ({ timestamp }) => `
  <div>Uhrzeit: ${new Date(timestamp)}</div>
`);
