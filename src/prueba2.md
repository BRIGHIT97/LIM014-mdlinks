// CONVERTIR RUTA RELATIVA EN RUTA ABSOLUTA
const rutaRelativa = '.';
const rutaAbsoluta = 'D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks';
describe('FUNCIÓN ISABSOLUTEPATH', () => {
  it('Debería ser una función', () => {
    expect(typeof isAbsolutePath).toBe('function');
  });
  it('Debería convertir ruta relativa a ruta absoluta', () => {
    expect(isAbsolutePath(rutaRelativa)).toEqual(rutaAbsoluta);
  });
  it('Debería retornar ruta absoluta ', () => {
    expect(isAbsolutePath(rutaAbsoluta)).toEqual('D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks');
  });
});
// COMPROBAR SI LA RUTA ES UN ARCHIVO
// const input = '';
describe('FUNCIÓN VER SOLO ARCHIVOS', () => {
  it('Debería ser una función', () => {
    expect(typeof checkFile).toBe('function');
  });
  it('Debería retornar true si es un archivo', () => {
    expect(checkFile('D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks\\README.md')).toBe(true);
  });
});
describe('FUNCIÓN MOSTRAR TODO LOS ARCHIVOS', () => {
  it('Debería ser una función', () => {
    expect(typeof showAllFiles).toBe('function');
  });
  it('Debería retornar true si es un archivo', () => {
    const outputFiles = [
      'D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks\\src\\index.js',
      'D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks\src\\\prueba1.md',
      'D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks\\src\\prueba2.md',
    ];
    expect(showAllFiles(path.join(cwd, 'src'))).toEqual(outputFiles);
  });
});
describe('FUNCIÓN FILTRAR TODO LOS ARCHIVOS CON EXTENSIÓN .MD', () => {
  it('Debería ser una función', () => {
    expect(typeof filterFileMd).toBe('function');
  });
  it('Debería retornar true si es un archivo con extensión .md', () => {
    const arrFilterMd = [
      'D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks\src\\\prueba1.md',
      'D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks\\src\\prueba2.md',
    ];
    expect(filterFileMd('src')).toEqual(arrFilterMd);
  });
});

// const mdLinks = require('../');


// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });


mdLinks

const mdLinks = (rute, option = { validate: false }) => new Promise((resolve, reject) => {
  const rutaAbsoluta = pathIsAbsolute(rute);
  const error = 'ERROR';
  const validatePath = validateIfPathExists(rutaAbsoluta);
  if (validatePath === true) {
    if (isDir(rutaAbsoluta) === true) {
      const dataMd = readDir(rutaAbsoluta);
      if (option.validate === false) {
        resolve(getLinks(dataMd));
      } else {
        const links = Promise.all(linksValidate(dataMd));// validamos si el link es válido
        resolve(links).flat();
      }
    } else if (extMD(rutaAbsoluta) === '.md') {
      if (option.validate === false) {
        const saveLinks = getLinks([rutaAbsoluta]);
        resolve(saveLinks);
      } else {
        const links = Promise.all(linksValidate([rutaAbsoluta]));
        resolve(links);
      }
    }
  } reject(error);
});
