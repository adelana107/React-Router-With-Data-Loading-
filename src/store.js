import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice'; // ✅ import cart slice

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer, 
  },
});

export default store;
