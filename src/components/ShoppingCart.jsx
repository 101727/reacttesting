// ShoppingCart Component - Winkelwagen met items
import { memo, useCallback } from 'react';

export const ShoppingCart = memo(function ShoppingCart({ cartItems, onRemoveFromCart, onQuantityChange, onClose, onCheckout }) {
  // Memoized callback
  const handleCheckout = useCallback(() => {
    onCheckout();
    onClose();
  }, [onCheckout, onClose]);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-modal" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty 😢</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      className="qty-btn"
                      onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                className="checkout-btn"
                onClick={() => {
                  onCheckout();
                  onClose();
                }}
              >
              Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});
