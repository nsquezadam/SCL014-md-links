#!/usr/bin/env node
let fetch = require("fetch");
let fetchUrl = fetch.fetchUrl;
let urls = ["https://github.com/dasdr43g4g45", "https://github.com/dasdr43g4g45", "https://github.com/dasdr43g4g45"];
/* Promesa que devuelve los meta.status si es que cumplen cierta condición */
const getUrlsWithStatus404 = (url) => {
  return new Promise((resolve, reject) => {
    fetchUrl(url, (error, meta, body) => {
        if(error) {
          reject(error);
        } else {
          if(meta.status === 404) {
            resolve(meta.status)
          }
        }
    });
  });
}
/* Lógica clasica (antes de que conociéramos las promesas) */
const getStatusFromUrlArray = (urlArray) => {
  let statusCounter = 0;
  for (let i = 0; i < urlArray.length; i++) {
    getUrlsWithStatus404(urlArray[i])
      .then(res => {
        // console.log("El status del sitio web", urlArray[i], "es:", res);
        if(res === 404) {
          statusCounter += 1;
        }
      })
  }
  // console.log("La cantidad de urls con status distinto a 200 es:", statusCounter);
}
/* Esta es la versión que no funciona */
getStatusFromUrlArray(urls);
/* Esta es la versión que sí funciona */
Promise.all(urls.map(url => getUrlsWithStatus404(url).catch(err => 'broken')))
  .then(results => {
    let statsObject = {
      total: 15,
      unique: 14,
      broken: results.length
    }
    // console.log("La cantidad de urls con status distinto a 200 es:", results.length);
    console.log(statsObject);
});


const validateHref = (links) => {
  return new Promise((resolve, reject) => {
    let validated = [];
    links.forEach(link => {
      validated.push(
        fetch(link.href)
        .then(response => {
          if (response.status !== 200) {
            return {
              ...link,
              status: `No soy tan malito ${response.status}`
            }
          }
          return {
            ...link,
            status: (colors.green('√ Ok ') + response.status)
          }
        })
        .catch((error) => {
            return {
              ...link,
              status: `Fail 404, ${error.message}`
            }
        })
      )
    })
    resolve(Promise.all(validated)); //equivale a los resultados de todas las promesas
  })
  .then(res =>{
    const table = new Table({
    head: [colors.green('LINK'), colors.green('STATUS')] , colWidths: [100, 20]
    });

    res.forEach(link => {
    table.push(
        [colors.cyan(link.href), link.status]
      );
    })
     console.log(table.toString())
    })

}
