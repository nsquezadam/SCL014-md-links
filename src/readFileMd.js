const fs = require('fs');
const path = require('path')
// CLI TABLE TRABAJA CON COLORS
const Table = require('cli-table3');
const colors = require('colors');
const file = process.argv[2]
const options = process.argv[3]
// option stats
//const optS= process.argv[3]
// archivos  md de   prueba
//let myFileMd = '../README.md';
//let myFileMd = '../pruebaSearch/readme.md';
//let file = '../pruebaSearch/readme2.md';
const chalk = require('chalk');
const marked = require('marked');
const { resolve } = require('path');
const { error, Console } = require('console');
const renderer = new marked.Renderer();

const fetch = require('node-fetch');// manipula los http peticiones y respuestas 400 y 200
const { rejects } = require('assert');
// let fetch = require("fetch");
// let fetchUrl = fetch.fetchUrl;
// para desintalar paquetes NO OLVIDAR LIMPIAR npm uninstall <package name>
// leer archivos
// filtrar links por con htpp
const linksFilterMd = (linksArrayOfMd) => {
  let linksWithHttp = [];
  linksArrayOfMd.map((item) => {
    let prefix = item.link.substring(0, 4);
    if (prefix == 'http') {
      linksWithHttp.push(item);
    }
  })
  //console.log((linksWithHttp))
  return linksWithHttp;
};
// presentacion general sin opciones
const gralResultLinks = (arrayLinksOnlyHttp) => {
  const table = new Table({
    head: [colors.yellow('Link'), colors.yellow('Titulo'), colors.yellow('Ruta')],
    colWidths: [60, 50, 80]
  })

  arrayLinksOnlyHttp.map((element) => {
    table.push(
      [colors.magenta(element.link), colors.magenta(element.Titulo), colors.magenta(element.Ruta)]

    )

  })
  console.log(table.toString())


};

//lectura de archivo md
const readFileMd = (error) => {

  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) {
        reject('Error: No  se puede leer ruta', error)
      } else {

        let linksArrayOfMd = []
        renderer.link = (href, title, text) => {
          linksArrayOfMd.push({
            link: href,
            Titulo: text,
            Ruta: path.resolve(file),
          })
        }
        marked(data, {
          renderer: renderer
        })
        let arrayLinksOnlyHttp = linksFilterMd(linksArrayOfMd);
        let option = process.argv[3]
        let option2 = process.argv[4]
        //let tableLinksGral = gralResultLinks(arrayLinksOnlyHttp)
        if(option !== '--validate' && option !== '--stats'){
          gralResultLinks(arrayLinksOnlyHttp)
          return;

        }
        else if(option === '--validate'){
          validateLinks(arrayLinksOnlyHttp)
          return;

        } else if(option === '--stats' ){
          totalAndUniquesAndBrokenLinks(arrayLinksOnlyHttp)
          totalAndUniquesLinks(arrayLinksOnlyHttp)
          return;
        }
        else if(option === '--stats' && option2 === '--validate' ){
          //totalAndUniquesAndBrokenLinks(arrayLinksOnlyHttp)
          return;
        }
        //let options
        //console.log('resultado de linkfiltrados',arrayLinksOnlyHttp)
        //let tableValidatedLinks =validateLinks(arrayLinksOnlyHttp)
        //console.log(gralResultLinks(arrayLinksOnlyHttp))
        //console.log(validateLinks(arrayLinksOnlyHttp));
         //console.log(typeof(arrayLinksOnlyHttp));
         //console.log(arrayLinksOnlyHttp)
    }
    })
  })

  // .then((arrayLinksOnlyHttp) =>{
  //   return gralResultLinks(arrayLinksOnlyHttp)
  // })
  // .catch((error)=>{
  //   console.log(error)
  // })

}


const validateLinks = (arrayLinksOnlyHttp) =>{

  let validLink  =  arrayLinksOnlyHttp.map((element) => new Promise((resolve)=>{

    return fetch(element.link)

    .then((res)=>{
      // console.log('inicio<-----', res)
      if(res.status == 200){
        //console.log('link:', element.link,'revision200:',res.status, )
        element.status = colors.green(res.status);
        element.statusText = colors.green(res.statusText);
          resolve(element)
        }
      if(res.status >= 400 ){
        //console.log('link:', element.link,'revision400:',res.status)
        element.status = colors.red(res.status);
        element.statusText = colors.red('Fail');
        resolve(element)
      }})

      .catch((error)=>{
       element.status = colors.cyan('Ni code Tengo');
       element.statusText = colors.cyan('Este link no existe');
       resolve(element)
    })

  }))
  return  Promise.all(validLink)
        .then((res) => {
        const table = new Table({
          head: [colors.yellow('Ruta'), colors.yellow('Link'), colors.yellow('Status'), colors.yellow('StatusCode')],
          colWidths: [80, 50, 30,30]
        })
        res.forEach(link => {
          table.push(
            [colors.magenta((link.Ruta)),colors.magenta((link.link)),(link.statusText),(link.status)]
          );
        })
        console.log(table.toString())
      })

};



/// funciones  puras para exportar exportar
const totalAndUniquesLinks = (arrayLinksOnlyHttp) => {
  const total =  arrayLinksOnlyHttp.length
  const uniques = new Set(arrayLinksOnlyHttp.map((item) => item.link)).size;
  if(total === 0 ){
    return 'No hay Links'
  }
  const table = new Table ({
    head:[colors.yellow('Links Totales'),colors.yellow('Links Unicos')],
    colWidths: [50,50]
  })
    table.push([ colors.magenta(total), colors.magenta(uniques)])

  return console.log(table.toString())
};

const broken = (arrayLinksOnlyHttp)=>{
  let arrayValidatedBroken  = arrayLinksOnlyHttp.map((item) => new Promise((resolve) => {
    fetch(item.link)
    .then((res) => {
      if(res.status >= 400){
        return  arraybroken.push(item)

      }
      resolve
    })
    .catch((error)=>{
       console.log(erro);
    })

    }))
    return arrayValidatedBroken.length


  }
const totalAndUniquesAndBrokenLinks = (arrayLinksOnlyHttp) => {
return new Promise ((reject, resolve)=>{

if(arrayLinksOnlyHttp.length === 0 ){
      reject('No hay Links')
    }
    else{
  let broken = broken(arrayLinksOnlyHttp)

  const total =  arrayLinksOnlyHttp.length
  const uniques = new Set(arrayLinksOnlyHttp.map((item) => item.link)).size;
  resolve
  const table = new Table ({
    head:[colors.yellow('Links Totales'),colors.yellow('Links Unicos'),colors.yellow('Links Rotos')],
    colWidths: [50,50,50]
  })
    table.push([ colors.magenta(total), colors.magenta(uniques),colors.red(broken)])

   return console.log(table.toString())

    }

  })


  }








 //readFileMd('file')






module.exports = {
  readFileMd,


}











