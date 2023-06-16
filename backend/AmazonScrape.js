import fetch from 'node-fetch';
import cheerio from 'cheerio'
import fs from 'fs';
import { HttpsProxyAgent } from 'https-proxy-agent';
import UTIL from './utils.js';
import CONST from './constant.js'


/*************************************************************
 * 
    MAIN FUNC TO START SCRAPING AMAZON
 *
 *************************************************************/

export const startScraper = async ({ type, page, keyword, department, asin, reviewFilter, reviewId }) => {

    let apiEndpoint, resBody, result;
    switch (type) {
        case 'home':
            resBody = await buildHttpRequest(CONST.host);
            result = scrapeHomePage(resBody);
            return result;
        case 'products':
            if (!keyword) return console.error("You need a keyword to search products related to keyword");
            apiEndpoint = `${CONST.host}/s?k=${keyword}${department? `&i=${department}` : ''}${page? `&page=${page}` : ''}`;
            resBody = await buildHttpRequest(apiEndpoint);
            result = scrapeProductSearchPage(resBody);
            return result;
        case 'productAsin':
            if (!asin) return console.error("You need an asin number to grab a product details");
            apiEndpoint = `${CONST.host}/dp/${asin}`;
            resBody = await buildHttpRequest(apiEndpoint);
            result = scrapeProductDetailsPage(resBody);
            return result;
        case 'reviews':
            if (!asin) return console.error("You need an asin number to search reviews of a product ");
            apiEndpoint = `${CONST.host}/product-reviews/${asin}/ref=cm_cr_arp_d_viewopt_srt?ie=UTF8&reviewerType=${reviewFilter.reviewerType ? reviewFilter.reviewerType : 'all_reviews'}${reviewFilter.sortBy ? `&sortBy=${reviewFilter.sortBy}` : ''}${reviewFilter.formatType ? `&formatType=${reviewFilter.formatType}` : ''}${reviewFilter.mediaType ? `&sortBy=${reviewFilter.mediaType}` : ''}${reviewFilter.filterByStar ? `&sortBy=${reviewFilter.filterByStar}` : ''}&pageNumber=${page ? page : 1}`;
            resBody = await buildHttpRequest(apiEndpoint);
            result = scrapeReviewPage(resBody);
            return result;

        case 'reviewAsin':
            if (!reviewId) return console.error("You need a review ID to search a review details");
            apiEndpoint = `${CONST.host}gp/customer-reviews/${reviewId}/ref=cm_cr_arp_d_rvw_ttl?ie=UTF8`;
            resBody = await buildHttpRequest(apiEndpoint);
            result = scrapeReviewPage(resBody)
            return result;
        default:
            return;

    }
}


/*************************************************************
 * 
 *  HTTP Request Section
 *  1. User Agent (To create Random User Agent against request block)
 *  2. Random Proxy                 
 *  3. API Endpoint (To create request url and params)
 *  4. Build Http Request using node-fetch 
 *
 *************************************************************/



const getUserAgent = () => {

    const os = [
        'X11; Linux x86_64',
        'X11; U; Linux x86_64; en-US',
        'X11; U; Linux i686; en-US',
        'Windows NT 10.0; Win64; x64',
        'Windows NT 10.0; WOW64',
        'Windows NT 10.0',
        'Macintosh; Intel Mac OS X 10_15_7',
        'Macintosh; Intel Mac OS X 10_15_5',
        'Macintosh; Intel Mac OS X 10_11_6',
        'Macintosh; Intel Mac OS X 10_6_6',
        'Macintosh; Intel Mac OS X 10_10_5',
        'Macintosh; Intel Mac OS X 10_7_5',
        'Macintosh; Intel Mac OS X 10_11_3',
        'Macintosh; Intel Mac OS X 10_10_3',
    ];

    const randomChromeVer = `${Math.floor(Math.random() * 4) + 100}.0.${Math.floor(Math.random() * 400) + 4800}.${Math.floor(Math.random() * 4) + 100}`;

    return `Mozilla/5.0 (${os[Math.floor(Math.random() * os.length)]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${randomChromeVer} Safari/537.36`;

}



