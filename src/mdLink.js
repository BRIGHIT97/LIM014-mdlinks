const route = require('./index.js');
const validate = require('./validate.js');

const mdLinks = (inputPath, options = { validate: false }) => new Promise((resolve) => {
  if (route.isValidRoute(inputPath)) {
    if (options.validate === true) {
      resolve(validate.validateLinks(inputPath));
    } else {
      resolve(route.getLinksMd(inputPath));
    }
  }
});

// console.log(mdLinks(route, { validate: true }));
// mdLinks(route, { validate: false }).then((res) => console.log(res));

module.exports = { mdLinks };