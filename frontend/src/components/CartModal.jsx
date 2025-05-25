import React from "react";
import {Link} from "react-router-dom"; // Add this import
import "../css/CartModal.css";

export function CartModal({isOpen, onClose, cartItems, removeFromCart}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Shopping Cart</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image_url} alt={item.producer} />
                  <div className="item-details">
                    <h3>{item.producer}</h3>
                    <p>${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
          <Link to="/cart" className="checkout-button">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
