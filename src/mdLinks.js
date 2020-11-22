const readFileMd = require('./readFileMd')

const process = require('process');
// archivo
const file = process.argv[2]
// opcion validate
//const optV = process.argv[3]
// option stats
const option= process.argv[3]
const option2 = process.argv[4]

const colors = require('colors');
const path = require('path');


//mdLinks(path, options);
//cli md-links <path-to-file> [options]
//
// path: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - current working directory).
// options: Un objeto con las siguientes propiedades:
//     validate: Booleano que determina si se desea validar los links encontrados.
//const myFileMd = process.argv[2]
//readFileMd(myFileMd);

// leer.readFileMd()

const cli = (file, option) => {
  return new Promise((reject, resolve) =>{

if (path.extname(file) != '.md'){
  console.log(colors.red('No es un archivo Markdown\nRevisar Nombre y Extension' ))
   reject
}
else{
  console.log(colors.blue('Leyendo...\nLinks Encontrados'))
  if(option !== '--validate'){

readFileMd.readFileMd(file)
  }
   else if(option === '--validate' ){
    readFileMd.readFileMd(file)
  //   readFileAndValidate.readFileAndValidate(file)
   }
   else if(option === '--stats' ){
    readFileMd.readFileMd(file)
  //   readFileAndValidate.readFileAndValidate(file)
   }else if(option === '--stats' && option2 === '--validate'){
    readFileMd.readFileMd(file)
  //   readFileAndValidate.readFileAndValidate(file)
   }

 resolve
}
})

  }


//node  mdLinks.js ../readme2.md
//node  mdLinks.js ../README.md
 cli(file, option, option2);
