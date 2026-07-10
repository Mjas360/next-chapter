import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from './types';

export const CART_STORAGE_KEY = '@book_nook/cart';

export const saveCart = async (items: CartItem[]) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart', error);
  }
};

export const loadCart = async (): Promise<CartItem[]> => {
  try {
    const value = await AsyncStorage.getItem(CART_STORAGE_KEY);

    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};
