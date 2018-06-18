function cbToPromise(func) {
  return (...args) =>
    new Promise((resolve, reject) => {
      const callback = (err, data) => (err ? reject(err) : resolve(data));
      func.apply(this, [...args, callback]);
    });
}

function mwPromise(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { cbToPromise, mwPromise };
