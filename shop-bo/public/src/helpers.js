export const displayPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price || 0);

export const calculateTotal = (state) =>
  state.products.products.reduce((acc, p) => acc + (state.orders.items[p.id] || 0) * p.price, 0);
