// const path = require('path');
const fs = require('fs');
const methods = require('../src/index.js');

const routePath = 'README.md';
const routePath1 = 'README1.md';
// const {routeExist}= require('../scr/index.js')
// 1. EXISTENCIA DE LA RUTA / EXISTENCE OF THE ROUTE
describe('EXISTENCIA DE LA RUTA', () => {
  it('deberia retornar true si la Ruta Existe', () => {
    expect(fs.existsSync(routePath)).toBe(true);
  });
  it('deberia retornar false si la Ruta NO Existe', () => {
    expect(fs.existsSync(routePath1)).toBe(false);
  });
});
// 2. RUTAS ABSOLUTAS / ABSOLUTE ROUTES
const rutaRelativa = '.';
const rutaAbsoluta = `${process.cwd()}`;
describe('Obtener rutas absolutas mediante ISABSOLUTEPATH', () => {
  it('Debería ser una función', () => {
    expect(typeof methods.getAbsoluteRoute).toBe('function');
  });
  it('Debería convertir ruta relativa a ruta absoluta', () => {
    expect(methods.getAbsoluteRoute(rutaRelativa)).toEqual(rutaAbsoluta);
  });
  it('Debería retornar ruta absoluta ', () => {
    expect(methods.getAbsoluteRoute(rutaAbsoluta)).toEqual(`${process.cwd()}`);
  });
});
