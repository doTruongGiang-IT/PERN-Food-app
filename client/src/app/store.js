import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../features/pizzas/pizzaSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';
import staffReducer from '../features/staff/staff';
import userReducer from '../features/user/user';
import supplierReducer from '../features/supplier/supplierSlice';
import ingredientReducer from '../features/ingredient/ingredientSlice';
import statisticsReducer from '../features/statistics/statistics';

export const store = configureStore({
  reducer: {
    pizzas: pizzaReducer,
    cart: cartReducer,
    auth: authReducer,
    order: orderReducer,
    staff: staffReducer,
    user: userReducer,
    statistics: statisticsReducer,
    supplier: supplierReducer,
    ingredient: ingredientReducer,
  },
});
