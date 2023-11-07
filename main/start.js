import scrape from '../files/main.js';
import { utils, writeFile } from 'xlsx';


//
//
//
//     ____           _  __ __                ____            _               
//    |  _ \  ___ ___| |/ // _|_ __ ___  ___ |  _ \ _____   _(_) _____      __
//    | | | |/ _ \_  / ' /| |_| '__/ _ \/ _ \| |_) / _ \ \ / / |/ _ \ \ /\ / /
//    | |_| |  __// /| . \|  _| | |  __/  __/|  _ <  __/\ V /| |  __/\ V  V / 
//    |____/ \___/___|_|\_\_| |_|  \___|\___ |_| \_\___| \_/ |_|\___| \_/\_/ 
//    
//
//  ---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
//  
//    Bem Vindo ao DesKfree Reviews! Acabou de Ganhar Infinitos Reviews Para Exportar e Filtrar Da Aliexpress De Forma Gratuita! 
//    Capitalismo é Até Importante Mas Opções Gratuitas ou Mais Baratas Devem Existir Para Otimizar A Desigualdade :)
//  
//  ---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
//







// Configuração

var strIdPro = '1005005750030125'  // Digite o ID do Produto Que Fica Na Aliexpress: || '1005004798428996'

var numMaxAva = 17  // Digite o Número Máximo de Reviews Que Você Deseja:

var strCriAvaFak = 'Não'  // Deseja Chegar ao Número Maximo De Reviews Criando Reviews Fakes?

var objCriAvaFak = {  // Escolha A Porcentagem De Chance de Ser Criado Cada Nota:
  est_5: {por: 80},  // 85 ou 90
  est_4: {por: 15},  // 10 ou 15
  est_3: {por: 5},  // 2 ou 5
  est_2: {por: 0},  // 0 ou 1
  est_1: {por: 0},  // 0 ou 1
}

var strNomProNor = 'Protetor Para Banho Evita Sabão Nos Olhos'  //  Digite o Nome Do Produto Assim Como Esta no Titulo da Trustoo, Ex: 'Protetor Para Banho Evita Sabão Nos Olhos'

var strNomProBru = null  //  Digite o Nome Do Produto Formatado Assim Como o Trustoo Reviews Pede, Ex: 'protetor-para-banho-evita-sabao-nos-olhos'

var strSelFil = 'Tudo'  // Selecione Um Filtro: 'Tudo' ou 'Basico' ou 'Exigente'. OBS: Tambem é Possivel Criar Novos Filtros

var strPasExc = './main/planilhas/'  // Escolha a Pasta Onde Vai Ser Salvo a Planilha. OBS: Deve Se Criar a Pasta Antes de Digita-la Aqui

var projectId = 'traduzir-feedback'  // Nome do Projeto no Google Cloud








// Filtro (Manda Tudo)

if (strSelFil === 'Tudo') {

    var strFilApeBra = 'Não'  // Quer Reviews Apenas do Brasil? | 'Sim' ou 'Não'
    
    var strFilApeFot = 'Não'  // Quer Reviews Apenas com Foto? | 'Sim' ou 'Não'
    
    var strFilApeSemFot = 'Não'  // Quer Limitar a Quantidade de Reviews, Que Tenham Apenas Foto? | 'Sim' ou 'Não'
    
    var numMaxApeFot = Infinity  // Qual Deve ser a Quantidade Máxima De Reviews Com Foto? | 0 ou 368 ou Infinity
    
    var lisFilTirCom = []  // Quer Excluir as Imagens E os Comentarios De Reviews com Nota Baixa? | [] ou [1, 2] ou [1, 2, 3]
    
    var strFilResEst = 'Não'  // Quer Restringir a Quantidade de Cada Review Pela Nota? | 'Sim' ou 'Não'
    
    var objFilApeEst = {  // Escolha Quantidade Maximo de Cada Nota Que Deseja:
      est_5: {max: Infinity},  // 347 ou Infinity
      est_4: {max: Infinity},  // 236 ou Infinity
      est_3: {max: Infinity},  // 12 ou Infinity
      est_2: {max: Infinity},  // 8 ou Infinity
      est_1: {max: Infinity},  // 5 ou Infinity
    }
}
    







// Filtro (Só o Básico)

