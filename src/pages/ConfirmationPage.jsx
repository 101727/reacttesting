import { memo } from 'react';

const ConfirmationPage = memo(function ConfirmationPage({ order, onBackToHome }) {
  return (
    <main className="main-container">
      <div className="confirmation-wrapper">
        <div className="confirmation-card">
          <div className="confirmation-icon">✅</div>
          
          <h2>Order Confirmed!</h2>
          <p className="confirmation-subtitle">Thank you for your purchase</p>

          <div className="order-details">
            <div className="detail-row">
              <span className="label">Order Number:</span>
              <span className="value">{order.orderNumber}</span>
            </div>
            <div className="detail-row">
              <span className="label">Confirmation Email:</span>
              <span className="value">{order.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Order Date:</span>
              <span className="value">{order.timestamp.toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span className="label">Total Amount:</span>
              <span className="value total-amount">${order.total}</span>
            </div>
          </div>

          <div className="order-items">
            <h3>Items Ordered:</h3>
            {order.items.map((item) => (
              <div key={item.id} className="ordered-item">
                <span>{item.image} {item.name}</span>
                <span>x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="confirmation-message">
            <p>📧 A confirmation email has been sent to your email address.</p>
            <p>📦 You will receive a tracking number once your order ships.</p>
            <p>🚚 Expected delivery: 3-5 business days</p>
          </div>

          <button onClick={onBackToHome} className="btn-primary btn-large">
            Continue Shopping
          </button>
        </div>
      </div>
    </main>
  );
});

export { ConfirmationPage };
export default ConfirmationPage;
