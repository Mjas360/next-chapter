import { Middleware } from '@reduxjs/toolkit';
import { saveCart } from '~/utils/saveCart';

export const cartMiddleware: Middleware = store => next => (action: any) => {
  if (action.meta?.fromMiddleware) {
    return next(action);
  }

  const result = next(action);

  switch (action?.type) {
    case 'cart/addToCart':
    case 'cart/removeFromCart':
    case 'cart/increaseQuantity':
    case 'cart/decreaseQuantity':
    case 'cart/updateQuantity':
    case 'cart/clearCart':
    case 'cart/hydrateCart':
      persistCart(store);
      break;
  }

  return result;
};

const persistCart = (store: any) => {
  console.log('STORE ----', store.getState());
  saveCart(store.getState().cartReducer.items);
};
