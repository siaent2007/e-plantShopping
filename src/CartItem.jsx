import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {

    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // ─── Calculate total cost of ALL items in the cart ────────────
    const calculateTotalAmount = () => {
        let total = 0;
        cart.forEach(item => {
            const quantity = item.quantity;
            const cost = parseFloat(item.cost.substring(1)); // Remove '$' and convert to number
            total += cost * quantity;
        });
        return total.toFixed(2); // Return total rounded to 2 decimal places
    };

    // ─── Calculate subtotal for ONE item (quantity × unit price) ──
    const calculateTotalCost = (item) => {
        const cost = parseFloat(item.cost.substring(1)); // Remove '$' and convert to number
        return (cost * item.quantity).toFixed(2);
    };

    // ─── Continue Shopping ─────────────────────────────────────────
    // Calls the function passed from the parent (ProductList.jsx)
    // which sets showCart to false, bringing back the product list
    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    // ─── Checkout ──────────────────────────────────────────────────
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    // ─── Increment quantity ────────────────────────────────────────
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    // ─── Decrement quantity ────────────────────────────────────────
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            // Decrease quantity by 1
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            // Quantity would drop to 0 — remove item from cart entirely
            dispatch(removeItem(item.name));
        }
    };

    // ─── Remove item from cart ─────────────────────────────────────
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div className="cart-container">

            {/* Total cart amount */}
            <h2 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>

                        {/* Plant thumbnail */}
                        <img
                            className="cart-item-image"
                            src={item.image}
                            alt={item.name}
                        />

                        <div className="cart-item-details">

                            {/* Plant name */}
                            <div className="cart-item-name">{item.name}</div>

                            {/* Unit price */}
                            <div className="cart-item-cost">{item.cost}</div>

                            {/* Quantity controls */}
                            <div className="cart-item-quantity">
                                <button
                                    className="cart-item-button cart-item-button-dec"
                                    onClick={() => handleDecrement(item)}
                                >
                                    -
                                </button>
                                <span className="cart-item-quantity-value">
                                    {item.quantity}
                                </span>
                                <button
                                    className="cart-item-button cart-item-button-inc"
                                    onClick={() => handleIncrement(item)}
                                >
                                    +
                                </button>
                            </div>

                            {/* Item subtotal */}
                            <div className="cart-item-total">
                                Total: ${calculateTotalCost(item)}
                            </div>

                            {/* Delete button */}
                            <button
                                className="cart-item-delete"
                                onClick={() => handleRemove(item)}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom action buttons */}
            <div className="continue_shopping_btn">
                <button
                    className="get-started-button"
                    onClick={(e) => handleContinueShopping(e)}
                >
                    Continue Shopping
                </button>
                <br />
                <button
                    className="get-started-button1"
                    onClick={(e) => handleCheckoutShopping(e)}
                >
                    Checkout
                </button>
            </div>

        </div>
    );
}

export default CartItem;



