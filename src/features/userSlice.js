import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { setFavorites } from './favoritesSlice';
import { setCart } from './cartSlice';

// Helper to update Local Storage
const updateLocalStorageUser = (updatedUser) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const index = users.findIndex(u => u.email === updatedUser.email);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    localStorage.setItem('users', JSON.stringify(users));
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    isAuthenticated: !!localStorage.getItem('currentUser'),
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.user = action.payload
      state.isAuthenticated = true
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    registerStart: (state) => {
      state.loading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state
      .loading = false
      state.user = action.payload
      state.isAuthenticated = true
    },
    registerFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Clear local storage data
      localStorage.removeItem('currentUser');
      localStorage.removeItem('favorites');
      localStorage.removeItem('cart');
      toast.info("You have been logged out.");
    },
    clearError: (state) => {
      state.error = null
    },
    // NEW: Action to update profile image
    updateUserImage: (state, action) => {
      const imageBase64 = action.payload;

      if (state.user) {
        // 1. Update Redux State
        state.user.image = imageBase64;
        
        // 2. Update Current Session (so it persists on refresh)
        localStorage.setItem('currentUser', JSON.stringify(state.user));
        
        // 3. Update the Main Database (so it persists on Logout/Login)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.email === state.user.email);
        
        if (index !== -1) {
          // Merge the new image into the existing user object in the array
          users[index] = { ...users[index], image: imageBase64 }; 
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
    },
    updateUserProfile: (state, action) => {
      const updates = action.payload; // { name, phone, location, pincode }
      
      if (state.user) {
        // Update Redux State
        state.user = { ...state.user, ...updates };
        
        // Update Session (persists on page refresh)
        localStorage.setItem('currentUser', JSON.stringify(state.user));
        
        // Update Database (persists on logout/login)
        updateLocalStorageUser(state.user);
        
        toast.success("Profile details saved successfully!");
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure, logout, clearError, updateUserImage, updateUserProfile } = userSlice.actions


export const login = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());

    if (user && user.password === userData.password) {
      const favKey = `favorites_${user.email}`;
      const cartKey = `cart_${user.email}`;

      const savedFavorites = JSON.parse(localStorage.getItem(favKey)) || [];
      const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

      dispatch(setFavorites(savedFavorites));
      dispatch(setCart(savedCart));

      return dispatch(loginSuccess({ 
        id: user.id, 
        email: user.email, 
        name: user.name,
        image: user.image || null,
        phone: user.phone || '',
        location: user.location || '',
        pincode: user.pincode || ''
      }));
    } else {
      throw new Error('Invalid email or password.');
    }
  } catch (error) {
    return dispatch(loginFailure(error.message));
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch(registerStart())
  try {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())
    if (existingUser) throw new Error('User already exists')

    const newUser = {
      id: Date.now(),
      name: userData.name, // This will be used for "Full Name"
      email: userData.email.toLowerCase(),
      password: userData.password,
      location: "New York, USA", // Default for UI match
      phone: "(+98) 9123728167"   // Default for UI match
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const successAction = dispatch(registerSuccess(newUser));
    toast.success("Account created successfully!");
    return successAction;
  } catch (error) {
    const failAction = dispatch(registerFailure(error.message));
    toast.error(error.message);
    return failAction;
  }
}

export default userSlice.reducer
