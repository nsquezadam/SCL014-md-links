const fs = require('fs');
const { resolve } = require('path');
const path = require('path')
const chalk = require('chalk');

let myPath = '../';
//let myPath = './pruebaSearch';
//let myPath ='../../SCL014-MD-LINKS'
// tranformacion y arreglo de ruta
//console.log(path.Relative('../SCL014-MD-LINKS'))

//const myPath = path.isAbsolute('../SCL014-MD-LINKS');
//let  myPath = ('../SCL014-MD-LINKS');
//let myPath = '/Users/Naty/Documents/JAVASCRIPT/PROYECTOS 2020/MDLinks/SCL014-md-links/SCL014-MD-LINKS';

const fixePathToAbsolute = path.normalize(path.resolve(myPath));
console.log(fixePathToAbsolute)



// me trae los  archivos md solo me  trae archivos  con rutas   correctas  <------------revisar historia  ultima
const fileMD = (fixePathToAbsolute)=> {
   fs.readdir(fixePathToAbsolute, (err, files)=>{
  if(err){
    console.error(`Code: ${err.code}\n message: ${err.message}`)
  }else{
  files.forEach(file =>{
    if(file.includes('.md')){
      console.log(file)
      return file
    }
  })
}
})}

fileMD();


