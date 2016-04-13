import register, { getSignal } from "../stupidComponent.js";

register("s-list", ({ items, render, item, innerHTML }) => {
  const element = innerHTML || item;
  if (typeof element === "string") {
    try {
      items = JSON.parse(items);
    } catch (e) {
      items = [items]; 
    }
  }
  if (render) {
    return items.map(render).join("");
  }
  else if (element) {
    return items.map(it => {
      return `${element.replace("{item}", it)}`;
    }).join("");
  }

  else return items.join("");
});
