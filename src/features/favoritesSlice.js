import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Load initial state from local storage
const savedFavorites = localStorage.getItem('favorites')
  ? JSON.parse(localStorage.getItem('favorites'))
  : [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: savedFavorites, // Use saved favorites as initial state
  },
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex(item => item.id === product.id);

      if (index >= 0) {
        // If already in favorites, remove it
        state.items.splice(index, 1);
        toast.info(`${product.title.substring(0, 20)}... removed from favorites`);
      } else {
        // If not in favorites, add it
        state.items.push(product);
        toast.success(`${product.title.substring(0, 20)}... added to favorites!`);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase('user/logout', (state) => {
      state.items = []; // Clear favorites on logout
    });
  }
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
