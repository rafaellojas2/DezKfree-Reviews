import fetch from 'node-fetch';
import { load } from 'cheerio';
import { fakerName } from '../files/ferramentas.js';



const getFeedbackData = feedbackHtml => {
  const $ = load(feedbackHtml);
  const feedbackData = [];

  $('.feedback-list-wrap .feedback-item').each((index, element) => {
    const $elm = $(element);
    let name = $elm
      .find('.user-name')
      .text()
      .trim();

    let country = $elm
      .find('.user-country')
      .text()
      .trim();

    let ratingStyle = $elm.find('.star-view > span').attr('style');

    let rating = ratingStyle.split('width:')[1];
    rating = parseInt(rating) / 20;

    let info = {};

    $elm.find('.user-order-info > span').each((index, infoKey) => {
      const key = $(infoKey)
        .find('strong')
        .text()
        .trim();

      $(infoKey)
        .find('strong')
        .remove();

      info[key] = $(infoKey)
        .text()
        .trim();
    });

    const feedbackContent = $elm
      .find('.buyer-feedback span:first-child')
      .text()
      .trim();

    let feedbackTime = $elm
      .find('.buyer-feedback span:last-child')
      .text()
      .trim();

    feedbackTime = new Date(feedbackTime);

    let photos = [];

    $elm.find('.r-photo-list > ul > li').each((index, photo) => {
      const url = $(photo)
        .find('img')
        .attr('src');
      photos.push(url);
    });

    const data = {
      name: name,
      displayName: 'Anônimo',
      country: country,
      rating: rating,
      info: info,
      date: feedbackTime,
      content: feedbackContent,
      photos: photos
    };

    feedbackData.push(data);
  });

  return feedbackData;
};

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function gerNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function iteRan(lis) {
  return lis[Math.floor(Math.random() * lis.length)]
}

export async function get(productId, ownerMemberId, count, limitOri, strCriAvaFak, objCriAvaFak, projectId) {
  let allFeedbacks = [];

  let limitPages = Math.ceil(limitOri / 10);
  let totalPages = Math.ceil(count / 10);

  /** If totalPages are greater than 10, i.e. if reviews are > 100, limit it to 100 or 10 pages */
  var totalPagesUsavel = totalPages;
  if (totalPages > limitPages) {
    totalPagesUsavel = limitPages;
  }

  var numRet = 0;
  var numPri = true;
  console.log(``);
  for (let currentPage = 1; currentPage <= totalPagesUsavel; currentPage++) {

    if (!numPri) {
      await delay(gerNum(3500, 3600));
    }
    numPri = false;

    const feedbackUrl = `https://feedback.aliexpress.com/display/productEvaluation.htm?v=2&page=${currentPage}&currentPage=${currentPage}&productId=${productId}&ownerMemberId=${ownerMemberId}`;
    const feedbackResponse = await fetch(feedbackUrl);
    const feedbackHtml = await feedbackResponse.text();

    const data = getFeedbackData(feedbackHtml);
    //console.log(data)
    var dataNova = [];
    if (data.length >= 1) { dataNova = await fakerName(data, projectId); } // Add Nomes a Cada Item da Lista

    allFeedbacks = [...allFeedbacks, ...dataNova];



    if (dataNova.length === 0) {
      console.log(` +-+ Falha na Página [ ${currentPage} ] - Add ${dataNova.length} +-+ `);
      console.log(``);
      currentPage--;
      await delay(1000 * 60 * (4 + numRet));
      numRet++;
    }
    else {
      console.log(` + Página [ ${currentPage} ] - Concluida - Add ${dataNova.length} + `);
      console.log(``);
      numRet = 0;
    }
  }


  var lisObjAvaFak = [];
  if (strCriAvaFak === 'Sim') {

    var lisQntPocChaAvaFak = [];
    for (let c = 5; c >= 1; c--) {
      for (let cc = 0; cc < objCriAvaFak[`est_${c}`].por; cc++) {
        lisQntPocChaAvaFak.push(c);
      }
    }

    for (let c = 0; c < limitOri - allFeedbacks.length; c++) {

      var numRatEst = iteRan(lisQntPocChaAvaFak);

      var objAvaFak = {
        name: 'R***l',
        displayName: 'Anônimo',
        country: 'BR',
        rating: numRatEst,
        info: {},
        date: new Date(),
        content: '',
        photos: []
      };

      lisObjAvaFak.push(objAvaFak);
    }

    var dataNovaFake = [];
    if (lisObjAvaFak.length >= 1) {
      dataNovaFake = await fakerName(lisObjAvaFak);
      allFeedbacks = [...allFeedbacks, ...dataNovaFake];
    }

    console.log(` + Página Fake - Concluida - Add ${dataNovaFake.length} + `);
    console.log(``);
  }




  if (totalPages > limitPages) {
    var numQntRev = allFeedbacks.length;
    for (let c = 0; c < (numQntRev - limitOri); c++) {
      allFeedbacks.pop();
    }
  }




  return allFeedbacks;
}