const getHttpHeader = () => {

    let headers = new Headers({
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "DNT": "1",
        "Upgrade-Insecure-Requests": "1",
        "Cache-Control": "no-cache",
        'device-memory': `${Math.floor(Math.random() * 16) + 8}`,
        'Referer': `${host}?ref=nav_logo_${Math.floor(Math.random() * 100000)}`,
        "User-Agent": getUserAgent()
    });

    return headers;

}

const getRandProxyIp = async () => {

    const response = await fetch("https://free-proxy-list.net/");
    const body = await response.text();

    const ips = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}/gm);

    return ips[Math.floor(Math.random() * ips.length)];
}



const buildHttpRequest = async (URL) => {

    // GET RANDOM PROXY (Currently disabled because it is too slow)
    // const ip = await getRandProxyIp();
    // const proxyAgent = new HttpsProxyAgent(`http://${ip}`);


    const options = {
        method: 'GET',
        headers: getHttpHeader(),
        // agent: proxyAgent
    };

    try {
        let now = Date.now();
        const response = await fetch(URL, options);
        const body = await response.text();
        console.log("Time took: ", (Date.now() - now) / 1000);
        // fs.writeFile(process.cwd() + "/rawHTML/amazon_fetch_" + Math.floor(Math.random() * 10000) + ".html", body, (err) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     console.log("File written Successfully");
        // });

        return body;
    } catch (err) {
        console.error(err);
    }
}

const minifyHtml = (html) => {

    // minify html by removing all extra spaces new lines, and script tags. 
    const minified = html.replace(/\s+/g, '').replace(/\n/g, '');
    return minified;
}


/***************************************************************
 ** *************************************************************
 ** *************************************************************
 ** 
 ** Scrape a whole page 
 ** Page type: Home, Product Search, Product Details, Review
 ** 
 ****************************************************************
 * **************************************************************
 * **************************************************************
 * **************************************************************/


const scrapeHomePage = (body) => {

    const $ = cheerio.load(body);

    const gwCardList = [];
    const mainCard = [];
    const mainCarousel = [];


    // Get Home Page GwCard
    const gwCard = $('#gw-card-layout');

    gwCard.children().each((_, card) => {

        let id = card.attribs.id;
        if (id && id.includes("grid"))
            gwCardList.push(scrapeCard(card));


    });

    // Get Home Page Main Content

    const mainContent = $('#main-content');

    mainContent.children().each((_, content) => {
        let id = content.attribs.id;

        if (id) {
            if (id.includes("grid")) {
                mainCard.push(scrapeCard(content));
            } else {
                mainCarousel.push(scrapeCarousel(content, 'feed'));
            }
        }

    });

    return { gwCardList: gwCardList, mainCard: mainCard, mainCarousel: mainCarousel };

};

const scrapeProductSearchPage = (body) => {
    const $ = cheerio.load(body);

    const productList = $('div[data-index]');
    const searchItems = [];

    productList.each((i, item) => {
        const productItem = {};
        const asin = $(item).prop('data-asin');
        // check if the div container has asin data attribute. 
        if (asin) {
            // scrape image, link and asin.
            const $imageContainer = $(item).find('.s-product-image-container');
            const productLink = $($imageContainer).find('a').attr('href');
            const image = $($imageContainer).find('img').attr('src');
            productItem['asin'] = asin;
            productItem['link'] = productLink;
            productItem['image'] = image;

            // scrape product name & rating. 

            const name = $(item).find('h2').text();
            productItem['name'] = name;
            productItem['rating'] = scrapeRating(item);

            // scrape prime
            if ($('i.a-icon-prime')) productItem['prime'] = true;
            else productItem['prime'] = false;

            // scrape price
            const price = scrapePrice(item);
            productItem['currentPrice'] = price.currentPrice;
            productItem['beforePrice'] = price.beforePrice;

            // scrape shipping info
            const $shipping = $(item).find('div.a-row > span[aria-label]');

            $shipping.each((i, s) => {
                if ($(s).text().toLowerCase().includes("delivery"))
                    productItem['shippingInfo'] = $(s).text();
            });
            searchItems.push(productItem);
        }
    });
    return searchItems;
}

