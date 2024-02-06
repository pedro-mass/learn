export function getCartItemCount(cart) {
  return cart.reduce((count, curItem) => {
    return count + curItem.quantity;
  }, 0);
}
