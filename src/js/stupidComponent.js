export default function register(name, render) {
  document.registerElement(name, {
      prototype: Object.create(
        HTMLElement.prototype, {
        createdCallback: {
          value: function() {
            const props = deProps(this.getAttribute("props") || "{}");
            if (props.isSignal) {
              const signal = Signal.get(props.id)
              this.innerHTML = render(signal.value);
              signal.onChange(value => {
                // todo: update only if value changed
                this.innerHTML = render(value);
              });
            } else {
              this.innerHTML = render(props);
            }
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

export const Signal = {
  counter: 0,
  signals: {},
  create(value) {
    const changeListeners = [];
    const id = this.counter++;
    this.signals[id] = {
      value,
      change(value) {
        this.value = value;
        changeListeners.forEach(cb => {
          return cb(value)
        });
      },
      onChange(cb) {
        changeListeners.push(cb);
      },
      attr: {
        id,
        isSignal: true,
        toString() {
          return JSON.stringify(this).split(" ").join("___");
        } 
      }
    };

    return this.signals[id];

  },
  get(id) {
    return this.signals[id];
  }
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