if (strSelFil === 'Basico') {

  var strFilApeBra = 'Sim'  // Quer Reviews Apenas do Brasil? | 'Sim' ou 'Não'

  var strFilApeFot = 'Não'  // Quer Reviews Apenas com Foto? | 'Sim' ou 'Não'

  var strFilApeSemFot = 'Não'  // Quer Limitar a Quantidade de Reviews, Que Tenham Apenas Foto? | 'Sim' ou 'Não'

  var numMaxApeFot = Infinity  // Qual Deve ser a Quantidade Máxima De Reviews Com Foto? | 0 ou 368 ou Infinity

  var lisFilTirCom = [1, 2, 3]  // Quer Excluir as Imagens E os Comentarios Dos Reviews com Nota Baixa? | [] ou [1, 2] ou [1, 2, 3]

  var strFilResEst = 'Não'  // Quer Restringir a Quantidade de Cada Review Pela Nota? | 'Sim' ou 'Não'

  var objFilApeEst = {  // Escolha Quantidade Maximo de Cada Nota Que Deseja:
    est_5: {max: Infinity},  // 347 ou Infinity
    est_4: {max: Infinity},  // 236 ou Infinity
    est_3: {max: Infinity},  // 12 ou Infinity
    est_2: {max: Infinity},  // 8 ou Infinity
    est_1: {max: Infinity},  // 5 ou Infinity
  }
}







// Filtro (Muita Exigência)

if (strSelFil === 'Exigente') {

  var strFilApeBra = 'Não'  // Quer Reviews Apenas do Brasil? | 'Sim' ou 'Não'

  var strFilApeFot = 'Sim'  // Quer Reviews Apenas com Foto? | 'Sim' ou 'Não'

  var strFilApeSemFot = 'Sim'  // Quer Limitar a Quantidade de Reviews, Que Tenham Apenas Foto? | 'Sim' ou 'Não'

  var numMaxApeFot = 97  // Qual Deve ser a Quantidade Máxima De Reviews Com Foto? | 0 ou 368 ou Infinity

  var lisFilTirCom = [1, 2, 3]  // Quer Excluir as Imagens E os Comentarios De Reviews com Nota Baixa? | [] ou [1, 2] ou [1, 2, 3]

  var strFilResEst = 'Sim'  // Quer Restringir a Quantidade de Cada Review Pela Nota? | 'Sim' ou 'Não'

  var objFilApeEst = {  // Escolha Quantidade Maximo de Cada Nota Que Deseja:
    est_5: {max: Infinity},  // 347 ou Infinity
    est_4: {max: Infinity},  // 236 ou Infinity
    est_3: {max: 12},  // 12 ou Infinity
    est_2: {max: 8},  // 8 ou Infinity
    est_1: {max: 3},  // 5 ou Infinity
  }
}












// Aparti Daqui é Código:

console.log(``)
console.log(` > Aguarde... `)
console.log(` > Pesquisa Sendo Feita Pelo Produto de ID: ${strIdPro} `)
console.log(``)

var product = scrape(strIdPro, numMaxAva, strCriAvaFak, objCriAvaFak, projectId)

