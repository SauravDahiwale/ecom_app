import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./feature/cart-slice";
import productsReducer from "./feature/product-slice";
import categoriesReducer from "./feature/category-slice";
import checkoutReducer from "./feature/checkout-slice";

export const store = configureStore({
    reducer: {
      cart:cartReducer,
      products : productsReducer,
      categories: categoriesReducer,
      checkout: checkoutReducer
    }
});