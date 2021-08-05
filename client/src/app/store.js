import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../features/pizzas/pizzaSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    pizzas: pizzaReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer
  },
});
