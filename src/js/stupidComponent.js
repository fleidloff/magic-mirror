import time from "./time.js";

export default function register(name, render) {
  document.registerElement(name, {
      prototype: Object.create(
        HTMLElement.prototype, {
        createdCallback: {
          value: function() {
            const attributes = Array.prototype.slice.call(this.attributes, 0);
            const props = {};

            attributes.forEach(it => {
              props[it.name] = it.value;

              const signal = Signal.get(it.value)
              if (signal) {
                signal.onChange(changedValue => {
                  if (changedValue !== props[it.name]) {
                    props[it.name] = changedValue;
                    this.innerHTML = render(props);
                  }
                });
              }
            });

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

export const Signal = {
  counter: 0,
  signals: {},
  create(value) {
    const changeListeners = [];
    const id = this.counter++;
    this.signals[id] = {
      value,
      change(value) {
        if (typeof value !== typeof this.value) {
          throw new TypeError("Signal => types don't match");
        }
        this.value = value;
        changeListeners.forEach(cb => {
          return cb(value)
        });
      },
      onChange(cb) {
        changeListeners.push(cb);
      },
      attr: `SIGNAL::${id}`,
      every(when, cb, ...params) {
        time.every(when, cb, this, ...params);
        return this;
      }

    };

    return this.signals[id];
  },
  get(maybeSignal) {
    if (!maybeSignal) {
      return null;
    }
    if (typeof maybeSignal.split !== "function") {
      return null;
    }
    const strings = maybeSignal.split("::");
    if (strings.length === 2 && strings[0] === "SIGNAL") {
      const s = this.signals[strings[1]];
      if (typeof s !== "undefined") {
        return s;
      }
    }
    return null;
  }
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
