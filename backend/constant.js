export const CONST = {
  host: "https://amazon.com",
  reviewFilter: {
    sortBy: {
      recent: "recent",
      helpful: "helpful",
    },
    reviewerType: {
      allReviewer: "all_reviews",
      verifiedPurchase: "avp_only_reviews",
    },
    filterByStar: {
      positive: "positive",
      critical: "critical",
      1: "one_star",
      2: "two_star",
      3: "three_star",
      4: "four_star",
      5: "five_star",
    },
    formatType: {
      allFormats: "all_formats",
      currentFormat: "current_format",
    },
    mediaType: {
      allContents: "all_contents",
      mediaReviewsOnly: "media_reviews_only",
    },
  },
  regex: {
    rating: (star) => {
      const rating = star.match(/^(\d.\d).*/ms);
      if (rating) {
        return rating[1];
      }
      return "";
    },
    bestSeller: (text) => {
      const bsr = text.match(/(#[\d]+)[\s\n ]in[\s\n ](\w+[ \w+]*).*/);
      if (bsr) {
        return { rank: bsr[1], department: bsr[2] };
      }
      return "";
    },
    reviewDate: (date) => {
      const dateRegex = /on (.+)$/.exec(date);
      if (dateRegex) {
        return {
          date: dateRegex[1],
          unix: moment(new Date(`${dateRegex[1]} 02:00:00`))
            .utc()
            .unix(),
        };
      }
      return "";
    },
  },
  productInfo: {
    id: [
      "#detailBullets_feature_div > ul",
      "#productDetails_detailBullets_sections1",
      "#productDetails_techSpec_section_1",
      "#productDetails_techSpec_section_2",
    ],
  },
};

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
