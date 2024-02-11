export const parsePrice = (priceString) => {
  // Remove currency symbol and commas
  const strippedPrice = priceString.replace("₱", "").replace(",", "");
  // Parse the string to a float number
  return parseFloat(strippedPrice);
};