product.then(res => {
  var lisRev = res.feedback

  //console.log(lisRev)
  
  var strNomPro = (strNomProBru === '' || strNomProBru === null) ? strNomProNor.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s]/gi, '').replaceAll(' ','-') : strNomProBru

  objFilApeEst.est_5.c = 0
  objFilApeEst.est_4.c = 0
  objFilApeEst.est_3.c = 0
  objFilApeEst.est_2.c = 0
  objFilApeEst.est_1.c = 0
  
  var numAddApeFot = 0
  var booApeSemFot = false
  var numGuaOndPar = 0

  var lisExcFin = []
  
  for (var c = 0; c < lisRev.length; c++) {

    var objRev = lisRev[c]

    if (strFilApeBra === 'Sim' && !(objRev.country === 'BR')) {  // Permite Passar Apenas do Brasil
      continue
    }


    // Se Utrapassar Limite De Reviews Com Foto
    if (strFilApeSemFot === 'Sim' && numAddApeFot >= numMaxApeFot && !booApeSemFot) {  // Volta Para o Começo E Adiciona Reviews Apenas Sem Foto
      console.log()
      numGuaOndPar = c
      c = 0
      booApeSemFot = true
      continue
    }

    if (strFilApeFot === 'Sim' && !(objRev.photos.length >= 1) && !booApeSemFot) {  // Permite Passar Apenas com Foto
      continue
    } else {numAddApeFot++}

    if (objRev.photos.length >= 1 && booApeSemFot) {  // Permite Passar Apenas Quem Não Tem Foto
      if (numGuaOndPar <= c) {
        objRev.photos = []
      } else {continue}
    }
  
    if (lisFilTirCom.length >= 1) {  // Excluir Imagens E Comentarios De Avaliação Baixa
        if (lisFilTirCom.indexOf(objRev.rating) >= 0) {
          objRev.content = ''
          objRev.photos = []
        }
    }
  
    switch (objRev.rating) {  // Executa Se Quiser Restringir Estrelas
      case 5:
        //         10            >=            10
        if (objFilApeEst.est_5.c >= objFilApeEst.est_5.max && strFilResEst === 'Sim') {continue}
        objFilApeEst.est_5.c++
        break
      case 4:
        if (objFilApeEst.est_4.c >= objFilApeEst.est_4.max && strFilResEst === 'Sim') {continue}
        objFilApeEst.est_4.c++
        break
      case 3:
        if (objFilApeEst.est_3.c >= objFilApeEst.est_3.max && strFilResEst === 'Sim') {continue}
        objFilApeEst.est_3.c++
        break
      case 2:
        if (objFilApeEst.est_2.c >= objFilApeEst.est_2.max && strFilResEst === 'Sim') {continue}
        objFilApeEst.est_2.c++
        break
      case 1:
        if (objFilApeEst.est_1.c >= objFilApeEst.est_1.max && strFilResEst === 'Sim') {continue}
        objFilApeEst.est_1.c++
        break
    }
  
  
    var newData = (new Date)
    var strDatHoj = `${newData.getFullYear()}-${`${newData.getMonth()+1}`.length <= 1 ? `0${newData.getMonth()+1}` : `${newData.getMonth()+1}`}-${`${newData.getDate()}`.length <= 1 ? `0${newData.getDate()}` : `${newData.getDate()}`}`
    

    var objRevAtu = { 
      ['product_handle*']: strNomPro, 
      ['rating*']: objRev.rating.toString(), 
      ['author*']: objRev.displayName || 'Anônimo', 
      ['content*']: objRev.content || '', 
      ['author_country']: 'BR',
      ['author_email']: '', 
      ['commented_at*']: strDatHoj, 
      ['reply']: '', 
      ['reply_at']: '', 
      ['verify_purchase']: 'yes', 
      ['feature']: 'no', 
      ['photo_url_1']: objRev.photos[0] || '', 
      ['photo_url_2']: objRev.photos[1] || '', 
      ['photo_url_3']: objRev.photos[2] || '', 
      ['photo_url_4']: objRev.photos[3] || '', 
      ['photo_url_5']: objRev.photos[4] || '', 
      ['video_url']: ''
    }
  
    //console.log(objRevAtu)
  
    lisExcFin.push(objRevAtu)
  }

  console.log(``)
  console.log(` > -------------------------------- < `)
  console.log(``)
  console.log(` > Total 5 Estrelas Add: ${objFilApeEst.est_5.c} `)
  console.log(` > Total 4 Estrelas Add: ${objFilApeEst.est_4.c} `)
  console.log(` > Total 3 Estrelas Add: ${objFilApeEst.est_3.c} `)
  console.log(` > Total 2 Estrelas Add: ${objFilApeEst.est_2.c} `)
  console.log(` > Total 1 Estrelas Add: ${objFilApeEst.est_1.c} `)
  console.log(``)
  console.log(` > -------------------------------- <`)
  console.log(``)
  console.log(``)
  console.log(` > Média De Estrelas: ${((objFilApeEst.est_5.c*5+objFilApeEst.est_4.c*4+objFilApeEst.est_3.c*3+objFilApeEst.est_2.c*2+objFilApeEst.est_1.c*1) / (objFilApeEst.est_5.c+objFilApeEst.est_4.c+objFilApeEst.est_3.c+objFilApeEst.est_2.c+objFilApeEst.est_1.c)).toFixed(2)} `)
  console.log(` > Total De Avaliações: ${lisRev.length} `)
  console.log(` > Total De Avaliações Após Filtro: ${lisExcFin.length} `)

  var newData = (new Date)
  var strNomProRes = strNomPro.slice(0, strNomPro.indexOf('-', strNomPro.indexOf('-', strNomPro.indexOf('-', strNomPro.indexOf('-')+1))+1))
  var strDatHorHoj = `${newData.getFullYear()}-${`${newData.getMonth()+1}`.length <= 1 ? `0${newData.getMonth()+1}` : `${newData.getMonth()+1}`}-${`${newData.getDate()}`.length <= 1 ? `0${newData.getDate()}` : `${newData.getDate()}`}_${newData.toLocaleTimeString().replaceAll(':', '-')}`
  
  const workSheet = utils.json_to_sheet(lisExcFin)
  const workBook = utils.book_new()
  utils.book_append_sheet(workBook, workSheet, 'Sheet1')

  writeFile(workBook, `${strPasExc.slice(-1) !== '/' ? `${strPasExc}/` : strPasExc}${strNomProRes}_${strDatHorHoj}.xlsx`)


  console.log(``)
  console.log(``)
  console.log(` > Planilha Gerada e Armazenada Com Sucesso! :) `)
  console.log(` > Caminho do Arquivo: `)
  console.log(``)
  console.log(` > ${strPasExc.slice(-1) !== '/' ? `${strPasExc}/` : strPasExc}${strNomProRes}_${strDatHorHoj}.xlsx `)
  console.log(``)


})








