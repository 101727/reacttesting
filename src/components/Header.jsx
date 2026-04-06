// Header Component - Navigation und Warenkorb-Icon
import { memo } from 'react';

export const Header = memo(function Header({ cartItemCount, onCartClick, user, onLogout, onLogoClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <h1 
          onClick={onLogoClick}
          style={{ cursor: 'pointer' }}
          title="Go to home"
        >
          🛒 TechShop
        </h1>
        <div className="header-actions">
          <div className="user-section">
            {user ? (
              <>
                <span className="user-name">👤 {user.name}</span>
                <button 
                  onClick={onLogout}
                  className="logout-btn"
                  title="Sign out"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <span className="not-logged-in">Not logged in</span>
            )}
          </div>
          
          <button 
            className="cart-icon"
            onClick={onCartClick}
            title="Open shopping cart"
          >
            🛍️
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
});
