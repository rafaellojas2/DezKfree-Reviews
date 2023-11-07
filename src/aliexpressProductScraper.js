import { launch } from 'puppeteer';
import { load } from 'cheerio';

import { get } from './variants.js';
import { get as _get } from './feedback.js';

async function AliexpressProductScraper(productId, feedbackLimit=Infinity, strCriAvaFak, objCriAvaFak) {
  const FEEDBACK_LIMIT = feedbackLimit || 10;
  const browser = await launch({headless: 'new'});
  const page = await browser.newPage();

  /** Scrape the aliexpress product page for details */
  await page.goto(`https://www.aliexpress.com/item/${productId}.html`);
  const aliExpressData = await page.evaluate(() => runParams);

  const data = aliExpressData.data;

  /** Scrape the description page for the product using the description url */
  const descriptionUrl = data.productDescComponent.descriptionUrl;
  await page.goto(descriptionUrl);
  const descriptionPageHtml = await page.content();

  /** Build the AST for the description page html content using cheerio */
  const $ = load(descriptionPageHtml);
  const descriptionData = $('body').html();

  /** Fetch the adminAccountId required to fetch the feedbacks */
  const adminAccountId = await page.evaluate(() => adminAccountId);
  await browser.close();

  let feedbackData = [];

  if (data.feedbackComponent.totalValidNum > 0) {
    feedbackData = await _get(
      data.productInfoComponent.id,
      adminAccountId,
      data.feedbackComponent.totalValidNum,
      FEEDBACK_LIMIT,
      strCriAvaFak,
      objCriAvaFak
    );
  }

  /** Build the JSON response with aliexpress product details */
  const json = {
    title: data.productInfoComponent.subject,
    categoryId: data.productInfoComponent.categoryId,
    productId: data.productInfoComponent.id,
    totalAvailableQuantity: data.inventoryComponent.totalAvailQuantity,
    description: descriptionData,
    orders: data.tradeComponent.formatTradeCount,
    storeInfo: {
      name: data.sellerComponent.storeName,
      companyId: data.sellerComponent.companyId,
      storeNumber: data.sellerComponent.storeNum,
      followers: data.sellerComponent.followingNumber,
      ratingCount: data.sellerComponent.positiveNum,
      rating: data.sellerComponent.positiveRate
    },
    ratings: {
      totalStar: 5,
      averageStar: data.feedbackComponent.averageStar,
      totalStartCount: data.feedbackComponent.totalValidNum,
      fiveStarCount: data.feedbackComponent.fiveStarNum,
      fourStarCount: data.feedbackComponent.fourStarNum,
      threeStarCount: data.feedbackComponent.threeStarNum,
      twoStarCount: data.feedbackComponent.twoStarNum,
      oneStarCount: data.feedbackComponent.oneStarNum
    },
    images:
      (data.imageModule &&
        data.imageModule.imagePathList) ||
      [],
    feedback: feedbackData,
    variants: get(data.priceComponent.skuPriceList),
    specs: data.productPropComponent.props,
    currency: data.currencyComponent.currencyCode,
    originalPrice: {
      min: data.priceComponent.origPrice.minAmount.value,
      max: data.priceComponent.origPrice.maxAmount.value
    },
    salePrice: {
      min: data.priceComponent.discountPrice.minActivityAmount 
        ? data.priceComponent.discountPrice.minActivityAmount.value 
        : data.priceComponent.discountPrice.minAmount.value,
      max: data.priceComponent.discountPrice.maxActivityAmount 
        ? data.priceComponent.discountPrice.maxActivityAmount.value 
        : data.priceComponent.discountPrice.maxAmount.value,
    }
  };

  return json;
}

export default AliexpressProductScraper;
