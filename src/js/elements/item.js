import register, { getSignal } from "../stupidComponent.js";

register("s-item", ({ item }) => {
  return `<div>${item}</div>`;
});
