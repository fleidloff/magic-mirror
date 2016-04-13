import time from "./time.js";

export default function register(name, render) {
  document.registerElement(name, {
      prototype: Object.create(
        HTMLBRElement.prototype, {
        createdCallback: {
          value: function() {
            const attributes = Array.prototype.slice.call(this.attributes, 0);
            const props = {};
            attributes.push({
              name: "innerHTML",
              value: this.innerHTML
            });
            attributes.forEach(it => {
              props[it.name] = it.value;

              const signal = Signal.from(it.value)
              if (signal.isSignal) {
                props[it.name] = signal.value;
                signal.onChange(changedValue => {
                  if (changedValue !== props[it.name]) {
                    props[it.name] = changedValue;
                    const newHTML = Signal.allResolved(props) ? render(props) : "";
                    if (newHTML !== this.innerHTML) {
                      this.innerHTML = newHTML;
                    }
                  }
                });
              }
            });
            this.innerHTML = Signal.allResolved(props) ? render(props) : this.innerHTML;
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

export function getSignal(id, value) {
  return Signal.get(id, value);
}

const Signal = {
  UNRESOLVED: Symbol("unresolved"),
  allResolved(signals) {
    return Object.keys(signals).filter(k => signals[k] === Signal.UNRESOLVED).length === 0;
  },
  counter: 0,
  signals: {},
  create(id, value) {
    const changeListeners = [];
    this.signals[id] = {
      isSignal: true,
      value: value || Signal.UNRESOLVED,
      id,
      set(value) {
        if (typeof value !== typeof this.value && typeof this.value !== "symbol") {
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
  id() {
    while(this.signals[this.counter]) {
      this.counter++;
    }
    return this.counter;
  },
  get(id, value) {
    const s = this.signals[id];
    if (typeof s !== "undefined") {
      if (value) {
        s.set(value);
      }
      return s;
    } else {
      return this.create(id || this.id(), value);
    }
  },
  from(maybeSignal) {
    if (!maybeSignal) {
      return maybeSignal;
    }
    if (typeof maybeSignal.split !== "function") {
      return maybeSignal;
    }
    const strings = maybeSignal.split("::");
    if (strings.length === 2 && strings[0] === "SIGNAL") {
      return this.get(strings[1]);  
    }
    return maybeSignal;
  }
}
