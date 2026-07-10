import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ScreenContent } from '~/design-system/custom-components';
import EmptyState from '~/design-system/custom-components/EmptyState';
import {
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
} from '~/redux/reducers/cartSlice';
import { RootState } from '~/redux/store';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const Cart = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => state.cartReducer);

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price) * item.quantity,
    0,
  );

  if (!items.length) {
    return (
      <ScreenContent applyInsets={false}>
        <Container
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <EmptyState message="Your cart is empty.Browse our collection and add a few books." />
        </Container>
      </ScreenContent>
    );
  }

  return (
    <ScreenContent applyInsets={false}>
      <Container
        gap={20}
        style={{
          marginTop: 16,
          marginBottom: 120,
        }}
      >
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => dispatch(increaseQuantity(item.id))}
            onDecrease={() => dispatch(decreaseQuantity(item.id))}
            onRemove={() => dispatch(removeFromCart(item.id))}
          />
        ))}

        <CartSummary
          subtotal={subtotal}
          total={subtotal}
          onCheckout={() => {}}
          onClear={() => dispatch(clearCart())}
        />
      </Container>
    </ScreenContent>
  );
};

export default Cart;
