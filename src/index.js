module.exports = () => {
  // ...
};
const path = require('path');
const fs = require ('fs');
const marked = require('marked');
const { Console } = require('console');

const route = "README.md";
// 1. EXISTENCIA DE LA RUTA / EXISTENCE OF THE ROUTE
  const routeExist = (route) => {
  //   console.log(fs.existsSync(route));
    if (fs.existsSync(route)) {
      // console.log ('la ruta existe')
    return true;
  }
      // console.log('la ruta no existe')
  return false;
  }
  routeExist(route)
//

  // console.log(routeExist('./README.md')) ----....----

//2. RUTAS ABSOLUTAS / ABSOLUTE ROUTES
  const getAbsoluteRoute = (route) => {
    if (path.isAbsolute(route)) {
  //     console.log('La ruta es absoluta: ')
     return route;
    }
  //     console.log('La ruta fue convertida a absoluta: ')
     return path.resolve(route);
    }
      // console.log(getAbsoluteRoute(route))
//

    // // const getAbsoluteRoute = (route) => (path.isAbsolute(route) ? route : path.resolve(route));
    // //console.log(getAbsoluteRoute('./README.md'));

 // 3. VERIFICACIÓN DE ARCHIVOS  / 
  const isFile = (route) => fs.statSync(route).isFile();
  // console.log(isFile(route));

      // // const checkFile = (route) => {
      // //   const stats = fs.lstatSync(route);
      // //   const isFile = stats.isFile();
        
      // //   return isFile;
      // // }
      // // // console.log(checkFile(route))

   //3.1 VERIFICAR SI ES UN DIRECTORIO
        const checkDirectory = (route) => fs.statSync(route).isDirectory();
        // // console.log(isDirectory(route));

   // 3.2 SI ES DIRECTORIO, LISTAR A TODO LOS ARCHIVOS
        const showAllFiles = (route) => {
          let arrFiles = [];
          if (isFile(route)) {
            arrFiles.push(route);
          } else {
            const readDirectory = fs.readdirSync(route);
            readDirectory.forEach((file) => {
              const pathFile = path.join(route, file);
              arrFiles = arrFiles.concat(showAllFiles(pathFile));
            });
          }
          return arrFiles;
        };
          const cwd = process.cwd();
//           console.log(showAllFiles(path.join(cwd, route)));

// 4. RECONOCER SI EL ARCHIVOS TIENE EXTENSIÓN .MD

  const isMdFile = (route) => (path.extname(route) === '.md');
  // console.log(isMdFile(route));

  // FUNCION QUE BUSCA LOS ARCHIVOS MD
  const getMdFiles = (routeFile) => {
    let arrayMdFile = [];
    const route = getAbsoluteRoute(routeFile);
    if (isFile(route)) {
      if (isMdFile(route)) {
        arrayMdFile.push(route);
      }
    } else {
      const arrayOfFiles = fs.readdirSync(route);
      arrayOfFiles.forEach((file) => {
        const arrayMd = getMdFiles(path.join(route, file));
        arrayMdFile = arrayMdFile.concat(arrayMd);
      });
    }
    return arrayMdFile;
  };
  // console.log(getMdFiles(route));

  //OBTENER LINKS DE ARCHIVOS MD
  const getLinksMd = (route) => {
    const arrayMdFiles = getMdFiles(route);
    const renderer = new marked.Renderer();
    const arrayofLinks = [];
    arrayMdFiles.forEach((filePath) => {
      const file = fs.readFileSync(filePath, 'utf8');
      renderer.link = (urlFile, _, urlText) => {
        arrayofLinks.push({
          href: urlFile,
          text: urlText,
          path: filePath,
        });
      };
      marked(file, { renderer });
      // console.log('File', marked(file.toString(), { renderer }));
    });
    return arrayofLinks;
  };
  console.log(getLinksMd(route));


  module.exports = {
    
    routeExist,
    getAbsoluteRoute,
    isFile,
    checkDirectory,
    showAllFiles,
    isMdFile,
    getMdFiles,
    getLinksMd,
  };