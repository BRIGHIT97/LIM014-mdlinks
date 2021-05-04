const fetch = require('node-fetch');
const routes = require('./index.js');

const validateLinks = (route) => {
  const arrayLinks = routes.getLinksMd(route);
  const arrLinksPromises = arrayLinks.map((element) => fetch(element.href)// devuelve una promesa
    .then((res) => {
      if (res.status >= 200 && res.status < 400) {
        return {
          ...element,
          status: res.status,
          statusText: res.statusText,
        };
      }
      return {
        ...element,
        status: res.status,
        statusText: 'FAIL',
      };
    })
    .catch(() => ({
      ...element,
      status: 'ERROR',
      statusText: 'FAIL',
    })));

  return Promise.all(arrLinksPromises);
};

//  validateLinks('src/prueba1.md').then((res) => console.log(res));

module.exports = {
  validateLinks,
};