import { useState, memo, useMemo, useCallback } from 'react';

const CheckoutPage = memo(function CheckoutPage({ cartItems, user, onCheckoutComplete }) {
  const [formData, setFormData] = useState({
    firstName: user?.name || '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Memoized calculations
  const total = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [cartItems]
  );
  const shipping = total > 50 ? 0 : 9.99;
  const tax = (total * 0.19).toFixed(2);
  const grandTotal = (parseFloat(total.toFixed(2)) + shipping + parseFloat(tax)).toFixed(2);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleNextStep = useCallback((e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  }, [step]);

  const handlePrevStep = useCallback(() => {
    if (step > 1) setStep(step - 1);
  }, [step]);

  const handlePlaceOrder = useCallback(async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      onCheckoutComplete({
        orderNumber: `ORD-${Date.now()}`,
        email: user.email,
        items: cartItems,
        total: grandTotal,
        timestamp: new Date()
      });
    }, 1500);
  }, [onCheckoutComplete, user.email, cartItems, grandTotal]);

  return (
    <main className="main-container">
      <div className="checkout-wrapper">
        <h2>Checkout 💳</h2>

        <div className="checkout-container">
          {/* Left Column: Form */}
          <div className="checkout-form">
            {/* Step Indicator */}
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <label>Shipping</label>
              </div>
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <label>Payment</label>
              </div>
              <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <label>Review</label>
              </div>
            </div>

            <form>
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div className="form-step">
                  <h3>Shipping Address</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="nl">Netherlands</option>
                      <option value="de">Germany</option>
                      <option value="be">Belgium</option>
                      <option value="fr">France</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="form-step">
                  <h3>Payment Information</h3>

                  <div className="form-group">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>

                  <div className="payment-methods">
                    <h4>Other Payment Methods</h4>
                    <button type="button" className="payment-method">🏦 Bank Transfer</button>
                    <button type="button" className="payment-method">📱 Digital Payment</button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="form-step">
                  <h3>Order Review</h3>

                  <div className="review-section">
                    <h4>Shipping to:</h4>
                    <p>
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.zipCode} {formData.city}<br />
                      {formData.country}
                    </p>
                  </div>

                  <div className="review-section">
                    <h4>Items:</h4>
                    <div className="review-items">
                      {cartItems.map((item) => (
                        <div key={item.id} className="review-item">
                          <span>{item.name} x {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="review-section">
                    <h4>Payment Method:</h4>
                    <p>💳 Card ending in {formData.cardNumber.slice(-4) || 'XXXX'}</p>
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="form-actions">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn-secondary"
                  >
                    ← Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn-primary"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="btn-primary btn-large"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="checkout-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (19%):</span>
                <span>${tax}</span>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-grand-total">
              <span>Total:</span>
              <span>${grandTotal}</span>
            </div>

            {shipping === 0 && (
              <div className="free-shipping-badge">✓ Free Shipping</div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
});

export default CheckoutPage;
