export const formatPrice = (num) => {
  // Use toLocaleString to format the number with commas
  return (Math.round(num * 100) / 100).toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const updateCart = (state) => {
  // Calculate Items Price
  state.itemsPrice = formatPrice(
    state.cartItems.reduce((acc, item) => acc + item.price, 0),
  );

  // Remove currency symbol and commas for comparison
  const numericItemsPrice = parseFloat(
    state.itemsPrice.replace("₱", "").replace(",", ""),
  );

  // Calculate Shipping Price (If order is over ₱450 then free, else ₱70 shipping fee)
  state.shippingPrice = formatPrice(numericItemsPrice > 450 ? 0 : 70);

  // Calculate Tax Price (15% tax)
  state.taxPrice = formatPrice(Number(0.15 * numericItemsPrice).toFixed(2));

  // Calculate Total Price
  state.totalPrice = formatPrice(
    numericItemsPrice +
      parseFloat(state.shippingPrice.replace("₱", "").replace(",", "")) +
      parseFloat(state.taxPrice.replace("₱", "").replace(",", "")),
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
