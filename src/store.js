
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/userSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    favorites: favoritesReducer,
  },
});
