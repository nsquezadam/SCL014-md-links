//const  path = require('path');
const fs = require('fs')
// readri  lees los archivos del directorio  parametro ruta   y cb
console.log('inicio')
fs.readdir('../SCL014-MD-LINKS/src', (error, files)=>{
if(error) {
  //throw error;
  console.log('hay un error');
  console.log(error);
 // console.clear()


}
console.log('termino')
console.log(files);
})


// path parse('path')  toma un cade del fichero y la tranforma en un objeto para interactuar
//  nombre   extension
// filename  nos muestra la ubicaion
//console.log(__filename);

// let pathObj = path.parse(__filename);
// console.log(pathObj);
// console.log(pathObj.ext);
// console.log(pathObj.name);


// {
//   root: '/',
//   dir: '/Users/Naty/Documents/JAVASCRIPT/PROYECTOS 2020/MDLinks/SCL014-md-links',
//   base: 'moduleLink.js',
//   ext: '.js',
//   name: 'moduleLink'
// }
