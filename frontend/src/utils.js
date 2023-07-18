// Functions
export const toNum = (n) => Number(Number(n).toFixed(2));

export const addDays = (n) => {
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + n);
  return newDate.toDateString();
};

export const wrapCartItem = (data, qty = 1) => {
  const cartItem = {
    asin: data.asin,
    title: data.title,
    image: data.images[0].image,
    currentPrice: data.price.currentPrice,
    beforePrice: data.price.beforePrice,
    discount: data.price.discount,
    available: data.available,
    availability: data.availability,
    delivery: data.delivery,
    qty: qty,
  };
  return cartItem;
};

export const filterProductSearch = (data, filter) => {
  let temp = [...data.items];
  if (filter.sort) {
    switch (filter.sort) {
      case "lowFirst":
        temp.sort(
          (a, b) =>
            a.price.currentPrice.substring(1) -
            b.price.currentPrice.substring(1)
        );
        break;
      case "highFirst":
        temp.sort(
          (a, b) =>
            b.price.currentPrice.substring(1) -
            a.price.currentPrice.substring(1)
        );
        break;
      case "topRated":
        temp.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        temp.sort((a, b) => a.name - b.name);
        break;
    }
  }
  if (filter.rating) {
    switch (filter.rating) {
      case "gt4":
        temp = temp.filter((t) => t.rating >= 4.0);
        break;
      case "gt3":
        temp = temp.filter((t) => t.rating >= 3.0);
        break;
      case "gt2":
        temp = temp.filter((t) => t.rating >= 2.0);
        break;
      case "gt1":
        temp = temp.filter((t) => t.rating >= 1.0);
        break;
    }
  }
  if (filter.price) {
    switch (filter.price) {
      case "<25":
        temp = temp.filter(
          (t) => Number(t.price.currentPrice.substring(1)) <= 25
        );
        break;
      case "25-50":
        temp = temp.filter(
          (t) =>
            Number(t.price.currentPrice.substring(1)) >= 25 &&
            Number(t.price.currentPrice.substring(1)) <= 50
        );
        break;
      case "50-100":
        temp = temp.filter(
          (t) =>
            Number(t.price.currentPrice.substring(1)) >= 50 &&
            Number(t.price.currentPrice.substring(1)) <= 100
        );
        break;
      case "100-200":
        temp = temp.filter(
          (t) =>
            Number(t.price.currentPrice.substring(1)) >= 100 &&
            Number(t.price.currentPrice.substring(1)) <= 200
        );
        break;
      case ">200":
        temp = temp.filter(
          (t) => Number(t.price.currentPrice.substring(1)) >= 200
        );
        break;
    }
  }
  return { totalPage: data.totalPage, items: temp };
};

// Constants
export const baseRate = 11.99;
export const options = [
  { price: baseRate, date: addDays(2), label: "Standard Shipping" },
  {
    price: toNum(baseRate * 0.8),
    date: addDays(3),
    label: "Standard 3-Day Shipping",
  },
  {
    price: toNum(baseRate * 0.6),
    date: addDays(5),
    label: "Standard 5-Day Shipping",
  },
];

export const prices = [
  {
    label: "Under $25",
    min: 0,
    max: 25,
  },
  {
    label: `$25 to $50`,
    min: 25,
    max: 50,
  },
  {
    label: `$100 to $200`,
    min: 100,
    max: 200,
  },
  {
    label: `$200 & Above`,
    min: 200,
    max: Infinity,
  },
];

export const ratings = [
  {
    label: "4stars & Up",
    rating: 4,
  },

  {
    label: "3stars & Up",
    rating: 3,
  },

  {
    label: "2stars & Up",
    rating: 2,
  },

  {
    label: "1stars & Up",
    rating: 1,
  },
];