const scrapeProductDetailsPage = (body) => {

    const $ = cheerio.load(body);

    const product = {};

    try {
        // extrcat title;
        product['title'] = $(`span[id="productTitle"]`).text().trim() || $('.qa-title-text').text().trim();

        // scrape imgs
        product['images'] = scrapeProductImages(body);

        if (!product.images.length) {
            product['images'] = [$('booksImageBlock_feature_div').find('img').attr('src')];
        }


        // scrape price
        const price = scrapePrice($('#corePriceDisplay_desktop_feature_div'));
        product['currentPrice'] = price.currentPrice || '';
        product['beforePrice'] = price.beforePrice || '';

        // scrape overview
        product['overview'] = scrapeProductOverview($);

        // scrape shipping info
        const deliveryMessages = [];
        $('#deliveryBlockMessage div.a-spacing-base').each((i, item) => {
            deliveryMessages.push($(item).text());
        });
        product['delivery'] = deliveryMessages;
        product['availability'] = $('#availability > span').text().trim();

        let label, text;
        $('div.tabular-buybox-text').each((i, item) => {
            label = $(item).prop("tabular-attribute-name");
            text = $(item).children('span').text().trim();
            product[label] = text;
        });

        // scrape Product Information
        product['information'] = scrapeProductInformation($);

        // scrape Product Description
        let img, des;
        img = $('div#productDescription img').prop('data-src') || $('div#productDescription img').attr('src');
        des = $('div#productDescription > p > span').text();
        const description = { img: img, des: des };

        product['description'] = description;


        // scrape Brand Information 
        // const brandInfo = scrapeCarousel($('#aplus_feature_div'));
        // const brandStory = scrapeCarousel($('aplusBrandStory_feature_div'));
        // product['brandInfo'] = brandInfo;
        // product['brandStory'] = brandStory;

        // scrape Product Review Metadata
        const avgRating = $('i[data-hook="average-star-rating"]').text().split(" ")[0];
        const ratingDist = {};
        const histogram = $('#customerReviews tr > td:last-child a').each((i, item) => {
            // ratingDist[5-Number(i)] = $(item).find('a[aria-label]').text();
            ratingDist[5 - Number(i)] = $(item).text().trim();
        });

        product['avgRating'] = avgRating;
        product['histogram'] = ratingDist;


        // scrape all top reviews in the product detail page. 
        const reviewsLocal = $('#cm-cr-dp-review-list');
        const reviewsGlobal = $('#cm-cr-global-review-list');
        const reviewListLocal = scrapeReviews(reviewsLocal);
        const reviewListGlobal = scrapeReviews(reviewsGlobal);


        product['reviewListLocal'] = reviewListLocal;
        product['reviewListGlobal'] = reviewListGlobal;

    } catch (e) {
        console.error(e.message);
    }

    return product;
};

const scrapeReviewPage = (body) => {

    const $ = cheerio.load(body);

    const topPositive = $('div.positive-review');
    const topCritical = $('div.critical-review');

    const reviewsLocal = $('#cm_cr-review_list');

    const posReview = scrapeReviews(topPositive);
    const criReview = scrapeReviews(topCritical);
    const localReviews = scrapeReviews(reviewsLocal);



    return { positive: posReview, critical: criReview, reviews: localReviews };

};


/***************************************************************
 ** *************************************************************
 ** *************************************************************
 ** 
 **  Global scrape Functions 
 **  Type: rating, price, image, card, carousel, 
 **  
 **  Product related Functions:  product variants, product overview, 
 **                                 product info
 **  Review related Functions:
 ** 
 ****************************************************************
 * **************************************************************
 * **************************************************************
 * **************************************************************/


function scrapeRating(review) {

    const $ = cheerio.load(review);

    const icon = $('i.a-icon-star') || $('i.a-icon-star-small') || $('i.a-icon-star-medium') || $('i.a-icon-star-large');
    const rating = icon.text().trim().split(' ')[0];

    return rating;
}


