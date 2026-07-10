import cartReducer, {
  addToCart,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from './cartSlice';

const mockBook = {
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  image: 'https://example.com/book.jpg',
  price: 12,
};

describe('cartSlice', () => {
  it('should add a new book to the cart', () => {
    const state = cartReducer(undefined, addToCart(mockBook));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(mockBook.id);
    expect(state.items[0].quantity).toBe(1);
  });

  it('should increase quantity when adding an existing book', () => {
    let state = cartReducer(undefined, addToCart(mockBook));

    state = cartReducer(state, addToCart(mockBook));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should increase quantity', () => {
    let state = cartReducer(undefined, addToCart(mockBook));

    state = cartReducer(state, increaseQuantity(mockBook.id));

    expect(state.items[0].quantity).toBe(2);
  });

  it('should decrease quantity', () => {
    let state = cartReducer(undefined, addToCart(mockBook));

    state = cartReducer(state, increaseQuantity(mockBook.id));

    state = cartReducer(state, decreaseQuantity(mockBook.id));

    expect(state.items[0].quantity).toBe(1);
  });

  it('should remove the item when quantity reaches zero', () => {
    let state = cartReducer(undefined, addToCart(mockBook));

    state = cartReducer(state, decreaseQuantity(mockBook.id));

    expect(state.items).toHaveLength(0);
  });

  it('should clear the cart', () => {
    let state = cartReducer(undefined, addToCart(mockBook));

    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
  });
});