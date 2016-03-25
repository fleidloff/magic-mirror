export default {
  every(when, cb, ...params) {
    const i = setInterval(() => {
      cb(...params);
    }, when);
    return cb(...params);
  },
  second: 1000,
  minute: 1000*60,
  hour: 1000*60*60,
  day: 1000*60*60*24
};
