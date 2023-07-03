// Functions
export const toNum = (n) => Number(Number(n).toFixed(2));

export const addDays = (n) => {
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + n);
  return newDate.toDateString();
};

// Constants
export const baseRate = 11.99;
export const options = [
  { price: baseRate, date: addDays(2) },
  { price: toNum(baseRate * 0.8), date: addDays(3) },
  { price: toNum(baseRate * 0.6), date: addDays(5) },
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
