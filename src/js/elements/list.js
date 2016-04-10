import register, { getSignal } from "../stupidComponent.js";

register("s-list", ({ items, render, item }) => {
  if (typeof item === "string") {
    try {
      items = JSON.parse(items);
    } catch (e) {
      items = [items]; 
    }
  }
  if (render) {
    return items.map(render).join("");
  }
  else if (item) {
    return items.map(it => {
      return `<span>${item.replace("{item}", it)}</span>`;
    }).join("");
  }

  else return items.join("");
});
