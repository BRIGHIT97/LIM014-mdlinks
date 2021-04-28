//const path = require('path');
const route = require('../src/index');
// const {routeExist}= require('../scr/index.js')
//1. EXISTENCIA DE LA RUTA / EXISTENCE OF THE ROUTE
describe('EXISTENCIA DE LA RUTA',() => {
  it('deberia retornar true si la Ruta Existe', () => {
    expect(route.existsSync(route)).toBe(true);
  });
  it('deberia retornar false si la Ruta NO Existe', () => {
    expect(route.existsSync(route)).toBe(false);
  });
});

// 2. RUTAS ABSOLUTAS / ABSOLUTE ROUTES
const rutaRelativa = '.';
const rutaAbsoluta = 'D:\\bri-programacion\\LABORATORIA\\3er proyecto\\LIM014-mdlinks';
describe('Obtener rutas absolutas mediante ISABSOLUTEPATH', () => {
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