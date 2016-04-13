import register, { getSignal } from "../stupidComponent.js";

register("s-list", ({ items, render, item, innerHTML }) => {
  const element = innerHTML || item;
  items = (typeof items.push === "function") ? items : [items]; 
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
