const fs = require('fs');
const path = require('path')
let myFileMd = '../README.md';


// //opc 1
const readFileMd = (myFileMd)=>{
  console.log('inicio')
  fs.readFile(myFileMd, 'utf-8', (error, file)=>{

    if(error){
      console.log(`Code: ${error.code}\n message: ${error.message}`)
    }else{
      //const lines = file.split(/\r?\n/);
      const keys =/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      const links = file.match(keys) || [];
      const filterLinks = links.map((link) => {
        return link.replace(/[)->-]$/gi, '')
      })
      console.log('soy links:', filterLinks)
      return filterLinks;
    }
    console.log('termino')
  })
}

readFileMd(myFileMd)



module.exports = {
  readFileMd: readFileMd
}