function scrapeCard(card) {

    // const $ = cheerio.load(card);

    const $ = cheerio.load(card);


    const cardHeader = $(card).find('.a-cardui-header').text();

    const cardBody = $(card).find('.a-cardui-body');

    const cardBodyItems = [];


    $(cardBody).find('a').each((_, anchor) => {
        const itemLink = anchor.attribs.href;
        const itemImg = $(anchor).find('img').attr("src");
        const itemLabel = $(anchor).find('.image-label').text();

        const bodyJson = { link: itemLink, img: itemImg, label: itemLabel };

        cardBodyItems.push(bodyJson);
    });

    return { header: cardHeader, items: cardBodyItems };
}

function scrapeCarousel(carousel, type = 'a') {

    const $ = cheerio.load(carousel);

    let className, header = '';

    const carouselItems = [];

    if (type == 'feed') {
        className = ".feed-carousel-viewport > ul";
        header = $('.as-title-block').text();
    } else {
        className = ".a-carousel-viewport > ol";
        header = $('h2.a-carousel-heading').text();
    }


    // const $selected = $('[data-selected=true]');

    // each list

    $(className).children().each((i, item) => {

        let title, link, img, price, rating;
        const body = [];

        let anchor = $(item).find('a');

        // If there is an anchor get text, link address, and img
        // get multiple images if it is wrapped in a image grid
        if (anchor) {
            $(anchor).each((i, a) => {

                title = $(a).children('span').text();
                img = $(a).find('img').attr('src') || $(a).find('img').prop('data-src');
                link = a.attribs.href;

                body.push({ title: title, link: link, img: img });
            });
        }


        // If there is no anchor, just extract img.
        else {
            img = $(item).find('img').each((_, image) => {
                body.push({ img: image.attribs.src });
            });
        }

        // extract price if possible

        price = scrapePrice(item);
        rating = scrapeRating(item);


        let carousel = { title: title, body: body, price: price, rating: rating };


        carouselItems.push(carousel);
    });



    return { header: header, items: carouselItems };
}


function scrapeAsinFromLink(link) {
    const str = link.split("/");
    let idx = -1;
    for (let i in str) {
        if (str[i] == "dp") return str[Number(i) + 1];
    }
    return "";
}



/* Product scrape Functions */

function scrapePrice(body) {
    const $ = cheerio.load(cheerio.html(body));

    let price;

    const currentPrice = $('span[data-a-size="m"]')[0] ||
        $('span[data-a-size="l"]')[0] ||
        $('span[data-a-size="xl"]')[0] || $('span.a-color-price')[0];
    const beforePrice = $('span[data-a-strike="true"]').children().first().text();

    if (currentPrice) {
        price = $(currentPrice.children[0]).text()
    } else {
        price = $('span.a-color-price').text();
    }

    return { currentPrice: price, beforePrice: beforePrice };

}



function scrapeProductImages(body) {
    let images = [];
    // const min = minifyHtml(body);
    // console.log(min);

    const regex = /'colorImages': { 'initial': (.+)},(?:.+)'colorToAsin'/s.exec(body);
    if (regex) {

        const imgArray = JSON.parse(regex[1].trim());
        images = imgArray.map((item) => {
            const img = item.hiRes ? item.hiRes : (item.large ? item.large : "");
            const thumbnail = item.thumb;
            return { image: img, thumb: thumbnail };
        });
    } else {
        const $ = cheerio.load(cheerio.html(body));
        const thumbnail = $('#imageBlock li.item').each((_, item) => {
            const img = $(item).find('img').attr('src');
            images.push(img);
        });
    }

    return images;

}


function scrapeProductOverview($) {
    let overview = {};

    /**
     * Scrape Feature Overview
     */
    $('#productOverview_feature_div').find('tr').each((i, r) => {
        let key, value;
        $(r).children("td").each((i, d) => {
            if (!i) key = $(d).children('span').text().trim();
            else value = $(d).children('span').text().trim();
        });
        overview[key] = value;
    });

    if (!Object.keys(overview).length) {
        overview['bookDes'] = $('#bookDescription_feature_div').text().trim();
    }


    /**
     * Scrape Feature Bullets (about this item)
     */
    const featureBullets = [];
    const featureList = $('#feature-bullets > ul > li > span.a-list-item').each((i, item) => {
        featureBullets.push($(item).text().trim());
    });

    overview["aboutItem"] = featureBullets;
    return overview;
}


