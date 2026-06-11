import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to hold all cart items
  },
  reducers: {

    // ─── Add Item ──────────────────────────────────────────────────
    // Called when user clicks "Add to Cart" on the product listing page
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ─── Remove Item ───────────────────────────────────────────────
    // Called when user clicks the Delete button in CartItem.jsx
    // action.payload = the plant name (string)
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // ─── Update Quantity ───────────────────────────────────────────
    // Called when user clicks + or - buttons in CartItem.jsx
    // action.payload = { name, quantity }
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
      }
    },

  },
});

// ─── Export action creators ────────────────────────────────────────
// addItem    → used in ProductList.jsx
// removeItem → used in CartItem.jsx
// updateQuantity → used in CartItem.jsx
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// ─── Export reducer ────────────────────────────────────────────────
// Used in store.js to register this slice
export default cartSlice.reducer;
