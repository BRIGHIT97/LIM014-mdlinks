const route = require('./index.js');
const chalk = require('chalk');
const { validateLinks } = require('./validate');
const { getAbsoluteRoute } = require('./index');
const { getLinksMd} = require('./index');

const mdLinks = (route, options) => {
  const promise = new Promise((resolve, reject) => {
    // Primero tenemos que verificar que tiene  que ser una ruta absoluta
    const verifiedRoute = getAbsoluteRoute(route);
    if (fs.existsSync(verifiedRoute) === false) {
      reject(new Error(`${chalk.redBright('RUTA INVÁLIDA')}`));
    } else {
      if (options.validate) { resolve(validateLinks(getLinksMd(verifiedRoute))); }

      if (!options.validate) { resolve(getLinksMd(verifiedRoute)); }
    }
  });
  return promise;
};
mdLinks(route, { validate: false })
.then((res) => console.log(res))
.catch(err => console.log(err));

module.exports = { mdLinks };