function scrapeProductInformation($) {
    let details = {};
    let label, des;

    try {
        if ($('#prodDetails').children().length) {
            $('#prodDetails').find('tr').each((i, r) => {

                label = $(r).children("th").text().trim();

                /**
                 * Scrape Best Sellers Rank
                 */
                // if(label.includes("Best") || label.includes("Sellers") || label.includes("Rank")){
                //     const rank = [];
                //     $(r).children("td").children("span").children("span").each((idx, item) => {
                //      text = $(item).text().trim();
                //      let bsr = UTIL.regex.bestSeller(text);
                //         rank.push(bsr);
                //     });
                //     details[label] = rank;
                // }

                // Do not get review info and Best Sellers Rank. Get it from product Review Metadata
                if (!label.includes("Reviews") && !label.includes("Best")) {
                    des = $(r).children("td").text().trim();
                    details[label] = des;
                }
            });

        } else if ($('#detailBullets_feature_div > ul')) {
            $('#detailBullets_feature_div > ul').children().each((i, item) => {
                label = $(item).find('span.a-list-item').children().first().text().split(':')[0].replace(/\r?\n|\r|\s+/gm, " ");
                des = $(item).find('span.a-list-item').children().last().text().trim();
                details[label] = des;
            });
        }
        return details;

    } catch (e) {
        console.log(e.message);
    }
}



// scrape sponsored or Frequently Bought Together Products
function scrapeProductSimilar($) {


}




/* Review scrape Functions */


function scrapeReviews(body) {
    const $ = cheerio.load(cheerio.html(body));


    const reviewList = [];
    let review = {};


    try {
        $('div').first().children().each((i, item) => {
            /**
             * Get Review ID
             */
            let review_id = item.attribs.id;

            if (review_id && $(item).prop('data-hook') === 'review') {
                /**
                 * Get Review User
                 */
                const user_name = $(item).find('.a-profile-name').text();
                let user_avatar = $(item).find('.a-profile-avatar img').prop('data-src');

                /**
                 * Get Review Star
                 */
                const star = $(item).find('[data-hook="review-star-rating"]') || $(item).find('[data-hook="review-star-rating-view-point"]') || $(item).find('[data-hook="cmps-review-star-rating"]');
                const user_rating = star.text().split(' ')[0];

                /**
                 * Get Review Date
                 */
                const review_date = $(item).find('[data-hook="review-date"]').text() || $(item).find('span.review-date').text();

                /**
                 * Get Review Strip
                 */
                const review_strip = $(item).find('[data-hook="format-strip-linkless"]').text() || $(item).find('[data-hook="format-strip"]').text();
                const isVerified = $(item).find('[data-hook="avp-badge-linkless"]') || $(item).find('[data-hook="avp-badge"]') ? true : false;

                /**
                 * Get Review Title
                 */
                const review_title = $(item).find('[data-hook="review-title"]').text().trim();
                const review_link = $(item).find('[data-hook="review-title"]').attr('href');

                /**
                 * Get Review Content
                 */
                const review_content = $(item).find('[data-hook="review-collapsed"]').text().trim() || $(item).find('[data-hook="review-body"]').text().trim() || $(item).find('[data-hook="review-title"]').parent().parent().children().last().children('span').text();;

                /**
                 * Get Helpful Count
                 */
                const helpful_statement = $(item).find('[data-hook="helpful-vote-statement"]').text() || $(item).find('span.review-votes').text();
                let helpful_count;
                if (!helpful_statement) helpful_count = 0;
                else helpful_count = helpful_statement.includes("One") ? 1 : parseInt(helpful_statement, 10);


                review["id"] = review_id;
                review["name"] = user_name;
                review["avatar"] = user_avatar;
                review["star"] = user_rating;
                review["date"] = review_date;
                review["strip"] = review_strip;
                review["verified"] = isVerified;
                review["title"] = review_title;
                review["link"] = review_link;
                review["content"] = review_content;
                review["helpful"] = helpful_count;

                reviewList.push(review);
            }
        });
    } catch (e) {
        console.error(e.message);
    }
    return reviewList;
}

// const result = await startScraper({
//     type: 'productAsin',
//     asin: 'B073R2C9T6'
// });