export default function register(name, render) {
  document.registerElement(name, {
      prototype: Object.create(
        HTMLElement.prototype, {
        createdCallback: {
          value: function() {
            const props = deProps(this.getAttribute("props") || "{}");
            this.innerHTML = render(props);
          }},
          detachedCallback: {value: function() {
            const childNodes = Array.prototype.slice.call(this.childNodes, 0); 
            childNodes.forEach(c => {
              c.remove();
            });
          }},
      })
    }
  );
}

export function props(p) {
  return Object.assign({}, p, {
    toString() {
      return JSON.stringify(this).split(" ").join("___");
    }
  });
}

export function deProps(p) {
  return JSON.parse(p.split("___").join(" "));
}

export function render(element, html) {
  return new Promise((resolve, reject) => {
    element.innerHTML = html;
    const r = element.childNodes[0];
    if (!r) {
      return reject();
    }
    r.oneWithClass = c => r.getElementsByClassName(c)[0];
    resolve(r);
  });
}
