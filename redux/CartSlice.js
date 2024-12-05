import { createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, set, get, remove, update } from "firebase/database";
import { Snackbar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: null,
    error: null,
  },
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    removeFromCart: (state, action) => {
      // Xóa sản phẩm khỏi Redux store
      state.cart = state.cart.filter(
        (item) => item.cartItemId !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = []; // Đặt giỏ hàng về trạng thái rỗng
    },
  },
});
export const selectCart = (state) => state.cart.cart;
export const { addToCart, setCart, removeFromCart, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;

// add to cart
export const addToCartAsync = (cartItem) => async (dispatch) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      const cartLocal = await AsyncStorage.getItem("cart");
      const localCart = cartLocal ? JSON.parse(cartLocal) : {};

      const existingQuantity = localCart[cartItem.id]
        ? localCart[cartItem.id].quantity
        : 0;

      // Cập nhật số lượng sản phẩm
      localCart[cartItem.id] = {
        ...cartItem,
        quantity: existingQuantity + cartItem.quantity,
      };

      // Lưu giỏ hàng vào AsyncStorage
      await AsyncStorage.setItem("cart", JSON.stringify(localCart));

      dispatch(getCartAsync());
      return;
    }
    const userId = user.uid;
    const cartRef = ref(database, `carts/${userId}/${cartItem.id}`);

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const cartSnapshot = await get(cartRef);
    const existingQuantity = cartSnapshot.exists()
      ? cartSnapshot.val().quantity
      : 0;

    // Cập nhật hoặc thêm mới sản phẩm với số lượng mới
    await update(cartRef, {
      ...cartItem,
      quantity: existingQuantity + cartItem.quantity,
    });

    // Tùy chọn: Lấy lại giỏ hàng để đảm bảo trạng thái Redux luôn đồng bộ
    dispatch(getCartAsync());
  } catch (error) {
    console.error("Lỗi khi thêm vào giỏ hàng:", error);
  }
};

// dipslay cart
export const getCartAsync = () => async (dispatch) => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        // Người dùng đã đăng nhập, lấy giỏ hàng từ Firebase
        const userId = user.uid;
        const cartRef = ref(database, `carts/${userId}`);
        const cartSnapshot = await get(cartRef);

        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.val();
          const cartArray = Object.values(cartData);
          dispatch(setCart(cartArray)); // Lưu giỏ hàng vào Redux store
        } else {
          dispatch(setCart([])); // Giỏ hàng rỗng
        }
      } else {
        // Người dùng chưa đăng nhập, lấy giỏ hàng từ AsyncStorage
        const storedCart = await AsyncStorage.getItem("cart");
        const localCart = storedCart ? JSON.parse(storedCart) : {};
        const cartArray = Object.values(localCart);

        dispatch(setCart(cartArray)); // Lưu giỏ hàng local vào Redux store
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      dispatch(setCart([])); // Trong trường hợp lỗi, trả về giỏ hàng rỗng
    }
  });
};
// delete item
export const removeFromCartAsync = (cartItemId) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  try {
    if (user) {
      // Nếu người dùng đã đăng nhập, xóa sản phẩm khỏi Firebase
      const userId = user.uid;
      const cartRef = ref(database, `carts/${userId}/${cartItemId}`);
      await remove(cartRef);

      // Cập nhật Redux store để xóa sản phẩm
      dispatch(removeFromCart(cartItemId));

      // Tùy chọn: Đồng bộ lại giỏ hàng từ Firebase
      dispatch(getCartAsync());
    } else {
      // Nếu người dùng chưa đăng nhập, xóa sản phẩm khỏi AsyncStorage
      const cartLocal = await AsyncStorage.getItem("cart");
      const localCart = cartLocal ? JSON.parse(cartLocal) : {};

      // Xóa sản phẩm khỏi giỏ hàng local
      delete localCart[cartItemId];

      // Lưu lại giỏ hàng đã cập nhật vào AsyncStorage
      await AsyncStorage.setItem("cart", JSON.stringify(localCart));

      // Cập nhật Redux store để xóa sản phẩm khỏi giỏ hàng
      const updatedCart = Object.values(localCart);
      dispatch(removeFromCart(cartItemId));

      // Tùy chọn: Đồng bộ lại giỏ hàng từ AsyncStorage
      dispatch(setCart(updatedCart));
    }
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
  }
};
// update quantity cart
export const updateCartAsync =
  (cartItemId, newQuantity) => async (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (user) {
        // Người dùng đã đăng nhập, cập nhật giỏ hàng trên Firebase
        const cartRef = ref(database, `carts/${user.uid}/${cartItemId}`);

        // Lấy thông tin sản phẩm hiện tại từ Firebase
        const cartSnapshot = await get(cartRef);
        if (cartSnapshot.exists()) {
          const existingProduct = cartSnapshot.val();

          if (newQuantity > 0) {
            // Cập nhật số lượng sản phẩm
            await set(cartRef, {
              ...existingProduct,
              quantity: newQuantity,
            });
          } else if (newQuantity === 0) {
            // Xóa sản phẩm khỏi giỏ hàng nếu số lượng <= 0
            await remove(cartRef);
            dispatch(removeFromCart(cartItemId));
          }

          // Lấy lại giỏ hàng để đảm bảo đồng bộ Redux
          dispatch(getCartAsync());
        } else {
          console.error("Sản phẩm không tồn tại trong giỏ hàng trên Firebase");
        }
      } else {
        // Người dùng chưa đăng nhập, cập nhật giỏ hàng trong AsyncStorage
        const cartLocal = await AsyncStorage.getItem("cart");
        const localCart = cartLocal ? JSON.parse(cartLocal) : {};

        if (localCart[cartItemId]) {
          if (newQuantity > 0) {
            // Cập nhật số lượng sản phẩm trong giỏ hàng local
            localCart[cartItemId].quantity = newQuantity;
          } else if (newQuantity === 0) {
            // Xóa sản phẩm khỏi giỏ hàng nếu số lượng <= 0
            delete localCart[cartItemId];
          }

          // Lưu giỏ hàng đã cập nhật vào AsyncStorage
          await AsyncStorage.setItem("cart", JSON.stringify(localCart));

          // Cập nhật Redux store để đồng bộ với AsyncStorage
          const updatedCart = Object.values(localCart);
          dispatch(setCart(updatedCart));
        } else {
          console.error("Sản phẩm không tồn tại trong giỏ hàng local");
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
    }
  };

// delete all cart when check out
export const clearCartAsync = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid; // Lấy UID của user
    const cartRef = ref(database, `carts/${userId}`); // Đường dẫn đúng tới giỏ hàng của user

    try {
      await remove(cartRef); // Xóa giỏ hàng từ Firebase

      // Xóa giỏ hàng trong Redux store
      dispatch(clearCart());
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng từ Firebase:", error);
    }
  } else {
    console.log("Không có người dùng đăng nhập.");
  }
};
