

import fetch from 'node-fetch';
import { v2 } from '@google-cloud/translate';





async function traTex(text, projectId) {

  const { Translate } = v2;
  const translate = new Translate({projectId})

  if (text.length === 0) {return ''}

  var target = 'pt-BR'

  var [translation] = await translate.translate(text, target)

  //console.log(text)

  return translation
}




function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }


function gerNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function fakerName(lisRev, projectId) {

  var novoArray = []
  
  var meuArray = lisRev
  var corte = 10;

  for (var i = 0; i < meuArray.length; i = i + corte) {
    novoArray.push(meuArray.slice(i, i + corte));
  }
  



  for (let c = 0; c < novoArray.length; c++) {


    var lisRevPar = novoArray[c];


    var objLisNamFemBru = await fetch('https://story-shack-cdn-v2.glitch.me/generators/brazilian-name-generator/female?count=10')
    var objLisNamFem = await objLisNamFemBru.json()

    await delay(100 * lisRev.length >= 11 ? 10 : 1 )

    var objLisNamMasBru = await fetch('https://story-shack-cdn-v2.glitch.me/generators/brazilian-name-generator/male?count=10')
    var objLisNamMas = await objLisNamMasBru.json()

    await delay(100 * lisRev.length >= 11 ? 10 : 1)

    var objLisSobExtBru = await fetch('https://story-shack-cdn-v2.glitch.me/generators/brazilian-name-generator/female?count=10')
    var objLisSobExt = await objLisSobExtBru.json()


    for (let c = 0; c < lisRevPar.length; c++) {
        var objRevAtu = lisRevPar[c]

        var strTexTra = await traTex(objRevAtu.content, projectId)
        objRevAtu.content = strTexTra

        if ((c === lisRevPar.length-1 || c === lisRevPar.length-2) && c !== 0) {
            objRevAtu.displayName = `${objLisNamMas.data[c].name} ${objLisNamMas.data[c].lastName}${gerNum(0, 9) <= 3 ? ` ${objLisSobExt.data[c].lastName}` : ''}`
        } 
        
        else {
            objRevAtu.displayName = `${objLisNamFem.data[c].name} ${objLisNamFem.data[c].lastName}${gerNum(0, 9) <= 3 ? ` ${objLisSobExt.data[c].lastName}` : ''}`
        }

    }
    
  }

    novoArray = novoArray.flat()

    return novoArray
}


export {
    fakerName
}





